"use client";
import { useEffect, useRef, useState } from "react";

/** Counts up to a value with a brief colour-split glitch when it scrolls into view. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const [rolling, setRolling] = useState(false);
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current; if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now(), duration = 1100;
      setRolling(true);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) frame = requestAnimationFrame(tick); else setRolling(false);
      };
      setDisplay(0); frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={el} className={`countUp${rolling ? " isRolling" : ""}`}><span aria-hidden="true">{display}{suffix}</span><span className="screenReaderText">{value}{suffix}</span></span>;
}
