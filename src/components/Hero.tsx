"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import ArrowButton from "./ArrowButton";
import FadeIn from "./FadeIn";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1920&q=90";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] max-h-[60rem] overflow-hidden"
      aria-label={t.hero.ariaLabel}
    >
      <div className="moody-image absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="hero-overlay-scrim absolute inset-0" />
      <div className="hero-overlay-gradient absolute inset-0" />

      <div className="relative z-10 flex min-h-screen min-h-[100dvh] max-h-[60rem] flex-col justify-end px-6 pb-16 pt-28 md:px-[6%] md:pb-20 lg:pb-24">
        <FadeIn className="max-w-3xl">
          <p className="font-body text-xs uppercase tracking-nav text-maple-dark">
            {t.hero.eyebrow}
          </p>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.1] md:text-[3.5rem] lg:text-[4rem]">
            <span className="hero-headline-line1 block">
              {t.hero.headlineLine1}
            </span>
            <span className="hero-headline-line2 mt-1 block text-[3rem] md:text-[4rem] lg:text-[4.5rem]">
              {t.hero.headlineLine2}
            </span>
          </h1>

          <p className="hero-subtitle mt-6 max-w-xl font-body text-base leading-relaxed md:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ArrowButton href="#menu">{t.hero.viewMenu}</ArrowButton>
            <Link
              href="#contact"
              className="font-body text-sm text-maple transition-colors duration-300 hover:text-maple-dark"
            >
              {t.hero.reserve} →
            </Link>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <span className="block h-24 w-px bg-maple/50" />
      </div>
    </section>
  );
}
