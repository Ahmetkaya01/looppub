"use client";

import { useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";

/** Client-side title/description sync when locale changes */
export default function MetaUpdater() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = t.meta.siteTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", t.meta.siteDescription);
    }
  }, [t]);

  return null;
}
