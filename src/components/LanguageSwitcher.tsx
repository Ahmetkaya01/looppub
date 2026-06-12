"use client";

import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/i18n";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  const btn = (lang: Locale, label: string) => {
    const active = locale === lang;
    return (
      <button
        type="button"
        onClick={() => setLocale(lang)}
        aria-pressed={active}
        className={`min-h-9 min-w-9 rounded-sm px-2 text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
          active
            ? "bg-amber text-night"
            : "text-muted hover:text-amber"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`flex items-center gap-0.5 rounded-sm border border-white/15 p-0.5 ${className ?? ""}`}
      role="group"
      aria-label="Language"
    >
      {btn("tr", "TR")}
      {btn("en", "EN")}
    </div>
  );
}
