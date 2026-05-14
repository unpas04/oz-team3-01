import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/* ── 사용자 의견 (suggestions) ─────────────────── */
export const submitSuggestion = async ({ message, uid = null, nickname = null }) => {
  const trimmed = (message || "").trim();
  if (trimmed.length < 2) throw new Error("의견은 2자 이상 입력해주세요.");
  if (trimmed.length > 500) throw new Error("의견은 500자 이내로 입력해주세요.");
  return await addDoc(collection(db, "suggestions"), {
    message: trimmed,
    uid,
    nickname,
    createdAt: serverTimestamp(),
  });
};

// 별딱지 지급 기준 — 카테고리 종류별로 다르게 적용
//   IP 이미지 퀴즈(귀멸/포켓몬 등): 27/30 (90%) — 4지선다라 난이도 높음
//   스피드퀴즈 (IP, 5초/문제 OX): 20/30 (66%) — 시간 압박
//   테마퀴즈 (30초 총합, OX):     15/30 (50%) — 30초 안에 다 못 풀 가능성
const STAR_THRESHOLDS = {
  image: 27,
  speed: 20,
  theme: 15,
};
// 카테고리 ID 패턴으로 모드 판별
//   "theme_*"            → 테마퀴즈
//   스피드 IP 9개         → 스피드퀴즈
//   그 외(귀멸/포켓몬 등) → 이미지 퀴즈
const SPEED_IP_IDS = new Set([
  "onepiece", "naruto", "slamdunk", "conan", "shinchan",
  "doraemon", "hxh", "yugioh", "digimon",
]);
const getStarThreshold = (category) => {
  if (typeof category === "string" && category.startsWith("theme_")) return STAR_THRESHOLDS.theme;
  if (SPEED_IP_IDS.has(category)) return STAR_THRESHOLDS.speed;
  return STAR_THRESHOLDS.image;
};
export { getStarThreshold };

const STAR_WEIGHT = 1000; // compositeScore = starCount * 1000 + totalScore

export const getCurrentMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const getLastMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

/* ── 사용자 문서 ────────────────────────────────── */
export const createUserDoc = async (uid, nickname) => {
  await setDoc(doc(db, "users", uid), {
    nickname,
    stars: [],
    createdAt: Date.now(),
  });
};

export const getUserDoc = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

export const subscribeUser = (uid, cb) => {
  return onSnapshot(doc(db, "users", uid), (snap) => {
    cb(snap.exists() ? { uid: snap.id, ...snap.data() } : null);
  });
};

/* ── 월별 점수 (랭킹용) ──────────────────────────────
   monthly_scores/{month}/entries/{uid}   ← 서브컬렉션 구조
     uid, nickname
     bestScores: { sanrio: 30, ... }
     stars: ["sanrio", ...]
     starCount: number
     totalScore: number
     compositeScore: starCount * 1000 + totalScore  (단일 정렬 키)
     updatedAt: number

   서브컬렉션 + 단일 orderBy 만 써서 복합 인덱스 불필요
   ──────────────────────────────────────────── */

const entriesCollection = (month) =>
  collection(db, "monthly_scores", month, "entries");

const entryDoc = (month, uid) =>
  doc(db, "monthly_scores", month, "entries", uid);

export const getMyMonthlyDoc = async (uid, month = getCurrentMonth()) => {
  const snap = await getDoc(entryDoc(month, uid));
  return snap.exists() ? snap.data() : null;
};

/* 퀴즈 종료 시 호출
   - 이번달 최고점만 저장 (덮어쓰기 X, max 비교)
   - 30점이면 별딱지 영구 추가
*/
export const submitQuizScore = async ({ uid, nickname, category, score }) => {
  const month = getCurrentMonth();
  const entryRef = entryDoc(month, uid);

  const monthlySnap = await getDoc(entryRef);
  const cur = monthlySnap.exists()
    ? monthlySnap.data()
    : { uid, nickname, bestScores: {}, stars: [], starCount: 0, totalScore: 0 };

  const prevBest = cur.bestScores?.[category] || 0;
  const newBest = Math.max(prevBest, score);

  const bestScores = { ...(cur.bestScores || {}), [category]: newBest };
  const totalScore = Object.values(bestScores).reduce((a, b) => a + b, 0);

  const threshold = getStarThreshold(category);
  let stars = Array.isArray(cur.stars) ? [...cur.stars] : [];
  const wasAlreadyEarnedThisMonth = stars.includes(category);
  if (score >= threshold && !wasAlreadyEarnedThisMonth) {
    stars.push(category);
  }

  const starCount = stars.length;
  const compositeScore = starCount * STAR_WEIGHT + totalScore;

  await setDoc(
    entryRef,
    {
      uid,
      nickname,
      bestScores,
      stars,
      starCount,
      totalScore,
      compositeScore,
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  // 영구 별딱지 (users/{uid}.stars 누적)
  if (score >= threshold) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const userStars = userSnap.exists() ? (userSnap.data().stars || []) : [];
    if (!userStars.includes(category)) {
      await updateDoc(userRef, { stars: [...userStars, category] });
    }
  }

  return {
    newBest,
    prevBest,
    gotStar: score >= threshold && !wasAlreadyEarnedThisMonth,
  };
};

/* ── 랭킹 쿼리 (단일 orderBy로만 사용 — 복합 인덱스 불필요) ── */

// 종합 랭킹: compositeScore = starCount * 1000 + totalScore 단일 키
export const getTotalRanking = async (top = 5, month = getCurrentMonth()) => {
  const q = query(
    entriesCollection(month),
    orderBy("compositeScore", "desc"),
    limit(top)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

// 카테고리별 랭킹: bestScores.{category} 맵 서브필드 (자동 인덱싱)
export const getCategoryRanking = async (category, top = 5, month = getCurrentMonth()) => {
  const q = query(
    entriesCollection(month),
    orderBy(`bestScores.${category}`, "desc"),
    limit(top * 3)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => d.data())
    .filter((d) => (d.bestScores?.[category] || 0) > 0)
    .slice(0, top)
    .map((d) => ({ nickname: d.nickname, score: d.bestScores[category] }));
};

// 내 순위 (이번달, 종합 기준 - 클라이언트 findIndex)
export const getMyRank = async (uid, month = getCurrentMonth()) => {
  const q = query(
    entriesCollection(month),
    orderBy("compositeScore", "desc")
  );
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => d.data());
  const idx = all.findIndex((d) => d.uid === uid);
  if (idx < 0) return null;
  return { rank: idx + 1, ...all[idx] };
};

// 지난달 챔피언
export const getLastMonthChampion = async () => {
  const lastMonth = getLastMonth();
  const q = query(
    entriesCollection(lastMonth),
    orderBy("compositeScore", "desc"),
    limit(1)
  );
  const snap = await getDocs(q);
  return snap.docs[0]?.data() || null;
};
