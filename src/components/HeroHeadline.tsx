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
        // Caps at 3.25rem. The headline is a full sentence now, and at 4rem it
        // ran to five lines and swallowed the fold; the subline and the buttons
        // underneath are what the reader is meant to reach.
        fontSize: "clamp(1.75rem, 4.2vw, 3.25rem)",
        lineHeight: 1.06,
        letterSpacing: "-0.03em",
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="heroWord"
          // 35ms a word, not 65: at nineteen words the old step left the last
          // line still arriving well over a second in.
          style={{ "--word-delay": `${100 + i * 35}ms` } as CSSProperties}
        >
          {i < words.length - 1 ? `${w} ` : w}
        </span>
      ))}
    </Heading>
  );
}
