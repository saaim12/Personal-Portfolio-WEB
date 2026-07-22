"use client";

import { useEffect, useRef, useState } from "react";
import { useInteractiveAllowed } from "@/hooks";
import { CURSOR_LERP } from "@/motion";
import styles from "./Cursor.module.css";

// Custom cursor for pointer devices only. Follows with lerp lag, grows and
// shows a label when over elements carrying a [data-cursor] attribute.
export default function Cursor() {
  const allowed = useInteractiveAllowed();
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!allowed) return;

    // Start centered so the first frame doesn't jump from 0,0.
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { ...pos.current };

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const hit = e.target.closest?.("[data-cursor]");
      if (hit) {
        setLabel(hit.getAttribute("data-cursor") || "");
        setActive(true);
      } else {
        setActive(false);
        setLabel("");
      }
    };
    // Only hide when the pointer actually leaves the window, not on every
    // element-to-element mouseout (which bubbles and would flicker).
    const onLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) setVisible(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onLeave);
    document.documentElement.classList.add(styles.hideNative);

    let rafId;
    const tick = () => {
      const p = pos.current;
      const t = target.current;
      p.x += (t.x - p.x) * CURSOR_LERP;
      p.y += (t.y - p.y) * CURSOR_LERP;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.classList.remove(styles.hideNative);
    };
  }, [allowed]);

  if (!allowed) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`${styles.cursor} ${active ? styles.active : ""} ${
        visible ? styles.visible : ""
      } ${label && label.length > 2 ? styles.wide : ""}`}
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
}
