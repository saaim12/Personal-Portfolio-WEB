"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Progressive motion: server-rendered content stays readable without JavaScript. */
export function StudioMotion() {
  const pathname = usePathname();
  const cursor = useRef<HTMLSpanElement>(null);
  const blend = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rulers = Array.from(document.querySelectorAll<HTMLElement>(".ruler"));
    let target = 0;
    let current = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      current += (target - current) * .16;
      rulers.forEach(ruler => ruler.style.setProperty("--ruler-x", `${current.toFixed(2)}px`));
      if (Math.abs(target - current) > .1) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (preference.matches || !pointer.matches || event.pointerType !== "mouse") return;
      target = (event.clientX / window.innerWidth - .5) * 160;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const scroll = () => {
      document.documentElement.toggleAttribute("data-ruler-scrolled", !preference.matches && window.scrollY > 50);
    };
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      target = current = 0;
      rulers.forEach(ruler => ruler.style.removeProperty("--ruler-x"));
      scroll();
    };
    document.documentElement.setAttribute("data-ruler-motion", "");
    scroll();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    preference.addEventListener("change", reset);
    return () => {
      reset();
      document.documentElement.removeAttribute("data-ruler-motion");
      document.documentElement.removeAttribute("data-ruler-scrolled");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      preference.removeEventListener("change", reset);
    };
  }, [pathname]);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const hide = () => {
      document.documentElement.removeAttribute("data-studio-cursor");
      if (cursor.current) cursor.current.style.opacity = "0";
      if (blend.current) blend.current.style.opacity = "0";
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
      if (blend.current) {
        const overHeroText = target instanceof Element && !!target.closest(".studioHome #hero-name") && !document.documentElement.hasAttribute("data-studio-welcome");
        blend.current.style.translate = `${event.clientX}px ${event.clientY}px`;
        blend.current.style.opacity = overHeroText ? "1" : "0";
        cursor.current.classList.toggle("cursorSelection", overHeroText);
      }
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
    const compact = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const targets = document.querySelectorAll<HTMLElement>(
      ".nameSelection, .heroStatement, .servicesHeroContent, .homeAbout h2, .workHeading h2, .folderCopy :is(h2,h3), " +
      ".folderCopy > p, .pageHeading, .bioFrame > h2, .storyIntro, .storyCard, .caseHero h1, .contactIntro h2, " +
      ".commentNote, .contactTitle, .journalEntry, .roleCard, " +
      ".studioHome .selectionLabel, .studioHome .skillStickers, .studioHome .workHeading > .stickyNote",
    );

    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      targets.forEach(target => target.removeAttribute("data-motion-pending"));
    };
    const start = () => {
      reset();
      if (preference.matches || compact.matches) return;
      const page = document.querySelector(".studioPage, .studioHome");
      if (page) {
        const entrance = page.animate([{ opacity: 0.45 }, { opacity: 1 }], { duration: 280, easing: "ease-out" });
        animations.add(entrance);
        entrance.onfinish = () => animations.delete(entrance);
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.removeAttribute("data-motion-pending");
          const onHome = !!target.closest(".studioHome");
          const letterHeading = onHome && target.matches(".workHeading h2, .contactIntro h2");
          const maskedText = onHome && target.matches(".homeAbout h2, .folderCopy :is(h2,h3), .folderCopy > p");
          const label = onHome && target.classList.contains("selectionLabel");
          const paperNote = onHome && target.matches(".workHeading > .stickyNote, .commentNote");
          const frames: Keyframe[] = label ? [
            { opacity: 0, translate: "0 35px", rotate: "-9deg", offset: 0 },
            { opacity: 1, translate: "0 0", rotate: "4deg", offset: .5 },
            { opacity: 1, translate: "0 0", rotate: "-1deg", offset: .78 },
            { opacity: 1, translate: "0 0", rotate: "0deg", offset: 1 },
          ] : paperNote ? [
            { opacity: 0, translate: "-32px 50px", rotate: "-7deg", scale: .9, offset: 0 },
            { opacity: 1, translate: "4px -4px", rotate: "2deg", scale: 1.02, offset: .7 },
            { opacity: 1, translate: "0 0", rotate: "0deg", scale: 1, offset: 1 },
          ] : maskedText ? [
            { clipPath: "inset(0 0 100% 0)", translate: "0 45px", opacity: .35 },
            { clipPath: "inset(0)", translate: "0 0", opacity: 1 },
          ] : letterHeading ? [
            { opacity: 1 }, { opacity: 1 },
          ] : [
            { opacity: 0, translate: "0 20px", filter: "blur(4px)" },
            { opacity: 1, translate: "0 0", filter: "blur(0px)" },
          ];
          const animation = target.animate(
            frames,
            { duration: label || paperNote ? 850 : 650, easing: "cubic-bezier(.22,1,.36,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          target.querySelectorAll(".revealCharacter").forEach((letter, index) => {
            const reveal = letter.animate(
              letterHeading ? [
                { opacity: 0, translate: `0 ${target.closest(".workHeading") ? 70 : 40}px`, rotate: `${index % 2 ? 9 : -9}deg`, scale: .72, offset: 0 },
                { opacity: 1, translate: "0 -7px", rotate: `${index % 2 ? -1 : 1}deg`, scale: 1.04, offset: .7 },
                { opacity: 1, translate: "0 0", rotate: "0deg", scale: 1, offset: 1 },
              ] : [{ opacity: 0, translate: "0 18px", filter: "blur(4px)" }, { opacity: 1, translate: "0 0", filter: "blur(0)" }],
              { duration: letterHeading ? 780 : 550, delay: Math.min(index * 24, 450), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
            );
            animations.add(reveal);
            reveal.onfinish = () => animations.delete(reveal);
          });
          if (onHome) target.querySelectorAll(".homeRevealWord").forEach((word, index) => {
            const reveal = word.animate([
              { opacity: 0, translate: "0 32px", rotate: `${index % 2 ? 3 : -3}deg`, scale: .94, offset: 0 },
              { opacity: 1, translate: "0 -3px", rotate: "0deg", scale: 1, offset: .75 },
              { opacity: 1, translate: "0 0", rotate: "0deg", scale: 1, offset: 1 },
            ], { duration: 620, delay: Math.min(index * 28, 500), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
            animations.add(reveal);
            reveal.onfinish = () => animations.delete(reveal);
          });
          if (onHome && target.classList.contains("skillStickers")) {
            Array.from(target.children).forEach((sticker, index) => {
              const reveal = sticker.animate([{ opacity: 0, translate: "0 28px" }, { opacity: 1, translate: "0 0" }],
                { duration: 420, delay: Math.floor(index / 2) * 65, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
              animations.add(reveal);
              reveal.onfinish = () => animations.delete(reveal);
            });
          }
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
    window.addEventListener("studio-welcome-end", start);
    preference.addEventListener("change", start);
    compact.addEventListener("change", start);
    return () => {
      reset();
      window.removeEventListener("studio-welcome-end", start);
      preference.removeEventListener("change", start);
      compact.removeEventListener("change", start);
    };
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const home = document.querySelector<HTMLElement>(".studioHome");
    const services = document.querySelector<HTMLElement>(".servicesPage");
    if ((!home && !services) || reduced.matches || window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)").matches) return;

    let frame = 0;
    const process = services?.querySelector<HTMLElement>(".serviceProcess");
    const rail = services?.querySelector<HTMLElement>(".processRail");
    const processHeading = process?.querySelector<HTMLElement>(".serviceSectionHeading");
    const headings = Array.from(services?.querySelectorAll<HTMLElement>(".servicePanel h2") ?? [])
      .map(heading => ({ heading, letters: Array.from(heading.querySelectorAll<HTMLElement>(".revealCharacter")) }));
    const folders = Array.from(home?.querySelectorAll<HTMLElement>(".folderFeature") ?? []);
    const updateHomeScroll = () => {
      frame = 0;
      if (reduced.matches) return;
      // Read geometry together before changing styles to avoid forced layouts.
      const processTop = process?.getBoundingClientRect().top ?? 0;
      const processHeight = process?.offsetHeight ?? 0;
      const railWidth = rail?.scrollWidth ?? 0;
      const headingWidth = processHeading?.offsetWidth ?? 0;
      const headingTops = headings.map(({ heading }) => heading.getBoundingClientRect().top);
      const folderTops = folders.map(folder => folder.getBoundingClientRect().top);
      if (process && rail && window.innerWidth > 1000) {
        const progress = Math.max(0, Math.min(1, (88 - processTop) / Math.max(1, processHeight - window.innerHeight + 88)));
        process.style.setProperty("--process-x", `${-progress * Math.max(0, railWidth + headingWidth - window.innerWidth + 120)}px`);
      }
      headings.forEach(({ letters }, headingIndex) => {
        const progress = Math.max(0, Math.min(1, (window.innerHeight * .9 - headingTops[headingIndex]) / (window.innerHeight * .45)));
        letters.forEach((letter, index) => {
          const reveal = Math.max(0, Math.min(1, progress * 1.7 - index / Math.max(1, letters.length - 1) * .7));
          letter.style.opacity = String(.12 + reveal * .88);
        });
      });
      folders.forEach((folder, index) => {
        const next = folders[index + 1];
        const progress = next ? Math.max(0, Math.min(1, (window.innerHeight * .72 - folderTops[index + 1]) / (window.innerHeight * .55))) : 0;
        folder.style.setProperty("--folder-cover", progress.toFixed(3));
        folder.style.setProperty("--tab-cover", `${Math.max(0, Math.min(1, (240 - folderTops[index]) / 136))}`);
        folder.style.setProperty("--image-parallax", `${Math.max(-28, Math.min(28, (folderTops[index] - 104) * -.035)).toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateHomeScroll); };
    updateHomeScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let serviceObserver: IntersectionObserver | undefined;
    const serviceAnimations = new Set<Animation>();
    if (services) {
      const cards = Array.from(services.querySelectorAll<HTMLElement>(".processCard, .capabilityChip, .serviceFaq, .serviceSectionHeading"));
      serviceObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const index = cards.indexOf(card);
          card.removeAttribute("data-motion-pending");
          const isChip = card.classList.contains("capabilityChip");
          // Keep entrance motion independent of the scroll rail's transform.
          const from = { opacity: 0, translate: isChip ? `${index % 2 ? 50 : -50}px 45px` : "0 72px", rotate: isChip ? `${index % 2 ? 9 : -9}deg` : card.classList.contains("processCard") ? "-5deg" : "0deg" };
          const animation = card.animate([from, { opacity: 1, translate: "0 0", rotate: "0deg" }],
            { duration: 820, delay: isChip ? (index % 6) * 55 : (index % 4) * 95, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
          serviceAnimations.add(animation);
          animation.onfinish = () => serviceAnimations.delete(animation);
          serviceObserver?.unobserve(card);
        });
      }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
      cards.forEach(card => {
        if (card.getBoundingClientRect().top >= window.innerHeight) card.setAttribute("data-motion-pending", "");
        serviceObserver?.observe(card);
      });
    }
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      serviceObserver?.disconnect();
      serviceAnimations.forEach(animation => animation.cancel());
    };
  }, [pathname]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const boards = document.querySelectorAll<HTMLElement>(".contactBoardAnimated");
    const compact = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      boards.forEach(board => {
        board.removeAttribute("data-contact-pending");
        board.querySelector(".contactStickerAnimated")?.removeAttribute("data-contact-sticker-pending");
      });
    };
    const start = () => {
      reset();
      if (preference.matches || compact.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const isSticker = target.classList.contains("contactStickerAnimated");
          target.removeAttribute(isSticker ? "data-contact-sticker-pending" : "data-contact-pending");
          const backdrop = isSticker ? null : target.querySelector(".contactBackdrop");
          const sticker = isSticker ? target : null;
          if (backdrop) {
            const reveal = backdrop.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0)" }],
              { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
            animations.add(reveal);
            reveal.onfinish = () => animations.delete(reveal);
          }
          if (sticker) {
            const entrance = sticker.animate([
              { opacity: .08, translate: "0 75px", scale: .92, rotate: "-8deg", offset: 0 },
              { opacity: 1, translate: "0 -8px", scale: 1, rotate: "3deg", offset: .6 },
              { opacity: 1, translate: "0 3px", scale: 1, rotate: "-2deg", offset: .82 },
              { opacity: 1, translate: "0 0", scale: 1, rotate: "0deg", offset: 1 },
            ], { duration: 950, delay: 100, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
            animations.add(entrance);
            entrance.onfinish = () => animations.delete(entrance);
          }
          observer?.unobserve(target);
        });
      }, { threshold: 0, rootMargin: "0px 0px 100px 0px" });
      boards.forEach(board => {
        if (board.getBoundingClientRect().top > window.innerHeight) board.setAttribute("data-contact-pending", "");
        observer?.observe(board);
        const sticker = board.querySelector<HTMLElement>(".contactStickerAnimated");
        if (sticker) {
          if (sticker.getBoundingClientRect().top > window.innerHeight) sticker.setAttribute("data-contact-sticker-pending", "");
          observer?.observe(sticker);
        }
      });
    };
    start();
    preference.addEventListener("change", start);
    compact.addEventListener("change", start);
    return () => { reset(); preference.removeEventListener("change", start); compact.removeEventListener("change", start); };
  }, [pathname]);

  return <><span ref={blend} className="studioCursorBlend" aria-hidden="true"><i /><i /><i /><i /></span><span className="studioCursorLayer" aria-hidden="true"><span ref={cursor} className="studioCursor"><i /><span>You</span></span></span></>;
}
