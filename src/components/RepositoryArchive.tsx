const forks = [
  ["alexandria-cover-designer", "Alexandria cover designer"],
  ["RedirectingTinyUrl", "Redirecting Tiny URL"],
  ["sdk-for-customer-facing-channels", "Customer-facing channels SDK"],
] as const;

export function RepositoryArchive() {
  return <section className="repositoryArchive" aria-labelledby="archive-title">
    <h2 id="archive-title">More on GitHub</h2>
    <p>Explore the rest of my public repositories, including these forks of community projects.</p>
    <div className="archiveLinks">{forks.map(([repo, name]) => <a className="btn btn--secondary" key={repo} href={`https://github.com/saaim12/${repo}`} target="_blank" rel="noopener noreferrer">{name} · Fork ↗</a>)}</div>
    <div className="archiveLinks"><a className="btn btn--primary" href="https://github.com/saaim12?tab=repositories" target="_blank" rel="noopener noreferrer">Browse all repositories ↗</a><a className="btn btn--secondary" href="https://github.com/saaim12/Personal-Portfolio-WEB" target="_blank" rel="noopener noreferrer">This portfolio’s source ↗</a></div>
  </section>;
}
