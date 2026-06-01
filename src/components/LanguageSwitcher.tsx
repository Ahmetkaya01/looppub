"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  const options: { code: Locale; label: string }[] = [
    { code: "tr", label: t.language.tr },
    { code: "en", label: t.language.en },
  ];

  return (
    <div
      className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] p-0.5 backdrop-blur-md"
      role="group"
      aria-label={t.language.switchTo}
    >
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLocale(opt.code)}
          className={`rounded-sm px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-wider transition-all duration-300 md:px-3 md:py-1.5 md:text-xs ${
            locale === opt.code
              ? "bg-gold text-[var(--on-accent)] shadow-sm"
              : "text-muted hover:text-gold"
          }`}
          aria-pressed={locale === opt.code}
          aria-label={opt.label}
        >
          {compact ? opt.code.toUpperCase() : opt.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
