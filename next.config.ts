import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (Vercel/Netlify credits exhausted)
  output: "export",
  trailingSlash: true,
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
