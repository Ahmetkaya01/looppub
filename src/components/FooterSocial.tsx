"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/lib/constants";

export default function FooterSocial({ light = false }: { light?: boolean }) {
  const { t } = useLanguage();
  const telUrl = `tel:${CONTACT.phoneTel}`;
  const linkClass = light
    ? "inline-flex border border-maple/30 px-5 py-2.5 font-body text-xs uppercase tracking-nav text-maple transition-colors hover:border-maple hover:text-maple-dark"
    : "inline-flex border border-[var(--border)] px-5 py-2.5 font-body text-xs uppercase tracking-nav text-maroon transition-colors hover:border-maroon/40";

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={CONTACT.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {t.footer.followInstagram}
      </a>
      <a href={telUrl} className={linkClass}>
        {t.footer.callUs}
      </a>
      <a
        href={CONTACT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {t.footer.openMaps}
      </a>
    </div>
  );
}
