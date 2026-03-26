/**
 * sanrio.js — 산리오 퀴즈 데이터
 * 담당: 나
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true = YES(정답), false = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (생일, 세부 설정 등)
 */

const QUIZ_DATA_SANRIO = {
  normal: [
    { q: "쿠로미의 리본 색은 검정색이다.", a: true  },
    { q: "시나모롤은 강아지 캐릭터다.",    a: false },
    // TODO: 20문제 완성
  ],
  hard: [
    { q: "쿠로미의 생일은 10월 31일이다.", a: true  },
    // TODO: 20문제 완성
  ]
};
