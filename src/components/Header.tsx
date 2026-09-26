"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { routes } from "@/resources/once-ui.config";
import styles from "./Header.module.scss";

const NAV = [
  { href: "/", label: "Home", icon: HiOutlineHome, key: "/" },
  { href: "/experience", label: "Experience", icon: HiOutlineUser, key: "/experience" },
  { href: "/work", label: "Projects", icon: HiOutlineSquares2X2, key: "/work" },
  { href: "/#contact", label: "Contact", icon: HiOutlineEnvelope, key: "/contact" },
  { href: "/SaaimCV.pdf", label: "Resume", icon: HiOutlineDocumentText, key: "/resume" },
] as const;
const items = NAV.filter((item) =>
  routes[item.key as keyof typeof routes] || item.key === "/contact" || item.key === "/resume"
);

export function Header({ name }: { name: string }) {
  const pathname = usePathname() ?? "";
  const [preview, setPreview] = useState<number | null>(null);
  const [contactActive, setContactActive] = useState(false);

  useEffect(() => {
    const updateHash = () => setContactActive(pathname === "/" && window.location.hash === "#contact");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const activeIndex = items.findIndex((item) => {
    if (item.key === "/contact") return pathname === "/" && contactActive;
    if (item.key === "/") return pathname === "/" && !contactActive;
    return pathname.startsWith(item.key);
  });
  const highlighted = preview ?? activeIndex;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav
          className={styles.dock}
          aria-label={`${name}, main navigation`}
          style={{ "--active-index": Math.max(0, highlighted), "--item-count": items.length } as CSSProperties}
          onMouseLeave={() => setPreview(null)}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPreview(null); }}
        >
          <span className={styles.glass} aria-hidden="true" style={{ opacity: highlighted < 0 ? 0 : 1 }} />
          {items.map((item, index) => {
            const Icon = item.icon;
            const resume = item.key === "/resume";
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.dockLink} ${highlighted === index ? styles.dockActive : ""}`}
                aria-label={resume ? "Resume (PDF, opens in a new tab)" : item.label}
                aria-current={index === activeIndex ? "page" : undefined}
                {...(resume ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onMouseEnter={() => setPreview(index)}
                onFocus={() => setPreview(index)}
                onClick={() => { if (!resume) setContactActive(item.key === "/contact"); }}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
