/**
 * sanrio.js — 산리오 캐릭터 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_SANRIO = [
  { q: "헬로키티의 국적은 일본이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "헬로키티는 영국 런던 교외 출신입니다.", tags: ["설정"] },
  { q: "마이멜로디는 소중한 분홍색 두건을 항상 쓰고 있다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "할머니가 직접 만들어준 소중한 선물이기 때문입니다.", tags: ["캐릭터"] },
  { q: "쿠로미는 마이멜로디를 세상에서 가장 친한 단짝 친구로만 생각한다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "쿠로미는 마이멜로디를 자칭 라이벌로 생각하며 사소한 원한(?)이 많습니다.", tags: ["캐릭터"] },
  { q: "폼폼푸린은 골든 리트리버 종의 강아지이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "부드러운 노란 털을 가진 골든 리트리버가 모델입니다.", tags: ["캐릭터"] },
  { q: "시나모롤은 토끼가 아니라 강아지이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "긴 귀 때문에 토끼로 오해받지만, 하늘에서 내려온 아기 강아지입니다.", tags: ["설정"] },
  { q: "구데타마는 아주 열정적이고 부지런한 성격의 소유자이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "구데타마는 무기력하고 늘어져 있는 것이 특징인 계란 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "리틀트윈스타는 키키와 라라라는 쌍둥이 형제/남매이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "밤하늘의 별에서 온 신비로운 쌍둥이 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "헬로키티에게는 쌍둥이 동생 미미가 없다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "리본 위치가 반대인 쌍둥이 동생 '미미'가 있습니다.", tags: ["매니아"] },
  { q: "배드바츠마루는 장난꾸러기 펭귄 캐릭터이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "산리오의 대표적인 반항아 컨셉 펭귄입니다.", tags: ["캐릭터"] },
  { q: "폼폼푸린이 머리에 쓰고 있는 갈색 물체는 사실 초콜릿이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "푸린이 항상 쓰고 다니는 것은 갈색 베레모입니다.", tags: ["설정"] },
  { q: "시나모롤의 이름은 꼬리가 시나몬 롤 빵을 닮아 붙여졌다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "돌돌 말린 꼬리가 시나몬 롤과 똑 닮았습니다.", tags: ["설정"] },
  { q: "케로케로케로피는 사막에 사는 도마뱀 캐릭터이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "도넛 연못에 사는 인기 만점 개구리 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "턱시도샘은 365개의 나비넥타이를 가지고 있는 멋쟁이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "매일매일 갈아 끼울 수 있는 엄청난 나비넥타이 컬렉션을 자랑합니다.", tags: ["매니아"] },
  { q: "쿠로미의 생일은 크리스마스 당일이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "쿠로미의 생일은 할로윈 데이인 10월 31일입니다.", tags: ["스토리"] },
  { q: "헬로키티는 고양이가 아닌 '소녀'라는 공식 설정이 있다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "산리오는 키티가 고양이를 모티브로 한 '소녀'라고 공식 발표했습니다.", tags: ["설정"] },
  { q: "포차코는 농구를 좋아하며 산책을 즐기는 강아지이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "호기심 많고 활동적인 포차코는 산책을 아주 좋아합니다.", tags: ["캐릭터"] },
  { q: "한교동은 사람을 무서워해서 항상 숨어 다니는 유령이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "사람을 웃기고 싶어 하지만 마음대로 잘 안되는 반어인 캐릭터입니다.", tags: ["매니아"] },
  { q: "키리미짱은 연어 토막을 캐릭터화한 것이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "산리오의 독특한 '식재료' 시리즈 인기 캐릭터입니다.", tags: ["매니아"] },
  { q: "산리오(Sanrio)의 의미는 이탈리아어로 '최고의 귀여움'이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "스페인어로 San(성스러운) + Rio(강)을 합친 의미입니다.", tags: ["설정"] },
  { q: "쿠로미가 이끄는 팀의 이름은 '쿠로미 즈 5'이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "의리 넘치는 5명의 멤버로 구성된 팀입니다.", tags: ["스토리"] },
  { q: "마이멜로디는 쿠로미를 괴롭히는 것을 인생의 낙으로 삼는다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "마이멜로디는 아주 착하고 평화로운 성격이라 쿠로미를 친구로 생각합니다.", tags: ["스토리"] },
  { q: "디얼 다니엘은 헬로키티의 공식 남자친구이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "키티의 소중한 단짝이자 공식 커플링 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "시나모롤은 너무 무거워서 하늘을 날 수 없다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "커다란 귀를 파닥거리며 하늘을 자유롭게 날아다닐 수 있습니다.", tags: ["설정"] },
  { q: "폼폼푸린의 매력 포인트는 배에 있는 갈색 점(배꼽)이다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "통통한 배와 귀여운 배꼽 점이 큰 매력입니다.", tags: ["매니아"] },
  { q: "배드바츠마루의 이름에서 '바츠'는 O(정답)를 의미한다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "바츠(X)와 마루(O)를 의미하여, '잘못과 잘함'이 섞인 장난꾸러기를 뜻합니다.", tags: ["매니아"] },
  { q: "포차코의 이름 뜻은 '피동피동하다'는 의미의 형용사에서 유래했다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "통통한 체형을 나타내는 귀여운 이름입니다.", tags: ["설정"] },
  { q: "헬로키티의 몸무게는 사과 100개분이다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "헬로키티의 몸무게는 사과 3개분, 키는 사과 5개분입니다.", tags: ["매니아"] },
  { q: "쿠로미의 두건에 달린 해골 모양은 감정에 따라 표정이 변한다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "상황이나 쿠로미의 기분에 따라 해골의 눈 모양 등이 달라집니다.", tags: ["설정"] },
  { q: "마이멜로디는 사실 늑대를 잡아먹는 무서운 토끼다.", a: false, img: "/assets/quiz/sanrio-img/image.png", explanation: "마이멜로디는 늑대와도 친구가 될 정도로 매우 상냥하고 착합니다.", tags: ["스토리"] },
  { q: "산리오 캐릭터 대전(인기 투표)은 매년 개최된다.", a: true, img: "/assets/quiz/sanrio-img/image.png", explanation: "매년 전 세계 팬들의 투표로 최고의 캐릭터를 선정합니다.", tags: ["매니아"] }
];
