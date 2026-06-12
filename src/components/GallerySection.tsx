"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_MEDIA } from "@/data/gallery";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";
import Lightbox from "./ui/Lightbox";

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

/** Masonry: her 3. öğe biraz daha uzun — mobil 2 sütun, desktop 4 sütun */
function masonryAspect(index: number): string {
  return index % 3 === 0 ? "aspect-[3/4]" : "aspect-square";
}

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding" aria-label="Looptan Kareler">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sosyal Kanıt"
          title="Looptan Kareler"
          subtitle="Canlı müzik geceleri, imza kokteyller ve Loop atmosferinden seçilmiş anlar."
        />

        <MotionReveal className="mt-12" delay={0.1}>
          <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
            {GALLERY_MEDIA.map((media, index) => {
              const thumb = media.type === "video" ? media.poster : media.src;
              return (
                <button
                  key={media.type === "video" ? media.src : thumb}
                  type="button"
                  aria-label={`Büyüt: ${media.alt}`}
                  onClick={() => setOpenIndex(index)}
                  className={`group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 transition-[border-color,transform] duration-300 hover:border-amber/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-night ${masonryAspect(index)}`}
                >
                  <Image
                    src={thumb}
                    alt={media.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute inset-0 flex items-center justify-center bg-amber/0 transition-colors duration-300 group-hover:bg-amber/10">
                    {media.type === "video" ? (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-night/70 text-amber backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon className="ml-0.5 h-6 w-6" />
                      </span>
                    ) : (
                      <ExpandIcon className="h-7 w-7 text-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </MotionReveal>
      </div>

      <Lightbox
        items={GALLERY_MEDIA}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
