"use client";

import Image from "next/image";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Poster görseli + play — video yalnızca lightbox'ta oynar */
export default function VideoPosterCard({
  poster,
  title,
  caption,
  tags,
  badge,
  onPlay,
  aspect = "9/16",
  showDetails = true,
}: {
  poster: string;
  title: string;
  caption: string;
  tags?: string[];
  badge?: string;
  onPlay: () => void;
  aspect?: "9/16" | "16/9";
  /** false ise yalnızca poster/play (başlık ve açıklama gizlenir) */
  showDetails?: boolean;
}) {
  const aspectClass = aspect === "16/9" ? "aspect-video" : "aspect-[9/16]";

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Oynat: ${title}`}
        className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-card shadow-card transition-[border-color,transform] duration-300 hover:border-amber/50 hover:shadow-amber-glow active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      >
        <div className={`relative w-full ${aspectClass}`}>
          <Image
            src={poster}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent opacity-90" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-night/70 text-amber backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <PlayIcon className="ml-1 h-7 w-7" />
            </span>
          </span>
          {badge && (
            <span className="absolute left-3 top-3 rounded-full bg-night/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      </button>

      {showDetails && (
        <div className="mt-5 text-center md:text-left">
          <h3 className="font-display text-xl font-bold uppercase text-ink md:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{caption}</p>
          {tags && tags.length > 0 && (
            <p className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {tags.map((tag) => (
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
      )}
    </article>
  );
}
