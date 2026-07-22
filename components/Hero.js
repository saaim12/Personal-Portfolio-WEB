"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingObjects from "./FloatingObjectsLazy";
import { useSmoothScroll } from "./SmoothScroll";
import { useReducedMotion } from "@/hooks";
import { EASE_OUT, DURATION } from "@/motion";
import { hero } from "@/content";
import { heroObjects } from "@/objects";
import styles from "./Hero.module.css";

// Signature moment: each headline WORD rises + sharpens from blur in a
// stagger. Kicks off only once the preloader hands over (`start`).
export default function Hero({ start }) {
  const reduced = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const [scrolledOnce, setScrolledOnce] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 12) setScrolledOnce(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const word = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DURATION.fast } } }
    : {
        hidden: { opacity: 0, y: "0.6em", filter: "blur(12px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: DURATION.slow, ease: EASE_OUT },
        },
      };
  const fade = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DURATION.fast } } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
      };

  const onCta = (e, cta) => {
    if (cta.kind === "anchor") {
      e.preventDefault();
      scrollTo(cta.href);
    }
  };

  return (
    <header id="top" className={`${styles.hero} section`}>
      <FloatingObjects objects={heroObjects} label="hero cluster" />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate={start ? "show" : "hidden"}
      >
        <span className={styles.marker} aria-hidden="true">000</span>

        <h1 className={styles.headline}>
          {hero.headlineLines.map((line, li) => (
            <span className={styles.line} key={li}>
              {line.map((w, wi) => (
                <span className={styles.wordMask} key={wi}>
                  <motion.span className={styles.word} variants={word}>
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p className={styles.subline} variants={fade}>
          {hero.subline}
        </motion.p>

        <motion.div className={styles.ctas} variants={fade}>
          {hero.ctas.map((cta) => (
            <MagneticButton
              key={cta.label}
              as="a"
              href={cta.href}
              className={styles.cta}
              data-cursor="→"
              onClick={(e) => onCta(e, cta)}
            >
              {cta.label}
            </MagneticButton>
          ))}
        </motion.div>

        <motion.ul className={styles.tags} variants={fade} aria-label="Core tech">
          {hero.techTags.map((t) => (
            <li key={t} className={styles.tag}>{t}</li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.span
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: start && !scrolledOnce ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: start ? 0.8 : 0 }}
        aria-hidden="true"
      >
        {hero.scrollHint}
      </motion.span>
    </header>
  );
}
