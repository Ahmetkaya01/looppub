export const SITE_NAME = "Loop Pub & Bar";
export const SITE_URL = "https://www.looppub.live";

export const SEO_LOCATION = "Tokat Merkez";

export const CONTACT = {
  streetAddress:
    "Yeşilırmak Mah. Çeçenistan Bulvarı 2. Sokak No: 10/D",
  addressLocality: "Tokat",
  addressRegion: "Tokat",
  postalCode: "60100",
  address:
    "Yeşilırmak Mah. Çeçenistan Bulvarı 2. Sokak No: 10/D, Merkez / Tokat",
  /** Google Business Profile pin koordinatları */
  geo: { latitude: 40.3242464, longitude: 36.551235 },
  phoneDisplay: "0543 952 56 82",
  phoneTel: "tel:+905439525682",
  whatsappUrl:
    "https://wa.me/905439525682?text=Merhaba,%20Loop%20Pub%20i%C3%A7in%20rezervasyon%20yapt%C4%B1rmak%20istiyorum.",
  whatsappOrganizationUrl:
    "https://wa.me/905439525682?text=Merhaba,%20Loop%20Pub%20%C3%BCst%20katta%20organizasyon%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
  whatsappTakeawayUrl:
    "https://wa.me/905439525682?text=Merhaba,%20Loop%20Pub%20Gel-Al%20kokteyl%20sipari%C5%9Fi%20vermek%20istiyorum.",
  instagramUrl: "https://www.instagram.com/looppub/",
  instagramHandle: "@looppub",
  mapsUrl: "https://maps.app.goo.gl/ftsYqPcCC7LBeabR9",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Ye%C5%9Fil%C4%B1rmak%20Mah.%20%C3%87e%C3%A7enistan%20Bulvar%C4%B1%202.%20Sokak%20No%3A%2010%2FD%2C%20Merkez%20Tokat",
} as const;

/** Açılış-kapanış her gün aynı: öğlen 12:00 — gece yarısı 00:00 */
export const HOURS = [
  { label: "Pazartesi – Pazar", value: "12:00 – 00:00" },
] as const;

export const HERO_VIDEO_URL = "/videos/landing.mp4";

export const HERO_POSTER_URL = "/gallery/loop-01.png";

/** YouTube playlist — .env ile güncellenebilir (NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID) */
export const YOUTUBE_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID ||
  "PLrAXtmErZgOeiKm4yg3nCC1aN82_ZAe2";

export const YOUTUBE_PLAYLIST_EMBED = `https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&rel=0&modestbranding=1`;

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/#events", label: "Üst Kat" },
  { href: "/#programs", label: "Programlar" },
  { href: "/#takeaway", label: "Gel-Al" },
  { href: "/#gallery", label: "Galeri" },
  { href: "/#location", label: "Konum" },
  { href: "/#contact", label: "İletişim" },
] as const;

export const SEO_KEYWORDS = [
  "Tokat bar",
  "Tokat pub",
  "Tokat kokteyl bar",
  "Tokat gece hayatı",
  "Tokat canlı müzik",
  "Tokat Merkez bar",
  "Loop Pub Tokat",
  "Tokat organizasyon mekanı",
  "Tokat gel al kokteyl",
  "Craft bira",
];

export const SEO_DEFAULT_TITLE = `${SITE_NAME} | Tokat Merkez — Kokteyl & Canlı Müzik`;

export const SEO_DEFAULT_DESCRIPTION =
  "Tokat Merkez'de premium pub ve kokteyl bar. İmza kokteyller, craft bira, canlı müzik ve üst kat organizasyonları. Rezervasyon için hemen ulaşın.";

export const SEO_OG_DESCRIPTION =
  "Tokat Merkez'de premium pub deneyimi: imza kokteyller, craft biralar, canlı müzik ve üst kat organizasyonları.";

export const SEO_HERO_IMAGE = `${SITE_URL}/gallery/loop-01.png`;
