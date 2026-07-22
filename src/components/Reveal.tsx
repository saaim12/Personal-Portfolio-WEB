"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** stagger helper — delays the reveal (seconds) */
  delay?: number;
  /** vertical travel distance in px (ignored under reduced motion) */
  y?: number;
};

// Additive scroll-reveal wrapper. Fades + rises section content once as it
// enters the viewport. A full-width block wrapper, so it doesn't disturb the
// Once UI layout it wraps. Reduced motion → opacity only, no transform.
export function Reveal({ children, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
