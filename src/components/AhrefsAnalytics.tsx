import Script from "next/script";

/** Ahrefs Analytics is loaded only on the canonical Vercel production site. */
export function AhrefsAnalytics() {
  if (process.env.VERCEL_ENV !== "production" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return null;
  }

  return (
    <Script
      id="ahrefs-analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="aud2g4LondqeFBL7UX3bqg"
      strategy="afterInteractive"
    />
  );
}
