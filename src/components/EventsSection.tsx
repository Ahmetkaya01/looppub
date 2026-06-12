import Image from "next/image";
import { CONTACT, YOUTUBE_PLAYLIST_EMBED } from "@/lib/constants";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";

const VIP_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&q=80",
    alt: "Loop üst kat lounge atmosferi",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    alt: "Özel organizasyon masası",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80",
    alt: "Parti ışıkları ve dans pisti",
  },
];

export default function EventsSection() {
  return (
    <section
      id="events"
      className="section-padding bg-surface"
      aria-label="Etkinlikler ve organizasyon"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="VIP Lounge"
          title="Üst Kat Organizasyonları"
          subtitle="Doğum günleri, iş toplantıları ve özel partiler için üst katımızı size özel kiralayın. Özel menü, ses sistemi ve dekorasyon desteğiyle."
        />

        <MotionReveal className="mt-12" delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            {VIP_IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-lg border border-amber/20 transition-shadow duration-500 hover:shadow-amber-glow ${
                  i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={CONTACT.whatsappOrganizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-sm bg-amber px-8 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Organizasyon Bilgisi Al
            </a>
          </div>
        </MotionReveal>

        <MotionReveal className="mt-20" delay={0.15}>
          <h3 className="text-center font-display text-2xl font-bold uppercase md:text-3xl">
            Geçmiş <span className="text-amber">Etkinlikler</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Canlı müzik geceleri, DJ performansları ve unutulmaz partiler — Loop
            etkinlik playlist&apos;i.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-card shadow-card">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={YOUTUBE_PLAYLIST_EMBED}
                title="Loop Pub etkinlik videosu playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
