"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Respect reduced-motion preferences for autoplaying media. Content never depends on JavaScript. */
export function StudioMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = document.querySelectorAll<HTMLVideoElement>("video[autoplay]");
    const update = () => videos.forEach(video => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => {});
    });
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [pathname]);
  return null;
}
