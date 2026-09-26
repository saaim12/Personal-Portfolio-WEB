"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** stagger helper, in seconds */
  delay?: number;
  /** element to render, use "li" inside a list, where a div would be invalid */
  as?: "div" | "li";
  style?: CSSProperties;
  className?: string;
};

// Scroll reveal without Framer Motion. The library was ~34 KB gzip to fade
// something in and move it 12px; this does the same job with one observer and
// a CSS class. The animation is opacity + transform only, so it stays on the
// compositor and never triggers layout.
export function Reveal({ children, delay = 0, as = "div", style, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (or already past): show it rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("isVisible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          io.disconnect(); // reveal once
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    el.classList.add("revealReady");
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal${className ? ` ${className}` : ""}`,
      style: { width: "100%", "--reveal-delay": `${delay * 1000}ms`, ...style } as CSSProperties,
    },
    children,
  );
}
