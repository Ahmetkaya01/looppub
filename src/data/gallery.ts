export type GalleryMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

const g = (n: number, alt: string): GalleryMedia => ({
  type: "image",
  src: `/gallery/loop-${String(n).padStart(2, "0")}.png`,
  alt,
});

/** Looptan Kareler — gerçek etkinlik ve gece hayatı fotoğrafları */
export const GALLERY_MEDIA: GalleryMedia[] = [
  g(1, "Loop Pub Tokat — canlı parti ve gece hayatı atmosferi"),
  g(2, "Loop Pub Tokat'ta yılbaşı kutlaması — canlı müzik ve kalabalık"),
  g(3, "Loop Pub Tokat sahnesinde canlı müzik performansı"),
  g(4, "Tokat gece hayatı — Loop Pub dans pistinde enerji dolu anlar"),
  g(5, "Loop Pub Tokat'ta parti gecesi — eğlence dolu atmosfer"),
  g(6, "Loop Pub Tokat — arkadaşlarla premium pub kutlaması"),
  g(7, "Loop Pub Tokat'ta canlı müzik gecesi performansı"),
  g(8, "Loop Pub Tokat yılbaşı partisi — dans ve kutlama"),
  g(9, "Loop Pub Tokat — dans ve parti ışıkları"),
  g(10, "Tokat gece hayatından Loop Pub kareleri"),
  g(11, "Loop Pub Tokat'ta özel parti gecesi"),
  g(12, "Loop Pub Tokat — canlı müzik ve kutlama anları"),
];

export function getHighResSrc(media: GalleryMedia): string {
  return media.src;
}
