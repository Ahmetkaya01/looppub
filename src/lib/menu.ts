import type { MenuConfigResponse } from "./limon-menu";
import { MENU_TAB_IDS } from "./menu-tabs";

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

export async function fetchMenuConfig(): Promise<MenuConfigResponse> {
  if (menuConfigCache) return menuConfigCache;
  const res = await fetch("/api/menu", { cache: "no-store" });
  if (!res.ok) throw new Error("menu config failed");
  const data: MenuConfigResponse = await res.json();
  menuConfigCache = data;
  return data;
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

export async function fetchCategoryProducts(
  categoryId: number,
): Promise<MenuProduct[]> {
  const res = await fetch(`/api/menu/${categoryId}`);
  if (!res.ok) throw new Error("fetch failed");
  const data: MenuCategoryPayload = await res.json();
  return [
    ...data.products,
    ...(data.subcategories?.flatMap((s) => s.products) ?? []),
  ];
}

export type MenuProductWithCategory = MenuProduct & { categoryId: number };

export async function fetchTabProducts(
  tabId: import("./menu-tabs").MenuTabId,
  config?: MenuConfigResponse,
): Promise<MenuProductWithCategory[]> {
  const menuConfig = config ?? (await fetchMenuConfig());
  const tab = menuConfig.tabs.find((t) => t.id === tabId);
  const ids = tab?.categoryIds ?? [];

  const merged: MenuProductWithCategory[] = [];
  for (const categoryId of ids) {
    const items = await fetchCategoryProducts(categoryId);
    items.forEach((p) => merged.push({ ...p, categoryId }));
  }
  return Array.from(new Map(merged.map((p) => [p.id, p])).values());
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
