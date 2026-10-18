import type { MenuConfigResponse } from "./limon-menu";
import { getFallbackMenuConfig } from "./limon-menu";
import { MENU_TAB_CATEGORIES } from "./menu-tabs";

export {
  MENU_TAB_IDS,
  MENU_TAB_CATEGORIES,
  COCKTAIL_CATEGORY_IDS,
  isCocktailCategory,
  type MenuTabId,
} from "./menu-tabs";

export type { MenuConfigResponse, MenuTabConfig, MenuCategoryMeta } from "./limon-menu";

export interface MenuProductUnit {
  label: string;
  price: string;
}

export interface MenuProduct {
  id: number;
  name: string;
  description: string | null;
  image: string;
  units: MenuProductUnit[];
}

export interface MenuSubcategory {
  name: string;
  products: MenuProduct[];
}

export interface MenuCategoryPayload {
  category: {
    id: number;
    name: string;
    preview_url?: string;
  };
  products: MenuProduct[];
  subcategories?: MenuSubcategory[];
}

let menuConfigCache: MenuConfigResponse | null = null;

async function tryFetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchMenuConfig(): Promise<MenuConfigResponse> {
  if (menuConfigCache) return menuConfigCache;

  const fromCache = await tryFetchJson<MenuConfigResponse>(
    "/menu-cache/config.json",
  );
  if (fromCache) {
    menuConfigCache = fromCache;
    return fromCache;
  }

  const fromApi = await tryFetchJson<MenuConfigResponse>("/api/menu");
  if (fromApi) {
    menuConfigCache = fromApi;
    return fromApi;
  }

  const fallback = getFallbackMenuConfig();
  menuConfigCache = fallback;
  return fallback;
}

export function clearMenuConfigCache() {
  menuConfigCache = null;
}

export function formatMenuPrice(price: string): string {
  const normalized = price.replace(",", ".").trim();
  const num = parseFloat(normalized);
  if (Number.isNaN(num)) return `₺${price}`;
  return `₺${num.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatProductPrices(units: MenuProductUnit[]): string {
  if (!units.length) return "";
  return units
    .map((u) => {
      const price = formatMenuPrice(u.price);
      return u.label && u.label !== "Adet" ? `${u.label}: ${price}` : price;
    })
    .join(" · ");
}

export function findProductInPayload(
  data: MenuCategoryPayload,
  productId: number,
): MenuProduct | null {
  const inProducts = data.products.find((p) => p.id === productId);
  if (inProducts) return inProducts;
  for (const sub of data.subcategories ?? []) {
    const found = sub.products.find((p) => p.id === productId);
    if (found) return found;
  }
  return null;
}

export async function fetchCategoryPayload(
  categoryId: number,
): Promise<MenuCategoryPayload | null> {
  const cached = await tryFetchJson<MenuCategoryPayload>(
    `/menu-cache/${categoryId}.json`,
  );
  if (cached) return cached;
  return tryFetchJson<MenuCategoryPayload>(`/api/menu/${categoryId}`);
}

export async function fetchCategoryProducts(
  categoryId: number,
): Promise<MenuProduct[]> {
  const data = await fetchCategoryPayload(categoryId);
  if (!data) throw new Error("fetch failed");
  return [
    ...data.products,
    ...(data.subcategories?.flatMap((s) => s.products) ?? []),
  ];
}

export type MenuProductWithCategory = MenuProduct & { categoryId: number };

export type { MenuCategoryGroup, MenuTabPayload } from "./menu-types";

export async function fetchTabMenu(
  tabId: import("./menu-tabs").MenuTabId,
): Promise<import("./menu-types").MenuTabPayload> {
  const fromCache = await tryFetchJson<import("./menu-types").MenuTabPayload>(
    `/menu-cache/tabs/${tabId}.json`,
  );
  if (fromCache) return fromCache;

  const fromApi = await tryFetchJson<import("./menu-types").MenuTabPayload>(
    `/api/menu/tab/${tabId}`,
  );
  if (fromApi) return fromApi;

  const ids = MENU_TAB_CATEGORIES[tabId] ?? [];
  const groups: import("./menu-types").MenuCategoryGroup[] = [];
  for (const categoryId of ids) {
    const data = await fetchCategoryPayload(categoryId);
    if (!data) continue;
    const products = [
      ...data.products,
      ...(data.subcategories?.flatMap((s) => s.products) ?? []),
    ];
    if (!products.length) continue;
    groups.push({
      categoryId,
      categoryName: data.category.name,
      products,
    });
  }
  return { tabId, groups };
}

/** @deprecated Use fetchTabMenu — kept for compatibility */
export async function fetchTabProducts(
  tabId: import("./menu-tabs").MenuTabId,
  config?: MenuConfigResponse,
): Promise<MenuProductWithCategory[]> {
  const payload = await fetchTabMenu(tabId);
  const allowed = new Set(
    config?.tabs.find((t) => t.id === tabId)?.categoryIds ??
      payload.groups.map((g) => g.categoryId),
  );
  const cocktailIds = new Set(config?.cocktailCategoryIds ?? []);

  const merged: MenuProductWithCategory[] = [];
  for (const group of payload.groups) {
    if (!allowed.has(group.categoryId)) continue;
    if (tabId === "beers" && cocktailIds.has(group.categoryId)) continue;
    if (tabId === "cocktails" && group.categoryId === 13) continue;
    for (const p of group.products) {
      merged.push({ ...p, categoryId: group.categoryId });
    }
  }
  return merged;
}

export function isCocktailCategoryId(
  categoryId: number,
  config?: MenuConfigResponse,
): boolean {
  const ids =
    config?.cocktailCategoryIds ??
    (menuConfigCache?.cocktailCategoryIds ?? []);
  return ids.includes(categoryId);
}

// re-export for sync/build helpers
export { getFallbackMenuConfig };
