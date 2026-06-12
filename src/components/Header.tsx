"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-white/10 bg-night/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10"
        aria-label="Ana navigasyon"
      >
        <Link
          href="/"
          className="font-display text-lg font-extrabold uppercase tracking-wide"
          onClick={() => setMenuOpen(false)}
        >
          Loop <span className="text-amber">Pub</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-cta text-muted transition-colors hover:text-amber"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CONTACT.phoneTel}
            className="rounded-sm bg-amber px-5 py-2 text-sm font-bold uppercase tracking-cta text-night transition-colors hover:bg-amber-soft"
          >
            Rezervasyon
          </a>
        </div>

        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-ink transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-transform duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="flex h-[calc(100dvh-4rem)] flex-col gap-2 bg-night px-5 pt-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-white/10 py-4 font-display text-2xl font-bold uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CONTACT.phoneTel}
            className="mt-6 rounded-sm bg-amber py-4 text-center font-bold uppercase tracking-cta text-night"
            onClick={() => setMenuOpen(false)}
          >
            Rezervasyon Yap
          </a>
        </div>
      )}
    </header>
  );
}
