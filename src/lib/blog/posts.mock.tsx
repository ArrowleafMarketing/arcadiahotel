import type { PostRecord } from "./schema";
import { recordToBlogPost } from "./mapPost";
import { SITE_KEY } from "@/lib/site";

export type SiteKey = typeof SITE_KEY;

export type BlogPost = {
  siteKey: SiteKey;
  slug: string;

  title: string;
  excerpt: string;
  publishedAt: string;
  publishedAtDisplay: string;
  updatedAt?: string;
  readTime?: string;
  categoryLabel?: string;
  tags?: string[];

  breadcrumbs: { label: string; href?: string }[];

  author: {
    name: string;
    title: string;
    avatarSrc: string;
    avatarAlt: string;
  };

  heroImage: {
    src: string;
    alt: string;
  };

  toc: { label: string; href: string }[];

  content: string;
};

export const postRecords: PostRecord[] = [];

export const posts: BlogPost[] = postRecords.map(recordToBlogPost);
