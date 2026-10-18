import type { MenuProduct } from "./menu";

export interface MenuCategoryGroup {
  categoryId: number;
  categoryName: string;
  products: MenuProduct[];
}

export interface MenuTabPayload {
  tabId: string;
  groups: MenuCategoryGroup[];
}
