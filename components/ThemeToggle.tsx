"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "apidark";

  return (
    <button
      onClick={() => setTheme(isDark ? "apilight" : "apidark")}
      className="btn btn-ghost btn-sm btn-square"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode (t)" : "Switch to dark mode (t)"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
