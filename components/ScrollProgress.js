"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.css";

// Thin top progress bar. Lenis drives native scroll position, so Framer's
// useScroll reads it directly — no extra wiring needed.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.4,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
