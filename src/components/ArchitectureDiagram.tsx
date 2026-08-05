import Image from "next/image";

// An architecture diagram is the one image on a case study a reader is expected
// to actually study, and the case study body is deliberately narrow (`maxWidth
// xs`) because that is the readable measure for prose. Those two facts are in
// direct conflict, which is why this component exists rather than a plain
// `![](…)`: it breaks out of the text column, and below the width where the
// diagram is still legible it scrolls inside its own frame instead of shrinking
// to an unreadable smudge.
//
// The full-resolution source is a click away in a new tab, because past a
// certain amount of detail no responsive rendering substitutes for zooming.

type Props = {
  src: string;
  /** A sentence describing the architecture, not a filename. */
  alt: string;
  caption: string;
  /**
   * Optional line above the image, in muted small caps. Used where the image
   * needs a qualifier that must be read before the image itself, e.g. that a
   * diagram is a reference architecture rather than the shipped system.
   */
  label?: string;
  /** Intrinsic pixel dimensions of the source, so nothing shifts on load. */
  width: number;
  height: number;
};

export function ArchitectureDiagram({ src, alt, caption, label, width, height }: Props) {
  return (
    <figure className="archFigure">
      {label && <span className="archLabel">{label}</span>}
      <div className="archScroll">
        <a
          className="archLink"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${alt} Opens the full-resolution image in a new tab.`}
        >
          <Image
            className="archImage"
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1120px) 100vw, 1120px"
          />
        </a>
      </div>
      {/* Shown only at widths where `.archScroll` can actually overflow. A
          scrollable region with no visible edge is a region most readers never
          discover. */}
      <span className="archHint" aria-hidden="true">
        Scroll to see the whole diagram
      </span>
      <figcaption className="archCaption">{caption}</figcaption>
    </figure>
  );
}
