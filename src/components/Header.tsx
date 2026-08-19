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
  HiOutlineEnvelope,
} from "react-icons/hi2";

import { person, routes, about, work, home } from "@/resources";
import styles from "./Header.module.scss";

const NAV = [
  { href: "/", label: "Home", icon: HiOutlineHome, key: "/" },
  { href: about.path, label: about.label, icon: HiOutlineUser, key: "/about" },
  { href: work.path, label: work.label, icon: HiOutlineSquares2X2, key: "/work" },
] as const;

// The home page's section index. It lives in this pill rather than in a second
// sticky bar underneath: two glass capsules stacked read as two navbars, which
// is two conflicting answers to "where am I". Past the hero on the home page
// this list replaces the routes, because on a page that now carries the whole
// story the sections are the navigation and /about and /work are depth — still
// reachable from the brand, the forward links and the footer.
const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [section, setSection] = useState<string>("");

  const isHome = pathname === "/";
  const showSections = isHome && pastHero;

  // Frost the bar only once content is behind it, and swap the pill's contents
  // once the reader is past the hero on the home page.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPastHero(window.scrollY > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is in view. Only ever runs on the home page, which is the
  // only route that has these ids.
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // Document order rather than whichever entry fired last, so scrolling
        // up highlights what scrolling down did. Approach is not in the list
        // and empties the set on the way past; keeping the previous value
        // stops the underline blinking off.
        const next = SECTIONS.find((s) => visible.has(s.id))?.id;
        if (next) setSection(next);
      },
      { rootMargin: "-96px 0px -55% 0px" },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

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

          <nav
            className={styles.nav}
            aria-label={showSections ? "Sections on this page" : "Main"}
          >
            {showSections
              ? SECTIONS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`${styles.link} ${styles.sectionLink} ${
                      section === item.id ? styles.active : ""
                    }`}
                    aria-current={section === item.id ? "true" : undefined}
                    data-track={`section_nav:${item.id}`}
                  >
                    {item.label}
                  </a>
                ))
              : NAV.filter((n) => routes[n.key as keyof typeof routes]).map((item) => {
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
            {/* No target="_blank": this is a mailto now, and opening one in a
                new tab leaves the reader staring at a blank page. */}
            <a className={`btn btn--primary ${styles.cta}`} href={home.cta.href}>
              <HiOutlineEnvelope aria-hidden="true" />
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
            {/* On the home page the sections come first: they are where the
                content is, and the routes below them are the depth. */}
            {isHome && (
              <>
                {SECTIONS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`${styles.panelLink} ${
                      section === item.id ? styles.panelActive : ""
                    }`}
                    data-track={`section_nav:${item.id}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className={styles.panelDivider} />
              </>
            )}
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
            <a className={styles.panelLink} href={home.cta.href}>
              <HiOutlineEnvelope aria-hidden="true" />
              {home.cta.label}
              <HiArrowUpRight aria-hidden="true" style={{ marginLeft: "auto" }} />
            </a>
          </div>
        </>
      )}
    </>
  );
};
