import {
  findProductInPayload,
  type MenuCategoryPayload,
  type MenuProduct,
} from "./menu";
import { MENU_API_BASE } from "./seo";

export async function fetchCategoryPayloadServer(
  categoryId: number,
): Promise<MenuCategoryPayload | null> {
  try {
    const res = await fetch(`${MENU_API_BASE}/${categoryId}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchProductForSeo(
  productId: number,
  categoryId: number,
): Promise<MenuProduct | null> {
  const data = await fetchCategoryPayloadServer(categoryId);
  if (!data) return null;
  return findProductInPayload(data, productId);
}
