import { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCategoryTitle, evaluateQuizResult } from '../modules/data-module';
import CertificateCard from '../components/CertificateCard';
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

  async function saveImage() {
    if (typeof html2canvas === 'undefined') {
        alert('이미지 생성 엔진을 불러오는 중입니다...');
        return;
    }
    // Task 6: 폰트 로드 방어 기제
    await document.fonts.ready;
    
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
        <CertificateCard 
          mode={modeTab} 
          category={category} 
          gradeInfo={gradeInfo} 
          score={score} 
          scoreMax={SCORE_MAX} 
          scorePct={scorePct} 
          catKo={catKo} 
        />
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
