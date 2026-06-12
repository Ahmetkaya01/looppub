import type { Metadata } from "next";
import Link from "next/link";
import { getMenuCategories } from "@/lib/menu";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";
import MenuClient from "@/components/menu/MenuClient";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "Loop Pub & Bar menü — biralar, imza kokteyller, viskiler, şaraplar, atıştırmalıklar, sıcak ve soğuk içecekler. Güncel fiyatlarla tam menü.",
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: {
    title: `Menü | ${SITE_NAME}`,
    description: "Loop Pub & Bar güncel menüsü ve fiyatları.",
    url: `${SITE_URL}/menu`,
    type: "website",
  },
};

export default function MenuPage() {
  const categories = getMenuCategories();

  return (
    <>
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link
            href="/"
            className="font-display text-base font-extrabold uppercase tracking-wide"
          >
            Loop <span className="text-amber">Pub</span>
          </Link>
          <h1 className="font-display text-base font-bold uppercase tracking-cta">
            Menü
          </h1>
          <a
            href={CONTACT.phoneTel}
            className="text-xs font-semibold uppercase tracking-cta text-amber"
          >
            Ara
          </a>
        </div>
      </header>

      <main>
        <MenuClient categories={categories} />
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted">
        {SITE_NAME} © 2026 - All Rights Reserved
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
