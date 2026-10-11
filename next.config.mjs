/** @type {import('next').NextConfig} */
const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (basePath && (!basePath.startsWith("/") || basePath.endsWith("/") || basePath.includes(".."))) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be a path such as /Personal-Portfolio-WEB, without a trailing slash.");
}
const nextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  basePath,
  poweredByHeader: false,
  devIndicators: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  trailingSlash: staticExport,

  ...(!staticExport ? { async redirects() {
    return [
      ...[
        ["/about", "/professional-experience"],
        ["/experience", "/professional-experience"],
        ["/work/:path*", "/projects/:path*"],
        ["/case-study/:path*", "/projects/:path*"],
        ["/case-studies/:path*", "/projects/:path*"],
      ].map(([source, destination]) => ({
        source,
        has: [{ type: "host", value: "(www\\.saaim\\.site|(www\\.)?saaim\\.online)" }],
        destination: `https://saaim.site${destination}`,
        permanent: true,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.saaim\\.site" }],
        destination: "https://saaim.site/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?saaim\\.online" }],
        destination: "https://saaim.site/:path*",
        permanent: true,
      },
      { source: "/about", destination: "/professional-experience", permanent: true },
      { source: "/experience", destination: "/professional-experience", permanent: true },
      { source: "/work/:path*", destination: "/projects/:path*", permanent: true },
      { source: "/case-study/:path*", destination: "/projects/:path*", permanent: true },
      { source: "/case-studies/:path*", destination: "/projects/:path*", permanent: true },
    ];
  } } : {}),
  experimental: {
    optimizePackageImports: [
      "react-icons/hi2",
      "react-icons/pi",
      "react-icons/si",
      "react-icons/fa6",
    ],
  },
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
