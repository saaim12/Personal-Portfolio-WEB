import { work } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { Projects } from "@/components/projects/Projects";
import { PageHeading } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { featuredSlugs, projectArt } from "@/resources/project-art";
import { getProjects } from "@/utils/projects";
import { PageSchema } from "@/components/PageSchema";
import { jsonLd, projectIndexJsonLd } from "@/resources/schema";
export async function generateMetadata() { return pageMeta({ title: work.title, description: work.description, path: work.path }); }
export default function Work() {
  const projects = getProjects();
  const slugs = [...featuredSlugs, ...projects.map(p => p.slug).filter(s => !featuredSlugs.includes(s))];
  const indexedProjects = slugs.flatMap(slug => projects.filter(project => project.slug === slug)).map(project => ({
    slug: project.slug,
    title: projectArt[project.slug]?.title || project.metadata.title,
    description: project.metadata.cardSummary || project.metadata.summary,
  }));
  return <div className="studioPage"><PageSchema title={work.title} description={work.description} path={work.path} /><script {...jsonLd(projectIndexJsonLd(indexedProjects))} /><div className="studioContainer"><PageHeading title="Projects"><p>The problem, the build, and the decisions along the way.</p></PageHeading><Projects only={slugs} showcase /></div><Contact /></div>;
}
