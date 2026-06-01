"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-gold focus:bg-gold focus:px-4 focus:py-2.5 focus:font-body focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:text-[var(--on-accent)] focus:outline-none"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
