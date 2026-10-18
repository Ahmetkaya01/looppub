"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MenuTabId } from "@/i18n/types";
import { MENU_TAB_IDS } from "@/lib/menu";
import { getNavLinks } from "@/lib/nav";
import { navigateToMenuTab } from "@/lib/menu-navigation";
import ArrowButton from "./ArrowButton";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  const leftLinks = navLinks.filter((l) =>
    ["#home", "#about", "#menu"].includes(l.href),
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onHero = !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openMenuCategory = (tabId: MenuTabId) => {
    closeMenu();
    navigateToMenuTab(tabId);
  };

  const linkClass = onHero
    ? "text-maple/90 hover:text-maple-dark"
    : "text-maroon/80 hover:text-maroon";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled || menuOpen ? "nav-glass" : "bg-transparent"
        } ${onHero ? "nav-hero" : ""}`}
      >
        <nav
          className="relative z-[81] mx-auto grid min-h-[4.5rem] max-w-[100%] grid-cols-[1fr_auto_1fr] items-center gap-4 px-[6%] py-3"
          aria-label={t.nav.ariaMain}
        >
          <ul className="hidden items-center gap-1 lg:flex">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1 px-3 py-2 font-body text-sm uppercase tracking-nav transition-colors duration-300 ${linkClass}`}
                >
                  {link.label}
                  {link.href === "#menu" && <ChevronDown />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="justify-self-center">
            <Logo onClick={closeMenu} light={onHero} />
          </div>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            <LanguageSwitcher light={onHero} />
            <ThemeToggle light={onHero} />
            <ArrowButton href="#contact" className="!text-xs">
              {t.nav.reserve}
            </ArrowButton>
          </div>

          <div className="col-span-2 flex items-center justify-end gap-2 lg:hidden">
            <ThemeToggle light={onHero} />
            <LanguageSwitcher compact light={onHero} />
            <button
              type="button"
              className={`relative z-[82] flex h-10 w-10 flex-col items-center justify-center gap-1.5 border ${
                onHero ? "border-maple/40" : "border-maroon/25"
              }`}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={`block h-0.5 w-5 transition-all duration-300 ${
                  onHero ? "bg-maple" : "bg-maroon"
                } ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 transition-all duration-300 ${
                  onHero ? "bg-maple" : "bg-maroon"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 transition-all duration-300 ${
                  onHero ? "bg-maple" : "bg-maroon"
                } ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.mobileMenuTitle}
        className={`fixed inset-0 z-[75] bg-maple transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="relative mx-auto flex h-full max-w-lg flex-col overflow-y-auto px-6 pb-10 pt-24">
          <button
            type="button"
            className="absolute right-6 top-6 font-body text-sm uppercase tracking-nav text-maroon"
            onClick={closeMenu}
          >
            {t.nav.closeMenu}
          </button>

          <p className="eyebrow">{t.nav.browseMenu}</p>
          <h2 className="mt-2 font-display text-3xl text-maroon">{t.menu.title}</h2>
          <div className="gold-divider !mx-0 !mt-4" />

          <ul className="mt-6 flex flex-col" aria-label={t.menu.tablistAria}>
            {MENU_TAB_IDS.map((tabId) => (
              <li key={tabId}>
                <button
                  type="button"
                  className="menu-tab-link w-full font-display text-xl text-maroon"
                  onClick={() => openMenuCategory(tabId)}
                >
                  {t.menu.tabs[tabId]}
                </button>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-10">{t.nav.ariaMain}</p>
          <ul className="mt-4 flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="menu-tab-link block font-display text-xl text-maroon"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ArrowButton
              href="#contact"
              variant="maroon"
              onClick={closeMenu}
              className="w-full justify-center"
            >
              {t.nav.reserve}
            </ArrowButton>
          </div>
        </div>
      </div>
    </>
  );
}
