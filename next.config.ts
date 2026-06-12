import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.limonpos.com.tr" },
      { protocol: "https", hostname: "limonmenu.com" },
      { protocol: "https", hostname: "static.ticimax.cloud" },
    ],
  },
};

export default nextConfig;
