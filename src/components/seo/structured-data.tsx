// Site-wide JSON-LD structured data (Organization + WebSite + Hotel).
// Rendered once in the root layout so it appears on every page.
import {
  CONTACT,
  HOTEL_ADDRESS,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from "@/lib/site";

export function StructuredData() {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const hotelId = `${SITE_URL}/#hotel`;
  const logoUrl = `${SITE_URL}/assets/logo_1.png`;
  const ogImageUrl = `${SITE_URL}${OG_IMAGE.url}`;

  const sameAs = [SOCIALS.instagram, SOCIALS.facebook].filter(Boolean);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
        image: ogImageUrl,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
      },
      {
        "@type": "Hotel",
        "@id": hotelId,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: ogImageUrl,
        logo: logoUrl,
        email: CONTACT.email,
        telephone: CONTACT.phoneE164,
        priceRange: "$$",
        currenciesAccepted: "USD",
        checkinTime: "15:00",
        checkoutTime: "11:00",
        petsAllowed: false,
        address: {
          "@type": "PostalAddress",
          streetAddress: HOTEL_ADDRESS.street,
          addressLocality: HOTEL_ADDRESS.locality,
          addressRegion: HOTEL_ADDRESS.region,
          postalCode: HOTEL_ADDRESS.postalCode,
          addressCountry: HOTEL_ADDRESS.country,
        },
        amenityFeature: [
          "Free High-Speed Wi-Fi",
          "Contactless Check-in",
          "Flat-Screen Smart TVs",
          "Modern Boutique Design",
          "On-site Parking",
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        sameAs,
        parentOrganization: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
