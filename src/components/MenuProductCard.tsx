"use client";

import Image from "next/image";
import Link from "next/link";
import { MENU_IMAGE_PLACEHOLDER } from "@/lib/constants";
import type { MenuProduct } from "@/lib/menu";
import { formatProductPrices } from "@/lib/menu";

function isValidImage(url: string | null | undefined): boolean {
  return Boolean(url && url.startsWith("http") && !url.includes("empty.png"));
}

export default function MenuProductCard({
  product,
  categoryId,
  clickable = false,
}: {
  product: MenuProduct;
  categoryId: number;
  clickable?: boolean;
}) {
  const imageSrc = isValidImage(product.image)
    ? product.image!
    : MENU_IMAGE_PLACEHOLDER;
  const priceText = formatProductPrices(product.units);

  const content = (
    <>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-gold/15 sm:h-24 sm:w-24">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="96px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
            {product.name}
          </h3>
          {priceText && (
            <span className="shrink-0 text-right font-body text-sm font-medium text-gold">
              {priceText}
            </span>
          )}
        </div>
        {product.description && (
          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        )}
        <div className="mt-4 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full" />
      </div>
    </>
  );

  if (clickable) {
    return (
      <Link
        href={`/menu/${product.id}?category=${categoryId}`}
        className="menu-card group flex gap-4 transition-all duration-300 hover:border-gold/50"
      >
        {content}
      </Link>
    );
  }

  return <article className="menu-card group flex gap-4">{content}</article>;
}
