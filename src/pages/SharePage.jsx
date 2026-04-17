import { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCategoryTitle, evaluateQuizResult } from '../modules/data-module';
import "../styles/result.css";

const SCORE_MAX = 30;

export default function SharePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [modeTab, setModeTab] = useState('landscape'); // 'landscape' or 'insta'

  const category = searchParams.get('category') ?? 'sanrio';
  const score = Number(searchParams.get('score') ?? 0);
  const quizMode = searchParams.get('mode') ?? 'normal';

  const { gradeInfo, scorePct } = evaluateQuizResult(category, quizMode, score, []);
  const catKo = getCategoryTitle(category);

  // 등급에 따른 도장 문구 결정
  const stampText = gradeInfo.label === 'S' ? 'LEGEND' : gradeInfo.label === 'A' ? 'MASTER' : 'OFFICIAL';

  async function saveImage() {
    if (typeof html2canvas === 'undefined') {
        alert('이미지 생성 엔진을 불러오는 중입니다...');
        return;
    }
    const canvas = await html2canvas(cardRef.current, { 
        useCORS: true,
        scale: 2, 
        backgroundColor: null
    });
    const link = document.createElement('a');
    link.download = `OZ_Master_${category}_${gradeInfo.label}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="certificate-wrapper">
      <h2 style={{ marginBottom: '20px', fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>
        마스터 클래스 인증서 발급
      </h2>

      <div className="mode-tabs">
        <button className={`tab ${modeTab === 'landscape' ? 'active' : ''}`} onClick={() => setModeTab('landscape')}>
          📜 오피셜 라이선스
        </button>
        <button className={`tab ${modeTab === 'insta' ? 'active' : ''}`} onClick={() => setModeTab('insta')}>
          📸 인스타 마스터 (4:5)
        </button>
      </div>

      <div 
        ref={cardRef} 
        style={{ padding: '30px', background: 'transparent' }}
        className={gradeInfo.label === 'S' ? 'grade-S-container' : ''}
      >
        {modeTab === 'landscape' ? (
          /* 🏆 공식 가로형 라이선스 🏆 */
          <div className={`otaku-license theme-${category} grade-${gradeInfo.label}`}>
            <div className="license-header">
              {category === 'pokemon' && <div className="pokedex-lens"></div>}
              <h1 style={{ letterSpacing: '2px' }}>OTAKU LICENSE</h1>
              <span style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 900 }}>SN: OZ-{category.toUpperCase()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
            <div className="license-body">
              <div className="license-photo">
                <img src={`/assets/main-cards/${category}.png`} alt="P" onError={(e) => { e.target.src = '/assets/main-cards/pokemon.png'; }} />
              </div>
              {category === 'sanrio' && (
                <div className="diary-spine">
                  {[...Array(8)].map((_, i) => <div key={i} className="spine-hole" />)}
                </div>
              )}
              <div className="license-info">
                <div className="info-row"><span className="info-label">IDENTIFIED CATEGORY</span><span className="info-value">{catKo} 부문</span></div>
                <div className="info-row"><span className="info-label">VERIFIED RANK</span><span className="info-value rank">{gradeInfo.title}</span></div>
                <div className="info-row"><span className="info-label">MASTERY SCORE</span><span className="info-value">{score} / {SCORE_MAX} ({scorePct}%)</span></div>
              </div>
            </div>
            <div className="certified-stamp">{stampText}</div>
            <div className="license-footer">
              <span style={{ letterSpacing: '1px' }}>OZ MASTER CERTIFICATION CENTER</span>
              <span>ISSUED: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          /* 📸 인스타그램 프리미엄 마스터 카드 📸 */
          <div className={`insta-master-card theme-${category} grade-${gradeInfo.label}`}>
            <div className="insta-header">{catKo} Master</div>
            <div className="insta-photo">
              <img src={`/assets/main-cards/${category}.png`} alt="P" onError={(e) => { e.target.src = '/assets/main-cards/pokemon.png'; }} />
            </div>
            <div className="insta-info">
              <div className="insta-grade">{gradeInfo.title}</div>
              <div className="insta-score">Mastery Level: {scorePct}%</div>
              <p style={{ marginTop: '15px', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.5, fontWeight: 700 }}>
                This user is officially recognized as a master of {catKo}.
              </p>
            </div>
            <div className="insta-stamp">{stampText}</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
        <button 
          className="btn" 
          style={{ background: '#1e293b', color: '#fff', padding: '20px 50px', borderRadius: '16px', fontWeight: 950, boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }} 
          onClick={saveImage}
        >
          📷 마스터 인증서 저장
        </button>
        <button 
          className="btn" 
          style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '20px 50px', borderRadius: '16px', fontWeight: 700 }} 
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
