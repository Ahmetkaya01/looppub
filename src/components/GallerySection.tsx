"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { GALLERY_MEDIA } from "@/data/gallery";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";
import Lightbox from "./ui/Lightbox";
import PremiumHorizontalScroll, {
  premiumScrollCardClass,
} from "./ui/PremiumHorizontalScroll";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
      />
    </svg>
  );
}

export default function GallerySection() {
  const { t, galleryAlts } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding" aria-label={t.gallery.aria}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />
      </div>

      <MotionReveal className="mt-12" delay={0.1}>
        <PremiumHorizontalScroll
          ariaLabel={t.gallery.scrollAria}
          scrollHint={t.common.scrollHint}
        >
          {GALLERY_MEDIA.map((media, index) => {
            const thumb = media.type === "video" ? media.poster : media.src;
            const alt = galleryAlts[index] ?? media.alt;
            return (
              <button
                key={media.type === "video" ? media.src : thumb}
                type="button"
                role="listitem"
                data-scroll-item
                aria-label={`${t.common.expand}: ${alt}`}
                onClick={() => setOpenIndex(index)}
                className={`${premiumScrollCardClass} aspect-[3/4] w-[min(72vw,20rem)] sm:w-72 md:w-80`}
              >
                <Image
                  src={thumb}
                  alt={alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="320px"
                />

                <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-night/5 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
                  <span className="line-clamp-2 text-[11px] font-medium uppercase tracking-wide text-ink/90">
                    {alt}
                  </span>
                </span>

                <span className="absolute inset-0 flex items-center justify-center bg-amber/0 transition-colors duration-500 group-hover:bg-amber/[0.04]">
                  {media.type === "video" ? (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/30 bg-night/75 text-amber backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <PlayIcon className="ml-0.5 h-6 w-6" />
                    </span>
                  ) : (
                    <ExpandIcon className="h-7 w-7 text-amber opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )}
                </span>
              </button>
            );
          })}
        </PremiumHorizontalScroll>
      </MotionReveal>

      <Lightbox
        items={GALLERY_MEDIA}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
