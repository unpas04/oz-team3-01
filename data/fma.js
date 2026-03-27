/**
 * fma.js — 강철의 연금술사 퀴즈 데이터
 * 담당: 팀원 C
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true, img: "assets/quiz/fma-img/fma-" = YES(정답), false, img: "assets/quiz/fma-img/fma-" = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (등가교환 법칙, 세부 설정 등)
 */

const QUIZ_DATA_FMA = {
  normal: [
    // TODO: 20문제 완성
    { q: "에드워드 엘릭의 오른팔은 자동인형이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-1.jpeg"  },
    { q: "알폰스 엘릭은 형이다.", a: false, img: "assets/quiz/fma-img/fma-normal/ga-n-2.jpeg" },
    { q: "연금술의 기본 원칙은 '등가교환'이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-3.jpeg" },
    { q: "주인공 형제는 죽은 어머니를 살리려다 신체를 잃었다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-4.jpeg" },
    { q: "에드워드는 우유를 마시는 것을 매우 좋아한다.", a: false, img: "assets/quiz/fma-img/fma-normal/ga-n-5.jpg" },
    { q: "로이 머스탱 대령은 불꽃을 다루는 연금술사이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-6.jpeg" },
    { q: "윈리는 오토메일을 수리하는 정비사이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-7.jpeg" },
    { q: "국가 연금술사의 증표는 은시계이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-8.jpeg" },
    { q: "연금술사는 금을 연성하는 것이 금지되어 있다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-9.jpg" },
    { q: "스카(Scar)는 연금술사를 증오하는 인물이다.", a: true, img: "assets/quiz/fma-img/fma-normal/ga-n-10.jpg" }
  ],
  hard: [
    // TODO: 20문제 완성
    { q: "현자의 돌의 원료는 인간의 영혼이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-1.jpeg" },
    { q: "암스트롱 소령의 별명은 '호강의 연금술사'이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-2.jpeg" },
    { q: "린 야오는 동방의 나라인 싱(Xing)의 황자이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-3.jpg" },
    { q: "진리의 문을 본 연금술사는 연성진 없이 연금술을 쓸 수 있다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-4.jpeg" },
    { q: "글러트니(Gluttony)의 뱃속에는 위조된 진리의 문이 있다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-5.jpg" },
    { q: "에드워드는 마지막에 연금술 능력을 포기하고 알의 몸을 되찾았다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-6.png" },
    { q: "에드워드의 오른쪽 팔과 왼쪽 다리는 오토메일이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-7.jpeg" },
    { q: "호문클루스들은 인간의 7대 죄악에서 이름을 따왔다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-8.jpeg" },
    { q: "킹 브래들리는 호문클루스 중 '라스(Wrath)'이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-9.jpeg" },
    { q: "반 호엔하임은 주인공 형제의 아버지이다.", a: true, img: "assets/quiz/fma-img/fma-hard/ga-h-10.jpg" },
  ]
};
