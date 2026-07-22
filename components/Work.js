"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInteractiveAllowed } from "@/hooks";
import { EASE_OUT, DURATION, SPRING } from "@/motion";
import { work } from "@/content";
import styles from "./Work.module.css";

const rowVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};
const rowVariantReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast } },
};

export default function Work() {
  const allowed = useInteractiveAllowed();

  // Single preview swatch that follows the cursor near the hovered row.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING.snappy);
  const y = useSpring(my, SPRING.snappy);
  const [hovered, setHovered] = useState(null); // index or null

  const onMove = (e) => {
    if (!allowed) return;
    mx.set(e.clientX + 28);
    my.set(e.clientY - 40);
  };

  return (
    <section id="work" className={`${styles.work} section`}>
      <div className={styles.head}>
        <span className={styles.marker}>{work.marker}</span>
        <h2 className={styles.heading}>{work.heading}</h2>
      </div>

      <ul className={styles.rows} onMouseMove={onMove}>
        {work.projects.map((p, i) => (
          <motion.li
            key={p.name}
            className={styles.rowWrap}
            variants={allowed ? rowVariant : rowVariantReduced}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <a
              href={p.href}
              className={styles.row}
              data-cursor="explore"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              aria-label={`${p.name} — view project`}
            >
              <span className={styles.fill} aria-hidden="true" />
              <div className={styles.rowMain}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.desc}>{p.description}</span>
              </div>
              <div className={styles.rowMeta}>
                <span className={styles.tech}>{p.tech}</span>
                <span className={styles.explore} aria-hidden="true">explore →</span>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      {allowed && (
        <motion.div
          className={styles.swatch}
          aria-hidden="true"
          style={{ x, y }}
          data-tint={hovered != null ? work.projects[hovered].tint : "steel"}
          animate={{
            opacity: hovered != null ? 1 : 0,
            scale: hovered != null ? 1 : 0.6,
          }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        />
      )}
    </section>
  );
}
