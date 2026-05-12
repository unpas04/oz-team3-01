import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  evaluateQuizResult,
  calculatePercentile,
} from '../modules/data-module';
import { useAuth } from '../contexts/AuthContext';
import { submitQuizScore, getMyRank } from '../modules/firestore';
import AuthModal from '../components/AuthModal';
import { trackRankCheck, trackStarEarned, trackShare } from '../modules/analytics';
import { getAffiliateProducts, COUPANG_DISCLOSURE } from '../modules/affiliate';
import '../styles/result.css';

const CATEGORY_NAMES = {
  sanrio: "산리오", pokemon: "포켓몬", aot: "진격의 거인",
  kimetsu: "귀멸의 칼날", fma: "강철의 연금술사", jjk: "주술회전",
  dragonball: "드래곤볼", chainsawman: "체인소맨", deathnote: "데스노트",
  fate: "페이트 시리즈",
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

// 등급별 파스텔 테마
const GRADE_THEMES = {
  S: {
    cardBg: 'linear-gradient(135deg, #FFE4EC 0%, #FFF2D8 50%, #FFD9A8 100%)',
    accent: '#E8A5B8',
    deepAccent: '#C17A8F',
    textDark: '#6B4A5C',
    textMid: '#8B6B7D',
    glow: 'rgba(232, 165, 184, 0.5)',
    sparkles: ['✦', '✧', '⋆', '✦', '✧'],
    emoji: '👑'
  },
  A: {
    cardBg: 'linear-gradient(135deg, #E8E1F5 0%, #F3E5F5 50%, #FFE1F0 100%)',
    accent: '#B39DDB',
    deepAccent: '#7E6BAB',
    textDark: '#4A3B6E',
    textMid: '#6B5B8A',
    glow: 'rgba(179, 157, 219, 0.4)',
    sparkles: ['✦', '♡', '⋆', '✦', '♡'],
    emoji: '🎀'
  },
  B: {
    cardBg: 'linear-gradient(135deg, #D4F1E8 0%, #E8F5E9 50%, #F0F4C3 100%)',
    accent: '#80CBC4',
    deepAccent: '#4A9B92',
    textDark: '#2F5B56',
    textMid: '#4E7670',
    glow: 'rgba(128, 203, 196, 0.4)',
    sparkles: ['✿', '⋆', '✦', '✿', '⋆'],
    emoji: '🌿'
  },
  C: {
    cardBg: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCCBC 100%)',
    accent: '#FFAB91',
    deepAccent: '#D87760',
    textDark: '#6B3E2E',
    textMid: '#8B5C4C',
    glow: 'rgba(255, 171, 145, 0.4)',
    sparkles: ['☁', '⋆', '✦', '☁', '⋆'],
    emoji: '🍑'
  },
  D: {
    cardBg: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 50%, #F3E5F5 100%)',
    accent: '#90CAF9',
    deepAccent: '#5B8FC9',
    textDark: '#2E4F73',
    textMid: '#4A6B8A',
    glow: 'rgba(144, 202, 249, 0.4)',
    sparkles: ['☁', '⋆', '✦', '☁', '⋆'],
    emoji: '🎠'
  }
};

export default function TestResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // URL에서 결과 파라미터
  const urlCategory = searchParams.get('category') || 'kimetsu';
  const urlMode = searchParams.get('mode') || 'normal';
  const urlScore = parseInt(searchParams.get('score'));

  const [score, setScore] = useState(Number.isFinite(urlScore) ? urlScore : 27);
  const [toast, setToast] = useState(null);
  const category = urlCategory;
  const mode = urlMode;
  const wrongStr = sessionStorage.getItem('oz_wrong_indices') || "";
  const wrongIndices = wrongStr ? wrongStr.split(',').map(Number) : [];

  // 점수/별딱지 등록 + 결과 모달
  const [authOpen, setAuthOpen] = useState(false);
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [gotStar, setGotStar] = useState(false);
  const [myRankInfo, setMyRankInfo] = useState(null);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const submittedRef = useRef(false);

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
      if (res?.gotStar) {
        setGotStar(true);
        trackStarEarned(category);
      }

      // getMyRank 실패해도 모달은 열리도록 방어
      try {
        const rank = await getMyRank(user.uid);
        setMyRankInfo(rank);
      } catch (rankErr) {
        console.warn("rank lookup failed (non-blocking):", rankErr);
        setMyRankInfo(null);
      }

      setSubmitState("done");
      setRankModalOpen(true);
    } catch (err) {
      console.error("submit score failed", err);
      setSubmitState("failed");
      const code = err?.code || err?.message || "unknown";
      setSubmitError(`등록 실패: ${code}`);
      submittedRef.current = false;
    }
  };

  const handleCheckRank = () => {
    trackRankCheck(category, score);
    if (!user) {
      setPendingSubmit(true);
      setAuthOpen(true);
      return;
    }
    doSubmitAndShow();
  };

  useEffect(() => {
    if (pendingSubmit && user && profile?.nickname) {
      setPendingSubmit(false);
      doSubmitAndShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSubmit, user, profile]);

  const { gradeInfo, scorePct } = evaluateQuizResult(category, mode, score, wrongIndices);
  const animScore = useCountUp(score);
  const percentile = calculatePercentile(scorePct);

  // 티어 정보 (각 등급별 색상)
  const TIERS = [
    { label: 'D', color: '#90CAF9', deep: '#5B8FC9' },
    { label: 'C', color: '#FFAB91', deep: '#D87760' },
    { label: 'B', color: '#80CBC4', deep: '#4A9B92' },
    { label: 'A', color: '#B39DDB', deep: '#7E6BAB' },
    { label: 'S', color: '#E8A5B8', deep: '#C17A8F' },
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  const handleKakaoShare = () => {
    trackShare("kakao", category);
    showToast('이미지를 저장하여 카톡 친구들에게 공유해보세요! 💛');
  };

  const handleInstaShare = () => {
    trackShare("instagram", category);
    showToast('이미지를 저장하여 인스타 스토리에 올려보세요! ✦');
  };

  const handleImageSave = async () => {
    trackShare("image_save", category);
    try {
      const { toPng } = await import('html-to-image');
      const card = document.getElementById('result-share-card');
      if (!card) return;

      // 폰트 로드 대기 (커스텀 폰트가 캡처에 반영되도록)
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const dataUrl = await toPng(card, {
        cacheBust: true,
        pixelRatio: 2, // 3은 너무 높아서 일부 브라우저에서 실패할 수 있음
        backgroundColor: '#FFF8F5', // 투명도 문제 방지 위해 배경 명시
        style: {
          transform: 'scale(1)',
          borderRadius: '36px'
        }
      });

      const safeTitle = (gradeInfo.title || 'result').replace(/\s+/g, '_');
      const link = document.createElement('a');
      link.download = `dukryeok_result_${category}_${safeTitle}.png`;
      link.href = dataUrl;
      link.click();
      showToast('이미지가 갤러리에 저장되었습니다! ✦');
    } catch (err) {
      console.error('이미지 저장 실패:', err);
      showToast('이미지 저장에 실패했어요 ✦');
    }
  };

  const handleLinkCopy = async () => {
    trackShare("link_copy", category);
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}&utm_source=share&utm_medium=link`;
      await navigator.clipboard.writeText(shareUrl);
      showToast('공유 링크가 복사되었어요! ✦');
    } catch {
      showToast('복사에 실패했어요 ✦');
    }
  };

  const testScores = [
    { label: 'D (0점)', value: 0 },
    { label: 'C (10점)', value: 10 },
    { label: 'B (15점)', value: 15 },
    { label: 'A (21점)', value: 21 },
    { label: 'S (27점)', value: 27 },
  ];

  const theme = GRADE_THEMES[gradeInfo.label] || GRADE_THEMES.D;

  // 폭죽 파티클 팔레트
  const PARTICLE_COLORS = ['#FF6B9D', '#C66FBC', '#7B9FE0', '#FFD93D', '#6BCF7F', '#FFA07A', '#E066FF', '#FF8FAB'];

  // 폭죽 위치 (여러 지점에서 시간차로 터짐)
  const fireworks = [
    { x: 20, y: 25, delay: 0, color: '#FF6B9D' },
    { x: 75, y: 20, delay: 1.2, color: '#C66FBC' },
    { x: 15, y: 70, delay: 2.4, color: '#7B9FE0' },
    { x: 80, y: 75, delay: 0.6, color: '#FFD93D' },
    { x: 50, y: 15, delay: 3.0, color: '#E066FF' },
    { x: 30, y: 50, delay: 1.8, color: '#6BCF7F' },
    { x: 70, y: 55, delay: 3.6, color: '#FF8FAB' },
    { x: 10, y: 40, delay: 2.8, color: '#FFA07A' },
    { x: 90, y: 45, delay: 1.5, color: '#FF6B9D' },
    { x: 45, y: 85, delay: 3.2, color: '#7B9FE0' },
  ];

  // 각 폭죽 안의 파티클 (방사형)
  const createBurst = (fwIndex, color) => {
    const count = 14;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360;
      const distance = 80 + Math.random() * 60;
      const dx = Math.cos((angle * Math.PI) / 180) * distance;
      const dy = Math.sin((angle * Math.PI) / 180) * distance;
      const size = 4 + Math.random() * 6;
      const particleColor = Math.random() > 0.5 ? color : PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      return { id: `${fwIndex}-${i}`, dx, dy, size, color: particleColor };
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #FFF8F5 0%, #FFEEF4 50%, #F0E8FF 100%)',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Pretendard', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ═══════ 오로라 레이어 (3개 조합) ═══════ */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(ellipse at 20% 30%, rgba(255, 182, 213, 0.55), transparent 50%)',
        animation: 'auroraDrift1 18s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(ellipse at 75% 40%, rgba(199, 164, 232, 0.5), transparent 50%)',
        animation: 'auroraDrift2 22s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(ellipse at 45% 75%, rgba(164, 212, 232, 0.45), transparent 50%)',
        animation: 'auroraDrift3 26s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(70px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        background: 'radial-gradient(ellipse at 80% 85%, rgba(255, 214, 164, 0.4), transparent 50%)',
        animation: 'auroraDrift4 20s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(65px)'
      }} />

      {/* ═══════ 폭죽 ═══════ */}
      {fireworks.map((fw, fwIndex) => (
        <div
          key={`fw-${fwIndex}`}
          style={{
            position: 'absolute',
            top: `${fw.y}%`,
            left: `${fw.x}%`,
            width: 0,
            height: 0,
            pointerEvents: 'none'
          }}
        >
          {/* 중심 플래시 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px',
            background: `radial-gradient(circle, ${fw.color}, transparent 70%)`,
            borderRadius: '50%',
            animation: `fireworkFlash 2.4s ease-out infinite`,
            animationDelay: `${fw.delay}s`,
            filter: 'blur(4px)',
            opacity: 0
          }} />

          {/* 방사형 파티클 */}
          {createBurst(fwIndex, fw.color).map(p => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${p.size}px`,
                height: `${p.size}px`,
                marginLeft: `-${p.size / 2}px`,
                marginTop: `-${p.size / 2}px`,
                background: p.color,
                borderRadius: '50%',
                boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px rgba(255,255,255,0.4)`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animation: `fireworkBurst 2.4s ease-out infinite`,
                animationDelay: `${fw.delay}s`,
                opacity: 0
              }}
            />
          ))}
        </div>
      ))}

      <style>{`
        @font-face {
          font-family: 'YPairingFont';
          src: url('/fonts/YPairingFont-Regular.ttf') format('truetype');
          font-weight: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'YPairingFont';
          src: url('/fonts/YPairingFont-Bold.ttf') format('truetype');
          font-weight: bold;
          font-display: swap;
        }
        @font-face {
          font-family: 'Shilla_Culture';
          src: url('/fonts/Shilla_Culture(M).otf') format('opentype');
          font-weight: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Shilla_Culture';
          src: url('/fonts/Shilla_Culture(B).otf') format('opentype');
          font-weight: bold;
          font-display: swap;
        }
        @keyframes auroraDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(8%, 5%) scale(1.15); }
          66% { transform: translate(-5%, 10%) scale(0.95); }
        }
        @keyframes auroraDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10%, 8%) scale(1.1); }
          66% { transform: translate(6%, -6%) scale(1.2); }
        }
        @keyframes auroraDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(10%, -8%) scale(1.15); }
          70% { transform: translate(-8%, 5%) scale(0.9); }
        }
        @keyframes auroraDrift4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12%, -10%) scale(1.2); }
        }
        @keyframes fireworkBurst {
          0% {
            transform: translate(0, 0) scale(0.3);
            opacity: 0;
          }
          5% {
            opacity: 1;
            transform: translate(0, 0) scale(1.4);
          }
          40% {
            transform: translate(var(--dx), var(--dy)) scale(1);
            opacity: 1;
          }
          70% {
            transform: translate(var(--dx), calc(var(--dy) + 20px)) scale(0.6);
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--dx), calc(var(--dy) + 60px)) scale(0);
            opacity: 0;
          }
        }
        @keyframes tierGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: brightness(1);
          }
          50% {
            transform: translateY(-2px) scale(1.04);
            filter: brightness(1.12);
          }
        }
        @keyframes markerBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-3px); }
        }
        @keyframes fireworkFlash {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          5% {
            opacity: 1;
            transform: scale(3);
          }
          15% {
            opacity: 0.6;
            transform: scale(5);
          }
          30% {
            opacity: 0;
            transform: scale(7);
          }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-0.3deg); }
        }
        @keyframes sparkle1 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          20% { opacity: 1; transform: translate(-5px, -8px) scale(1); }
          50% { opacity: 0.6; transform: translate(-10px, -15px) scale(0.8); }
          80% { opacity: 0; transform: translate(-15px, -20px) scale(0.3); }
        }
        @keyframes sparkle2 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          20% { opacity: 1; transform: translate(8px, -5px) scale(1); }
          50% { opacity: 0.6; transform: translate(12px, -12px) scale(0.8); }
          80% { opacity: 0; transform: translate(18px, -18px) scale(0.3); }
        }
        @keyframes sparkle3 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          20% { opacity: 1; transform: translate(-8px, 8px) scale(1); }
          50% { opacity: 0.6; transform: translate(-12px, 15px) scale(0.8); }
          80% { opacity: 0; transform: translate(-16px, 22px) scale(0.3); }
        }
        @keyframes shimmerSweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* 순위 확인하기 CTA */}
      <button
        type="button"
        onClick={handleCheckRank}
        disabled={submitState === "submitting"}
        className="check-rank-btn"
        style={{
          maxWidth: '360px',
          width: '100%',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 2,
          padding: '13px 18px',
          border: 'none',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #FF85A1 0%, #C084FC 100%)',
          color: '#fff',
          fontFamily: 'YPairingFont, sans-serif',
          fontWeight: 'bold',
          fontSize: '1rem',
          letterSpacing: '1.5px',
          cursor: submitState === "submitting" ? 'not-allowed' : 'pointer',
          boxShadow: '0 6px 20px rgba(192, 132, 252, 0.4), inset 0 1px 0 rgba(255,255,255,0.55)',
          opacity: submitState === "submitting" ? 0.65 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z"
            fill="#FFE48A" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <span>
          {submitState === "submitting"
            ? "등록 중…"
            : submitState === "done"
            ? "내 순위 다시 보기"
            : "순위 확인하기"}
        </span>
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3 L11 8 L5 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {submitError && (
        <div style={{
          maxWidth: '360px', width: '100%', marginBottom: '14px',
          padding: '9px 12px', background: 'rgba(255,220,225,0.85)',
          border: '1px solid rgba(255,100,120,0.35)', borderRadius: '10px',
          color: '#B82844', fontSize: '0.84rem', textAlign: 'center', zIndex: 2,
        }}>{submitError}</div>
      )}

      {/* 공유 카드 */}
      <div
        id="result-share-card"
        style={{
          width: '100%',
          maxWidth: '360px',
          minHeight: '720px',
          background: theme.cardBg,
          borderRadius: '36px',
          padding: '32px 26px',
          boxShadow: `
            0 20px 60px ${theme.glow},
            0 8px 24px rgba(0, 0, 0, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.6)
          `,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          animation: 'cardFloat 6s ease-in-out infinite',
          zIndex: 1
        }}
      >
        {/* 카드 위 호일 반사 (부드러운 gleam) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 5s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'overlay',
            opacity: 0.7
          }}
        />

        {/* 부드러운 빛 웅덩이 */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '10%',
            width: '70%',
            height: '50%',
            background: `radial-gradient(ellipse, rgba(255, 255, 255, 0.7), transparent 65%)`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'glowPulse 4s ease-in-out infinite'
          }}
        />

        {/* 구석 귀여운 스파클들 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '12%',
          fontSize: '14px',
          color: theme.accent,
          pointerEvents: 'none',
          zIndex: 3,
          animation: 'sparkle1 3s ease-in-out infinite'
        }}>{theme.sparkles[0]}</div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          fontSize: '12px',
          color: theme.accent,
          pointerEvents: 'none',
          zIndex: 3,
          animation: 'sparkle2 3.5s ease-in-out infinite 1s'
        }}>{theme.sparkles[1]}</div>
        <div style={{
          position: 'absolute',
          bottom: '40%',
          left: '15%',
          fontSize: '10px',
          color: theme.accent,
          pointerEvents: 'none',
          zIndex: 3,
          animation: 'sparkle3 4s ease-in-out infinite 2s'
        }}>{theme.sparkles[2]}</div>
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          fontSize: '11px',
          color: theme.accent,
          pointerEvents: 'none',
          zIndex: 3,
          animation: 'sparkle1 3.2s ease-in-out infinite 1.5s'
        }}>{theme.sparkles[3]}</div>

        {/* 상단 영역 */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px'
        }}>
          {/* 이모지 + 등급 배지 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            animation: 'bounce 3s ease-in-out infinite'
          }}>
            <span style={{
              fontSize: '32px',
              fontFamily: "'MonaEmoji', monospace",
              imageRendering: 'pixelated',
              lineHeight: 1
            }}>{theme.emoji}</span>
            <div style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: '999px',
              border: `1.5px solid ${theme.accent}`,
              fontSize: '14px',
              fontWeight: '800',
              color: theme.deepAccent,
              letterSpacing: '1.5px',
              boxShadow: `0 4px 12px ${theme.glow}`,
              fontFamily: "'MonaS12TextHK', sans-serif"
            }}>
              {gradeInfo.label} GRADE
            </div>
          </div>

          {/* 제목 */}
          <h1 style={{
            fontSize: '26px',
            fontWeight: '900',
            color: theme.textDark,
            textAlign: 'center',
            margin: 0,
            lineHeight: '1.25',
            letterSpacing: '-0.3px',
            textShadow: '0 2px 6px rgba(255,255,255,0.5)',
            fontFamily: "'YPairingFont', sans-serif"
          }}>
            {gradeInfo.title}
          </h1>

          {/* 서브타이틀 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(6px)',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '800',
            color: theme.deepAccent,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontFamily: "'MonaS12TextHK', sans-serif"
          }}>
            {gradeInfo.desc}
          </div>
        </div>

        {/* 중간 설명 (아기자기한 카드) */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(10px)',
          borderRadius: '22px',
          padding: '24px 22px',
          margin: '18px 0',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          boxShadow: `0 6px 22px ${theme.glow}`,
          fontSize: '13.5px',
          fontWeight: '600',
          color: theme.textMid,
          lineHeight: '1.75',
          textAlign: 'left',
          whiteSpace: 'pre-wrap',
          letterSpacing: '0.1px',
          wordBreak: 'keep-all'
        }}>
          {gradeInfo.introduction}
        </div>
        
        {/* 점수 영역 */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          width: '100%'
        }}>
          {/* ═══ 티어 랭크 ═══ */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: '800',
              color: theme.deepAccent,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              opacity: 0.7
            }}>
              ✦ Tier Rank ✦
            </div>

            {/* 5개 등급 뱃지 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 8px 0',
              position: 'relative'
            }}>
              {TIERS.map(t => {
                const isMine = t.label === gradeInfo.label;
                return (
                  <div
                    key={t.label}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {/* 본인 위치 마커 */}
                    {isMine && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: `7px solid ${t.deep}`,
                        animation: 'markerBounce 1.6s ease-in-out infinite',
                        filter: `drop-shadow(0 2px 4px ${t.color})`
                      }} />
                    )}

                    {/* 뱃지 */}
                    <div style={{
                      width: isMine ? '40px' : '26px',
                      height: isMine ? '40px' : '26px',
                      borderRadius: '50%',
                      background: isMine
                        ? `linear-gradient(135deg, ${t.color}, ${t.deep})`
                        : 'rgba(255, 255, 255, 0.45)',
                      border: isMine
                        ? '2px solid rgba(255, 255, 255, 0.9)'
                        : '1.5px solid rgba(255, 255, 255, 0.5)',
                      color: isMine ? '#fff' : t.deep,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '900',
                      fontSize: isMine ? '16px' : '11px',
                      letterSpacing: '0.5px',
                      boxShadow: isMine
                        ? `0 0 24px ${t.color}, 0 6px 16px ${t.deep}88, inset 0 0 12px rgba(255,255,255,0.4)`
                        : '0 2px 6px rgba(0,0,0,0.05)',
                      opacity: isMine ? 1 : 0.55,
                      transition: 'all 0.3s ease',
                      animation: isMine ? 'tierGlow 2.4s ease-in-out infinite' : 'none',
                      fontFamily: "'MonaS12TextHK', sans-serif",
                      backdropFilter: !isMine ? 'blur(6px)' : 'none'
                    }}>
                      {t.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 상위 % */}
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: theme.textMid,
              marginTop: '6px',
              padding: '4px 14px',
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(8px)',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              fontFamily: "'MonaS12TextHK', sans-serif",
              letterSpacing: '0.3px'
            }}>
              상위 <span style={{
                color: theme.deepAccent,
                fontWeight: '900',
                fontSize: '14px',
                margin: '0 2px'
              }}>{percentile.toFixed(1)}%</span>
            </div>
          </div>

          {/* 구분선 */}
          <div style={{
            width: '40%',
            height: '1px',
            background: `linear-gradient(to right, transparent, ${theme.accent}66, transparent)`,
            margin: '8px 0 4px'
          }} />

          <div style={{
            fontSize: '10px',
            fontWeight: '800',
            color: theme.deepAccent,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            opacity: 0.7
          }}>
            ⋆ Final Score ⋆
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            color: theme.textDark
          }}>
            <span style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: '1',
              letterSpacing: '-1px',
              textShadow: `0 2px 8px ${theme.glow}`
            }}>
              {Math.min(animScore, 30)}
            </span>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              opacity: 0.5
            }}>
              / 30
            </span>
          </div>

          {/* 명대사 */}
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: theme.textMid,
            textAlign: 'center',
            lineHeight: '1.5',
            marginTop: '10px',
            padding: '0 8px',
            fontFamily: "'Shilla_Culture', serif"
          }}>
            "{gradeInfo.quote}"
          </div>

          {/* 특징 */}
          {gradeInfo.characteristic && (
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              color: theme.deepAccent,
              textAlign: 'center',
              letterSpacing: '0.3px',
              marginTop: '8px'
            }}>
              ⋆ {gradeInfo.characteristic} ⋆
            </div>
          )}
        </div>

        {/* 하단 로고 */}
        <div style={{
          position: 'relative',
          zIndex: 4,
          fontSize: '11px',
          fontWeight: '800',
          color: theme.deepAccent,
          letterSpacing: '3px',
          opacity: 0.7,
          marginTop: '12px',
          fontFamily: "'EF_jejudoldam', serif"
        }}>
          ✦ 덕력 감별소 ✦
        </div>
      </div>

      {/* ═══════ 공유 영역 ═══════ */}
      <div style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* 공유 라벨 + 데코 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#A88B9C',
          fontSize: '11px',
          fontWeight: '800',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          <span style={{
            width: '24px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #D4B5C4)'
          }} />
          ✦ Share with Friends ✦
          <span style={{
            width: '24px',
            height: '1px',
            background: 'linear-gradient(to left, transparent, #D4B5C4)'
          }} />
        </div>

        {/* SNS 버튼 4개 */}
        <div style={{
          display: 'flex',
          gap: '14px'
        }}>
          {/* 카카오톡 */}
          <button
            onClick={handleKakaoShare}
            className="share-btn share-kakao"
            aria-label="카카오톡으로 공유"
          >
            <img src="/assets/sns-ci/kakao.png" alt="카카오톡" />
          </button>

          {/* 인스타그램 */}
          <button
            onClick={handleInstaShare}
            className="share-btn share-insta"
            aria-label="인스타그램으로 공유"
          >
            <img src="/assets/sns-ci/insta.png" alt="인스타그램" />
          </button>

          {/* 이미지 저장 */}
          <button
            onClick={handleImageSave}
            className="share-btn share-download"
            aria-label="이미지로 저장"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          {/* 링크 복사 */}
          <button
            onClick={handleLinkCopy}
            className="share-btn share-link"
            aria-label="링크 복사"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
        </div>

        <style>{`
          .share-btn {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow:
              0 8px 20px rgba(170, 130, 160, 0.18),
              inset 0 0 0 1px rgba(255, 255, 255, 0.6);
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s, background 0.3s;
            position: relative;
            overflow: hidden;
          }
          .share-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: var(--brand-color, transparent);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 0;
          }
          .share-btn img,
          .share-btn svg {
            position: relative;
            z-index: 1;
            width: 26px;
            height: 26px;
            object-fit: contain;
            transition: filter 0.3s, color 0.3s;
          }
          .share-btn:hover,
          .share-btn:active {
            transform: translateY(-4px) scale(1.06);
            box-shadow:
              0 14px 30px rgba(170, 130, 160, 0.3),
              0 0 0 4px rgba(255, 255, 255, 0.4);
          }
          .share-btn:hover::before,
          .share-btn:active::before {
            opacity: 1;
          }

          .share-kakao { --brand-color: #FFE812; color: #3C1E1E; }
          .share-kakao:hover img { filter: none; }

          .share-insta { --brand-color: linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%); }
          .share-insta::before {
            background: linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%);
          }
          .share-insta:hover img { filter: brightness(0) invert(1); }

          .share-download { color: #C17A8F; }
          .share-download::before { background: linear-gradient(135deg, #FF8FAB 0%, #C66FBC 100%); }
          .share-download:hover { color: #fff; }

          .share-link { color: #7B9FE0; }
          .share-link::before { background: linear-gradient(135deg, #A4D4E8 0%, #7B9FE0 100%); }
          .share-link:hover { color: #fff; }

          @keyframes toastPop {
            0% { opacity: 0; transform: translateY(20px) scale(0.9); }
            15% { opacity: 1; transform: translateY(0) scale(1); }
            85% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
          }
        `}</style>

        {/* ═══════ 쿠팡 파트너스 광고 (카테고리별 다중 상품 가로 스크롤) ═══════ */}
        {(() => {
          const products = getAffiliateProducts(category);
          return (
            <div className="affiliate-section">
              <div className="affiliate-header">
                <span className="affiliate-label">SPONSORED · 관련 굿즈</span>
                <span className="affiliate-swipe-hint">← 좌우로 넘겨보기 →</span>
              </div>
              <div className="affiliate-scroll">
                {products.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="affiliate-card"
                    onClick={() => trackShare("affiliate_coupang", category)}
                  >
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="affiliate-thumb" />
                    ) : (
                      <div className="affiliate-thumb-placeholder">
                        <span>{p.keyword}</span>
                      </div>
                    )}
                    <div className="affiliate-text">
                      <div className="affiliate-title">{p.title}</div>
                      {p.subtitle && (
                        <div className="affiliate-subtitle">{p.subtitle}</div>
                      )}
                      <div className="affiliate-cta">
                        쿠팡에서 보기 <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <p className="affiliate-disclosure">{COUPANG_DISCLOSURE}</p>
            </div>
          );
        })()}

        {/* 메인으로 버튼 */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '12px',
            padding: '14px 36px',
            background: '#FF8FAB',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            fontWeight: '800',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(255, 143, 171, 0.4)',
            transition: 'all 0.2s',
            letterSpacing: '0.5px'
          }}
        >
          ✿ 메인으로
        </button>
      </div>

      {/* ═══════ 로그인/가입 모달 ═══════ */}
      <AuthModal
        open={authOpen}
        onClose={() => { setAuthOpen(false); setPendingSubmit(false); }}
        onSuccess={() => setAuthOpen(false)}
      />

      {/* ═══════ 순위 + 별딱지 결과 모달 ═══════ */}
      {rankModalOpen && (
        <div className="modal-overlay active" onClick={() => setRankModalOpen(false)}>
          <div className="modal-card rank-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRankModalOpen(false)}>✕</button>

            {gotStar && (
              <div className="rank-modal-star-banner">
                <svg className="rank-modal-star-svg" viewBox="0 0 64 64" aria-hidden="true">
                  <defs>
                    <linearGradient id="bigStarGradTRP" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFE48A" />
                      <stop offset="50%" stopColor="#FFB347" />
                      <stop offset="100%" stopColor="#FF85A1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M32 6 L38 24 L58 25 L42 37 L48 56 L32 45 L16 56 L22 37 L6 25 L26 24 Z"
                    fill="url(#bigStarGradTRP)"
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

      {/* ═══════ 토스트 ═══════ */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(60, 30, 50, 0.92)',
          backdropFilter: 'blur(20px)',
          color: '#fff',
          padding: '14px 26px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.3px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.1)',
          zIndex: 100,
          animation: 'toastPop 2.4s ease-in-out forwards',
          whiteSpace: 'nowrap'
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
