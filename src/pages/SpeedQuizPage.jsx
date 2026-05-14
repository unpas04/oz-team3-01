import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { trackQuizStart, trackQuizComplete, trackQuizAnswer } from "../modules/analytics";
import { useAuth } from "../contexts/AuthContext";
import { submitQuizScore, getStarThreshold } from "../modules/firestore";
import "../styles/speed-quiz.css";

const TOTAL_SECONDS = 30;            // 테마 모드: 총 시간
const PER_QUESTION_SECONDS = 5;      // IP 모드: 문제당 시간
const READY_SECONDS = 3;
const START_LIVES = 3;

const CATEGORY_LABELS = {
  onepiece: "원피스",
  naruto: "나루토", slamdunk: "슬램덩크", conan: "명탐정 코난",
  shinchan: "짱구는 못말려", doraemon: "도라에몽", hxh: "헌터x헌터",
  yugioh: "유희왕", digimon: "디지몬",
  theme_memorial: "추모관",
  theme_villain: "빌런 열전", theme_rivals: "라이벌즈", theme_mentor: "사제지간",
  theme_firstlove: "첫사랑", theme_transform: "변신·각성", theme_quotes: "명대사 OX",
  theme_dubname: "한국 더빙명", theme_twist: "흑막·반전", theme_family: "부모님 찾기",
  theme_second: "2인자의 슬픔", theme_trivia: "장수 만화 트리비아",
  sanrio: "산리오", pokemon: "포켓몬", aot: "진격의 거인",
  kimetsu: "귀멸의 칼날", fma: "강철의 연금술사", jjk: "주술회전",
  dragonball: "드래곤볼", chainsawman: "체인소맨", deathnote: "데스노트", fate: "페이트 시리즈",
};

/* ── 사운드 ── */
let _ctx = null;
const getCtx = () => {
  if (!_ctx) {
    try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  return _ctx;
};
const playTone = (freq, dur = 0.08, type = "sine", vol = 0.15) => {
  const ctx = getCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + dur);
};
const sfx = {
  correct: () => { playTone(880, 0.08); setTimeout(() => playTone(1320, 0.1), 50); },
  wrong:   () => { playTone(220, 0.14, "square", 0.14); setTimeout(() => playTone(140, 0.18, "square", 0.14), 90); },
  tick:    () => playTone(1200, 0.04, "square", 0.06),
  tickFast:() => playTone(1500, 0.04, "square", 0.08),
  heartbeat: () => { playTone(80, 0.08, "sine", 0.3); setTimeout(() => playTone(60, 0.12, "sine", 0.3), 120); },
  ready:   () => playTone(660, 0.08, "sine", 0.16),
  go:      () => { playTone(880, 0.12, "sine", 0.2); setTimeout(() => playTone(1320, 0.18, "sine", 0.22), 100); },
  finish:  () => {
    playTone(523, 0.1, "sine", 0.2);
    setTimeout(() => playTone(659, 0.1, "sine", 0.2), 100);
    setTimeout(() => playTone(784, 0.15, "sine", 0.22), 200);
    setTimeout(() => playTone(1046, 0.25, "triangle", 0.2), 320);
  },
  gameOver: () => {
    playTone(440, 0.15, "sawtooth", 0.2);
    setTimeout(() => playTone(330, 0.18, "sawtooth", 0.2), 150);
    setTimeout(() => playTone(220, 0.3, "sawtooth", 0.22), 320);
  },
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const loadIp = (ip) =>
  new Promise((resolve) => {
    const varName = `QUIZ_DATA_${ip.toUpperCase()}`;
    if (window[varName]) return resolve(window[varName]);
    const s = document.createElement("script");
    s.src = `/data/${ip}.js`;
    s.onload = () => resolve(window[varName] || []);
    s.onerror = () => resolve([]);
    document.body.appendChild(s);
  });

export default function SpeedQuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const category = (searchParams.get("category") || "onepiece").toLowerCase();
  const categoryLabel = CATEGORY_LABELS[category] || category;
  const isThemeMode = category.startsWith("theme_");
  const initSeconds = isThemeMode ? TOTAL_SECONDS : PER_QUESTION_SECONDS;
  const starThreshold = getStarThreshold(category);

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [phase, setPhase] = useState("loading"); // loading | ready | playing | done
  const [remainSec, setRemainSec] = useState(initSeconds);
  const [submitResult, setSubmitResult] = useState(null); // { gotStar, newBest, prevBest }
  const [bgReady, setBgReady] = useState(false); // 배경 애니메이션 지연 활성화
  const [readyCount, setReadyCount] = useState(READY_SECONDS);
  const [flash, setFlash] = useState(null); // 'correct' | 'wrong' | null
  const [shakeQuestion, setShakeQuestion] = useState(false);
  const [endReason, setEndReason] = useState(null); // 'time' | 'lives' | 'all'
  const [losingLifeIdx, setLosingLifeIdx] = useState(-1);

  const timerRef = useRef(null);
  const remainRef = useRef(initSeconds);
  const lastTickRef = useRef(-1);
  const livesRef = useRef(START_LIVES);
  const currentIdxRef = useRef(0);
  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);

  // body class
  useEffect(() => {
    document.body.classList.add("speed-quiz");
    if (isThemeMode) document.body.classList.add("speed-quiz-theme");
    return () => {
      document.body.classList.remove("speed-quiz");
      document.body.classList.remove("speed-quiz-theme");
    };
  }, [isThemeMode]);

  // 데이터 로드 (단일 IP)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await loadIp(category);
      if (cancelled) return;
      const tagged = (data || []).map((q) => ({ ...q, _ip: category }));
      setQuestions(shuffle(tagged));
      trackQuizStart(category, "speed");
      setPhase("ready");
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Ready 카운트다운
  useEffect(() => {
    if (phase !== "ready") return;
    setReadyCount(READY_SECONDS);
    sfx.ready();
    let r = READY_SECONDS;
    const id = setInterval(() => {
      r -= 1;
      if (r <= 0) {
        clearInterval(id);
        sfx.go();
        setPhase("playing");
        return;
      }
      sfx.ready();
      setReadyCount(r);
    }, 800);
    return () => clearInterval(id);
  }, [phase]);

  const finish = useCallback((reason) => {
    if (reason === "lives") sfx.gameOver();
    else sfx.finish();
    setEndReason(reason);
    setPhase("done");
    trackQuizComplete(category, score, "speed");

    // Firestore 점수 제출 — 로그인 상태에서만
    if (user && profile?.nickname) {
      submitQuizScore({
        uid: user.uid,
        nickname: profile.nickname,
        category,
        score,
      })
        .then((res) => setSubmitResult(res))
        .catch((e) => console.error("[speed-quiz] submit 실패:", e?.code, e?.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, score, user, profile]);

  // 최신 finish 참조 보관
  const finishRef = useRef(finish);
  useEffect(() => { finishRef.current = finish; }, [finish]);

  // 무응답 처리(시간 초과) — IP 모드용
  const timeoutAsWrongRef = useRef(() => {});
  // 메인 타이머
  //  - 테마 모드: phase=playing 진입 시 1회 시작, 총 30초
  //  - IP 모드: 매 문제(currentIdx)마다 5초 리셋, 0초 도달 시 자동 오답
  useEffect(() => {
    if (phase !== "playing") return;
    const startSec = isThemeMode ? TOTAL_SECONDS : PER_QUESTION_SECONDS;
    remainRef.current = startSec;
    setRemainSec(startSec);
    lastTickRef.current = -1;
    timerRef.current = setInterval(() => {
      remainRef.current -= 1;
      setRemainSec(remainRef.current);
      const cur = remainRef.current;
      if (cur > 0 && cur <= 5 && lastTickRef.current !== cur) {
        lastTickRef.current = cur;
        sfx.tickFast();
      } else if (cur > 5 && cur <= 10 && lastTickRef.current !== cur) {
        lastTickRef.current = cur;
        sfx.tick();
      }
      if (cur <= 0) {
        clearInterval(timerRef.current);
        if (isThemeMode) {
          finishRef.current("time");
        } else {
          timeoutAsWrongRef.current();
        }
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
    // IP 모드는 currentIdx도 의존 → 문제 바뀔 때마다 5초 리셋
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isThemeMode, isThemeMode ? null : currentIdx]);

  // 목숨 1개 남았을 때 심장박동 사운드 (3초마다)
  useEffect(() => {
    if (phase !== "playing" || lives !== 1) return;
    sfx.heartbeat();
    const id = setInterval(() => sfx.heartbeat(), 1400);
    return () => clearInterval(id);
  }, [phase, lives]);

  const resolveAnswer = (userAns /* true | false | null = 무응답 */) => {
    if (phase !== "playing") return;
    const idx = currentIdxRef.current;
    const item = questions[idx];
    if (!item) return;
    const isRight = userAns !== null && item.a === userAns;
    trackQuizAnswer(category, isRight, idx);

    if (isRight) {
      setScore((s) => s + 1);
      sfx.correct();
      setFlash("correct");
      setTimeout(() => setFlash(null), 180);
    } else {
      sfx.wrong();
      setFlash("wrong");
      setTimeout(() => setFlash(null), 280);
      setShakeQuestion(true);
      setTimeout(() => setShakeQuestion(false), 380);

      const newLives = livesRef.current - 1;
      livesRef.current = newLives;
      setLosingLifeIdx(newLives);
      setLives(newLives);
      setTimeout(() => setLosingLifeIdx(-1), 420);

      if (newLives <= 0) {
        clearInterval(timerRef.current);
        setTimeout(() => finishRef.current("lives"), 450);
        return;
      }
    }

    if (idx + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setTimeout(() => finishRef.current("all"), 250);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handleAnswer = (userAns) => resolveAnswer(userAns);

  // 시간 초과(IP 모드) → 자동 오답
  useEffect(() => {
    timeoutAsWrongRef.current = () => resolveAnswer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const item = questions[currentIdx];
  const timerMax = isThemeMode ? TOTAL_SECONDS : PER_QUESTION_SECONDS;
  const timerPct = Math.max(0, (remainSec / timerMax) * 100);
  const urgentThreshold = isThemeMode ? 10 : 2;
  const isUrgent = remainSec <= urgentThreshold && phase === "playing";
  const isCritical = lives <= 1 && phase === "playing";

  const getRank = (s) => {
    if (s >= 25) return { label: "전설의 스피드러너", color: "#FF2D55" };
    if (s >= 20) return { label: "초고속 마스터",      color: "#FFB347" };
    if (s >= 15) return { label: "빠른 손가락",        color: "#5BC97A" };
    if (s >= 10) return { label: "워밍업 완료",        color: "#7FBDEF" };
    if (s >= 5)  return { label: "출발선 도전자",      color: "#C084FC" };
    return { label: "다음엔 더 빠르게!",                color: "#9A8AA8" };
  };

  const endReasonText = {
    time:  "시간 종료",
    lives: "목숨 소진",
    all:   "모든 문제 완료",
  };

  return (
    <div className={`speed-quiz-container ${isThemeMode ? "theme-mode" : "ip-mode"} ${flash ? `flash-${flash}` : ""} ${isUrgent ? "urgent-state" : ""} ${isCritical ? "critical" : ""}`}>
      <div className="sq-bg-tunnel" aria-hidden="true" />
      <div className="sq-bg-lines" aria-hidden="true" />
      <div className="sq-bg-glow" aria-hidden="true" />
      <div className="sq-streaks" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`sq-streak sq-streak-${i + 1}`} />
        ))}
      </div>
      {isCritical && <div className="sq-critical-border" aria-hidden="true" />}

      {/* 테마 모드 전용 배경 — 퀴즈 페스티벌 */}
      {isThemeMode && (
        <>
          <div className="tq-rainbow" aria-hidden="true" />
          <div className="tq-marks" aria-hidden="true">
            <span className="tq-mark tq-mark-1">?</span>
            <span className="tq-mark tq-mark-2">!</span>
            <span className="tq-mark tq-mark-3">?</span>
            <span className="tq-mark tq-mark-4">!</span>
          </div>
          <div className="tq-stars" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={`tq-star tq-star-${i + 1}`}>✦</span>
            ))}
          </div>
          <div className="tq-balloons" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`tq-balloon tq-balloon-${i + 1}`}>
                <span className="tq-balloon-string" />
              </span>
            ))}
          </div>
          <div className="tq-confetti" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className={`tq-conf tq-conf-${i + 1}`} />
            ))}
          </div>
        </>
      )}

      {/* 헤더 */}
      <header className="sq-header">
        <button
          type="button"
          className="sq-back-btn"
          onClick={() => navigate("/")}
          aria-label="홈으로"
        >
          ✕
        </button>
        <div className="sq-mode-tag">
          <span className="sq-mode-icon" aria-hidden="true">{isThemeMode ? "⚜︎" : "⚡"}</span>
          <span className="sq-mode-name">{categoryLabel}</span>
        </div>
      </header>

      {phase === "loading" && (
        <div className="sq-center-screen">
          <div className="sq-loading">데이터 불러오는 중…</div>
        </div>
      )}

      {phase === "ready" && (
        <div className="sq-center-screen">
          <div className="sq-ready-label">READY</div>
          <div className="sq-ready-count" key={readyCount}>{readyCount}</div>
          <div className="sq-ready-hint">
            {isThemeMode
              ? "30초 · 목숨 ❤❤❤ · 빠르고 정확하게!"
              : "문제당 5초 · 목숨 ❤❤❤ · 무응답은 오답!"}
          </div>
        </div>
      )}

      {phase === "playing" && item && (
        <main className="sq-play">
          {/* 점수 · 목숨 · 타이머 */}
          <div className="sq-stats">
            <div className="sq-stat sq-score-stat">
              <span className="sq-stat-label">정답</span>
              <span className="sq-stat-value">
                <strong>{score}</strong>
                <span className="sq-stat-unit">개</span>
              </span>
            </div>
            <div className={`sq-stat sq-lives-stat ${isCritical ? "danger" : ""}`}>
              <span className="sq-stat-label">목숨</span>
              <div className="sq-lives-row">
                {Array.from({ length: START_LIVES }).map((_, i) => {
                  const lost = i >= lives;
                  const losing = i === losingLifeIdx;
                  return (
                    <span
                      key={i}
                      className={`sq-heart ${lost ? "lost" : ""} ${losing ? "losing" : ""}`}
                      aria-hidden="true"
                    >
                      ♥
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={`sq-stat sq-timer-stat ${isUrgent ? "urgent" : ""}`}>
              <span className="sq-stat-label">시간</span>
              <span className="sq-stat-value">
                <strong>{remainSec}</strong>
                <span className="sq-stat-unit">초</span>
              </span>
            </div>
          </div>

          <div className="sq-timer-bar">
            <div
              className={`sq-timer-fill ${isUrgent ? "urgent" : ""}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>

          <div className={`sq-question-card ${shakeQuestion ? "shake" : ""}`} key={currentIdx}>
            <div className="sq-ip-tag">{categoryLabel}</div>
            <div className="sq-question-text">{item.q}</div>
          </div>

          <div className="sq-actions">
            <button
              type="button"
              className="sq-btn sq-btn-yes"
              onClick={() => handleAnswer(true)}
            >
              <span className="sq-btn-label">YES</span>
            </button>
            <button
              type="button"
              className="sq-btn sq-btn-no"
              onClick={() => handleAnswer(false)}
            >
              <span className="sq-btn-label">NO</span>
            </button>
          </div>

          <div className="sq-progress-text">#{currentIdx + 1}</div>
        </main>
      )}

      {phase === "done" && (() => {
        const rank = getRank(score);
        return (
          <div className="sq-center-screen sq-result-screen">
            <div className="sq-result-end-reason">
              {endReasonText[endReason] || ""}
            </div>
            <div className="sq-result-label">FINAL SCORE</div>
            <div className="sq-result-score">
              <strong>{score}</strong>
              <span>개</span>
            </div>
            <div className="sq-result-rank" style={{ color: rank.color }}>
              {rank.label}
            </div>
            <div className="sq-result-meta">
              남은 목숨 {Math.max(0, lives)} · 풀어본 문제 {currentIdx + 1}개
            </div>

            {/* 별딱지 안내 */}
            {user ? (
              submitResult?.gotStar ? (
                <div className="sq-star-banner sq-star-got">
                  ⭐ 별딱지 획득!
                  <span className="sq-star-sub">{categoryLabel} 별을 컬렉션에 추가했어요</span>
                </div>
              ) : score >= starThreshold ? (
                <div className="sq-star-banner sq-star-already">
                  ⭐ 이미 획득한 별딱지예요
                </div>
              ) : (
                <div className="sq-star-banner sq-star-hint">
                  별딱지 기준 <strong>{starThreshold}점</strong> · 지금 <strong>{score}점</strong>
                </div>
              )
            ) : (
              <div className="sq-star-banner sq-star-hint">
                로그인하면 별딱지·랭킹 기록이 저장돼요
              </div>
            )}

            <div className="sq-result-buttons">
              <button
                type="button"
                className="sq-result-btn sq-result-retry"
                onClick={() => window.location.reload()}
              >
                다시 도전
              </button>
              <button
                type="button"
                className="sq-result-btn sq-result-home"
                onClick={() => navigate("/")}
              >
                메인으로
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
