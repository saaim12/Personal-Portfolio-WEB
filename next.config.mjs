/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false, // hide the Next.js dev overlay button (bottom-left "N")
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],

  // One trailing-slash convention, site-wide: none, on any URL including the
  // root. `false` is the default but it is stated here because it is the
  // source of truth for two other files. Next normalises
  // `alternates.canonical` against this setting, so the homepage renders as a
  // bare "https://saaim.site" even if pageMeta passes the slashed form, and
  // sitemap.ts is written to match. Flipping this silently changes both.
  trailingSlash: false,

  async redirects() {
    return [
      // saaim.online was serving a second live copy of the entire site.
      //
      // The apex 308s to www.saaim.online, and www.saaim.online answered 200
      // with the full site rather than redirecting onward. Every page of that
      // copy already carried the right canonical (https://saaim.site/...), a
      // robots.txt naming saaim.site as Host, and a sitemap of saaim.site
      // URLs, and Google picked it as canonical anyway. That is the expected
      // outcome: rel=canonical is a hint that a crawler weighs against other
      // signals, while a 308 is a directive it cannot reinterpret. Two
      // reachable copies of a page is the problem; the tag was never going to
      // fix it.
      //
      // This must not match saaim.site itself or it redirects to its own host
      // forever, hence matching the .online domain specifically.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?saaim\\.online" }],
        destination: "https://saaim.site/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    // Both of these are barrel files. Importing six components from Once UI
    // pulled its whole index, which is how Recharts ended up in the bundle of
    // a site with no charts; react-icons has the same shape with thousands of
    // icon modules. This rewrites each named import to its own deep path so
    // only what is used gets bundled.
    // react-icons/si matters most: Simple Icons is ~3,000 modules and the
    // technology map imports 44 of them by name.
    optimizePackageImports: [
      "react-icons/hi2",
      "react-icons/pi",
      "react-icons/si",
      "react-icons/fa6",
    ],
  },
  images: {
    // Modern formats first — Next falls back to the original for browsers
    // that don't accept them.
    formats: ["image/avif", "image/webp"],
    // (The www.google.com remotePattern was template leftover; no image on the
    // site loads from it.)
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
