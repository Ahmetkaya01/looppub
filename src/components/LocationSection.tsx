"use client";

import { CONTACT } from "@/lib/constants";
import { useLocale } from "@/context/LocaleContext";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";

export default function LocationSection() {
  const { t } = useLocale();

  return (
    <section
      id="location"
      className="section-padding scroll-mt-24 border-y border-white/5 bg-surface"
      aria-label={t.location.aria}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          subtitle={t.location.subtitle}
        />

        <MotionReveal className="mt-10" delay={0.1}>
          <div className="glass-panel rounded-xl p-8 md:p-10">
            <p className="text-center text-sm leading-relaxed text-muted md:text-left md:text-base">
              {CONTACT.address}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-amber px-8 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                {t.location.openMap}
              </a>
              <a
                href={CONTACT.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-amber/40 px-8 text-sm font-bold uppercase tracking-cta text-amber transition-colors hover:border-amber hover:bg-amber/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h11" />
                </svg>
                {t.location.directions}
              </a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
