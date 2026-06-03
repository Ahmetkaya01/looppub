import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** Static sitemap — menu pages are discoverable via internal links; avoids build timeouts from POS API. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
