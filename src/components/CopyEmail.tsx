"use client";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  }
  return <button type="button" className="copyEmail" onClick={copy} aria-label={`Copy email address ${email}`}><span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span></button>;
}
