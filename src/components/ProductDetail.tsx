"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MENU_IMAGE_PLACEHOLDER } from "@/lib/constants";
import {
  findProductInPayload,
  formatProductPrices,
  type MenuCategoryPayload,
  type MenuProduct,
} from "@/lib/menu";

function isValidImage(url: string | null | undefined): boolean {
  return Boolean(url && url.startsWith("http") && !url.includes("empty.png"));
}

function getShortDescription(
  product: MenuProduct,
  locale: string,
): string {
  if (product.description?.trim()) return product.description.trim();
  if (locale === "en") {
    return `${product.name} — a signature mix crafted at Loop Pub with balanced flavours and a vibrant presentation.`;
  }
  return `${product.name} — Loop Pub'da özenle hazırlanan, dengeli aromalı imza bir karışım.`;
}

export default function ProductDetail({
  productId,
  categoryId,
  initialProduct = null,
}: {
  productId: number;
  categoryId: number;
  initialProduct?: MenuProduct | null;
}) {
  const { t, locale } = useLanguage();
  const [product, setProduct] = useState<MenuProduct | null>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      const hasInitial =
        initialProduct !== null && initialProduct.id === productId;
      if (!hasInitial) setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/menu/${categoryId}`);
        if (!res.ok) throw new Error("failed");
        const data: MenuCategoryPayload = await res.json();
        const found = findProductInPayload(data, productId);
        if (!found) throw new Error("not found");
        setProduct(found);
      } catch {
        if (!hasInitial) {
          setError(true);
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId, categoryId, initialProduct]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-6 py-24 text-center">
        <p className="text-muted">{t.product.notFound}</p>
        <Link href="/#menu" className="btn-primary mt-8 inline-flex">
          {t.product.backToMenu}
        </Link>
      </div>
    );
  }

  const imageSrc = isValidImage(product.image)
    ? product.image!
    : MENU_IMAGE_PLACEHOLDER;

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <Link
        href="/#menu"
        className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
      >
        ← {t.product.backToMenu}
      </Link>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-[var(--border)] shadow-glass">
          <Image src={imageSrc} alt={product.name} fill className="object-cover" priority />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-4xl text-ink md:text-5xl">
            {product.name}
          </h1>
          <div className="gold-divider !mx-0 !mt-5" />
          <p className="mt-6 leading-relaxed text-muted">
            {getShortDescription(product, locale)}
          </p>
          <p className="mt-8 font-display text-2xl text-gold">
            {formatProductPrices(product.units)}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#contact" className="btn-primary">
              {t.nav.reserve}
            </Link>
            <Link href="/#menu" className="btn-secondary">
              {t.product.backToMenu}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
