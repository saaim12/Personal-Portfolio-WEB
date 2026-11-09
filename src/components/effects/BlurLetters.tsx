"use client";
import { useEffect, useRef } from "react";

/** Large letters that sharpen into view and blur near the pointer. */
export function BlurLetters({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = root.current; if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".blurLetter"));
    let pointer = { x: -1e4, y: -1e4 }, entry = 0, frame = 0;
    const draw = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const visible = Math.min(1, Math.max(0, (window.innerHeight - box.top) / (window.innerHeight * 0.55)));
      entry = visible;
      letters.forEach((letter, index) => {
        const r = letter.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - pointer.x, r.top + r.height / 2 - pointer.y);
        const near = Math.max(0, 1 - d / Math.max(140, r.height * 1.1));
        const reveal = Math.max(0, Math.min(1, entry * 1.6 - index / letters.length * 0.6));
        const blur = near * 16 + (1 - reveal) * 18;
        letter.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "";
        letter.style.opacity = String(0.25 + 0.75 * reveal);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const move = (event: PointerEvent) => { pointer = { x: event.clientX, y: event.clientY }; schedule(); };
    const leave = () => { pointer = { x: -1e4, y: -1e4 }; schedule(); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); letters.forEach(l => { l.style.filter = ""; l.style.opacity = ""; }); };
  }, []);
  return <span ref={root} className="blurLetters">{Array.from(text).map((c, i) => c === " " ? " " : <span className="blurLetter" key={i}>{c}</span>)}</span>;
}
