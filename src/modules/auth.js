import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUserDoc } from "./firestore";

const NICKNAME_DOMAIN = "@oz-quiz.local";

// 한글 등 비-ASCII도 안전하게 처리하기 위해 닉네임을 base64로 인코딩
// Firebase Auth는 이메일 로컬 부분에 ASCII만 허용
const toEmailLocal = (nick) => {
  const trimmed = nick.trim().toLowerCase();
  if (!trimmed) return "";
  try {
    const b64 = btoa(unescape(encodeURIComponent(trimmed)));
    return b64.replace(/=/g, "").replace(/\+/g, "x").replace(/\//g, "y").toLowerCase().slice(0, 32);
  } catch {
    return "";
  }
};

const toEmail = (nickname) => {
  const local = toEmailLocal(nickname);
  if (!local) throw new Error("닉네임이 비어있어요.");
  return `${local}${NICKNAME_DOMAIN}`;
};

export const signUp = async (nickname, password) => {
  const cleanNick = nickname.trim();
  if (cleanNick.length < 2) throw new Error("닉네임은 2자 이상이어야 해요.");
  if (password.length < 6) throw new Error("비밀번호는 6자 이상이어야 해요.");

  try {
    const cred = await createUserWithEmailAndPassword(auth, toEmail(cleanNick), password);
    await updateProfile(cred.user, { displayName: cleanNick });
    await createUserDoc(cred.user.uid, cleanNick);
    return cred.user;
  } catch (err) {
    // 이미 가입된 닉네임이면 자동으로 로그인 시도 (같은 비번이면 같은 uid 재사용)
    if (err?.code === "auth/email-already-in-use") {
      try {
        const cred = await signInWithEmailAndPassword(auth, toEmail(cleanNick), password);
        return cred.user;
      } catch (signInErr) {
        // 비번이 틀리면 명확한 메시지
        if (
          signInErr?.code === "auth/wrong-password" ||
          signInErr?.code === "auth/invalid-credential"
        ) {
          const e = new Error("이미 사용 중인 닉네임이에요. 비밀번호를 확인해주세요.");
          e.code = "auth/nickname-taken-wrong-password";
          throw e;
        }
        throw signInErr;
      }
    }
    throw err;
  }
};

export const signIn = async (nickname, password) => {
  return signInWithEmailAndPassword(auth, toEmail(nickname), password);
};

export const signOutUser = () => signOut(auth);

export const subscribeAuth = (cb) => onAuthStateChanged(auth, cb);

export const getAuthErrorMessage = (err) => {
  const code = err?.code || "";
  if (code.includes("nickname-taken-wrong-password")) return "이미 사용 중인 닉네임이에요. 비밀번호를 확인해주세요.";
  if (code.includes("email-already-in-use")) return "이미 사용 중인 닉네임이에요.";
  if (code.includes("invalid-email")) return "닉네임 형식이 올바르지 않아요.";
  if (code.includes("weak-password")) return "비밀번호가 너무 짧아요. (최소 6자)";
  if (code.includes("user-not-found")) return "닉네임을 찾을 수 없어요.";
  if (code.includes("wrong-password")) return "비밀번호가 틀렸어요.";
  if (code.includes("invalid-credential")) return "닉네임 또는 비밀번호가 틀렸어요.";
  if (code.includes("too-many-requests")) return "잠시 후 다시 시도해주세요.";
  return err?.message || "오류가 발생했어요. 다시 시도해주세요.";
};
