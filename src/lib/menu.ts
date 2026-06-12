import menuData from "@/data/menu.json";
import { PRODUCT_DESCRIPTIONS } from "@/data/product-descriptions";

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

export interface MenuCategory {
  category: {
    id: number;
    name: string;
    preview_url?: string;
  };
  products: MenuProduct[];
  subcategories?: MenuSubcategory[];
}

const EMPTY_IMAGE_PATTERN = /empty\.png$/i;

/**
 * Görüntüleme sırası: önce alkollü kategoriler (pub odağı),
 * sonra yiyecekler, en sonda alkolsüz/sıcak içecekler.
 * Listede olmayan yeni kategoriler otomatik olarak sona düşer.
 */
const CATEGORY_DISPLAY_ORDER = [
  // Alkollü
  20, // Loop İmza Kokteyller
  12, // Kokteyller
  22, // İkili Karışım
  27, // Shot'lar
  13, // Biralar
  14, // Viskiler
  15, // Rakılar
  16, // Votkalar & Tekila & Cin
  17, // Şaraplar
  // Yiyecek
  26, // Mezeler
  25, // Atıştırmalık Sepeti
  23, // Tostlar
  24, // Makarnalar
  30, // Menüler
  29, // Kuruyemiş Cips Jelibon
  19, // Günün Tatlıları
  // Alkolsüz & Sıcak
  21, // Alkolsüz Kokteyller
  6, // Soğuk İçecekler
  7, // Soğuk Kahveler
  8, // Frappe
  9, // Milkshake
  10, // Smoothie
  11, // Frozen
  4, // Sıcak Kahveler
  5, // Bitki Çayları
];

const categoryRank = new Map(
  CATEGORY_DISPLAY_ORDER.map((id, index) => [id, index]),
);

/** POS'tan açıklama gelmemişse overlay'deki açıklamayı kullanır. */
function withDescription(product: MenuProduct): MenuProduct {
  if (product.description) return product;
  const overlay = PRODUCT_DESCRIPTIONS[product.id];
  return overlay ? { ...product, description: overlay } : product;
}

/** Gel-Al paket serviste 250 TL sabit fiyatlı kokteyl kategorileri */
export const GEL_AL_COCKTAIL_CATEGORY_IDS = [20, 12, 21] as const;

export const GEL_AL_COCKTAIL_PRICE = "250,00";

export const GEL_AL_MENU_HREF = "/menu?gel-al=1";

function sortAndEnrichCategories(categories: MenuCategory[]): MenuCategory[] {
  return [...categories]
    .sort(
      (a, b) =>
        (categoryRank.get(a.category.id) ?? Number.MAX_SAFE_INTEGER) -
        (categoryRank.get(b.category.id) ?? Number.MAX_SAFE_INTEGER),
    )
    .map((category) => ({
      ...category,
      products: category.products.map(withDescription),
      subcategories: category.subcategories?.map((sub) => ({
        ...sub,
        products: sub.products.map(withDescription),
      })),
    }));
}

function applyGelAlCocktailPricing(product: MenuProduct): MenuProduct {
  return {
    ...product,
    units: product.units.map((unit) => ({
      ...unit,
      price: GEL_AL_COCKTAIL_PRICE,
    })),
  };
}

export function getMenuCategories(): MenuCategory[] {
  const categories = menuData.categories as MenuCategory[];
  return sortAndEnrichCategories(categories);
}

/** Gel-Al: yalnızca kokteyl kategorileri, tüm kokteyller 250 TL */
export function getGelAlMenuCategories(): MenuCategory[] {
  const gelAlIds = new Set<number>(GEL_AL_COCKTAIL_CATEGORY_IDS);
  return sortAndEnrichCategories(
    (menuData.categories as MenuCategory[]).filter((c) =>
      gelAlIds.has(c.category.id),
    ),
  ).map((category) => ({
    ...category,
    products: category.products.map(applyGelAlCocktailPricing),
    subcategories: category.subcategories?.map((sub) => ({
      ...sub,
      products: sub.products.map(applyGelAlCocktailPricing),
    })),
  }));
}

export function hasRealImage(product: MenuProduct): boolean {
  return Boolean(product.image) && !EMPTY_IMAGE_PATTERN.test(product.image);
}

/** "250,00" → "₺250" · "1.250,50" → "₺1.250,50" */
export function formatPrice(price: string): string {
  const normalized = price.replace(/\./g, "").replace(",", ".").trim();
  const num = parseFloat(normalized);
  if (Number.isNaN(num)) return `₺${price}`;
  return `₺${num.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatUnits(units: MenuProductUnit[]): string {
  if (!units.length) return "";
  return units
    .map((u) => {
      const price = formatPrice(u.price);
      return u.label && u.label !== "Adet" ? `${u.label}: ${price}` : price;
    })
    .join(" · ");
}

/**
 * POS'tan gelen TAMAMI BÜYÜK açıklamaları cümle formatına çevirir
 * ("BUZ GİBİ SERVİS" → "Buz gibi servis"); karışık yazımlara dokunmaz.
 */
export function normalizeDescription(value: string): string {
  const hasLetters = value !== value.toLocaleLowerCase("tr-TR");
  const isAllUpper = hasLetters && value === value.toLocaleUpperCase("tr-TR");
  if (!isAllUpper) return value;
  const lower = value.toLocaleLowerCase("tr-TR");
  return lower.charAt(0).toLocaleUpperCase("tr-TR") + lower.slice(1);
}

/** Başlıkları "SICAK KAHVELER" → "Sıcak Kahveler" biçimine çevirir */
export function titleCaseTr(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .split(" ")
    .map((word) =>
      word ? word[0].toLocaleUpperCase("tr-TR") + word.slice(1) : word,
    )
    .join(" ");
}
