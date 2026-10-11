import type { ComponentProps } from "react";
import { sitePath } from "@/utils/sitePath";

/** Native anchors also work for downloads and on static hosting. */
export function SiteAnchor({ href, ...props }: ComponentProps<"a">) {
  return <a {...props} href={href ? sitePath(href) : href} />;
}
