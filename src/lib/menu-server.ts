import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { readCachedCategoryPayload } from "./menu-cache";
import {
  findProductInPayload,
  type MenuCategoryPayload,
  type MenuProduct,
} from "./menu";

export async function fetchCategoryPayloadServer(
  categoryId: number,
): Promise<MenuCategoryPayload | null> {
  return readCachedCategoryPayload(categoryId);
}

export async function fetchProductForSeo(
  productId: number,
  categoryId: number,
): Promise<MenuProduct | null> {
  const data = await fetchCategoryPayloadServer(categoryId);
  if (!data) {
    // Fall back: scan all cached categories
    const cacheDir = path.join(process.cwd(), "public", "menu-cache");
    if (!existsSync(cacheDir)) return null;
    for (const file of readdirSync(cacheDir).filter((f) =>
      /^\d+\.json$/.test(f),
    )) {
      try {
        const payload = JSON.parse(
          readFileSync(path.join(cacheDir, file), "utf8"),
        ) as MenuCategoryPayload;
        const found = findProductInPayload(payload, productId);
        if (found) return found;
      } catch {
        /* skip */
      }
    }
    return null;
  }
  return findProductInPayload(data, productId);
}

export function listCachedProductParams(): { productId: string }[] {
  const cacheDir = path.join(process.cwd(), "public", "menu-cache");
  if (!existsSync(cacheDir)) return [];

  const seen = new Set<number>();
  const results: { productId: string }[] = [];

  for (const file of readdirSync(cacheDir).filter((f) =>
    /^\d+\.json$/.test(f),
  )) {
    try {
      const data = JSON.parse(
        readFileSync(path.join(cacheDir, file), "utf8"),
      ) as MenuCategoryPayload;
      const products = [
        ...data.products,
        ...(data.subcategories?.flatMap((s) => s.products) ?? []),
      ];
      for (const p of products) {
        if (seen.has(p.id)) continue;
        seen.add(p.id);
        results.push({ productId: String(p.id) });
      }
    } catch {
      /* skip */
    }
  }

  return results;
}
