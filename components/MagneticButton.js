"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInteractiveAllowed } from "@/hooks";
import { MAGNETIC_MAX, SPRING } from "@/motion";

// Wraps any control so it leans toward the pointer within its bounds, then
// springs back on leave. Disabled entirely on touch / reduced motion — there
// it renders a plain element so keyboard + tap behaviour stay intact.
export default function MagneticButton({
  as = "button",
  children,
  className,
  strength = 0.4,
  ...rest
}) {
  const allowed = useInteractiveAllowed();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING.magnetic);
  const y = useSpring(my, SPRING.magnetic);

  const clamp = (v) => Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, v));

  const onMove = (e) => {
    if (!allowed || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    mx.set(clamp(relX * strength));
    my.set(clamp(relY * strength));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const MotionTag = motion[as] || motion.button;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={allowed ? { x, y } : undefined}
      onMouseMove={allowed ? onMove : undefined}
      onMouseLeave={allowed ? onLeave : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
