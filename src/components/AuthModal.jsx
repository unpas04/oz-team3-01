import { useState, useEffect } from "react";
import { signIn, signUp, getAuthErrorMessage } from "../modules/auth";
import { trackSignUp, trackSignIn } from "../modules/analytics";
import "../styles/auth-modal.css";

export default function AuthModal({ open, onClose, onSuccess, defaultMode = "signin" }) {
  const [mode, setMode] = useState(defaultMode); // "signin" | "signup"
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // 모달이 열릴 때마다 defaultMode 반영
  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setError("");
    }
  }, [open, defaultMode]);

  if (!open) return null;

  const reset = () => {
    setNickname("");
    setPassword("");
    setError("");
    setBusy(false);
  };

  const close = () => {
    reset();
    onClose?.();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUp(nickname, password);
        trackSignUp();
      } else {
        await signIn(nickname, password);
        trackSignIn();
      }
      reset();
      onSuccess?.();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-overlay active auth-modal-overlay" onClick={close}>
      <div
        className={`modal-card auth-modal-card auth-modal-${mode}`}
        onClick={(e) => e.stopPropagation()}
        key={mode}
      >
        <button className="modal-close" onClick={close} aria-label="닫기">✕</button>

        <div className="auth-mode-badge">
          <span className="auth-mode-icon" aria-hidden="true">
            {mode === "signup" ? "✦" : "🔑"}
          </span>
          <span className="auth-mode-tag">
            {mode === "signup" ? "SIGN UP" : "SIGN IN"}
          </span>
        </div>

        <h2 className="auth-title">
          {mode === "signup" ? "닉네임 만들기" : "다시 만나서 반가워요"}
        </h2>
        <p className="auth-subtitle">
          {mode === "signup"
            ? "닉네임과 비밀번호만 정해주세요 ✦"
            : "닉네임과 비밀번호를 입력해주세요"}
        </p>

        <form className="auth-form" onSubmit={submit}>
          <label className="auth-field">
            <span>닉네임</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 홍길동"
              autoComplete="username"
              maxLength={20}
              required
              disabled={busy}
            />
          </label>

          <label className="auth-field">
            <span>비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={6}
              required
              disabled={busy}
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit-btn" type="submit" disabled={busy}>
            {busy ? "처리 중..." : mode === "signup" ? "가입하고 시작" : "로그인"}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError("");
          }}
        >
          {mode === "signup"
            ? "닉네임이 있나요?"
            : "처음이에요? 닉네임 만들기"}
        </button>
      </div>
    </div>
  );
}
