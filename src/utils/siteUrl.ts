/** Keep a repository-path prefix when composing canonical URLs. */
export function normalizeSiteUrl(value: string): string {
  const url = new URL(value.trim());
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || /[?#]/.test(url.href)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) site URL without credentials, query parameters, or a fragment.");
  }
  return url.href.replace(/\/+$/, "");
}

export function absoluteSiteUrl(base: string, path = "/"): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[\\?#]|%2f|%5c/i.test(path) || path.split("/").some(part => [".", ".."].includes(decodeURIComponent(part)))) {
    throw new Error(`Expected a canonical site path, received: ${path}`);
  }
  return path === "/" ? base : new URL(`${base}${path}`).href;
}
