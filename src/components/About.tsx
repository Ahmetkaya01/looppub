"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import ArrowButton from "./ArrowButton";
import FadeIn from "./FadeIn";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&q=80";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="section-padding-large bg-section-light"
      aria-label={t.about.ariaLabel}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <FadeIn className="order-2 lg:order-1">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title mt-4">{t.about.title}</h2>
          <p className="mt-8 max-w-xl font-body text-base font-light leading-8 text-subtle md:text-lg">
            {t.about.text}
          </p>
          <div className="mt-10">
            <ArrowButton href="#menu" variant="maroon">
              {t.hero.exploreMenu}
            </ArrowButton>
          </div>
        </FadeIn>

        <FadeIn className="order-1 lg:order-2" delay={160}>
          <div className="moody-image relative aspect-[4/5] overflow-hidden">
            <Image
              src={ABOUT_IMAGE}
              alt={t.about.imageAlt}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
