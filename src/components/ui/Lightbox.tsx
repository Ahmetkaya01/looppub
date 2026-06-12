"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getHighResSrc, type GalleryMedia } from "@/data/gallery";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryMedia[];
  /** null ise kapalı */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const media = open ? items[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {open && media && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={media.alt}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mx-4 w-full max-w-5xl"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-card">
              {media.type === "video" ? (
                <video
                  key={media.src}
                  className="h-full w-full object-contain"
                  src={media.src}
                  poster={media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="none"
                />
              ) : (
                <Image
                  key={media.src}
                  src={getHighResSrc(media)}
                  alt={media.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              )}
            </div>

            <p className="mt-3 text-center text-sm text-muted">{media.alt}</p>

            <button
              ref={closeRef}
              type="button"
              aria-label="Kapat"
              onClick={onClose}
              className="absolute -top-12 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl leading-none text-ink transition-colors hover:border-amber hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              ×
            </button>

            <button
              type="button"
              aria-label="Önceki"
              onClick={goPrev}
              className="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-night/80 text-xl text-ink backdrop-blur transition-colors hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber md:-left-14 md:bg-transparent"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Sonraki"
              onClick={goNext}
              className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-night/80 text-xl text-ink backdrop-blur transition-colors hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber md:-right-14 md:bg-transparent"
            >
              ›
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
