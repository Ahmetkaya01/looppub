import type { MenuCategory, MenuProduct } from "./menu";
import { titleCaseTr } from "./menu";

export interface SearchableProduct extends MenuProduct {
  categoryId: number;
  categoryName: string;
}

/** Arama indeksine ek anahtar kelimeler (POS isimleri kısa olabilir). */
const PRODUCT_ALIASES: Record<number, string[]> = {
  100: ["viski kadeh", "viski kadehleri", "whiskey glass", "tek kadeh"],
  101: ["viski double", "çift kadeh", "double viski"],
  205: ["konyak tek", "konyak kadeh"],
  206: ["konyak double", "çift konyak"],
};

const CATEGORY_ALIASES: Record<number, string[]> = {
  14: ["viski", "whiskey", "viski kadehleri", "premium viski"],
  15: ["rakı", "raki"],
  16: ["votka", "tekila", "cin", "gin"],
  17: ["şarap", "sarap", "wine"],
  13: ["bira", "beer", "craft"],
  12: ["kokteyl", "cocktail"],
  20: ["imza kokteyl", "signature"],
  27: ["shot"],
};

export function flattenMenuForSearch(
  categories: MenuCategory[],
): SearchableProduct[] {
  const items: SearchableProduct[] = [];

  for (const cat of categories) {
    const categoryName = titleCaseTr(cat.category.name);
    for (const product of cat.products) {
      items.push({
        ...product,
        categoryId: cat.category.id,
        categoryName,
      });
    }
    for (const sub of cat.subcategories ?? []) {
      for (const product of sub.products) {
        items.push({
          ...product,
          categoryId: cat.category.id,
          categoryName: `${categoryName} · ${titleCaseTr(sub.name)}`,
        });
      }
    }
  }

  return items;
}

function buildHaystack(item: SearchableProduct): string {
  const parts = [
    item.name,
    item.categoryName,
    item.description ?? "",
    ...(PRODUCT_ALIASES[item.id] ?? []),
    ...(CATEGORY_ALIASES[item.categoryId] ?? []),
    ...item.units.map((u) => u.label),
  ];
  return parts.join(" ").toLocaleLowerCase("tr-TR");
}

/** Boşlukla ayrılmış tokenların hepsi eşleşmeli (AND arama). */
export function searchMenu(
  items: SearchableProduct[],
  query: string,
): SearchableProduct[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = trimmed
    .toLocaleLowerCase("tr-TR")
    .split(/\s+/)
    .filter(Boolean);

  return items.filter((item) => {
    const haystack = buildHaystack(item);
    return tokens.every((token) => haystack.includes(token));
  });
}
