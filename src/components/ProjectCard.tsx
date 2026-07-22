import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  title: string;
  content: string;
  description: string;
  tags?: string[];
  link: string;
}

// No image. Collapsed shows title + tech tags; hover/focus opens the detail
// panel with the explanation and links. (CSS handles the reveal — see the
// module; touch devices show it by default.)
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  content,
  description,
  tags = [],
  link,
}) => {
  return (
    <div className={styles.card} tabIndex={0}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      )}
      <div className={styles.detail}>
        <div className={styles.detailInner}>
          {description?.trim() && <p className={styles.desc}>{description}</p>}
          <div className={styles.links}>
            {content?.trim() && (
              <a className={styles.link} href={href}>
                Read case study →
              </a>
            )}
            {link && (
              <a className={styles.link} href={link} target="_blank" rel="noopener noreferrer">
                View project ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
