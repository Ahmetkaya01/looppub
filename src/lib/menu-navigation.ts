import type { MenuTabId } from "@/i18n/types";

export const MENU_TAB_EVENT = "loop-pub-set-menu-tab";

export function isMenuTabId(value: string): value is MenuTabId {
  return value === "snacks" || value === "beers" || value === "cocktails";
}

export function parseMenuTabFromHash(hash: string): MenuTabId | null {
  const match = hash.match(/^#menu-(snacks|beers|cocktails)$/);
  return match && isMenuTabId(match[1]) ? match[1] : null;
}

export function navigateToMenuTab(tabId: MenuTabId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MENU_TAB_EVENT, { detail: { tabId } }),
  );
  history.replaceState(null, "", `#menu-${tabId}`);
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}
