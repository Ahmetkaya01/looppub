"use client";

import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

const HTML_LANG: Record<string, string> = {
  tr: "tr",
  en: "en",
  ru: "ru",
};

export default function LocaleSync() {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale] ?? "tr";
  }, [locale]);

  return null;
}
