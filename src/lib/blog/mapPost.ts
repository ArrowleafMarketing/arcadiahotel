import type { PostRecord } from "./schema";
import type { BlogPost, SiteKey } from "./posts.mock";
import { SITE_NAME, BLOG_PAGENAME, BLOG_PAGELABEL } from "@/lib/site";

/**
 * Convert a DB-style record into the UI-friendly BlogPost shape.
 * This lets the client website stay stable while storage changes (mock → Supabase).
 */
export function recordToBlogPost(r: PostRecord): BlogPost {
  const siteKey = r.site_key as SiteKey;

  const publishedAtDisplay = new Date(r.published_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return {
    siteKey,
    slug: r.slug,

    title: r.title,
    excerpt: r.excerpt,
    publishedAt: r.published_at, // ISO string for metadata / JSON-LD
    publishedAtDisplay, // pretty string for UI
    updatedAt: r.updated_at ?? r.published_at,
    readTime: r.read_time,
    categoryLabel: r.category_label,
    tags: r.tags,

    breadcrumbs: [
      { label: BLOG_PAGELABEL, href: `/${BLOG_PAGENAME}` },
      { label: SITE_NAME, href: `/${BLOG_PAGENAME}` },
    ],

    author: {
      name: r.author_name,
      title: r.author_title,
      avatarSrc: r.author_avatar_src,
      avatarAlt: r.author_avatar_alt,
    },

    heroImage: {
      src: r.hero_image_src,
      alt: r.hero_image_alt,
    },

    toc: [], // derived from markdown headings at render time

    content: r.content_md,
  };
}
