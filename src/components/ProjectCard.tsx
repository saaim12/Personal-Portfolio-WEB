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
}

// Restrained project card: hairline border, monospace tags, arrow that travels
// on hover. Replaces a 1.5px gradient frame drawn from six unrelated colour
// pairs plus a blurred glow and a 25-cell 3D tilt.
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
}) => (
  <a className="card projCard" href={href}>
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
