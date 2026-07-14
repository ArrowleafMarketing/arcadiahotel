import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/social-icons";
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs-jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "The story of Arcadia Hotel — a 1958 mid-century motel in Garden City, Idaho, reborn as a modern boutique hotel minutes from downtown Boise and the Boise River.",
  path: "/about",
  image: "/assets/arcadia_23.jpg",
  imageAlt: "Arcadia Hotel exterior in Garden City, Idaho",
});

export default function AboutPage() {
  const valueCards = [
    {
      title: "Historic Origin",
      description:
        "Built in 1958 as a mid-century motel, revitalized into a boutique hotel with modern amenities while preserving its historical charm.",
      icon: "building" as const,
    },
    {
      title: "Prime Location",
      description:
        "Minutes from downtown Boise and Boise State University, with easy access to Garden City's wineries, breweries, and nature trails.",
      icon: "pin" as const,
    },
    {
      title: "Modern Design",
      description:
        "A boutique hotel experience that combines unique design elements, inspired by mid-century aesthetics, with high-quality accommodations at an affordable price.",
      icon: "layers" as const,
    },
    {
      title: "Creative",
      description:
        "Tailored for young, adventurous travelers looking to immerse themselves in Garden City's vibrant, creative atmosphere.",
      icon: "spark" as const,
    },
  ];

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <section className="relative isolate min-h-[402px] overflow-hidden rounded-[22px]">
        <Image
          src="/assets/arcadia_23.jpg"
          alt="Arcadia Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/34" />

        <div className="relative z-10 flex min-h-[402px] flex-col items-center justify-center px-6 py-14 text-center text-white">
          <h1 className="text-[clamp(2.4rem,3.6vw,3.6rem)] font-light tracking-[-0.055em] text-white">
            About Us
          </h1>
          <div className="mt-5 flex items-center gap-4 text-[1.18rem] tracking-[-0.025em] text-white/82">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span aria-hidden="true">→</span>
            <span>About</span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1fr_0.96fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative aspect-[1.03/0.95] w-full max-w-[560px] overflow-hidden rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <Image
                src="/assets/arcadia_24.jpg"
                alt="Arcadia Hotel"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-[620px]">
            <span className="eyebrow">About The Arcadia</span>

            <h2 className="mt-6 text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-[1.02] tracking-[-0.06em] text-[#111111]">
              History Meets Modern
            </h2>

            <p className="mt-8 text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.75] tracking-[-0.025em] text-[#7a7b77]">
              Welcome to Arcadia Hotel, where history meets modern charm. Built
              in 1958 as a mid-century motel, our property was once a forgotten
              gem. Today, we've transformed it into a boutique hotel that
              reflects the vibrant energy of Garden City, Idaho. With a unique
              design and an eye for quality, we offer an experience that blends
              affordability with sophistication.
            </p>

            <a
              href="https://booking.stayarcadia.com/"
              className="btn btn-text mt-10 text-[clamp(1.15rem,1.4vw,1.35rem)] tracking-[-0.03em]"
            >
              <span>Book Your Stay</span>
              <span className="btn-arrow">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 pb-10 sm:px-10 lg:px-16 lg:pb-12">
        <div className="mx-auto grid max-w-[1220px] gap-8 md:grid-cols-2 xl:grid-cols-4">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[18px] border border-[#d9d5cf] px-6 py-8 sm:px-10 sm:py-10"
            >
              <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#090b08] text-[#d5ecd0]">
                {card.icon === "building" ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[21px] w-[21px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 21V5.5h14V21" />
                    <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
                    <path d="M10 21v-4h4v4" />
                  </svg>
                ) : card.icon === "pin" ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[21px] w-[21px]"
                    fill="currentColor"
                  >
                    <path d="M12 2.8a5.7 5.7 0 0 0-5.7 5.7c0 4.2 5.7 12.7 5.7 12.7s5.7-8.5 5.7-12.7A5.7 5.7 0 0 0 12 2.8Zm0 8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z" />
                  </svg>
                ) : card.icon === "layers" ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[21px] w-[21px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 4 8 4-8 4-8-4 8-4Z" />
                    <path d="m4 12 8 4 8-4" />
                    <path d="m4 16 8 4 8-4" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-[21px] w-[21px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3.5 13.7 7l3.8.5-2.8 2.7.7 3.8L12 12.2 8.6 14l.7-3.8L6.5 7.5 10.3 7 12 3.5Z" />
                  </svg>
                )}
              </span>

              <h2 className="mt-6 text-[clamp(1.5rem,1.9vw,1.9rem)] font-light tracking-[-0.05em] text-[#111111]">
                {card.title}
              </h2>

              <p className="mt-5 text-[clamp(0.92rem,1.1vw,1rem)] leading-[1.7] tracking-[-0.02em] text-[#7b7c78]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
