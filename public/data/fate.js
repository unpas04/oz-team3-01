/**
 * fate.js — 페이트 시리즈 30문항 (속성 밸런스 최적화)
 */

window.QUIZ_DATA_FATE = [
  /* [스토리] 파트 — 8문항 */
  { q: "Fate/Zero는 5차 성배전쟁의 10년 전 이야기를 다루는 프리퀄이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "Fate/stay night의 이전 세대 이야기를 다룹니다.", tags: ["스토리"] },
  { q: "Heaven's Feel 루트의 진정한 흑막은 마토 조켄이다.", a: true, img: "/assets/quiz/fate-img/fate-4.png", explanation: "모든 비극을 뒤에서 조종한 마토 가문의 당주입니다.", tags: ["스토리"] },
  { q: "4차 성배전쟁의 캐스터 질 드 레는 세이버를 잔 다르크로 착각한다.", a: true, img: "/assets/quiz/fate-img/fate-9.png", explanation: "과거의 광기에 빠져 세이버를 성녀로 오해합니다.", tags: ["스토리"] },
  { q: "메데이아(캐스터)는 자신의 원래 마스터를 살해하고 쿠즈키를 만났다.", a: true, img: "/assets/quiz/fate-img/fate-19.png", explanation: "마스터의 비인간적인 행태에 분노하여 살해하고 도주했습니다.", tags: ["스토리"] },
  { q: "5차 성배전쟁의 아처의 정체는 수호자가 된 미래의 에미야 시로이다.", a: true, img: "/assets/quiz/fate-img/fate-14.png", explanation: "자신의 이상을 위해 계약하여 영령이 된 미래의 자신입니다.", tags: ["스토리"] },
  { q: "란슬롯은 Fate/Zero에서 버서커 클래스로 등장한다.", a: true, img: "/assets/quiz/fate-img/fate-7.png", explanation: "광기에 빠진 호수의 기사로 소환되었습니다.", tags: ["스토리"] },
  { q: "FGO의 주인공이 소속된 인리계속보장기관의 이름은 '칼데아'이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "인류 멸망을 막기 위해 설립된 조직입니다.", tags: ["스토리"] },
  { q: "Fate/Apocrypha는 7대 7 서번트 팀 배틀인 '성배대전'을 다룬다.", a: true, img: "/assets/quiz/fate-img/fate-8.png", explanation: "적과 흑의 진영으로 나뉘어 격돌합니다.", tags: ["스토리"] },

  /* [캐릭터] 파트 — 8문항 */
  { q: "세이버의 진명은 알토리아 펜드래건이다.", a: true, img: "/assets/quiz/fate-img/fate-11.png", explanation: "전설적인 아서 왕 본인입니다.", tags: ["캐릭터"] },
  { q: "길가메쉬는 아처 클래스로 소환된 영령이다.", a: true, img: "/assets/quiz/fate-img/fate-18.png", explanation: "4차와 5차 모두 아처로 강림했습니다.", tags: ["캐릭터"] },
  { q: "이스칸다르는 정복왕 알렉산더 대왕의 영령이다.", a: true, img: "/assets/quiz/fate-img/fate-3.png", explanation: "라이더로 소환된 정복왕입니다.", tags: ["캐릭터"] },
  { q: "토오사카 린은 5차 성배전쟁에서 라이더의 마스터이다.", a: false, img: "/assets/quiz/fate-img/fate-13.png", explanation: "린은 아처의 마스터입니다.", tags: ["캐릭터"] },
  { q: "헤라클레스는 12번 부활할 수 있는 '갓 핸드' 보구를 가졌다.", a: true, img: "/assets/quiz/fate-img/fate-21.png", explanation: "총 12번의 죽음을 견디게 합니다.", tags: ["캐릭터"] },
  { q: "마슈 키리에라이트는 인간과 영령이 융합된 데미 서번트이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "인류 최초의 데미 서번트 성공 사례입니다.", tags: ["캐릭터"] },
  { q: "에미야 키리츠구는 '마술사 킬러'라는 별명을 가지고 있다.", a: true, img: "/assets/quiz/fate-img/fate-22.png", explanation: "현대 병기를 사용하여 마술사들을 암살했습니다.", tags: ["캐릭터"] },
  { q: "길가메쉬의 보구 '에누마 엘리쉬'는 대계(對界) 보구이다.", a: true, img: "/assets/quiz/fate-img/fate-18.png", explanation: "세계를 가르는 공간 절단 기술입니다.", tags: ["캐릭터"] },

  /* [설정] 파트 — 7문항 */
  { q: "에미야 시로의 주력 마술은 투영 마술이다.", a: true, img: "/assets/quiz/fate-img/fate-24.png", explanation: "무기를 복제하여 생성하는 마술입니다.", tags: ["설정"] },
  { q: "성배전쟁은 총 7명의 마스터와 7명의 서번트가 참여하는 것이 원칙이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "기본 7개 클래스가 계약하여 싸웁니다.", tags: ["설정"] },
  { q: "고유결계는 마술사의 심상을 현실에 덮어씌우는 마술의 극치이다.", a: true, img: "/assets/quiz/fate-img/fate-14.png", explanation: "Reality Marble이라 불리는 대마술입니다.", tags: ["설정"] },
  { q: "마술 회로는 후천적으로 숫자를 늘릴 수 있는 재능이다.", a: false, img: "/assets/quiz/fate-img/fate-15.png", explanation: "선천적으로 정해져 있으며 후천적으론 확장만 가능합니다.", tags: ["설정"] },
  { q: "쿠 훌린의 게이 볼그는 인과를 역전시키는 저주를 가졌다.", a: true, img: "/assets/quiz/fate-img/fate-16.png", explanation: "결과를 확정하고 과정을 만드는 필중의 마창입니다.", tags: ["설정"] },
  { q: "근원에 도달하는 것은 모든 마술사가 꿈꾸는 궁극적인 목표이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "만물의 시작인 근원에 닿는 것이 마술사의 본질입니다.", tags: ["설정"] },
  { q: "Fate/EXTRA의 성배전쟁 무대는 달 내부의 영자 가상 세계이다.", a: true, img: "/assets/quiz/fate-img/fate-30.png", explanation: "SE.RA.PH라 불리는 전뇌 공간입니다.", tags: ["설정"] },

  /* [매니아] 파트 — 7문항 */
  { q: "5차 어새신 사사키 코지로는 가공의 전설에 부합하는 무명의 검사이다.", a: true, img: "/assets/quiz/fate-img/fate-20.png", explanation: "전설 자체는 허구이나 기술이 일치하여 소환된 케이스입니다.", tags: ["매니아"] },
  { q: "이리야스필은 호문쿨루스이면서 자연 잉태로 태어난 존재이다.", a: true, img: "/assets/quiz/fate-img/fate-23.png", explanation: "아인츠베른 기술의 결정체입니다.", tags: ["매니아"] },
  { q: "웨이버 벨벳은 4차 성배전쟁 이후 시계탑의 로드가 된다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "정복왕과의 인연으로 크게 성장하여 로드가 됩니다.", tags: ["매니아"] },
  { q: "타입 문(Type-Moon)은 달의 얼티밋 원을 의미한다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "행성 최강종의 명칭입니다.", tags: ["매니아"] },
  { q: "세이버(알토리아)는 원래 남자로 기획되었던 캐릭터이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "초기 안인 Fate/Prototype에서는 남성이었습니다.", tags: ["매니아"] },
  { q: "세이버 라이온은 고기를 좋아하는 사자 인형 옷을 입은 마스코트다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "타입 문 세계관의 개그 마스코트입니다.", tags: ["매니아"] },
  { q: "카니발 판타즘은 페이트와 월희 캐릭터가 함께 나오는 개그물이다.", a: true, img: "/assets/quiz/fate-img/fate-1.png", explanation: "10주년 기념 올스타 코미디 작품입니다.", tags: ["매니아"] }



];
