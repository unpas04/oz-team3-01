import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getTotalScore } from '../modules/storage-module';
import { useAuth } from '../contexts/AuthContext';
import {
  getTotalRanking,
  getMyRank,
  getLastMonthChampion,
  getMyMonthlyDoc,
  submitSuggestion,
} from '../modules/firestore';
import { signOutUser } from '../modules/auth';
import AuthModal from '../components/AuthModal';
import {
  trackPageView,
  trackCategorySelect,
} from '../modules/analytics';
import "../styles/home.css"

const CATEGORY_GROUPS = [
  {
    id: "ip",
    name: "이미지 퀴즈",
    subtitle: "내가 좋아하는 IP의 진짜 덕력 테스트",
    icon: "🎴",
    theme: "pink",
    items: [
      { id: "sanrio", name: "산리오", emoji: "🎀" },
      { id: "pokemon", name: "포켓몬", emoji: "⚡" },
      { id: "aot", name: "진격의 거인", emoji: "⚔️" },
      { id: "kimetsu", name: "귀멸의 칼날", emoji: "🔥" },
      { id: "fma", name: "강철의 연금술사", emoji: "⚗️" },
      { id: "jjk", name: "주술회전", emoji: "🔮" },
      { id: "dragonball", name: "드래곤볼", emoji: "🐉" },
      { id: "chainsawman", name: "체인소맨", emoji: "🪚" },
      { id: "deathnote", name: "데스노트", emoji: "📓" },
      { id: "fate", name: "페이트 시리즈", emoji: "📜" },
    ],
  },
  {
    id: "speed",
    name: "스피드 퀴즈",
    subtitle: "30초 + 목숨 3개. 빠르고 정확하게!",
    icon: "⚡",
    theme: "gold",
    items: [
      { id: "onepiece", name: "원피스",        emoji: "🏴‍☠️", route: "/speed-quiz?category=onepiece" },
      { id: "naruto",   name: "나루토",        emoji: "🍥",   route: "/speed-quiz?category=naruto" },
      { id: "slamdunk", name: "슬램덩크",      emoji: "🏀",   route: "/speed-quiz?category=slamdunk" },
      { id: "conan",    name: "명탐정 코난",   emoji: "🔍",   route: "/speed-quiz?category=conan" },
      { id: "shinchan", name: "짱구는 못말려", emoji: "🖍️",   route: "/speed-quiz?category=shinchan" },
      { id: "doraemon", name: "도라에몽",      emoji: "🔵",   route: "/speed-quiz?category=doraemon" },
      { id: "hxh",      name: "헌터x헌터",     emoji: "🃏",   route: "/speed-quiz?category=hxh" },
      { id: "yugioh",   name: "유희왕",        emoji: "🐉",   route: "/speed-quiz?category=yugioh" },
      { id: "digimon",  name: "디지몬",        emoji: "💾",   route: "/speed-quiz?category=digimon" },
    ],
  },
  {
    id: "theme",
    name: "테마 퀴즈",
    subtitle: "캐릭터를 모아 묶어보는 새로운 재미",
    icon: "🎯",
    theme: "purple",
    items: [
      { id: "theme_memorial",  name: "추모관",     emoji: "⚱️", subtitle: "작품 속에서 떠나간 그들",     textCard: true, cardTone: "memorial",  route: "/speed-quiz?category=theme_memorial" },
      { id: "theme_villain",   name: "빌런 열전",  emoji: "😈", subtitle: "9개 IP의 악역들만 모았다",     textCard: true, cardTone: "villain",   route: "/speed-quiz?category=theme_villain" },
      { id: "theme_rivals",    name: "라이벌즈",   emoji: "⚔️", subtitle: "둘 사이의 불꽃 튀는 관계",     textCard: true, cardTone: "rivals",    route: "/speed-quiz?category=theme_rivals" },
      { id: "theme_mentor",    name: "사제지간",   emoji: "🎓", subtitle: "스승과 제자의 인연",          textCard: true, cardTone: "mentor",    route: "/speed-quiz?category=theme_mentor" },
      { id: "theme_firstlove", name: "첫사랑",     emoji: "💘", subtitle: "그땐 몰랐던 두근거림",        textCard: true, cardTone: "firstlove", route: "/speed-quiz?category=theme_firstlove" },
      { id: "theme_transform", name: "변신·각성",  emoji: "✨", subtitle: "진화·모드체인지·궁극형태",   textCard: true, cardTone: "transform", route: "/speed-quiz?category=theme_transform" },
      { id: "theme_quotes",    name: "명대사 OX",  emoji: "💬", subtitle: "이 대사, 누가 했게?",         textCard: true, cardTone: "quotes",    route: "/speed-quiz?category=theme_quotes" },
      { id: "theme_dubname",   name: "한국 더빙명", emoji: "🎙️", subtitle: "우리말 이름 기억나?",         textCard: true, cardTone: "dubname",   route: "/speed-quiz?category=theme_dubname" },
      { id: "theme_twist",     name: "흑막·반전",  emoji: "🎭", subtitle: "알고 보니 그가 범인이었다",   textCard: true, cardTone: "twist",     route: "/speed-quiz?category=theme_twist" },
      { id: "theme_family",    name: "부모님 찾기", emoji: "👨‍👩‍👧", subtitle: "DNA는 못 속여",                textCard: true, cardTone: "family",    route: "/speed-quiz?category=theme_family" },
      { id: "theme_second",    name: "2인자의 슬픔", emoji: "🥈", subtitle: "은메달도 영광이야",           textCard: true, cardTone: "second",    route: "/speed-quiz?category=theme_second" },
      { id: "theme_trivia",    name: "장수 만화 트리비아", emoji: "📚", subtitle: "찐팬만 아는 매니아 지식", textCard: true, cardTone: "trivia",    route: "/speed-quiz?category=theme_trivia" },
    ],
  },
];

// 평탄화: 기존 코드에서 CATEGORIES 사용하던 곳 호환
const CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.items);

const GRADES = [
  { min: 90, label: "전설의 덕후 ✦✦✦" },
  { min: 70, label: "고인물 ✦✦✦" },
  { min: 50, label: "진성 팬 ✦✦" },
  { min: 30, label: "라이트 팬 ✦" },
  { min: 0, label: "입문자" },
];

const MAX_SCORE = 300;
const MAX_STARS = 10;
const DEFAULT_CHAMPION = { nickname: "덕후의왕", starCount: 8, totalScore: 240 };

function App() {
  const { user, profile } = useAuth();
  const [totalScore, setTotalScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [starsModalOpen, setStarsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [navigating, setNavigating] = useState(null); // { name, emoji, isTheme } | null
  const [authMode, setAuthMode] = useState("signin"); // "signin" | "signup"
  const [pendingCategory, setPendingCategory] = useState(null); // 비로그인 시 클릭한 카테고리 저장
  const navigate = useNavigate();

  // 별딱지 (Firestore 우선, 없으면 빈 배열)
  const myStars = profile?.stars || [];
  const starCount = myStars.length;

  // 랭킹 데이터
  const [rankingTotal, setRankingTotal] = useState([]);
  const [myInfo, setMyInfo] = useState(null);
  const [myMonthlyTotal, setMyMonthlyTotal] = useState(0);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    document.body.classList.add("home");
    trackPageView("/", "덕력 감별소 - 메인");
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  // 페이지 로드 시 점수 업데이트
  useEffect(() => {
    const score = getTotalScore();
    setTotalScore(score);
  }, []);

  // 종합 랭킹 + 챔피언 (마운트 시 1회)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const top = await getTotalRanking(10);
        if (!cancelled) setRankingTotal(top);
      } catch (e) {
        console.error("[ranking] 종합 랭킹 로드 실패:", e?.code, e?.message);
        if (e?.message?.includes("index")) {
          console.error("[ranking] ★ Firestore 인덱스 필요. 콘솔에서 위 링크 클릭해서 생성하세요.");
        }
      }
      try {
        const ch = await getLastMonthChampion();
        if (!cancelled) setChampion(ch);
      } catch (e) {
        console.error("[champion] 지난달 챔피언 로드 실패:", e?.code, e?.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 내 순위
  useEffect(() => {
    if (!user) {
      setMyInfo(null);
      setMyMonthlyTotal(0);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [rank, monthly] = await Promise.all([
          getMyRank(user.uid),
          getMyMonthlyDoc(user.uid),
        ]);
        if (!cancelled) {
          setMyInfo(rank);
          setMyMonthlyTotal(monthly?.totalScore || 0);
          setTotalScore(monthly?.totalScore || 0);
        }
      } catch (e) {
        console.error("my rank error", e);
      }
    })();
    return () => { cancelled = true; };
  }, [user, profile]);

  const pct = Math.min(100, Math.round((totalScore / MAX_SCORE) * 100));
  const currentGrade = GRADES.find((g) => pct >= g.min)?.label || "아직 시작 전 ✦";

  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonCategory, setComingSoonCategory] = useState(null);

  // 의견 폼
  const [suggestion, setSuggestion] = useState("");
  const [suggestState, setSuggestState] = useState("idle"); // idle | submitting | done | failed
  const [suggestError, setSuggestError] = useState("");

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    if (suggestState === "submitting" || suggestState === "done") return;
    setSuggestError("");
    setSuggestState("submitting");
    try {
      await submitSuggestion({
        message: suggestion,
        uid: user?.uid || null,
        nickname: profile?.nickname || null,
      });
      setSuggestState("done");
      setSuggestion("");
    } catch (err) {
      console.error("suggestion submit failed", err);
      setSuggestError(err?.message || "전송에 실패했어요. 잠시 후 다시 시도해주세요.");
      setSuggestState("failed");
    }
  };

  const openModal = (category) => {
    if (category.comingSoon) {
      setComingSoonCategory(category);
      setComingSoonOpen(true);
      trackCategorySelect(`${category.id}_coming_soon`);
      return;
    }

    // 비로그인이면 회원가입 모달 띄우고, 성공 후 자동으로 이 카테고리 진입
    // (스피드/테마 등 route 카테고리도 포함 — 비로그인 시 점수가 저장 안 되므로)
    if (!user || !profile?.nickname) {
      setPendingCategory(category);
      setAuthMode("signup");
      setAuthModalOpen(true);
      return;
    }

    // route 명시 카테고리(스피드/테마) → 로딩 오버레이 띄우고 다음 프레임에 이동
    if (category.route) {
      trackCategorySelect(category.id);
      setNavigating({
        name: category.name,
        emoji: category.emoji,
        isTheme: category.id?.startsWith("theme_"),
      });
      // 오버레이가 그려진 다음 프레임에 navigate → 화면 전환 끊김 없음
      requestAnimationFrame(() => {
        requestAnimationFrame(() => navigate(category.route));
      });
      return;
    }

    // 그 외(이미지 퀴즈) → 카테고리 선택 모달
    setSelectedCategory(category);
    setIsModalOpen(true);
    trackCategorySelect(category.id);
  };

  // 가입/로그인 성공 후 pending 카테고리가 있으면 자동 진입
  useEffect(() => {
    if (pendingCategory && user && profile?.nickname) {
      const cat = pendingCategory;
      setPendingCategory(null);
      // route가 있으면 로딩 오버레이 띄우고 이동, 없으면 카테고리 선택 모달
      if (cat.route) {
        trackCategorySelect(cat.id);
        setNavigating({
          name: cat.name,
          emoji: cat.emoji,
          isTheme: cat.id?.startsWith("theme_"),
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => navigate(cat.route));
        });
      } else {
        setSelectedCategory(cat);
        setIsModalOpen(true);
        trackCategorySelect(cat.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCategory, user, profile]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const startQuiz = () => {
    if (selectedCategory) {
      navigate(`/quiz?category=${selectedCategory.id}`);
    }
  };

  return (
    <div className="app-container">
      {/* ① 배경 및 장식 요소 */}
      <div className="bg-blobs" aria-hidden="true" />
      <div className="bg-blob-extra" aria-hidden="true" />
      <div className="pixel-floats">
        {["⭐", "🌸", "💫", "🎀", "✨", "🌙", "💕", "⭐", "🌸", "🎀"].map((emoji, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </div>

      {/* ② 헤더 */}
      <header className="main-header">
        <div className="header-auth">
          {user ? (
            <div className="header-user">
              <span className="header-user-nick">{profile?.nickname || user.displayName || "유저"}</span>
              <button
                type="button"
                className="header-auth-btn header-auth-btn-out"
                onClick={() => signOutUser()}
              >
                로그아웃
              </button>
            </div>
          ) : null}
        </div>
        <span className="header-tag">CHARACTER QUIZ</span>
        <h1 className="main-title">덕력 감별소</h1>
        <p className="main-subtitle">나의 진짜 덕력을 확인해봐 ✦</p>
      </header>

      {/* ③-2 별딱지 슬림 pill */}
      <section className="summary-section">
        <button
          type="button"
          className="summary-pill summary-pill-stars"
          onClick={() => setStarsModalOpen(true)}
        >
          {/* SVG 스티커 아이콘 */}
          <svg className="pill-sticker" viewBox="0 0 44 44" aria-hidden="true">
            <defs>
              <linearGradient id="stickerGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFE5A8" />
                <stop offset="50%" stopColor="#FFB347" />
                <stop offset="100%" stopColor="#FF85A1" />
              </linearGradient>
              <radialGradient id="stickerHighlight" cx="0.35" cy="0.3" r="0.4">
                <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            {/* 메인 별 */}
            <path
              d="M22 4 L26.5 16.5 L40 17 L29 25.5 L33 39 L22 31 L11 39 L15 25.5 L4 17 L17.5 16.5 Z"
              fill="url(#stickerGrad)"
              stroke="#FF8C42"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* 광택 */}
            <path
              d="M22 4 L26.5 16.5 L40 17 L29 25.5 L33 39 L22 31 L11 39 L15 25.5 L4 17 L17.5 16.5 Z"
              fill="url(#stickerHighlight)"
            />
            {/* 주변 반짝이 */}
            <circle cx="6" cy="8" r="1.5" fill="#fff" opacity="0.9" />
            <circle cx="38" cy="9" r="1.2" fill="#fff" opacity="0.85" />
            <circle cx="40" cy="36" r="1" fill="#fff" opacity="0.75" />
          </svg>

          <div className="pill-text-stack">
            <span className="pill-label">별딱지</span>
            <span className="pill-subtitle">내 컬렉션</span>
          </div>

          <span className="pill-count">
            <strong>{starCount}</strong>
            <span className="pill-count-suffix">개</span>
          </span>

          <svg className="pill-arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M5 3 L11 8 L5 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {/* ③-2-b 지난달 챔피언 (독립 섹션) */}
      <section className="champion-section">
        <div className="ranking-champion">
          <svg className="champion-trophy" viewBox="0 0 48 48" aria-hidden="true">
            <defs>
              <linearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE48A" />
                <stop offset="50%" stopColor="#FFC54D" />
                <stop offset="100%" stopColor="#D89A1A" />
              </linearGradient>
              <linearGradient id="trophyShine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path d="M11 14 Q5 14 5 20 Q5 26 13 27" fill="none" stroke="url(#trophyGrad)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M37 14 Q43 14 43 20 Q43 26 35 27" fill="none" stroke="url(#trophyGrad)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M11 8 L37 8 L35 28 Q33 33 24 33 Q15 33 13 28 Z" fill="url(#trophyGrad)" stroke="#B8870A" strokeWidth="1.2" />
            <path d="M14 12 L34 12 L33 16 L15 16 Z" fill="url(#trophyShine)" opacity="0.7" />
            <path d="M24 14 L25.5 18.5 L30 18.5 L26.5 21.5 L28 26 L24 23 L20 26 L21.5 21.5 L18 18.5 L22.5 18.5 Z" fill="#fff" opacity="0.9" />
            <rect x="20" y="33" width="8" height="4" fill="url(#trophyGrad)" />
            <rect x="14" y="37" width="20" height="4" rx="1.5" fill="url(#trophyGrad)" stroke="#B8870A" strokeWidth="1" />
            <circle cx="6" cy="6" r="1.2" fill="#FFE48A" opacity="0.9" />
            <circle cx="42" cy="8" r="1" fill="#FFE48A" opacity="0.85" />
            <circle cx="44" cy="32" r="0.9" fill="#FFE48A" opacity="0.7" />
          </svg>
          <div className="champion-text">
            <span className="champion-label">지난달 챔피언</span>
            <span className="champion-nick">
              {(champion || DEFAULT_CHAMPION).nickname}
            </span>
            <span className="champion-meta">
              <span className="champion-stars">
                <svg className="champion-star-mark" viewBox="0 0 16 16" aria-hidden="true">
                  <defs>
                    <linearGradient id="championStarGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFE48A" />
                      <stop offset="50%" stopColor="#FFB347" />
                      <stop offset="100%" stopColor="#FF85A1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z"
                    fill="url(#championStarGrad)"
                    stroke="#FF8C42"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                </svg>
                {(champion || DEFAULT_CHAMPION).starCount}
              </span>
              <span className="champion-divider" aria-hidden="true" />
              <span className="champion-score">
                {(champion || DEFAULT_CHAMPION).totalScore}점
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ③-3 랭킹 (펼쳐진 형태) */}
      <section className="ranking-section">
        <div className="card ranking-card">
          <div className="ranking-header">
            <div className="ranking-title">
              <span>이번달 랭킹</span>
            </div>
            <span className="ranking-month">
              {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, "0")}
            </span>
          </div>

          {rankingTotal.length === 0 && (
            <div className="ranking-empty">
              아직 등록된 도전자가 없어요.<br />첫 주인공이 되어보세요 ✦
            </div>
          )}
          <ol className="ranking-list">
            {rankingTotal.map((u, i) => ({
              rank: i + 1,
              nickname: u.nickname,
              isStarMode: true,
              primaryNum: u.starCount ?? 0,
              secondary: `${u.totalScore ?? 0}점`,
            })).map((row) => (
              <li key={row.rank} className={`ranking-row rank-${row.rank}`}>
                <span className="rank-medal" aria-hidden="true">
                  {row.rank <= 3 ? (
                    row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : "🥉"
                  ) : (
                    <svg className="rank-badge-svg" viewBox="0 0 36 36" aria-hidden="true">
                      <defs>
                        <linearGradient id={`rankGrad${row.rank}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FFE0EC" />
                          <stop offset="100%" stopColor="#F0D9FF" />
                        </linearGradient>
                      </defs>
                      <circle cx="18" cy="18" r="15" fill={`url(#rankGrad${row.rank})`} stroke="#D8B4E8" strokeWidth="1.5" />
                      <circle cx="18" cy="18" r="11" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                      <text x="18" y="23" textAnchor="middle" fontFamily="YPairingFont, sans-serif" fontSize="14" fontWeight="bold" fill="#9A4570">{row.rank}</text>
                    </svg>
                  )}
                </span>
                <span className="rank-nick">{row.nickname}</span>
                <span className="rank-primary">
                  {row.isStarMode && (
                    <svg className="rank-star-mark" viewBox="0 0 16 16" aria-hidden="true">
                      <defs>
                        <linearGradient id={`rankStarGrad-${row.rank}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FFE48A" />
                          <stop offset="50%" stopColor="#FFB347" />
                          <stop offset="100%" stopColor="#FF85A1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z"
                        fill={`url(#rankStarGrad-${row.rank})`}
                        stroke="#FF8C42"
                        strokeWidth="0.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <span>{row.isStarMode ? row.primaryNum : `${row.primaryNum}점`}</span>
                </span>
                <span className="rank-secondary">{row.secondary}</span>
              </li>
            ))}
          </ol>

          {/* 나의 순위 */}
          <div className="ranking-me">
            <svg className="me-icon" viewBox="0 0 40 44" aria-hidden="true">
              <defs>
                <linearGradient id="meIconGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF85A1" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>
                <radialGradient id="meIconHighlight" cx="0.35" cy="0.3" r="0.4">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              {/* 핀 본체 (티어드롭) */}
              <path
                d="M20 3
                   C 11 3, 5 9, 5 18
                   C 5 26, 14 36, 18 41
                   C 19 42.2, 21 42.2, 22 41
                   C 26 36, 35 26, 35 18
                   C 35 9, 29 3, 20 3 Z"
                fill="url(#meIconGrad)"
                stroke="#fff"
                strokeWidth="2"
              />
              {/* 광택 */}
              <path
                d="M20 3
                   C 11 3, 5 9, 5 18
                   C 5 26, 14 36, 18 41
                   C 19 42.2, 21 42.2, 22 41
                   C 26 36, 35 26, 35 18
                   C 35 9, 29 3, 20 3 Z"
                fill="url(#meIconHighlight)"
              />
              {/* 안쪽 흰 원 */}
              <circle cx="20" cy="17" r="6.5" fill="#fff" />
              {/* 안쪽 핑크 점 (포인트) */}
              <circle cx="20" cy="17" r="3" fill="#FF6FA8" />
            </svg>
            <div className="me-text">
              <span className="me-label">나의 순위</span>
              {user && myInfo ? (
                <span className="me-stats">
                  <span className="me-rank">
                    <strong>{myInfo.rank}</strong>위
                  </span>
                  <span className="me-divider" aria-hidden="true" />
                  <span className="me-stars">
                    <svg className="me-star-mark" viewBox="0 0 16 16" aria-hidden="true">
                      <defs>
                        <linearGradient id="meStarGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FFE48A" />
                          <stop offset="50%" stopColor="#FFB347" />
                          <stop offset="100%" stopColor="#FF85A1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z"
                        fill="url(#meStarGrad)"
                        stroke="#FF8C42"
                        strokeWidth="0.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {myInfo.starCount ?? starCount}
                  </span>
                  <span className="me-divider" aria-hidden="true" />
                  <span className="me-score">{myMonthlyTotal}점</span>
                </span>
              ) : (
                <span className="me-empty-msg">
                  <svg className="me-empty-sparkle" viewBox="0 0 16 16" aria-hidden="true">
                    <defs>
                      <linearGradient id="meEmptyStarGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFE48A" />
                        <stop offset="50%" stopColor="#FFB347" />
                        <stop offset="100%" stopColor="#FF85A1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8 1 L10 6 L15 6 L11 9 L12.5 14 L8 11 L3.5 14 L5 9 L1 6 L6 6 Z"
                      fill="url(#meEmptyStarGrad)"
                      stroke="#FF8C42"
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {user
                    ? `${profile?.nickname || ""}님의 첫 도전을 기다리고 있어요`
                    : "퀴즈를 풀면 순위가 표시돼요"}
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ④ 카테고리 그룹 (가로 스크롤) */}
      <main className="category-section">
        {CATEGORY_GROUPS.map((group) => (
          <div key={group.id} className={`category-group group-${group.theme}`}>
            <div className="group-header">
              <span className="group-icon" aria-hidden="true">{group.icon}</span>
              <div className="group-meta">
                <h2 className="group-name">{group.name}</h2>
                <p className="group-subtitle">{group.subtitle}</p>
              </div>
            </div>
            <div
              className="group-scroll"
              style={{
                "--cols": Math.max(1, Math.ceil((group.items.length + 1) / 2)),
              }}
            >
              {group.items.map((cat) => (
                cat.textCard ? (
                  <div
                    key={cat.id}
                    className={`card category-card theme-text-card theme-tone-${cat.cardTone || "default"}`}
                    onClick={() => openModal(cat)}
                  >
                    <div className="theme-card-aurora" aria-hidden="true" />
                    <div className="theme-card-orbs" aria-hidden="true">
                      <span className="theme-orb theme-orb-1" />
                      <span className="theme-orb theme-orb-2" />
                      <span className="theme-orb theme-orb-3" />
                    </div>
                    <div className="theme-card-grain" aria-hidden="true" />
                    <div className="theme-card-border" aria-hidden="true" />
                    <div className="theme-card-emoji-bg" aria-hidden="true">
                      {cat.emoji}
                    </div>
                    <div className="theme-card-inner">
                      <div className="theme-card-emoji" aria-hidden="true">{cat.emoji}</div>
                      <div className="theme-card-name">{cat.name}</div>
                      {cat.subtitle && (
                        <div className="theme-card-subtitle">{cat.subtitle}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    key={cat.id}
                    className={`card category-card ${cat.comingSoon ? "category-card-soon" : ""}`}
                    onClick={() => openModal(cat)}
                  >
                    {cat.comingSoon && (
                      <div className="category-soon-badge">COMING SOON</div>
                    )}
                    <div className="card-image-wrap">
                      <img
                        src={`/assets/main-cards/${cat.id}.png`}
                        alt={cat.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="card-image-placeholder" style={{ display: "none" }}>
                        {cat.emoji}
                      </div>
                      <div className="card-body">
                        <div className="card-name">{cat.name}</div>
                        <div className="card-modes" />
                      </div>
                    </div>
                  </div>
                )
              ))}
              <div className="category-card-coming">
                <div className="coming-icon">＋</div>
                <div className="coming-text">COMING SOON</div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* ⑥ 사용자 의견 푸터 폼 */}
      <section className="suggestion-section">
        <div className="suggestion-card">
          <div className="suggestion-header">
            <svg className="suggestion-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z"
                fill="#FFB347"
                stroke="#FF8C42"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h3 className="suggestion-title">보고 싶은 시리즈가 있나요?</h3>
              <p className="suggestion-subtitle">
                자유롭게 의견을 남겨주세요. 추가됐으면 하는 IP, 개선 아이디어, 칭찬·불만 뭐든 환영해요 ✦
              </p>
            </div>
          </div>

          {suggestState === "done" ? (
            <div className="suggestion-thanks">
              <span aria-hidden="true">✦</span>
              <span>의견 잘 받았어요! 소중히 검토할게요.</span>
            </div>
          ) : (
            <form className="suggestion-form" onSubmit={handleSuggestionSubmit}>
              <textarea
                className="suggestion-textarea"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="예: 원피스 시리즈도 만들어주세요! / 결과 페이지가 더 다양했으면 좋겠어요"
                maxLength={500}
                rows={3}
                disabled={suggestState === "submitting"}
                required
              />
              <div className="suggestion-footer">
                <span className="suggestion-count">{suggestion.length}/500</span>
                <button
                  type="submit"
                  className="suggestion-submit-btn"
                  disabled={suggestState === "submitting" || suggestion.trim().length < 2}
                >
                  {suggestState === "submitting" ? "보내는 중…" : "의견 보내기 →"}
                </button>
              </div>
              {suggestError && <div className="suggestion-error">{suggestError}</div>}
            </form>
          )}
        </div>
      </section>

      {/* ⑤ 별딱지 도감 모달 */}
      {starsModalOpen && (
        <div className="modal-overlay active" onClick={() => setStarsModalOpen(false)}>
          <div
            className="modal-card stars-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setStarsModalOpen(false)}>✕</button>
            <div className="stars-card stars-card-in-modal">
              <div className="stars-header">
                <div className="stars-title">
                  <span>별딱지 도감</span>
                </div>
                <span className="stars-count">
                  <strong>{starCount}</strong>개 수집
                </span>
              </div>
              <p className="stars-hint stars-hint-top">
                ✦ <strong>이미지 퀴즈</strong> 27점 이상 · <strong>스피드 퀴즈</strong> 20점 이상 · <strong>테마 퀴즈</strong> 15점 이상 — 카테고리 클리어 시 별딱지 1개!
              </p>
              <div className="stars-grid-scroll">
              <div className="stars-grid">
                {CATEGORIES.map((cat) => {
                  const owned = myStars.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      className={`star-slot ${owned ? "owned" : "empty"}`}
                      data-category={cat.id}
                      title={cat.name}
                    >
                      <div className="star-slot-inner">
                        {/* 배경 별 SVG (모든 슬롯) */}
                        <svg className="star-slot-bg" viewBox="0 0 60 60" aria-hidden="true">
                          <path
                            d="M30 4 L36 22 L55 22 L40 33 L46 52 L30 41 L14 52 L20 33 L5 22 L24 22 Z"
                            fill={owned ? "rgba(255,255,255,0.55)" : "none"}
                            stroke={owned ? "rgba(255,180,50,0.6)" : "rgba(180,160,200,0.4)"}
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {owned ? (
                          <span className="star-slot-emoji">{cat.emoji}</span>
                        ) : (
                          <svg className="star-slot-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M7 10V7a5 5 0 0 1 10 0v3"
                              fill="none"
                              stroke="rgba(160,140,180,0.7)"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <rect x="5.5" y="10" width="13" height="10" rx="2" fill="rgba(180,160,200,0.18)" stroke="rgba(160,140,180,0.7)" strokeWidth="1.6" />
                            <circle cx="12" cy="14.5" r="1.4" fill="rgba(160,140,180,0.85)" />
                          </svg>
                        )}
                      </div>
                      <span className="star-slot-name">{cat.name}</span>
                    </div>
                  );
                })}
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 퀴즈 준비중 로딩 오버레이 — navigate 직전 풀스크린 */}
      {navigating && (
        <div
          className={`quiz-loading-overlay ${navigating.isTheme ? "tone-theme" : "tone-speed"}`}
          aria-live="polite"
          role="status"
        >
          <div className="qlo-bg" aria-hidden="true">
            <span className="qlo-orb qlo-orb-1" />
            <span className="qlo-orb qlo-orb-2" />
            <span className="qlo-orb qlo-orb-3" />
          </div>
          <div className="qlo-card">
            <div className="qlo-emoji" aria-hidden="true">{navigating.emoji || "✦"}</div>
            <div className="qlo-tag">
              {navigating.isTheme ? "⚜︎ THEME" : "⚡ SPEED"}
            </div>
            <div className="qlo-name">{navigating.name}</div>
            <div className="qlo-loading">
              <span className="qlo-dot" />
              <span className="qlo-dot" />
              <span className="qlo-dot" />
            </div>
            <div className="qlo-status">퀴즈 준비중…</div>
          </div>
        </div>
      )}

      {/* ⑤-3 로그인/가입 모달 */}
      <AuthModal
        open={authModalOpen}
        defaultMode={authMode}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingCategory(null); // 모달 취소 시 pending 카테고리 클리어
        }}
        onSuccess={() => {
          setAuthModalOpen(false);
          // pendingCategory가 있으면 위 useEffect가 자동으로 카테고리 모달 띄움
        }}
      />

      {/* ⑤-4 Coming Soon 모달 */}
      {comingSoonOpen && (
        <div className="modal-overlay active" onClick={() => setComingSoonOpen(false)}>
          <div className="modal-card coming-soon-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setComingSoonOpen(false)}>✕</button>
            <div className="coming-soon-emoji" aria-hidden="true">{comingSoonCategory?.emoji}</div>
            <div className="coming-soon-tag">COMING SOON</div>
            <h2 className="coming-soon-title">{comingSoonCategory?.name}</h2>
            <p className="coming-soon-desc">
              열심히 준비 중이에요.<br />
              곧 만나요 ✦
            </p>
            <button
              type="button"
              className="coming-soon-btn"
              onClick={() => setComingSoonOpen(false)}
            >
              알겠어요
            </button>
          </div>
        </div>
      )}

      {/* ⑤ 난이도 선택 모달 */}
      {isModalOpen && selectedCategory && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-img-wrap">
              <img
                src={`/assets/main-cards/${selectedCategory.id}.png`}
                alt={selectedCategory.name}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="modal-img-placeholder" style={{ display: "none" }}>
                {selectedCategory.emoji}
              </div>
              <div className="modal-img-label">{selectedCategory.name}</div>
            </div>
            <p className="modal-subtitle">퀴즈를 시작해볼까요?</p>
            <div className="modal-buttons">
              <button className="btn btn-normal" onClick={startQuiz}>
                <span>시작하기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
