"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";

export function MenuPageHeader({ isGelAl }: { isGelAl: boolean }) {
  const { t } = useLocale();

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 font-display text-base font-extrabold uppercase tracking-wide"
        >
          Loop <span className="text-amber">Pub</span>
        </Link>
        <h1 className="truncate font-display text-sm font-bold uppercase tracking-cta md:text-base">
          {isGelAl ? t.menuPage.gelAlMenuTitle : t.menuPage.title}
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <a
            href={CONTACT.phoneTel}
            className="hidden text-xs font-semibold uppercase tracking-cta text-amber sm:inline"
          >
            {t.menuPage.call}
          </a>
        </div>
      </div>
    </header>
  );
}

export function MenuPageFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/10 py-6 text-center text-xs text-muted">
      {SITE_NAME} © 2026 — {t.menuPage.footerRights}
    </footer>
  );
}
