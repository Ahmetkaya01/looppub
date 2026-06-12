"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const PARTICLES: Particle[] = [
  { left: "8%", size: 4, duration: 11, delay: 0, color: "#FFBF00" },
  { left: "18%", size: 3, duration: 14, delay: 2.5, color: "#D4AF37" },
  { left: "29%", size: 5, duration: 12, delay: 1, color: "#FFBF00" },
  { left: "41%", size: 3, duration: 16, delay: 4, color: "#C026D3" },
  { left: "52%", size: 4, duration: 13, delay: 0.5, color: "#FFD75E" },
  { left: "63%", size: 3, duration: 15, delay: 3, color: "#FFBF00" },
  { left: "72%", size: 5, duration: 12, delay: 5, color: "#D4AF37" },
  { left: "81%", size: 3, duration: 17, delay: 1.5, color: "#C026D3" },
  { left: "90%", size: 4, duration: 13, delay: 3.5, color: "#FFBF00" },
  { left: "96%", size: 3, duration: 15, delay: 6, color: "#FFD75E" },
];

/** Hero üzerinde yukarı süzülen neon partiküller */
export default function Particles() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: -12,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{ y: "-105vh", opacity: [0, 0.9, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
