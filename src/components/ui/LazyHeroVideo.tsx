"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Hero: poster görünür kalır, video oynayınca yumuşak geçiş */
export default function LazyHeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      }
      setPlaying(true);
    } catch {
      /* Autoplay engellendi — poster görünür kalır */
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setPlaying(true);
    const onCanPlay = () => {
      void attemptPlay();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void attemptPlay();
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [attemptPlay, src]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
        aria-hidden
      />
      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
