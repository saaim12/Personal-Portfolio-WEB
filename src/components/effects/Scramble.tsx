"use client";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>?";

/** Text that resolves from random glyphs, left to right. Screen readers get the final text. */
export function Scramble({ text, play = true, hover = false, duration = 520 }: { text: string; play?: unknown; hover?: boolean; duration?: number }) {
  const [shown, setShown] = useState(text);
  const frame = useRef(0);
  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(text); return; }
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration), solved = Math.floor(t * text.length);
      setShown(Array.from(text, (c, i) => i < solved || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join(""));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  useEffect(() => { if (play) run(); return () => cancelAnimationFrame(frame.current); }, [play, text]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span className="scramble" onMouseEnter={hover ? run : undefined}><span className="scrambleSizer" aria-hidden="true">{text}</span><span className="scrambleLive" aria-hidden="true">{shown}</span><span className="screenReaderText">{text}</span></span>;
}
