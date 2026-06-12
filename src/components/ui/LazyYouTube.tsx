"use client";

import { useState } from "react";
import Image from "next/image";

/** Tıklanınca iframe yüklenir — sayfa açılışında ağır embed yok */
export default function LazyYouTube({
  embedSrc,
  title,
  poster,
}: {
  embedSrc: string;
  title: string;
  poster: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${embedSrc}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative aspect-video w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      aria-label={`${title} — oynat`}
    >
      <Image
        src={poster}
        alt=""
        fill
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
      <span className="absolute inset-0 bg-night/50 transition-colors group-hover:bg-night/40" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" aria-hidden>
            <path fill="currentColor" d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-4 left-4 rounded bg-night/80 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
        Playlist&apos;i oynat
      </span>
    </button>
  );
}
