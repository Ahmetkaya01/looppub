# Loop Pub

Single-page pub & bar website for **Loop Pub** (Tokat). Built with Next.js 15, React 19, and Tailwind CSS.

## Features

- **Turkish / English** (TR | EN in navbar, saved in `localStorage`)
- **Dark / light theme** (sun/moon toggle, saved in `localStorage`)
- Hero video, about, live menu tabs, Instagram gallery, contact footer
- Live menu via `/api/menu/[categoryId]` (POS proxy)
- Cocktail detail pages at `/menu/[productId]`

## Run locally (important)

The app lives in **`loop-pub/`**, not the parent `Test/` folder.

```bash
cd loop-pub
npm install
npm run dev
```

Open **http://localhost:301** (port **301**, not 3000).

On your phone (same Wi‑Fi): `http://<your-computer-ip>:301` (e.g. `192.168.1.21:301`).

## Production (Vercel + GitHub)

1. Push this repo to GitHub (see below).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. **Root Directory:** leave as `.` (repo root is this project).
4. **Framework:** Next.js (auto-detected).
5. Deploy, then add custom domain **www.looppub.live** in Vercel → Project → Settings → Domains.

Deployed site: [www.looppub.live](https://www.looppub.live)

## Push to GitHub

From this folder (`loop-pub`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/loop-pub.git
git push -u origin main
```

Create the empty repo first on GitHub: **New repository** → name `loop-pub` → do **not** add README (this project already has one).

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Home: Hero → About → Menu → Gallery → Footer
│   ├── layout.tsx
│   ├── globals.css
│   └── api/menu/[categoryId]/
├── components/               # Navbar, Hero, About, MenuSection, Gallery, Footer, …
├── i18n/translations/        # tr.ts, en.ts
├── theme/                    # ThemeProvider + init script
└── lib/
    ├── constants.ts          # Contact, gallery, site URL
    └── menu-tabs.ts          # Menu tab → POS category IDs
```

## Customize

- Copy: `src/i18n/translations/tr.ts` and `en.ts`
- Contact: `src/lib/constants.ts` → `CONTACT`
- Menu tabs: `src/lib/menu-tabs.ts`
- Theme colors: `src/app/globals.css` (`html.dark` / `html.light`)
