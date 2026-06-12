# Loop Pub & Bar — Premium Web Sitesi

Production-ready Next.js 15 uygulaması. GitHub + Vercel dağıtımına hazır.

## Özellikler

- **Landing (`/`)** — Video hero, "A new story begins" animasyonu, parallax, cursor glow, partiküller
- **Menü (`/menu`)** — 25 kategori / 199 ürün (Limon POS), anlık arama, viski kadeh alias desteği
- **Üst Kat Organizasyonları** — YouTube playlist embed
- **Looptan Kareler** — Masonry grid + lightbox
- **SEO** — JSON-LD, sitemap, robots, Open Graph

## Geliştirme

```bash
npm install
cp .env.example .env.local   # isteğe bağlı
npm run dev
```

- Ana sayfa: http://localhost:3000
- Menü (QR hedefi): http://localhost:3000/menu

## Menü senkronizasyonu

```bash
npm run menu:sync
```

POS'tan `src/data/menu.json` güncellenir. Ürün açıklamaları `src/data/product-descriptions.ts` overlay'inde kalır (sync üzerine yazmaz).

## Vercel'e deploy

1. Repoyu GitHub'a push edin
2. [vercel.com](https://vercel.com) → Import Project → repo seçin
3. Framework: **Next.js** (otomatik algılanır)
4. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.looppub.live`
   - `NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID` = Loop etkinlik playlist ID'niz
5. Deploy

Build komutu (varsayılan): `npm run build`

## GitHub'a push

```bash
git init   # henüz yoksa
git add .
git commit -m "Loop Pub premium site — production ready"
git remote add origin https://github.com/KULLANICI/loop-pub-premium.git
git push -u origin main
```

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (SEO, sitemap) |
| `NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID` | Üst Kat etkinlik YouTube playlist ID |

## Menü arama

`/menu` sayfasında ürün adı, kategori ve malzeme/açıklama ile anlık filtreleme. Örnek: `viski kadeh`, `mojito`, `chivas`.

Viski kadehleri `VİSKİLER` kategorisinde: **KADEH 4 CL** (₺400), **DOUBLE** (₺600).
