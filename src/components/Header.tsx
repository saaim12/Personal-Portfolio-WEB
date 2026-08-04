"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiArrowUpRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

import { person, routes, about, work, home } from "@/resources";
import styles from "./Header.module.scss";

const NAV = [
  { href: "/", label: "Home", icon: HiOutlineHome, key: "/" },
  { href: about.path, label: about.label, icon: HiOutlineUser, key: "/about" },
  { href: work.path, label: work.label, icon: HiOutlineSquares2X2, key: "/work" },
] as const;


export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Frost the bar only once content is behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // While the panel is open: lock scroll and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (key: string) =>
    key === "/" ? pathname === "/" : pathname.startsWith(key);

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.brand} aria-label={`${person.name}, home`}>
            {/* The portrait, not the initials. next/image so the 1.7MB source
                PNG is served as a ~32px optimised asset rather than in full.
                Decorative: the brand name sits next to it and the anchor
                carries its own aria-label. */}
            <Image
              className={styles.mark}
              src={person.avatar}
              alt=""
              aria-hidden="true"
              width={64}
              height={64}
              priority
            />
            <span className={styles.brandName}>{person.name}</span>
          </a>

          <nav className={styles.nav} aria-label="Main">
            {NAV.filter((n) => routes[n.key as keyof typeof routes]).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.key);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <a
              className={styles.iconBtn}
              href="/SaaimCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (PDF, opens in a new tab)"
              title="Resume (PDF)"
            >
              <HiOutlineDocumentText aria-hidden="true" />
            </a>
            <a
              className={`btn btn--primary ${styles.cta}`}
              href={home.cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineCalendarDays aria-hidden="true" />
              {home.cta.label}
            </a>

            <button
              type="button"
              className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className={styles.scrim} onClick={() => setOpen(false)} aria-hidden="true" />
          <div id="mobile-menu" className={styles.panel}>
            {NAV.filter((n) => routes[n.key as keyof typeof routes]).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.key);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.panelLink} ${active ? styles.panelActive : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}

            <div className={styles.panelDivider} />

            <a
              className={styles.panelLink}
              href="/SaaimCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineDocumentText aria-hidden="true" />
              Resume (PDF)
              <HiArrowUpRight aria-hidden="true" style={{ marginLeft: "auto" }} />
            </a>
            <a
              className={styles.panelLink}
              href={home.cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineCalendarDays aria-hidden="true" />
              {home.cta.label}
              <HiArrowUpRight aria-hidden="true" style={{ marginLeft: "auto" }} />
            </a>
          </div>
        </>
      )}
    </>
  );
};
