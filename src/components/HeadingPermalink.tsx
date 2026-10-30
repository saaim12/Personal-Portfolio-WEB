"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** A small interactive island; article text and lists stay server-rendered HTML. */
export function HeadingPermalink({ as: Heading, id, children }: { as: "h2" | "h3"; id: string; children?: ReactNode }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
      setMessage("Link copied to clipboard.");
    } catch {
      window.location.hash = id;
      setMessage("Section link opened. You can copy it from the address bar.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2500);
  }
  return <>
    <Heading id={id}><button className="caseHeadingCopy" type="button" onClick={copyLink} aria-label={`Copy link to ${String(children)}`}>
      {children}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 2 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" fill="none" stroke="currentColor" strokeWidth="1.5" transform="translate(1 1)"/></svg>
    </button></Heading>
    {message && <span className="casePermalinkStatus" role="status">{message}</span>}
  </>;
}
