import type { Metadata } from "next";
import Header from "@/components/Header";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SITE_URL,
} from "@/lib/constants";
import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import TakeawaySection from "@/components/TakeawaySection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CursorGlow from "@/components/ui/CursorGlow";

export const metadata: Metadata = {
  title: SEO_DEFAULT_TITLE,
  description: SEO_DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <TakeawaySection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
        <InstagramFeed />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
