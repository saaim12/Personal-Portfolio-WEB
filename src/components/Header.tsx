"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiArrowUpRight,
  HiOutlineEnvelope,
} from "react-icons/hi2";

import { routes } from "@/resources/once-ui.config";
import styles from "./Header.module.scss";

const NAV = [
  { href: "/", label: "Home", icon: HiOutlineHome, key: "/" },
  { href: "/experience", label: "Experience", icon: HiOutlineUser, key: "/experience" },
  { href: "/work", label: "Projects", icon: HiOutlineSquares2X2, key: "/work" },
  { href: "/#contact", label: "Contact", icon: HiOutlineEnvelope, key: "/contact" },
] as const;

export const Header = ({ name, contact }: { name: string; contact: { href: string; label: string } }) => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Frost the bar once content scrolls behind it.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on navigation.
  useEffect(() => {
    if (pathname) setOpen(false);
  }, [pathname]);

  // While the panel is open: lock scroll and let Escape dismiss it.
  useEffect(() => {
    if (!open) return;
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && links?.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (document.activeElement === toggleRef.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (key: string) => (key === "/" ? pathname === "/" : pathname.startsWith(key));

  return (
    <>
      <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.brand} aria-label={`${name}, home`}>
            <span className={styles.brandName}>{name}</span>
          </a>

          <div className={styles.actions}>
            <button
              ref={toggleRef}
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
          <button
            type="button"
            tabIndex={-1}
            className={styles.scrim}
            onClick={() => setOpen(false)}
            aria-label="Dismiss menu"
          />
          <div id="mobile-menu" ref={panelRef} className={styles.panel}>
            {/* On the home page the sections come first: they are where the
                content is, and the routes below them are the depth. */}
            {NAV.filter((n) => routes[n.key as keyof typeof routes] || n.key === "/contact").map(
              (item) => {
                const Icon = item.icon;
                const active = isActive(item.key);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${styles.panelLink} ${active ? styles.panelActive : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon aria-hidden="true" />
                    {item.label}
                  </a>
                );
              },
            )}

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
            <a className={styles.panelLink} href={contact.href}>
              <HiOutlineEnvelope aria-hidden="true" />
              {contact.label}
              <HiArrowUpRight aria-hidden="true" style={{ marginLeft: "auto" }} />
            </a>
          </div>
        </>
      )}
    </>
  );
};
