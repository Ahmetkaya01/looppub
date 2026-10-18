import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import ProductJsonLd from "@/components/ProductJsonLd";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import {
  fetchProductForSeo,
  listCachedProductParams,
} from "@/lib/menu-server";
import { buildProductMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ productId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listCachedProductParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const id = Number(productId);

  if (!Number.isFinite(id) || id <= 0) {
    return { title: "Menu", robots: { index: false, follow: true } };
  }

  const product = await fetchProductForSeo(id, 20);
  if (!product) {
    return {
      title: "Menu item",
      description: "View the Loop Pub menu in Tokat.",
    };
  }

  const image =
    product.image?.startsWith("http") && !product.image.includes("empty.png")
      ? product.image
      : null;

  return buildProductMetadata(
    product.name,
    product.description,
    id,
    20,
    image,
  );
}

export default async function MenuProductPage({ params }: PageProps) {
  const { productId } = await params;
  const id = Number(productId);
  const product =
    Number.isFinite(id) && id > 0
      ? await fetchProductForSeo(id, 20)
      : null;

  // Prefer category from client query via ProductDetail fetch; SEO uses scan.
  const categoryId = 20;

  return (
    <Providers>
      {product ? <ProductJsonLd product={product} categoryId={categoryId} /> : null}
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-page pt-32 transition-colors duration-500 md:pt-36"
      >
        <ProductDetail
          productId={id}
          categoryId={categoryId}
          initialProduct={product}
        />
      </main>
      <Footer />
    </Providers>
  );
}
