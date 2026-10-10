"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiHome, HiHeart, HiBars2, HiXMark } from "react-icons/hi2";
import { person } from "@/resources/content";
import { Mark, Ruler } from "./Studio";
const links = [
  { href: "/", label: "Home", symbol: "home" },
  { href: "/about", label: "About", symbol: "flower" },
  { href: "/work", label: "Case study", symbol: "spool" },
  { href: "/services", label: "Services", symbol: "stack" },
  { href: "/journal", label: "Journal", symbol: "tree" },
  { href: "/playground", label: "Playground", symbol: "steps" },
];
export function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <header className="studioHeader" ref={header}>
    <div className="navBar">
      <Link href="/" className="brandMark" aria-label={`${name}, home`}><Mark kind="rainbow" /></Link>
      <nav id="main-navigation" className={`navLinks ${open ? "isOpen" : ""}`} aria-label="Main navigation">
        {links.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={(item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href) || item.href === "/about" && pathname === "/experience") ? "page" : undefined}>
          {item.symbol === "home" ? <HiHome aria-hidden="true" /> : <Mark kind={item.symbol} />}<span>{item.label}</span>
        </Link>)}
        <Link href="/contact" className="mobileContact" onClick={() => setOpen(false)}><HiHeart />Contact</Link>
      </nav>
      <div className="navActions">
        <a className="navCircle" href={`mailto:${person.email}`} aria-label="Email Saaim">EM</a>
        <a className="navCircle" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF">CV</a>
        <Link href="/about" className="navAvatar" aria-label="About Saaim"><Image src={person.avatar} width={32} height={32} alt="" /></Link>
        <Link href="/contact" className="navContact"><HiHeart aria-hidden="true" />Contact</Link>
      </div>
      <button ref={toggle} className="menuToggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}{open ? <HiXMark /> : <HiBars2 />}</button>
    </div><Ruler />
  </header>;
}
