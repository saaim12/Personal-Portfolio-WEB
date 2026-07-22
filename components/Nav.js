"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useSmoothScroll } from "./SmoothScroll";
import { nav } from "@/content";
import styles from "./Nav.module.css";

export default function Nav() {
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
    setScrolled(v > 0.01);
  });

  // Active section highlight via intersection observer.
  useEffect(() => {
    const ids = nav.links.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <MagneticButton
          as="a"
          href="#top"
          className={styles.wordmark}
          data-cursor="top"
          aria-label="Scroll to top"
          onClick={(e) => go(e, 0)}
        >
          {nav.wordmark}
        </MagneticButton>

        <div className={styles.right}>
          <ul className={styles.links}>
            {nav.links.map((l) => (
              <li key={l.href}>
                <MagneticButton
                  as="a"
                  href={l.href}
                  data-cursor="→"
                  className={`${styles.link} ${
                    active === l.href.replace("#", "") ? styles.linkActive : ""
                  }`}
                  onClick={(e) => go(e, l.href)}
                >
                  {l.label}
                </MagneticButton>
              </li>
            ))}
          </ul>
          <span className={styles.pct} aria-hidden="true">
            {String(pct).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </nav>
  );
}
