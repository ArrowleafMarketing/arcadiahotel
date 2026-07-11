import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BLOG_PAGELABEL,
  BLOG_PAGENAME,
  BOOKING_URL,
  SITE_KEY,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from "@/lib/site";
import { getPostBySlug, getPosts } from "@/lib/blog/posts";
import { extractTocFromMarkdown } from "@/lib/blog/toc";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs-jsonld";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/social-icons";

export const revalidate = 60;

export async function generateStaticParams() {
  const allPosts = await getPosts(SITE_KEY);
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(SITE_KEY, slug);
  if (!post) return {};

  const title = post.title;
  const description = post.excerpt ?? "";
  const url = `${SITE_URL}/${BLOG_PAGENAME}/${slug}`;
  const imageUrl = post.heroImage?.src;
  const imageAlt = post.heroImage?.alt ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags ?? undefined,
      images: imageUrl
        ? [{ url: imageUrl, alt: imageAlt, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(SITE_KEY, slug);
  if (!post) notFound();

  const tocItems = extractTocFromMarkdown(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage.src,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo_1.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${BLOG_PAGENAME}/${post.slug}`,
    },
  };

  const socialLinkClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-[#d6d1ca] bg-white text-[#1f231f] transition-colors hover:border-black hover:bg-black hover:text-white";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: BLOG_PAGELABEL, path: `/${BLOG_PAGENAME}` },
          { name: post.title, path: `/${BLOG_PAGENAME}/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-[0.98rem] tracking-[-0.02em] text-[#8a8a84]">
              {post.breadcrumbs.map((b, idx) => (
                <React.Fragment key={`${b.label}-${idx}`}>
                  {idx > 0 && <span aria-hidden="true">→</span>}
                  {b.href ? (
                    <Link href={b.href} className="transition-colors hover:text-[#111111]">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-[#111111]">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="mt-8 text-[0.82rem] font-medium uppercase tracking-[0.18em] text-[#8a8a84]">
              {post.publishedAtDisplay}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </p>

            <h1 className="mt-4 text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-[1.1] tracking-[-0.05em] text-[#111111]">
              {post.title}
            </h1>

            <div className="mt-8 flex items-center gap-4">
              {post.author.avatarSrc ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e2ded7]">
                  <Image
                    src={post.author.avatarSrc}
                    alt={post.author.avatarAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              {post.author.name ? (
                <div>
                  <p className="text-[0.98rem] font-medium tracking-[-0.02em] text-[#111111]">
                    {post.author.name}
                  </p>
                  {post.author.title ? (
                    <p className="text-[0.92rem] tracking-[-0.02em] text-[#8a8a84]">
                      {post.author.title}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative aspect-[1.3/1] w-full overflow-hidden rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--background)] px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto grid max-w-[1220px] gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-8">
              <div className="flex gap-3">
                {SOCIALS.instagram ? (
                  <Link href={SOCIALS.instagram} aria-label="Instagram" className={socialLinkClass}>
                    <InstagramIcon className="h-[18px] w-[18px]" />
                  </Link>
                ) : null}
                {SOCIALS.facebook ? (
                  <Link href={SOCIALS.facebook} aria-label="Facebook" className={socialLinkClass}>
                    <FacebookIcon className="h-[18px] w-[18px]" />
                  </Link>
                ) : null}
                {SOCIALS.email ? (
                  <Link href={`mailto:${SOCIALS.email}`} aria-label="Email" className={socialLinkClass}>
                    <MailIcon className="h-[18px] w-[18px]" />
                  </Link>
                ) : null}
              </div>

              <TableOfContents items={tocItems} />

              <div className="hidden rounded-[18px] bg-accent-green px-7 py-8 lg:block">
                <h3 className="text-[clamp(1.4rem,1.7vw,1.7rem)] font-light leading-[1.15] tracking-[-0.045em] text-[#111111]">
                  Book your Arcadia stay.
                </h3>
                <p className="mt-3 text-[0.98rem] leading-[1.6] tracking-[-0.02em] text-[#3d423c]">
                  Boise&apos;s first contactless hotel — a boutique stay in the
                  heart of Garden City.
                </p>
                <a
                  href={BOOKING_URL}
                  className="btn btn-light mt-6 w-full"
                >
                  Book Now
                  <span className="btn-arrow">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </section>
    </>
  );
}
