import { getPosts } from "@/utils/utils";

import { ProjectCard } from "@/components/ProjectCard";
import styles from "./Projects.module.css";
import { ProjectGallery } from "./ProjectGallery";

interface ProjectsProps {
  preview?: boolean;
  showcase?: boolean;
  range?: [number, number?];
  exclude?: string[];
  /** Show exactly these slugs, in this order. Skips date sorting and `range`. */
  only?: string[];
}

export function Projects({ range, exclude, only, showcase = false, preview = false }: ProjectsProps) {
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

  const card = (post: (typeof displayedProjects)[number], index: number) => (
        <ProjectCard
          key={post.slug}
          treatment={showcase ? index % 4 === 1 ? "feature" : index % 4 === 2 ? "compact" : "standard" : "standard"}
          href={`/work/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.cardSummary || post.metadata.summary}
          result={post.metadata.result}
          source={post.metadata.link}
          tags={post.metadata.tags}
          stack={post.metadata.stack}
          thumbnail={post.metadata.thumbnail}
          hardPart={post.metadata.hardPart}
          // Slug, not title: the event name has to stay stable in the
          // dashboard when a case study is retitled.
          track={`work_card:${post.slug}`}
        />
  );
  if (!showcase) return <div className={preview ? styles.preview : styles.related}>{displayedProjects.map(card)}</div>;
  const products = ["fitter-health-platform", "bookstore-platform", "temporary-url-service", "interactive-portfolio"];
  const experiments = ["esp32-temperature-inference", "autoencoder-edge-compression", "algorithms-in-python", "ml-data-foundations"];
  return <ProjectGallery items={displayedProjects.map((post, index) => ({ slug: post.slug, category: products.includes(post.slug) ? "Product & web" : experiments.includes(post.slug) ? "Experiments and Learning" : "AI & data", card: card(post, index) }))} />;
}
