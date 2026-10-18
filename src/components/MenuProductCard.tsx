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
  variant = "maroon",
}: {
  product: MenuProduct;
  categoryId: number;
  clickable?: boolean;
  variant?: "maroon" | "light";
}) {
  const imageSrc = isValidImage(product.image)
    ? product.image!
    : MENU_IMAGE_PLACEHOLDER;
  const priceText = formatProductPrices(product.units);
  const cardClass =
    variant === "maroon" ? "menu-card-maroon group flex gap-4" : "menu-card group flex gap-4";
  const titleClass =
    variant === "maroon"
      ? "font-display text-lg leading-snug text-maple transition-colors duration-300 group-hover:text-maple-dark"
      : "font-display text-lg leading-snug text-maroon transition-colors duration-300 group-hover:text-maroon-light";
  const priceClass =
    variant === "maroon"
      ? "shrink-0 text-right font-body text-sm font-medium text-maple-dark"
      : "shrink-0 text-right font-body text-sm font-medium text-maroon";
  const descClass =
    variant === "maroon"
      ? "mt-2 line-clamp-2 font-body text-sm leading-relaxed text-maple/70"
      : "mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted";
  const borderClass =
    variant === "maroon" ? "border-maple/20" : "border-maroon/15";

  const content = (
    <>
      <div
        className={`relative h-20 w-20 shrink-0 overflow-hidden border sm:h-24 sm:w-24 ${borderClass}`}
      >
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
          <h3 className={titleClass}>{product.name}</h3>
          {priceText && <span className={priceClass}>{priceText}</span>}
        </div>
        {product.description && <p className={descClass}>{product.description}</p>}
        <div
          className={`mt-4 h-px w-0 transition-all duration-300 group-hover:w-full ${
            variant === "maroon" ? "bg-maple/40" : "bg-maroon/30"
          }`}
        />
      </div>
    </>
  );

  if (clickable) {
    return (
      <Link
        href={`/menu/${product.id}?category=${categoryId}`}
        className={`${cardClass} transition-all duration-300`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
