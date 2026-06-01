import type { Metadata } from "next";
import { CONTACT, SITE_NAME, SITE_URL } from "./constants";

export const MENU_API_BASE =
  "https://123.limonpos.com.tr/nexopos/v4/products/category";

export const OG_IMAGE = {
  url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&h=630&fit=crop&q=85",
  width: 1200,
  height: 630,
  alt: "Loop Pub — premium bar and cocktails in Tokat, Turkey",
};

const DEFAULT_DESCRIPTION =
  "Loop Pub in Tokat — premium pub & bar with great music, craft beers, signature cocktails, and nights you'll want on repeat. Stay in Loop. Book a table.";

const KEYWORDS = [
  "Loop Pub",
  "looppub",
  "looppub.live",
  "pub Tokat",
  "bar Tokat",
  "kokteyl Tokat",
  "craft beer Tokat",
  "imza kokteyl",
  "restaurant Tokat",
  "gece hayatı Tokat",
  "cocktail bar Turkey",
];

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Loop Pub | Premium Pub & Bar in Tokat",
    template: "%s | Loop Pub",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "restaurant",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Loop Pub | Stay in Loop — Tokat",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Pub | Tokat",
    description:
      "Stay in Loop — premium pub & bar in Tokat. Music, cocktails, craft beer & reservations.",
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "geo.region": "TR-60",
    "geo.placename": "Tokat",
    "geo.position": "40.3167;36.5544",
    ICBM: "40.3167, 36.5544",
  },
};

export function buildProductMetadata(
  productName: string,
  description: string | null,
  productId: number,
  categoryId: number,
  imageUrl?: string | null,
): Metadata {
  const path = `/menu/${productId}?category=${categoryId}`;
  const desc =
    description?.trim() ||
    `${productName} — signature drink at Loop Pub, Tokat. View menu and book your table.`;

  const ogImage = imageUrl?.startsWith("http")
    ? { url: imageUrl, width: 800, height: 800, alt: productName }
    : OG_IMAGE;

  return {
    title: productName,
    description: desc,
    keywords: [productName, "Loop Pub", "kokteyl Tokat", "menü", "cocktail"],
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${productName} | ${SITE_NAME}`,
      description: desc,
      url: path,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | ${SITE_NAME}`,
      description: desc,
      images: [typeof ogImage === "object" && "url" in ogImage ? ogImage.url : OG_IMAGE.url],
    },
  };
}

export const businessGeo = {
  latitude: 40.3167,
  longitude: 36.5544,
};

export { DEFAULT_DESCRIPTION };
