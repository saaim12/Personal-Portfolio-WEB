"use client";

import { motion } from "framer-motion";
import FloatingObjects from "./FloatingObjectsLazy";
import { useReducedMotion } from "@/hooks";
import { EASE_OUT, DURATION } from "@/motion";
import { about } from "@/content";
import { aboutObjects } from "@/objects";
import styles from "./About.module.css";

export default function About() {
  const reduced = useReducedMotion();

  const reveal = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DURATION.fast } } }
    : {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
      };

  const viewport = { once: true, margin: "-15% 0px" };

  return (
    <section id="about" className={`${styles.about} section`}>
      <FloatingObjects objects={aboutObjects} label="about cluster" />

      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className={styles.marker}>{about.marker}</span>
          <h2 className={styles.heading}>{about.heading}</h2>
        </motion.div>

        <motion.p
          className={styles.lead}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {about.lead}
        </motion.p>

        <div className={styles.experience}>
          {about.experience.map((x) => (
            <motion.div
              key={x.role}
              className={styles.expItem}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <span className={styles.expDate}>{x.date}</span>
              <div className={styles.expBody}>
                <h3 className={styles.expRole}>{x.role}</h3>
                <p className={styles.expDetail}>{x.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          className={styles.quote}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <p className={styles.quoteText}>“{about.quote.text}”</p>
          <cite className={styles.quoteCite}>— {about.quote.attribution}</cite>
        </motion.blockquote>

        <motion.div
          className={styles.tagsBlock}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className={styles.tagsIntro}>{about.tagsIntro}</span>
          <ul className={styles.tags}>
            {about.tags.map((t) => (
              <li key={t} className={styles.tag}>{t}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
