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

## Production (GitHub Pages)

Static export — no Vercel/Netlify required.

1. Push to `main` → GitHub Actions builds and deploys Pages.
2. Repo → **Settings → Pages** → Source: **GitHub Actions**.
3. Custom domain: `www.looppub.live` (CNAME is in `public/CNAME`).

**DNS (Squarespace / registrar):**

| Type | Host | Value |
|------|------|--------|
| CNAME | www | `ahmetkaya01.github.io` |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

Remove old Vercel A records (`76.76.21.21`) if still present.

Menu data is baked into `public/menu-cache/` at build time (`npm run menu:sync`).

Deployed site: [www.looppub.live](https://www.looppub.live) · Pages URL: https://ahmetkaya01.github.io/looppub/

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
