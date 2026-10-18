import type { NextConfig } from "next";
import path from "path";

/** Project Pages URL: https://ahmetkaya01.github.io/looppub/ */
const basePath = "/looppub";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (Vercel/Netlify credits exhausted)
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "123.limonpos.com.tr" },
      { protocol: "https", hostname: "170.limonpos.com.tr" },
      { protocol: "https", hostname: "limonmenu.com" },
      { protocol: "https", hostname: "static.ticimax.cloud" },
    ],
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
