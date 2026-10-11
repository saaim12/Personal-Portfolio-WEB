"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

// Emit each reading-depth milestone once per homepage visit.
const DEPTHS = [25, 50, 75, 100] as const;

export function Track() {
  useEffect(() => {
    const seen = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // A page shorter than the viewport is 100% read the moment it loads.
      const pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
      for (const d of DEPTHS) {
        // Half a percent of slack: sub-pixel scroll heights mean the bottom
        // of a long page often lands at 99.7%.
        if (!seen.has(d) && pct >= d - 0.5) {
          seen.add(d);
          track("scroll_depth", { depth: d });
        }
      }
      if (seen.size === DEPTHS.length) window.removeEventListener("scroll", onScroll);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
