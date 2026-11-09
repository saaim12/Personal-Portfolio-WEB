"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Selected work rail. On wide screens the section pins while page scroll moves the cards sideways,
 * with a light velocity skew. Small screens, reduced motion and no-JS keep a native swipe rail.
 */
export function WorkCarousel({ children }: { children: ReactNode }) {
  const pin = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const root = pin.current; const track = root?.querySelector<HTMLElement>(".featuredProjects"); if (!root || !track) return;
    const wide = window.matchMedia("(min-width: 810px) and (prefers-reduced-motion: no-preference)");
    let distance = 0, last = 0, velocity = 0, frame = 0;
    const layout = () => {
      if (!wide.matches) { root.classList.remove("isPinned"); root.style.height = ""; track.style.transform = ""; return; }
      root.classList.add("isPinned");
      track.style.transform = "";
      const cards = track.querySelectorAll<HTMLElement>(".folderProject"), lastCard = cards[cards.length - 1], box = (track.parentElement ?? track).getBoundingClientRect();
      // Travel until the last card's right edge meets the right page margin.
      const margin = parseFloat(getComputedStyle(track).paddingRight) || 0;
      distance = lastCard ? Math.max(0, lastCard.getBoundingClientRect().right - (box.right - margin)) : 0;
      root.style.height = `${distance + window.innerHeight}px`;
      update();
    };
    const update = () => {
      frame = 0;
      if (!wide.matches) return;
      const offset = Math.min(distance, Math.max(0, -root.getBoundingClientRect().top));
      velocity = velocity * 0.7 + (offset - last) * 0.3; last = offset;
      const v = Math.max(-1, Math.min(1, velocity / 30));
      track.style.transform = `translate3d(${-offset}px,0,0)`;
      root.style.setProperty("--skew", `${(v * -5).toFixed(2)}deg`);
      setProgress(distance ? offset / distance : 0);
      if (Math.abs(velocity) > 0.1) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Keep keyboard focus visible: scroll the page to the card that receives focus.
    const focus = (event: FocusEvent) => {
      if (!wide.matches) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>(".folderProject"); if (!card) return;
      track.scrollLeft = 0;
      const top = root.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + Math.min(distance, Math.max(0, card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2)), behavior: "auto" });
    };
    // Arrow keys move one card: through page scroll while pinned, or the rail's own scroll otherwise.
    const keys = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const card = track.querySelector<HTMLElement>(".folderProject"); if (!card) return;
      event.preventDefault();
      const step = (card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0)) * (event.key === "ArrowRight" ? 1 : -1);
      if (wide.matches) window.scrollBy({ top: step, behavior: "smooth" }); else track.scrollBy({ left: step, behavior: "smooth" });
    };
    const native = () => { if (!wide.matches) { const max = track.scrollWidth - track.clientWidth; setProgress(max > 0 ? track.scrollLeft / max : 0); } };
    layout();
    track.addEventListener("scroll", native, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", layout);
    wide.addEventListener("change", layout);
    track.addEventListener("focusin", focus);
    track.addEventListener("keydown", keys);
    return () => { cancelAnimationFrame(frame); track.removeEventListener("scroll", native); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", layout); wide.removeEventListener("change", layout); track.removeEventListener("focusin", focus); track.removeEventListener("keydown", keys); };
  }, []);
  return <div ref={pin} className="workPin">
    <div className="workCarousel">
      {children}
      <div className="workProgress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.03, progress)})` }} /></div>
    </div>
  </div>;
}
