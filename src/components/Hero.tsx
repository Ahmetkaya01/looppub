"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import FadeIn from "./FadeIn";

const HERO_VIDEO =
  "https://cdn.coverr.co/videos/coverr-a-bartender-pouring-a-drink-into-a-glass-4547/1080p.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1920&q=85";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
      aria-label={t.hero.ariaLabel}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="hero-overlay-scrim absolute inset-0" />
      <div className="hero-overlay-gradient absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <FadeIn>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            {t.hero.eyebrow}
          </p>

          <h1 className="hero-headline mt-6 font-display font-semibold">
            <span className="hero-headline-line1 block text-4xl tracking-wide sm:text-5xl md:text-6xl">
              {t.hero.headlineLine1}
            </span>
            <span className="hero-headline-line2 mt-1 block text-5xl tracking-[0.06em] sm:mt-2 sm:text-7xl md:text-8xl lg:text-9xl">
              {t.hero.headlineLine2}
            </span>
          </h1>

          <div className="gold-divider mt-8" />

          <p className="hero-subtitle mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="#menu" className="btn-neon min-w-[220px]">
              {t.hero.exploreMenu}
            </Link>
            <Link href="#contact" className="btn-secondary hero-btn-secondary min-w-[220px]">
              {t.hero.reserve}
            </Link>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="block h-12 w-px bg-gradient-to-b from-gold/80 to-transparent" />
      </div>
    </section>
  );
}
