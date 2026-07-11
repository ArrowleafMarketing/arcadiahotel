// lib/seo.ts
// Central helper for building per-page metadata so every route ships a unique
// title, description, canonical URL, and Open Graph / Twitter card.
import type { Metadata } from "next";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/site";

type PageMetaInput = {
  /** Page-specific title (without the site-name suffix — the template adds it). */
  title: string;
  /** Meta description. Falls back to the site default. */
  description?: string;
  /** Root-relative path, e.g. "/rooms". Used for the canonical + og:url. */
  path: string;
  /** Optional override share image (root-relative or absolute). */
  image?: string;
  imageAlt?: string;
  /** og:type — "website" for most pages, "article" for posts. */
  type?: "website" | "article";
  /** Set true for utility pages that shouldn't rank (e.g. thank-you pages). */
  noindex?: boolean;
};

export function pageMeta({
  title,
  description = SITE_DESCRIPTION,
  path,
  image,
  imageAlt,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const canonical = path;
  const images = image
    ? [{ url: image, alt: imageAlt ?? title, width: 1200, height: 630 }]
    : [OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
