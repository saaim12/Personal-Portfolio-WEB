"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type PortraitTransitionProps = {
  src: string;
  alt: string;
};

export function PortraitTransition({ src, alt }: PortraitTransitionProps) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const source = sourceRef.current;
    const overlay = overlayRef.current;
    const target = document.getElementById("portrait-destination");
    if (!source || !overlay || !target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const sourceTop = sourceRect.top + window.scrollY;
      const targetTop = targetRect.top + window.scrollY;
      const start = sourceTop - window.innerHeight * 0.48;
      const end = Math.max(start + 1, targetTop - window.innerHeight * 0.34);
      const rawProgress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);

      if (reducedMotion.matches) {
        source.style.opacity = "1";
        target.style.opacity = "1";
        overlay.style.opacity = "0";
        return;
      }

      if (progress <= 0) {
        source.style.opacity = "1";
        target.style.opacity = "0";
        overlay.style.opacity = "0";
        return;
      }

      if (progress >= 1) {
        source.style.opacity = "0";
        target.style.opacity = "1";
        overlay.style.opacity = "0";
        return;
      }

      source.style.opacity = "0";
      target.style.opacity = "0";
      overlay.style.opacity = "1";

      const lerp = (from: number, to: number) => from + (to - from) * progress;
      const width = lerp(sourceRect.width, targetRect.width);
      const height = lerp(sourceRect.height, targetRect.height);
      const x = lerp(sourceRect.left, targetRect.left);
      const y = lerp(sourceRect.top, targetRect.top);
      // Switch faces while the portrait is edge-on. This produces a continuous
      // card turn without leaving the finished portrait mirrored.
      const rotation = progress < 0.5 ? progress * 180 : (progress - 1) * 180;
      const radius = lerp(10, 20);

      overlay.style.width = `${width}px`;
      overlay.style.height = `${height}px`;
      overlay.style.borderRadius = `${radius}px`;
      overlay.style.transform = `translate3d(${x}px, ${y}px, 0) perspective(1000px) rotateY(${rotation}deg)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      target.style.opacity = "";
    };
  }, []);

  return (
    <>
      <div ref={sourceRef} className="heroPortraitSource">
        <Image
          className="heroPortrait"
          src={src}
          alt={alt}
          width={200}
          height={230}
          priority
          sizes="(max-width: 600px) 140px, 200px"
        />
      </div>
      <div ref={overlayRef} className="portraitOverlay" aria-hidden="true">
        <Image src={src} alt="" fill priority sizes="(max-width: 760px) 82vw, 420px" />
      </div>
    </>
  );
}
