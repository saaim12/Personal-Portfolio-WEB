"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { EASE_OUT } from "@/motion";
import { preloader as copy } from "@/content";
import styles from "./Preloader.module.css";

// First-load overlay: mono counter 000 → 100, wordmark beneath, then a
// wipe-up reveal. onComplete fires as the wipe starts so the hero can
// stagger in right behind it. Reduced motion: skip the count, fade fast.
export default function Preloader({ onComplete }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setCount(100);
      const t = setTimeout(() => finish(), 260);
      return () => clearTimeout(t);
    }

    const DURATION = 1200;
    const start = performance.now();
    let rafId;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out feel on the number itself
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => finish(), 180);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const finish = () => {
    onComplete?.();
    setGone(true);
  };

  const pad = String(count).padStart(3, "0");

  return (
    <motion.div
      className={styles.overlay}
      initial={{ y: 0 }}
      animate={gone ? (reduced ? { opacity: 0 } : { y: "-100%" }) : {}}
      transition={{ duration: reduced ? 0.3 : 0.9, ease: EASE_OUT }}
      onAnimationComplete={() => {
        if (gone) {
          // fully hidden — remove from flow via display:none class
          const el = document.getElementById("preloader-root");
          if (el) el.style.display = "none";
        }
      }}
      id="preloader-root"
      aria-hidden={gone ? "true" : undefined}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.inner}>
        <span className={styles.counter}>{pad}</span>
        <span className={styles.wordmark}>{copy.wordmark}</span>
      </div>
    </motion.div>
  );
}
