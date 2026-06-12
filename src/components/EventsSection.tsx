"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  EVENT_HIGHLIGHT_VIDEOS,
  EVENT_SHOWCASE_IMAGES,
  PROGRAM_2025_VIDEO,
  UPCOMING_PROGRAM_YEAR,
} from "@/data/events";
import type { GalleryMedia } from "@/data/gallery";
import { CONTACT } from "@/lib/constants";
import { useLocale } from "@/context/LocaleContext";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";
import VideoPosterCard from "./ui/VideoPosterCard";
import Lightbox from "./ui/Lightbox";
import PremiumHorizontalScroll, {
  premiumScrollCardClass,
} from "./ui/PremiumHorizontalScroll";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function EventsSection() {
  const { t, showcaseAlts } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoTitles = [t.events.video1Title, t.events.video2Title];

  const lightboxItems: GalleryMedia[] = useMemo(
    () =>
      [...EVENT_HIGHLIGHT_VIDEOS, PROGRAM_2025_VIDEO].map((v) => ({
        type: "video" as const,
        src: v.src,
        poster: v.poster ?? v.src,
        alt: v.caption,
      })),
    [],
  );

  const programVideoIndex = EVENT_HIGHLIGHT_VIDEOS.length;

  return (
    <section
      id="events"
      className="section-padding scroll-mt-24 bg-surface"
      aria-label={t.events.aria}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t.events.eyebrow}
          title={t.events.title}
          subtitle={t.events.subtitle}
        />
      </div>

      <MotionReveal className="mt-12" delay={0.1}>
        <PremiumHorizontalScroll
          ariaLabel={t.events.showcaseAria}
          scrollHint={t.common.scrollHint}
          fadeFrom="surface"
        >
          {EVENT_SHOWCASE_IMAGES.map((img, i) => (
            <div
              key={img.src}
              role="listitem"
              data-scroll-item
              className={`${premiumScrollCardClass} aspect-[3/4] w-[min(72vw,20rem)] sm:w-72 md:w-80`}
            >
              <Image
                src={img.src}
                alt={showcaseAlts[i] ?? img.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="320px"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="line-clamp-2 text-[11px] font-medium uppercase tracking-wide text-ink/90">
                  {showcaseAlts[i] ?? img.alt}
                </span>
              </span>
            </div>
          ))}
        </PremiumHorizontalScroll>

        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-4 px-5 md:px-10">
          <a
            href={t.whatsapp.organization}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-sm bg-amber px-8 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            {t.events.orgInfo}
          </a>
          <a
            href={t.whatsapp.reservation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-sm border border-amber/40 px-8 text-sm font-bold uppercase tracking-cta text-amber transition-colors hover:border-amber hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            {t.events.partyReservation}
          </a>
        </div>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-20 max-w-6xl px-5 md:px-10" delay={0.12}>
        <h3 className="text-center font-display text-2xl font-bold uppercase md:text-3xl">
          {t.events.partyTitle}{" "}
          <span className="text-amber">{t.events.partyTitleAccent}</span>
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          {t.events.partySubtitle}
        </p>
      </MotionReveal>

      <MotionReveal className="mt-10" delay={0.13}>
        <PremiumHorizontalScroll
          ariaLabel={t.events.videosAria}
          scrollHint={t.common.scrollHint}
          fadeFrom="surface"
        >
          {EVENT_HIGHLIGHT_VIDEOS.map((video, index) => (
            <button
              key={video.src}
              type="button"
              role="listitem"
              data-scroll-item
              aria-label={`${t.common.play}: ${videoTitles[index]}`}
              onClick={() => setOpenIndex(index)}
              className={`${premiumScrollCardClass} aspect-[9/16] w-[min(68vw,18rem)] sm:w-64 md:w-72`}
            >
              <Image
                src={video.poster ?? "/gallery/loop-01.png"}
                alt={videoTitles[index]}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="288px"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-amber/30 bg-night/70 px-2.5 py-1 text-[10px] font-bold text-amber backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-night/70 text-amber backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon className="ml-0.5 h-7 w-7" />
                </span>
              </span>
              <span className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <span className="font-display text-sm font-bold uppercase text-ink">
                  {videoTitles[index]}
                </span>
              </span>
            </button>
          ))}
        </PremiumHorizontalScroll>
      </MotionReveal>

      <div id="programs" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-5 md:px-10">
        <MotionReveal delay={0.14}>
          <h3 className="text-center font-display text-2xl font-bold uppercase md:text-3xl">
            {t.events.programsTitle}{" "}
            <span className="text-amber">{t.events.programsTitleAccent}</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            {t.events.programsSubtitle}
          </p>

          <div className="mx-auto mt-10 max-w-lg">
            <VideoPosterCard
              poster={PROGRAM_2025_VIDEO.poster ?? "/gallery/loop-12.png"}
              title={PROGRAM_2025_VIDEO.title}
              caption={PROGRAM_2025_VIDEO.caption}
              badge="2025"
              aspect="16/9"
              showDetails={false}
              onPlay={() => setOpenIndex(programVideoIndex)}
            />
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <div className="group relative overflow-hidden rounded-xl border border-amber/20 bg-card p-8 text-center shadow-card transition-[border-color,box-shadow] duration-300 hover:border-amber/45 hover:shadow-amber-glow md:p-10">
              <span
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                aria-hidden
                style={{
                  background:
                    "repeating-linear-gradient(-45deg, transparent, transparent 12px, currentColor 12px, currentColor 13px)",
                }}
              />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.35em] text-amber">
                  {t.programs.comingSoon}
                </p>
              <p className="relative mt-4 font-display text-5xl font-extrabold uppercase text-ink md:text-6xl">
                {UPCOMING_PROGRAM_YEAR.year}
              </p>
                <p className="relative mt-2 font-display text-lg font-bold uppercase tracking-widest text-muted">
                  {t.events.coming}
                </p>
                <p className="relative mt-5 text-sm leading-relaxed text-muted">
                  {t.programs.hint}
                </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-sm border border-amber/40 px-8 text-sm font-bold uppercase tracking-cta text-amber transition-colors hover:border-amber hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
                {t.events.followInstagram}
            </a>
          </div>
        </MotionReveal>
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
