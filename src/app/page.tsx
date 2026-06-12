import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import PartiesSection from "@/components/PartiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CursorGlow from "@/components/ui/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <EventsSection />
        <PartiesSection />
        <GallerySection />
        <ContactSection />
        <InstagramFeed />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
