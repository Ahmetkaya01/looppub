"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import FadeIn from "./FadeIn";

const FEATURED_IMAGE =
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=85";

export default function FeaturedBanner() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[28rem] overflow-hidden"
      aria-label={t.hero.slogan}
    >
      <div className="moody-image absolute inset-0">
        <Image
          src={FEATURED_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-maroon/70" />
      <div className="relative z-10 flex min-h-[28rem] flex-col items-center justify-center px-6 py-24 text-center md:px-[6%]">
        <FadeIn>
          <p className="font-body text-xs uppercase tracking-nav text-maple-dark">
            {t.hero.slogan}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl text-maple md:text-5xl">
            {t.hero.headlineLine1} {t.hero.headlineLine2}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-maple/85">
            {t.hero.subtitle}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
