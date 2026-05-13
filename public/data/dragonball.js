/**
 * dragonball.js — 드래곤볼 30문항 (YES/NO 50:50 밸런스 완료)
 */

window.QUIZ_DATA_DRAGONBALL = [
  { q: "손오공의 사이어인 본명은 카카로트이다.", a: true, img: "/assets/quiz/dragonball-img/db-1.jpg", explanation: "사이어인 혹성 베지터에서 태어날 때 지어진 이름입니다.", tags: ["캐릭터"] },
  { q: "드래곤볼을 10개 모아야 신룡을 소환할 수 있다.", a: false, img: "/assets/quiz/dragonball-img/db-2.jpg", explanation: "드래곤볼은 총 7개를 모아야 신룡이 나타납니다.", tags: ["설정"] },
  { q: "베지터는 혹성 베지터의 왕자 출신이다.", a: true, img: "/assets/quiz/dragonball-img/db-3.jpg", explanation: "사이어인의 왕자로 자부심이 매우 강한 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "손오공의 아들 손오반은 공부보다 싸움을 훨씬 더 좋아한다.", a: false, img: "/assets/quiz/dragonball-img/db-4.jpg", explanation: "오반은 싸움보다는 학자가 되고 싶어 하는 평화주의자 성향이 강합니다.", tags: ["캐릭터"] },
  { q: "프리저는 자신의 전투력을 조절하기 위해 변신을 한다.", a: true, img: "/assets/quiz/dragonball-img/db-5.jpg", explanation: "변신을 거듭할수록 억눌렀던 강력한 힘이 해방됩니다.", tags: ["스토리"] },
  { q: "피콜로는 지구에서 자생한 식물 괴물 포켓몬(?)이다.", a: false, img: "/assets/quiz/dragonball-img/db-6.jpg", explanation: "피콜로는 나메크성이라는 외계 행성 출신의 외계인입니다.", tags: ["설정"] },
  { q: "초사이어인 1단계로 변신하면 머리카락이 노란색(금발)으로 변한다.", a: true, img: "/assets/quiz/dragonball-img/db-7.jpg", explanation: "강렬한 분노를 통해 각성하면 금빛 기와 함께 금발이 됩니다.", tags: ["설정"] },
  { q: "에네르기파(카메하메하)를 처음으로 창시한 사람은 손오공이다.", a: false, img: "/assets/quiz/dragonball-img/db-10.jpg", explanation: "무천도사가 50년에 걸쳐 완성한 기술을 오공이 한 번 보고 따라 한 것입니다.", tags: ["매니아"] },
  { q: "크리링은 손오공과 함께 무천도사 밑에서 수행한 동문이다.", a: true, img: "/assets/quiz/dragonball-img/db-8.jpg", explanation: "어린 시절부터 함께 수련하며 성장한 절친한 친구입니다.", tags: ["스토리"] },
  { q: "손오공은 지구에서 태어난 순수 지구인이다.", a: false, img: "/assets/quiz/dragonball-img/db-14.jpg", explanation: "아기 때 지구로 보내진 외계 종족 사이어인입니다.", tags: ["스토리"] },
  { q: "사이어인은 보름달을 보면 거대 원숭이로 변신한다.", a: true, img: "/assets/quiz/dragonball-img/db-13.jpg", explanation: "꼬리가 있는 사이어인은 보름달의 브루츠 파를 받아 변신합니다.", tags: ["설정"] },
  { q: "야무치의 필살기 이름은 '에네르기탄'이다.", a: false, img: "/assets/quiz/dragonball-img/db-16.jpg", explanation: "야무치의 초기 필살기는 '낭아풍풍권'이며 나중에는 조기탄을 씁니다.", tags: ["캐릭터"] },
  { q: "셀은 여러 전사들의 세포를 조합해 만든 인조인간이다.", a: true, img: "/assets/quiz/dragonball-img/db-17.jpg", explanation: "게로 박사가 만든 궁극의 생명체로, 상대의 기술도 복제합니다.", tags: ["스토리"] },
  { q: "카린 탑의 카린 님은 강아지 모양을 한 신선이다.", a: false, img: "/assets/quiz/dragonball-img/db-19.jpg", explanation: "카린 님은 하얀 고양이 모양을 하고 있습니다.", tags: ["캐릭터"] },
  { q: "선두를 먹으면 상처가 회복되고 10일간 배가 고프지 않다.", a: true, img: "/assets/quiz/dragonball-img/db-20.jpg", explanation: "강력한 회복 기능과 함께 한 알만 먹어도 배가 든든해지는 신비한 콩입니다.", tags: ["설정"] },
  { q: "베지터의 동생 이름은 '부르마'이다.", a: false, img: "/assets/quiz/dragonball-img/db-12.jpg", explanation: "부르마는 베지터의 아내이며, 베지터의 동생은 '타블'입니다.", tags: ["매니아"] },
  { q: "트랭크스는 미래에서 타임머신을 타고 온 베지터의 아들이다.", a: true, img: "/assets/quiz/dragonball-img/db-22.jpg", explanation: "인조인간들에게 멸망당하기 직전의 미래를 바꾸기 위해 왔습니다.", tags: ["스토리"] },
  { q: "사이어인의 꼬리는 한 번 잘리면 어떤 경우에도 다시 자라지 않는다.", a: false, img: "/assets/quiz/dragonball-img/db-23.jpg", explanation: "어린 사이어인의 꼬리는 위기 상황이나 성장에 따라 다시 자라나기도 합니다.", tags: ["설정"] },
  { q: "미스터 사탄은 마인 부우를 처음부터 무력으로 제압해 굴복시켰다.", a: false, img: "/assets/quiz/dragonball-img/db-26.jpg", explanation: "사탄은 진심 어린 소통과 우정을 통해 뚱보 부우를 감동시켰습니다.", tags: ["스토리"] },
  { q: "천진반은 눈이 3개인 삼안인의 후예이다.", a: true, img: "/assets/quiz/dragonball-img/db-29.jpg", explanation: "외계 종족인 삼안인의 혈통을 이어받아 이마에 제3의 눈이 있습니다.", tags: ["매니아"] },
  { q: "혹성 베지터가 멸망한 이유는 운석 충돌 때문이었다.", a: false, img: "/assets/quiz/dragonball-img/db-27.jpg", explanation: "혹성 베지터는 프리저가 사이어인들의 반란을 우려해 직접 파괴했습니다.", tags: ["스토리"] },
  { q: "인조인간 18호는 나중에 크리링과 결혼하여 딸 마론을 낳는다.", a: true, img: "/assets/quiz/dragonball-img/db-24.jpg", explanation: "드래곤볼에서 가장 의외이면서도 훈훈한 커플로 꼽힙니다.", tags: ["스토리"] },
  { q: "무천도사는 거북이로 변신하는 마법을 쓸 수 있다.", a: false, img: "/assets/quiz/dragonball-img/db-10.jpg", explanation: "무천도사는 무술의 달인일 뿐 변신 능력은 없습니다.", tags: ["캐릭터"] },
  { q: "원기옥은 손오공이 독학으로 개발한 오리지널 기술이다.", a: false, img: "/assets/quiz/dragonball-img/db-25.jpg", explanation: "원기옥은 저승의 북쪽 계왕 님에게 전수받은 기술입니다.", tags: ["설정"] },
  { q: "드래곤볼 Z의 마지막 보스는 '마인 부우'이다.", a: true, img: "/assets/quiz/dragonball-img/db-30.jpg", explanation: "수많은 변신을 거듭한 마인 부우와의 결전이 Z 시리즈의 마지막입니다.", tags: ["스토리"] },
  { q: "캡슐 코퍼레이션의 사장은 부르마의 아버지인 브리프 박사이다.", a: true, img: "/assets/quiz/dragonball-img/db-12.jpg", explanation: "세계를 바꾼 캡슐 기술을 개발한 천재 과학자 집안입니다.", tags: ["설정"] },
  { q: "베지터는 초사이어인 3 단계로 변신한 적이 원작 만화에 있다.", a: false, img: "/assets/quiz/dragonball-img/db-3.jpg", explanation: "베지터는 원작에서 초사이어인 2단계까지만 보여주었으며 3단계는 건너뛰었습니다.", tags: ["매니아"] },
  { q: "지구의 신룡은 한 번에 최대 100개의 소원을 들어줄 수 있다.", a: false, img: "/assets/quiz/dragonball-img/db-2.jpg", explanation: "지구 신룡의 소원 개수는 처음엔 1개, 나중에 덴데에 의해 3개로 늘어납니다.", tags: ["설정"] },
  { q: "손오공의 할아버지 이름은 손오반이다.", a: true, img: "/assets/quiz/dragonball-img/db-21.jpg", explanation: "아들의 이름(손오반)을 돌아가신 양할아버지의 이름에서 따왔습니다.", tags: ["캐릭터"] },
  { q: "프리저의 부하 중 기뉴 특전대는 총 5명으로 구성되어 있다.", a: true, img: "/assets/quiz/dragonball-img/db-5.jpg", explanation: "기뉴, 리쿰, 지스, 바타, 굴드로 구성된 엘리트(와 광대) 집단입니다.", tags: ["매니아"] }
];