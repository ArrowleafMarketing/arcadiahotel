import { supabase } from "@/lib/supabase/client";
import { posts as mockPosts } from "@/lib/blog/posts.mock";
import type { BlogPost, SiteKey } from "@/lib/blog/posts.mock";
import type { PostRecord } from "@/lib/blog/schema";
import { recordToBlogPost } from "@/lib/blog/mapPost";

function mockFallback(siteKey: SiteKey) {
  return mockPosts.filter((p) => p.siteKey === siteKey);
}

export async function getPosts(siteKey: SiteKey): Promise<BlogPost[]> {
  // Try Supabase first
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site_key", siteKey)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase getPosts error:", error.message);
    return mockFallback(siteKey);
  }

  if (!data || data.length === 0) {
    return mockFallback(siteKey);
  }

  return (data as PostRecord[]).map(recordToBlogPost);
}

export async function getPostBySlug(
  siteKey: SiteKey,
  slug: string
): Promise<BlogPost | null> {
  // Try Supabase first
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site_key", siteKey)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase getPostBySlug error:", error.message);
    const fallback = mockFallback(siteKey).find((p) => p.slug === slug) ?? null;
    return fallback;
  }

  if (!data) {
    const fallback = mockFallback(siteKey).find((p) => p.slug === slug) ?? null;
    return fallback;
  }

  return recordToBlogPost(data as PostRecord);
}
