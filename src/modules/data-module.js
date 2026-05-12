/**
 * data-module.js
 * 전역 퀴즈 데이터 및 평가 로직 관리 (ES Module 방식)
 */

export const CATEGORY_MAP = {
  sanrio: {
    title: '산리오 캐릭터 테스트',
    emoji: '🎀',
    grades: [
      { min: 90, label: 'S', title: '산리오 퓨로랜드 관장', desc: '산리오의 모든 것을 꿰뚫고 있는 마스터!', 
        introduction: '감히 묻겠다. 당신, 산리오 본사에 잠입한 직원 아닌가? 헬로키티의 본명이 키티 화이트라는 건 기본 옵션이고, 마이멜로디 생일이 1월 18일이라는 것까지 정확히 짚었군. 이쯤되면 산리오 측에서 명예사원증을 발급해줘야 할 수준이다. 더 이상 묻지 않겠어. 당신이 곧 산리오다.',
        characteristic: '굿즈만 봐도 제조 연도를 맞춤',
        quote: '당신은 이미 우리 가족이나 다름없어요! (헬로키티)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 70, label: 'A', title: '시나모롤의 단짝', desc: '캐릭터들의 숨겨진 이야기까지 아는 찐팬!', 
        introduction: '흠, 인정한다. 당신은 산리오 "진성" 영역에 발을 들였다. 단순 귀여움이 아니라 캐릭터마다의 스토리까지 사랑하는 자만이 이 자리에 올 수 있지. 시나모롤이 당신 어깨 위에서 잠들고 싶어 할 만한 덕력이다. 다만 한 칸 더 올라가려면 진짜 매니악한 트리비아까지 챙겨야 해. 거기서부턴 신의 영역이야.',
        characteristic: '최애 캐릭터 생일에 파티를 열어줌',
        quote: '저기... 나랑 친구가 되어줄래? (시나모롤)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 50, label: 'B', title: '멜로디 가드너', desc: '대중적인 캐릭터는 마스터하셨네요.', 
        introduction: '음. 대표 캐릭터들은 확실히 마스터했군. 마이멜로디와 쿠로미의 라이벌 구도, 폼폼푸린의 베레모 정도는 기본 상식이지. 다만 키리미짱이나 한교동까지 가면 헷갈리지 않나? 거기까진 한 발 부족하다. 다이소 산리오 코너에서 30분만 더 서성여 봐라. 이상하게 한 등급이 올라가 있을 거다.',
        characteristic: '문구점 산리오 코너에서 30분 서성임',
        quote: '언제나 긍정적으로 생각하면 즐거운 일이 생길 거야! (마이멜로디)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 30, label: 'C', title: '쿠로미 군단 후보', desc: '귀여운 디자인은 알지만 스토리는 부족해요.', 
        introduction: '솔직히 말해줄까. 당신은 "디자인이 귀여워서 좋아함" 단계다. 쿠로미의 시그니처 컬러가 검정/보라라는 것 정도는 알아야지, 핑크라 했나? 그건 마이멜로디다. 됐다, 쿠로미 다이어리 한 권 사서 일주일만 들고 다녀봐라. 두 등급 점프할 거다.',
        characteristic: '캐릭터 이름은 알지만 취미는 모름',
        quote: '흥, 내 일기장에 써놓을 거야! (쿠로미)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 0, label: 'D', title: '지나가던 행인', desc: '산리오 월드에 더 자주 놀러오세요!', 
        introduction: '...할 말을 잃었다. 당신, 헬로키티랑 미미가 같은 캐릭터인 줄 알고 있던 거 아닌가? 시나모롤이 강아지인 것도 몰랐다고? 됐다, 산리오는 당신에게 너무 깊은 세계다. 일단 폼폼푸린 푸딩 인형 하나 안고 자면서 천천히 입문하자. 한 번 빠지면 못 빠져나오는 마법의 세계니까. 환영한다.',
        characteristic: '키티랑 미미를 구분 못함',
        quote: '누구... 세요? 전 푸딩 먹느라 바빠요. (폼폼푸린)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  pokemon: {
    title: '포켓몬 능력 고사',
    emoji: '⚡',
    grades: [
      { min: 90, label: 'S', title: '포켓몬 마스터', desc: '모든 속성과 상성을 이해한 최고의 트레이너!', 
        introduction: '감히 묻겠다. 당신, 혹시 카렌인가? 타입 상성표는 머릿속에 통째로 들어있고, 잉어킹의 깨물어부수기 학습 레벨까지 알고 있군. 이건 트레이너 레벨을 넘어선 영역이다. 도감 1번부터 1025번까지 다 외운 적 있지? 솔직히. 더 이상 당신과 배틀하지 않겠어. 내가 진다.',
        characteristic: '타입 상성표를 머릿속에 통째로 넣고 다님',
        quote: '강한 포켓몬, 약한 포켓몬. 그런 건 사람이 정한 것. (카렌)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '챔피언급 트레이너', desc: '지방의 수호자다운 실력을 갖췄습니다.', 
        introduction: '흠. 당신, 지방 리그 우승은 따놓은 당상이다. 난천이나 목호와 대등하게 맞붙을 수 있는 통찰력을 가졌어. 다만 전설의 포켓몬 입수법과 환상의 포켓몬 이벤트 디테일에선 한 발 부족한 듯. 그래도 이 정도면 챔피언실 문턱까진 도달했다. 마지막 한 발만 더 디뎌봐.',
        characteristic: '울음소리만 듣고도 번호를 맞춤',
        quote: '그 눈빛... 너 챔피언 자리를 노리고 있나 보구나? (난천)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '스타팅 트레이너', desc: '리그에 진출할 자격이 충분한 실력자!', 
        introduction: '음, 체육관 관장 정도는 격파하고 다닐 수준이군. 피카츄의 정전기 특성, 이브이의 8가지 진화 분기까진 알고 있는 거 보니까. 다만 잠재력은 아직 응축된 상태다. 도감을 더 채우고 친구와 통신 진화도 시도해 봐. 그래야 다음 등급이 보인다.',
        characteristic: '자신의 MBTI와 어울리는 포켓몬을 앎',
        quote: '피카! 피카피카츄! (파이팅!) (피카츄)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '길가던 조무래기', desc: '도감 채우기부터 차근차근 시작해볼까요?', 
        introduction: '솔직히 말해줄까. 당신은 로켓단에 입단하기엔 너무 착하고, 트레이너가 되기엔 너무 어설프다. 잉어킹이 진화하면 갸라도스 된다는 것 정도는 알아야 하지 않을까? 일단 태초마을 박사 연구소부터 다시 가서 도감 받아오자. 모험은 그때부터 다시 시작이다.',
        characteristic: '잉어킹이 진화하면 용이 되는 걸 모름',
        quote: '우리는 로켓단! 세계의 파괴를 막기 위해... (로사/로이)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '반바지 꼬마', desc: '포켓몬 세계에 막 발을 들인 초보!', 
        introduction: '...아직 구구만 봐도 신기해하는 단계로군. 반바지가 편한 건 알겠는데, 모험 떠나려면 신발이라도 신어야지. 몬스터볼이 손에 익기 전엔 야생 포켓몬한테 손도 못 댄다. 일단 가장 가까운 포켓몬 센터 위치부터 외우고 와라. 그게 트레이너의 시작이다.',
        characteristic: '몬스터볼로 사람을 잡으려 함',
        quote: '이 반바지는 활동하기 편해서 좋아! (반바지 꼬마)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  aot: {
    title: '진격의 거인 퀴즈',
    emoji: '⚔️',
    grades: [
      { min: 90, label: 'S', title: '자유의 날개', desc: '벽 너머의 진리를 깨우친 인류의 희망!', 
        introduction: '감히 묻겠다. 당신, 혹시 시조의 거인이라도 계승받았나? 벽 안팎의 모든 떡밥과 회수를 꿰뚫고 있군. 이미르의 진실, 에렌의 시간 역행, 9개 거인 능력까지 - 모든 것이 명료하게 보이는 자만이 진정한 자유다. 더 이상 가르칠 것이 없다. 당신이 곧 이 이야기의 결말이다.',
        characteristic: '자신도 모르게 심장을 바치고 있음',
        quote: '이것은 내가 시작한 이야기다. (에렌 예거)', color: 'linear-gradient(135deg, #434343, #000000)' },
      { min: 70, label: 'A', title: '조사병단 지휘관', desc: '진정한 강함을 지닌 조사병단의 핵심 인물!', 
        introduction: '흠. 엘빈 스미스급 통찰력이군. 거인의 약점이 뒷덜미라는 건 1번 상식이고, 9개 거인의 능력까지 줄줄 외우는 수준. 다만 결말의 해석에 대해선 아직 살짝 흔들리는 부분이 있어. 한 번 더 정독하고 와봐. 자유는 그렇게 쉽게 얻어지는 게 아니다.',
        characteristic: '거인의 약점이 뒷덜미라는 걸 눈 감고도 앎',
        quote: '심장을 바쳐라! (엘빈 스미스)', color: 'linear-gradient(135deg, #667EEA, #764BA2)' },
      { min: 50, label: 'B', title: '훈련병단 에이스', desc: '드디어 벽 밖으로 나갈 준비가 되었군.', 
        introduction: '음. 입체기동 사용법은 익혔군. 에렌의 분노조절장애와 미카사의 헌신은 잘 이해했어. 다만 진짜 잔혹함은 시즌 3부터 시작이다. 거기까지 한 번 더 보고 와라. 살아남아 진실을 목도하는 게 진정한 병사의 자세니까.',
        characteristic: '에렌의 분노 조절 장애를 이해함',
        quote: '전부 구축해주겠어... 하나도 남김없이! (에렌)', color: 'linear-gradient(135deg, #2AF598, #08B3E5)' },
      { min: 30, label: 'C', title: '헌병단 지망생', desc: '벽 안의 안락함에 안주하고 계시군요.', 
        introduction: '솔직히 말해줄까. 당신, 벽 안에서 술이나 마시고 있고 싶지? 거인보다 상사가 더 무서운 그 마음 이해한다. 그래도 가끔은 하늘을 봐. 아르민이 말한 "바다"가 어떤 의미인지 알게 될 때까진 헌병단 자격 미달이다. 한 번 더 정주행하고 오자.',
        characteristic: '거인보다 상사가 더 무서움',
        quote: '거인은... 정말로 무서운 존재야. (아르민)', color: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)' },
      { min: 0, label: 'D', title: '무지성 거인', desc: '훈련병 과정을 다시 거쳐야 할 것 같네요.', 
        introduction: '...본능에만 충실한 무지성 상태군. 일단 거인이 사람 잡아먹는다는 건 알고 있나? 사샤처럼 고기만 찾기엔 너무 일렀다. 책을 펴서 100년의 벽 역사부터 배워봐라. 그 뒤에 입체기동을 만져도 늦지 않다.',
        characteristic: '벽이 왜 있는지 모름',
        quote: '아... 고기가 먹고 싶어... (사샤)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  kimetsu: {
    title: '귀멸의 칼날 퀴즈',
    emoji: '🔥',
    grades: [
      { min: 90, label: 'S', title: '해의 호흡 계승자', desc: '기둥급 덕력을 자랑하는 귀살대의 정점!', 
        introduction: '감히 묻겠다. 당신, 혹시 시노부도 렌고쿠도 아닌 츠기쿠니 요리이치의 환생인가? 호흡의 종류부터 각 기둥의 가족사, 무잔의 약점까지 - 공식 설정마저 당신 앞에선 숨죽인다. 이쯤되면 동인지 작가로 데뷔해도 산업이 흔들릴 수준이다. 인정한다, 당신이 곧 귀살대 정상이다.',
        characteristic: '자신만의 독창적인 호흡법을 창시함',
        quote: '가슴을 펴고 살아라. 마음의 불꽃을 태워라! (렌고쿠)', color: 'linear-gradient(135deg, #FF0844, #FFB199)' },
      { min: 70, label: 'A', title: '주(柱)급 검사', desc: '상현의 오니와도 맞설 수 있는 강력한 실력!', 
        introduction: '흠. 기둥 자리까진 따놨군. 탄지로의 매력은 물론, 곁의 캐릭터들 매력까지 다 포착했어. 팬픽 커뮤니티에서 환영받을 수준이다. 다만 무잔과의 최종 결전 디테일에서 한두 군데 미세하게 흔들리는 게 보인다. 한 번 더 정독, 그러면 정점.',
        characteristic: '전 집중 호흡을 하루 종일 유지 가능',
        quote: '화려하게 가보자고! (우즈이 텐겐)', color: 'linear-gradient(90deg, #F093FB, #F5576C)' },
      { min: 50, label: 'B', title: '귀살대 갑급', desc: '제법 능숙하게 오니를 사냥하는 숙련병.', 
        introduction: '음. 주인공과 메인 캐릭터들은 마스터했군. 다만 뒷배경 설정, 특히 도지 가문이나 시조 무잔의 정체까진 아직 흐릿하다. 충분히 좋은 팬이지만 다음 등급은 그 영역까지 들어가야 보인다. 원작 한 번 더 안 볼래?',
        characteristic: '네즈코의 대사를 100% 암기함 (음... 음!)',
        quote: '잃어도 잃어도 살아가는 수밖에 없어요. (탄지로)', color: 'linear-gradient(90deg, #5EE7DF, #B490CA)' },
      { min: 30, label: 'C', title: '유튜브 클립 덕후', desc: '명장면 위주로 감상한 귀살대 신입.', 
        introduction: '솔직히 말해줄까. 당신, 렌고쿠 죽는 장면이랑 무잔 전투 명장면은 다 봤지? 근데 그 사이 스토리는 좀 흐릿하지 않아? 유튜브 클립으로 입문한 거 티 난다. 그래도 괜찮다, 원작 정주행이 그렇게 어렵지 않으니 일단 1권부터 펴자.',
        characteristic: '젠이츠처럼 소리만 지르다 끝남',
        quote: '우와아아아앙! 죽고 싶지 않아! (젠이츠)', color: 'linear-gradient(90deg, #D4FC79, #96E6A1)' },
      { min: 0, label: 'D', title: '지나가던 일반인', desc: '오니의 존재조차 모르는 평화로운 시민.', 
        introduction: '...귀신이 칼 쓰고 호흡한다고? 그래, 처음 보면 그렇게 들릴 수 있지. 일단 탄지로가 누구인지, 네즈코가 왜 입에 대나무를 물고 있는지부터 알아두자. 모두가 처음엔 일반인이었다. 한 번 빠지면 당신도 새벽까지 정주행하게 될 테니까, 그때 다시 와라.',
        characteristic: '무잔이 마이클 잭슨인 줄 앎',
        quote: '저... 저게 뭔가요? (당신)', color: 'linear-gradient(90deg, #A1C4FD, #C2E9FB)' }
    ]
  },
  fma: {
    title: '강철의 연금술사 퀴즈',
    emoji: '⚗️',
    grades: [
      { min: 90, label: 'S', title: '진리를 본 자', desc: '등가교환을 넘어선 연금술의 달인.', 
        introduction: '감히 묻겠다. 당신, 혹시 진리의 문을 통과했나? 등가교환은 기본이고, 호엔하임의 노예번호 23호까지 짚는 수준이라니. 마지막 결전에서 에드가 바친 게 진리의 문이라는 것도 정확히 알고 있군. 신이든 진리든 무엇이라 불러도 좋다 - 당신이 곧 답이다.',
        characteristic: '손바닥만 마주쳐도 연성 가능',
        quote: '신이든 진리든 무엇이라 불러도 좋다. (진리)', color: 'linear-gradient(90deg, #FFCE00, #E9AE0B)' },
      { min: 70, label: 'A', title: '국가 연금술사', desc: '군의 정점급 실력을 갖춘 연금술사입니다.', 
        introduction: '흠. 군 정점급 연금술사다. 7대 죄악 호문클루스 이름까지 다 줄줄 외우고, 슬로스의 약점도 알고 있군. 다만 마르코 박사의 행적, 이슈발 섬멸전의 진짜 배후까지 들어가면 살짝 흔들린다. 그 영역만 채우면 정점이야.',
        characteristic: '키메라 연성만큼은 절대 하지 않음',
        quote: '일어서서 걸어라. 너에게는 튼튼한 다리가 있잖아. (에드워드)', color: 'linear-gradient(90deg, #F3F1ED, #A5A5A5)' },
      { min: 50, label: 'B', title: '영혼이 정착된 자', desc: '육체는 잃었어도 영혼의 지식은 충분하군요.', 
        introduction: '음. 인체연성이 금기인 건 알고 있군. 알폰스의 갑옷에 새겨진 혈인의 의미도 정확히 짚었어. 다만 호문클루스 개개의 핵 위치 같은 매니악한 부분에선 한 발 부족하다. 책만 보지 말고 작품 디테일을 곱씹어 봐라.',
        characteristic: '우유를 마시면 키가 클 거라 믿음',
        quote: '동생을 돌려줘, 내 하나뿐인 동생이라고! (에드워드)', color: 'linear-gradient(90deg, #D5D4D0, #EEEEEE)' },
      { min: 30, label: 'C', title: '연성 실패자', desc: '등가교환도 제대로 이해하지 못했군요.', 
        introduction: '솔직히 말해줄까. 당신, 등가교환을 "공짜로 얻는 법"이라고 잘못 알지 않았나? 그건 진리가 가장 싫어하는 답이다. 일단 1화부터 다시 봐라. 호엔하임이 형제 아빠라는 것까진 알고 있길 바란다.',
        characteristic: '연성진을 그릴 때 수전증이 있음',
        quote: '연금술사라면 책만 보지 말고 현장을 봐라! (이즈미)', color: 'linear-gradient(90deg, #89F7FE, #66A6FF)' },
      { min: 0, label: 'D', title: '키메라 재료', desc: '연금술에 손을 대기엔 아직 이릅니다.', 
        introduction: '...연금술에 손대기엔 너무 이르다. 에드워드 오른팔이 오토메일이라는 것 정도는 알아야지. 일단 동생을 갑옷에 묶고 시작하는 만화라는 거부터 다시 받아들이자. 한 번 빠지면 빠져나올 수 없는 작품이니까 충분한 마음의 준비 하고 와라.',
        characteristic: '금칠한 철을 금이라고 우김',
        quote: '에... 드... 워... 드... 오... 빠... (니나)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  fate: {
    title: '페이트 시리즈 테스트',
    emoji: '📜',
    grades: [
      { min: 90, label: 'S', title: '근원에 도달한 자', desc: '성배전쟁의 모든 서사와 설정을 꿰뚫었습니다.', 
        introduction: '감히 묻겠다. 당신, 혹시 마술협회 시계탑 출신인가? 5차 성배전쟁은 기본이고, Zero부터 Apocrypha까지 다 꿰뚫는 수준이라니. 영령들의 보구 명칭과 진명까지 줄줄 외울 거다. 이미 당신은 근원에 도달했다. 더 이상 가르칠 것이 없다.',
        characteristic: '령주 없이도 서번트를 복종시킴',
        quote: '묻겠다, 그대가 나의 마스터인가? (세이버)', color: 'linear-gradient(90deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '일류 마스터', desc: '영령을 소환하여 전장을 지배할 자격이 있습니다.', 
        introduction: '흠. 영령을 다루는 일류 마스터다. 세이버 페이스의 정체, 아처의 정체까지 정확히 알고 있군. 다만 fate 시리즈의 방대한 외전 - Strange Fake나 LB까지 들어가면 한 발 부족하다. 그 영역만 채우면 정점이야.',
        characteristic: '투영 개시를 외치며 숟가락을 연성함',
        quote: '이상만을 안고 익사해라! (아처)', color: 'linear-gradient(90deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '견습 마스터', desc: '마술 정석은 알지만 실전 경험이 부족하군요.', 
        introduction: '음. 메인 라인 페이트는 마스터했군. 토오사카 린의 마술 회로, 에미야의 투영 마술 정도는 이해하고 있어. 다만 외전 영령들의 출처는 아직 흐릿하다. UBW 한 번 더 보고 오면 다음 등급 보장.',
        characteristic: '황금률 스킬이 없어 지갑이 가벼움',
        quote: '내 이름은 토오사카 린. 기억해두라고. (린)', color: 'linear-gradient(90deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '마술사 지망생', desc: '기초 마술 회로조차 제대로 돌리지 못합니다.', 
        introduction: '솔직히 말해줄까. 당신, 마술 회로 돌리다 단선되는 타입이다. 세이버가 누구를 사랑했는지부터 다시 짚어보자. 시로의 답답함을 이해해야 페이트가 시작된다. 일단 페이트 스테이 나이트부터 정주행하고 와라.',
        characteristic: '사람은 죽으면 산다고 생각하는 순수한 마음',
        quote: '사람은 죽으면 죽는 법이야. (시로)', color: 'linear-gradient(90deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '성배전쟁 탈락자', desc: '가장 먼저 퇴장하게 될 비운의 인물.', 
        introduction: '...성배전쟁이 시작되기 전에 이미 탈락이다. 영주 3개 다 써버리고 영령은 부르지도 못한 채 끝나는 타입. 일단 영령이 뭔지부터 알자. 페이트는 입문 장벽이 높은 작품이니까 시간 들여서 천천히 들어와라.',
        characteristic: 'Fate를 Fat(뚱뚱한)으로 읽은 적이 있음',
        quote: '아... 버서커는 강하구나... (이리야)', color: 'linear-gradient(90deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  jjk: {
    title: '주술회전 능력 고사',
    emoji: '🔮',
    grades: [
      { min: 90, label: 'S', title: '특급 주술사', desc: '고죠 사토루와 어깨를 나란히 할 최강자.', 
        introduction: '감히 묻겠다. 당신, 혹시 고죠 사토루의 후계자인가? 영역전개의 메커니즘과 술식 반전, 무하공처의 원리까지 - 천재 주술사의 사고를 그대로 따라가는군. 료멘 스쿠나의 손가락 20개를 다 추적할 수 있는 정도다. 인정한다, 당신이 곧 특급이다.',
        characteristic: '흑섬을 의도적으로 5연속 발동 가능',
        quote: '무량공처. (고죠 사토루)', color: 'linear-gradient(135deg, #1A1A1A, #4A00E0)' },
      { min: 70, label: 'A', title: '1급 주술사', desc: '나나미처럼 냉철하고 강력한 실력자.', 
        introduction: '흠. 1급 자격 충분하다. 이타도리의 흑섬, 메구미의 십종영법까지 정확히 이해하고 있어. 다만 시부야 사변의 디테일이나 사신가 도진의 정체에서 한두 군데 미세하게 흔들린다. 그 영역만 잡으면 특급이다.',
        characteristic: '퇴근 시간을 위해 최단 시간 영역 전개',
        quote: '지금부터는 잔업 시간입니다. (나나미 켄토)', color: 'linear-gradient(135deg, #FFD700, #B8860B)' },
      { min: 50, label: 'B', title: '2급 주술사', desc: '주술고전의 믿음직한 선배급 실력.', 
        introduction: '음. 술사 자격은 갖췄다. 도쿄/교토 두 학교 구도 정도는 알고 있고, 주력의 기초도 이해해. 다만 술식 반전 같은 응용 영역에선 살짝 부족하다. 다시 한 번 정주행, 시부야편까진 꼭 다시 보고 와라.',
        characteristic: '판다 선배가 팬더가 아니라는 걸 앎',
        quote: '나는 불평등하게 사람을 구한다. (후시구로 메구미)', color: 'linear-gradient(135deg, #2E3192, #1BFFFF)' },
      { min: 30, label: 'C', title: '4급 주술사', desc: '이제 막 저주를 보기 시작한 뉴비.', 
        introduction: '솔직히 말해줄까. 당신은 주력 컨트롤도 제대로 안 되는 단계다. 고죠의 무하공처 의미를 정확히 모르지 않나? 안경 벗으면 진심이라는 것까진 안다고 치고, 그게 왜 그런지부터 다시 알아보자.',
        characteristic: '손가락을 먹으면 죽을 것 같아 못 먹음',
        quote: '나는... 불행해지고 싶지 않아. (쿠기사키 노바라)', color: 'linear-gradient(135deg, #3D3D3D, #7F8C8D)' },
      { min: 0, label: 'D', title: '창(窓)', desc: '주령을 볼 수만 있는 일반인 수준입니다.', 
        introduction: '...주술의 세계는 당신에게 너무 위험하다. 일단 료멘 스쿠나가 누구인지, 손가락이 왜 20개나 흩어졌는지부터 알자. 안 그러면 첫 임무에서 사망 확정이다. 1화부터 다시 보자, 늦지 않았다.',
        characteristic: '무량공처가 맛집 이름인 줄 앎',
        quote: '그치만... 무서운걸요... (이치지)', color: 'linear-gradient(135deg, #BDC3C7, #2C3E50)' }
    ]
  },
  dragonball: {
    title: '드래곤볼 능력 고사',
    emoji: '🐉',
    grades: [
      { min: 90, label: 'S', title: '우주 최강의 전사', desc: '파괴신도 긴장하게 만들 무의식의 극의!', 
        introduction: '감히 묻겠다. 당신, 혹시 손오공 그 자체인가? Z, GT, 슈퍼는 물론 오리지널까지 다 꿰뚫고, 부르마의 머리색 변천사까지 짚을 정도. 사이어인 변신 단계와 한계 돌파의 본질까지 이해한 수준이다. 더 이상 가르칠 것이 없다. 당신이 곧 드래곤볼이다.',
        characteristic: '화가 나면 머리가 노랗게 변함',
        quote: '나... 화났다!!! (손오공)', color: 'linear-gradient(135deg, #FFD700, #FF8C00)' },
      { min: 70, label: 'A', title: '초사이어인', desc: '행성 하나쯤은 가볍게 날려버릴 실력자!', 
        introduction: '흠. 우승급 실력이다. 셀, 마인부우, 비루스의 강함 척도까지 정확히 알고 있어. 다만 슈퍼 시리즈 후반의 신 영역, 마계 설정에서 살짝 흔들린다. 그것만 잡으면 정점이다.',
        characteristic: '스카우터 없이도 전투력을 측정함',
        quote: '내 이름은 베지터, 사이어인의 왕자다! (베지터)', color: 'linear-gradient(135deg, #FFD700, #FFA500)' },
      { min: 50, label: 'B', title: '지구의 영웅', desc: 'Z전사의 일원으로 활약하기에 충분합니다.', 
        introduction: '음. 지구 방위 인원으론 충분하다. 손오공의 거북파 기술명, 베지터의 갤릭포 정도는 외고 있군. 다만 사이어인 종족 설정이나 나메크성 부활 시스템에선 한 발 부족하다. 원작 한 번 더 정독해라.',
        characteristic: '전투력이 53만인 걸 앎',
        quote: '지구의 평화는 내가 지킨다! (크리링)', color: 'linear-gradient(135deg, #FF4500, #FFD700)' },
      { min: 30, label: 'C', title: '무천도사의 제자', desc: '아직은 에네르기파를 연습해야 할 단계.', 
        introduction: '솔직히 말해줄까. 당신은 사이어인 변신 단계 헷갈리지 않나? 슈퍼 사이어인 1, 2, 3, 신, 블루 차이를 정확히 모르면 그게 진성 팬이라 할 수 있겠나. 일단 셀편부터 다시 보자, 그게 황금기다.',
        characteristic: '코가 없어도 숨을 쉴 수 있다고 믿음',
        quote: '거북 선인류의 무술을 보여주마! (무천도사)', color: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)' },
      { min: 0, label: 'D', title: '야무치...', desc: '재배맨을 조심해야 할 것 같네요.', 
        introduction: '...아직 드래곤볼의 위대함을 모르는군. 손오공이 외계인이라는 것 정도는 알아야지. 일단 1화부터 보자. 한 화 보면 다음 화가 보고 싶어지는 마법의 만화니까, 곧 정주행하게 될 거다.',
        characteristic: '구슬 7개 모으면 용신이 나오는 줄 모름',
        quote: '야... 야무치가 당했다! (크리링)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  chainsawman: {
    title: '체인소맨 능력 고사',
    emoji: '🪚',
    grades: [
      { min: 90, label: 'S', title: '체인소의 심장', desc: '지옥의 영웅, 모든 악마가 두려워하는 존재!', 
        introduction: '감히 묻겠다. 당신, 혹시 마키마의 본명을 아는가? 체인소맨의 정체와 악마들의 계약 시스템, 컨트롤 악마의 본질까지 - 후지모토 작가의 사고 회로를 그대로 따라간 수준이다. 1부와 2부의 모든 떡밥을 회수하는 영역. 인정한다, 당신이 곧 체인소맨이다.',
        characteristic: '가슴에 스타터 줄이 달려 있음',
        quote: '평범한 생활을 하고 싶어... (덴지)', color: 'linear-gradient(135deg, #FF4B2B, #FF416C)' },
      { min: 70, label: 'A', title: '특이 4과 에이스', desc: '공안 최고의 데빌 헌터로 인정받았습니다.', 
        introduction: '흠. 1급 데빌헌터다. 덴지의 무모함, 파워의 광기, 아키의 슬픔까지 다 캐치했어. 다만 천사악마와 마키마의 진짜 의도에서 한두 군데 흔들린다. 그 영역만 채우면 정점이다.',
        characteristic: '여우 악마에게 콘(Kon)을 외침',
        quote: '개는 필요 없어. 내겐 평등한 관계뿐이야. (마키마)', color: 'linear-gradient(135deg, #232526, #414345)' },
      { min: 50, label: 'B', title: '포치타의 친구', desc: '악마와 계약하여 싸울 준비가 되었군요.', 
        introduction: '음. 헌터 자격은 갖췄다. 체인소맨의 외형 변신, 덴지의 가족 사정 정도는 이해하고 있어. 다만 후반부 떡밥은 좀 흐릿하다. 다시 정주행, 마키마의 시선을 의식하면서 봐라.',
        characteristic: '식빵에 잼 6종류를 발라 먹음',
        quote: '나의 심장을 줄게. 대신 네 꿈을 보여줘. (포치타)', color: 'linear-gradient(135deg, #FF7E5F, #FEB47B)' },
      { min: 30, label: 'C', title: '수습 데빌 헌터', desc: '악마의 공포에 질려 도망치지 마세요.', 
        introduction: '솔직히 말해줄까. 당신, 마키마를 그냥 미인인 줄로만 알지 않았나? 그 사람이 누군지 알게 되면 등골이 서늘해질 거다. 일단 6화까진 다시 보자, 거기서부터 진짜 시작이니까.',
        characteristic: '악마보다 사람이 더 무섭다고 느낌',
        quote: '나는... 죽는 게 무서워! (코베니)', color: 'linear-gradient(135deg, #606c88, #3f4c6b)' },
      { min: 0, label: 'D', title: '악마의 먹이', desc: '민간인으로서 조용히 사는 게 답입니다.', 
        introduction: '...아직 악마와 인간이 공존하는 세계관도 받아들이지 못했군. 덴지가 왜 체인소가 됐는지부터 알자. 후지모토 월드는 입문이 가파르지만, 일단 1화만 봐라. 그러면 끝까지 간다.',
        characteristic: '체인소가 전기톱인 줄 앎 (맞지만...)',
        quote: '살려주세요... (지나가던 행인)', color: 'linear-gradient(135deg, #bdc3c7, #2c3e50)' }
    ]
  },
  deathnote: {
    title: '데스노트 능력 고사',
    emoji: '📓',
    grades: [
      { min: 90, label: 'S', title: '신세계의 신', desc: '모든 계획을 완벽하게 실행한 천재 지략가!', 
        introduction: '감히 묻겠다. 당신, 혹시 야가미 라이토의 환생인가? 데스노트의 룰부터 사신의 본질, L과의 두뇌 대결의 모든 수까지 - 신이 되려 했던 자의 사고를 그대로 따라가는군. 룰북 27조까지 외울 수 있는 수준이다. 인정한다, 당신이 곧 키라다.',
        characteristic: '감자칩 봉지 속에서 TV를 봄',
        quote: '계획대로야. (야가미 라이토)', color: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
      { min: 70, label: 'A', title: 'L의 후계자', desc: '정의를 위해 끝까지 진실을 추적하는 자.', 
        introduction: '흠. L과 어깨를 나란히 할 수준이다. 노트의 사용 규칙과 사신 눈의 거래 대가, 메로와 니아의 분기까지 다 짚었어. 다만 결말 해석에 미세한 흔들림이 있군. 한 번 더 정독, 그러면 정점이다.',
        characteristic: '의자에 앉을 때 항상 쪼그려 앉음',
        quote: '틀리지 않았습니다. 제가 L입니다. (니아)', color: 'linear-gradient(135deg, #ECE9E6, #FFFFFF)' },
      { min: 50, label: 'B', title: '유능한 수사관', desc: '키라 수사 본부의 핵심 인재입니다.', 
        introduction: '음. 수사관 자격은 갖췄다. 라이토의 이중성, L의 기행, 미사미사의 절대적 충성까지 이해하고 있어. 다만 노트의 세부 룰에선 한 발 부족하다. 룰북 다시 펴라.',
        characteristic: '사탕과 초콜릿을 주식으로 삼음',
        quote: '나는 정의다! (L)', color: 'linear-gradient(135deg, #000000, #434343)' },
      { min: 30, label: 'C', title: '노트 주운 평범남', desc: '이름을 적기엔 아직 용기가 부족하군요.', 
        introduction: '솔직히 말해줄까. 당신은 라이토가 미사미사 진짜 좋아한 줄 알았지? 그건 키라의 첫 번째 함정이다. 일단 L 죽을 때까진 다시 보자. 그게 데스노트의 진짜 황금기다.',
        characteristic: '이름을 적으면 죽는다는 걸 안 믿음',
        quote: '인간은... 정말 흥미로워! (류크)', color: 'linear-gradient(135deg, #757f9a, #d7dde8)' },
      { min: 0, label: 'D', title: '미사미사 광팬', desc: '추리보다는 아이돌 덕질이 적성에 맞네요.', 
        introduction: '...데스노트가 단순히 사람 죽이는 노트인 줄 알았나? 그 안엔 인간 본성에 대한 질문이 있다. 일단 1화에서 라이토가 노트를 줍는 장면부터 다시 보자. 그게 모든 것의 시작이다.',
        characteristic: '사신의 눈 거래를 시력 교정술로 앎',
        quote: '라이토를 위해서라면 뭐든지 할게! (미사)', color: 'linear-gradient(135deg, #bdc3c7, #2c3e50)' }
    ]
  }
};

export function evaluateGrade(category, scorePct) {
  const cat = CATEGORY_MAP[category] || CATEGORY_MAP['pokemon'];
  return cat.grades.find(g => scorePct >= g.min);
}

export function evaluateQuizResult(category, mode, score, wrongIndices = []) {
  const EVAL_STANDARD = 30;
  const scorePct = Math.round((score / EVAL_STANDARD) * 100);
  const rawGradeInfo = evaluateGrade(category, scorePct);
  
  // 4분면 레이더 데이터 계산
  const varMap = {
    fma: 'QUIZ_DATA_FMA', aot: 'QUIZ_DATA_AOT', kimetsu: 'QUIZ_DATA_KIMETSU',
    pokemon: 'QUIZ_DATA_POKEMON', sanrio: 'QUIZ_DATA_SANRIO', jjk: 'QUIZ_DATA_JJK',
    dragonball: 'QUIZ_DATA_DRAGONBALL', chainsawman: 'QUIZ_DATA_CHAINSAWMAN',
    deathnote: 'QUIZ_DATA_DEATHNOTE', fate: 'QUIZ_DATA_FATE'
  };
  const data = window[varMap[category]];
  
  let radarData = [
    { subject: '스토리', A: 0, fullMark: 100 },
    { subject: '캐릭터', A: 0, fullMark: 100 },
    { subject: '설정', A: 0, fullMark: 100 },
    { subject: '매니아', A: 0, fullMark: 100 }
  ];

  if (data && Array.isArray(data)) {
    const stats = {
      '스토리': { total: 0, correct: 0 },
      '캐릭터': { total: 0, correct: 0 },
      '설정': { total: 0, correct: 0 },
      '매니아': { total: 0, correct: 0 }
    };

    data.forEach((q, idx) => {
      const tag = (q.tags && q.tags[0]) || '기타';
      if (stats[tag]) {
        stats[tag].total += 1;
        if (!wrongIndices.includes(idx)) {
          stats[tag].correct += 1;
        }
      }
    });

    radarData = radarData.map(item => {
      const s = stats[item.subject];
      const val = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
      return { ...item, A: val };
    });
  }

  return { 
    gradeInfo: { ...rawGradeInfo }, 
    scorePct, 
    displayMax: 30, 
    wrongIndices,
    radarData 
  };
}

export function getCategoryTitle(category) {
  return CATEGORY_MAP[category]?.title || '캐릭터 퀴즈';
}

export function calculatePercentile(scorePct) {
  if (scorePct >= 90) return Math.max(1, 5 - (scorePct - 90) / 10 * 4);
  if (scorePct >= 70) return 15 - (scorePct - 70) / 20 * 9;
  if (scorePct >= 50) return 40 - (scorePct - 50) / 20 * 24;
  if (scorePct >= 30) return 70 - (scorePct - 30) / 20 * 29;
  return 99 - (scorePct / 30 * 28);
}

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/**
 * 특정 카테고리의 퀴즈 데이터를 로컬 /data/[category].js 에서 로드
 */
export function loadQuizData(category) {
  const varMap = {
    fma: 'QUIZ_DATA_FMA',
    aot: 'QUIZ_DATA_AOT',
    kimetsu: 'QUIZ_DATA_KIMETSU',
    pokemon: 'QUIZ_DATA_POKEMON',
    sanrio: 'QUIZ_DATA_SANRIO',
    jjk: 'QUIZ_DATA_JJK',
    dragonball: 'QUIZ_DATA_DRAGONBALL',
    chainsawman: 'QUIZ_DATA_CHAINSAWMAN',
    deathnote: 'QUIZ_DATA_DEATHNOTE',
    fate: 'QUIZ_DATA_FATE'
  };
  const varName = varMap[category] || 'QUIZ_DATA_POKEMON';

  if (window[varName]) return Promise.resolve(window[varName]);

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `/data/${category}.js`;
    script.onload = () => resolve(window[varName]);
    script.onerror = () => reject(new Error('Failed to load quiz data'));
    document.body.appendChild(script);
  });
}
