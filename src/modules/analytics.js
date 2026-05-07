import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import app from "./firebase";

let _analytics = null;
let _initPromise = null;

const ensureAnalytics = async () => {
  if (_analytics) return _analytics;
  if (!_initPromise) {
    _initPromise = isSupported().then((ok) => {
      if (ok) {
        _analytics = getAnalytics(app);
      }
      return _analytics;
    });
  }
  return _initPromise;
};

const safeLog = async (eventName, params = {}) => {
  try {
    const a = await ensureAnalytics();
    if (a) logEvent(a, eventName, params);
  } catch (e) {
    // 분석 실패는 silent — 사용자 경험에 영향 X
    if (import.meta.env.DEV) console.warn("[analytics]", eventName, e);
  }
};

/* ── 페이지 뷰 ── */
export const trackPageView = (path, title) =>
  safeLog("page_view", { page_path: path, page_title: title });

/* ── 퀴즈 ── */
export const trackQuizStart = (category, mode) =>
  safeLog("quiz_start", { category, mode });

export const trackQuizComplete = (category, score, mode) =>
  safeLog("quiz_complete", { category, score, mode });

export const trackQuizAnswer = (category, isCorrect, qIndex) =>
  safeLog("quiz_answer", { category, correct: isCorrect ? 1 : 0, question_index: qIndex });

/* ── 카테고리 ── */
export const trackCategorySelect = (category) =>
  safeLog("category_select", { category });

/* ── 별딱지 / 랭킹 ── */
export const trackStarEarned = (category) =>
  safeLog("star_earned", { category });

export const trackRankCheck = (category, score) =>
  safeLog("rank_check", { category, score });

export const trackRankingTab = (tab) =>
  safeLog("ranking_tab", { tab });

/* ── 인증 ── */
export const trackSignUp = () => safeLog("sign_up", { method: "nickname" });
export const trackSignIn = () => safeLog("login", { method: "nickname" });

/* ── 공유 ── */
export const trackShare = (channel, category) =>
  safeLog("share", { channel, category });
