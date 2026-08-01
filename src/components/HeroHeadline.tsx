import { Heading } from "@once-ui-system/core";
import type { CSSProperties } from "react";

// Per-word rise on load. Was Framer Motion; now a CSS keyframe with a
// per-word delay, which means this component ships zero JavaScript and the
// headline is in the HTML for crawlers either way.
export function HeroHeadline({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <Heading
      wrap="balance"
      variant="display-strong-l"
      style={{
        // Caps at 4rem: 4.5rem forced this headline onto three lines and broke
        // it at "and ship / production / systems".
        fontSize: "clamp(1.875rem, 5.2vw, 4rem)",
        lineHeight: 1.06,
        letterSpacing: "-0.03em",
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="heroWord"
          style={{ "--word-delay": `${100 + i * 65}ms` } as CSSProperties}
        >
          {i < words.length - 1 ? `${w} ` : w}
        </span>
      ))}
    </Heading>
  );
}
