"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PARTY_VIDEOS } from "@/data/parties";
import type { GalleryMedia } from "@/data/gallery";
import { CONTACT } from "@/lib/constants";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";
import Lightbox from "./ui/Lightbox";

const LIGHTBOX_ITEMS: GalleryMedia[] = PARTY_VIDEOS.map((video) => ({
  type: "video" as const,
  src: video.src,
  poster: video.poster,
  alt: video.caption,
}));

function PartyVideoCard({
  video,
  index,
  onOpen,
}: {
  video: (typeof PARTY_VIDEOS)[number];
  index: number;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    const media = videoRef.current;
    if (!el || !media) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          media.play().catch(() => {});
          setIsPlaying(true);
        } else {
          media.pause();
          media.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Tam ekran oynat: ${video.title}`}
        className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-card shadow-card transition-[border-color,transform] duration-300 hover:border-amber/50 hover:shadow-amber-glow active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-night"
      >
        <div className="relative aspect-[9/16] w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
          {!isPlaying && (
            <Image
              src={video.poster}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              aria-hidden
            />
          )}

          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-night/70 text-amber backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" aria-hidden>
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>

          <span className="absolute left-3 top-3 rounded-full bg-night/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </button>

      <div className="mt-5 text-center md:text-left">
        <h3 className="font-display text-xl font-bold uppercase text-ink md:text-2xl">
          {video.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{video.caption}</p>
        {video.tags && video.tags.length > 0 && (
          <p className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber/25 px-3 py-1 text-xs font-medium text-amber/90"
              >
                {tag}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

export default function PartiesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="parties"
      className="section-padding border-y border-white/5 bg-night"
      aria-label="Partiler"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gece Hayatı"
          title="Partiler"
          subtitle="Canlı müzik, dans ve Loop enerjisi — kayıtlardan seçilmiş parti anları."
        />

        <MotionReveal className="mt-12" delay={0.1}>
          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
            {PARTY_VIDEOS.map((video, index) => (
              <PartyVideoCard
                key={video.src}
                video={video}
                index={index}
                onOpen={() => setOpenIndex(index)}
              />
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-sm border border-amber/40 px-8 text-sm font-bold uppercase tracking-cta text-amber transition-colors hover:border-amber hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Instagram&apos;da Takip Et
            </a>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-sm bg-amber px-8 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Parti İçin Rezervasyon
            </a>
          </div>
        </MotionReveal>
      </div>

      <Lightbox
        items={LIGHTBOX_ITEMS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
