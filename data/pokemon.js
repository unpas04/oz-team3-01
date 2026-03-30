/**
 * pokemon.js — 포켓몬 퀴즈 데이터
 * 담당: 팀원 A
 *
 * 작성 규칙:
 * - normal, hard 각각 정확히 20문제 작성
 * - q: YES/NO로 답할 수 있는 문장
 * - a: true, img: "assets/quiz/pokemon-img/pokemon-" = YES(정답), false, img: "assets/quiz/pokemon-img/pokemon-" = NO(정답)
 * - hard는 normal보다 훨씬 어렵게 (도감번호, 진화조건, 기술 등)
 */

const QUIZ_DATA_POKEMON = {
  normal: [
    { q: "피카츄는 전기 타입이다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-1.jpeg", explanation: "피카츄는 전기 타입 포켓몬입니다." },
    { q: "파이리의 첫 번째 진화는 리자몽이다.", a: false, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-2.jpg", explanation: "파이리는 리자드->리자몽 순으로 진화합니다." },
    { q: "피카츄의 진화 전 형태는 피츄이다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-3.jpeg", explanation: "피카츄의 베이비형은 피츄입니다." },
    { q: "파이리는 꼬리의 불꽃이 꺼지면 죽는다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-4.jpeg", explanation: "파이리 꼬리 불꽃 상태가 건강 상태를 나타냅니다." },
    { q: "잠만보는 먹는 것보다 운동하는 것을 더 좋아한다.", a: false, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-5.jpg", explanation: "잠만보는 주로 잠자는 것을 좋아하는 포켓몬입니다." },
    { q: "잉어킹이 진화하면 갸라도스가 된다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-6.jpeg", explanation: "잉어킹은 레벨20에서 갸라도스로 진화합니다." },
    { q: "고라파덕은 에스퍼 타입 기술을 쓸 수 있다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-7.jpg", explanation: "애니에서는 혼란 상태에서 에스퍼 기술을 사용하는 장면이 있습니다." },
    { q: "로켓단 나옹이는 말을 할 줄 안다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-8.jpeg", explanation: "나옹이는 인간어를 사용합니다." },
    { q: "푸린은 노래로 상대를 잠재우는 능력이 있다.", a: true, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-9.jpeg", explanation: "푸린은 노래 기술로 적을 잠들게 합니다." },
    { q: "이상해씨의 등에는 꽃이 활짝 피어 있다.", a: false, img: "assets/quiz/pokemon-img/pokemon-normal/po-n-10.jpg", explanation: "이상해씨 등에는 아직 꽃이 피지 않았고, 이상해풀-이상해꽃 진화 과정에서 꽃이 핍니다." }
  ],
  hard: [
    { q: "피카츄의 도감 번호는 25번이다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-1.jpg", explanation: "국제 도감 번호 25번은 피카츄입니다." },
    { q: "아르세우스는 포켓몬 세계를 창조한 신으로 불린다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-2.jpeg", explanation: "아르세우스는 창조신 설정을 가진 전설의 포켓몬입니다." },
    { q: "한카리아스는 드래곤 타입과 물 타입을 동시에 가진다.", a: false, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-3.jpeg", explanation: "한카리아스는 드래곤/강철 타입입니다." },
    { q: "이브이가 에브이로 진화하려면 밤에 친밀도가 높아야 한다.", a: false, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-4.jpeg", explanation: "이브이는 친밀도로 에브이->에브이가 되거나, 물, 썬더, 불꽃 돌 사용 등으로 진화합니다." },
    { q: "팬텀은 원래 독 타입이 섞여 있다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-5.jpeg", explanation: "팬텀은 고스트/독 타입입니다." },
    { q: "망나뇽의 키는 2.2m로 생각보다 크지 않다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-6.jpeg", explanation: "망나뇽의 공식 신장은 2.2m입니다." },
    { q: "지우의 피카츄는 번개의 돌을 사용하여 진화한 적이 있다.", a: false, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-7.jpg", explanation: "지우의 피카츄는 진화하지 않고 남습니다." },
    { q: "루카리오는 파동을 감지하는 능력이 있다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-8.jpeg", explanation: "루카리오는 오라를 감지할 수 있는 설정입니다." },
    { q: "가디가 진화할 때 필요한 아이템은 불꽃의 돌이다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-9.png", explanation: "가디는 불꽃의 돌을 사용해 윈디로 진화합니다." },
    { q: "밀탱크의 주특기인 '구르기'는 바위 타입 기술이다.", a: true, img: "assets/quiz/pokemon-img/pokemon-hard/po-h-10.jpeg", explanation: "밀탱크는 구르기(롤아웃) 같은 물리 기술을 사용합니다." }
  ]
};