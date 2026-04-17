import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  evaluateQuizResult,
  getCategoryTitle,
  calculatePercentile,
} from '../modules/data-module';
import "../styles/result.css";

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

  const category = searchParams.get('category') || 'sanrio';
  const mode = searchParams.get('mode') || 'normal';
  const score = parseInt(searchParams.get('score')) || 0;
  const wrongStr = searchParams.get('wrong') || "";
  const wrongIndices = wrongStr ? wrongStr.split(',').map(Number) : [];

  const { gradeInfo, scorePct } = evaluateQuizResult(category, mode, score, wrongIndices);
  const percentile = calculatePercentile(scorePct);
  const animScore = useCountUp(score);

  const [imgSrc, setImgSrc] = useState("");
  const [analysis, setAnalysis] = useState({ s: 0, c: 0, l: 0, m: 0 });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `/data/${category}.js`;
    script.onload = () => {
      const varName = `QUIZ_DATA_${category.toUpperCase()}`;
      const quizData = window[varName] || globalThis[varName];
      if (!quizData) return;

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

  const radarPts = [
    `50,${50-analysis.s*40}`, `50,${50+analysis.l*40}`,
    `${50+analysis.c*40},50`, `${50-analysis.m*40},50`
  ].join(' ');

  const emojis = EMOJI_MAP[category] || ['✨', '⭐'];

  return (
    <div className="premium-body result">
      {/* 원본 배경 비주얼 1:1 복제 */}
      <div className="bg-visuals">
        <div className="bg-blob"></div>
        <div className="bg-blob secondary"></div>
        {emojis.map((em, i) => (
          <div key={i} className="floating-item" style={{ 
            left: `${10 + i * 20}%`, 
            animationDuration: `${5 + i}s`, 
            animationName: 'pixelFloat'
          }}>{em}</div>
        ))}
      </div>

      <div className="container result-container">
        <div className="card result-card">
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
              <svg width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="0.5"/>
                <polygon points={radarPts} fill="rgba(99, 102, 241, 0.4)" stroke="#6366F1" strokeWidth="1.5"/>
              </svg>
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
              <button className="btn btn-revival" onClick={() => navigate(`/quiz?category=${category}&mode=revival&wrong=${wrongStr}&score=${score}`)}>
                <span>🔥 오답 부활전 도전하기</span>
              </button>
            )}
          </div>
        </div>

        {/* 원본 공유 컨테이너 1:1 복제 */}
        <div className="share-container">
          <span className="share-label">Share with Friends</span>
          <div className="share-buttons">
            <button className="s-btn kakao">
              <img src="/assets/sns-ci/kakao.png" alt="K" />
            </button>
            <button className="s-btn instagram">
              <img src="/assets/sns-ci/insta.png" alt="I" />
            </button>
            <button className="s-btn x">
              <img src="/assets/sns-ci/x-twitter.png" alt="X" />
            </button>
            <button className="s-btn url" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("링크가 복사되었습니다!");
            }}>
              <span>🔗</span>
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
    </div>
  );
}
