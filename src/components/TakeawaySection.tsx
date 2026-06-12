"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { TAKEAWAY_PROMO } from "@/data/takeaway";
import { GEL_AL_MENU_HREF } from "@/lib/menu";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";
import Lightbox from "./ui/Lightbox";

export default function TakeawaySection() {
  const { t } = useLocale();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="takeaway"
      className="section-padding bg-night"
      aria-label={t.takeaway.aria}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.takeaway.eyebrow}
          title={t.takeaway.title}
          subtitle={t.takeaway.subtitle}
        />

        <MotionReveal className="mt-12" delay={0.1}>
          <div className="relative mx-auto flex max-w-lg justify-center px-4 sm:max-w-md md:max-w-lg">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-amber/15 via-amber/5 to-transparent blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-8 -bottom-4 h-12 rounded-full bg-amber/10 blur-2xl"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`${t.takeaway.expand}: ${TAKEAWAY_PROMO.alt}`}
              className="group relative w-full max-w-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card transition-[border-color,transform,box-shadow] duration-300 hover:border-amber/45 hover:shadow-amber-glow active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:max-w-sm"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-night/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-night/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                {t.takeaway.expand}
              </span>
              <Image
                src={TAKEAWAY_PROMO.src}
                alt={TAKEAWAY_PROMO.alt}
                width={577}
                height={1024}
                sizes="(max-width: 640px) 90vw, 22rem"
                className="h-auto w-full object-cover"
                priority
              />
            </button>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={GEL_AL_MENU_HREF}
              className="inline-flex min-h-12 items-center rounded-sm border border-amber/40 px-8 text-sm font-bold uppercase tracking-cta text-amber transition-colors hover:border-amber hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              {t.takeaway.viewMenu}
            </a>
            <a
              href={t.whatsapp.takeaway}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-sm bg-amber px-8 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              {t.takeaway.orderCta}
            </a>
          </div>
        </MotionReveal>
      </div>

      <Lightbox
        items={[{ type: "image", src: TAKEAWAY_PROMO.src, alt: TAKEAWAY_PROMO.alt }]}
        index={lightboxOpen ? 0 : null}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </section>
  );
}
