import type { Locale } from "./types";
import { en, galleryAltsEn, showcaseAltsEn } from "./en";
import { tr, galleryAltsTr, showcaseAltsTr } from "./tr";

export type { Dictionary, Locale, NavKey } from "./types";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

const dictionaries = { tr, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getShowcaseAlts(locale: Locale) {
  return locale === "en" ? showcaseAltsEn : showcaseAltsTr;
}

export function getGalleryAlts(locale: Locale) {
  return locale === "en" ? galleryAltsEn : galleryAltsTr;
}

export const NAV_ITEMS = [
  { href: "/", key: "home" as const },
  { href: "/menu", key: "menu" as const },
  { href: "/#events", key: "events" as const },
  { href: "/#programs", key: "programs" as const },
  { href: "/#takeaway", key: "takeaway" as const },
  { href: "/#gallery", key: "gallery" as const },
  { href: "/#location", key: "location" as const },
  { href: "/#contact", key: "contact" as const },
];

export const LOCALE_STORAGE_KEY = "loop-pub-locale";

export function isLocale(value: string): value is Locale {
  return value === "tr" || value === "en";
}
