import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SEO_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Samsun Atakum — Canlı Müzik, Kokteyl Bar & Pub`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Loop Pub & Bar — Samsun Atakum gece hayatının premium adresi. İmza kokteyller, craft biralar, canlı müzik geceleri ve özel organizasyonlar için VIP üst kat.",
  keywords: SEO_KEYWORDS,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Samsun Atakum — Canlı Müzik & Kokteyl Bar`,
    description:
      "Samsun Atakum'da premium pub deneyimi: imza kokteyller, craft biralar, canlı müzik ve VIP üst kat organizasyonları.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Samsun Atakum`,
    description:
      "Samsun Atakum gece hayatının premium adresi — kokteyl bar, canlı müzik, pub.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="overflow-x-hidden bg-night text-ink">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
