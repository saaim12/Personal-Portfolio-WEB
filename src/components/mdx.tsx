import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, ReactNode } from "react";
import { HeadingLink, List, ListItem, SmartLink, Text } from "@once-ui-system/core";
import { headingId } from "@/utils/headingId";

function ContentLink({ href, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/")) return <SmartLink href={href} {...props}>{children}</SmartLink>;
  if (href.startsWith("#")) return <a href={href} {...props}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <HeadingLink marginTop="24" marginBottom="12" as="h2" id={headingId(String(children))}>
      {children}
    </HeadingLink>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <Text style={{ lineHeight: "175%" }} variant="body-default-m" onBackground="neutral-medium" marginTop="8" marginBottom="12">
      {children}
    </Text>
  ),
  a: ContentLink,
  ul: ({ children }: { children?: ReactNode }) => <List as="ul">{children}</List>,
  li: ({ children }: { children?: ReactNode }) => (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>{children}</ListItem>
  ),
};

// Current project documents use Markdown only; JSX execution is not enabled.
export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
