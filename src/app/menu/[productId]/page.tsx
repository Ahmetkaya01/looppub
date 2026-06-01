import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail";
import ProductJsonLd from "@/components/ProductJsonLd";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { fetchProductForSeo } from "@/lib/menu-server";
import { buildProductMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const { category } = await searchParams;
  const id = Number(productId);
  const categoryId = Number(category) || 20;

  if (!Number.isFinite(id) || id <= 0) {
    return { title: "Menu", robots: { index: false, follow: true } };
  }

  const product = await fetchProductForSeo(id, categoryId);
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
    categoryId,
    image,
  );
}

export default async function MenuProductPage({
  params,
  searchParams,
}: PageProps) {
  const { productId } = await params;
  const { category } = await searchParams;
  const id = Number(productId);
  const categoryId = Number(category) || 20;
  const product =
    Number.isFinite(id) && id > 0
      ? await fetchProductForSeo(id, categoryId)
      : null;

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
