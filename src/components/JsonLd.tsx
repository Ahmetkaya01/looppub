import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";

const schema = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+905439525682",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address,
    addressCountry: "TR",
  },
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
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
