"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MenuTabId } from "@/i18n/types";
import {
  MENU_TAB_IDS,
  fetchMenuConfig,
  fetchTabMenu,
  type MenuCategoryGroup,
  type MenuConfigResponse,
} from "@/lib/menu";
import {
  MENU_TAB_EVENT,
  parseMenuTabFromHash,
} from "@/lib/menu-navigation";
import FadeIn from "./FadeIn";
import MenuProductCard from "./MenuProductCard";
import MenuSkeleton from "./MenuSkeleton";

type TabCache = Partial<Record<MenuTabId, MenuCategoryGroup[]>>;

export default function MenuSection() {
  const { t } = useLanguage();
  const [menuConfig, setMenuConfig] = useState<MenuConfigResponse | null>(null);
  const [configError, setConfigError] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTabId>("cocktails");
  const [groups, setGroups] = useState<MenuCategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const tabCacheRef = useRef<TabCache>({});
  const loadSeqRef = useRef(0);

  useEffect(() => {
    const applyHashTab = () => {
      const tab = parseMenuTabFromHash(window.location.hash);
      if (tab) setActiveTab(tab);
    };
    applyHashTab();
    window.addEventListener("hashchange", applyHashTab);
    const onTabEvent = (e: Event) => {
      const tabId = (e as CustomEvent<{ tabId: MenuTabId }>).detail?.tabId;
      if (tabId) setActiveTab(tabId);
    };
    window.addEventListener(MENU_TAB_EVENT, onTabEvent);
    return () => {
      window.removeEventListener("hashchange", applyHashTab);
      window.removeEventListener(MENU_TAB_EVENT, onTabEvent);
    };
  }, []);

  const prefetchAllTabs = useCallback(async () => {
    await Promise.all(
      MENU_TAB_IDS.map(async (tabId) => {
        if (tabCacheRef.current[tabId]) return;
        try {
          const payload = await fetchTabMenu(tabId);
          tabCacheRef.current[tabId] = payload.groups;
        } catch {
          /* tab will load on demand */
        }
      }),
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const config = await fetchMenuConfig();
        if (!cancelled) {
          setMenuConfig(config);
          setConfigError(false);
          void prefetchAllTabs();
        }
      } catch {
        if (!cancelled) setConfigError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [prefetchAllTabs]);

  const loadTab = useCallback(async (tabId: MenuTabId) => {
    const seq = ++loadSeqRef.current;
    setLoading(true);
    setError(false);
    setGroups([]);

    const cached = tabCacheRef.current[tabId];
    if (cached?.length) {
      if (seq === loadSeqRef.current) {
        setGroups(cached);
        setLoading(false);
      }
      return;
    }

    try {
      const payload = await fetchTabMenu(tabId);
      tabCacheRef.current[tabId] = payload.groups;
      if (seq === loadSeqRef.current) {
        setGroups(payload.groups);
      }
    } catch {
      if (seq === loadSeqRef.current) {
        setError(true);
        setGroups([]);
      }
    } finally {
      if (seq === loadSeqRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (configError) return;
    if (!menuConfig) return;
    loadTab(activeTab);
  }, [activeTab, loadTab, menuConfig, configError]);

  const showCocktailLinks = activeTab === "cocktails";
  const visibleTabs = menuConfig
    ? MENU_TAB_IDS.filter((id) =>
        menuConfig.tabs.some((t) => t.id === id && t.categoryIds.length > 0),
      )
    : MENU_TAB_IDS;

  const totalProducts = groups.reduce((n, g) => n + g.products.length, 0);

  return (
    <section
      id="menu"
      className="section-padding-large bg-section-maroon transition-colors duration-500"
      aria-label={t.menu.ariaLabel}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-light">{t.menu.eyebrow}</p>
            <h2 className="section-title-light mt-4">{t.menu.title}</h2>
            <div className="mx-auto mt-7 h-px w-20 bg-maple/30" />
          </div>
        </FadeIn>

        {configError ? (
          <p className="mt-10 text-center text-muted-light">{t.menu.error}</p>
        ) : (
          <>
            <div
              className="menu-tab-scroll -mx-6 mt-12 flex flex-col gap-0 px-6 md:mx-auto md:max-w-md md:px-0"
              role="tablist"
              aria-label={t.menu.tablistAria}
            >
              {visibleTabs.map((tabId) => (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  id={`menu-tab-${tabId}`}
                  aria-controls="menu-panel"
                  aria-selected={activeTab === tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`menu-tab-link-maroon font-display text-xl md:text-2xl ${
                    activeTab === tabId
                      ? "menu-tab-link-maroon-active text-maple"
                      : "text-maple/60"
                  }`}
                >
                  {t.menu.tabs[tabId]}
                </button>
              ))}
            </div>

            <div
              className="mt-12"
              role="tabpanel"
              id="menu-panel"
              aria-live="polite"
              aria-busy={loading}
            >
              {loading && (
                <>
                  <p className="sr-only">{t.menu.loading}</p>
                  <MenuSkeleton variant="maroon" />
                </>
              )}

              {error && !loading && (
                <div className="py-16 text-center">
                  <p className="text-muted-light">{t.menu.error}</p>
                  <button
                    type="button"
                    onClick={() => loadTab(activeTab)}
                    className="btn-1806 mt-6"
                  >
                    <span className="btn-1806-offset" aria-hidden />
                    <span className="btn-1806-inner">{t.menu.retry}</span>
                  </button>
                </div>
              )}

              {!loading && !error && (
                <FadeIn key={activeTab}>
                  {showCocktailLinks && (
                    <p className="mb-6 text-center text-xs text-muted-light">
                      {t.menu.tapForDetails}
                    </p>
                  )}
                  {totalProducts > 0 ? (
                    <div className="space-y-12">
                      {groups.map((group) => (
                        <div key={group.categoryId}>
                          {groups.length > 1 && (
                            <h3 className="mb-5 border-b border-maple/20 pb-3 font-display text-xl text-maple-dark">
                              {group.categoryName}
                            </h3>
                          )}
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {group.products.map((product) => (
                              <MenuProductCard
                                key={`${group.categoryId}-${product.id}`}
                                product={product}
                                categoryId={group.categoryId}
                                clickable={showCocktailLinks}
                                variant="maroon"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-16 text-center text-muted-light">{t.menu.empty}</p>
                  )}
                </FadeIn>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
