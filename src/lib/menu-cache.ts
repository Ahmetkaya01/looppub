import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { MenuCategoryPayload } from "./menu";

const CACHE_DIR = path.join(process.cwd(), "public", "menu-cache");

export async function readCachedCategoryPayload(
  categoryId: number,
): Promise<MenuCategoryPayload | null> {
  const file = path.join(CACHE_DIR, `${categoryId}.json`);
  if (!existsSync(file)) return null;
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as MenuCategoryPayload;
  } catch {
    return null;
  }
}

export function hasCachedCategory(categoryId: number): boolean {
  return existsSync(path.join(CACHE_DIR, `${categoryId}.json`));
}
