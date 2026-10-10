import { work } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { Projects } from "@/components/work/Projects";
import { PageHeading } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { featuredSlugs } from "@/resources/project-art";
import { getPosts } from "@/utils/utils";
export async function generateMetadata() { return pageMeta({ title: work.title, description: work.description, path: work.path }); }
export default function Work() {
  const slugs = [...featuredSlugs, ...getPosts(["src","app","work","projects"]).map(p => p.slug).filter(s => !featuredSlugs.includes(s))];
  return <div className="studioPage"><div className="studioContainer"><PageHeading title="Case studies"><p>The problem, the build, and the decisions along the way.</p></PageHeading><Projects only={slugs} showcase /></div><Contact /></div>;
}
