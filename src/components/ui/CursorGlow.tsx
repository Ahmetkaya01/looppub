"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** İmleci takip eden amber ışık aurası — yalnızca fine pointer'lı cihazlarda */
export default function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x: springX,
        y: springY,
        marginLeft: -240,
        marginTop: -240,
        background:
          "radial-gradient(circle, rgba(255,191,0,0.10) 0%, rgba(255,191,0,0.04) 35%, transparent 70%)",
      }}
    />
  );
}
