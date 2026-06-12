import type { Metadata } from "next";
import { getGelAlMenuCategories, getMenuCategories } from "@/lib/menu";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import MenuClient from "@/components/menu/MenuClient";
import { MenuPageFooter, MenuPageHeader } from "@/components/MenuPageChrome";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "Tokat Merkez Loop Pub & Bar menüsü — imza kokteyller, craft biralar, viskiler, şaraplar ve atıştırmalıklar. Güncel fiyatlarla tam menü.",
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: {
    title: `Menü | ${SITE_NAME}`,
    description:
      "Tokat Merkez Loop Pub güncel menüsü ve fiyatları — kokteyller, biralar ve daha fazlası.",
    url: `${SITE_URL}/menu`,
    type: "website",
  },
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ "gel-al"?: string }>;
}) {
  const params = await searchParams;
  const isGelAl = params["gel-al"] === "1";
  const categories = isGelAl ? getGelAlMenuCategories() : getMenuCategories();

  return (
    <>
      <MenuPageHeader isGelAl={isGelAl} />

      <main>
        <MenuClient categories={categories} variant={isGelAl ? "gel-al" : "full"} />
      </main>

      <MenuPageFooter />

      <FloatingWhatsApp />
    </>
  );
}
