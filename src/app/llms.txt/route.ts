import { getProjects } from "@/utils/projects";
import { baseURL } from "@/resources/once-ui.config";
import { person, home } from "@/resources/content";

export const dynamic = "force-static";

/** Optional reading index; it does not promise AI visibility or search rankings. */
export function GET() {
  const content = [
    `# ${person.name}`,
    "",
    `> ${home.description}`,
    "",
    "Software engineering portfolio. Case studies distinguish delivered work, implementation facts, proposed hardening, and unmeasured targets.",
    "",
    "## Portfolio",
    `- [Home](${baseURL}): Professional overview and featured work.`,
    `- [Professional experience and story](${baseURL}/professional-experience): Work, education, and delivery evidence.`,
    `- [Projects](${baseURL}/projects): Product and engineering case studies, followed by learning repositories.`,
    `- [Services](${baseURL}/services): Backend, product, data/AI, and cloud delivery.`,
    `- [Journal](${baseURL}/journal): Summaries and links to original Medium articles.`,
    `- [Contact](${baseURL}/contact): Email, booking, and professional contact options.`,
    "",
    "## Case studies and learnings",
    ...getProjects().map(project => `- [${project.metadata.title}](${baseURL}/projects/${project.slug}): ${project.metadata.summary}`),
    "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
