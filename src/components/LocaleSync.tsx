"use client";

import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function LocaleSync() {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "tr";
  }, [locale]);

  return null;
}
