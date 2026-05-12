/**
 * chainsawman.js — 체인소맨 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_CHAINSAWMAN = [
  { q: "덴지의 심장이 된 악마 포치타는 체인소의 악마이다.", a: true, img: "/assets/quiz/chainsawman-img/image.png", explanation: "포치타는 체인소의 악마이며 덴지와 계약해 심장이 되었습니다.", tags: ["캐릭터"] },
  { q: "덴지는 가슴의 스타터 밧줄을 당겨 변신한다.", a: true, img: "/assets/quiz/chainsawman-img/image copy.png", explanation: "가슴에 달린 엔진 시동 줄을 당기면 체인소맨으로 변합니다.", tags: ["설정"] },
  { q: "마키마는 공안 대마 특이 4과의 책임자이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 2.png", explanation: "덴지를 거두어 공안 데빌 헌터로 만든 인물입니다.", tags: ["캐릭터"] },
  { q: "파워는 '피의 악마'가 인간의 시체를 차지한 마인이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 3.png", explanation: "피를 다루는 능력을 가진 오만한 성격의 마인입니다.", tags: ["캐릭터"] },
  { q: "하야카와 아키는 여우의 악마와 계약 중이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 4.png", explanation: "손가락으로 '콩' 사인을 보내 여우의 머리를 소환합니다.", tags: ["설정"] },
  { q: "파워가 가장 아끼는 애완동물은 강아지다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 5.png", explanation: "파워는 고양이 '냐코'를 지극히 아낍니다.", tags: ["캐릭터"] },
  { q: "덴지가 데빌 헌터가 된 가장 큰 이유는 돈 때문이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 6.png", explanation: "부모님이 남긴 거액의 빚을 갚기 위해 데빌 헌터 일을 시작했습니다.", tags: ["스토리"] },
  { q: "체인소맨은 악마들에게 잡아먹힌 악마의 개념을 지워버릴 수 있다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 7.png", explanation: "체인소맨에게 먹힌 악마는 세상의 기억과 존재 자체가 사라집니다.", tags: ["설정"] },
  { q: "히메노는 고스트(유령)의 악마와 계약했다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 8.png", explanation: "자신의 오른쪽 눈을 대가로 유령의 손을 부립니다.", tags: ["캐릭터"] },
  { q: "아키는 자신의 수명을 대가로 '저주의 악마'의 힘을 쓴다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 9.png", explanation: "못 모양의 칼로 세 번 찌르면 저주의 악마가 나타나 적을 처단합니다.", tags: ["설정"] },
  { q: "악마는 인간이 그 이름에 대해 느끼는 공포가 클수록 강해진다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 10.png", explanation: "공포가 악마의 힘의 원천이 되는 세계관 설정입니다.", tags: ["설정"] },
  { q: "덴지는 작중에서 토스트에 잼을 발라 먹는 소소한 꿈을 이룬다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 11.png", explanation: "극심한 가난을 겪었던 덴지에게는 이것이 인생의 큰 목표 중 하나였습니다.", tags: ["스토리"] },
  { q: "코베니의 계약 악마는 '거미의 악마'이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 12.png", explanation: "코베니의 계약 악마는 작중에서 비밀(비공개)로 유지됩니다.", tags: ["캐릭터"] },
  { q: "키시베는 공안 최고의 데빌 헌터로 불린다.", a: true, img: ["/assets/quiz/chainsawman-img/image copy 13.png"], explanation: "특이 4과의 스승 격인 인물로 압도적인 실력을 자랑합니다.", tags: ["캐릭터"] },
  { q: "덴지는 불사신이라서 머리가 잘려도 다시 붙이면 산다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 14.png", explanation: "피를 공급받고 시동 줄을 당기면 신체가 복구됩니다.", tags: ["설정"] },
  { q: "마키마의 정체는 '지배의 악마'이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 15.png", explanation: "타인을 지배하고 조종하는 능력을 가진 강력한 악마입니다.", tags: ["스토리"] },
  { q: "총의 악마를 쓰러뜨리는 것이 공안의 최종 목표 중 하나다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 16.png", explanation: "전 세계를 순식간에 학살한 공포의 대상인 총의 악마 토벌이 주된 임무입니다.", tags: ["스토리"] },
  { q: "마인은 악마가 인간의 시체를 차지한 형태를 말한다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 17.png", explanation: "인간의 지능을 갖게 되지만 원래 악마보다는 약해집니다.", tags: ["설정"] },
  { q: "덴지는 학교에 다닌 적이 없어 글을 읽지 못한다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 18.png", explanation: "가난과 빚 때문에 정규 교육을 전혀 받지 못했습니다.", tags: ["캐릭터"] },
  { q: "빔(Shark Fiend)은 상어의 마인이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 19.png", explanation: "벽이나 바닥을 헤엄치듯 이동할 수 있는 상어의 마인입니다.", tags: ["캐릭터"] },
  { q: "천사의 악마는 만지는 사람의 수명을 흡수한다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 20.png", explanation: "의도치 않게 타인의 생명력을 앗아가는 비극적인 능력을 갖췄습니다.", tags: ["설정"] },
  { q: "아키는 매일 아침 담배를 피우는 습관이 있다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 21.png", explanation: "히메노의 영향으로 담배를 피우기 시작했습니다.", tags: ["캐릭터"] },
  { q: "포치타의 원래 모습은 귀여운 강아지 형태가 아니다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 22.png", explanation: "지옥의 영웅이라 불리는 체인소맨의 본래 모습은 훨씬 거대하고 흉폭합니다.", tags: ["설정"] },
  { q: "레제는 폭탄의 악마와 융합한 무기 인간이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 23.png", explanation: "덴지의 첫사랑이자 핀을 뽑아 폭발하는 능력을 가진 적입니다.", tags: ["캐릭터"] },
  { q: "덴지는 마키마와 데이트를 하는 것이 소원이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 24.png", explanation: "마키마를 짝사랑하며 그녀에게 인정받고 싶어 합니다.", tags: ["스토리"] },
  { q: "지옥의 악마는 손가락 네 개로 하늘에서 내려온다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 25.png", explanation: "거대한 손의 형상으로 나타나 적을 지옥으로 끌고 갑니다.", tags: ["설정"] },
  { q: "파워는 거짓말을 전혀 하지 못하는 정직한 성격이다.", a: false, img: "/assets/quiz/chainsawman-img/image copy 26.png", explanation: "자신에게 유리하게 거짓말을 밥 먹듯이 하는 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "덴지의 아버지는 덴지에게 거액의 빚을 남기고 자살했다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 27.png", explanation: "이 빚 때문에 덴지의 비극적인 삶이 시작되었습니다.", tags: ["스토리"] },
  { q: "미래의 악마는 아키의 오른쪽 눈에 깃들었다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 28.png", explanation: "아키의 비참한 미래를 직접 보기 위해 계약 조건으로 깃들었습니다.", tags: ["설정"] },
  { q: "체인소맨 1부의 부제는 '공안편'이다.", a: true, img: "/assets/quiz/chainsawman-img/image copy 29.png", explanation: "만화책 1권부터 11권까지의 내용을 공안편이라 부릅니다.", tags: ["매니아"] }
];