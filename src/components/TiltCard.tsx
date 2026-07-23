import type { CSSProperties, ReactNode } from "react";

// Distinct gradient per card — cycles if there are more cards than pairs.
// The title/icon tint (--tint) is derived from --grad-start in custom.css.
const GRADIENTS: Array<[string, string]> = [
  ["#4158d0", "#c850c0"], // indigo → magenta
  ["#0093e9", "#80d0c7"], // blue → aqua
  ["#8a2387", "#f27121"], // purple → orange
  ["#43c6ac", "#654ea3"], // teal → violet
  ["#ff512f", "#dd2476"], // orange → pink
  ["#1fa2ff", "#12d8fa"], // sky → cyan
];

const CELLS = Array.from({ length: 25 }, (_, i) => i + 1);

type TiltCardProps = {
  /** Picks the gradient from the palette (by position in a list). */
  index?: number;
  /** If set, the whole card becomes a link (clicks bubble past the tilt overlay). */
  href?: string;
  ariaLabel?: string;
  children: ReactNode;
};

// Pure-CSS 3D tilt: a 5×5 grid of invisible cells; CSS `:has(.tr-N:hover)`
// rotates the card toward the hovered region. No JS, no layout thrash — only
// transform/opacity. Disabled on touch + reduced-motion (see custom.css).
export function TiltCard({ index = 0, href, ariaLabel, children }: TiltCardProps) {
  const [start, end] = GRADIENTS[index % GRADIENTS.length];
  const inner = (
    <>
      <div className="tiltFace">{children}</div>
      <div className="tiltTrack" aria-hidden="true">
        {CELLS.map((n) => (
          <span key={n} className={`tr tr-${n}`} />
        ))}
      </div>
    </>
  );

  return (
    <div className="tiltCard" style={{ "--grad-start": start, "--grad-end": end } as CSSProperties}>
      {href ? (
        <a className="tiltInner" href={href} aria-label={ariaLabel}>
          {inner}
        </a>
      ) : (
        <div className="tiltInner">{inner}</div>
      )}
    </div>
  );
}
