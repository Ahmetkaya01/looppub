/**
 * Limon POS menüsünü çeker ve src/data/menu.json dosyasına yazar.
 * Kategori ID'leri canlı /categories sayfasından otomatik keşfedilir.
 * Çalıştır: node scripts/sync-menu.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = "https://123.limonpos.com.tr";
const HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: `${BASE}/categories`,
};

async function discoverCategoryIds() {
  const res = await fetch(`${BASE}/categories`, {
    headers: { "User-Agent": HEADERS["User-Agent"] },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`categories page HTTP ${res.status}`);
  const html = await res.text();
  const ids = [...html.matchAll(/loadProducts\((\d+),\s*'categories'\)/g)].map(
    (m) => Number(m[1]),
  );
  // Sayfadaki görünüm sırası korunur
  return [...new Set(ids)];
}

async function fetchCategory(id) {
  const res = await fetch(`${BASE}/nexopos/v4/products/category/${id}`, {
    headers: HEADERS,
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for category ${id}`);
  return res.json();
}

async function main() {
  const ids = await discoverCategoryIds();
  console.log(`Bulunan kategoriler: ${ids.join(", ")}`);

  const categories = [];
  for (const id of ids) {
    try {
      const data = await fetchCategory(id);
      categories.push(data);
      console.log(`✓ ${id} ${data.category?.name ?? ""}`);
    } catch (e) {
      console.error(`✗ ${id}`, e.message);
    }
  }

  if (!categories.length) {
    console.error("Hiç kategori çekilemedi — mevcut menu.json korunuyor.");
    process.exit(1);
  }

  const outDir = join(process.cwd(), "src", "data");
  await mkdir(outDir, { recursive: true });
  const outFile = join(outDir, "menu.json");
  await writeFile(
    outFile,
    JSON.stringify({ syncedAt: new Date().toISOString(), categories }, null, 2),
    "utf8",
  );
  console.log(`Tamamlandı: ${categories.length} kategori → ${outFile}`);
}

main();
