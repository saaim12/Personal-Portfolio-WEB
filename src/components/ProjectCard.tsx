import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { TechList } from "./Tech";

interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
  /** Category labels ("Client work", "Data engineering"), rendered as text. */
  tags?: string[];
  /** Canonical technology keys, rendered as an icon-only row. */
  stack?: string[];
  /** 16:9 image. Absent, the monogram tile stands in at the same ratio. */
  thumbnail?: string;
  /** One line on the part that was actually hard. */
  hardPart?: string;
  /** Vercel Analytics event name, fired by the delegated listener in Track. */
  track?: string;
}

// Restrained project card: hairline border, monospace tags, arrow that travels
// on hover. Replaces a 1.5px gradient frame drawn from six unrelated colour
// pairs plus a blurred glow and a 25-cell 3D tilt.
//
// The whole card is one anchor and always has been, so there is nothing to
// hunt for and nothing nested inside it that competes for the click.
//
// Tags and stack are separate on purpose. The card used to mix category labels
// and technology names in one text row, which meant "Client work" and "Django"
// were typeset identically despite being different kinds of fact. Categories
// stay as text at the top; the stack is a logo strip at the foot, where it can
// be read at a glance without competing with the title.
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  description,
  tags = [],
  stack = [],
  thumbnail,
  hardPart,
  track,
}) => (
  <a className="card projCard" href={href} data-track={track}>
    {/* Fixed 16:9 box either way, so a case study gaining a diagram later
        does not reflow the grid it sits in. */}
    <div className="projThumb">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 760px) 100vw, 480px"
        />
      ) : (
        <span className="projThumbMark" aria-hidden="true">
          {title.charAt(0)}
        </span>
      )}
    </div>

    {tags.length > 0 && (
      <div className="projTags">
        {tags.map((t) => (
          <span key={t} className="projTag">
            {t}
          </span>
        ))}
      </div>
    )}
    <h3 className="cardTitle">{title}</h3>
    {description?.trim() && <p className="cardDesc">{description}</p>}
    {/* Scope is the half a reviewer already assumes. This is the half that
        separates a build from a tutorial, so it gets its own rule. */}
    {hardPart?.trim() && (
      <p className="projHard">
        <span className="projHardLabel">The hard part</span>
        {hardPart}
      </p>
    )}
    {stack.length > 0 && (
      <div className="projStack">
        <TechList items={stack} variant="icon" label={`${title}: technologies used`} />
      </div>
    )}
    <span className="projMore">
      Read case study
      <HiArrowRight aria-hidden="true" />
    </span>
  </a>
);
