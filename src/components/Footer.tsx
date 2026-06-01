"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CONTACT, SITE_DOMAIN, SITE_URL } from "@/lib/constants";
import { getNavLinks } from "@/lib/nav";
import FadeIn from "./FadeIn";
import FooterSocial from "./FooterSocial";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Loop Pub — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const telUrl = `tel:${CONTACT.phoneTel}`;

  return (
    <footer
      id="contact"
      className="border-t border-[var(--border)] bg-page transition-colors duration-500"
      aria-label={t.footer.ariaLabel}
    >
      <div className="section-padding !pb-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <p className="font-body text-xs uppercase tracking-[0.35em] text-gold">
                {t.footer.contact}
              </p>
              <h2 className="section-title mt-3">{t.nav.contact}</h2>
              <div className="gold-divider" />
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn delay={80}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {t.footer.address}
                  </p>
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block font-body text-sm leading-relaxed text-ink transition-colors hover:text-gold"
                  >
                    {CONTACT.address}
                  </a>
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-4 inline-flex text-xs"
                  >
                    {t.footer.openMaps}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {t.footer.phone}
                  </p>
                  {CONTACT.phone.map((tel) => (
                    <a
                      key={tel}
                      href={telUrl}
                      className="mt-2 block font-display text-xl text-ink hover:text-gold"
                    >
                      {tel}
                    </a>
                  ))}
                  <p className="mt-6 text-xs uppercase tracking-wider text-muted">
                    {t.footer.email}
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-2 block text-ink hover:text-gold"
                  >
                    {CONTACT.email}
                  </a>
                  <p className="mt-6 text-xs uppercase tracking-wider text-muted">
                    {t.footer.hours}
                  </p>
                  <p className="mt-2 font-body text-ink">{CONTACT.hours}</p>
                  <FooterSocial />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      {t.footer.formName}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={t.footer.formName}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border-b border-[var(--border)] bg-transparent py-3 text-ink outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      {t.footer.formEmail}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder={t.footer.formEmail}
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border-b border-[var(--border)] bg-transparent py-3 text-ink outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">
                      {t.footer.formMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder={t.footer.formMessage}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full resize-none border-b border-[var(--border)] bg-transparent py-3 text-ink outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                  {t.footer.formSubmit}
                </button>
              </form>
            </FadeIn>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-[var(--border)] pt-10 md:flex-row">
            <Logo compact />
            <nav aria-label={t.footer.footerNavAria}>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs uppercase tracking-wider text-muted hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={SITE_URL}
              className="text-sm text-gold hover:text-gold-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_DOMAIN}
            </a>
          </div>

          <p className="mt-10 text-center font-display text-sm italic text-muted md:text-base">
            {t.footer.slogan}
          </p>
          <p className="mt-3 text-center font-body text-xs text-muted">
            {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
