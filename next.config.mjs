/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?saaim\\.online" }],
        destination: "https://saaim.site/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "react-icons/hi2",
      "react-icons/pi",
      "react-icons/si",
      "react-icons/fa6",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
