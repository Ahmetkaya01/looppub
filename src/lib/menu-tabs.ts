export type MenuTabId = "snacks" | "beers" | "cocktails";

export const MENU_TAB_IDS: MenuTabId[] = ["snacks", "beers", "cocktails"];

/** POS category IDs grouped by pub menu tabs */
export const MENU_TAB_CATEGORIES: Record<MenuTabId, number[]> = {
  snacks: [26, 23, 25, 29, 24, 19],
  beers: [13],
  cocktails: [20, 12, 21, 22, 27],
};

export const COCKTAIL_CATEGORY_IDS = new Set(MENU_TAB_CATEGORIES.cocktails);

export function isCocktailCategory(categoryId: number): boolean {
  return COCKTAIL_CATEGORY_IDS.has(categoryId);
}
