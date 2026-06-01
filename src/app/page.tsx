import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import SkipLink from "@/components/SkipLink";
import { SITE_URL } from "@/lib/constants";
import { OG_IMAGE, rootMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...rootMetadata,
  alternates: {
    canonical: SITE_URL,
    languages: { "tr-TR": SITE_URL, "en-US": SITE_URL },
  },
  openGraph: {
    ...rootMetadata.openGraph,
    url: SITE_URL,
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <Providers>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <FeedbackSection />
        <Footer />
      </main>
    </Providers>
  );
}
