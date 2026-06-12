import Image from "next/image";
import {
  formatUnits,
  hasRealImage,
  normalizeDescription,
  type MenuProduct,
} from "@/lib/menu";

export default function MenuProductCard({
  product,
  categoryLabel,
}: {
  product: MenuProduct;
  categoryLabel?: string;
}) {
  const showImage = hasRealImage(product);

  return (
    <article className="group flex gap-4 overflow-hidden rounded-lg border border-white/10 bg-card p-4 transition-[border-color,transform] duration-300 hover:scale-[1.02] hover:border-amber/50">
      {showImage ? (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="80px"
          />
        </div>
      ) : (
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-surface text-2xl text-amber/40"
          aria-hidden="true"
        >
          ◆
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {categoryLabel && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-eyebrow text-amber/80">
            {categoryLabel}
          </p>
        )}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-sm font-bold uppercase leading-snug md:text-base">
            {product.name}
          </h3>
          <span className="shrink-0 font-display text-sm font-bold text-amber md:text-base">
            {formatUnits(product.units)}
          </span>
        </div>

        {product.description && (
          <p className="mt-1 text-xs leading-relaxed text-muted md:text-sm">
            {normalizeDescription(product.description)}
          </p>
        )}
      </div>
    </article>
  );
}
