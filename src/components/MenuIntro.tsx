"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { navigateToMenuTab } from "@/lib/menu-navigation";
import ArrowButton from "./ArrowButton";
import FadeIn from "./FadeIn";

const COCKTAIL_IMAGE =
  "https://images.unsplash.com/photo-1551538827-9c037cb64183?w=900&q=85";
const BEER_IMAGE =
  "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=900&q=85";

export default function MenuIntro() {
  const { t } = useLanguage();

  return (
    <section
      id="menu-intro"
      className="section-padding-large bg-maple"
      aria-label={t.menu.introEyebrow}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t.menu.introEyebrow}</p>
            <h2 className="section-title mt-4">{t.menu.introTitle}</h2>
            <p className="section-subtitle mx-auto">{t.menu.introSubtitle}</p>
            <div className="vertical-line" />
          </div>
        </FadeIn>

        <div className="menu-intro-grid mt-16">
          <FadeIn delay={100}>
            <article className="menu-intro-card">
              <div className="moody-image relative aspect-[4/5] overflow-hidden">
                <Image
                  src={COCKTAIL_IMAGE}
                  alt={t.menu.highlightCocktailsTitle}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 flex flex-1 flex-col">
                <h3 className="font-display text-2xl text-maroon md:text-[2rem]">
                  {t.menu.highlightCocktailsTitle}
                </h3>
                <p className="mt-4 flex-1 font-body text-base leading-relaxed text-subtle">
                  {t.menu.highlightCocktailsText}
                </p>
                <div className="mt-8">
                  <ArrowButton
                    href="#menu"
                    variant="maroon"
                    onClick={() => navigateToMenuTab("cocktails")}
                  >
                    {t.menu.highlightCocktailsCta}
                  </ArrowButton>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={180}>
            <article className="menu-intro-card lg:mt-24">
              <div className="moody-image relative aspect-[4/5] overflow-hidden">
                <Image
                  src={BEER_IMAGE}
                  alt={t.menu.highlightBeersTitle}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-8 flex flex-1 flex-col">
                <h3 className="font-display text-2xl text-maroon md:text-[2rem]">
                  {t.menu.highlightBeersTitle}
                </h3>
                <p className="mt-4 flex-1 font-body text-base leading-relaxed text-subtle">
                  {t.menu.highlightBeersText}
                </p>
                <div className="mt-8">
                  <ArrowButton
                    href="#menu"
                    variant="maroon"
                    onClick={() => navigateToMenuTab("beers")}
                  >
                    {t.menu.highlightBeersCta}
                  </ArrowButton>
                </div>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
