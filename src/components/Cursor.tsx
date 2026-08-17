"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.scss";

/**
 * The site's pointer: a dot at the true position and a ring that trails it.
 *
 * Everything is written straight to `style.transform` inside one rAF loop
 * rather than through React state, because a cursor updates on every pointer
 * move and re-rendering the tree at that rate is how a page starts dropping
 * frames. React owns exactly one piece of state here: whether the pointer has
 * been seen at all, which decides whether the elements exist.
 *
 * What makes it safe to hide the real cursor:
 *   - the dot sits at the exact pointer position, with no lag, so precision is
 *     unchanged,
 *   - `cursor: none` is applied from this effect, so a visitor with JavaScript
 *     off or a coarse pointer keeps the system cursor,
 *   - text inputs and the like keep their own cursor (see the CSS carve-out in
 *     custom.css), because a caret position cannot be guessed from a ring.
 */

/** Anything that should open the ring up. */
const INTERACTIVE =
  'a, button, summary, label, select, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"]), .card, .certCard, .projCard';

export function Cursor() {
  const [active, setActive] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Coarse pointers never get this: no cursor to replace, and the ring would
    // be stranded wherever the last tap landed.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Target (true pointer) and the ring's own lagging position.
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let seen = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        // First sighting: drop the ring straight onto the pointer instead of
        // letting it fly in from the corner.
        seen = true;
        rx = tx;
        ry = ty;
        // The native cursor is hidden here and not at mount: until the pointer
        // has moved there is nothing on screen to replace it, and a visitor
        // whose mouse happens to be resting over the page would be left with
        // no cursor at all.
        document.documentElement.classList.add("hasCustomCursor");
        setActive(true);
      }
      const target = e.target as Element | null;
      const over = Boolean(target?.closest?.(INTERACTIVE));
      ring.current?.classList.toggle(styles.interactive, over);
    };

    const tick = () => {
      // Critically damped enough to feel attached rather than elastic. With
      // reduced motion the ring is simply pinned to the pointer.
      const k = reduced ? 1 : 0.18;
      rx += (tx - rx) * k;
      ry += (ty - ry) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${Math.round(rx * 100) / 100}px, ${
          Math.round(ry * 100) / 100
        }px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    const setHidden = (hidden: boolean) => {
      dot.current?.classList.toggle(styles.hidden, hidden);
      ring.current?.classList.toggle(styles.hidden, hidden);
    };
    const onDown = () => ring.current?.classList.add(styles.pressed);
    const onUp = () => ring.current?.classList.remove(styles.pressed);

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", () => setHidden(true));
    document.addEventListener("pointerenter", () => setHidden(false));
    // A native dropdown or an alt-tab leaves the ring parked mid-screen.
    window.addEventListener("blur", () => setHidden(true));
    window.addEventListener("focus", () => setHidden(false));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("hasCustomCursor");
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div ref={ring} className={`${styles.layer} ${styles.ring}`} aria-hidden="true" />
      <div ref={dot} className={`${styles.layer} ${styles.dot}`} aria-hidden="true" />
    </>
  );
}
