"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-paper-300 dark:border-warmblack-100" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full border border-paper-300 dark:border-warmblack-100 hover:border-saffron text-foreground transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-saffron transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-warmblack-900 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
