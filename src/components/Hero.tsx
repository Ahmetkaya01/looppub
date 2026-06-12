"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { HERO_POSTER_URL, HERO_VIDEO_URL } from "@/lib/constants";
import Button from "./ui/Button";
import Particles from "./ui/Particles";

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[100dvh] overflow-hidden"
      aria-label="Loop Pub & Bar giriş"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: videoScale }}
      >
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO_URL}
          poster={HERO_POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[var(--overlay-hero)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <Particles />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
        style={reduced ? undefined : { opacity: contentOpacity }}
        variants={reduced ? undefined : staggerContainer}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "visible"}
      >
        <motion.p
          variants={reduced ? undefined : fadeInUp}
          className="eyebrow"
        >
          Premium Pub &amp; Lounge
        </motion.p>

        <motion.h1
          variants={reduced ? undefined : fadeInUp}
          style={reduced ? undefined : { y: headlineY }}
          className="mt-5 font-display text-5xl font-extrabold uppercase leading-[1.05] md:text-7xl lg:text-8xl"
        >
          <span className="block text-ink">Loop</span>
          <span className="neon-text block">Pub &amp; Bar</span>
        </motion.h1>

        <motion.p
          variants={reduced ? undefined : fadeInUp}
          style={reduced ? undefined : { y: subY }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          İmza kokteyller, craft biralar ve şehrin en iyi müziği.
          Geceniz burada başlasın.
        </motion.p>

        <motion.div
          variants={reduced ? undefined : fadeInUp}
          style={reduced ? undefined : { y: subY }}
          className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button href="/menu">Menü</Button>
          <Button href="#contact" variant="outline">
            Rezervasyon Yap
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="block h-16 w-px origin-bottom bg-amber/70 motion-safe:animate-pulse-line" />
      </div>
    </section>
  );
}
