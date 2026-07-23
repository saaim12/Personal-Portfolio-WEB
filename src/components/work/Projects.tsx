import { getPosts } from "@/utils/utils";
import { Column, Row } from "@once-ui-system/core";
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
    // Responsive grid: cards wrap — 1-up on phones, 2-up once there's room
    // (each cell is min ~20rem). No fixed columns, so nothing overflows.
    <Row fillWidth gap="l" marginBottom="40" wrap vertical="start">
      {displayedProjects.map((post, i) => (
        <Column key={post.slug} flex={1} minWidth={20}>
          <ProjectCard
            index={i}
            href={`/work/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            tags={post.metadata.tags}
          />
        </Column>
      ))}
    </Row>
  );
}
