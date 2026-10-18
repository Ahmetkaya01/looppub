import type { MenuTabId } from "./menu-tabs";
import { MENU_TAB_CATEGORIES, COCKTAIL_CATEGORY_IDS } from "./menu-tabs";

export const LIMON_CATEGORIES_URL = "https://123.limonpos.com.tr/categories";
export const LIMON_PRODUCTS_API =
  "https://123.limonpos.com.tr/nexopos/v4/products/category";

export const LIMON_FETCH_HEADERS = {
  Accept: "application/json, text/html",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://123.limonpos.com.tr/categories",
} as const;

export const LIMON_JSON_HEADERS = {
  Accept: "application/json",
  "User-Agent": LIMON_FETCH_HEADERS["User-Agent"],
  Referer: LIMON_FETCH_HEADERS.Referer,
} as const;

export interface MenuCategoryMeta {
  id: number;
  name: string;
}

export interface MenuTabConfig {
  id: MenuTabId;
  categoryIds: number[];
}

export interface MenuConfigResponse {
  tabs: MenuTabConfig[];
  categories: MenuCategoryMeta[];
  cocktailCategoryIds: number[];
  source: "live" | "fallback";
}

const LOAD_PRODUCTS_RE =
  /loadProducts\((\d+),\s*'categories'\)[\s\S]*?<div class="overlay">([^<]+)<\/div>/g;

export function parseCategoriesFromHtml(html: string): MenuCategoryMeta[] {
  const categories: MenuCategoryMeta[] = [];
  let match: RegExpExecArray | null;
  LOAD_PRODUCTS_RE.lastIndex = 0;
  while ((match = LOAD_PRODUCTS_RE.exec(html)) !== null) {
    const id = Number(match[1]);
    const name = match[2]
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();
    if (Number.isFinite(id) && name) {
      categories.push({ id, name });
    }
  }
  return categories;
}

function filterTabIds(ids: number[], available: Set<number>): number[] {
  return ids.filter((id) => available.has(id));
}

export function buildMenuConfig(categories: MenuCategoryMeta[]): MenuConfigResponse {
  const available = new Set(categories.map((c) => c.id));
  const cocktailSet = new Set(COCKTAIL_CATEGORY_IDS);
  const beerOnly = new Set(MENU_TAB_CATEGORIES.beers);

  const tabs: MenuTabConfig[] = (
    Object.keys(MENU_TAB_CATEGORIES) as MenuTabId[]
  ).map((id) => {
    let categoryIds = filterTabIds(MENU_TAB_CATEGORIES[id], available);
    if (id === "beers") {
      categoryIds = categoryIds.filter((cid) => !cocktailSet.has(cid));
    }
    if (id === "cocktails") {
      categoryIds = categoryIds.filter((cid) => !beerOnly.has(cid));
    }
    return { id, categoryIds };
  });

  const cocktailCategoryIds = filterTabIds(
    [...COCKTAIL_CATEGORY_IDS],
    available,
  );

  return {
    tabs,
    categories,
    cocktailCategoryIds,
    source: categories.length > 0 ? "live" : "fallback",
  };
}

export function getFallbackMenuConfig(): MenuConfigResponse {
  const categories: MenuCategoryMeta[] = [];
  for (const ids of Object.values(MENU_TAB_CATEGORIES)) {
    for (const id of ids) {
      if (!categories.some((c) => c.id === id)) {
        categories.push({ id, name: `Category ${id}` });
      }
    }
  }
  return {
    tabs: (Object.keys(MENU_TAB_CATEGORIES) as MenuTabId[]).map((id) => ({
      id,
      categoryIds: [...MENU_TAB_CATEGORIES[id]],
    })),
    categories,
    cocktailCategoryIds: [...COCKTAIL_CATEGORY_IDS],
    source: "fallback",
  };
}

export async function fetchLimonCategoriesHtml(): Promise<string | null> {
  try {
    const res = await fetch(LIMON_CATEGORIES_URL, {
      headers: LIMON_FETCH_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function resolveMenuConfig(): Promise<MenuConfigResponse> {
  const html = await fetchLimonCategoriesHtml();
  if (html) {
    const parsed = parseCategoriesFromHtml(html);
    if (parsed.length > 0) {
      return buildMenuConfig(parsed);
    }
  }
  return getFallbackMenuConfig();
}

export async function fetchLimonCategoryJson(
  categoryId: number,
): Promise<Response> {
  return fetch(`${LIMON_PRODUCTS_API}/${categoryId}`, {
    headers: LIMON_JSON_HEADERS,
    signal: AbortSignal.timeout(20000),
    cache: "no-store",
  });
}

/** Live POS fetch with one retry (Vercel/datacenter paths often time out). */
export async function fetchLimonCategoryPayload(
  categoryId: number,
): Promise<unknown | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchLimonCategoryJson(categoryId);
      if (res.ok) return res.json();
    } catch {
      /* retry */
    }
  }
  return null;
}
