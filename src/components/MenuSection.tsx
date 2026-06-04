"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { MenuTabId } from "@/i18n/types";
import {
  MENU_TAB_IDS,
  fetchMenuConfig,
  fetchTabProducts,
  type MenuConfigResponse,
  type MenuProductWithCategory,
} from "@/lib/menu";
import FadeIn from "./FadeIn";
import MenuProductCard from "./MenuProductCard";
import MenuSkeleton from "./MenuSkeleton";

export default function MenuSection() {
  const { t } = useLanguage();
  const [menuConfig, setMenuConfig] = useState<MenuConfigResponse | null>(null);
  const [configError, setConfigError] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTabId>("cocktails");
  const [products, setProducts] = useState<MenuProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const config = await fetchMenuConfig();
        if (!cancelled) {
          setMenuConfig(config);
          setConfigError(false);
        }
      } catch {
        if (!cancelled) setConfigError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadTab = useCallback(
    async (tabId: MenuTabId) => {
      setLoading(true);
      setError(false);
      try {
        const config = menuConfig ?? (await fetchMenuConfig());
        const items = await fetchTabProducts(tabId, config);
        setProducts(items);
      } catch {
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [menuConfig],
  );

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

  return (
    <section
      id="menu"
      className="section-padding border-t border-[var(--border)] bg-section-alt transition-colors duration-500"
      aria-label={t.menu.ariaLabel}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
              {t.menu.eyebrow}
            </p>
            <h2 className="section-title mt-3">{t.menu.title}</h2>
            <div className="gold-divider" />
          </div>
        </FadeIn>

        {configError ? (
          <p className="mt-10 text-center text-muted">{t.menu.error}</p>
        ) : (
          <>
            <div
              className="menu-tab-scroll -mx-6 mt-10 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
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
                  className={`min-h-[44px] shrink-0 snap-start rounded-md px-5 py-3 text-center font-body text-xs uppercase tracking-[0.15em] transition-all duration-300 sm:px-6 ${
                    activeTab === tabId
                      ? "border border-gold bg-gold/15 text-gold shadow-neon-gold"
                      : "glass-card !p-3 text-muted hover:text-gold"
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
                  <MenuSkeleton />
                </>
              )}

              {error && !loading && (
                <div className="py-16 text-center">
                  <p className="text-muted">{t.menu.error}</p>
                  <button
                    type="button"
                    onClick={() => loadTab(activeTab)}
                    className="btn-primary mt-6"
                  >
                    {t.menu.retry}
                  </button>
                </div>
              )}

              {!loading && !error && (
                <FadeIn>
                  {showCocktailLinks && (
                    <p className="mb-6 text-center text-xs text-muted">
                      {t.menu.tapForDetails}
                    </p>
                  )}
                  {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {products.map((product) => (
                        <MenuProductCard
                          key={product.id}
                          product={product}
                          categoryId={product.categoryId}
                          clickable={showCocktailLinks}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="py-16 text-center text-muted">{t.menu.empty}</p>
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
