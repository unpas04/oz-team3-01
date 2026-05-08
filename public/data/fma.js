/**
 * fma.js — 강철의 연금술사 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_FMA = [
  { q: "에드워드 엘릭의 오른팔은 자동인형(오토메일)이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "인체 연성의 대가로 잃은 오른팔을 정교한 기계 의수로 대체했습니다.", tags: ["캐릭터"] },
  { q: "알폰스 엘릭은 에드워드보다 나이가 많은 형이다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "알폰스는 동생이며, 에드워드가 형입니다.", tags: ["캐릭터"] },
  { q: "연금술의 대원칙인 '등가교환'은 아무런 대가 없이 무언가를 얻는 것이다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "등가교환은 얻고자 하는 만큼의 동등한 가치를 지불해야 한다는 원칙입니다.", tags: ["설정"] },
  { q: "로이 머스탱 대령은 불꽃을 자유자재로 다루는 염화의 연금술사이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "특수한 장갑으로 마찰을 일으켜 강력한 불꽃 연금술을 구사합니다.", tags: ["캐릭터"] },
  { q: "국가 연금술사의 상징이자 증표는 '금시계'이다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "국가 연금술사의 증표는 '은시계'입니다.", tags: ["설정"] },
  { q: "에드워드는 우유를 마시는 것을 아주 좋아해서 매일 챙겨 먹는다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "에드워드는 우유를 끔찍이 싫어하며, 이 때문에 키가 작다는 놀림을 받습니다.", tags: ["캐릭터"] },
  { q: "현자의 돌의 주원료는 인간의 '영혼'이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "수많은 인간의 생명을 희생시켜 압축한 결정체가 현자의 돌입니다.", tags: ["설정"] },
  { q: "윈리 록벨은 에드워드의 오토메일을 전담하는 정비사이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "어릴 적부터 함께 자란 소꿉친구이자 뛰어난 정비 실력을 갖췄습니다.", tags: ["캐릭터"] },
  { q: "에드워드는 연금술을 쓸 때 반드시 바닥에 연성진을 그려야만 한다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "진리의 문을 본 에드워드는 손뼉을 치는 것만으로 연성이 가능합니다.", tags: ["설정"] },
  { q: "킹 브래들리는 인간과 똑같이 늙고 상처 입는 호문클루스이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "호문클루스 '라스(분노)'이지만, 인간의 베이스로 만들어져 노화가 진행됩니다.", tags: ["설정"] },
  { q: "알폰스 엘릭의 영혼은 현재 커다란 나무 조각상에 깃들어 있다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "알폰스의 영혼은 거대한 강철 갑옷에 혈인(피의 문양)으로 정착되어 있습니다.", tags: ["설정"] },
  { q: "연금술사는 국가로부터 금을 마음대로 연성해서 부자가 될 수 있다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "금을 연성하는 것은 경제 혼란을 막기 위해 법으로 엄격히 금지되어 있습니다.", tags: ["설정"] },
  { q: "스카(Scar)는 이슈발 섬멸전의 복수를 위해 국가 연금술사를 사냥한다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "자신의 민족을 멸망시킨 연금술사들에 대한 깊은 증오를 가진 인물입니다.", tags: ["캐릭터"] },
  { q: "린 야오는 동방의 나라인 싱(Xing)에서 온 황자이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "불로불사의 법을 찾아 아메스트리스로 건너온 야심가입니다.", tags: ["스토리"] },
  { q: "호문클루스들은 모두 붉은색 '우로보로스' 문양을 몸 어딘가에 가지고 있다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "자신의 꼬리를 무는 뱀 문양은 호문클루스의 공통적인 상징입니다.", tags: ["설정"] },
  { q: "에드워드의 별명 '강철의 연금술사'는 그의 차갑고 냉혹한 성격 때문이다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "강철 의족과 의수를 차고 있기 때문에 대총통으로부터 부여받은 명칭입니다.", tags: ["캐릭터"] },
  { q: "반 호엔하임은 에드워드와 알폰스의 친아버지이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "오랜 세월을 살아온 신비로운 인물로, 주인공 형제의 아버지입니다.", tags: ["스토리"] },
  { q: "호문클루스 '글러트니'의 뱃속은 사실 무한한 우주와 연결되어 있다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "글러트니의 뱃속은 진리의 문을 모방하여 만든 실패작인 아공간입니다.", tags: ["매니아"] },
  { q: "국가 연금술사는 군 소속으로 '중령' 상당의 대우를 받는다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "국가 연금술사는 기본적으로 군 소속 '소령' 상당의 직위를 부여받습니다.", tags: ["매니아"] },
  { q: "인간 연성은 연금술사들 사이에서 최대의 금기(탭루)로 여겨진다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "죽은 자를 살리려는 시도는 항상 비극적인 대가를 초래하기 때문입니다.", tags: ["설정"] },
  { q: "엔비(Envy)는 다른 사람의 모습으로 변신할 수 있는 능력이 있다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "타인의 외형뿐만 아니라 목소리까지 완벽하게 복제하여 교란시킵니다.", tags: ["캐릭터"] },
  { q: "에드워드는 마지막에 연금술 능력을 희생하여 알폰스의 몸을 되찾았다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "자신의 '진리의 문'을 대가로 바쳐 동생의 육체를 지옥에서 끌어올렸습니다.", tags: ["스토리"] },
  { q: "머스탱 대령의 심복인 리자 호크아이의 주무기는 검(칼)이다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "리자 호크아이는 '매의 눈'이라는 별명을 가진 일류 저격수(총기 전문가)입니다.", tags: ["캐릭터"] },
  { q: "연금술의 3단계는 이해, 분해, 재구성이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "물질의 구성을 파악하고 부순 뒤 새로운 형태로 만드는 과정입니다.", tags: ["설정"] },
  { q: "작중 '아버님'이라 불리는 존재의 원래 정체는 플라스크 속의 소인이었다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "크세르크세스 유적에서 호엔하임의 피를 통해 탄생한 최초의 호문클루스입니다.", tags: ["매니아"] },
  { q: "알폰스 엘릭은 음식을 먹거나 잠을 잘 필요가 없는 몸이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "갑옷에 영혼만 깃든 상태라 인간의 생리 현상이 전혀 나타나지 않습니다.", tags: ["설정"] },
  { q: "매스 휴즈 중령은 에드워드 형제를 매우 증오하여 항상 방해했다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "휴즈는 주인공 형제를 친조카처럼 아끼고 물심양면으로 도와준 따뜻한 인물입니다.", tags: ["스토리"] },
  { q: "메이 창은 연금술이 아닌 동방의 '연단술'을 사용하는 소녀이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "의료와 원거리 연성에 특화된 싱 국가 고유의 기술을 씁니다.", tags: ["캐릭터"] },
  { q: "쇼 터커는 자신의 딸과 개를 합성해 키메라를 만든 파렴치한 연금술사이다.", a: true, img: "/assets/quiz/fma-img/image.png", explanation: "작중 가장 비극적이고 충격적인 사건 중 하나를 일으킨 장본인입니다.", tags: ["스토리"] },
  { q: "에드워드의 스승인 이즈미 커티스는 평범한 주부라서 연금술을 못 한다.", a: false, img: "/assets/quiz/fma-img/image.png", explanation: "이즈미는 자신을 '지나가던 주부'라고 소개하지만, 엄청난 실력을 가진 연금술사입니다.", tags: ["캐릭터"] }
];
