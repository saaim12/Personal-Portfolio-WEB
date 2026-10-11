import { SiteAnchor } from "@/components/SiteAnchor";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps, ReactNode } from "react";
import { HeadingLink } from "@once-ui-system/core/modules";
import { List } from "@once-ui-system/core/components/List";
import { ListItem } from "@once-ui-system/core/components/ListItem";
import { Text } from "@once-ui-system/core/components/Text";
import { headingId } from "@/utils/headingId";

function ContentLink({ href, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <SiteAnchor href={href} {...props}>{children}</SiteAnchor>;
  if (href.startsWith("#")) return <SiteAnchor href={href} {...props}>{children}</SiteAnchor>;
  return <SiteAnchor href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</SiteAnchor>;
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <HeadingLink marginTop="24" marginBottom="12" as="h2" id={headingId(String(children))}>
      {children}
    </HeadingLink>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <HeadingLink marginTop="24" marginBottom="12" as="h3" id={headingId(String(children))}>
      {children}
    </HeadingLink>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="caseTableScroll" role="region" aria-label="Project details table" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <Text style={{ lineHeight: "175%" }} variant="body-default-m" onBackground="neutral-medium" marginTop="8" marginBottom="12">
      {children}
    </Text>
  ),
  a: ContentLink,
  ul: ({ children }: { children?: ReactNode }) => <List as="ul">{children}</List>,
  ol: ({ children }: { children?: ReactNode }) => <List as="ol">{children}</List>,
  li: ({ children }: { children?: ReactNode }) => (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>{children}</ListItem>
  ),
};

// Current project documents use Markdown only; JSX execution is not enabled.
export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />;
}
