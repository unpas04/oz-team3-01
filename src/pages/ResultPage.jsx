import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  evaluateQuizResult,
  getCategoryTitle,
  calculatePercentile,
} from '../modules/data-module';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { submitQuizScore, getMyRank } from '../modules/firestore';
import AuthModal from '../components/AuthModal';
import "../styles/result.css";

const CATEGORY_NAMES = {
  sanrio: "산리오", pokemon: "포켓몬", aot: "진격의 거인",
  kimetsu: "귀멸의 칼날", fma: "강철의 연금술사", jjk: "주술회전",
  dragonball: "드래곤볼", chainsawman: "체인소맨", deathnote: "데스노트",
  fate: "페이트 시리즈",
};

// 원본 에모지 설정 1:1 복제
const EMOJI_MAP = {
  pokemon: ['⚽', '⚡', '🔥', '💧', '🍃'],
  sanrio: ['❤️', '🎀', '🎈', '🍭'],
  aot: ['⚔️', '🧱', '🐎', '💨'],
  kimetsu: ['🗡️', '🔥', '🌊', '🌸'],
  fma: ['⚗️', '📜', '🦾', '🪙'],
  fate: ['📜', '🛡️', '🗡️', '👑', '✨']
};

function useCountUp(target) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = null;
        const duration = 1200;
        const step = (ts) => {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - prog, 3);
            setValue(Math.round(ease * target));
            if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target]);
    return value;
}

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | done | failed
  const [submitError, setSubmitError] = useState("");
  const [gotStar, setGotStar] = useState(false);
  const [myRankInfo, setMyRankInfo] = useState(null);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const submittedRef = useRef(false);

  const category = searchParams.get('category') || 'sanrio';
  const mode = searchParams.get('mode') || 'normal';
  const score = parseInt(searchParams.get('score')) || 0;
  // Task 9: Reading wrong targets securely from SessionStorage
  const wrongStr = sessionStorage.getItem('oz_wrong_indices') || "";
  const wrongIndices = wrongStr ? wrongStr.split(',').map(Number) : [];

  const { gradeInfo, scorePct } = evaluateQuizResult(category, mode, score, wrongIndices);
  const percentile = calculatePercentile(scorePct);
  const animScore = useCountUp(score);

  // 점수 저장 + 내 순위 조회
  const doSubmitAndShow = async () => {
    if (!user || !profile?.nickname) return;
    if (submittedRef.current) {
      setRankModalOpen(true);
      return;
    }
    submittedRef.current = true;
    setSubmitState("submitting");
    setSubmitError("");
    try {
      const res = await submitQuizScore({
        uid: user.uid,
        nickname: profile.nickname,
        category,
        score,
      });
      if (res?.gotStar) setGotStar(true);
      const rank = await getMyRank(user.uid);
      setMyRankInfo(rank);
      setSubmitState("done");
      setRankModalOpen(true);
    } catch (err) {
      console.error("submit score failed", err);
      setSubmitState("failed");
      setSubmitError("등록에 실패했어요. 잠시 후 다시 시도해주세요.");
      submittedRef.current = false;
    }
  };

  // "순위 확인하기" 버튼 핸들러
  const handleCheckRank = () => {
    if (!user) {
      setPendingSubmit(true);
      setAuthOpen(true);
      return;
    }
    doSubmitAndShow();
  };

  // 로그인 직후 자동 등록 트리거
  useEffect(() => {
    if (pendingSubmit && user && profile?.nickname) {
      setPendingSubmit(false);
      doSubmitAndShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSubmit, user, profile]);

  const [imgSrc, setImgSrc] = useState("");
  const [analysis, setAnalysis] = useState({ s: 0, c: 0, l: 0, m: 0 });
  const [isError, setIsError] = useState(false); // Task 10: 에러 상태

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `/data/${category}.js`;
    script.onerror = () => setIsError(true); // 에러 핸들링
    script.onload = () => {
      const varName = `QUIZ_DATA_${category.toUpperCase()}`;
      const quizData = window[varName] || globalThis[varName];
      if (!quizData) {
          setIsError(true);
          return;
      }

      const firstImg = quizData.find(q => q.img && q.img !== "")?.img;
      setImgSrc(firstImg || `/assets/main-cards/${category}.png`);

      // 성향 분석 로직
      const tagScores = { "스토리": 0, "캐릭터": 0, "설정": 0, "매니아": 0 };
      const tagTotals = { "스토리": 0, "캐릭터": 0, "설정": 0, "매니아": 0 };

      quizData.forEach((item, idx) => {
        const rawTag = (item.tags && item.tags.length > 0) ? item.tags[0] : "설정";
        const tag = rawTag.trim();
        if (tagTotals[tag] !== undefined) {
          tagTotals[tag]++;
          if (!wrongIndices.includes(idx)) tagScores[tag]++;
        } else {
          tagTotals["설정"]++;
          if (!wrongIndices.includes(idx)) tagScores["설정"]++;
        }
      });

      setAnalysis({
        s: tagScores["스토리"] / (tagTotals["스토리"] || 1),
        c: tagScores["캐릭터"] / (tagTotals["캐릭터"] || 1),
        l: tagScores["설정"] / (tagTotals["설정"] || 1),
        m: tagScores["매니아"] / (tagTotals["매니아"] || 1)
      });
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [category, wrongIndices]);

  const radarData = [
    { subject: '스토리', A: analysis.s * 100, fullMark: 100 },
    { subject: '캐릭터', A: analysis.c * 100, fullMark: 100 },
    { subject: '설명', A: analysis.l * 100, fullMark: 100 },
    { subject: '매니아', A: analysis.m * 100, fullMark: 100 },
  ];

  const emojis = EMOJI_MAP[category] || ['✨', '⭐'];

  // Task 7: Canvas Emoji Particle System
  const canvasRef = useRef(null);
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      
      const particles = emojis.map((em) => ({
          x: Math.random() * w,
          y: Math.random() * h + h,
          emoji: em,
          speed: 1 + Math.random() * 2
      }));

      let animId;
      const render = () => {
          ctx.clearRect(0, 0, w, h);
          ctx.font = "24px sans-serif";
          particles.forEach(p => {
              p.y -= p.speed;
              if (p.y < -50) { p.y = h + 50; p.x = Math.random() * w; }
              ctx.fillText(p.emoji, p.x, p.y);
          });
          animId = requestAnimationFrame(render);
      };
      render();
      return () => cancelAnimationFrame(animId);
  }, [emojis]);

  // Task 10: Error Boundary Fallback UI
  if (isError) {
      return (
          <div className="premium-body result" style={{ justifyContent: 'center' }}>
              <div className="result-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
                  <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🔌</h1>
                  <h2 style={{ color: '#1e293b', marginBottom: '15px' }}>통신 방해가 발생했습니다</h2>
                  <p style={{ color: '#64748b', marginBottom: '30px' }}>카테고리 정보를 불러오지 못했습니다. 다시 시도해주세요.</p>
                  <button className="btn" style={{ background: '#6366F1', color: '#fff', width: '100%' }} onClick={() => navigate('/')}>홈으로 돌아가기</button>
              </div>
          </div>
      );
  }

  // Task 8: Web Share API
  const handleNativeShare = async () => {
      const shareData = {
          title: `OZ Master - ${getCategoryTitle(category)}`,
          text: `나는 ${getCategoryTitle(category)} ${gradeInfo.title} 등급! (상위 ${percentile.toFixed(1)}%)`,
          url: window.location.href
      };
      if (navigator.share && navigator.canShare(shareData)) {
          try { await navigator.share(shareData); } 
          catch (e) { console.log('Share canceled'); }
      } else {
          navigator.clipboard.writeText(window.location.href);
          alert("네이티브 공유를 지원하지 않는 브라우저입니다. 링크가 복사되었습니다!");
      }
  };

  return (
    <div className="premium-body result">
      {/* 원본 배경 비주얼 + 캔버스 (Task 7) */}
      <div className="bg-visuals">
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }} />
        <div className="bg-blob"></div>
        <div className="bg-blob secondary"></div>
      </div>

      <div className="container result-container">
        <div className="card result-card">
          {/* 순위 확인하기 CTA */}
          <button
            type="button"
            className="check-rank-btn"
            onClick={handleCheckRank}
            disabled={submitState === "submitting"}
          >
            <svg className="check-rank-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z"
                fill="#FFE48A"
                stroke="#fff"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              {submitState === "submitting"
                ? "등록 중…"
                : submitState === "done"
                ? "내 순위 다시 보기"
                : "순위 확인하기"}
            </span>
            <svg className="check-rank-arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3 L11 8 L5 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {submitError && <div className="check-rank-error">{submitError}</div>}

          <div className="grade-badge-wrap">
            <span className={`gauge-grade-badge grade-${gradeInfo.label}`}>
              {gradeInfo.label} 등급
            </span>
          </div>

          <div className="result-image-area">
            <img src={imgSrc} alt="Result" onError={(e) => { e.target.src=`/assets/main-cards/${category}.png`; }} />
          </div>

          <h2 className="grade-title">{gradeInfo.title}</h2>
          <p className="grade-description">{gradeInfo.desc}</p>

          {gradeInfo.introduction && (
            <div style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: '#475569',
              margin: '20px 0',
              padding: '15px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap'
            }}>
              {gradeInfo.introduction}
            </div>
          )}

          {gradeInfo.characteristic && (
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#6366f1',
              margin: '15px 0',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              ✦ {gradeInfo.characteristic} ✦
            </div>
          )}

          <div className="grade-quote">"{gradeInfo.quote}"</div>

          <div className="score-display-wrap">
            <span className="score-label">Final Evaluation Score</span>
            <div className="score-main">
              <span className="score-text-big">{animScore}</span>
              <span className="score-text-total"> / 30</span>
            </div>
          </div>

          <div className="ranking-section">
            <div className="ranking-label">
              당신은 이 부문 상위 <span>{percentile.toFixed(1)}</span>%입니다!
            </div>
            <div className="gauge-container">
              <div className="gauge-bar" style={{ width: `${100 - percentile}%` }}></div>
            </div>
          </div>

          {/* 신규 기능: 성향 분석 (원본 감도 유지하여 삽입) */}
          <div className="analysis-box">
            <div style={{fontSize:'0.75rem', fontWeight:900, marginBottom:'10px', color:'#94A3B8'}}>ATTRIBUTE ANALYSIS</div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
              <div style={{ width: '120px', height: '120px', marginLeft: '-20px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                    <Radar name="성향" dataKey="A" stroke="#6366F1" fill="rgba(99, 102, 241, 0.4)" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{fontSize:'0.7rem', textAlign:'left', color:'#475569'}}>
                <div>스토리 <strong>{Math.round(analysis.s*100)}%</strong></div>
                <div>캐릭터 <strong>{Math.round(analysis.c*100)}%</strong></div>
                <div>설명수치 <strong>{Math.round(analysis.l*100)}%</strong></div>
                <div>매니아 <strong>{Math.round(analysis.m*100)}%</strong></div>
              </div>
            </div>
          </div>

          {/* 원본 버튼 인터랙션 1:1 복제 */}
          <div className="btn-row">
            <button className="btn btn-secondary" onClick={() => navigate(`/quiz?category=${category}&mode=${mode}`)}>
              <span>↻ 다시하기</span>
              <small>Replay</small>
            </button>
            <button className="btn" style={{background:'#1e293b', color:'#fff'}} onClick={() => navigate(`/share?category=${category}&mode=${mode}&score=${score}&grade=${gradeInfo.title}`)}>
              <span>📜 증명서 발급받기</span>
              <small>Issue Certificate</small>
            </button>
            
            {/* 부활전 버튼 (수술적 추가) */}
            {wrongIndices.length > 0 && (
              <button className="btn btn-revival" onClick={() => navigate(`/quiz?category=${category}&mode=revival&score=${score}`)}>
                <span>🔥 오답 부활전 도전하기</span>
              </button>
            )}
          </div>
        </div>

        {/* 원본 공유 컨테이너 1:1 복제 */}
        <div className="share-container">
          <span className="share-label">Share with Friends</span>
          <div className="share-buttons">
            <button className="s-btn kakao" aria-label="카카오톡으로 공유하기">
              <img src="/assets/sns-ci/kakao.png" alt="K" />
            </button>
            <button className="s-btn instagram" aria-label="인스타그램으로 공유하기">
              <img src="/assets/sns-ci/insta.png" alt="I" />
            </button>
            <button className="s-btn x" aria-label="X(트위터)로 공유하기">
              <img src="/assets/sns-ci/x-twitter.png" alt="X" />
            </button>
            <button className="s-btn url" aria-label="링크 복사 및 네이티브 공유" onClick={handleNativeShare}>
              <span aria-hidden="true">🔗</span>
            </button>
          </div>
        </div>

        {/* 원본 추천 섹션 1:1 복제 */}
        <div className="random-section">
          <button className="btn-random-big" onClick={() => navigate('/')}>
            <span>🚀 다른 퀴즈 도전하기</span>
            <small>Try Another Quiz!</small>
          </button>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => {
          setAuthOpen(false);
          setPendingSubmit(false);
        }}
        onSuccess={() => setAuthOpen(false)}
      />

      {/* 순위 + 별딱지 결과 모달 */}
      {rankModalOpen && (
        <div className="modal-overlay active" onClick={() => setRankModalOpen(false)}>
          <div className="modal-card rank-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRankModalOpen(false)}>✕</button>

            {gotStar && (
              <div className="rank-modal-star-banner">
                <svg className="rank-modal-star-svg" viewBox="0 0 64 64" aria-hidden="true">
                  <defs>
                    <linearGradient id="bigStarGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFE48A" />
                      <stop offset="50%" stopColor="#FFB347" />
                      <stop offset="100%" stopColor="#FF85A1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M32 6 L38 24 L58 25 L42 37 L48 56 L32 45 L16 56 L22 37 L6 25 L26 24 Z"
                    fill="url(#bigStarGrad)"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="rank-modal-star-text">
                  <span className="rank-modal-star-title">별딱지 획득!</span>
                  <span className="rank-modal-star-sub">
                    {CATEGORY_NAMES[category] || category} 마스터 인증 ✦
                  </span>
                </div>
              </div>
            )}

            <div className="rank-modal-section">
              <span className="rank-modal-label">이번달 내 순위</span>
              <span className="rank-modal-rank">
                <strong>{myRankInfo?.rank ?? "—"}</strong>위
              </span>
              <div className="rank-modal-meta">
                <span>✦ {myRankInfo?.starCount ?? 0}개</span>
                <span className="rank-modal-meta-divider" />
                <span>{myRankInfo?.totalScore ?? 0}점</span>
              </div>
            </div>

            <div className="rank-modal-stars">
              <span className="rank-modal-stars-label">보유 별딱지</span>
              <div className="rank-modal-stars-list">
                {(profile?.stars || []).length === 0 ? (
                  <span className="rank-modal-stars-empty">아직 없어요. 30점 만점에 도전!</span>
                ) : (
                  (profile?.stars || []).map((id) => (
                    <span key={id} className="rank-modal-star-chip">{CATEGORY_NAMES[id] || id}</span>
                  ))
                )}
              </div>
            </div>

            <button
              type="button"
              className="rank-modal-home-btn"
              onClick={() => navigate("/")}
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
