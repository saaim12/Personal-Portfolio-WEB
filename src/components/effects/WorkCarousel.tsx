"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal project rail: native scroll and snap, mouse drag, velocity skew and colour split, live title and progress. */
export function WorkCarousel({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = root.current; const track = el?.querySelector<HTMLElement>(".featuredProjects"); if (!el || !track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-title]"));
    let last = track.scrollLeft, velocity = 0, frame = 0, dragging = false, startX = 0, startLeft = 0, moved = 0;
    const measure = () => {
      const centre = track.getBoundingClientRect().left + track.clientWidth / 2;
      let best = cards[0], gap = Infinity;
      cards.forEach(card => { const box = card.getBoundingClientRect(); const d = Math.abs(box.left + box.width / 2 - centre); if (d < gap) { gap = d; best = card; } });
      setTitle(best?.dataset.title || "");
      const max = track.scrollWidth - track.clientWidth; setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    const loop = () => {
      const delta = track.scrollLeft - last; last = track.scrollLeft;
      velocity = velocity * 0.82 + delta * 0.18;
      const v = reduced.matches ? 0 : Math.max(-1, Math.min(1, velocity / 40));
      el.style.setProperty("--skew", (v * -6).toFixed(2) + "deg");
      el.style.setProperty("--split", (Math.abs(v) * 6).toFixed(2) + "px");
      if (Math.abs(velocity) > 0.05 || dragging) frame = requestAnimationFrame(loop); else { frame = 0; el.style.setProperty("--skew", "0deg"); el.style.setProperty("--split", "0px"); }
    };
    const kick = () => { measure(); if (!frame) frame = requestAnimationFrame(loop); };
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true; moved = 0; startX = event.clientX; startLeft = track.scrollLeft;
      el.classList.add("isDragging"); kick();
    };
    const move = (event: PointerEvent) => { if (!dragging) return; moved = Math.max(moved, Math.abs(event.clientX - startX)); track.scrollLeft = startLeft - (event.clientX - startX); };
    const up = () => {
      if (!dragging) return; dragging = false; el.classList.remove("isDragging");
      // Settle on the nearest card once the drag ends.
      const centre = track.getBoundingClientRect().left + track.clientWidth / 2;
      const target = cards.reduce((a, b) => Math.abs(b.getBoundingClientRect().left + b.clientWidth / 2 - centre) < Math.abs(a.getBoundingClientRect().left + a.clientWidth / 2 - centre) ? b : a, cards[0]);
      target?.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "nearest", inline: "center" });
    };
    const click = (event: MouseEvent) => { if (moved > 6) { event.preventDefault(); event.stopPropagation(); moved = 0; } };
    const dragStart = (event: DragEvent) => event.preventDefault();
    measure();
    track.addEventListener("scroll", kick, { passive: true });
    track.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    track.addEventListener("click", click, true);
    track.addEventListener("dragstart", dragStart);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", kick); track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
      track.removeEventListener("click", click, true); track.removeEventListener("dragstart", dragStart); window.removeEventListener("resize", measure);
    };
  }, []);
  return <div ref={root} className="workCarousel">
    {children}
    <p className="workOverlayTitle" aria-hidden="true"><span key={title}>{title}</span></p>
    <div className="workProgress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} /></div>
  </div>;
}
