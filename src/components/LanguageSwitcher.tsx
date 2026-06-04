"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n";

const LOCALE_FLAGS: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  ru: "🇷🇺",
};

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();

  const options: { code: Locale; label: string; flag: string }[] = [
    { code: "tr", label: t.language.tr, flag: LOCALE_FLAGS.tr },
    { code: "en", label: t.language.en, flag: LOCALE_FLAGS.en },
    { code: "ru", label: t.language.ru, flag: LOCALE_FLAGS.ru },
  ];

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)] p-0.5 backdrop-blur-md"
      role="group"
      aria-label={t.language.switchTo}
    >
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLocale(opt.code)}
          className={`flex min-h-[36px] min-w-[36px] items-center justify-center gap-1 rounded-sm px-2 py-1 font-body text-[10px] font-medium uppercase tracking-wider transition-all duration-300 md:min-h-[40px] md:px-2.5 md:py-1.5 md:text-xs ${
            locale === opt.code
              ? "bg-gold text-[var(--on-accent)] shadow-sm"
              : "text-muted hover:text-gold"
          }`}
          aria-pressed={locale === opt.code}
          aria-label={opt.label}
          title={opt.label}
        >
          {compact ? (
            <span aria-hidden>{opt.flag}</span>
          ) : (
            <>
              <span aria-hidden className="text-sm leading-none">
                {opt.flag}
              </span>
              <span>{opt.code.toUpperCase()}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
