"use client";
import { useEffect, useRef } from "react";

/** Words darken from grey to ink as the block scrolls through the viewport. Full ink without JS or with reduced motion. */
export function WordReveal({ text }: { text: string }) {
  const root = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".revealWord"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect(), view = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (view * 0.85 - box.top) / (box.height + view * 0.35)));
      const lit = Math.round(progress * words.length);
      words.forEach((word, index) => word.classList.toggle("isLit", index < lit));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    el.classList.add("revealReady"); update();
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); el.classList.remove("revealReady"); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return <span ref={root} className="wordReveal">{text.split(/(\s+)/).map((part, index) => /\s/.test(part) ? part : <span className="revealWord" key={index}>{part}</span>)}</span>;
}
