"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Report the page, never query parameters or fragments supplied by visitors.
function pageOnly<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}

export function VercelMonitoring() {
  return (
    <>
      <Analytics beforeSend={pageOnly} debug={false} />
      <SpeedInsights beforeSend={pageOnly} debug={false} />
    </>
  );
}
