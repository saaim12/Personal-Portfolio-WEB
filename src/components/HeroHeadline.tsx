import type { CSSProperties } from "react";

// Per-word rise on load. Was Framer Motion; now a CSS keyframe with a
// per-word delay, which means this component ships zero JavaScript and the
// headline is in the HTML for crawlers either way.
export function HeroHeadline({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <h1 className="heroTitle">
      {words.map((w, i) => (
        <span
          key={words.slice(0, i + 1).join(" ")}
          className="heroWord"
          // 35ms a word, not 65: at nineteen words the old step left the last
          // line still arriving well over a second in.
          style={{ "--word-delay": `${100 + i * 35}ms` } as CSSProperties}
        >
          {i < words.length - 1 ? `${w} ` : w}
        </span>
      ))}
    </h1>
  );
}
