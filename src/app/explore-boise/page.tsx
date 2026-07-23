import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/blog/posts";
import { blogPostPath, SITE_KEY } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { ArrowRightIcon } from "@/components/social-icons";

export const metadata: Metadata = pageMeta({
  title: "Explore Boise",
  description:
    "Explore Boise & Garden City — stories, tips, and local favorites from the Arcadia Hotel team. Discover the best things to do, eat, and see near Boise, Idaho.",
  path: "/explore-boise",
  image: "/assets/arcadia_2.jpg",
  imageAlt: "Explore Boise with the Arcadia Hotel",
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts(SITE_KEY);

  return (
    <>
      <section className="relative isolate min-h-[402px] overflow-hidden rounded-[22px]">
        <Image
          src="/assets/arcadia_2.jpg"
          alt="Arcadia Hotel"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/34" />

        <div className="relative z-10 flex min-h-[402px] flex-col items-center justify-center px-6 py-14 text-center text-white">
          <h1 className="text-[clamp(2.4rem,3.6vw,3.6rem)] font-light tracking-[-0.055em] text-white">
            Explore Boise
          </h1>
          <div className="mt-5 flex items-center gap-4 text-[1.18rem] tracking-[-0.025em] text-white/82">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">→</span>
            <span>Explore Boise</span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[1220px]">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={blogPostPath(post.slug)}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] ring-1 ring-[rgba(17,17,17,0.06)] transition-shadow hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[1.4/1] overflow-hidden">
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
                    <div className="flex items-center gap-3 text-[0.9rem] tracking-[-0.02em] text-[#8a8a84]">
                      {post.categoryLabel ? (
                        <span className="font-display inline-flex items-center rounded-full border border-[#9ec29e] bg-accent-green px-3 py-1 text-[0.82rem] font-normal text-[#1f231f]">
                          {post.categoryLabel}
                        </span>
                      ) : null}
                      <span>{post.publishedAtDisplay}</span>
                    </div>

                    <h2 className="mt-5 line-clamp-2 text-[clamp(1.5rem,1.9vw,1.9rem)] font-light leading-[1.2] tracking-[-0.045em] text-[#111111]">
                      {post.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 text-[1rem] leading-[1.7] tracking-[-0.02em] text-[#7a7b77]">
                      {post.excerpt}
                    </p>

                    <span className="mt-auto flex items-center gap-2 pt-6 text-[0.98rem] font-medium tracking-[-0.02em] text-[#1f231f]">
                      Read More
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-[560px] py-16 text-center">
              <span className="eyebrow">Stay In The Know</span>
              <h2 className="mt-6 text-[clamp(2rem,3vw,2.8rem)] font-light tracking-[-0.05em] text-[#111111]">
                New stories are on the way.
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.7] tracking-[-0.02em] text-[#7a7b77]">
                We&apos;re putting together our Garden City guide. Check back
                soon for local favorites, tips, and news from Arcadia Hotel.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
