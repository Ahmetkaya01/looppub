import {
  CONTACT,
  SEO_HERO_IMAGE,
  SEO_LOCATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";

const schema = {
  "@context": "https://schema.org",
  "@type": ["BarOrPub", "NightClub"],
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+905439525682",
  image: SEO_HERO_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.streetAddress,
    addressLocality: CONTACT.addressLocality,
    addressRegion: CONTACT.addressRegion,
    postalCode: CONTACT.postalCode,
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.geo.latitude,
    longitude: CONTACT.geo.longitude,
  },
  areaServed: {
    "@type": "City",
    name: CONTACT.addressLocality,
  },
  hasMap: CONTACT.mapsUrl,
  servesCuisine: ["Pub Food", "Cocktails", "Craft Beer"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "00:00",
    },
  ],
  sameAs: [CONTACT.instagramUrl],
  hasMenu: `${SITE_URL}/menu`,
  priceRange: "₺₺",
  description: `${SEO_LOCATION} bölgesinde kokteyl bar, canlı müzik ve özel organizasyon hizmeti sunan premium pub.`,
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
