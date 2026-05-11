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
        introduction: '혹시 성함이 헬로키티인가요? 당신은 캐릭터들의 생일, 혈액형, 좋아하는 음식까지 모두 꿰뚫고 있는 진정한 전문가입니다. 퓨로랜드의 명예 시민으로 임명합니다!',
        characteristic: '굿즈만 봐도 제조 연도를 맞춤',
        quote: '당신은 이미 우리 가족이나 다름없어요! (헬로키티)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 70, label: 'A', title: '시나모롤의 단짝', desc: '캐릭터들의 숨겨진 이야기까지 아는 찐팬!', 
        introduction: '캐릭터들의 단순한 귀여움을 넘어, 그들의 고유한 서사까지 사랑하는 당신! 시나모롤이 당신과 함께 구름 위를 날고 싶어 할 것 같네요.',
        characteristic: '최애 캐릭터 생일에 파티를 열어줌',
        quote: '저기... 나랑 친구가 되어줄래? (시나모롤)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 50, label: 'B', title: '멜로디 가드너', desc: '대중적인 캐릭터는 마스터하셨네요.', 
        introduction: '마이멜로디와 쿠로미의 라이벌 관계를 정확히 이해하고 계시군요! 산리오의 매력에 푹 빠진 상태입니다. 조금만 더 공부하면 전문가가 될 수 있어요.',
        characteristic: '문구점 산리오 코너에서 30분 서성임',
        quote: '언제나 긍정적으로 생각하면 즐거운 일이 생길 거야! (마이멜로디)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 30, label: 'C', title: '쿠로미 군단 후보', desc: '귀여운 디자인은 알지만 스토리는 부족해요.', 
        introduction: '디자인이 예뻐서 좋아하는 단계군요! 쿠로미처럼 츤데레 매력에 끌리고 계신가요? 캐릭터들의 일기를 들여다보면 더 깊은 매력을 느낄 수 있답니다.',
        characteristic: '캐릭터 이름은 알지만 취미는 모름',
        quote: '흥, 내 일기장에 써놓을 거야! (쿠로미)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 0, label: 'D', title: '지나가던 행인', desc: '산리오 월드에 더 자주 놀러오세요!', 
        introduction: '아직은 핑크색 친구들이 낯설게 느껴지시나요? 걱정 마세요. 한 번 빠지면 헤어 나올 수 없는 게 산리오의 매력이니까요. 푸딩 한 입 어떠세요?',
        characteristic: '키티랑 미미를 구분 못함',
        quote: '누구... 세요? 전 푸딩 먹느라 바빠요. (폼폼푸린)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  pokemon: {
    title: '포켓몬 능력 고사',
    emoji: '⚡',
    grades: [
      { min: 90, label: 'S', title: '포켓몬 마스터', desc: '모든 속성과 상성을 이해한 최고의 트레이너!', 
        introduction: '축하합니다! 당신은 전설의 포켓몬들조차 경외심을 가질 법한 지식을 갖췄습니다. 실전 배틀부터 도감 완성까지, 당신은 이미 정점입니다.',
        characteristic: '타입 상성표를 머릿속에 통째로 넣고 다님',
        quote: '강한 포켓몬, 약한 포켓몬. 그런 건 사람이 정한 것. (카렌)', color: 'linear-gradient(135deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '챔피언급 트레이너', desc: '지방의 수호자다운 실력을 갖췄습니다.', 
        introduction: '지방 리그 우승은 따 놓은 당상이군요! 난천이나 목호와 대등하게 겨룰 수 있는 통찰력을 가졌습니다. 당신의 포켓몬들이 자랑스러워할 거예요.',
        characteristic: '울음소리만 듣고도 번호를 맞춤',
        quote: '그 눈빛... 너 챔피언 자리를 노리고 있나 보구나? (난천)', color: 'linear-gradient(135deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '스타팅 트레이너', desc: '리그에 진출할 자격이 충분한 실력자!', 
        introduction: '체육관 관장들을 차례로 격파하며 성장 중이시군요. 배지 8개를 모으는 건 시간문제입니다. 피카츄와의 우정도 아주 돈독해 보이네요!',
        characteristic: '자신의 MBTI와 어울리는 포켓몬을 앎',
        quote: '피카! 피카피카츄! (파이팅!) (피카츄)', color: 'linear-gradient(135deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '길가던 조무래기', desc: '도감 채우기부터 차근차근 시작해볼까요?', 
        introduction: '로켓단에 입단하기에는 너무 착하고, 트레이너가 되기엔 아직 아는 게 부족하군요. 태초마을 박사님께 가서 도감을 받아오는 것부터 시작하죠!',
        characteristic: '잉어킹이 진화하면 용이 되는 걸 모름',
        quote: '우리는 로켓단! 세계의 파괴를 막기 위해... (로사/로이)', color: 'linear-gradient(135deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '반바지 꼬마', desc: '포켓몬 세계에 막 발을 들인 초보!', 
        introduction: '아직은 구구나 꼬렛만 봐도 신기한 단계입니다. 반바지가 편하긴 하지만, 모험을 떠나려면 든든한 신발과 상처약이 필요할 거예요.',
        characteristic: '몬스터볼로 사람을 잡으려 함',
        quote: '이 반바지는 활동하기 편해서 좋아! (반바지 꼬마)', color: 'linear-gradient(135deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  aot: {
    title: '진격의 거인 퀴즈',
    emoji: '⚔️',
    grades: [
      { min: 90, label: 'S', title: '자유의 날개', desc: '벽 너머의 진리를 깨우친 인류의 희망!', 
        introduction: '축하합니다! 당신은 벽 안팎의 모든 서사를 꿰뚫고 근원에 도달했습니다. 이제 자유를 위해 나아갈 준비가 되셨나요? 땅울림을 막을 수 있는 유일한 존재입니다.',
        characteristic: '자신도 모르게 심장을 바치고 있음',
        quote: '이것은 내가 시작한 이야기다. (에렌 예거)', color: 'linear-gradient(135deg, #434343, #000000)' },
      { min: 70, label: 'A', title: '조사병단 지휘관', desc: '진정한 강함을 지닌 조사병단의 핵심 인물!', 
        introduction: '냉철한 판단력과 뛰어난 통찰력으로 병단을 승리로 이끕니다. 리바이 병장도 당신의 실력을 인정할 수밖에 없겠군요. 인류의 반격은 이제부터입니다.',
        characteristic: '거인의 약점이 뒷덜미라는 걸 눈 감고도 앎',
        quote: '심장을 바쳐라! (엘빈 스미스)', color: 'linear-gradient(135deg, #667EEA, #764BA2)' },
      { min: 50, label: 'B', title: '훈련병단 에이스', desc: '드디어 벽 밖으로 나갈 준비가 되었군.', 
        introduction: '입체기동 장치 사용법은 익히셨군요! 하지만 전장의 잔혹함은 이제 시작입니다. 동료들을 지키며 끝까지 살아남아 진실을 목도하세요.',
        characteristic: '에렌의 분노 조절 장애를 이해함',
        quote: '전부 구축해주겠어... 하나도 남김없이! (에렌)', color: 'linear-gradient(135deg, #2AF598, #08B3E5)' },
      { min: 30, label: 'C', title: '헌병단 지망생', desc: '벽 안의 안락함에 안주하고 계시군요.', 
        introduction: '벽 너머의 세계가 무섭나요? 안락한 생활도 좋지만, 가끔은 하늘을 올려다보세요. 아르민이 말하던 바다가 당신을 기다리고 있을지도 모릅니다.',
        characteristic: '거인보다 상사가 더 무서움',
        quote: '거인은... 정말로 무서운 존재야. (아르민)', color: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)' },
      { min: 0, label: 'D', title: '무지성 거인', desc: '훈련병 과정을 다시 거쳐야 할 것 같네요.', 
        introduction: '아직은 아무 생각 없이 벽 주위를 배회하고 있군요. 본능에만 충실하지 말고, 책을 펴서 인류의 역사를 배워보세요. 사샤처럼 고기만 찾을 때는 아닙니다.',
        characteristic: '벽이 왜 있는지 모름',
        quote: '아... 고기가 먹고 싶어... (사샤)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  kimetsu: {
    title: '귀멸의 칼날 퀴즈',
    emoji: '🔥',
    grades: [
      { min: 90, label: 'S', title: '해의 호흡 계승자', desc: '기둥급 덕력을 자랑하는 귀살대의 정점!', 
        introduction: '당신은 이미 귀멸의 세계에서 기둥(柱) 수준의 덕력을 자랑합니다. 호흡의 종류부터 각 기둥의 가슴 아픈 사연까지... 당신 앞에선 공식 설정도 숨을 죽입니다.',
        characteristic: '자신만의 독창적인 호흡법을 창시함',
        quote: '가슴을 펴고 살아라. 마음의 불꽃을 태워라! (렌고쿠)', color: 'linear-gradient(135deg, #FF0844, #FFB199)' },
      { min: 70, label: 'A', title: '주(柱)급 검사', desc: '상현의 오니와도 맞설 수 있는 강력한 실력!', 
        introduction: '귀멸을 충분히 깊이 있게 즐기고 계시는군요! 주인공 탄지로뿐만 아니라 조연들의 매력까지 완벽히 포착했습니다. 당신의 열정은 화려하게 빛나고 있습니다.',
        characteristic: '전 집중 호흡을 하루 종일 유지 가능',
        quote: '화려하게 가보자고! (우즈이 텐겐)', color: 'linear-gradient(90deg, #F093FB, #F5576C)' },
      { min: 50, label: 'B', title: '귀살대 갑급', desc: '제법 능숙하게 오니를 사냥하는 숙련병.', 
        introduction: '탄지로와 친구들의 여정을 열심히 따라가고 있군요! 메인 스토리는 꿰뚫고 있지만, 아직 비사나 세부 설정은 조금 더 보강이 필요해 보입니다.',
        characteristic: '네즈코의 대사를 100% 암기함 (음... 음!)',
        quote: '잃어도 잃어도 살아가는 수밖에 없어요. (탄지로)', color: 'linear-gradient(90deg, #5EE7DF, #B490CA)' },
      { min: 30, label: 'C', title: '유튜브 클립 덕후', desc: '명장면 위주로 감상한 귀살대 신입.', 
        introduction: '렌고쿠의 용맹함에 눈물 흘렸지만, 원작의 깊은 내용까지는 아직 낯설군요. 유튜브 클립도 좋지만, 전편 정주행을 통해 탄지로의 마음을 느껴보세요!',
        characteristic: '젠이츠처럼 소리만 지르다 끝남',
        quote: '우와아아아앙! 죽고 싶지 않아! (젠이츠)', color: 'linear-gradient(90deg, #D4FC79, #96E6A1)' },
      { min: 0, label: 'D', title: '지나가던 일반인', desc: '오니의 존재조차 모르는 평화로운 시민.', 
        introduction: '귀신이 나오고... 칼을 휘두른다고요? 당신에게 귀멸은 아직 미스테리입니다. 걱정 마세요, 선별 시험은 언제나 당신을 기다리고 있으니까요.',
        characteristic: '무잔이 마이클 잭슨인 줄 앎',
        quote: '저... 저게 뭔가요? (당신)', color: 'linear-gradient(90deg, #A1C4FD, #C2E9FB)' }
    ]
  },
  fma: {
    title: '강철의 연금술사 퀴즈',
    emoji: '⚗️',
    grades: [
      { min: 90, label: 'S', title: '진리를 본 자', desc: '등가교환을 넘어선 연금술의 달인.', 
        introduction: '축하합니다! 당신은 문을 열고 진리를 보았습니다. 등가교환의 법칙을 완벽히 이해하고, 연성진 없이도 세상을 바꿀 수 있는 지식을 갖췄군요.',
        characteristic: '손바닥만 마주쳐도 연성 가능',
        quote: '신이든 진리든 무엇이라 불러도 좋다. (진리)', color: 'linear-gradient(90deg, #FFCE00, #E9AE0B)' },
      { min: 70, label: 'A', title: '국가 연금술사', desc: '군의 정점급 실력을 갖춘 연금술사입니다.', 
        introduction: '엘릭 형제의 여정을 그림자처럼 따라왔군요. 호문쿨루스들의 정체와 아버님(플라스크 속의 소인)의 계획을 모두 간파한 1등 수사관입니다.',
        characteristic: '키메라 연성만큼은 절대 하지 않음',
        quote: '일어서서 걸어라. 너에게는 튼튼한 다리가 있잖아. (에드워드)', color: 'linear-gradient(90deg, #F3F1ED, #A5A5A5)' },
      { min: 50, label: 'B', title: '영혼이 정착된 자', desc: '육체는 잃었어도 영혼의 지식은 충분하군요.', 
        introduction: '알폰스처럼 든든한 지식을 갖췄습니다. 하지만 아직 진리의 문 앞에 도달하기엔 2% 부족하군요. 머스탱 대령의 불꽃보다 뜨거운 열정으로 공부하세요!',
        characteristic: '우유를 마시면 키가 클 거라 믿음',
        quote: '동생을 돌려줘, 내 하나뿐인 동생이라고! (에드워드)', color: 'linear-gradient(90deg, #D5D4D0, #EEEEEE)' },
      { min: 30, label: 'C', title: '연성 실패자', desc: '등가교환도 제대로 이해하지 못했군요.', 
        introduction: '연금을 하려다 연기만 피우고 계시군요. 연금술은 과학입니다! 기초부터 차근차근 다시 배우지 않으면 소중한 것을 잃을 수도 있습니다.',
        characteristic: '연성진을 그릴 때 수전증이 있음',
        quote: '연금술사라면 책만 보지 말고 현장을 봐라! (이즈미)', color: 'linear-gradient(90deg, #89F7FE, #66A6FF)' },
      { min: 0, label: 'D', title: '키메라 재료', desc: '연금술에 손을 대기엔 아직 이릅니다.', 
        introduction: '당신은 쇼 터커의 실험실에 잘못 들어온 것 같습니다. 위험하니까 얼른 도망치세요! 니나가 부르기 전에요... 에... 드... 워... 드...',
        characteristic: '금칠한 철을 금이라고 우김',
        quote: '에... 드... 워... 드... 오... 빠... (니나)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  fate: {
    title: '페이트 시리즈 테스트',
    emoji: '📜',
    grades: [
      { min: 90, label: 'S', title: '근원에 도달한 자', desc: '성배전쟁의 모든 서사와 설정을 꿰뚫었습니다.', 
        introduction: '축하합니다! 당신은 마술사의 정점인 근원에 도달했습니다. 모든 서번트의 보구와 가계도는 물론, 복잡한 타입문 세계관의 지배자이십니다.',
        characteristic: '령주 없이도 서번트를 복종시킴',
        quote: '묻겠다, 그대가 나의 마스터인가? (세이버)', color: 'linear-gradient(90deg, #F6D365, #FDA085)' },
      { min: 70, label: 'A', title: '일류 마스터', desc: '영령을 소환하여 전장을 지배할 자격이 있습니다.', 
        introduction: '토오사카 린과 같은 재능을 가지셨군요! 5차 성배전쟁의 흐름을 완벽히 파악하고 있으며, 아처의 정체에 대해 누구보다 잘 알고 있습니다.',
        characteristic: '투영 개시를 외치며 숟가락을 연성함',
        quote: '이상만을 안고 익사해라! (아처)', color: 'linear-gradient(90deg, #FF9A9E, #FECFEF)' },
      { min: 50, label: 'B', title: '견습 마스터', desc: '마술 정석은 알지만 실전 경험이 부족하군요.', 
        introduction: '에미야 시로의 성장기 단계입니다. 아직은 정의의 사자를 꿈꾸며 기초 마술을 연마 중이군요. 성배가 당신의 소원을 들어줄 수 있도록 더 정진하세요.',
        characteristic: '황금률 스킬이 없어 지갑이 가벼움',
        quote: '내 이름은 토오사카 린. 기억해두라고. (린)', color: 'linear-gradient(90deg, #A18CD1, #FBC2EB)' },
      { min: 30, label: 'C', title: '마술사 지망생', desc: '기초 마술 회로조차 제대로 돌리지 못합니다.', 
        introduction: '세이버는 알지만, 왜 루트가 여러 개인지 아직 헷갈리시나요? 성배전쟁은 한 번의 도전으로 끝나는 게 아니랍니다. 시로처럼 여러 번 죽어(?)가며 진실에 도달해 보세요.',
        characteristic: '사람은 죽으면 산다고 생각하는 순수한 마음',
        quote: '사람은 죽으면 죽는 법이야. (시로)', color: 'linear-gradient(90deg, #84FAB0, #8FD3F4)' },
      { min: 0, label: 'D', title: '성배전쟁 탈락자', desc: '가장 먼저 퇴장하게 될 비운의 인물.', 
        introduction: '마법소녀물인 줄 알고 들어오셨나요? 페이트의 세계는 생각보다 훨씬 잔혹하고 심오하답니다. 하지만 걱정 마세요. 칼레이도 루비가 당신을 기다리고 있을지도 모릅니다.',
        characteristic: 'Fate를 Fat(뚱뚱한)으로 읽은 적이 있음',
        quote: '아... 버서커는 강하구나... (이리야)', color: 'linear-gradient(90deg, #CFD9DF, #E2E2E2)' }
    ]
  },
  jjk: {
    title: '주술회전 능력 고사',
    emoji: '🔮',
    grades: [
      { min: 90, label: 'S', title: '특급 주술사', desc: '고죠 사토루와 어깨를 나란히 할 최강자.', 
        introduction: '당신은 이미 영역 전개의 극의를 깨우쳤습니다. 반전 술식은 물론, 주력의 흐름을 0.000001초 단위로 제어하는 진정한 특급 주술사군요.',
        characteristic: '흑섬을 의도적으로 5연속 발동 가능',
        quote: '무량공처. (고죠 사토루)', color: 'linear-gradient(135deg, #1A1A1A, #4A00E0)' },
      { min: 70, label: 'A', title: '1급 주술사', desc: '나나미처럼 냉철하고 강력한 실력자.', 
        introduction: '실무 경험이 풍부한 일급 주술사군요! 저주들의 특성을 완벽히 파악하고 효율적으로 제압합니다. 7:3 지점을 정확히 타격하는 통찰력이 돋보입니다.',
        characteristic: '퇴근 시간을 위해 최단 시간 영역 전개',
        quote: '지금부터는 잔업 시간입니다. (나나미 켄토)', color: 'linear-gradient(135deg, #FFD700, #B8860B)' },
      { min: 50, label: 'B', title: '2급 주술사', desc: '주술고전의 믿음직한 선배급 실력.', 
        introduction: '준비된 주술사군요! 이타도리와 친구들의 서사를 깊이 있게 이해하고 있습니다. 하지만 아직 특급 주령과의 정면 대결은 조금 위험할지도?',
        characteristic: '판다 선배가 팬더가 아니라는 걸 앎',
        quote: '나는 불평등하게 사람을 구한다. (후시구로 메구미)', color: 'linear-gradient(135deg, #2E3192, #1BFFFF)' },
      { min: 30, label: 'C', title: '4급 주술사', desc: '이제 막 저주를 보기 시작한 뉴비.', 
        introduction: '주술사의 세계에 발을 들였군요! 명장면들은 잘 알고 있지만, 복잡한 술식의 원리나 가문의 비사까지는 아직 공부 중이신 것 같습니다.',
        characteristic: '손가락을 먹으면 죽을 것 같아 못 먹음',
        quote: '나는... 불행해지고 싶지 않아. (쿠기사키 노바라)', color: 'linear-gradient(135deg, #3D3D3D, #7F8C8D)' },
      { min: 0, label: 'D', title: '창(窓)', desc: '주령을 볼 수만 있는 일반인 수준입니다.', 
        introduction: '저주를 볼 수는 있지만, 싸우기에는 너무 겁이 많군요. 이치지 씨처럼 운전이라도 배우는 건 어떠세요? 보조 감독관으로서의 길도 있답니다.',
        characteristic: '무량공처가 맛집 이름인 줄 앎',
        quote: '그치만... 무서운걸요... (이치지)', color: 'linear-gradient(135deg, #BDC3C7, #2C3E50)' }
    ]
  },
  dragonball: {
    title: '드래곤볼 능력 고사',
    emoji: '🐉',
    grades: [
      { min: 90, label: 'S', title: '우주 최강의 전사', desc: '파괴신도 긴장하게 만들 무의식의 극의!', 
        introduction: '축하합니다! 당신은 우주의 정점에 도달했습니다. 모든 사이어인의 변신 단계와 전투력을 꿰뚫고 계시군요. 이제 지렌과의 대결만 남았습니다.',
        characteristic: '화가 나면 머리가 노랗게 변함',
        quote: '나... 화났다!!! (손오공)', color: 'linear-gradient(135deg, #FFD700, #FF8C00)' },
      { min: 70, label: 'A', title: '초사이어인', desc: '행성 하나쯤은 가볍게 날려버릴 실력자!', 
        introduction: '베지터가 당신을 라이벌로 인정할 것 같습니다! 전설의 전사로서 손색없는 지식을 갖췄군요. 중력 100배 수련도 거뜬히 견뎌낼 분입니다.',
        characteristic: '스카우터 없이도 전투력을 측정함',
        quote: '내 이름은 베지터, 사이어인의 왕자다! (베지터)', color: 'linear-gradient(135deg, #FFD700, #FFA500)' },
      { min: 50, label: 'B', title: '지구의 영웅', desc: 'Z전사의 일원으로 활약하기에 충분합니다.', 
        introduction: '크리링이나 야무치보다는 확실히 강하군요! 셀 게임이나 마인 부우와의 결전에서도 충분히 1인분을 해낼 실력자입니다. 기를 모으는 연습을 더 해보세요!',
        characteristic: '전투력이 53만인 걸 앎',
        quote: '지구의 평화는 내가 지킨다! (크리링)', color: 'linear-gradient(135deg, #FF4500, #FFD700)' },
      { min: 30, label: 'C', title: '무천도사의 제자', desc: '아직은 에네르기파를 연습해야 할 단계.', 
        introduction: '거북 선인류의 제자가 되셨군요! 하지만 아직 무술 대회의 예선조차 통과하기 힘들 것 같습니다. 우유 배달부터 시작해서 기초 체력을 기르세요!',
        characteristic: '코가 없어도 숨을 쉴 수 있다고 믿음',
        quote: '거북 선인류의 무술을 보여주마! (무천도사)', color: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)' },
      { min: 0, label: 'D', title: '야무치...', desc: '재배맨을 조심해야 할 것 같네요.', 
        introduction: '아직은 늑대풍풍권조차 제대로 구사하지 못하는군요. 재배맨이 자폭하려고 하면 얼른 도망가세요! 안 그러면 전설의 포즈로 눕게 될지도 모릅니다.',
        characteristic: '구슬 7개 모으면 용신이 나오는 줄 모름',
        quote: '야... 야무치가 당했다! (크리링)', color: 'linear-gradient(135deg, #E2E2E2, #D5D5D5)' }
    ]
  },
  chainsawman: {
    title: '체인소맨 능력 고사',
    emoji: '🪚',
    grades: [
      { min: 90, label: 'S', title: '체인소의 심장', desc: '지옥의 영웅, 모든 악마가 두려워하는 존재!', 
        introduction: '당신은 이미 체인소의 심장을 가졌습니다. 지옥의 히어로로서 모든 악마의 이름을 지워버릴 수 있는 공포의 대상이군요. 덴지처럼 평범한 삶을 꿈꾸시나요?',
        characteristic: '가슴에 스타터 줄이 달려 있음',
        quote: '평범한 생활을 하고 싶어... (덴지)', color: 'linear-gradient(135deg, #FF4B2B, #FF416C)' },
      { min: 70, label: 'A', title: '특이 4과 에이스', desc: '공안 최고의 데빌 헌터로 인정받았습니다.', 
        introduction: '마키마 씨의 충실한 개... 가 아니라 파트너가 될 자격이 충분합니다! 악마와 계약하지 않고도 그들의 약점을 파악하는 통찰력이 대단합니다.',
        characteristic: '여우 악마에게 콘(Kon)을 외침',
        quote: '개는 필요 없어. 내겐 평등한 관계뿐이야. (마키마)', color: 'linear-gradient(135deg, #232526, #414345)' },
      { min: 50, label: 'B', title: '포치타의 친구', desc: '악마와 계약하여 싸울 준비가 되었군요.', 
        introduction: '파워나 아키와 팀을 이뤄 활동할 수 있는 수준입니다. 하지만 아직 어둠의 악마를 마주하기엔 정신력이 부족할지도 모릅니다. 포치타를 꽉 껴안으세요!',
        characteristic: '식빵에 잼 6종류를 발라 먹음',
        quote: '나의 심장을 줄게. 대신 네 꿈을 보여줘. (포치타)', color: 'linear-gradient(135deg, #FF7E5F, #FEB47B)' },
      { min: 30, label: 'C', title: '수습 데빌 헌터', desc: '악마의 공포에 질려 도망치지 마세요.', 
        introduction: '코베니처럼 벌벌 떨고 계시는군요. 데빌 헌터의 길은 험난합니다. 무서우면 햄버거라도 하나 드시고 기운 내세요. 죽지는 않을 거예요!',
        characteristic: '악마보다 사람이 더 무섭다고 느낌',
        quote: '나는... 죽는 게 무서워! (코베니)', color: 'linear-gradient(135deg, #606c88, #3f4c6b)' },
      { min: 0, label: 'D', title: '악마의 먹이', desc: '민간인으로서 조용히 사는 게 답입니다.', 
        introduction: '악마를 보면 소리부터 지르는 평범한 시민이군요. 공안의 보호를 받으며 안전하게 사시는 걸 추천합니다. 절대 문을 열어주지 마세요!',
        characteristic: '체인소가 전기톱인 줄 앎 (맞지만...)',
        quote: '살려주세요... (지나가던 행인)', color: 'linear-gradient(135deg, #bdc3c7, #2c3e50)' }
    ]
  },
  deathnote: {
    title: '데스노트 능력 고사',
    emoji: '📓',
    grades: [
      { min: 90, label: 'S', title: '신세계의 신', desc: '모든 계획을 완벽하게 실행한 천재 지략가!', 
        introduction: '축하합니다! 당신은 이미 키라의 정점에 도달했습니다. L의 모든 트릭을 간파하고, 노트를 완벽하게 제어하여 세상을 바꿀 준비가 되셨군요.',
        characteristic: '감자칩 봉지 속에서 TV를 봄',
        quote: '계획대로야. (야가미 라이토)', color: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
      { min: 70, label: 'A', title: 'L의 후계자', desc: '정의를 위해 끝까지 진실을 추적하는 자.', 
        introduction: '니아나 멜로에 필적하는 추리력을 가지셨군요! 키라의 정체를 밝혀내기 위해 사소한 단서도 놓치지 않는 당신은 진정한 탐정입니다.',
        characteristic: '의자에 앉을 때 항상 쪼그려 앉음',
        quote: '틀리지 않았습니다. 제가 L입니다. (니아)', color: 'linear-gradient(135deg, #ECE9E6, #FFFFFF)' },
      { min: 50, label: 'B', title: '유능한 수사관', desc: '키라 수사 본부의 핵심 인재입니다.', 
        introduction: '마츠다보다 훨씬 유능하시군요! 수사 본부에서 없어서는 안 될 존재입니다. 하지만 사신(死神)의 존재 앞에서는 아직 조금 당황하실지도 모르겠네요.',
        characteristic: '사탕과 초콜릿을 주식으로 삼음',
        quote: '나는 정의다! (L)', color: 'linear-gradient(135deg, #000000, #434343)' },
      { min: 30, label: 'C', title: '노트 주운 평범남', desc: '이름을 적기엔 아직 용기가 부족하군요.', 
        introduction: '데스노트를 주웠지만, 설명서를 읽는 데만 하루가 꼬박 걸리시겠어요. 류크가 사과를 달라고 조르기 전에 얼른 노트를 반납하는 건 어떨까요?',
        characteristic: '이름을 적으면 죽는다는 걸 안 믿음',
        quote: '인간은... 정말 흥미로워! (류크)', color: 'linear-gradient(135deg, #757f9a, #d7dde8)' },
      { min: 0, label: 'D', title: '미사미사 광팬', desc: '추리보다는 아이돌 덕질이 적성에 맞네요.', 
        introduction: '노트에는 관심 없고 미사의 공연만 따라다니고 계시군요. 제2의 키라가 당신의 수명을 노릴 수도 있으니 조심하세요! 덕질도 좋지만 목숨이 먼저입니다.',
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
