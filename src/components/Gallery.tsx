"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT, GALLERY_IMAGES, INSTAGRAM_GALLERY } from "@/lib/constants";
import ArrowButton from "./ArrowButton";
import FadeIn from "./FadeIn";
import InstagramEmbed from "./InstagramEmbed";

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section
      id="gallery"
      className="section-padding-large bg-maple"
      aria-label={t.gallery.ariaLabel}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t.gallery.eyebrow}</p>
            <h2 className="section-title mt-4">{t.gallery.title}</h2>
            <p className="section-subtitle mx-auto">{t.gallery.subtitle}</p>
            <div className="vertical-line" />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.slice(0, 3).map((img, index) => (
              <article key={img.src} className="event-card group">
                <div className="moody-image relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={t.gallery.images[index]}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-body text-xs uppercase tracking-nav text-maroon/60">
                    Loop Pub
                  </p>
                  <h3 className="mt-2 font-display text-xl text-maroon">
                    {t.gallery.images[index]}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={160}>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.slice(3, 6).map((img, index) => (
              <figure
                key={img.src}
                className="moody-image group relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={t.gallery.images[index + 3]}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </FadeIn>

        {INSTAGRAM_GALLERY.length > 0 && (
          <FadeIn delay={200}>
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INSTAGRAM_GALLERY.slice(0, 3).map((item) => (
                <InstagramEmbed key={item.url} url={item.url} label={item.label} />
              ))}
            </div>
          </FadeIn>
        )}

        <div className="mt-14 text-center">
          <ArrowButton href={CONTACT.social.instagram} variant="maroon">
            {t.gallery.followInstagram}
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
