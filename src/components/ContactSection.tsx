import { CONTACT, HOURS } from "@/lib/constants";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding"
      aria-label="Rezervasyon ve iletişim"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Rezervasyon"
          title="Hızlı Rezervasyon & İletişim"
          subtitle="Masanızı saniyeler içinde ayırtın — tek dokunuşla arayın veya WhatsApp'tan yazın."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <MotionReveal delay={0.05}>
            <div className="glass-panel flex h-full flex-col gap-4 rounded-lg p-8">
              <h3 className="font-display text-xl font-bold uppercase">
                Bize Ulaşın
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
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-[#25D366]/60 px-6 text-sm font-bold uppercase tracking-cta text-[#25D366] transition-colors hover:bg-[#25D366]/10"
              >
                WhatsApp ile Hızlı Rezervasyon
              </a>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm leading-relaxed text-muted transition-colors hover:text-amber"
              >
                {CONTACT.address}
              </a>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="glass-panel flex h-full flex-col rounded-lg p-8">
              <h3 className="font-display text-xl font-bold uppercase">
                Çalışma Saatleri
              </h3>
              <dl className="mt-6 space-y-4">
                {HOURS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between border-b border-white/10 pb-4"
                  >
                    <dt className="text-sm uppercase tracking-cta text-muted">
                      {row.label}
                    </dt>
                    <dd className="font-display text-lg font-bold text-amber">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto pt-6 text-xs text-muted/80">
                Yoğun günlerde rezervasyonsuz masa bulmak zor olabilir —
                önceden yerinizi ayırtmanızı öneririz.
              </p>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
