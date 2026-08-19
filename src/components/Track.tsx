"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

// One delegated click listener and one scroll listener for the whole page.
//
// The alternative was an onClick on every CTA, which would have turned the
// hero, the project cards and the contact block into client components to fire
// an analytics call. Instead anything worth counting carries `data-track` and
// stays server-rendered. `name:id` splits into an event and a property, so
// five project cards group under one event in the dashboard rather than
// arriving as five unrelated rows.
const DEPTHS = [25, 50, 75, 100] as const;

export function Track() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track");
      if (!name) return;
      const [event, id] = name.split(":");
      track(event, id ? { id } : undefined);
    };
    // Capture, so the event is sent before a navigation starts tearing the
    // document down.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

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
