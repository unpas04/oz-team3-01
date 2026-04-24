import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import "../styles/result.css";

export default function CertificateCard({ mode, category, gradeInfo, score, scoreMax, scorePct, catKo, analysis }) {
  const stampText = category === 'sanrio' ? '૮ ˶ᵔ ᵕ ᵔ˶ ა' : '참 잘했어요';

  const imgPath = `/assets/result/${category}-${gradeInfo.label}.png`;
  const fallbackPath = `/assets/main-cards/${category}.png`;

  // Helper arrays for layouts
  const spineHoles = [...Array(8)].map((_, i) => <div key={i} className="spine-hole" />);

  const rankStyle = {
    background: gradeInfo.color,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const radarData = [
    { subject: 'STORY', A: analysis?.s * 100 || 0, fullMark: 100 },
    { subject: 'CHAR', A: analysis?.c * 100 || 0, fullMark: 100 },
    { subject: 'LORE', A: analysis?.l * 100 || 0, fullMark: 100 },
    { subject: 'MANIA', A: analysis?.m * 100 || 0, fullMark: 100 },
  ];

  if (mode === 'landscape') {
    return (
      <div className={`otaku-license theme-${category} grade-${gradeInfo.label}`}>
        <div className="license-header">
          {category === 'pokemon' && <div className="pokedex-lens"></div>}
          <h1 style={{ letterSpacing: '2px' }}>OTAKU LICENSE</h1>
          <span style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 900 }}>SN: OZ-{category.toUpperCase()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
        </div>
        <div className="license-body">
          <div className="license-photo">
            <img src={imgPath} alt="Character" onError={(e) => { e.target.onerror = null; e.target.src = fallbackPath; }} />
          </div>
          {category === 'sanrio' && <div className="diary-spine">{spineHoles}</div>}
          <div className="license-info">
            <div className="info-row"><span className="info-label">IDENTIFIED CATEGORY</span><span className="info-value">{catKo} 부문</span></div>
            <div className="info-row"><span className="info-label">VERIFIED RANK</span><span className="info-value rank" style={rankStyle}>{gradeInfo.title}</span></div>
            <div className="info-row"><span className="info-label">EVALUATION</span><span className="info-value" style={{ whiteSpace: 'normal' }}>"{gradeInfo.quote}"</span></div>
            <div className="info-row" style={{ flex: 1, minHeight: '80px', marginTop: '-5px' }}>
              <span className="info-label" style={{ marginBottom: '-10px', zIndex: 2 }}>ATTRIBUTE ANALYSIS</span>
              <div className="info-value" style={{ width: '100%', height: '100px', borderBottom: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 'bold' }} />
                    <Radar name="Score" dataKey="A" stroke="#6366F1" fill="rgba(99, 102, 241, 0.5)" isAnimationActive={false} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="certified-stamp">{stampText}</div>
        <div className="license-footer">
          <span style={{ letterSpacing: '1px' }}>OZ MASTER CERTIFICATION CENTER</span>
          <span>ISSUED: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    );
  }

  // mode === 'insta'
  return (
    <div className={`insta-master-card theme-${category} grade-${gradeInfo.label}`}>
      <div className="insta-header">{catKo} Master</div>
      <div className="insta-photo">
        <img src={imgPath} alt="Character" onError={(e) => { e.target.onerror = null; e.target.src = fallbackPath; }} />
      </div>
      <div className="insta-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="insta-grade" style={rankStyle}>{gradeInfo.title}</div>
        <div style={{ width: '150px', height: '120px', margin: '-10px 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} />
              <Radar name="Score" dataKey="A" stroke="#6366F1" fill="rgba(99, 102, 241, 0.5)" isAnimationActive={false} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ marginTop: '5px', fontSize: '0.9rem', fontWeight: 800, color: '#4F46E5', fontStyle: 'italic', textAlign: 'center' }}>
          "{gradeInfo.quote}"
        </p>
        <p style={{ marginTop: '5px', fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.5, fontWeight: 700, textAlign: 'center' }}>
          This user is officially recognized as a master of {catKo}.
        </p>
      </div>
      <div className="insta-stamp">{stampText}</div>
    </div>
  );
}
