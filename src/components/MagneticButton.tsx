"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a CTA so it leans gently toward the cursor, then springs back.
// Pointer devices only (fine pointer, motion allowed) — otherwise it's an
// inert inline wrapper, so touch + keyboard behaviour is untouched.
export function MagneticButton({
  children,
  strength = 0.3,
  max = 8,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(my, { stiffness: 200, damping: 15, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? reset : undefined}
    >
      {children}
    </motion.div>
  );
}
