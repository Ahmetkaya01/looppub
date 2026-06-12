"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "@/context/LocaleContext";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export const premiumScrollCardClass =
  "premium-scroll-card group relative shrink-0 snap-center snap-always overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.05] transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-amber/50 hover:shadow-amber-glow active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-night";

type PremiumHorizontalScrollProps = {
  children: ReactNode;
  ariaLabel: string;
  scrollHint: string;
  fadeFrom?: "night" | "surface";
};

export default function PremiumHorizontalScroll({
  children,
  ariaLabel,
  scrollHint,
  fadeFrom = "night",
}: PremiumHorizontalScrollProps) {
  const { t } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 12);
    setCanScrollRight(el.scrollLeft < maxScroll - 12);
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, children]);

  const scrollByDirection = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstItem = el.querySelector<HTMLElement>("[data-scroll-item]");
    const step = firstItem
      ? firstItem.offsetWidth + 24
      : Math.round(el.clientWidth * 0.72);

    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const fadeLeft =
    fadeFrom === "surface"
      ? "bg-gradient-to-r from-surface via-surface/90 to-transparent"
      : "bg-gradient-to-r from-night via-night/90 to-transparent";
  const fadeRight =
    fadeFrom === "surface"
      ? "bg-gradient-to-l from-surface via-surface/90 to-transparent"
      : "bg-gradient-to-l from-night via-night/90 to-transparent";

  return (
    <div className="group/scroll relative">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-10 sm:w-16 md:w-24 lg:w-32 ${fadeLeft}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-10 sm:w-16 md:w-24 lg:w-32 ${fadeRight}`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-8 left-0 z-20 w-px bg-gradient-to-b from-transparent via-amber/35 to-transparent opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-8 right-0 z-20 w-px bg-gradient-to-b from-transparent via-amber/35 to-transparent opacity-70"
        aria-hidden
      />

      <button
        type="button"
        aria-label={t.common.scrollPrev}
        onClick={() => scrollByDirection(-1)}
        disabled={!canScrollLeft}
        className={`absolute left-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-night/80 text-amber shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:border-amber/45 hover:bg-night/95 md:flex ${
          canScrollLeft
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        aria-label={t.common.scrollNext}
        onClick={() => scrollByDirection(1)}
        disabled={!canScrollRight}
        className={`absolute right-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-night/80 text-amber shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:border-amber/45 hover:bg-night/95 md:flex ${
          canScrollRight
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronIcon direction="right" />
      </button>

      <div
        ref={scrollRef}
        className="premium-scroll-track no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth py-4 md:gap-7"
        role="list"
        aria-label={ariaLabel}
      >
        {children}
      </div>

      <div className="mx-auto mt-2 flex max-w-sm flex-col items-center gap-3 px-5 md:mt-4">
        <div
          className="h-px w-full overflow-hidden rounded-full bg-white/[0.08]"
          aria-hidden
        >
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-amber/30 via-amber to-amber-soft transition-[transform,width] duration-300 ease-out"
            style={{
              width: `${Math.max(progress * 100, progress === 1 ? 100 : 8)}%`,
            }}
          />
        </div>
        <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted/75">
          <span
            className="hidden text-amber/60 motion-safe:animate-pulse sm:inline"
            aria-hidden
          >
            ←
          </span>
          {scrollHint}
          <span
            className="hidden text-amber/60 motion-safe:animate-pulse sm:inline"
            aria-hidden
          >
            →
          </span>
        </p>
      </div>
    </div>
  );
}
