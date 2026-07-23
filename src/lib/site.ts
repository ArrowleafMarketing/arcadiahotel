// lib/site.ts
export const SITE_KEY = "stay-arcadia";
export const SITE_NAME = "Arcadia Hotel";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stayarcadia.com";
export const SITE_LOCALE = "en_US";

// Default tagline + description reused for metadata, OG, and structured data.
export const SITE_TAGLINE = "Boise's First Contactless Hotel";
export const SITE_DESCRIPTION =
  "Arcadia Hotel is a boutique, contactless hotel in Garden City, Idaho — minutes from downtown Boise, the Boise River, and the area's best wineries, breweries, and trails. Book a modern, thoughtfully designed stay.";

// Default social share image (1200x630). Absolute URL resolved via metadataBase.
export const OG_IMAGE = {
  url: "/assets/arcadia_36.jpg",
  width: 1200,
  height: 630,
  alt: "Arcadia Hotel — a boutique contactless hotel in Garden City, Idaho",
} as const;

export const BLOG_PAGENAME = "explore-boise";
export const BLOG_PAGELABEL = "Explore Boise";
export const blogPostPath = (slug: string) => `/${BLOG_PAGENAME}/${slug}`;

// Physical location — used for the LocalBusiness / Hotel structured data.
// Matches the Google Business Profile NAP exactly for local-SEO consistency.
export const HOTEL_ADDRESS = {
  street: "3433 W Chinden Blvd",
  locality: "Boise",
  region: "ID",
  postalCode: "83714",
  country: "US",
} as const;

export const CONTACT = {
  phoneDisplay: "(208) 510-0504",
  phoneE164: "+12085100504",
  email: "info@stayarcadia.com",
} as const;

// Optional: add GeoCoordinates to the Hotel schema for a precise map hint.
// Grab the exact lat/lng from the Google Business Profile (open the listing on
// Google Maps — coordinates appear in the URL as @43.xxxx,-116.xxxx) and set
// them here, then wire HOTEL_GEO back into the Hotel schema in
// src/components/seo/structured-data.tsx. Omitted for now to avoid shipping an
// approximate pin; Google uses the verified GBP location regardless.

// Brand colors
export const BRAND = {
  background: "#f1f0eb",
  ink: "#111111",
  accentGreen: "#bfd9bd",
  accentGreenBorder: "#9ec29e",
  accentGreenInk: "#1f231f",
} as const;

// Social links (leave empty string to hide)
export const SOCIALS = {
  instagram: "https://www.instagram.com/stayarcadia/",
  facebook: "https://www.facebook.com/StayArcadia/",
  email: "info@stayarcadia.com",
  phone: "2085100504",
} as const;

// Booking link used across the site
export const BOOKING_URL = "https://booking.stayarcadia.com/";

// Google "write a review" deep link from the Business Profile. Used by the
// QR-code review gate at /review to send happy guests straight to Google.
export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJFWR8Pbr4rlQRT3SlNiJbuuc";
