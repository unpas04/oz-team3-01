/**
 * aot.js — 진격의 거인 퀴즈 데이터
 * 담당: 팀원 B
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true, img: "assets/quiz/aot-img/aot-" = YES(정답), false, img: "assets/quiz/aot-img/aot-" = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (세부 설정, 타이탄 능력 등)
 */

const QUIZ_DATA_AOT = {
  normal: [
    { q: "에렌 예거는 진격의 거인 주인공이다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-1.png", explanation: "에렌 예거가 주인공이며, 이야기 중심 인물입니다."},
    { q: "조사병단의 상징은 독수리 날개다.", a: false, img: "assets/quiz/aot-img/aot-normal/ji-n-2.jpeg", explanation: "조사병단의 상징은 날개 모양이지만 독수리가 아니라 '날개 달린 자유'를 의미합니다."},
    { q: "리바이 병장은 인류 최강의 병사로 불린다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-3.jpeg", explanation: "리바이는 '인류 최강의 병사' 별명을 가지고 있습니다."},
    { q: "벽 안의 인류를 지키는 세 개의 벽 중 가장 바깥쪽은 월 시나이다.", a: false, img: "assets/quiz/aot-img/aot-normal/ji-n-4.jpeg", explanation: "가장 바깥쪽 벽은 월 마리아입니다."},
    { q: "미카사는 에렌을 지키려는 강한 집념을 가지고 있다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-5.jpeg", explanation: "미카사는 에렌에 대한 강한 집념과 보호욕을 보입니다."},
    { q: "초대형 거인은 벽을 발로 차서 구멍을 냈다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-6.jpeg", explanation: "초대형 거인의 공격으로 월 마리아 벽이 붕괴되었습니다."},
    { q: "사샤는 먹을 것을 아주 좋아하며 별명은 '감자녀'이다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-7.jpeg", explanation: "사샤는 감자를 좋아해서 '감자녀'라고 불립니다."},
    { q: "거인의 약점은 목 뒷덜미이다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-8.jpeg", explanation: "타이탄의 목 뒷덜미에 파괴점을 공격해야 합니다."},
    { q: "입체기동장치는 가스의 힘을 이용해 이동한다.", a: true, img: "assets/quiz/aot-img/aot-normal/ji-n-9.png", explanation: "입체기동장치는 가스를 사용하여 빠른 이동을 합니다."},
    { q: "아르민은 지략보다 전투력이 뛰어난 캐릭터이다.", a: false, img: "assets/quiz/aot-img/aot-normal/ji-n-10.jpeg", explanation: "아르민은 전투 능력보다 지략이 뛰어납니다."}
  ],
  hard: [
    { q: "벽의 이름은 마리아, 로제, 시나 순서로 바깥쪽부터 안쪽이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-1.jpg", explanation: "벽은 바깥쪽부터 마리아/로제/시나입니다."},
    { q: "에렌의 아버지는 그리샤 예거이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-2.jpeg", explanation: "에렌의 부모는 그리샤와 카야 예거입니다."},
    { q: "지크 예거는 짐승 거인의 계승자이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-3.jpeg", explanation: "지크 예거가 짐승 거인 능력을 사용합니다."},
    { q: "9거인 중 하나인 '전퇴의 거인'은 타이버 가문이 보유했었다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-4.jpeg", explanation: "전퇴의 거인은 타이버 가문에서 계승된 거인입니다."},
    { q: "리바이의 성씨는 아커만이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-5.jpg", explanation: "리바이의 본성은 아커만 혈통입니다."},
    { q: "벽 안의 인류가 믿는 종교는 '벽교'이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-6.jpeg", explanation: "벽 안 인류의 종교는 벽의 신앙과 관련 있습니다."},
    { q: "엘빈 스미스 단장은 오른쪽 팔을 잃었다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-7.jpeg", explanation: "엘빈은 마레 전투에서 오른팔을 잃었습니다."},
    { q: "여성형 거인의 정체는 애니 레온하트이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-8.jpeg", explanation: "여성형 거인은 애니 변신입니다."},
    { q: "거인이 된 인간의 수명은 계승 후 13년이다.", a: true, img: "assets/quiz/aot-img/aot-hard/ji-h-9.jpeg", explanation: "거인 능력자 수명은 13년 제한이 있습니다."},
    { q: "조사병단 제13대 단장은 한지 조에이다.", a: false, img: "assets/quiz/aot-img/aot-hard/ji-h-10.jpeg", explanation: "13대 단장은 한지 조에가 아니라 에르빈 스미스입니다."}
  ]
};
