"use client";

import { useEffect, useRef } from "react";
import styles from "./ScreenCrawler.module.scss";

export function ScreenCrawler() {
  const antRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ant = antRef.current;
    if (!ant) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    const draw = (time: number) => {
      elapsed += previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      const t = elapsed / 12000;
      const rx = Math.max(0, width / 2 - 36);
      const ry = Math.max(0, height / 2 - 48);
      const x = width / 2 + rx * Math.sin(t);
      const y = height / 2 + ry * Math.sin(t * 1.7 + 1);
      const angle = Math.atan2(ry * 1.7 * Math.cos(t * 1.7 + 1), rx * Math.cos(t));
      ant.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      const active = !motion.matches && !document.hidden;
      ant.dataset.active = String(active);
      if (active) frame = requestAnimationFrame(draw);
    };
    sync();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={antRef} className={styles.crawler} aria-hidden="true">
      <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true">
        <g className={styles.legsA} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14 22 9 26 7M15 18 13 23 17 26M12 14 9 10 5 9" />
        </g>
        <g className={styles.legsB} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 18 22 23 26 25M15 14 13 9 17 6M12 18 9 22 5 23" />
        </g>
        <ellipse cx="8" cy="16" rx="5" ry="3.5" />
        <ellipse cx="16" cy="16" rx="3.5" ry="2.3" />
        <ellipse cx="23" cy="16" rx="3.2" ry="2.8" />
        <path d="M25 14 28 11 30 12M25 18 28 21 30 20" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
      </svg>
    </div>
  );
}
