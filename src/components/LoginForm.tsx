"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, LogIn, AlertCircle } from "lucide-react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate small latency for UI feel
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (username.trim() === "admin" && password === "admin123") {
      if (typeof window !== "undefined") {
        localStorage.setItem("portal_user", "Admin");
      }
      router.push("/dashboard");
    } else {
      setError("Username atau password salah");
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} strokeWidth={1.75} />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <div className={styles.inputWrapper}>
          <User size={16} strokeWidth={1.75} className={styles.inputIcon} />
          <input
            id="username"
            type="text"
            className={`${styles.input} ${styles.inputWithIcon}`}
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={styles.inputWrapper}>
          <Lock size={16} strokeWidth={1.75} className={styles.inputIcon} />
          <input
            id="password"
            type="password"
            className={`${styles.input} ${styles.inputWithIcon}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className={styles.spinner} />
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <LogIn size={16} strokeWidth={1.75} />
            <span>Masuk</span>
          </>
        )}
      </button>

      <p className={styles.hint}>
        Akun demo: <code>admin</code> / <code>admin123</code>
      </p>
    </form>
  );
}
