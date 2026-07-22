"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotion, useCoarsePointer } from "@/hooks";
import { FLOAT, SPRING } from "@/motion";
import styles from "./FloatingObjects.module.css";

// ─────────────────────────────────────────────────────────────
// The signature element. Renders a set of glossy gradient shapes with:
//   • ambient CSS drift (per-object, staggered)
//   • scroll parallax (depth = further back moves slower)
//   • pointer parallax (spring-damped lean toward the cursor)
// Heavy — fully gated: reduced-motion & touch render a static subset.
//
// `objects` prop shape (all optional except shape/color):
//   { shape: "sphere"|"cube"|"pill"|"ring", color: "blue"|..., size,
//     x, y (%, from top-left), depth (0..1), dur (s), delay (s) }
// ─────────────────────────────────────────────────────────────
export default function FloatingObjects({ objects = [], label = "decorative" }) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const fieldRef = useRef(null);

  // Pointer position normalized to -1..1 from viewport centre.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, SPRING.soft);
  const spy = useSpring(py, SPRING.soft);

  // Scroll progress across this field's lifetime in the viewport.
  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start end", "end start"],
  });

  const heavy = !reduced && !coarse;

  useEffect(() => {
    if (!heavy) return;
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [heavy, px, py]);

  // On touch, show only the first 2–3 shapes, static.
  const list = coarse ? objects.slice(0, 3) : objects;

  return (
    <div
      ref={fieldRef}
      className={styles.field}
      aria-hidden="true"
      data-label={label}
    >
      {list.map((o, i) => (
        <FloatObj
          key={i}
          o={o}
          heavy={heavy}
          reduced={reduced}
          scrollYProgress={scrollYProgress}
          spx={spx}
          spy={spy}
        />
      ))}
    </div>
  );
}

function FloatObj({ o, heavy, reduced, scrollYProgress, spx, spy }) {
  const depth = o.depth ?? 0.5;

  // Scroll parallax: shift as the field travels through the viewport.
  const scrollShift = useTransform(
    scrollYProgress,
    [0, 1],
    [FLOAT.parallax * depth, -FLOAT.parallax * depth]
  );
  // Pointer lean: opposite sign gives a "look-around" depth feel.
  const leanX = useTransform(spx, (v) => -v * FLOAT.pointerLean * depth);
  const leanY = useTransform(spy, (v) => -v * FLOAT.pointerLean * depth);

  const anchorStyle = {
    left: `${o.x}%`,
    top: `${o.y}%`,
  };

  // Reduced motion / touch: static placement, no parallax, no drift.
  if (!heavy) {
    return (
      <div className={styles.anchor} style={anchorStyle}>
        <Shape o={o} drift={!reduced && false} />
      </div>
    );
  }

  return (
    <motion.div
      className={styles.anchor}
      style={{ ...anchorStyle, y: scrollShift }}
    >
      <motion.div style={{ x: leanX, y: leanY }}>
        <Shape o={o} drift />
      </motion.div>
    </motion.div>
  );
}

function Shape({ o, drift }) {
  const shapeClass = styles[o.shape] || styles.sphere;
  const colorClass = styles[o.color] || styles.steel;
  const style = {
    "--size": `${o.size ?? 120}px`,
    "--dur": `${o.dur ?? 9}s`,
    "--delay": `${o.delay ?? 0}s`,
    "--drift-y": `${FLOAT.driftY}px`,
    "--drift-rot": `${FLOAT.driftRotate}deg`,
  };
  return (
    <div className={drift ? styles.drift : undefined}>
      <div className={`${styles.shape} ${shapeClass} ${colorClass}`} style={style} />
    </div>
  );
}
