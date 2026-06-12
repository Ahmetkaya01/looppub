"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";
import {
  flattenMenuForSearch,
  searchMenu,
  type SearchableProduct,
} from "@/lib/menu-search";
import { titleCaseTr, type MenuCategory } from "@/lib/menu";
import MenuProductCard from "./MenuProductCard";
import MenuSearchBar from "./MenuSearchBar";

export default function MenuClient({
  categories,
  variant = "full",
}: {
  categories: MenuCategory[];
  variant?: "full" | "gel-al";
}) {
  const { t } = useLocale();
  const isGelAl = variant === "gel-al";
  const [activeId, setActiveId] = useState(categories[0].category.id);
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(
    () => flattenMenuForSearch(categories),
    [categories],
  );

  const searchResults = useMemo(
    () => searchMenu(searchIndex, query),
    [searchIndex, query],
  );

  const isSearching = query.trim().length > 0;

  const active =
    categories.find((c) => c.category.id === activeId) ?? categories[0];

  useEffect(() => {
    const match = window.location.hash.match(/^#category-(\d+)$/);
    if (!match) return;
    const id = Number(match[1]);
    if (categories.some((c) => c.category.id === id)) {
      setActiveId(id);
      setQuery("");
    }
  }, [categories]);

  const selectCategory = (id: number) => {
    setQuery("");
    setActiveId(id);
    window.history.replaceState(null, "", `#category-${id}`);
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <>
      {isGelAl && (
        <div className="border-b border-amber/20 bg-amber/10 px-4 py-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber">
            {t.menuPage.gelAlEyebrow}
          </p>
          <p className="mt-2 font-display text-lg font-bold uppercase text-ink md:text-xl">
            {t.menuPage.gelAlTitle}
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {t.menuPage.gelAlNote}
          </p>
          <Link
            href="/menu"
            className="mt-4 inline-flex text-xs font-semibold uppercase tracking-cta text-amber underline-offset-4 hover:underline"
          >
            {t.menuPage.gelAlFullMenu}
          </Link>
        </div>
      )}

      <MenuSearchBar
        value={query}
        onChange={setQuery}
        resultCount={isSearching ? searchResults.length : undefined}
        label={t.menuPage.searchLabel}
        placeholder={
          isGelAl ? t.menuPage.searchPlaceholderGelAl : t.menuPage.searchPlaceholder
        }
        clearLabel={t.menuPage.clearSearch}
        noResultsLabel={t.menuPage.noResults}
        resultsFoundLabel={t.menuPage.resultsFound}
      />

      {!isSearching && (
        <nav
          className="border-b border-white/10 bg-night px-4 py-4"
          aria-label={t.menuPage.categoriesAria}
        >
          <div
            className="mx-auto grid max-w-4xl grid-cols-2 gap-2 min-[420px]:grid-cols-3 md:flex md:flex-wrap md:justify-center"
            role="tablist"
          >
            {categories.map(({ category }) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  title={titleCaseTr(category.name)}
                  onClick={() => selectCategory(category.id)}
                  className={`min-h-11 truncate rounded-lg border px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition-[color,border-color,background-color,transform] duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-night md:px-4 md:text-sm ${
                    isActive
                      ? "border-amber bg-amber text-night shadow-amber-glow"
                      : "border-white/15 bg-card text-muted hover:border-amber/60 hover:text-amber"
                  }`}
                >
                  {titleCaseTr(category.name)}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      <div ref={contentRef} className="scroll-mt-2">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <SearchResults
              key="search"
              results={searchResults}
              query={query}
              reduced={!!reduced}
              t={t}
            />
          ) : (
            <CategoryPanel
              key={activeId}
              active={active}
              reduced={!!reduced}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function SearchResults({
  results,
  query,
  reduced,
  t,
}: {
  results: SearchableProduct[];
  query: string;
  reduced: boolean;
  t: ReturnType<typeof useLocale>["t"];
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-4xl px-4 py-6 md:py-8"
    >
      <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-bold uppercase md:text-2xl">
        <span className="h-px w-8 bg-amber" aria-hidden />
        {t.menuPage.searchTitle}: &ldquo;{query.trim()}&rdquo;
      </h2>

      {results.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-card p-8 text-center text-muted">
          {t.menuPage.searchEmpty}
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {results.map((product) => (
            <MenuProductCard
              key={`${product.categoryId}-${product.id}`}
              product={product}
              categoryLabel={product.categoryName}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CategoryPanel({
  active,
  reduced,
}: {
  active: MenuCategory;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-4xl px-4 py-6 md:py-8"
    >
      <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-bold uppercase md:text-2xl">
        <span className="h-px w-8 bg-amber" aria-hidden />
        {titleCaseTr(active.category.name)}
      </h2>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {active.products.map((product) => (
          <MenuProductCard key={product.id} product={product} />
        ))}
      </div>

      {(active.subcategories ?? []).map((sub) => (
        <div key={sub.name} className="mt-8">
          <h3 className="mb-4 font-display text-lg font-bold uppercase text-ink/90">
            {titleCaseTr(sub.name)}
          </h3>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {sub.products.map((product) => (
              <MenuProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
