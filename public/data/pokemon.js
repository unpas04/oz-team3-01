/**
 * pokemon.js — 포켓몬 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_POKEMON = [
  { q: "피카츄는 전기 타입 포켓몬이다.", a: true, img: "/assets/quiz/pokemon-img/po-1.jpg", explanation: "피카츄는 대표적인 전기 타입 포켓몬입니다.", tags: ["캐릭터"] },
  { q: "파이리의 첫 번째 진화 형태는 리자몽이다.", a: false, img: "/assets/quiz/pokemon-img/po-2.jpeg", explanation: "파이리는 리자드-리자몽 순으로 진화합니다.", tags: ["설정"] },
  { q: "피카츄의 진화 전 형태(베이비 포켓몬)는 피츄이다.", a: true, img: "/assets/quiz/pokemon-img/po-3.jpeg", explanation: "2세대에서 피카츄의 진화 전 형태인 피츄가 추가되었습니다.", tags: ["캐릭터"] },
  { q: "잠만보는 먹는 것보다 운동하는 것을 더 좋아한다.", a: false, img: "/assets/quiz/pokemon-img/po-5.jpg", explanation: "잠만보는 하루의 대부분을 먹고 자는 데 사용합니다.", tags: ["캐릭터"] },
  { q: "잉어킹이 진화하면 갸라도스가 된다.", a: true, img: "/assets/quiz/pokemon-img/po-6.jpeg", explanation: "레벨 20이 되면 갸라도스로 진화합니다.", tags: ["설정"] },
  { q: "이상해씨의 등에는 꽃이 활짝 피어 있다.", a: false, img: "/assets/quiz/pokemon-img/po-10.jpg", explanation: "이상해씨는 씨앗, 이상해풀은 봉오리, 이상해꽃이 되어야 꽃이 핍니다.", tags: ["설정"] },
  { q: "피카츄의 도감 번호는 25번이다.", a: true, img: "/assets/quiz/pokemon-img/po-11.jpeg", explanation: "관동 도감 및 전국 도감에서 피카츄의 번호는 25번입니다.", tags: ["매니아"] },
  { q: "고라파덕의 기본 타입은 에스퍼 타입이다.", a: false, img: "/assets/quiz/pokemon-img/po-7.jpg", explanation: "고라파덕은 순수 물 타입이며, 에스퍼 기술을 쓰긴 하지만 타입은 아닙니다.", tags: ["캐릭터"] },
  { q: "아르세우스는 포켓몬 세계를 창조한 신으로 불린다.", a: true, img: "/assets/quiz/pokemon-img/po-12.jpeg", explanation: "신화 속에서 세계를 창조했다고 전해지는 전설의 포켓몬입니다.", tags: ["설정"] },
  { q: "이브이가 낮에 친밀도가 높은 상태에서 진화하면 블래키가 된다.", a: false, img: "/assets/quiz/pokemon-img/po-14.jpeg", explanation: "낮에는 에브이, 밤에는 블래키로 진화합니다.", tags: ["매니아"] },
  { q: "망나뇽은 드래곤 타입과 비행 타입을 동시에 가진다.", a: true, img: "/assets/quiz/pokemon-img/po-16.jpeg", explanation: "망나뇽은 드래곤/비행 타입의 포켓몬입니다.", tags: ["매니아"] },
  { q: "지우의 피카츄는 라이츄로 진화한 적이 있다.", a: false, img: "/assets/quiz/pokemon-img/po-17.jpg", explanation: "지우의 피카츄는 스스로 진화를 거부하고 피카츄 상태를 유지합니다.", tags: ["스토리"] },
  { q: "루카리오는 파동(오라)을 감지하는 능력이 있다.", a: true, img: "/assets/quiz/pokemon-img/po-18.jpeg", explanation: "파동 포켓몬으로 오라를 보고 소통할 수 있습니다.", tags: ["캐릭터"] },
  { q: "불꽃 타입 포켓몬은 물 타입 기술에 효과가 굉장하다.", a: false, img: "/assets/quiz/pokemon-img/po-4.jpg", explanation: "물 타입은 불꽃 타입의 약점입니다 (효과가 굉장함).", tags: ["설정"] },
  { q: "밀탱크의 주특기인 '구르기'는 바위 타입 기술이다.", a: true, img: "/assets/quiz/pokemon-img/po-20.jpeg", explanation: "구르기는 바위 타입 상성을 가진 기술입니다.", tags: ["매니아"] },
  { q: "전기 타입의 유일한 약점은 격투 타입이다.", a: false, img: "/assets/quiz/pokemon-img/po-1.jpg", explanation: "전기 타입의 유일한 약점은 땅 타입입니다.", tags: ["설정"] },
  { q: "메타몽은 변신 기술을 통해 상대 모습을 복제한다.", a: true, img: "/assets/quiz/pokemon-img/po-21.jpg", explanation: "상대의 외형뿐만 아니라 기술까지 복사합니다.", tags: ["캐릭터"] },
  { q: "리자몽은 기본적으로 드래곤 타입을 가지고 있다.", a: false, img: "/assets/quiz/pokemon-img/po-26.jpg", explanation: "리자몽은 불꽃/비행 타입이며, 드래곤 타입은 메가진화 등을 통해 얻습니다.", tags: ["매니아"] },
  { q: "팬텀은 고스트 타입과 독 타입을 동시에 가진다.", a: true, img: "/assets/quiz/pokemon-img/po-15.jpeg", explanation: "팬텀 계열은 고스트/독 듀얼 타입을 유지합니다.", tags: ["설정"] },
  { q: "푸린은 눈을 마주치면 돌로 만드는 능력이 있다.", a: false, img: "/assets/quiz/pokemon-img/po-9.jpeg", explanation: "푸린은 노래로 상대를 잠재우는 능력이 있습니다.", tags: ["캐릭터"] },
  { q: "뮤츠는 뮤의 유전자를 복제하여 인공적으로 만들어졌다.", a: true, img: "/assets/quiz/pokemon-img/po-24.jpg", explanation: "로켓단 등이 뮤를 복제하여 탄생시킨 인공 포켓몬입니다.", tags: ["스토리"] },
  { q: "전기쥐 포켓몬 데덴네는 전기 타입과 페어리 타입을 가진다.", a: true, img: "/assets/quiz/pokemon-img/po-11.jpeg", explanation: "데덴네는 전기/페어리 타입입니다.", tags: ["매니아"] },
  { q: "포켓몬 마스터 지우의 성은 '한'씨다 (한국판 기준).", a: true, img: "/assets/quiz/pokemon-img/po-17.jpg", explanation: "한국 이름은 한지우, 일본 이름은 사토시입니다.", tags: ["스토리"] },
  { q: "모든 전설의 포켓몬은 성별이 존재하지 않는다.", a: false, img: "/assets/quiz/pokemon-img/po-12.jpeg", explanation: "라티아스, 라티오스처럼 성별이 존재하는 전설의 포켓몬도 있습니다.", tags: ["설정"] },
  { q: "갸라도스는 물 타입과 드래곤 타입을 가진다.", a: false, img: "/assets/quiz/pokemon-img/po-6.jpeg", explanation: "갸라도스는 물/비행 타입입니다.", tags: ["매니아"] },
  { q: "꼬부기의 마지막 진화 형태는 거북왕이다.", a: true, img: "/assets/quiz/pokemon-img/po-10.jpg", explanation: "꼬부기-어니부기-거북왕 순으로 진화합니다.", tags: ["캐릭터"] },
  { q: "풀 타입 기술은 물 타입 포켓몬에게 효과가 별로다.", a: false, img: "/assets/quiz/pokemon-img/po-10.jpg", explanation: "풀은 물에게 상성상 강합니다 (효과가 굉장함).", tags: ["설정"] },
  { q: "페어리 타입은 드래곤 타입 기술을 무효화한다.", a: true, img: "/assets/quiz/pokemon-img/po-27.jpg", explanation: "페어리 타입은 드래곤 타입에 면역(0배)입니다.", tags: ["설정"] },
  { q: "포켓몬 센터에서 포켓몬을 치료하려면 돈을 내야 한다.", a: false, img: "/assets/quiz/pokemon-img/po-29.jpg", explanation: "포켓몬 센터는 트레이너를 위해 무료로 치료를 지원합니다.", tags: ["스토리"] },
  { q: "지우가 처음으로 잡은 포켓몬은 캐터피다.", a: true, img: "/assets/quiz/pokemon-img/po-17.jpg", explanation: "피카츄를 제외하고 야생에서 처음 포획한 것은 캐터피입니다.", tags: ["스토리"] }
];
