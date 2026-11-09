"use client";
import { useEffect, useRef } from "react";

/** Decorative sunflower-pattern dot circle behind the hero name. Static under reduced motion. */
export function HeroDots() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current; const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const golden = Math.PI * (3 - Math.sqrt(5));
    const count = 520;
    let size = 0, frame = 0, visible = true, pointer = { x: -1e4, y: -1e4 }, smooth = { x: 0, y: 0 }, pull = 0, start = performance.now();
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      size = el.clientWidth;
      el.width = el.height = Math.round(size * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      const t = reduced.matches ? 0 : (time - start) / 1000;
      const c = size / 2, radius = size * 0.46;
      const inside = Math.hypot(pointer.x - c, pointer.y - c) < radius * 1.25;
      pull += ((inside ? 1 : 0) - pull) * 0.08;
      if (inside) { smooth.x += (pointer.x - smooth.x) * 0.15; smooth.y += (pointer.y - smooth.y) * 0.15; }
      ctx.clearRect(0, 0, size, size);
      for (let i = 0; i < count; i++) {
        const r = radius * Math.sqrt((i + 0.5) / count);
        const angle = i * golden + t * 0.06;
        const breathe = 1 + Math.sin(t * 0.8 + i * 0.05) * 0.015;
        let x = c + Math.cos(angle) * r * breathe, y = c + Math.sin(angle) * r * breathe;
        if (pull > 0.01) {
          // Dots near the cursor are drawn in and swirl around it.
          const dx = x - smooth.x, dy = y - smooth.y, dist = Math.hypot(dx, dy), reach = size * 0.34;
          if (dist < reach) {
            const f = Math.pow(1 - dist / reach, 2) * pull, turn = f * 1.4, cos = Math.cos(turn), sin = Math.sin(turn);
            const rx = dx * cos - dy * sin, ry = dx * sin + dy * cos;
            x = smooth.x + rx * (1 - f * 0.6); y = smooth.y + ry * (1 - f * 0.6);
          }
        }
        const edge = r / radius;
        ctx.globalAlpha = 0.18 + 0.32 * (1 - edge);
        ctx.fillStyle = "#6E6D69";
        ctx.beginPath();
        ctx.ellipse(x, y, 1.6 + 1.6 * (1 - edge), 3.4 + 1.2 * (1 - edge), angle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (visible && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    const restart = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    const move = (event: PointerEvent) => { const box = el.getBoundingClientRect(); if (reduced.matches) return; pointer = { x: event.clientX - box.left, y: event.clientY - box.top }; };
    const leave = () => { pointer = { x: -1e4, y: -1e4 }; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) restart(); });
    resize(); restart(); observer.observe(el);
    const onResize = () => { resize(); restart(); };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", restart);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); reduced.removeEventListener("change", restart); };
  }, []);
  return <canvas ref={canvas} className="heroDots" aria-hidden="true" />;
}
