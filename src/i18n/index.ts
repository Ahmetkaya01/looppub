import { en } from "./translations/en";
import { tr } from "./translations/tr";
import type { Locale, Translations } from "./types";

export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_STORAGE_KEY = "loop-pub-locale";

export const translations: Record<Locale, Translations> = { tr, en };

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}

export type { Locale, MenuTabId, Translations } from "./types";
