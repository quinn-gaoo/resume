import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all group"
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-muted-foreground group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
