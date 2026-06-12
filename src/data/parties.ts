export type PartyVideo = {
  src: string;
  poster: string;
  title: string;
  caption: string;
  tags?: string[];
};

export const PARTY_VIDEOS: PartyVideo[] = [
  {
    src: "/videos/parties/alt-kat-canli-muzik.mp4",
    poster:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    title: "Seviye Atladık",
    caption:
      "Looppub'da seviye atladık! Alt katta bildiğiniz o samimi canlı müzik keyfi tüm hızıyla devam ediyor.",
  },
  {
    src: "/videos/parties/parti-geceleri.mp4",
    poster:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
    title: "Parti Geceleri",
    caption:
      "Loopta parti nasıl olur dersen; bırak konuşmayı, biz kayıtlara baktık.",
    tags: ["#nightlife", "#partynight"],
  },
];
