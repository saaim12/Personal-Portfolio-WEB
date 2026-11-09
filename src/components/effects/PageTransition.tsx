"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PixelBlocks } from "./PixelBlocks";

/** After a client-side navigation, the new page is revealed through a dissolving block grid. */
export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setKey(k => k + 1);
    const timer = setTimeout(() => setKey(0), 900);
    return () => clearTimeout(timer);
  }, [pathname]);
  return key ? <PixelBlocks key={key} columns={12} rows={8} spread={0.45} className="pageBlocks" /> : null;
}
