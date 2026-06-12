"use client";

import { CONTACT, HOURS } from "@/lib/constants";
import { useLocale } from "@/context/LocaleContext";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";

export default function ContactSection() {
  const { t } = useLocale();

  return (
    <section
      id="contact"
      className="section-padding"
      aria-label={t.contact.aria}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <MotionReveal delay={0.05}>
            <div className="glass-panel flex h-full flex-col gap-4 rounded-lg p-8">
              <h3 className="font-display text-xl font-bold uppercase">
                {t.contact.reachUs}
              </h3>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-amber px-6 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                </svg>
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={t.whatsapp.reservation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-[#25D366]/60 px-6 text-sm font-bold uppercase tracking-cta text-[#25D366] transition-colors hover:bg-[#25D366]/10"
              >
                {t.contact.whatsappQuick}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {CONTACT.address}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-sm bg-amber/90 px-5 text-xs font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber"
                >
                  {t.location.openMap}
                </a>
                <a
                  href={CONTACT.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-amber/40 px-5 text-xs font-bold uppercase tracking-cta text-amber transition-colors hover:bg-amber/10"
                >
                  {t.location.directions}
                </a>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="glass-panel flex h-full flex-col rounded-lg p-8">
              <h3 className="font-display text-xl font-bold uppercase">
                {t.contact.hoursTitle}
              </h3>
              <dl className="mt-6 space-y-4">
                {HOURS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between border-b border-white/10 pb-4"
                  >
                    <dt className="text-sm uppercase tracking-cta text-muted">
                      {t.contact.hoursLabel}
                    </dt>
                    <dd className="font-display text-lg font-bold text-amber">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div
                className="mt-auto rounded-md border border-amber/35 bg-amber/10 px-4 py-4 pt-6"
                role="note"
              >
                <p className="text-sm font-semibold leading-relaxed text-amber md:text-base">
                  {t.contact.busyNote}
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
