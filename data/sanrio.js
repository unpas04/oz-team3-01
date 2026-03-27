/**
 * sanrio.js — 산리오 퀴즈 데이터
 * 담당: 나
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true, img: "assets/quiz/sanrio-img/sanrio-" = YES(정답), false, img: "assets/quiz/sanrio-img/sanrio-" = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (생일, 세부 설정 등)
 */

const QUIZ_DATA_SANRIO = {
  normal: [
    // TODO: 20문제 완성
    { q: "쿠로미의 리본 색은 검정색이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-1.jpeg"  },
    { q: "시나모롤은 강아지 캐릭터다.",    a: false, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-2.jpg" },
    { q: "헬로키티는 고양이 캐릭터이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-3.jpg" },
    { q: "마이멜로디는 항상 분홍색이나 빨간색 두건을 쓰고 있다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-4.jpeg" },
    { q: "폼폼푸린은 골든 리트리버를 모델로 한 캐릭터이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-5.jpeg" },
    { q: "쿠로미는 마이멜로디와 아주 친한 단짝 친구이다.", a: false, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-6.jpg" },
    { q: "시나모롤은 커다란 귀로 하늘을 날 수 있다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-7.jpg" },
    { q: "포차코는 농구보다 축구를 더 좋아하는 강아지이다.", a: false, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-8.jpeg" },
    { q: "리틀트윈스타는 쌍둥이 남매 캐릭터이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-9.png" },
    { q: "배드바츠마루는 펭귄 캐릭터이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-normal/sa-n-10.jpeg" }
  ],
  hard: [
    // TODO: 20문제 완성
    { q: "쿠로미의 생일은 10월 31일이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-1.jpeg"  },
    { q: "헬로키티의 몸무게는 사과 5개분이다.", a: false, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-2.jpeg" },
    { q: "시나모롤은 사실 강아지가 아니라 토끼이다.", a: false, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-3.jpg" },
    { q: "쿠로미의 생일은 할로윈데이(10월 31일)이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-4.jpg" },
    { q: "폼폼푸린이 쓰고 있는 것은 갈색 베레모이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-5.jpeg" },
    { q: "헬로키티에게는 '미미'라는 쌍둥이 동생이 있다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-6.jpg" },
    { q: "포차코의 생일은 2월 29일(윤년)이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-7.png" },
    { q: "마이멜로디의 할머니가 써준 두건은 파란색이었다.", a: false, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-8.jpeg" },
    { q: "턱시도샘은 영국에서 온 펭귄 신사이다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-9.jpeg" },
    { q: "행교동(한교동)은 중국 요리를 아주 좋아한다.", a: true, img: "assets/quiz/sanrio-img/sanrio-hard/sa-h-10.jpeg" }
  ]
};
