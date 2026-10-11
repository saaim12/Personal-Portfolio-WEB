"use client";
import { person } from "@/resources/content";
import { useEffect, useState } from "react";
export function StudioClock() {
  const [time, setTime] = useState("Lahore · PKT");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-US", { timeZone: person.location, hour: "numeric", minute: "2-digit", second: "2-digit" }).format(new Date()));
    tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer);
  }, []);
  return <div className="studioClock" aria-label="Local time in Lahore">{time}</div>;
}
