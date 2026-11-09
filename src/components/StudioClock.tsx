"use client";
import { person } from "@/resources/content";
import { useEffect, useState } from "react";
/** Local time in Lahore, shown in the header as mono text. */
export function StudioClock({ className = "studioClock" }: { className?: string }) {
  const [time, setTime] = useState("PKT");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-US", { timeZone: person.location, hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date()));
    tick(); const timer = setInterval(tick, 15000); return () => clearInterval(timer);
  }, []);
  return <span className={className} aria-label={`Local time in Lahore: ${time}`}>{time}</span>;
}
