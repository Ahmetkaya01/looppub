export const SITE_NAME = "Loop Pub & Bar";
export const SITE_URL = "https://www.looppub.live";

export const CONTACT = {
  address:
    "Yeşilırmak Mah. Çeçenistan Bulvarı 2. Sokak No: 10/D, Merkez / Tokat",
  phoneDisplay: "0543 952 56 82",
  phoneTel: "tel:+905439525682",
  whatsappUrl:
    "https://wa.me/905439525682?text=Merhaba,%20Loop%20Pub%20i%C3%A7in%20rezervasyon%20yapt%C4%B1rmak%20istiyorum.",
  whatsappOrganizationUrl:
    "https://wa.me/905439525682?text=Merhaba,%20Loop%20Pub%20%C3%BCst%20katta%20organizasyon%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
  instagramUrl: "https://www.instagram.com/looppub/",
  instagramHandle: "@looppub",
  mapsUrl: "https://maps.app.goo.gl/ftsYqPcCC7LBeabR9",
} as const;

/** Açılış-kapanış her gün aynı: öğlen 12:00 — gece yarısı 00:00 */
export const HOURS = [{ label: "Her Gün", value: "12:00 – 00:00" }] as const;

export const HERO_VIDEO_URL = "/videos/landing.mp4";

export const HERO_POSTER_URL =
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1600&q=85";

/** YouTube playlist — .env ile güncellenebilir (NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID) */
export const YOUTUBE_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID ||
  "PLrAXtmErZgOeiKm4yg3nCC1aN82_ZAe2";

export const YOUTUBE_PLAYLIST_EMBED = `https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&rel=0&modestbranding=1`;

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/#events", label: "Etkinlikler" },
  { href: "/#parties", label: "Partiler" },
  { href: "/#gallery", label: "Galeri" },
  { href: "/#contact", label: "İletişim" },
] as const;

export const SEO_KEYWORDS = [
  "Samsun Pub",
  "Loop Pub Bar",
  "Atakum Gece Hayatı",
  "Canlı Müzik",
  "Kokteyl Bar",
  "Loop Menü",
  "Samsun Bar",
  "Craft Bira",
];
