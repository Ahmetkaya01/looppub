"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import { NAV_ITEMS } from "@/i18n";
import { CONTACT } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";

const menuStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Header() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
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

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${
          solid && !menuOpen
            ? "border-b border-white/10 bg-night/85 backdrop-blur-md"
            : menuOpen
              ? "bg-transparent"
              : "bg-transparent"
        }`}
      >
        <nav
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10"
          aria-label={t.header.navAria}
        >
          <Link
            href="/"
            className="relative z-[70] shrink-0 font-display text-lg font-extrabold uppercase tracking-wide"
            onClick={closeMenu}
          >
            Loop <span className="text-amber">Pub</span>
          </Link>

          <div className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex">
            <div className="pointer-events-auto flex flex-nowrap items-center gap-3 xl:gap-4">
              {NAV_ITEMS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase leading-none tracking-wide text-muted transition-colors hover:text-amber xl:text-xs"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative z-[70] hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
            <LanguageSwitcher className="shrink-0" />
            <a
              href={CONTACT.phoneTel}
              className="shrink-0 whitespace-nowrap rounded-sm bg-amber px-4 py-2 text-[11px] font-bold uppercase leading-none tracking-wide text-night transition-colors hover:bg-amber-soft xl:px-5 xl:text-xs"
            >
              {t.common.reservation}
            </a>
          </div>

          <div className="relative z-[70] flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center"
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full transition-all duration-300 ${
                    menuOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45 bg-amber"
                      : "bg-ink"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-opacity duration-300 ${
                    menuOpen ? "opacity-0 bg-ink" : "bg-ink"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full transition-all duration-300 ${
                    menuOpen
                      ? "bottom-1/2 translate-y-1/2 -rotate-45 bg-amber"
                      : "bg-ink"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.mobileMenu}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-night/97 backdrop-blur-2xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,191,0,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(212,175,55,0.08), transparent 50%)",
              }}
            />

            <div className="relative flex h-16 shrink-0 items-center justify-between px-5">
              <span className="font-display text-lg font-extrabold uppercase tracking-wide text-ink">
                Loop <span className="text-amber">Pub</span>
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label={t.header.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-muted transition-colors hover:border-amber/40 hover:text-amber"
              >
                ×
              </button>
            </div>

            <div className="relative flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-8 pt-4">
              <div>
                <p className="eyebrow">{t.header.navigation}</p>
                <motion.ul
                  className="mt-6"
                  variants={reduced ? undefined : menuStagger}
                  initial={reduced ? undefined : "hidden"}
                  animate={reduced ? undefined : "visible"}
                >
                  {NAV_ITEMS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      variants={reduced ? undefined : menuItem}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-center gap-5 border-b border-white/[0.06] py-5 transition-colors"
                      >
                        <span className="w-8 font-body text-[11px] font-semibold tabular-nums tracking-widest text-amber/50 transition-colors group-hover:text-amber">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.35rem] font-bold uppercase leading-none tracking-wide text-ink/90 transition-colors group-hover:text-amber md:text-2xl">
                          {t.nav[link.key]}
                        </span>
                        <span
                          className="ml-auto text-amber opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.div
                className="mt-10 space-y-3"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {t.common.premiumPubBar}
                </p>
                <a
                  href={t.whatsapp.reservation}
                  onClick={closeMenu}
                  className="flex min-h-[3.25rem] items-center justify-center rounded-sm bg-amber text-sm font-bold uppercase tracking-cta text-night shadow-amber-glow transition-transform active:scale-[0.98] hover:bg-amber-soft"
                >
                  {t.common.reservationCta}
                </a>
                <a
                  href={t.whatsapp.reservation}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-center rounded-sm border border-white/15 text-sm font-bold uppercase tracking-cta text-ink transition-colors hover:border-amber/35 hover:text-amber"
                >
                  {t.common.whatsapp}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
