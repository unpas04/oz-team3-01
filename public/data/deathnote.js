/**
 * deathnote.js — 데스노트 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_DEATHNOTE = [
  { q: "야가미 라이토가 처음 주운 데스노트의 원래 주인은 류크이다.", a: true, img: "/assets/quiz/deathnote-img/image.png", explanation: "류크가 지루함을 달래기 위해 인간계에 떨어뜨린 노트를 라이토가 습득했습니다.", tags: ["스토리"] },
  { q: "데스노트에 이름을 적을 때, 얼굴을 몰라도 이름만 알면 죽일 수 있다.", a: false, img: "/assets/quiz/deathnote-img/image copy.png", explanation: "동명이인을 피하기 위해 이름과 함께 대상의 얼굴을 떠올려야 합니다.", tags: ["설정"] },
  { q: "데스노트에 구체적인 사인을 적지 않으면 모두 '심장마비'로 죽는다.", a: true, img: "/assets/quiz/deathnote-img/image copy 2.png", explanation: "사인이 명시되지 않을 경우의 기본 사인은 심장마비입니다.", tags: ["설정"] },
  { q: "L은 단 음식을 아주 싫어하며 쓴 커피만 마신다.", a: false, img: "/assets/quiz/deathnote-img/image copy 3.png", explanation: "L은 뇌 회전을 돕기 위해 사탕, 케이크 등 단것을 항상 섭취합니다.", tags: ["캐릭터"] },
  { q: "아마네 미사는 사신의 눈 거래를 총 두 번 했다.", a: true, img: "/assets/quiz/deathnote-img/image copy 4.png", explanation: "라이토를 돕기 위해 자신의 수명을 두 번이나 절반으로 깎았습니다.", tags: ["스토리"] },
  { q: "사신 렘은 라이토를 죽이기 위해 스스로 소멸했다.", a: false, img: "/assets/quiz/deathnote-img/image copy 5.png", explanation: "렘은 미사를 구하기 위해(미사의 수명을 늘리기 위해) 노트를 써서 소멸했습니다.", tags: ["스토리"] },
  { q: "라이토의 별명 '키라'는 영어 'Killer'에서 유래한 것이다.", a: true, img: "/assets/quiz/deathnote-img/image copy 6.png", explanation: "살인자를 뜻하는 킬러를 일본식으로 발음한 것이 칭호가 되었습니다.", tags: ["설정"] },
  { q: "사신의 눈을 가진 소유자는 자신의 수명도 정확히 볼 수 있다.", a: false, img: "/assets/quiz/deathnote-img/image copy 7.png", explanation: "데스노트 소유자는 자신의 수명을 볼 수 없다는 제약이 있습니다.", tags: ["설정"] },
  { q: "류크는 인간계의 '사과'를 매우 좋아한다.", a: true, img: "/assets/quiz/deathnote-img/image copy 8.png", explanation: "사신계의 사과와 달리 인간계 사과는 매우 맛있다고 좋아합니다.", tags: ["캐릭터"] },
  { q: "L의 본명은 이야기 초반 라이토와의 첫 대결에서 바로 밝혀진다.", a: false, img: "/assets/quiz/deathnote-img/image copy 9.png", explanation: "L의 본명은 극비이며, 라이토가 이를 알아내기 위해 끝까지 사투를 벌입니다.", tags: ["스토리"] },
  { q: "데스노트에 이름을 적은 뒤 사인을 적기까지의 제한 시간은 40초이다.", a: true, img: "/assets/quiz/deathnote-img/image copy 10.png", explanation: "이름 기록 후 40초 내에 사인을 적어야 효과가 발동합니다.", tags: ["설정"] },
  { q: "니아(N)는 L의 고향인 일본에서 태어난 그의 친동생이다.", a: false, img: "/assets/quiz/deathnote-img/image copy 11.png", explanation: "니아는 와미즈 하우스 출신의 L의 후계자 후보 중 한 명입니다.", tags: ["캐릭터"] },
  { q: "미사에게 데스노트를 건네준 첫 번째 사신은 제라스이다.", a: true, img: "/assets/quiz/deathnote-img/image copy 12.png", explanation: "미사를 구하고 소멸한 제라스의 노트를 렘이 미사에게 전달했습니다.", tags: ["스토리"] },
  { q: "라이토의 여동생 이름은 야가미 미나코이다.", a: false, img: "/assets/quiz/deathnote-img/image copy 13.png", explanation: "라이토의 여동생 이름은 야가미 사유입니다.", tags: ["캐릭터"] },
  { q: "사신계의 사신들도 남성형과 여성형으로 성별 구분이 존재한다.", a: true, img: "/assets/quiz/deathnote-img/image copy 14.png", explanation: "외형과 명칭을 통해 사신들 사이에도 성별이 있음이 묘사됩니다.", tags: ["설정"] },
  { q: "데스노트는 인간계에 단 한 권만 존재할 수 있다는 규칙이 있다.", a: false, img: "/assets/quiz/deathnote-img/image copy 15.png", explanation: "작중 여러 권의 노트를 둘러싸고 복잡한 소유권 분쟁이 일어납니다.", tags: ["설정"] },
  { q: "L은 소파에 깊숙이 파묻혀 등을 대고 앉는 것을 선호한다.", a: false, img: "/assets/quiz/deathnote-img/image copy 16.png", explanation: "L은 항상 무릎을 세우고 쪼그려 앉는 독특한 자세를 유지합니다.", tags: ["캐릭터"] },
  { q: "데스노트의 소유권을 포기하면 노트와 관련된 기억이 모두 사라진다.", a: true, img: "/assets/quiz/deathnote-img/image copy 18.png", explanation: "포기 시 모든 기억이 소멸하지만, 노트를 다시 만지면 일시적으로 회복됩니다.", tags: ["설정"] },
  { q: "멜로(M)는 니아와 협력하기 위해 항상 '장난감'을 가지고 논다.", a: false, img: "/assets/quiz/deathnote-img/image copy 19.png", explanation: "장난감에 집착하는 것은 니아이며, 멜로는 항상 판 초콜릿을 먹습니다.", tags: ["캐릭터"] },
  { q: "라이토의 아버지 야가미 소이치로는 키라 수사 본부의 본부장이다.", a: true, img: "/assets/quiz/deathnote-img/image copy 20.png", explanation: "정의를 위해 아들이 키라일지도 모른다는 의심 속에서도 수사를 이끕니다.", tags: ["스토리"] },
  { q: "데스노트로 사람을 조종할 수 있는 기간은 최대 23일이다.", a: true, img: "/assets/quiz/deathnote-img/image copy 21.png", explanation: "노트의 힘으로 운명을 결정지을 수 있는 시간상의 한계치입니다.", tags: ["설정"] },
  { q: "데스노트 종이는 한 권을 다 쓰면 사신에게 가서 리필을 받아야 한다.", a: false, img: "/assets/quiz/deathnote-img/image copy 23.png", explanation: "데스노트 종이는 아무리 써도 줄어들지 않고 계속 리필되는 신비한 물건입니다.", tags: ["설정"] },
  { q: "니아(Near)는 퍼즐이나 레고 같은 장난감에 집착하는 버릇이 있다.", a: true, img: "/assets/quiz/deathnote-img/image copy 24.png", explanation: "추리하는 과정에서 손으로 무언가를 조립하거나 만지는 습관이 있습니다.", tags: ["캐릭터"] },
  { q: "레이 펜버의 약혼자인 미소라 나오미는 평범한 주부였다.", a: false, img: "/assets/quiz/deathnote-img/image copy 25.png", explanation: "나오미는 과거 FBI 수사관 출신의 매우 유능한 엘리트였습니다.", tags: ["캐릭터"] },
  { q: "데스노트를 조각내어 한 장만 가지고 있어도 사신이 보인다.", a: true, img: "/assets/quiz/deathnote-img/image copy 27.png", explanation: "노트의 일부만 소유하거나 접촉해도 효력과 사신 확인이 가능합니다.", tags: ["설정"] },
  { q: "사신계의 사신들은 매우 근면 성실하게 매일 인간의 이름을 적는다.", a: false, img: "/assets/quiz/deathnote-img/image copy 28.png", explanation: "사신들은 대부분 나태하며 도박으로 시간을 보내는 경우가 많습니다.", tags: ["설정"] },
  { q: "라이토는 L의 정체를 밝히기 위해 L이 다니는 대학에 입학했다.", a: true, img: "/assets/quiz/deathnote-img/image copy 22.png", explanation: "L(가명 류가)과 같은 대학에 들어가 심리전과 정보전을 벌였습니다.", tags: ["스토리"] },
  { q: "데스노트 1권의 맨 처음에 적혀 있는 사용법은 '영어로' 되어 있다.", a: true, img: "/assets/quiz/deathnote-img/image.png", explanation: "세계 공용어인 영어로 How to Use가 적혀 있어 라이토가 읽을 수 있었습니다.", tags: ["설정"] },
  { q: "키라 사건의 마지막에서 라이토는 니아를 죽이고 승리한다.", a: false, img: "/assets/quiz/deathnote-img/image copy 29.png", explanation: "결국 라이토는 패배하고 류크의 손에 의해 이름이 적혀 죽게 됩니다.", tags: ["스토리"] },
  { q: "L의 아지트인 와미즈 하우스는 영국에 위치해 있다.", a: true, img: "/assets/quiz/deathnote-img/image copy 11.png", explanation: "퀸린이라는 인물이 설립한 영국 소제의 고아원 겸 영재 교육 시설입니다.", tags: ["매니아"] }
];