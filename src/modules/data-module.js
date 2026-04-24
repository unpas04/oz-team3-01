/**
 * data-module.js
 * 전역 퀴즈 데이터 및 평가 로직 관리 (ES Module 방식)
 */

export const CATEGORY_MAP = {
  sanrio: {
    title: '산리오 캐릭터 테스트',
    emoji: '🎀',
    grades: [
      { min: 90, label: 'S', title: '산리오 퓨로랜드 관장', desc: '산리오의 모든 것을 꿰뚫고 있는 마스터!', quote: '당신은 이미 우리 가족이나 다름없어요! (헬로키티)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 70, label: 'A', title: '시나모롤의 단짝', desc: '캐릭터들의 생일과 취향까지 아는 찐팬!', quote: '저기... 나랑 친구가 되어줄래? (시나모롤)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 50, label: 'B', title: '멜로디 가드너', desc: '대중적인 캐릭터는 마스터하셨네요.', quote: '언제나 긍정적으로 생각하면 즐거운 일이 생길 거야! (마이멜로디)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 30, label: 'C', title: '쿠로미 군단 후보', desc: '귀여운 디자인은 알지만 스토리는 부족해요.', quote: '흥, 내 일기장에 써놓을 거야! (쿠로미)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 0, label: 'D', title: '지나가던 행인', desc: '산리오 월드에 더 자주 놀러오세요!', quote: '누구... 세요? 전 푸딩 먹느라 바빠요. (폼폼푸린)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  pokemon: {
    title: '포켓몬 능력 고사',
    emoji: '⚡',
    grades: [
      { min: 90, label: 'S', title: '포켓몬 마스터', desc: '모든 속성과 상성을 이해한 최고의 트레이너!', quote: '강한 포켓몬, 약한 포켓몬. 그런 건 사람이 정한 것. (카렌)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '챔피언급 트레이너', desc: '지방의 수호자다운 실력을 갖췄습니다.', quote: '그 눈빛... 너 챔피언 자리를 노리고 있나 보구나? (난천)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '스타팅 트레이너', desc: '리그에 진출할 자격이 충분한 실력자!', quote: '피카! 피카피카츄! (파이팅!) (피카츄)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '길가던 조무래기', desc: '도감 채우기부터 차근차근 시작해볼까요?', quote: '우리는 로켓단! 세계의 파괴를 막기 위해... (로사/로이)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '반바지 꼬마', desc: '포켓몬 세계에 막 발을 들인 초보!', quote: '이 반바지는 활동하기 편해서 좋아! (반바지 꼬마)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  aot: {
    title: '진격의 거인 퀴즈',
    emoji: '⚔️',
    grades: [
      { min: 90, label: 'S', title: '자유의 날개', desc: '벽 너머의 진리를 깨우친 인류의 희망!', quote: '이것은 내가 시작한 이야기다. (에렌 예거)', color: 'linear-gradient(135deg, #434343, #000000)' },
      { min: 70, label: 'A', title: '조사병단 지휘관', desc: '진정한 강함을 지닌 조사병단의 핵심 인물!', quote: '심장을 바쳐라! (엘빈 스미스)', color: 'linear-gradient(135deg, #667EEA, #764BA2)' },
      { min: 50, label: 'B', title: '훈련병단 에이스', desc: '드디어 벽 밖으로 나갈 준비가 되었군.', quote: '전부 구축해주겠어... 하나도 남김없이! (에렌)', color: 'linear-gradient(135deg, #2AF598, #08B3E5)' },
      { min: 30, label: 'C', title: '헌병단 지망생', desc: '벽 안의 안락함에 안주하고 계시군요.', quote: '거인은... 정말로 무서운 존재야. (아르민)', color: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)' },
      { min: 0, label: 'D', title: '무지성 거인', desc: '훈련병 과정을 다시 거쳐야 할 것 같네요.', quote: '아... 고기가 먹고 싶어... (사샤)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  kimetsu: {
    title: '귀멸의 칼날 퀴즈',
    emoji: '🔥',
    grades: [
      { min: 90, label: 'S', title: '해의 호흡 계승자', desc: '오니마저 가엾게 여기는 최고의 검사!', quote: '가슴을 펴고 살아라. 마음의 불꽃을 태워라! (렌고쿠)', color: 'linear-gradient(135deg, #FF0844, #FFB199)' },
      { min: 70, label: 'A', title: '주(柱)급 검사', desc: '기둥이 되기에 부족함이 없는 실력입니다.', quote: '화려하게 가보자고! (우즈이 텐겐)', color: 'linear-gradient(90deg, #F093FB, #F5576C)' },
      { min: 50, label: 'B', title: '귀살대 계급: 갑', desc: '장정 한두 명쯤은 거튼히 지켜낼 실력!', quote: '잃어도 잃어도 살아가는 수밖에 없어요. (탄지로)', color: 'linear-gradient(90deg, #5EE7DF, #B490CA)' },
      { min: 30, label: 'C', title: '귀살대 계급: 계', desc: '최종선발을 갓 통과한 풋내기 대원.', quote: '우와아아아앙! 죽고 싶지 않아! (젠이츠)', color: 'linear-gradient(90deg, #D4FC79, #96E6A1)' },
      { min: 0, label: 'D', title: '그냥 일반인', desc: '오니를 만나면 도망치는 게 상책입니다.', quote: '수련을 게을리 한 자에게 가르칠 호흡은 없다. (우로코다키)', color: 'linear-gradient(90deg, #A1C4FD, #C2E9FB)' }
    ]
  },
  fma: {
    title: '강철의 연금술사 퀴즈',
    emoji: '⚗️',
    grades: [
      { min: 90, label: 'S', title: '진리를 본 자', desc: '등가교환을 넘어선 연금술의 달인.', quote: '신이든 진리든 무엇이라 불러도 좋다. (진리)', color: 'linear-gradient(90deg, #FFCE00, #E9AE0B)' },
      { min: 70, label: 'A', title: '국가 연금술사', desc: '군의 정점급 실력을 갖춘 연금술사입니다.', quote: '일어서서 걸어라. 너에게는 튼튼한 다리가 있잖아. (에드워드)', color: 'linear-gradient(90deg, #F3F1ED, #A5A5A5)' },
      { min: 50, label: 'B', title: '영혼이 정착된 자', desc: '육체는 잃었어도 영혼의 지식은 충분하군요.', quote: '동생을 돌려줘, 내 하나뿐인 동생이라고! (에드워드)', color: 'linear-gradient(90deg, #D5D4D0, #EEEEEE)' },
      { min: 30, label: 'C', title: '연성 실패자', desc: '등가교환도 제대로 이해하지 못했군요.', quote: '연금술사라면 책만 보지 말고 현장을 봐라! (이즈미)', color: 'linear-gradient(90deg, #89F7FE, #66A6FF)' },
      { min: 0, label: 'D', title: '키메라 재료', desc: '연금술에 손을 대기엔 아직 이릅니다.', quote: '에... 드... 워... 드... 오... 빠... (니나)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  fate: {
    title: '페이트 시리즈 테스트',
    emoji: '📜',
    grades: [
      { min: 90, label: 'S', title: '근원에 도달한 자', desc: '성배전쟁의 모든 서사와 설정을 꿰뚫었습니다.', quote: '묻겠다, 그대가 나의 마스터인가? (세이버)', color: 'linear-gradient(90deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '일류 마스터', desc: '영령을 소환하여 전장을 지배할 자격이 있습니다.', quote: '이상만을 안고 익사해라! (아처)', color: 'linear-gradient(90deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '견습 마스터', desc: '마술 정석은 알지만 실전 경험이 부족하군요.', quote: '내 이름은 토오사카 린. 기억해두라고. (린)', color: 'linear-gradient(90deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '마술사 지망생', desc: '기초 마술 회로조차 제대로 돌리지 못합니다.', quote: '사람은 죽으면 죽는 법이야. (시로)', color: 'linear-gradient(90deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '성배전쟁 탈락자', desc: '가장 먼저 퇴장하게 될 비운의 인물.', quote: '아... 버서커는 강하구나... (이리야)', color: 'linear-gradient(90deg, #CFD9DF, #E2E2E2)' }
    ]
  }
};

export function evaluateGrade(category, scorePct) {
  const cat = CATEGORY_MAP[category] || CATEGORY_MAP['pokemon'];
  return cat.grades.find(g => scorePct >= g.min);
}

export function evaluateQuizResult(category, mode, score, wrongIndices = []) {
  const EVAL_STANDARD = 30;
  const scorePct = Math.round((score / EVAL_STANDARD) * 100);
  const rawGradeInfo = evaluateGrade(category, scorePct);
  return { gradeInfo: { ...rawGradeInfo }, scorePct, displayMax: 30, wrongIndices };
}

export function getCategoryTitle(category) {
  return CATEGORY_MAP[category]?.title || '캐릭터 퀴즈';
}

export function calculatePercentile(scorePct) {
  if (scorePct >= 90) return Math.max(1, 5 - (scorePct - 90) / 10 * 4);
  if (scorePct >= 70) return 15 - (scorePct - 70) / 20 * 9;
  if (scorePct >= 50) return 40 - (scorePct - 50) / 20 * 24;
  if (scorePct >= 30) return 70 - (scorePct - 30) / 20 * 29;
  return 99 - (scorePct / 30 * 28);
}

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}
