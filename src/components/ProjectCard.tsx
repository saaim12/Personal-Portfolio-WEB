import { HiArrowRight } from "react-icons/hi2";

interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
  tags?: string[];
}

// Restrained project card: hairline border, monospace tags, arrow that travels
// on hover. Replaces a 1.5px gradient frame drawn from six unrelated colour
// pairs plus a blurred glow and a 25-cell 3D tilt.
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  description,
  tags = [],
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
    <span className="projMore">
      Read case study
      <HiArrowRight aria-hidden="true" />
    </span>
  </a>
);
