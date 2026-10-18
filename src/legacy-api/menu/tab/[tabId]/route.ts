import { NextResponse } from "next/server";
import type { MenuTabId } from "@/lib/menu-tabs";
import { MENU_TAB_CATEGORIES } from "@/lib/menu-tabs";
import type { MenuCategoryGroup } from "@/lib/menu-types";
import type { MenuCategoryPayload } from "@/lib/menu";
import { readCachedCategoryPayload } from "@/lib/menu-cache";
import { fetchLimonCategoryPayload } from "@/lib/limon-menu";

export const runtime = "nodejs";
export const revalidate = 3600;
export const preferredRegion = ["fra1", "cdg1", "iad1"];

function isMenuTabId(value: string): value is MenuTabId {
  return value === "snacks" || value === "beers" || value === "cocktails";
}

function productsFromPayload(data: MenuCategoryPayload) {
  return [
    ...data.products,
    ...(data.subcategories?.flatMap((s) => s.products) ?? []),
  ];
}

async function loadCategory(
  categoryId: number,
): Promise<MenuCategoryGroup | null> {
  const cached = await readCachedCategoryPayload(categoryId);
  if (cached) {
    return {
      categoryId,
      categoryName: cached.category.name,
      products: productsFromPayload(cached),
    };
  }

  if (!process.env.VERCEL) {
    const live = await fetchLimonCategoryPayload(categoryId);
    if (live && typeof live === "object" && "category" in live) {
      const data = live as MenuCategoryPayload;
      return {
        categoryId,
        categoryName: data.category.name,
        products: productsFromPayload(data),
      };
    }
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tabId: string }> },
) {
  const { tabId } = await params;

  if (!isMenuTabId(tabId)) {
    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  }

  const cocktailSet = new Set(MENU_TAB_CATEGORIES.cocktails);
  const beerOnly = new Set(MENU_TAB_CATEGORIES.beers);
  let categoryIds = [...MENU_TAB_CATEGORIES[tabId]];

  if (tabId === "beers") {
    categoryIds = categoryIds.filter((id) => !cocktailSet.has(id));
  } else if (tabId === "cocktails") {
    categoryIds = categoryIds.filter((id) => !beerOnly.has(id));
  }

  const groups = (
    await Promise.all(categoryIds.map((id) => loadCategory(id)))
  ).filter((g): g is MenuCategoryGroup => g !== null && g.products.length > 0);

  if (groups.length === 0) {
    return NextResponse.json({ error: "Menu unavailable" }, { status: 502 });
  }

  return NextResponse.json(
    { tabId, groups },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
