import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false, // hide the Next.js dev overlay button (bottom-left "N")
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    // Both of these are barrel files. Importing six components from Once UI
    // pulled its whole index, which is how Recharts ended up in the bundle of
    // a site with no charts; react-icons has the same shape with thousands of
    // icon modules. This rewrites each named import to its own deep path so
    // only what is used gets bundled.
    optimizePackageImports: ["react-icons/hi2", "react-icons/pi"],
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

export default withMDX(nextConfig);
