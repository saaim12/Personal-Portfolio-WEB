import Script from "next/script";

/**
 * Microsoft Clarity is optional, production-only and disabled for the
 * static GitHub Pages mirror. Set NEXT_PUBLIC_CLARITY_PROJECT_ID on Vercel.
 */
export function ClarityAnalytics() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
  if (!projectId || process.env.VERCEL_ENV !== "production" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(projectId)});`}
    </Script>
  );
}
