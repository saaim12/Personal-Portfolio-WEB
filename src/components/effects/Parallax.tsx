"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Moves its content slightly against the scroll direction. */
export function Parallax({ children, className = "", strength = 60 }: { children: ReactNode; className?: string; strength?: number }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = el.firstElementChild as HTMLElement | null; if (!inner) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect(), view = window.innerHeight;
      const progress = (box.top + box.height / 2 - view / 2) / (view / 2 + box.height / 2);
      inner.style.transform = `translate3d(0, ${(Math.max(-1, Math.min(1, progress)) * strength).toFixed(1)}px, 0) scale(1.18)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [strength]);
  return <div ref={root} className={`parallax ${className}`}>{children}</div>;
}
