"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("portal_theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("portal_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  if (!mounted) {
    return <div className={styles.placeholder} />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggleBtn}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Mode ${theme === "light" ? "Gelap" : "Terang"}`}
    >
      {theme === "light" ? (
        <Moon size={16} strokeWidth={1.75} />
      ) : (
        <Sun size={16} strokeWidth={1.75} />
      )}
    </button>
  );
}
