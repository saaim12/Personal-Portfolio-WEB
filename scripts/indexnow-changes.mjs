/** Resolve source changes to published URLs, never to literal dynamic route names. */
export function urlsForChanges(files, urls, origin) {
  const available = new Set(urls);
  const selected = new Set();
  for (const file of files) {
    const project = file.match(/^src\/app\/projects\/content\/(.+)\.mdx$/);
    const page = file.match(/^src\/app\/(.*?)\/page\.(tsx|ts|jsx|js)$/);
    if (project) {
      const url = `${origin}/projects/${project[1]}`;
      if (available.has(url)) selected.add(url);
      // Project summaries also appear in both indexes.
      for (const index of [origin, `${origin}/`, `${origin}/projects`]) {
        if (available.has(index)) selected.add(index);
      }
    } else if (page && !page[1].includes('[')) {
      const url = `${origin}/${page[1]}`;
      if (available.has(url)) selected.add(url);
    } else if (/^(src\/|public\/|next\.config\.|package(?:-lock)?\.json$)/.test(file)) {
      // Shared resources, templates, build changes and assets can affect every page.
      for (const url of available) selected.add(url);
    }
  }
  return [...selected];
}
