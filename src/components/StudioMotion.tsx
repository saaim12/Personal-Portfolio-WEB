"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive motion: server-rendered content stays readable without JavaScript. */
export function StudioMotion() {
  const pathname = usePathname();
  const cursor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const hide = () => {
      document.documentElement.removeAttribute("data-studio-cursor");
      if (cursor.current) cursor.current.style.opacity = "0";
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse" || !cursor.current) return;
      const target = event.target;
      // Use the native text caret while writing a message.
      if (target instanceof Element && target.closest("input, textarea")) return hide();
      document.documentElement.setAttribute("data-studio-cursor", "");
      cursor.current.style.translate = `${event.clientX}px ${event.clientY}px`;
      cursor.current.style.opacity = "1";
      cursor.current.classList.toggle("cursorActive", target instanceof Element && !!target.closest("a, button"));
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    enabled.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      enabled.removeEventListener("change", hide);
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const targets = document.querySelectorAll<HTMLElement>(
      ".nameSelection, .heroStatement, .homeAbout h2, .workHeading h2, .folderCopy h3, " +
      ".folderCopy > p, .pageHeading, .aboutMain > h1, .caseHero h1, .contactIntro h2, " +
      ".commentNote, .contactTitle, .serviceCard, .journalEntry, .roleCard",
    );

    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      targets.forEach(target => target.removeAttribute("data-motion-pending"));
    };
    const start = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.removeAttribute("data-motion-pending");
          const animation = target.animate(
            [
              { opacity: 0, translate: "0 20px", filter: "blur(4px)" },
              { opacity: 1, translate: "0 0", filter: "blur(0px)" },
            ],
            { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          observer?.unobserve(target);
        });
      }, { threshold: 0.08 });
      targets.forEach(target => {
        // Only defer off-screen elements, so hydration never blanks the first paint.
        if (target.getBoundingClientRect().top >= window.innerHeight) {
          target.setAttribute("data-motion-pending", "");
        }
        observer?.observe(target);
      });
    };

    start();
    preference.addEventListener("change", start);
    return () => {
      reset();
      preference.removeEventListener("change", start);
    };
  }, [pathname]);

  return <span className="studioCursorLayer" aria-hidden="true"><span ref={cursor} className="studioCursor"><i /><span>You</span></span></span>;
}
