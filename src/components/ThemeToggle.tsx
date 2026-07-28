"use client";

import { useEffect, useState } from "react";
import { IconButton, useTheme } from "@once-ui-system/core";

// Once UI's ThemeProvider is the single source of truth: it owns both the
// data-theme attribute and the localStorage write. Setting the attribute
// directly here would leave the provider's own state stale, and its style
// effect would then revert the toggle on the next render.
export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server renders the dark default; only trust resolvedTheme once the
  // client has hydrated, otherwise the icon mismatches on a saved light theme.
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <IconButton
      onClick={() => setTheme(isDark ? "light" : "dark")}
      icon={isDark ? "sun" : "moon"}
      variant="ghost"
      size="m"
      tooltip={isDark ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle color theme"
    />
  );
};
