"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@once-ui-system/core";

// Toggles data-theme between dark/light and persists to localStorage.
// The inline script in layout.tsx reads that value on first paint (no flash).
export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as "dark" | "light") ||
      "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("data-theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <IconButton
      onClick={toggle}
      icon={theme === "dark" ? "sun" : "moon"}
      variant="ghost"
      size="m"
      tooltip={theme === "dark" ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle color theme"
    />
  );
};
