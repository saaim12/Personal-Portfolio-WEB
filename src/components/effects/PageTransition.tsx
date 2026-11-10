"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PixelBlocks } from "./PixelBlocks";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const COVER_MS = 120;
const REVEAL_MS = 220;
type Phase = "idle" | "cover" | "reveal";

/**
 * Page change through the block grid: the blocks cover the current page first,
 * the route changes underneath, then the blocks dissolve to reveal the new page.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhaseState] = useState<Phase>("idle");
  const [grid, setGrid] = useState({ columns: 12, rows: 8 });
  const phaseRef = useRef<Phase>("idle");
  const first = useRef(true);
  const timers = useRef<number[]>([]);

  function setPhase(next: Phase) { phaseRef.current = next; setPhaseState(next); }
  function clearTimers() { timers.current.forEach(timer => window.clearTimeout(timer)); timers.current = []; }
  function reveal() { clearTimers(); setPhase("reveal"); timers.current.push(window.setTimeout(() => setPhase("idle"), REVEAL_MS)); }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || !anchor.href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      let path = url.pathname;
      if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length) || "/";
      if (/\.[a-z0-9]+$/i.test(path) || path.startsWith("/api/")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (phaseRef.current !== "idle") return;
      const columns = window.innerWidth < 700 ? 6 : 12;
      setGrid({ columns, rows: Math.max(4, Math.round((window.innerHeight - 56) / (window.innerWidth / columns))) });
      clearTimers();
      setPhase("cover");
      timers.current.push(window.setTimeout(() => router.push(path + url.search + url.hash), COVER_MS));
      // If the route never changes (offline, failed load), do not leave the page covered.
      timers.current.push(window.setTimeout(() => { if (phaseRef.current === "cover") reveal(); }, 4000));
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  // Runs before paint, so the new page is never seen without its blocks (also covers back/forward).
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { clearTimers(); setPhase("idle"); return; }
    reveal();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => clearTimers, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "idle") return null;
  return <PixelBlocks key={phase} columns={grid.columns} rows={grid.rows} spread={phase === "cover" ? 0.07 : 0.11} className={`pageBlocks ${phase === "cover" ? "isCovering" : "isRevealing"}`} />;
}
