"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks";

// Shared scroll context: exposes scrollTo so Nav can smooth-scroll to
// sections (or to top) and fall back to native behaviour when Lenis is off.
const ScrollContext = createContext({ scrollTo: () => {} });

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Reduced motion: no Lenis, no inertia. Native scrolling only.
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = (target) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
      return;
    }
    // Fallback (reduced motion / not yet mounted).
    if (target === 0 || target === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el =
      typeof target === "string" ? document.querySelector(target) : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
