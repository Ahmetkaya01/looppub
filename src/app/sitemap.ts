import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { MENU_TAB_CATEGORIES } from "@/lib/menu-tabs";
import { fetchCategoryPayloadServer } from "@/lib/menu-server";

const ALL_CATEGORY_IDS = [
  ...new Set([
    ...MENU_TAB_CATEGORIES.snacks,
    ...MENU_TAB_CATEGORIES.beers,
    ...MENU_TAB_CATEGORIES.cocktails,
  ]),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const seen = new Set<number>();

  for (const categoryId of ALL_CATEGORY_IDS) {
    const data = await fetchCategoryPayloadServer(categoryId);
    if (!data) continue;

    const products = [
      ...data.products,
      ...(data.subcategories?.flatMap((s) => s.products) ?? []),
    ];

    for (const product of products) {
      if (seen.has(product.id)) continue;
      seen.add(product.id);
      entries.push({
        url: `${SITE_URL}/menu/${product.id}?category=${categoryId}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
