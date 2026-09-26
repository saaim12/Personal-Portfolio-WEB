import { getPosts } from "@/utils/utils";

import { ProjectCard } from "@/components/ProjectCard";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  /** Show exactly these slugs, in this order. Skips date sorting and `range`. */
  only?: string[];
}

export function Projects({ range, exclude, only }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Named selection: the caller decides both the set and the order. Grouping
  // projects by kind is not something a publish date can express, and a
  // date-sliced preview silently reshuffles itself on the next case study.
  const displayedProjects = only
    ? only.flatMap((slug) => sortedProjects.filter((post) => post.slug === slug))
    : range
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
          stack={post.metadata.stack}
          thumbnail={post.metadata.thumbnail}
          hardPart={post.metadata.hardPart}
          // Slug, not title: the event name has to stay stable in the
          // dashboard when a case study is retitled.
          track={`work_card:${post.slug}`}
        />
      ))}
    </div>
  );
}
