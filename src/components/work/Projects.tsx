import { getPosts } from "@/utils/utils";

import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    // Auto-fit grid: 1-up on phones, 2-up once there's room. No fixed column
    // count, so nothing overflows at any width.
    <div className="cardGrid cardGrid--2">
      {displayedProjects.map((post) => (
        <ProjectCard
          key={post.slug}
          href={`/work/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          tags={post.metadata.tags}
        />
      ))}
    </div>
  );
}
