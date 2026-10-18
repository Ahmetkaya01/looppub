/**
 * Fetches menu categories from Limon POS and writes public/menu-cache/*.json
 * Also writes config.json and tabs/{tabId}.json for static hosting (GitHub Pages).
 * Run: node scripts/sync-menu.mjs
 */
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const MENU_TAB_CATEGORIES = {
  snacks: [26, 23, 25, 29, 24, 19],
  beers: [13],
  cocktails: [20, 12, 21, 22, 27],
};

const API = "https://123.limonpos.com.tr/nexopos/v4/products/category";
const HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://123.limonpos.com.tr/categories",
};

const allIds = [
  ...new Set(Object.values(MENU_TAB_CATEGORIES).flat()),
].sort((a, b) => a - b);

const outDir = join(process.cwd(), "public", "menu-cache");
const tabsDir = join(outDir, "tabs");

async function fetchCategory(id) {
  const res = await fetch(`${API}/${id}`, {
    headers: HEADERS,
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for category ${id}`);
  return res.json();
}

function productsFromPayload(data) {
  return [
    ...(data.products ?? []),
    ...(data.subcategories?.flatMap((s) => s.products) ?? []),
  ];
}

async function loadLocalCategory(id) {
  const file = join(outDir, `${id}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return null;
  }
}

async function writeConfigAndTabs() {
  const categories = [];
  for (const id of allIds) {
    const data = await loadLocalCategory(id);
    if (data?.category) {
      categories.push({ id: data.category.id, name: data.category.name });
    } else {
      categories.push({ id, name: `Category ${id}` });
    }
  }

  const available = new Set(
    (await readdir(outDir))
      .filter((f) => /^\d+\.json$/.test(f))
      .map((f) => Number(f.replace(".json", ""))),
  );

  const tabs = Object.entries(MENU_TAB_CATEGORIES).map(([id, ids]) => ({
    id,
    categoryIds: ids.filter((cid) => available.has(cid)),
  }));

  const config = {
    tabs,
    categories,
    cocktailCategoryIds: MENU_TAB_CATEGORIES.cocktails.filter((id) =>
      available.has(id),
    ),
    source: "cache",
  };

  await writeFile(join(outDir, "config.json"), JSON.stringify(config), "utf8");

  await mkdir(tabsDir, { recursive: true });
  const cocktailSet = new Set(MENU_TAB_CATEGORIES.cocktails);
  const beerOnly = new Set(MENU_TAB_CATEGORIES.beers);

  for (const [tabId, ids] of Object.entries(MENU_TAB_CATEGORIES)) {
    let categoryIds = [...ids];
    if (tabId === "beers") {
      categoryIds = categoryIds.filter((id) => !cocktailSet.has(id));
    } else if (tabId === "cocktails") {
      categoryIds = categoryIds.filter((id) => !beerOnly.has(id));
    }

    const groups = [];
    for (const categoryId of categoryIds) {
      const data = await loadLocalCategory(categoryId);
      if (!data) continue;
      const products = productsFromPayload(data);
      if (!products.length) continue;
      groups.push({
        categoryId,
        categoryName: data.category?.name ?? `Category ${categoryId}`,
        products,
      });
    }

    await writeFile(
      join(tabsDir, `${tabId}.json`),
      JSON.stringify({ tabId, groups }),
      "utf8",
    );
  }

  console.log("✓ config.json + tabs/*.json");
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let ok = 0;
  let fail = 0;

  for (const id of allIds) {
    try {
      const data = await fetchCategory(id);
      await writeFile(
        join(outDir, `${id}.json`),
        JSON.stringify(data, null, 0),
        "utf8",
      );
      console.log(`✓ ${id} ${data.category?.name ?? ""}`);
      ok++;
    } catch (e) {
      console.error(`✗ ${id}`, e.message);
      fail++;
    }
  }

  await writeConfigAndTabs();
  console.log(`Done: ${ok} saved, ${fail} failed → ${outDir}`);
  process.exit(0);
}

main();
