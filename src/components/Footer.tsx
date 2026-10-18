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
      className="footer-premium border-t border-maple/10"
      aria-label={t.footer.ariaLabel}
    >
      <div className="section-padding !pb-10">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
              <div>
                <Logo light compact />
                <p className="mt-8 max-w-sm font-body text-sm leading-relaxed text-maple/75">
                  {t.hero.subtitle}
                </p>
                <div className="mt-8 space-y-4 font-body text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-nav text-maple/50">
                      {t.footer.address}
                    </p>
                    <a
                      href={CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-maple transition-colors hover:text-maple-dark"
                    >
                      {CONTACT.address}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-nav text-maple/50">
                      {t.footer.phone}
                    </p>
                    {CONTACT.phone.map((tel) => (
                      <a
                        key={tel}
                        href={telUrl}
                        className="mt-1 block font-display text-lg text-maple hover:text-maple-dark"
                      >
                        {tel}
                      </a>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-nav text-maple/50">
                      {t.footer.email}
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-1 block text-maple hover:text-maple-dark"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-nav text-maple/50">
                      {t.footer.hours}
                    </p>
                    <p className="mt-1 text-maple">{CONTACT.hours}</p>
                  </div>
                </div>
                <FooterSocial light />
              </div>

              <div>
                <p className="eyebrow-light">{t.footer.contact}</p>
                <h2 className="section-title-light mt-3 !text-[2rem] md:!text-[2.5rem]">
                  {t.nav.contact}
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder={t.footer.formName}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border-b border-maple/25 bg-transparent py-3 text-maple outline-none placeholder:text-maple/40 focus:border-maple"
                  />
                  <input
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder={t.footer.formEmail}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border-b border-maple/25 bg-transparent py-3 text-maple outline-none placeholder:text-maple/40 focus:border-maple"
                  />
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t.footer.formMessage}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-none border-b border-maple/25 bg-transparent py-3 text-maple outline-none placeholder:text-maple/40 focus:border-maple"
                  />
                  <button type="submit" className="btn-1806 mt-4">
                    <span className="btn-1806-offset" aria-hidden />
                    <span className="btn-1806-inner">{t.footer.formSubmit}</span>
                  </button>
                </form>
              </div>
            </div>
          </FadeIn>

          <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-maple/15 pt-10 md:flex-row">
            <nav aria-label={t.footer.footerNavAria}>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-xs uppercase tracking-nav text-maple/60 transition-colors hover:text-maple"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={SITE_URL}
              className="text-sm text-maple-dark hover:text-maple"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_DOMAIN}
            </a>
          </div>

          <p className="mt-10 text-center font-display text-sm italic text-maple/70 md:text-base">
            {t.footer.slogan}
          </p>
          <p className="mt-3 text-center font-body text-xs text-maple/50">
            {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
