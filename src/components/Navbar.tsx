"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Layers } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("portal_user");
      if (storedUser) {
        setUserName(storedUser);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portal_user");
    }
    router.push("/login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoBadge}>
            <Layers size={16} strokeWidth={2} />
          </div>
          <span className={styles.title}>Portal NG</span>
        </div>

        <div className={styles.userMenu}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
            <span className={styles.userName}>{userName}</span>
          </div>

          <ThemeToggle />

          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={14} strokeWidth={1.75} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
