/**
 * pokemon.js — 포켓몬 퀴즈 데이터
 * 담당: 팀원 A
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true = YES(정답), false = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (도감번호, 진화조건, 기술 등)
 */

const QUIZ_DATA_POKEMON = {
  normal: [
    { q: "피카츄는 전기 타입이다.",        a: true  },
    { q: "파이리의 첫 번째 진화는 리자몽이다.", a: false },
    // TODO: 20문제 완성
  ],
  hard: [
    { q: "피카츄의 도감 번호는 25번이다.", a: true  },
    // TODO: 20문제 완성
  ]
};
