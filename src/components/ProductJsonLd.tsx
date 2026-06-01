import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { MenuProduct } from "@/lib/menu";

export default function ProductJsonLd({
  product,
  categoryId,
}: {
  product: MenuProduct;
  categoryId: number;
}) {
  const url = `${SITE_URL}/menu/${product.id}?category=${categoryId}`;
  const primaryUnit = product.units[0];
  const price = primaryUnit
    ? parseFloat(primaryUnit.price.replace(",", "."))
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Menu",
            item: `${SITE_URL}/#menu`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: url,
          },
        ],
      },
      {
        "@type": "MenuItem",
        "@id": `${url}#menuitem`,
        name: product.name,
        description: product.description || undefined,
        url,
        image:
          product.image?.startsWith("http") &&
          !product.image.includes("empty.png")
            ? product.image
            : undefined,
        offers:
          price !== undefined && !Number.isNaN(price)
            ? {
                "@type": "Offer",
                price: price.toFixed(2),
                priceCurrency: "TRY",
                availability: "https://schema.org/InStock",
                url,
              }
            : undefined,
        provider: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
