"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import FadeIn from "./FadeIn";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&q=80";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="section-padding bg-page transition-colors duration-500"
      aria-label={t.about.ariaLabel}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn className="order-2 lg:order-1">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
            {t.about.eyebrow}
          </p>
          <h2 className="section-title mt-3">{t.about.title}</h2>
          <div className="gold-divider !mx-0 !mt-5" />
          <p className="mt-8 font-body text-base leading-relaxed text-muted md:text-lg">
            {t.about.text}
          </p>
        </FadeIn>

        <FadeIn className="order-1 lg:order-2" delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border)] shadow-glass lg:aspect-[5/4]">
            <Image
              src={ABOUT_IMAGE}
              alt={t.about.imageAlt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-page/70 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
