"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Scramble } from "./Scramble";

/**
 * Selected work rail. On wide screens the section pins while page scroll moves the cards sideways,
 * with a velocity skew and colour split. Small screens, reduced motion and no-JS keep a native swipe rail.
 */
export function WorkCarousel({ children }: { children: ReactNode }) {
  const pin = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const root = pin.current; const track = root?.querySelector<HTMLElement>(".featuredProjects"); if (!root || !track) return;
    const wide = window.matchMedia("(min-width: 810px) and (prefers-reduced-motion: no-preference)");
    let distance = 0, last = 0, velocity = 0, frame = 0;
    const active = () => {
      const box = root.querySelector(".workCarousel")!.getBoundingClientRect(), centre = box.left + box.width / 2;
      let best = "", gap = Infinity;
      track.querySelectorAll<HTMLElement>("[data-title]").forEach(card => { const r = card.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - centre); if (d < gap) { gap = d; best = card.dataset.title || ""; } });
      setTitle(best);
      const picture = track.querySelector<HTMLElement>(".projectPicture");
      if (picture) { const r = picture.getBoundingClientRect(); root.style.setProperty("--title-y", `${(r.top + r.height / 2 - box.top).toFixed(0)}px`); }
    };
    const layout = () => {
      if (!wide.matches) { root.classList.remove("isPinned"); root.style.height = ""; track.style.transform = ""; return; }
      root.classList.add("isPinned");
      track.style.transform = "";
      const cards = track.querySelectorAll<HTMLElement>(".folderProject"), lastCard = cards[cards.length - 1], box = (track.parentElement ?? track).getBoundingClientRect();
      // Travel until the last card sits in the centre of the rail.
      distance = lastCard ? Math.max(0, lastCard.getBoundingClientRect().left + lastCard.offsetWidth / 2 - (box.left + box.width / 2)) : 0;
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
      root.style.setProperty("--split", `${(Math.abs(v) * 6).toFixed(2)}px`);
      setProgress(distance ? offset / distance : 0);
      active();
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
    const native = () => { if (!wide.matches) { active(); const max = track.scrollWidth - track.clientWidth; setProgress(max > 0 ? track.scrollLeft / max : 0); } };
    layout(); active();
    track.addEventListener("scroll", native, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", layout);
    wide.addEventListener("change", layout);
    track.addEventListener("focusin", focus);
    return () => { cancelAnimationFrame(frame); track.removeEventListener("scroll", native); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", layout); wide.removeEventListener("change", layout); track.removeEventListener("focusin", focus); };
  }, []);
  return <div ref={pin} className="workPin">
    <div className="workCarousel">
      {children}
      <p className="workOverlayTitle" aria-hidden="true">{title && <Scramble text={title} play={title} duration={420} />}</p>
      <div className="workProgress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.03, progress)})` }} /></div>
    </div>
  </div>;
}
