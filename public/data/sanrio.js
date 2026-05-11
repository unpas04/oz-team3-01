/**
 * sanrio.js — 산리오 캐릭터 퀴즈 데이터
 * YES/NO 비율: YES 14 / NO 16 (균형)
 * 해설 톤 통일: 정답 근거 + 추가 트리비아
 */
window.QUIZ_DATA_SANRIO = [
  { q: "헬로키티의 국적은 일본이다.",                                  a: false, img: "/assets/quiz/sanrio-img/", explanation: "헬로키티는 영국 런던 교외 출신이에요. 성은 'White', 본명은 키티 화이트입니다.", tags: ["설정"] },
  { q: "마이멜로디는 파란색 두건을 항상 쓰고 있다.",                  a: false, img: "/assets/quiz/sanrio-img/", explanation: "마이멜로디의 상징은 분홍색 두건이에요. 할머니가 직접 만들어 준 선물이라 늘 쓰고 다닙니다.", tags: ["캐릭터"] },
  { q: "쿠로미는 마이멜로디를 라이벌로 생각한다.",                    a: true,  img: "/assets/quiz/sanrio-img/", explanation: "쿠로미는 마이멜로디를 자칭 라이벌로 여기지만, 실제로는 티격태격하면서도 신경 쓰는 관계예요.", tags: ["캐릭터"] },
  { q: "폼폼푸린은 골든 리트리버 종의 강아지이다.",                    a: true,  img: "/assets/quiz/sanrio-img/", explanation: "부드러운 노란 털과 둥근 얼굴이 골든 리트리버 모티프예요. 1996년에 첫 등장한 인기 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "시나모롤은 강아지가 아니라 토끼이다.",                        a: false, img: "/assets/quiz/sanrio-img/", explanation: "긴 귀 때문에 토끼로 오해받기 쉽지만 시나모롤은 하얀 아기 강아지예요. 카페 위에 나타난 신비로운 설정도 있습니다.", tags: ["설정"] },
  { q: "리틀트윈스타는 키키와 라라라는 쌍둥이별 아이들이다.",        a: true,  img: "/assets/quiz/sanrio-img/", explanation: "오빠 키키와 동생 라라, 별의 나라에서 온 쌍둥이 캐릭터예요. 1975년에 데뷔한 산리오 클래식입니다.", tags: ["캐릭터"] },
  { q: "구데타마는 활기차고 부지런한 계란 캐릭터이다.",                a: false, img: "/assets/quiz/sanrio-img/", explanation: "구데타마는 정반대로 '무기력함'을 상징하는 캐릭터예요. '귀찮아…' 가 입버릇이고 늘 늘어져 있습니다.", tags: ["캐릭터"] },
  { q: "폼폼푸린이 가장 좋아하는 것은 빨간 나비넥타이이다.",            a: false, img: "/assets/quiz/sanrio-img/", explanation: "폼폼푸린의 트레이드마크는 갈색 베레모예요. 아빠한테 받은 선물이라 늘 쓰고 다닙니다.", tags: ["설정"] },
  { q: "배드바츠마루는 장난꾸러기 펭귄이다.",                          a: true,  img: "/assets/quiz/sanrio-img/", explanation: "1993년 등장한 5살 펭귄으로, 반항적이고 짓궂은 매력이 컨셉입니다.", tags: ["캐릭터"] },
  { q: "케로케로케로피는 도시 한복판 빌딩에 사는 개구리 캐릭터이다.",  a: false, img: "/assets/quiz/sanrio-img/", explanation: "케로피는 '도넛 연못'가에 사는 개구리예요. 자연 속 마을이 활동 무대입니다.", tags: ["캐릭터"] },
  { q: "헬로키티에게는 쌍둥이 오빠 미미가 있다.",                      a: false, img: "/assets/quiz/sanrio-img/", explanation: "미미는 헬로키티의 쌍둥이 '동생'이에요. 키티는 왼쪽, 미미는 오른쪽에 리본을 단 것으로 구분합니다.", tags: ["매니아"] },
  { q: "시나모롤의 이름은 꼬리가 시나몬 롤 빵을 닮아 붙여졌다.",        a: true,  img: "/assets/quiz/sanrio-img/", explanation: "돌돌 말린 꼬리가 시나몬 롤(계피빵)을 닮았다고 카페 주인이 이름 붙여줬다는 설정입니다.", tags: ["설정"] },
  { q: "쿠로미의 상징 컬러는 핑크와 화이트이다.",                      a: false, img: "/assets/quiz/sanrio-img/", explanation: "쿠로미의 컬러는 블랙과 보라예요. 검은 두건에 분홍 해골 무늬가 시그니처입니다.", tags: ["캐릭터"] },
  { q: "턱시도샘은 365개의 나비넥타이를 가진 멋쟁이 펭귄이다.",         a: true,  img: "/assets/quiz/sanrio-img/", explanation: "1년 365일 매일 다른 나비넥타이를 맬 수 있다는 설정의 멋쟁이 펭귄입니다.", tags: ["매니아"] },
  { q: "마이멜로디의 생일은 12월 25일이다.",                          a: false, img: "/assets/quiz/sanrio-img/", explanation: "마이멜로디의 생일은 1월 18일이에요. 크리스마스와는 무관한 한겨울 태생입니다.", tags: ["매니아"] },
  { q: "헬로키티는 고양이가 아닌 소녀 캐릭터라는 공식 설명이 있다.",   a: true,  img: "/assets/quiz/sanrio-img/", explanation: "2014년 산리오가 \"키티는 의인화된 소녀 캐릭터\"라고 공식 설명을 내놓으면서 화제가 된 일화입니다.", tags: ["설정"] },
  { q: "포차코는 고양이 캐릭터이다.",                                  a: false, img: "/assets/quiz/sanrio-img/", explanation: "포차코는 통통하고 호기심 많은 강아지예요. 산책을 좋아하는 활동적인 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "쿠로미의 생일은 할로윈 데이이다.",                            a: true,  img: "/assets/quiz/sanrio-img/", explanation: "10월 31일 할로윈에 태어났다는 설정으로, 어두운 톤의 캐릭터성과 잘 어울립니다.", tags: ["스토리"] },
  { q: "한교동은 사람을 웃기고 싶어 하는 반어인이다.",                  a: true,  img: "/assets/quiz/sanrio-img/", explanation: "사람과 인어 사이에서 태어난 반어인 캐릭터로, 외롭지만 누군가에게 웃음을 주고 싶어합니다.", tags: ["매니아"] },
  { q: "키리미짱은 새우를 모티프로 한 캐릭터이다.",                    a: false, img: "/assets/quiz/sanrio-img/", explanation: "키리미짱은 '연어 토막'을 의인화한 독특한 음식 캐릭터예요. 산리오의 실험적 디자인 중 하나입니다.", tags: ["매니아"] },
  { q: "시나모롤의 공식 팬 명칭은 '엔젤스'이다.",                      a: false, img: "/assets/quiz/sanrio-img/", explanation: "시나모롤 관련 공식 팬 제도는 '시나몬 엠버서더'예요. '엔젤스'는 다른 캐릭터 팬 명칭입니다.", tags: ["매니아"] },
  { q: "쿠로미는 자신의 팀인 '쿠로미 즈 5'를 이끈다.",                 a: true,  img: "/assets/quiz/sanrio-img/", explanation: "쿠로미는 의리파 보스 캐릭터로, 자신만의 5인조 부하 팀 '쿠로미 즈 5'를 이끕니다.", tags: ["스토리"] },
  { q: "리틀트윈스타는 산리오 본사 옥상의 별 정원에서 태어났다.",       a: false, img: "/assets/quiz/sanrio-img/", explanation: "리틀트윈스타는 먼 우주의 구름 위 '별나라'에서 태어났다는 환상적 설정을 가집니다.", tags: ["스토리"] },
  { q: "폼폼푸린의 배에는 갈색 점(배꼽)이 있다.",                      a: true,  img: "/assets/quiz/sanrio-img/", explanation: "폼폼푸린 디자인의 숨은 디테일로, 노란 배 위 작은 갈색 점이 그려져 있습니다.", tags: ["매니아"] },
  { q: "배드바츠마루는 평소에 멍한 표정을 짓는 게 취미다.",            a: false, img: "/assets/quiz/sanrio-img/", explanation: "배드바츠마루는 멍한 게 아니라 늘 도도하고 반항적인 표정이 트레이드마크예요.", tags: ["매니아"] },
  { q: "산리오는 'Sun + Rio'로 '태양과 강'에서 유래했다는 설이 있다.",  a: true,  img: "/assets/quiz/sanrio-img/", explanation: "회사명 산리오는 스페인어 'San(성스러운)' + 'Rio(강)' 또는 'Sun + Rio' 등 여러 유래설이 알려져 있습니다.", tags: ["설정"] },
  { q: "마이멜로디에게는 가족 캐릭터가 단 한 명도 없다.",              a: false, img: "/assets/quiz/sanrio-img/", explanation: "마이멜로디는 부모님, 남동생 리틀멜로 등 가족 캐릭터가 함께 나오는 따뜻한 일상이 컨셉입니다.", tags: ["스토리"] },
  { q: "디얼 다니엘은 헬로키티의 공식 남자친구이다.",                   a: true,  img: "/assets/quiz/sanrio-img/", explanation: "1999년 등장한 디얼 다니엘은 헬로키티의 공식 보이프렌드로 설정된 캐릭터입니다.", tags: ["캐릭터"] },
  { q: "포차코는 날렵하고 마른 체형이 특징이다.",                      a: false, img: "/assets/quiz/sanrio-img/", explanation: "포차코는 통통하고 동글동글한 체형이 매력 포인트예요. 이름 자체가 '통통한' 의태어에서 왔습니다.", tags: ["설정"] },
  { q: "쿠로미의 두건에 달린 해골 표정은 감정에 따라 변한다.",          a: true,  img: "/assets/quiz/sanrio-img/", explanation: "쿠로미의 시그니처 디테일로, 두건 위 분홍 해골이 그때그때 다른 표정으로 그려집니다.", tags: ["설정"] }
];
