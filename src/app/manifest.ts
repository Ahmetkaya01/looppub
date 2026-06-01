import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#D4AF37",
    lang: "tr",
    scope: "/",
    id: SITE_URL,
    categories: ["food", "lifestyle"],
  };
}
