export type EventVideo = {
  src: string;
  /** Lightbox yedek posteri — kart önizlemesi videodan gelir */
  poster?: string;
  title: string;
  caption: string;
  tags?: string[];
};

/** Üst kat organizasyonları ve parti highlight videoları */
export const EVENT_HIGHLIGHT_VIDEOS: EventVideo[] = [
  {
    src: "/videos/parties/alt-kat-canli-muzik.mp4",
    poster: "/gallery/loop-07.png",
    title: "Seviye Atladık",
    caption:
      "Looppub'da seviye atladık! Alt katta bildiğiniz o samimi canlı müzik keyfi tüm hızıyla devam ediyor.",
  },
  {
    src: "/videos/parties/parti-geceleri.mp4",
    poster: "/gallery/loop-09.png",
    title: "Parti Geceleri",
    caption:
      "Loopta parti nasıl olur dersen; bırak konuşmayı, biz kayıtlara baktık.",
    tags: ["#nightlife", "#partynight"],
  },
];

export const PROGRAM_2025_VIDEO: EventVideo = {
  src: "/videos/programs/yilbasi-2025.mp4",
  poster: "/gallery/loop-12.png",
  title: "Yılbaşı Gecesi 2025",
  caption:
    "Loop Pub yılbaşı programı — canlı müzik, kıvılcımlar ve unutulmaz bir gece.",
  tags: ["#yılbaşı", "#2025"],
};

export const UPCOMING_PROGRAM_YEAR = {
  year: 2026,
  label: "Coming Soon",
  hint: "Yeni yıl programı hazırlanıyor — takipte kalın.",
} as const;

export const EVENT_SHOWCASE_IMAGES = [
  {
    src: "/gallery/loop-03.png",
    alt: "Loop Pub Tokat üst kat — canlı müzik ve organizasyon",
  },
  {
    src: "/gallery/loop-06.png",
    alt: "Loop Pub Tokat'ta özel parti gecesi",
  },
  {
    src: "/gallery/loop-11.png",
    alt: "Loop Pub Tokat üst kat premium pub atmosferi",
  },
] as const;
