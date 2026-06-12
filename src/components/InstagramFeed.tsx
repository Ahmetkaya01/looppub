import Image from "next/image";
import { CONTACT } from "@/lib/constants";
import SectionHeading from "./ui/SectionHeading";
import MotionReveal from "./ui/MotionReveal";

const FEED_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    alt: "Neon ışıklı imza kokteyl",
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
    alt: "Taze doldurulmuş bira bardağı",
  },
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
    alt: "Loop Pub bar atmosferi",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    alt: "Bar tezgahında kokteyl hazırlığı",
  },
  {
    src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80",
    alt: "Renkli kokteyl sunumu",
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"
      />
    </svg>
  );
}

export default function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="section-padding bg-surface"
      aria-label="Instagram"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sosyal Medya"
          title={`Bizi Takip Edin ${CONTACT.instagramHandle}`}
          subtitle="Gecenin en iyi anları, yeni kokteyller ve etkinlik duyuruları Instagram'da."
        />

        <MotionReveal className="mt-12" delay={0.1}>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {FEED_IMAGES.map((img) => (
              <a
                key={img.src}
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram'da gör: ${img.alt}`}
                className="group relative aspect-square overflow-hidden rounded-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-night/0 transition-colors duration-300 group-hover:bg-night/60">
                  <InstagramIcon className="h-8 w-8 text-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
