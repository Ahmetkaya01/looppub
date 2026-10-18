import type { NextConfig } from "next";
import path from "path";

/** Only GitHub project Pages needs /looppub; Vercel serves from domain root. */
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPages ? "/looppub" : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
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
