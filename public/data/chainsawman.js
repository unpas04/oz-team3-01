/**
 * chainsawman.js — 체인소맨 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_CHAINSAWMAN = [
  { q: "덴지의 심장이 된 악마 포치타는 체인소의 악마이다.", a: true, img: "/assets/quiz/chainsawman-img/image.png", explanation: "포치타는 체인소의 악마이며 덴지와 계약해 심장이 되었습니다.", tags: ["캐릭터"] },
  { q: "덴지는 손가락을 튕기는 것으로 체인소맨으로 변신한다.", a: false, img: "/assets/quiz/chainsawman-img/image copy.png", explanation: "가슴에 달린 엔진 시동 줄(스타터)을 당겨야 변신합니다.", tags: ["설정"] },
  { q: "마키마는 공안 대마 특이 4과의 책임자이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 2.png", explanation: "덴지를 공안 데빌 헌터로 영입한 핵심 인물입니다.", tags: ["캐릭터"] },
  { q: "파워가 가장 아끼는 애완동물은 강아지이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 5.png", explanation: "파워는 고양이 '냐코'를 지극히 아끼고 사랑합니다.", tags: ["캐릭터"] },
  { q: "하야카와 아키는 여우의 악마와 계약 중이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 4.png", explanation: "손가락으로 '콩' 사인을 보내 여우의 머리를 소환해 공격합니다.", tags: ["설정"] },
  { q: "덴지가 데빌 헌터가 된 이유는 세계 평화를 지키기 위해서이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 6.png", explanation: "부모님이 남긴 막대한 빚을 갚고 먹고 살기 위해 시작했습니다.", tags: ["스토리"] },
  { q: "체인소맨은 잡아먹은 악마의 개념 자체를 지워버릴 수 있다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 7.png", explanation: "체인소맨에게 먹힌 악마는 사람들의 기억과 존재 자체가 사라집니다.", tags: ["설정"] },
  { q: "히메노는 자신의 왼쪽 눈을 대가로 유령의 악마와 계약했다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 8.png", explanation: "히메노는 오른쪽 눈을 대가로 유령의 악마의 오른팔을 빌려 씁니다.", tags: ["캐릭터"] },
  { q: "아키는 자신의 수명을 대가로 '저주의 악마'의 힘을 쓴다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 9.png", explanation: "못 모양의 칼로 적을 찌르면 강력한 저주를 내리는 계약입니다.", tags: ["설정"] },
  { q: "코베니의 계약 악마는 '거미의 악마'라고 작중에 명확히 밝혀졌다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 12.png", explanation: "코베니의 계약 악마는 1부 끝까지 비밀(비공개)로 남았습니다.", tags: ["캐릭터"] },
  { q: "악마는 사람들이 그 이름에 대해 느끼는 공포가 클수록 강해진다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 10.png", explanation: "인간의 공포가 악마의 힘의 원천이 되는 독특한 세계관입니다.", tags: ["설정"] },
  { q: "덴지는 부유한 가정에서 태어나 최고급 교육을 받으며 자랐다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 18.png", explanation: "덴지는 매우 가난한 환경에서 자라 글조차 읽지 못하는 상태였습니다.", tags: ["스토리"] },
  { q: "키시베는 공안 특이 4과의 스승이자 최강의 데빌 헌터 중 한 명이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 13.png", explanation: "덴지와 파워를 혹독하게 훈련시킨 전설적인 헌터입니다.", tags: ["캐릭터"] },
  { q: "마인은 인간이 악마의 심장을 이식받아 탄생한 형태이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 17.png", explanation: "마인은 악마가 인간의 사체(시체)를 차지한 상태를 말합니다.", tags: ["설정"] },
  { q: "마키마의 정체는 '지배의 악마'이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 15.png", explanation: "타인을 복종시키고 조종하는 능력을 가진 강력한 악마입니다.", tags: ["스토리"] },
  { q: "빔(Beam)은 상어의 마인이며 덴지를 숭배하듯 따른다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 19.png", explanation: "체인소의 악마를 진심으로 따르는 열성적인 추종자입니다.", tags: ["캐릭터"] },
  { q: "천사의 악마는 만지는 사람의 지능을 높여주는 능력이 있다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 20.png", explanation: "천사의 악마는 신체 접촉 시 상대의 수명을 앗아가는 저주받은 능력을 가졌습니다.", tags: ["설정"] },
  { q: "포치타의 본래 모습은 지옥의 영웅이라 불리는 거대한 모습이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 22.png", explanation: "덴지와 함께할 때의 귀여운 모습은 힘을 잃었을 때의 일시적인 형태입니다.", tags: ["설정"] },
  { q: "파워는 평소 거짓말을 전혀 하지 못하는 정직함의 대명사이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 26.png", explanation: "파워는 자신에게 불리한 상황에서 뻔뻔하게 거짓말을 일삼는 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "레제는 폭탄의 악마와 융합한 무기 인간이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 23.png", explanation: "목의 핀을 뽑아 폭발하며 전투하는 강력한 적이자 덴지의 첫사랑입니다.", tags: ["캐릭터"] },
  { q: "총의 악마는 덴지의 친한 친구가 되기 위해 일본에 왔다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 16.png", explanation: "총의 악마는 전 세계를 학살한 공포의 대상이자 인류가 타도해야 할 적입니다.", tags: ["스토리"] },
  { q: "미래의 악마는 아키의 오른쪽 눈에 깃들어 계약을 맺었다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 28.png", explanation: "아키의 비극적인 최후를 가까이서 보기 위해 눈 속에 자리 잡았습니다.", tags: ["설정"] },
  { q: "덴지가 마키마와 처음 만나서 한 약속은 '세계 일주'이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 2.png", explanation: "마키마는 덴지를 거두며 '나의 개가 되어라'라고 말했습니다.", tags: ["스토리"] },
  { q: "체인소맨 1부의 제목은 '공안편'이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 29.png", explanation: "덴지의 공안 데빌 헌터 시절을 다룬 1부의 공식 명칭입니다.", tags: ["매니아"] },
  { q: "나유타는 1부 마지막에 등장하는 '지배의 악마'의 환생이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 15.png", explanation: "마키마가 사라진 후 새롭게 나타난 지배의 악마 아이입니다.", tags: ["매니아"] },
  { q: "덴지는 사실 엄청난 천재라서 모든 악마의 약점을 이미 알고 있다.", a: false, img: "/assets/quiz/chainsawman-img/image.png", explanation: "덴지는 지식보다는 본능과 광기로 싸우는 스타일입니다.", tags: ["캐릭터"] },
  { q: "지옥의 악마는 하늘에서 거대한 손의 형상으로 내려온다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 25.png", explanation: "거대한 손가락들로 대상을 지옥으로 끌고 가는 위엄을 보입니다.", tags: ["설정"] },
  { q: "아키의 동생 '타이요'는 총의 악마의 습격으로 사망했다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 9.png", explanation: "이 사건은 아키가 총의 악마를 증오하게 된 결정적인 계기입니다.", tags: ["스토리"] },
  { q: "덴지는 포치타를 먹어서 힘을 얻은 것이 아니라 심장을 이식받았다.", a: true, img: "/assets/quiz/chainsawman-img/image.png", explanation: "포치타가 스스로 덴지의 심장이 되어 하나로 합쳐진 것입니다.", tags: ["설정"] },
  { q: "체인소맨의 주인공 덴지는 사실 억만장자의 숨겨진 아들이다.", a: false, img: "/assets/quiz/chainsawman-img/image.png", explanation: "덴지는 빚더미에 앉은 채 야쿠자들에게 착취당하던 평범한 소년이었습니다.", tags: ["스토리"] }
];