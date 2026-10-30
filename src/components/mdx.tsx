import { SiteAnchor } from "@/components/SiteAnchor";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps, ReactNode } from "react";
import { HeadingPermalink } from "@/components/HeadingPermalink";
import { headingId } from "@/utils/headingId";

function ContentLink({ href, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <SiteAnchor href={href} {...props}>{children}</SiteAnchor>;
  if (href.startsWith("#")) return <SiteAnchor href={href} {...props}>{children}</SiteAnchor>;
  return <SiteAnchor href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</SiteAnchor>;
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <HeadingPermalink as="h2" id={headingId(String(children))}>
      {children}
    </HeadingPermalink>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <HeadingPermalink as="h3" id={headingId(String(children))}>
      {children}
    </HeadingPermalink>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="caseTableScroll" role="region" aria-label="Project details table" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="caseParagraph">
      {children}
    </p>
  ),
  a: ContentLink,
  ul: ({ children }: { children?: ReactNode }) => <ul>{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol>{children}</ol>,
  li: ({ children }: { children?: ReactNode }) => (
    <li>{children}</li>
  ),
};

// Current project documents use Markdown only; JSX execution is not enabled.
export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />;
}
