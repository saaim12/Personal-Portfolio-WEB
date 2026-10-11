"use client";

import { useEffect, useState } from "react";

/** A brief greeting on each Home load; interactions can dismiss it immediately. */
export function HomeWelcome() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (window.scrollY > 50) return;
    setVisible(true);
    const enterTimer = window.setTimeout(() => setEntered(true), 40);
    document.documentElement.setAttribute("data-studio-welcome", "");
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      window.clearTimeout(enterTimer);
      setEntered(false);
      setVisible(false);
      document.documentElement.removeAttribute("data-studio-welcome");
      window.dispatchEvent(new Event("studio-welcome-end"));
    };
    const timer = window.setTimeout(finish, preference.matches ? 900 : 2100);
    window.addEventListener("keydown", finish, { once: true });
    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("scroll", finish, { once: true, passive: true });
    preference.addEventListener("change", finish);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(enterTimer);
      document.documentElement.removeAttribute("data-studio-welcome");
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("scroll", finish);
      preference.removeEventListener("change", finish);
    };
  }, []);
  return visible ? <div className={`homeWelcome${entered ? " isEntered" : ""}`} aria-hidden="true"><div className="welcomeBubble"><span>Hey, welcome!</span></div></div> : null;
}
