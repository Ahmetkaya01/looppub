"use client";

import { motion, useReducedMotion } from "framer-motion";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

const baseClasses =
  "inline-flex min-h-12 items-center justify-center px-8 py-3 font-body text-sm font-bold uppercase tracking-cta transition-colors duration-300";

const variantClasses = {
  solid:
    "bg-amber text-night hover:bg-amber-soft shadow-amber-glow rounded-sm",
  outline:
    "border border-ink/40 text-ink hover:border-amber hover:text-amber rounded-sm",
};

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}
