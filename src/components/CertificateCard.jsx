import React from 'react';
import "../styles/result.css";

export default function CertificateCard({ mode, category, gradeInfo, score, scoreMax, scorePct, catKo }) {
  const stampText = gradeInfo.label === 'S' ? 'LEGEND' : gradeInfo.label === 'A' ? 'MASTER' : 'OFFICIAL';

  // Helper arrays for layouts
  const spineHoles = [...Array(8)].map((_, i) => <div key={i} className="spine-hole" />);

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
            <img src={`/assets/main-cards/${category}.png`} alt="Character" onError={(e) => { e.target.src = '/assets/main-cards/pokemon.png'; }} />
          </div>
          {category === 'sanrio' && <div className="diary-spine">{spineHoles}</div>}
          <div className="license-info">
            <div className="info-row"><span className="info-label">IDENTIFIED CATEGORY</span><span className="info-value">{catKo} 부문</span></div>
            <div className="info-row"><span className="info-label">VERIFIED RANK</span><span className="info-value rank">{gradeInfo.title}</span></div>
            <div className="info-row"><span className="info-label">MASTERY SCORE</span><span className="info-value">{score} / {scoreMax} ({scorePct}%)</span></div>
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
        <img src={`/assets/main-cards/${category}.png`} alt="Character" onError={(e) => { e.target.src = '/assets/main-cards/pokemon.png'; }} />
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
  );
}
