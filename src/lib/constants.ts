/** Fallback when menu product has no image (must be a stable Unsplash URL) */
export const MENU_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&q=80";

export const SITE_NAME = "Loop Pub";
export const SITE_URL = "https://www.looppub.live";
export const SITE_DOMAIN = "www.looppub.live";

export const CONTACT = {
  address:
    "Yeşilırmak mahallesi Çeçenistan bulvarı 2, Sokak 10/D, 60030 Tokat Merkez/Tokat",
  phone: ["0543 952 56 82"],
  phoneTel: "+905439525682",
  email: "info@looppub.live",
  hours: "12:00 – 01:00",
  mapsUrl: "https://maps.app.goo.gl/ftsYqPcCC7LBeabR9",
  social: {
    instagram: "https://www.instagram.com/looppub/",
    facebook: "https://facebook.com/looppub",
  },
} as const;

/**
 * Instagram reel veya gönderi URL'leri — @looppub
 * Örnek: { url: "https://www.instagram.com/reel/XXXXXXXXX/" }
 */
export const INSTAGRAM_GALLERY: { url: string; label?: string }[] = [
  { url: "https://www.instagram.com/p/DQq-jFgDPUq/" },
  { url: "https://www.instagram.com/p/DRPKNi2DFYf/" },
  { url: "https://www.instagram.com/p/DPjGKs4jO2d/" },
  { url: "https://www.instagram.com/p/DQJfgx8DCFs/" },
  { url: "https://www.instagram.com/p/DRzgAk2DCNJ/" },
  { url: "https://www.instagram.com/p/DU-8zbjjFTE/" },
  { url: "https://www.instagram.com/p/DYZjkk0soAq/" },
];

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    span: "col-span-2 row-span-1",
  },
] as const;
