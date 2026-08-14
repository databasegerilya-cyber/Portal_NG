import Link from "next/link";
import styles from "./login/page.module.css";

export default function NotFound() {
  return (
    <main className={styles.loginWrapper}>
      <div className={`${styles.loginCard} glass-card`} style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>404</h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
          Halaman yang Anda cari tidak ditemukan.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "0.625rem 1.25rem",
            backgroundColor: "var(--color-btn)",
            color: "var(--color-btn-text)",
            borderRadius: "var(--radius-sm)",
            fontWeight: 500,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </main>
  );
}
