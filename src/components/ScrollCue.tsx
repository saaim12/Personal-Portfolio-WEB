"use client";

import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

// Removes the one ambiguity a capped hero leaves: whether the page continues.
// Decoration, not a control. It is `aria-hidden` and not focusable, because
// the sticky section bar and the sections themselves are the real affordance
// and a screen reader has already been told they exist.
//
// The bob itself is CSS, and the reduced-motion block in custom.css turns it
// off along with everything else that moves.
export function ScrollCue() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onScroll = () => setGone(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span className={`scrollCue${gone ? " scrollCueOut" : ""}`} aria-hidden="true">
      <HiChevronDown />
    </span>
  );
}
