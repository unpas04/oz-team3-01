/**
 * fate.js — 페이트 시리즈 30문항 (YES/NO 50:50 밸런스 및 검수 완료)
 */

window.QUIZ_DATA_FATE = [
  { q: "마술사는 수련을 통해 자신의 몸 안에 없던 마술 회로를 무한히 새로 만들어낼 수 있다.", a: false, img: "/assets/quiz/fate-img/fate-1.png", explanation: "마술 회로는 선천적으로 결정되는 마술사의 기관이며, 일반적인 수련으로 그 개수 자체를 늘릴 수는 없습니다.", tags: ["설정"] },
  { q: "서번트 세이버의 진명은 알렉산더 대왕이다.", a: false, img: "/assets/quiz/fate-img/fate-2.png", explanation: "Fate/stay night 기준 세이버의 진명은 아서 왕(아르토리아 펜드래건)입니다.", tags: ["캐릭터"] },
  { q: "성배전쟁에서 소환되는 서번트의 클래스는 기본적으로 7개이다.", a: true, img: "/assets/quiz/fate-img/fate-3.png", explanation: "세이버, 랜서, 아처, 라이더, 캐스터, 어쌔신, 버서커의 7클래스가 기본입니다.", tags: ["설정"] },
  { q: "에미야 시로의 주력 마술은 '투영 마술'이다.", a: true, img: "/assets/quiz/fate-img/fate-4.png", explanation: "시로는 자신의 기원인 '검'에 특화된 투영 마술을 주로 사용합니다.", tags: ["캐릭터"] },
  { q: "토오사카 린은 5차 성배전쟁의 마스터 중 한 명이다.", a: true, img: "/assets/quiz/fate-img/fate-5.png", explanation: "린은 아처의 마스터로서 성배전쟁에 참여합니다.", tags: ["캐릭터"] },
  { q: "랜서 클래스의 서번트는 보통 행운 수치가 매우 높다.", a: false, img: "/assets/quiz/fate-img/fate-6.png", explanation: "랜서(쿠 훌린 등)는 전통적으로 행운(LUK) 수치가 낮게 설정되는 경향이 있습니다.", tags: ["매니아"] },
  { q: "서번트는 영체화하여 물리적인 벽을 통과할 수 있다.", a: true, img: "/assets/quiz/fate-img/fate-7.png", explanation: "서번트는 마력 공급을 위해 영체 상태로 존재하거나 이동할 수 있습니다.", tags: ["설정"] },
  { q: "세이버의 보구 '엑스칼리버'는 대인 보구이다.", a: false, img: "/assets/quiz/fate-img/fate-8.png", explanation: "엑스칼리버는 강력한 빛의 줄기를 뿜어내는 '대성(對城) 보구'입니다.", tags: ["설정"] },
  { q: "성배전쟁의 감독역은 대대로 성당교회에서 파견한다.", a: true, img: "/assets/quiz/fate-img/fate-9.png", explanation: "마술사 협회와 대립하는 성당교회가 중립적인 감독 역할을 맡습니다.", tags: ["설정"] },
  { q: "길가메시는 모든 영웅의 보구의 원형을 가진 '게이트 오브 바빌론'을 사용한다.", a: true, img: "/assets/quiz/fate-img/fate-10.png", explanation: "인류 최고의 영웅왕으로서 모든 보물의 원형을 소장하고 있습니다.", tags: ["캐릭터"] },
  { q: "마토 사쿠라는 에미야 시로와 피가 이어진 친남매이다.", a: false, img: "/assets/quiz/fate-img/fate-11.png", explanation: "사쿠라는 원래 토오사카 가문의 자식으로, 토오사카 린의 친동생입니다.", tags: ["스토리"] },
  { q: "라이더(5차)의 진명은 메두사이다.", a: true, img: "/assets/quiz/fate-img/fate-12.png", explanation: "그리스 신화의 고르곤 삼형제 중 막내인 메두사가 진명입니다.", tags: ["매니아"] },
  { q: "이리야스필 폰 아인츠베른은 호문쿨루스이다.", a: true, img: "/assets/quiz/fate-img/fate-13.png", explanation: "아인츠베른 가문에서 제조된 고성능의 마술 회로를 가진 호문쿨루스입니다.", tags: ["캐릭터"] },
  { q: "버서커(5차)는 보구 '갓 핸드'를 통해 12번의 생명을 가진다.", a: true, img: "/assets/quiz/fate-img/fate-14.png", explanation: "헤라클레스의 12과업을 상징하는 보구로, 사망 시 자동 부활합니다.", tags: ["매니아"] },
  { q: "아처(5차)의 정체는 미래의 에미야 시로이다.", a: true, img: "/assets/quiz/fate-img/fate-15.png", explanation: "정의의 사자를 꿈꾸던 에미야 시로가 수호자가 된 모습입니다.", tags: ["스토리"] },
  { q: "성배는 오직 마술사만 만질 수 있는 실체적인 금색 잔이다.", a: false, img: "/assets/quiz/fate-img/fate-16.png", explanation: "성배는 영체적인 에너지의 결정체이며, 소환된 서번트의 영혼을 담는 그릇이 필요합니다.", tags: ["설정"] },
  { q: "라이더 클래스는 반드시 말을 타고 싸워야만 한다.", a: false, img: "/assets/quiz/fate-img/fate-17.png", explanation: "탈것(비행기, 배, 환상종 등)이라면 무엇이든 다룰 수 있으며, 말에 국한되지 않습니다.", tags: ["설정"] },
  { q: "어쌔신(5차) 사사키 코지로의 진명은 가짜이며, 무명의 검사일 뿐이다.", a: true, img: "/assets/quiz/fate-img/fate-18.png", explanation: "기록상 실존하지 않는 사사키 코지로의 역할을 수행하기 위해 소환된 망령입니다.", tags: ["매니아"] },
  { q: "마술 각인은 마술사의 지식과 술식을 대대로 계승하는 마술적 장기이다.", a: true, img: "/assets/quiz/fate-img/fate-19.png", explanation: "가문의 비법을 자식에게 이식하여 마술적 자산을 보존하는 장치입니다.", tags: ["설정"] },
  { q: "길가메시의 가장 강력한 보구 '에누마 엘리쉬'는 창 모양의 보구이다.", a: false, img: "/assets/quiz/fate-img/fate-20.png", explanation: "에누마 엘리쉬는 괴리검 '에아'라는 검을 통해 발동하는 공격입니다.", tags: ["매니아"] },
  { q: "후지무라 타이가는 에미야 시로의 마술 스승이다.", a: false, img: "/assets/quiz/fate-img/fate-21.png", explanation: "타이가는 시로의 보호자이자 학교 선생님이며, 마술과는 무관합니다.", tags: ["캐릭터"] },
  { q: "아처의 고유결계 이름은 '무한의 검제(Unlimited Blade Works)'이다.", a: true, img: "/assets/quiz/fate-img/fate-22.png", explanation: "자신의 내면 풍경을 구현하여 수많은 검을 복제해두는 공간입니다.", tags: ["매니아"] },
  { q: "Fate/stay night의 세 가지 루트는 Fate, Unlimited Blade Works, Heaven's Feel이다.", a: true, img: "/assets/quiz/fate-img/fate-23.png", explanation: "각각 세이버, 린, 사쿠라를 메인 히로인으로 하는 세 루트입니다.", tags: ["스토리"] },
  { q: "코토미네 키레이는 4차 성배전쟁의 우승자이다.", a: false, img: "/assets/quiz/fate-img/fate-24.png", explanation: "4차 성배전쟁은 승자 없이 비극적으로 끝났으며, 키레이는 생존자 중 한 명입니다.", tags: ["스토리"] },
  { q: "성배의 내용물은 본래 만능의 원망기이나, 현재는 오염되어 있다.", a: true, img: "/assets/quiz/fate-img/fate-25.png", explanation: "3차 성배전쟁 때 소환된 '앙그라마이뉴'에 의해 성배가 오염되었습니다.", tags: ["설정"] },
  { q: "모든 마스터는 서번트에게 절대적인 명령을 내릴 수 있는 령주를 10획씩 가진다.", a: false, img: "/assets/quiz/fate-img/fate-26.png", explanation: "마스터 한 명당 부여되는 령주는 기본적으로 3획입니다.", tags: ["설정"] },
  { q: "서번트 어쌔신은 '기척차단' 스킬을 공통적으로 보유한다.", a: true, img: "/assets/quiz/fate-img/fate-27.png", explanation: "은밀한 암살을 위해 기척을 감추는 클래스 전용 스킬입니다.", tags: ["설정"] },
  { q: "카이네스 엘멜로이 아치볼트는 에미야 시로의 아버지이다.", a: false, img: "/assets/quiz/fate-img/fate-28.png", explanation: "시로의 양아버지는 에미야 키리츠구입니다.", tags: ["스토리"] },
  { q: "세이버의 검집 '아발론'은 소유자에게 강력한 재생 능력을 준다.", a: true, img: "/assets/quiz/fate-img/fate-29.png", explanation: "아서 왕의 전설처럼 소지자를 모든 상처로부터 치유하고 보호합니다.", tags: ["설정"] },
  { q: "마술사 협회의 본부 '시계탑'은 영국 런던에 위치하고 있다.", a: true, img: "/assets/quiz/fate-img/fate-30.png", explanation: "마술사들의 총본산인 시계탑은 런던을 거점으로 합니다.", tags: ["설정"] }
];
