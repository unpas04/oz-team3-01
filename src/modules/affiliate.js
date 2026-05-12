/**
 * affiliate.js — 카테고리별 쿠팡 파트너스 광고 설정
 *
 * 사용법:
 *   1. 카테고리당 3개 상품: url, title, subtitle, image 채우기
 *   2. 이미지는 /public/assets/affiliate/ 폴더에 아래 네이밍으로 저장
 *      → {category}-1.png, {category}-2.png, {category}-3.png
 *      예) sanrio-1.png, pokemon-2.png, deathnote-3.png
 *   3. image 비워두면 그라데이션 placeholder가 표시됨
 *
 * 쿠팡 파트너스 약관: COUPANG_DISCLOSURE 페이지에 노출 필수
 */

export const COUPANG_DISCLOSURE =
  "이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

// 카테고리별 placeholder 색 (이미지 없을 때 표시)
const placeholder = (n) => ({
  title: `상품 ${n}`,
  subtitle: "쿠팡 파트너스 광고",
  keyword: "관련 굿즈",
  url: `https://link.coupang.com/a/REPLACE_${n}`,
  image: "",
});

export const AFFILIATE_BY_CATEGORY = {
  /* ───────────── 산리오 (완료) ───────────── */
  sanrio: [
    {
      title: "산리오캐릭터즈 대용량 패턴밴드",
      subtitle: "100매 표준형 · 캐릭터 5종 패턴",
      keyword: "산리오 밴드",
      url: "https://link.coupang.com/a/dGprCnCOHY",
      image: "/assets/affiliate/sanrio-1.png",
    },
    {
      title: "포차코 선스틱",
      subtitle: "SPF 50+ · 데일리 워터프루프",
      keyword: "포차코 선스틱",
      url: "https://link.coupang.com/a/dGpy151T3Y",
      image: "/assets/affiliate/sanrio-2.png",
    },
    {
      title: "마이멜로디 다꾸세트",
      subtitle: "다이어리 꾸미기 풀세트",
      keyword: "마이멜로디 다꾸",
      url: "https://link.coupang.com/a/dGpCNOqI9s",
      image: "/assets/affiliate/sanrio-3.png",
    },
  ],

  /* ───────────── 포켓몬 ───────────── */
  pokemon: [
    { title: "재래김+렌티큘러칩 16봉",     subtitle: "포켓몬 콜라보 김 + 카드",         keyword: "포켓몬",   url: "https://link.coupang.com/a/dGFsVIuRFY", image: "/assets/affiliate/pokemon-1.png" },
    { title: "포켓몬 전국 대도감",         subtitle: "전국 도감 풀 컬렉션 도서",         keyword: "포켓몬",   url: "https://link.coupang.com/a/dGFv1lXHMa", image: "/assets/affiliate/pokemon-2.png" },
    { title: "포켓몬 보드게임 쿠키박스",   subtitle: "온 가족이 즐기는 콜라보 보드게임", keyword: "포켓몬",   url: "https://link.coupang.com/a/dGFAn1PLXM", image: "/assets/affiliate/pokemon-3.png" },
    { title: "포켓몬 카드팩 나이트모드",   subtitle: "야간 모드 한정 카드팩",            keyword: "포켓몬",   url: "https://link.coupang.com/a/dGFCAzVgRM", image: "/assets/affiliate/pokemon-4.png" },
  ],

  /* ───────────── 진격의 거인 ───────────── */
  aot: [
    { title: "조사병단 후드티",   subtitle: "심장을 바쳐라 — 시그니처 후드", keyword: "진격의 거인", url: "https://link.coupang.com/a/dGFNHG9UiG", image: "/assets/affiliate/aot-1.png" },
    { title: "진격거 다꾸스티커", subtitle: "다이어리 꾸미기 스티커 세트",   keyword: "진격의 거인", url: "https://link.coupang.com/a/dGFPDu7EHc", image: "/assets/affiliate/aot-2.png" },
    { title: "조사병단 키링",     subtitle: "가방·열쇠고리 굿즈",            keyword: "진격의 거인", url: "https://link.coupang.com/a/dGFUekzunY", image: "/assets/affiliate/aot-3.png" },
  ],

  /* ───────────── 귀멸의 칼날 ───────────── */
  kimetsu: [
    { title: "귀멸의 칼날 직소퍼즐",   subtitle: "감상용·취미용 퍼즐",         keyword: "귀멸의 칼날", url: "https://link.coupang.com/a/dGF05nHCZo", image: "/assets/affiliate/kimetsu-1.png" },
    { title: "귀멸의 칼날 다꾸스티커", subtitle: "다이어리 꾸미기 스티커 세트", keyword: "귀멸의 칼날", url: "https://link.coupang.com/a/dGIcZYWSRM", image: "/assets/affiliate/kimetsu-2.png" },
  ],

  /* ───────────── 강철의 연금술사 ───────────── */
  fma: [
    { title: "강철의 연금술사 완전판 1권", subtitle: "리뉴얼 완전판 만화 1권",      keyword: "강철의 연금술사", url: "https://link.coupang.com/a/dGF6nhJA5s", image: "/assets/affiliate/fma-1.png" },
    { title: "국가 연금술사 은시계",       subtitle: "에드 칭호의 그 회중시계",     keyword: "강철의 연금술사", url: "https://link.coupang.com/a/dGGbzxU3Lo", image: "/assets/affiliate/fma-2.png" },
    { title: "20주년 축하 한정판 책",      subtitle: "FMA 20주년 한정판 아트북",    keyword: "강철의 연금술사", url: "https://link.coupang.com/a/dGGe5qz4qO", image: "/assets/affiliate/fma-3.png" },
    { title: "완전판 10-18 박스세트",      subtitle: "완전판 후반부 박스 세트",     keyword: "강철의 연금술사", url: "https://link.coupang.com/a/dGGjqI5krI", image: "/assets/affiliate/fma-4.png" },
  ],

  /* ───────────── 주술회전 ───────────── */
  jjk: [
    { title: "주술회전 다꾸세트 A",   subtitle: "다이어리 꾸미기 풀세트",          keyword: "주술회전", url: "https://link.coupang.com/a/dGGqf55qNM", image: "/assets/affiliate/jjk-1.png" },
    { title: "주술용어사전",          subtitle: "주술회전 용어·세계관 가이드북",   keyword: "주술회전", url: "https://link.coupang.com/a/dGGuatOU7o", image: "/assets/affiliate/jjk-2.png" },
    { title: "마법의역사: 주술연금술과학으로 이어지는 인류의 비밀", subtitle: "주술·연금술·과학사 교양서", keyword: "주술회전", url: "https://link.coupang.com/a/dGIfboUIO4", image: "/assets/affiliate/jjk-3.png" },
  ],

  /* ───────────── 드래곤볼 ───────────── */
  dragonball: [
    { title: "대형 여의주 7성구",   subtitle: "드래곤볼 모형 7개 풀세트",    keyword: "드래곤볼", url: "https://link.coupang.com/a/dGGBbUjjBA", image: "/assets/affiliate/dragonball-1.png" },
    { title: "드래곤볼 총집편",     subtitle: "주요 에피소드 모음 총집편",   keyword: "드래곤볼", url: "https://link.coupang.com/a/dGGFvqKE8a", image: "/assets/affiliate/dragonball-2.png" },
    { title: "드래곤볼 런치파우치", subtitle: "캐릭터 런치박스·파우치",      keyword: "드래곤볼", url: "https://link.coupang.com/a/dGGHB1tzPw", image: "/assets/affiliate/dragonball-3.png" },
  ],

  /* ───────────── 체인소맨 ───────────── */
  chainsawman: [
    { title: "2026 고퀄리티 덴지 포치타 피규어", subtitle: "고퀄리티 피규어 컬렉터블",  keyword: "체인소맨", url: "https://link.coupang.com/a/dGGZBYAE5k", image: "/assets/affiliate/chainsawman-1.png" },
    { title: "포치타 버켓",                       subtitle: "포치타 버켓햇",            keyword: "체인소맨", url: "https://link.coupang.com/a/dGG55p2C2C", image: "/assets/affiliate/chainsawman-2.png" },
    { title: "포치타 피규어 저금통 정품",         subtitle: "정품 포치타 저금통 피규어", keyword: "체인소맨", url: "https://link.coupang.com/a/dGG7nHescS", image: "/assets/affiliate/chainsawman-3.png" },
  ],

  /* ───────────── 데스노트 ───────────── */
  deathnote: [
    { title: "데스노트 + 깃털팬 세트",       subtitle: "노트 + 깃털 펜 풀세트",      keyword: "데스노트", url: "https://link.coupang.com/a/dGHcSUWNci", image: "/assets/affiliate/deathnote-1.png" },
    { title: "데스노트 컬러판 1-5권 세트",  subtitle: "오리지널 컬러판 1-5권 박스", keyword: "데스노트", url: "https://link.coupang.com/a/dGHj5ncRmm", image: "/assets/affiliate/deathnote-2.png" },
    { title: "L 문양 키링",                  subtitle: "L 시그니처 키링 굿즈",       keyword: "데스노트", url: "https://link.coupang.com/a/dGHre4rvga", image: "/assets/affiliate/deathnote-3.png" },
  ],

  /* ───────────── 페이트 시리즈 ───────────── */
  fate: [
    { title: "페이트 일러스트 화집",       subtitle: "타입문 공식 일러스트 화집",        keyword: "페이트", url: "https://link.coupang.com/a/dGHuIvxeq4", image: "/assets/affiliate/fate-1.png" },
    { title: "영령식문록",                  subtitle: "영령 식별·설정 자료집",            keyword: "페이트", url: "https://link.coupang.com/a/dGHy9OaBYy", image: "/assets/affiliate/fate-2.png" },
    { title: "닌텐도 스위치2 포코피아",     subtitle: "Switch2용 포코피아 페이트 게임",   keyword: "페이트", url: "https://link.coupang.com/a/dGHBKEI2kS", image: "/assets/affiliate/fate-3.png" },
  ],
};

export const getAffiliateProducts = (category) =>
  AFFILIATE_BY_CATEGORY[category] || [placeholder(1)];
