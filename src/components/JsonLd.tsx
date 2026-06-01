import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";
import { businessGeo, OG_IMAGE } from "@/lib/seo";

export default function JsonLd() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Premium pub and bar in Tokat — music, craft beer, signature cocktails.",
      inLanguage: ["tr-TR", "en"],
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "BarOrPub",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: OG_IMAGE.url,
      logo: `${SITE_URL}/icon.svg`,
      telephone: CONTACT.phoneTel,
      email: CONTACT.email,
      priceRange: "₺₺",
      servesCuisine: ["Pub food", "Cocktails", "Craft beer"],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Yeşilırmak mahallesi Çeçenistan bulvarı 2, Sokak 10/D",
        addressLocality: "Tokat Merkez",
        addressRegion: "Tokat",
        postalCode: "60030",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: businessGeo.latitude,
        longitude: businessGeo.longitude,
      },
      openingHoursSpecification: {
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
        closes: "01:00",
      },
      sameAs: [CONTACT.social.instagram, CONTACT.social.facebook],
      hasMap: CONTACT.mapsUrl,
      potentialAction: {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#contact`,
        },
        name: "Book a table",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} | Tokat`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: ["tr-TR", "en"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What are Loop Pub opening hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Loop Pub is open daily from 12:00 to 01:00.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Loop Pub located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Loop Pub is at ${CONTACT.address}, Tokat, Turkey.`,
          },
        },
        {
          "@type": "Question",
          name: "How can I book a table at Loop Pub?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Call ${CONTACT.phone[0]} or use the contact form at looppub.live to reserve a table.`,
          },
        },
      ],
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
