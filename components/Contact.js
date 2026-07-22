"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingObjects from "./FloatingObjectsLazy";
import { useReducedMotion } from "@/hooks";
import { EASE_OUT, DURATION } from "@/motion";
import { contact } from "@/content";
import { contactObjects } from "@/objects";
import styles from "./Contact.module.css";

export default function Contact() {
  const reduced = useReducedMotion();
  const reveal = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DURATION.fast } } }
    : {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
      };
  const viewport = { once: true, margin: "-12% 0px" };

  return (
    <section id="contact" className={`${styles.contact} section`}>
      <FloatingObjects objects={contactObjects} label="contact cluster" />

      <div className={styles.inner}>
        <span className={styles.marker}>{contact.marker}</span>

        <motion.h2
          className={styles.heading}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {contact.heading}
        </motion.h2>

        <motion.div
          className={styles.ctas}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {contact.ctas.map((cta) => (
            <MagneticButton
              key={cta.label}
              as="a"
              href={cta.href}
              className={styles.cta}
              data-cursor="→"
            >
              {cta.label}
            </MagneticButton>
          ))}
        </motion.div>

        <motion.ul
          className={styles.links}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {contact.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={styles.link}
                data-cursor="→"
                target="_blank"
                rel="noreferrer noopener"
              >
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
