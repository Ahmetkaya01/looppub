import type { Translations } from "@/i18n/types";

export function getNavLinks(t: Translations) {
  return [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#menu", label: t.nav.menu },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#feedback", label: t.nav.feedback },
    { href: "#contact", label: t.nav.contact },
  ] as const;
}
