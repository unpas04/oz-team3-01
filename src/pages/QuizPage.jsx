import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { trackQuizStart, trackQuizComplete, trackQuizAnswer } from '../modules/analytics';
import "../styles/quiz.css";

const TIMER_SEC = 15;
const TOTAL_QUESTIONS = 30;

// 사운드 (Web Audio API로 동적 생성, 외부 파일 불필요)
let _audioCtx = null;
const getAudioCtx = () => {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  return _audioCtx;
};
const playTone = (freq, duration = 0.1, type = 'sine', vol = 0.15) => {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};
const sfx = {
  correct: () => { playTone(880, 0.12, 'sine'); setTimeout(() => playTone(1320, 0.18, 'sine'), 90); },
  wrong:   () => { playTone(220, 0.18, 'square', 0.12); setTimeout(() => playTone(160, 0.25, 'square', 0.12), 100); },
  tick:    () => playTone(1000, 0.05, 'square', 0.08),
  timeout: () => { playTone(180, 0.4, 'sawtooth', 0.18); },
  click:   () => playTone(600, 0.05, 'triangle', 0.08),
  combo:   () => { playTone(660, 0.08); setTimeout(() => playTone(880, 0.08), 60); setTimeout(() => playTone(1100, 0.12), 120); },
};

const CATEGORY_META = {
  fma:     { emoji: '⚗️',  label: 'FMA',     cls: 'placeholder-fma'     },
  aot:     { emoji: '⚔️',  label: 'AOT',     cls: 'placeholder-aot'     },
  kimetsu: { emoji: '🌸',  label: 'KIMETSU', cls: 'placeholder-kimetsu' },
  pokemon: { emoji: '⚡',  label: 'POKÉMON', cls: 'placeholder-pokemon' },
  sanrio:  { emoji: '🎀',  label: 'SANRIO',  cls: 'placeholder-sanrio'  },
};

const CATEGORY_NAMES = {
  fma:     '강철의 연금술사',
  aot:     '진격의 거인',
  kimetsu: '귀멸의 칼날',
  pokemon: '포켓몬',
  sanrio:  '산리오',
};

function makeCategoryVariableName(categoryName) {
  const key = categoryName.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
  return `QUIZ_DATA_${key}`;
}

// 카테고리별 이미지 파일명 prefix (디렉토리 안의 파일명)
const CATEGORY_IMG_PREFIX = {
  sanrio: 'san-',
  pokemon: 'po-',
  aot: 'aot-',
  dragonball: 'db-',
  // 아래는 다른 명명 규칙 사용 → 기본값 변형
};
const CATEGORY_IMG_BUILDER = {
  fma:     (n) => `fma-img${n}`,
  kimetsu: (n) => `kimetsu-image${n}`,
};

function resolveQuizImage(img, category, index) {
  if (!img) return null;

  const lastSegment = img.split('/').pop();
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(lastSegment);
  if (!img.endsWith('/') && hasExtension) return img;

  const directory = img.endsWith('/') ? img : `${img}/`;
  const n = index + 1;

  // 카테고리별 빌더 우선
  if (CATEGORY_IMG_BUILDER[category]) {
    return `${directory}${CATEGORY_IMG_BUILDER[category](n)}.png`;
  }
  const prefix = CATEGORY_IMG_PREFIX[category];
  if (prefix) {
    return `${directory}${prefix}${n}.png`;
  }
  // 레거시 fallback
  return `${directory}${category}-img${n}.png`;
}

// 확장자 자동 폴백 (.png → .jpg → .jpeg)
function tryNextImageExt(e) {
  const cur = e.target.src;
  const m = cur.match(/\.(png|jpg|jpeg)$/i);
  if (!m) return false;
  const order = ['png', 'jpg', 'jpeg'];
  const idx = order.indexOf(m[1].toLowerCase());
  const next = order[idx + 1];
  if (!next) return false;
  e.target.src = cur.replace(/\.(png|jpg|jpeg)$/i, `.${next}`);
  return true;
}

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = (searchParams.get('category') || 'aot').toLowerCase();
  const mode     = searchParams.get('mode') || 'normal';
  const wrongInput = sessionStorage.getItem('oz_wrong_indices') || "";
  const initialScore = parseInt(searchParams.get('score')) || 0;
  const meta = CATEGORY_META[category] || { emoji: '✨', label: 'QUIZ', cls: 'placeholder-default' };

  useEffect(() => {
    document.body.classList.add("quiz");
    trackQuizStart(category, mode);
    return () => {
      document.body.classList.remove("quiz");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── State ── */
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); // 오답 인덱스 추적
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [remainSec, setRemainSec] = useState(TIMER_SEC);
  const [timerPct, setTimerPct] = useState(100);
  const [timerUrgent, setTimerUrgent] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [explainText, setExplainText] = useState('');
  const [polaroidPop, setPolaroidPop] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [combo, setCombo] = useState(0);
  const [comboFlash, setComboFlash] = useState(false);
  const [screenFx, setScreenFx] = useState(''); // 'correct' | 'wrong' | ''
  const lastTickRef = useRef(-1);

  const timerRef = useRef(null);
  const remainRef = useRef(TIMER_SEC);

  /* ── 데이터 로딩 (HTML loadQuizData 로직) ── */
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `/data/${category}.js`; // public/data 폴더 기준
    script.onload = () => {
      const varName = makeCategoryVariableName(category);
      const data = window[varName] || globalThis[varName];
      if (!data || !Array.isArray(data)) {
        console.error('데이터 로드 실패');
        return;
      }
      // 원본 인덱스 부여 및 부활 모드 처리
      const dataWithIndex = data.map((item, idx) => ({ ...item, _originalIdx: idx }));

      if (mode === 'revival' && wrongInput) {
        const targetIndices = wrongInput.split(',').map(Number);
        setQuestions(dataWithIndex.filter((_, idx) => targetIndices.includes(idx)));
      } else {
        // 데이터 순서 그대로 30문제 사용
        setQuestions(dataWithIndex.slice(0, TOTAL_QUESTIONS));
      }
    };
    script.onerror = () => console.error('퀴즈 데이터를 불러올 수 없습니다.');
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [category]);

  /* ── 타이머 제어 ── */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    remainRef.current = TIMER_SEC;
    setRemainSec(TIMER_SEC);
    setTimerPct(100);
    setTimerUrgent(false);

    timerRef.current = setInterval(() => {
      remainRef.current -= 1;
      const pct = Math.max((remainRef.current / TIMER_SEC) * 100, 0);
      setRemainSec(remainRef.current);
      setTimerPct(pct);

      if (remainRef.current <= 5) setTimerUrgent(true);

      // 마지막 5초 째깍 사운드
      if (remainRef.current > 0 && remainRef.current <= 5 && lastTickRef.current !== remainRef.current) {
        lastTickRef.current = remainRef.current;
        sfx.tick();
      }

      if (remainRef.current <= 0) {
        stopTimer();
        sfx.timeout();
        setCombo(0);
        setScreenFx('wrong');
        setTimeout(() => setScreenFx(''), 500);
        // 시간 초과 처리
        setAnswered(true);
        setFeedback({ text: '시간 초과! ⏰ 자동 오답 처리', type: 'wrong' });
        setExplainText(questions[currentIndex]?.explanation || '시간 초과입니다. 해설을 확인한 뒤 다음 문제를 눌러주세요.');
        setShowExplain(true);
        setBtnDisabled(true);

        // 시간 초과 시 오답 기록
        const currentItem = questions[currentIndex];
        const oid = (currentItem && currentItem._originalIdx !== undefined) ? currentItem._originalIdx : currentIndex;
        setWrongAnswers(prev => [...prev, oid]);
      }
    }, 1000);
  }, [currentIndex, questions, stopTimer]);

  /* ── 문제 세팅 (HTML setQuestion 로직) ── */
  useEffect(() => {
    if (questions.length === 0) return;

    setPolaroidPop(false);
    // Reflow 효과 재현
    setTimeout(() => setPolaroidPop(true), 10);

    setAnswered(false);
    setFeedback({ text: '', type: '' });
    setShowExplain(false);
    setBtnDisabled(false);
    startTimer();

    return () => stopTimer();
  }, [currentIndex, questions, startTimer, stopTimer]);

  /* ── 답변 처리 (HTML btnYes/No 클릭 로직) ── */
  const handleAnswer = (userAnswer) => {
    if (answered || !questions[currentIndex]) return;

    setAnswered(true);
    stopTimer();
    setBtnDisabled(true);
    sfx.click();

    const isRight = questions[currentIndex].a === userAnswer;
    trackQuizAnswer(category, isRight, currentIndex);

    if (isRight) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      sfx.correct();
      setScreenFx('correct');
      setTimeout(() => setScreenFx(''), 450);

      if (newCombo >= 3) {
        sfx.combo();
        setComboFlash(true);
        setTimeout(() => setComboFlash(false), 600);
      }

      setFeedback({
        text: newCombo >= 2 ? `정답! ✨ ${newCombo} COMBO!` : '정답입니다! ✨',
        type: 'correct',
      });
      setTimeout(() => goNext(true), 800);
    } else {
      const currentItem = questions[currentIndex];
      const oid = (currentItem && currentItem._originalIdx !== undefined) ? currentItem._originalIdx : currentIndex;
      setWrongAnswers(prev => [...prev, oid]);
      setCombo(0);
      sfx.wrong();
      setScreenFx('wrong');
      setTimeout(() => setScreenFx(''), 500);

      setFeedback({ text: '오답입니다! 💦', type: 'wrong' });
      setExplainText(questions[currentIndex]?.explanation || '오답입니다. 해설을 확인하고, 다음 문제 버튼을 눌러주세요.');
      setShowExplain(true);
    }
  };

  const goNext = (wasCorrect) => {
    if (wasCorrect) setScore(prev => prev + 1);
    
    const next = currentIndex + 1;
    if (next >= questions.length || next >= TOTAL_QUESTIONS) {
      // 리액트에서는 상태 업데이트가 비동기이므로 최신 데이터 직접 계산
      let finalScore = mode === 'revival' ? (initialScore + (wasCorrect ? score + 1 : score)) : (wasCorrect ? score + 1 : score);
      
      // 스코어 캡 (최대 30점)
      if (finalScore > TOTAL_QUESTIONS) finalScore = TOTAL_QUESTIONS;

      const finalWrong = wasCorrect ? wrongAnswers : [...wrongAnswers]; // 이미 handleAnswer에서 추가됨
      
      sessionStorage.setItem('oz_wrong_indices', finalWrong.join(','));
      const query = new URLSearchParams({
        category,
        score: finalScore,
        mode
      }).toString();
      
      trackQuizComplete(category, finalScore, mode);
      navigate(`/test-result?${query}`);
      return;
    }
    setCurrentIndex(next);
  };

  /* ── UI 보조 변수 ── */
  const item = questions[currentIndex];
  const scoreWidth = Math.round((score / TOTAL_QUESTIONS) * 100);
  
  let scoreBadge = '준비';
  if (scoreWidth >= 90) scoreBadge = '전설의 덕후';
  else if (scoreWidth >= 70) scoreBadge = '고인물';
  else if (scoreWidth >= 50) scoreBadge = '진성 팬';
  else if (scoreWidth >= 30) scoreBadge = '라이트 팬';
  else if (currentIndex > 0) scoreBadge = '입문자';

  const imgSrc = resolveQuizImage(item?.img, category, currentIndex) || (window.CATEGORY_IMAGES_30?.[category]?.[currentIndex]) || null;

  return (
    <div className={`container quiz-container ${screenFx === 'wrong' ? 'shake' : ''}`}>
      {/* 화면 플래시 오버레이 */}
      <div className={`screen-flash ${screenFx}`} aria-hidden="true" />

      {/* 콤보 표시 */}
      {combo >= 2 && (
        <div className={`combo-badge ${comboFlash ? 'flash' : ''}`}>
          <span className="combo-num">{combo}</span>
          <span className="combo-label">COMBO</span>
        </div>
      )}

      {/* 카운트다운 (마지막 5초) */}
      {timerUrgent && remainSec > 0 && !answered && (
        <div key={remainSec} className="countdown-num">{remainSec}</div>
      )}

      {/* 헤더 */}
      <div className="quiz-header">
        <div>
          <span className="mode-badge">
            {CATEGORY_NAMES[category] || category.toUpperCase()}
          </span>
        </div>
        <div id="progressText">{currentIndex + 1} / {TOTAL_QUESTIONS}</div>
      </div>

      {/* 진행 도트 */}
      <div className="progress-dots">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
          <span
            key={i}
            className={`progress-dot ${i < currentIndex ? 'done' : ''} ${i === currentIndex ? 'current' : ''}`}
          />
        ))}
      </div>

      {/* 폴라로이드 프레임 */}
      <div className="polaroid-outer">
        <div className={`polaroid ${polaroidPop ? 'pop' : ''}`}>
          <div className="polaroid-img-area">
            {imgSrc ? (
              <img
                className="polaroid-img"
                src={imgSrc}
                alt="quiz"
                onError={(e) => {
                  if (!tryNextImageExt(e)) {
                    e.target.style.display = 'none';
                  }
                }}
              />
            ) : (
              <div className={`polaroid-placeholder ${meta.cls}`}>
                <span className="ph-emoji">{meta.emoji}</span>
                <span className="ph-label">{meta.label}</span>
              </div>
            )}
          </div>
          <div className="polaroid-bottom">
            <span className="polaroid-q-num">Q{currentIndex + 1} / {TOTAL_QUESTIONS}</span>
          </div>
        </div>
      </div>

      {/* 질문 */}
      <div className="question-card">
        <div className="question-text">
          {item ? item.q : '문제를 불러오는 중...'}
        </div>
      </div>

      {/* 타이머 */}
      <div className="timer-wrap">
        <div 
          className={`timer-fill ${timerUrgent ? 'urgent' : ''}`} 
          style={{ width: `${timerPct}%` }}
        />
      </div>

      {/* 피드백 */}
      <div className="feedback-wrap">
        <div className={`feedback ${feedback.type}`}>
          {feedback.text}
        </div>
      </div>

      {/* 해설 (explainWrap) */}
      {showExplain && (
        <div className="explain-wrap" role="dialog" aria-label="해설">
          <div className="explain-header">
            <span className="explain-icon" aria-hidden="true">💡</span>
            <span className="explain-title">해설</span>
            {item && (
              <span className={`explain-answer-badge ${item.a ? 'yes' : 'no'}`}>
                정답: <strong>{item.a ? 'YES' : 'NO'}</strong>
              </span>
            )}
          </div>
          <p className="explain-text">{explainText}</p>
          <button className="explain-next-btn" onClick={() => goNext(false)}>
            <span>다음 문제</span>
            <span className="explain-next-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      )}

      {/* YES / NO */}
      <div className="action-btns">
        <button className="btn btn-normal" onClick={() => handleAnswer(true)} disabled={btnDisabled}>
          <span>YES</span>
        </button>
        <button className="btn btn-hard" onClick={() => handleAnswer(false)} disabled={btnDisabled}>
          <span>NO</span>
        </button>
      </div>

      {/* 점수 게이지 */}
      <div className="card gauge-wrap">
        <div className="gauge-header">
          <span className="gauge-label">현재 점수</span>
          <span className="gauge-score">{score}</span>
        </div>
        <div className="gauge-track">
          <div className="gauge-fill" style={{ width: `${scoreWidth}%` }} />
        </div>
        <div className="gauge-footer">
          <span className="gauge-grade-badge">{scoreBadge}</span>
        </div>
      </div>
    </div>
  );
}