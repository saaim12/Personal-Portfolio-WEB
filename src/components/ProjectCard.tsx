import { TiltCard } from "@/components";

interface ProjectCardProps {
  href: string;
  title: string;
  description: string;
  tags?: string[];
  /** Picks this card's gradient from the TiltCard palette. */
  index?: number;
}

// Clickable tilt card → the case study. Title/tags tint to the card's gradient.
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  description,
  tags = [],
  index = 0,
}) => {
  return (
    <TiltCard index={index} href={href} ariaLabel={`${title} — read case study`}>
      <div className="tiltBody">
        {title && <h3 className="tiltTitle">{title}</h3>}
        {tags.length > 0 && (
          <div className="tiltTags">
            {tags.map((t) => (
              <span key={t} className="tiltTag">
                {t}
              </span>
            ))}
          </div>
        )}
        {description?.trim() && <p className="tiltDesc">{description}</p>}
        <span className="tiltMore">Read case study →</span>
      </div>
    </TiltCard>
  );
};
