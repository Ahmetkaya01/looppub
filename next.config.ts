import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep workspace root inside loop-pub (parent Test/ has no app)
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "123.limonpos.com.tr" },
      { protocol: "https", hostname: "170.limonpos.com.tr" },
      { protocol: "https", hostname: "limonmenu.com" },
      { protocol: "https", hostname: "static.ticimax.cloud" },
    ],
  },
};

export default nextConfig;
