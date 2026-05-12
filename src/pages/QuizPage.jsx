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
// 펜타토닉 스케일 (Cmaj 펜타토닉) — 각 콤보마다 위로 한 음씩
const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5

const sfx = {
  correct: () => { playTone(880, 0.12, 'sine'); setTimeout(() => playTone(1320, 0.18, 'sine'), 90); },
  wrong:   () => { playTone(220, 0.18, 'square', 0.12); setTimeout(() => playTone(160, 0.25, 'square', 0.12), 100); },
  tick:    () => playTone(1000, 0.05, 'square', 0.08),
  timeout: () => { playTone(180, 0.4, 'sawtooth', 0.18); },
  click:   () => playTone(600, 0.05, 'triangle', 0.08),

  // 콤보별 음정 — 매 콤보마다 한 음씩 위로
  comboStep: (combo) => {
    const n = combo - 2;
    const idx = ((n % PENTATONIC.length) + PENTATONIC.length) % PENTATONIC.length;
    const octave = Math.floor(n / PENTATONIC.length);
    const freq = PENTATONIC[idx] * Math.pow(2, octave);
    playTone(freq, 0.12, 'sine', 0.16);
    setTimeout(() => playTone(freq * 1.5, 0.08, 'triangle', 0.07), 40);
  },

  // 5단위 티어업 — 짧은 상승 코드
  tierUp: () => {
    playTone(523, 0.08, 'sine', 0.18);
    setTimeout(() => playTone(659, 0.08, 'sine', 0.18), 55);
    setTimeout(() => playTone(784, 0.1, 'sine', 0.2), 110);
    setTimeout(() => playTone(1046, 0.18, 'triangle', 0.18), 180);
  },
};

const COMBO_TIERS = [
  { min: 25, name: 'LEGENDARY', primary: '#FF2D55', secondary: '#FFD700', text: '#fff', ring: true,  ringSpeed: '3s' },
  { min: 20, name: 'EPIC',      primary: '#C084FC', secondary: '#FF85A1', text: '#fff', ring: true,  ringSpeed: '4s' },
  { min: 15, name: 'RARE',      primary: '#FFB347', secondary: '#FF8C42', text: '#fff', ring: true,  ringSpeed: '5s' },
  { min: 10, name: 'NICE',      primary: '#5BC97A', secondary: '#3AAA3A', text: '#fff', ring: false, ringSpeed: '6s' },
  { min: 5,  name: 'GOOD',      primary: '#FF85A1', secondary: '#C084FC', text: '#fff', ring: false, ringSpeed: '6s' },
  { min: 2,  name: '',          primary: '#FFD4E5', secondary: '#FFE5A8', text: '#9A4570', ring: false, ringSpeed: '6s' },
];
const getComboTier = (n) => COMBO_TIERS.find((t) => n >= t.min) || COMBO_TIERS[COMBO_TIERS.length - 1];

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

// 확장자 자동 폴백 (.png → .jpg → .jpeg → .webp)
function tryNextImageExt(e) {
  const cur = e.target.src;
  const m = cur.match(/\.(png|jpg|jpeg|webp)$/i);
  if (!m) return false;
  const order = ['png', 'jpg', 'jpeg', 'webp'];
  const idx = order.indexOf(m[1].toLowerCase());
  const next = order[idx + 1];
  if (!next) return false;
  e.target.src = cur.replace(/\.(png|jpg|jpeg|webp)$/i, `.${next}`);
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
  const [comboPulse, setComboPulse] = useState(0); // 매 콤보마다 증가 (애니메이션 재시작 키)
  const [tierUpFlash, setTierUpFlash] = useState(false);
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

      // 콤보 펄스 (매 콤보마다)
      if (newCombo >= 2) {
        setComboPulse((p) => p + 1);
        sfx.comboStep(newCombo);
      }

      // 티어업 (5/10/15/20/25)
      if (newCombo >= 5 && newCombo % 5 === 0) {
        sfx.tierUp();
        setTierUpFlash(true);
        setTimeout(() => setTierUpFlash(false), 700);
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
      {combo >= 2 && (() => {
        const tier = getComboTier(combo);
        return (
          <div
            key={comboPulse}
            className={`combo-badge tier-${(tier.name || 'start').toLowerCase()} ${tierUpFlash ? 'tier-up' : ''}`}
            style={{
              '--tier-primary': tier.primary,
              '--tier-secondary': tier.secondary,
              '--tier-text': tier.text,
              '--ring-speed': tier.ringSpeed,
            }}
          >
            {tier.ring && <div className="combo-ring" aria-hidden="true" />}
            <div className="combo-badge-content">
              <span className="combo-num">{combo}</span>
              <span className="combo-x" aria-hidden="true">×</span>
              <span className="combo-label">COMBO</span>
            </div>
            {tier.name && <div className="combo-tier-name">{tier.name}</div>}
          </div>
        );
      })()}

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

      {/* 점수 게이지 (퀄리티 업) */}
      <div className="quiz-gauge-card">
        <div className="quiz-gauge-top">
          <div className="quiz-gauge-label-wrap">
            <svg className="quiz-gauge-mini-star" viewBox="0 0 16 16" aria-hidden="true">
              <defs>
                <linearGradient id="quizGaugeStarGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFE48A" />
                  <stop offset="50%" stopColor="#FFB347" />
                  <stop offset="100%" stopColor="#FF85A1" />
                </linearGradient>
              </defs>
              <path
                d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z"
                fill="url(#quizGaugeStarGrad)"
                stroke="#FF8C42"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
            <span className="quiz-gauge-label">현재 점수</span>
          </div>
          <div className="quiz-gauge-score-wrap">
            <span className="quiz-gauge-score">{score}</span>
            <span className="quiz-gauge-score-max">/ {TOTAL_QUESTIONS}</span>
          </div>
        </div>
        <div className="quiz-gauge-track">
          <div
            className="quiz-gauge-fill"
            style={{ width: `${scoreWidth}%` }}
          />
        </div>
        <div className="quiz-gauge-footer">
          <span className={`quiz-gauge-badge tier-${scoreBadge === '전설의 덕후' ? 's' : scoreBadge === '고인물' ? 'a' : scoreBadge === '진성 팬' ? 'b' : scoreBadge === '라이트 팬' ? 'c' : 'd'}`}>
            {scoreBadge}
          </span>
        </div>
      </div>
    </div>
  );
}