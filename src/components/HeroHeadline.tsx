"use client";

import { Heading } from "@once-ui-system/core";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// Hero-only word stagger: keeps the Once UI Heading (variant + wrap), but
// splits the text into words that rise + fade in sequence on load.
// Reduced motion → words just fade, no transform.
export function HeroHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: "0.4em" },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <Heading
      wrap="balance"
      variant="display-strong-l"
      // Fluid size so 3-line headlines never overflow on small screens;
      // tighter line-height so they don't dominate on mobile.
      style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.08 }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: "inline" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={word}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {i < words.length - 1 ? `${w} ` : w}
          </motion.span>
        ))}
      </motion.span>
    </Heading>
  );
}
