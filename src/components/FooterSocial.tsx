"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/lib/constants";

export default function FooterSocial() {
  const { t } = useLanguage();
  const telUrl = `tel:${CONTACT.phoneTel}`;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
      <a
        href={CONTACT.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !px-5 !py-2.5 !text-xs"
      >
        {t.footer.followInstagram}
      </a>
      <a href={telUrl} className="btn-secondary !px-5 !py-2.5 !text-xs">
        {t.footer.callUs}
      </a>
      <a
        href={CONTACT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !px-5 !py-2.5 !text-xs"
      >
        {t.footer.openMaps}
      </a>
    </div>
  );
}
