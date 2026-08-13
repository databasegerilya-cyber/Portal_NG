import LoginForm from "@/components/LoginForm";
import ThemeToggle from "@/components/ThemeToggle";
import { Layers } from "lucide-react";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.loginWrapper}>
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>

      {/* Background ambient blobs */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
      </div>

      <div className={`${styles.loginCard} glass-card`}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <Layers size={22} strokeWidth={2} />
          </div>
          <h1 className={styles.title}>Portal NG</h1>
          <p className={styles.subtitle}>Masuk ke akun internal Anda</p>
        </div>

        <LoginForm />
      </div>

      <footer className={styles.footer}>
        &copy; 2026 Portal NG. All rights reserved.
      </footer>
    </main>
  );
}
