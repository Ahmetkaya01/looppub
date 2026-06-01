"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT, GALLERY_IMAGES, INSTAGRAM_GALLERY } from "@/lib/constants";
import FadeIn from "./FadeIn";
import InstagramEmbed from "./InstagramEmbed";

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section
      id="gallery"
      className="section-padding bg-page transition-colors duration-500"
      aria-label={t.gallery.ariaLabel}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
              {t.gallery.eyebrow}
            </p>
            <h2 className="section-title mt-3">{t.gallery.title}</h2>
            <p className="section-subtitle mx-auto">{t.gallery.subtitle}</p>
            <div className="gold-divider" />
          </div>
        </FadeIn>

        {INSTAGRAM_GALLERY.length > 0 && (
          <FadeIn delay={100}>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INSTAGRAM_GALLERY.map((item) => (
                <InstagramEmbed key={item.url} url={item.url} label={item.label} />
              ))}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={150}>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-3">
            {GALLERY_IMAGES.slice(0, 6).map((img, index) => (
              <figure
                key={img.src}
                className={`group relative overflow-hidden rounded-lg border border-[var(--border)] shadow-glass ${
                  index === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[320px]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={t.gallery.images[index]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-page/0 transition-colors duration-300 group-hover:bg-page/25" />
              </figure>
            ))}
          </div>
        </FadeIn>

        <div className="mt-10 text-center">
          <Link
            href={CONTACT.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            {t.gallery.followInstagram}
          </Link>
        </div>
      </div>
    </section>
  );
}
