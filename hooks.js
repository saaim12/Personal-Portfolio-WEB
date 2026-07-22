"use client";

import { useEffect, useState } from "react";

// SSR-safe media-query hook. Returns false on the server / first paint,
// then updates after mount so we never touch window during render.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// True when the user asked for reduced motion. Gate ALL physics on this.
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// True on touch / coarse pointers. Skip cursor-follow, magnetic, custom cursor.
export function useCoarsePointer() {
  return useMediaQuery("(pointer: coarse)");
}

// Convenience: are the heavy interactive effects allowed at all?
export function useInteractiveAllowed() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  return !reduced && !coarse;
}
