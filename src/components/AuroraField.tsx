"use client";

import { useEffect, useRef } from "react";

// Site-wide backdrop: four monochrome aurora blobs drifting on a black
// gradient, over a constellation of points that link to their neighbours and
// to the cursor.
//
// It sits fixed at z-index -1, which puts it above the page background and
// below every in-flow element, no z-index has to be added to the content for
// it to stay readable.
//
// Everything is one canvas: the alternative (blurred DOM blobs plus an SVG
// line layer) is more nodes, more compositing, and cannot draw the
// cursor-proximity links at all.
//
// Cost control, in order of how much each one buys:
//   - the aurora repaints on every third frame into an offscreen canvas and
//     is blitted on the other two. It drifts at ~0.0002 rad/ms, so 20fps is
//     indistinguishable from 60 and it is the expensive half of the frame
//     (four full-screen radial gradients);
//   - the neighbour pass is O(n²) and n follows viewport area, so a phone
//     runs ~17 points (~140 pairs) where a desktop runs ~68 (~2,300);
//   - it stops entirely while the tab is in the background.

const LINK_DISTANCE = 150;
const CURSOR_DISTANCE = 180;
const AURORA_EVERY = 3;

// Point count follows viewport area, so the constellation keeps a constant
// visual density instead of thinning out across a wide desktop. A fixed count
// looks right at exactly one screen size and sparse everywhere above it.
//
// One point per ~19k CSS px² puts a 1440×900 desktop at ~68 and a 390×844
// phone at ~17. Clamped at 140 because the neighbour pass is O(n²): 140 is
// ~9,700 pairs a frame, which is the ceiling worth paying for an ultrawide.
const POINT_DENSITY = 19_000;
const pointCount = (w: number, h: number) =>
  Math.max(24, Math.min(140, Math.round((w * h) / POINT_DENSITY)));

// c: rgb triplet, ax/ay: drift amplitude, r: radius as a fraction of the
// short edge, sx/sy: drift speed, px/py: phase offset, a: peak alpha.
const BLOBS = [
  { c: "255,255,255", ax: 0.34, ay: 0.26, r: 0.56, sx: 0.0002, sy: 0.00025, px: 0, py: 1, a: 0.16 },
  { c: "150,155,165", ax: 0.32, ay: 0.24, r: 0.48, sx: 0.00026, sy: 0.00017, px: 2, py: 0, a: 0.16 },
  { c: "90,90,100", ax: 0.3, ay: 0.3, r: 0.44, sx: 0.00016, sy: 0.00028, px: 1, py: 3, a: 0.2 },
  { c: "200,200,210", ax: 0.28, ay: 0.22, r: 0.38, sx: 0.0003, sy: 0.00021, px: 3, py: 2, a: 0.13 },
];

export function AuroraField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    // The aurora half of the frame, cached. Sized in device pixels and drawn
    // through the same dpr transform so it lines up 1:1 with the live canvas.
    const aurora = document.createElement("canvas");
    const auroraCtx = aurora.getContext("2d");
    if (!auroraCtx) return;
    let auroraAge = AURORA_EVERY;

    // Positions are normalised 0..1, so they survive a resize untouched; only
    // the length of the array has to follow the viewport.
    const pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const spawn = () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
    });
    const fitPoints = () => {
      const want = pointCount(w, h);
      while (pts.length < want) pts.push(spawn());
      pts.length = Math.min(pts.length, want);
    };

    const resize = () => {
      // Capped at 1.5 rather than 2: this is a dimmed backdrop behind the
      // page, so the extra pixels of a 3x phone are paid for and never seen.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      for (const c of [canvas, aurora]) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      auroraCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      auroraAge = AURORA_EVERY;
      fitPoints();
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    const paintAurora = (t: number) => {
      const bg = auroraCtx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#000000");
      bg.addColorStop(0.55, "#060608");
      bg.addColorStop(1, "#000000");
      auroraCtx.globalCompositeOperation = "source-over";
      auroraCtx.fillStyle = bg;
      auroraCtx.fillRect(0, 0, w, h);

      // Screen blending is what makes the blobs read as light pooling rather
      // than as four grey circles stacked on each other.
      auroraCtx.globalCompositeOperation = "screen";
      for (const b of BLOBS) {
        const cx = (0.5 + Math.sin(t * b.sx + b.px) * b.ax) * w;
        const cy = (0.45 + Math.cos(t * b.sy + b.py) * b.ay) * h;
        const rad = b.r * Math.min(w, h);
        const g = auroraCtx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.c},${b.a})`);
        g.addColorStop(0.5, `rgba(${b.c},${b.a * 0.32})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        auroraCtx.fillStyle = g;
        auroraCtx.beginPath();
        auroraCtx.arc(cx, cy, rad, 0, Math.PI * 2);
        auroraCtx.fill();
      }
      auroraCtx.globalCompositeOperation = "source-over";
    };

    const draw = (t: number) => {
      if (++auroraAge >= AURORA_EVERY) {
        paintAurora(t);
        auroraAge = 0;
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(aurora, 0, 0, w, h);

      const sp = pts.map((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        return { x: p.x * w, y: p.y * h };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < sp.length; i++) {
        for (let j = i + 1; j < sp.length; j++) {
          const d = Math.hypot(sp[i].x - sp[j].x, sp[i].y - sp[j].y);
          if (d >= LINK_DISTANCE) continue;
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK_DISTANCE) * 0.18})`;
          ctx.beginPath();
          ctx.moveTo(sp[i].x, sp[i].y);
          ctx.lineTo(sp[j].x, sp[j].y);
          ctx.stroke();
        }
      }

      for (const p of sp) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = dm < CURSOR_DISTANCE;
        const proximity = 1 - dm / CURSOR_DISTANCE;
        ctx.fillStyle = near ? `rgba(255,255,255,${proximity})` : "rgba(200,200,210,0.38)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.6 : 1.5, 0, Math.PI * 2);
        ctx.fill();
        if (near) {
          ctx.strokeStyle = `rgba(255,255,255,${proximity * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    // Reduced motion still gets the aurora, just frozen on one frame.
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 600px)").matches ||
      ("connection" in navigator &&
        Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData));
    if (still) {
      draw(0);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
      };
    }

    let raf = 0;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // The field is position:fixed, so it is never scrolled out of view and a
    // visibility observer would always report it as visible. Backgrounding
    // the tab is the only state where there is nothing to draw.
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="auroraField" aria-hidden="true">
      <canvas ref={ref} className="auroraCanvas" />
      <div className="auroraVeil" />
    </div>
  );
}
