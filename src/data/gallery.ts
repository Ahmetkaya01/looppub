export type GalleryMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

/** Galeri içeriği — kokteyl, bira ve bar sahneleri ağırlıklı */
export const GALLERY_MEDIA: GalleryMedia[] = [
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/4295/4295-720.mp4",
    poster: u("photo-1514362545857-3bc16c4c7d1b"),
    alt: "Barda kokteyl hazırlayan bartender — video",
  },
  {
    type: "image",
    src: u("photo-1551024709-8f23befc6f87"),
    alt: "Neon ışıklı imza kokteyl",
  },
  {
    type: "image",
    src: u("photo-1572116469696-31de0f17cc34"),
    alt: "Musluktan taze doldurulmuş bira",
  },
  {
    type: "image",
    src: u("photo-1560512823-829485b8bf24"),
    alt: "Pembe tonlu özel kokteyl sunumu",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/790/790-720.mp4",
    poster: u("photo-1574096079513-d8259312b785"),
    alt: "Shot hazırlayan bartender — video",
  },
  {
    type: "image",
    src: u("photo-1551538827-9c037cb4f32a"),
    alt: "Taze naneli mojito",
  },
  {
    type: "image",
    src: u("photo-1470337458703-46ad1756a187"),
    alt: "Bar tezgahında kokteyl hazırlığı",
  },
  {
    type: "image",
    src: u("photo-1543007630-9710e4a00a20"),
    alt: "Gece kulübü ışıkları ve parti atmosferi",
  },
];

export function getHighResSrc(media: GalleryMedia): string {
  if (media.type === "video") return media.src;
  return media.src.replace(/w=\d+/, "w=1600").replace(/q=\d+/, "q=90");
}
