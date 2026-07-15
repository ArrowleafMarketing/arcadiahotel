import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/social-icons";
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs-jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Neighborhood Partners",
  description:
    "Make the most of your stay at Arcadia Hotel with exclusive guest discounts at our favorite Garden City neighbors — wine bars, coffee shops, breweries, bakeries, and a spa, all just steps away.",
  path: "/neighborhood-partners",
  image: "/assets/Garden-City-Idaho-Arcadia-Hotel.jpg",
  imageAlt: "Garden City, Idaho at sunset along the Boise River",
});

const BOOKING_URL = "https://booking.stayarcadia.com/";

// Each partner's logo plate is toned to its artwork: white / light-ink logos
// (Telaya, Parcero, Bert's, EN Spa) sit on a near-black plate; full-color and
// dark logos (Grindz, Veer, Flourish, Black Moon, Compass) sit on a white plate.
// `code` shows a highlighted promo code; `redeem` shows a short how-to note.
type Partner = {
  name: string;
  category: string;
  discount: string;
  logo: string;
  tone: "dark" | "light";
  url: string;
  code?: string;
  redeem?: string;
};

type PartnerGroup = {
  label: string;
  blurb: string;
  partners: Partner[];
};

// Grouped by the kind of outing — Sip / Savor / Unwind — so the list reads
// like a curated guide instead of a flat directory.
const groups: PartnerGroup[] = [
  {
    label: "Sip",
    blurb: "Wine & Beer",
    partners: [
      {
        name: "Telaya Wine Bar",
        category: "Wine Bar",
        discount: "$10 off",
        logo: "/neighborhood-partners/telaya-logo-white.svg",
        tone: "dark",
        url: "https://telayawine.com/",
      },
      {
        name: "Parcero Wine Bar",
        category: "Wine Bar",
        discount: "20% off",
        logo: "/neighborhood-partners/parcero-white.png",
        tone: "dark",
        url: "https://parcerowinebar.com/",
      },
      {
        name: "Veer Wine Project",
        category: "Winery",
        discount: "10% off",
        logo: "/neighborhood-partners/veer-wine-project.png",
        tone: "light",
        url: "https://www.veerwineproject.com/",
      },
      {
        name: "Bert's Brewing",
        category: "Brewery",
        discount: "10% off",
        logo: "/neighborhood-partners/berts-brewing.webp",
        tone: "dark",
        url: "https://www.bertsbrewing.com/",
      },
    ],
  },
  {
    label: "Savor",
    blurb: "Coffee & Bites",
    partners: [
      {
        name: "Grindz Coffee Shop",
        category: "Coffee Shop",
        discount: "10% off",
        logo: "/neighborhood-partners/grindz.png",
        tone: "light",
        url: "https://grindzcoffeeshop.com/",
      },
      {
        name: "Flourish Coffee & Pastries",
        category: "Bakery & Coffee",
        discount: "10% off",
        logo: "/neighborhood-partners/flourish.webp",
        tone: "light",
        url: "https://www.flourishbakeryboise.com/",
      },
      {
        name: "Black Moon Pizza & Pastries",
        category: "Pizza & Bakery",
        discount: "10% off",
        logo: "/neighborhood-partners/black-moon.webp",
        tone: "light",
        url: "https://www.heyblackmoon.com/",
      },
    ],
  },
  {
    label: "Unwind",
    blurb: "Spa & Skincare",
    partners: [
      {
        name: "EN Spa",
        category: "Spa & Wellness",
        discount: "10% off",
        logo: "/neighborhood-partners/en-spa.png",
        tone: "dark",
        url: "https://en-spa.com/",
        code: "ARCADIA10",
      },
      {
        name: "Compass Skincare Studio",
        category: "Facials & Skincare",
        discount: "$20 off",
        logo: "/neighborhood-partners/compass-skin-care.jpg",
        tone: "light",
        url: "https://compass.glossgenius.com/",
        redeem: "Mention Arcadia when booking",
      },
    ],
  },
];

export default function NeighborhoodPartnersPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Neighborhood Partners", path: "/neighborhood-partners" },
        ]}
      />

      {/* Hero — the actual Garden City neighborhood at sunset */}
      <section className="relative isolate min-h-[402px] overflow-hidden rounded-[22px]">
        <Image
          src="/assets/Garden-City-Idaho-Arcadia-Hotel.jpg"
          alt="Aerial view of Garden City, Idaho at sunset along the Boise River"
          fill
          sizes="100vw"
          preload
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/50" />

        <div className="relative z-10 flex min-h-[402px] flex-col items-center justify-center px-6 py-14 text-center text-white">
          <h1 className="text-[clamp(2.4rem,3.6vw,3.6rem)] font-light tracking-[-0.055em] text-white">
            Neighborhood Partners
          </h1>
          <div className="mt-5 flex items-center gap-4 text-[1.18rem] tracking-[-0.025em] text-white/82">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span aria-hidden="true">→</span>
            <span>Neighborhood Partners</span>
          </div>
        </div>
      </section>

      {/* Intro — the payoff, paired with a lifestyle photo */}
      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="relative min-h-[340px] w-full overflow-hidden rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:min-h-[460px]">
            <Image
              src="/assets/friends-toasting-with-drinks-at-picnic-JSQD9QZ.jpg"
              alt="Friends toasting drinks together outdoors"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-[640px]">
            <h2 className="mt-6 text-[clamp(2.2rem,3.8vw,3.5rem)] font-light leading-[1.04] tracking-[-0.06em] text-[#111111]">
              Make The Most Of Your Visit
            </h2>

            <p className="mt-8 text-[clamp(1.08rem,1.45vw,1.3rem)] leading-[1.8] tracking-[-0.025em] text-[#7a7b77]">
              Some of our favorite people run the shops, bars, and studios just
              around the corner — so we teamed up to save you a little something
              at each. Enjoy exclusive discounts at local restaurants, shops,
              and attractions throughout the neighborhood.
            </p>

            <p className="mt-5 text-[clamp(1rem,1.25vw,1.14rem)] leading-[1.75] tracking-[-0.02em] text-[#9a9a92]">
              Just mention you&apos;re staying at Arcadia to unlock the perks
              below.
            </p>

            <a href={BOOKING_URL} className="btn btn-green mt-8">
              Book Your Stay
              <span className="btn-arrow">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* The lineup — partner grid */}
      <section className="rounded-[22px] bg-white px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[1220px]">
          <div className="max-w-[720px]">
            <span className="eyebrow">The Lineup</span>
            <h2 className="mt-6 text-[clamp(2rem,3.2vw,3rem)] font-light tracking-[-0.05em] text-[#111111]">
              Perks Right Around The Corner
            </h2>
            <p className="mt-5 text-[clamp(1.02rem,1.3vw,1.18rem)] leading-[1.72] tracking-[-0.025em] text-[#8b8d92]">
              Nine local favorites, one easy stroll. Here&apos;s what&apos;s
              waiting for you — just ask the front desk for details.
            </p>
          </div>

          <div className="mt-8">
            {groups.map((group) => (
              <div key={group.label} className="mt-12 first:mt-8">
                {/* Group heading — reads like a menu section */}
                <div className="flex items-baseline justify-between gap-4 border-b border-[#e7e6df] pb-4">
                  <h3 className="text-[clamp(1.5rem,2vw,1.9rem)] font-light tracking-[-0.04em] text-[#111111]">
                    {group.label}
                  </h3>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#a1a199]">
                    {group.blurb}
                  </span>
                </div>

                <ul className="list-none p-0">
                  {group.partners.map((partner, index) => {
                    const isDark = partner.tone === "dark";
                    const amount = partner.discount.replace(/\s*off$/i, "");
                    return (
                      <li
                        key={partner.name}
                        className={
                          index > 0
                            ? "border-t border-dashed border-[#d8d7d0]"
                            : ""
                        }
                      >
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit the ${partner.name} website`}
                          className="group flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:gap-9"
                        >
                          {/* Logo lockup — toned to the artwork so every mark stays legible */}
                          <div
                            className={`relative flex h-[104px] w-full shrink-0 items-center justify-center rounded-[16px] transition-shadow sm:w-[210px] ${
                              isDark
                                ? "bg-[#1f231f] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                                : "border border-black/[0.08] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
                            }`}
                          >
                            <div className="relative h-[58%] w-[68%]">
                              <Image
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                fill
                                sizes="210px"
                                unoptimized={partner.logo.endsWith(".svg")}
                                className="object-contain"
                              />
                            </div>
                          </div>

                          {/* Name + category + how to redeem */}
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#a1a199]">
                              {partner.category}
                            </p>
                            <h4 className="mt-2 flex items-center gap-2 text-[clamp(1.6rem,2.4vw,2.15rem)] font-light leading-[1.12] tracking-[-0.04em] text-[#111111]">
                              <span className="decoration-1 underline-offset-[6px] group-hover:underline">
                                {partner.name}
                              </span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-[0.78em] w-[0.78em] shrink-0 -translate-x-1 text-[#a1a199] opacity-40 transition-all duration-200 group-hover:translate-x-0 group-hover:text-[#1f231f] group-hover:opacity-100"
                                aria-hidden="true"
                              >
                                <path d="M7 17 17 7" />
                                <path d="M8 7h9v9" />
                              </svg>
                            </h4>
                            {(partner.code || partner.redeem) && (
                              <p className="mt-2.5 flex items-center gap-1.5 text-[0.86rem] leading-[1.3] tracking-[-0.01em] text-[#8a8a84]">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-3.5 w-3.5 shrink-0 text-[#9ec29e]"
                                  aria-hidden="true"
                                >
                                  <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1-.6-1.4V5a1 1 0 0 1 1-1h7a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8Z" />
                                  <circle
                                    cx="8.5"
                                    cy="8.5"
                                    r="1.1"
                                    fill="currentColor"
                                    stroke="none"
                                  />
                                </svg>
                                {partner.code ? (
                                  <span>
                                    Use code{" "}
                                    <span className="font-semibold tracking-[0.02em] text-[#1f231f]">
                                      {partner.code}
                                    </span>
                                  </span>
                                ) : (
                                  partner.redeem
                                )}
                              </p>
                            )}
                          </div>

                          {/* Discount — the headline value */}
                          <div className="flex shrink-0 items-baseline gap-2 sm:min-w-[128px] sm:flex-col sm:items-end sm:gap-1 sm:text-right">
                            <span className="font-display text-[clamp(2.1rem,3vw,2.9rem)] font-light leading-[0.9] tracking-[-0.05em] text-[#1f231f]">
                              {amount}
                            </span>
                            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#a1a199]">
                              off
                            </span>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[0.95rem] leading-[1.6] tracking-[-0.02em] text-[#a1a199]">
            Discounts are available to Arcadia guests during your stay. Offers
            and terms are set by each business and subject to change.
          </p>
        </div>
      </section>

      {/* Closing CTA — brand accent-green band */}
      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[24px] bg-accent-green px-5 py-8 sm:px-12 sm:py-10 lg:px-14 lg:py-10">
          <Image
            src="/assets/background_1.png"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.7fr] lg:items-center">
            <div className="max-w-[640px] py-4 lg:px-6 lg:py-6">
              <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[20px] border border-white/45 bg-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-[1px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12 fill-[#e42a44]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="mt-2 text-[0.9rem] font-normal tracking-[-0.03em] text-[#232323]">
                  In Garden City
                </span>
              </div>

              <h2 className="mt-4 text-[clamp(1.85rem,4vw,3.8rem)] font-light tracking-[-0.06em] text-[#111111]">
                Stay Close To It All
              </h2>
              <p className="mt-4 max-w-[640px] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.72] tracking-[-0.025em] text-[#181818]">
                Arcadia sits in the heart of Garden City&apos;s wine district,
                minutes from the Boise River and surrounded by the very
                neighbors on this list. Book your stay and turn a good weekend
                into a great one — perks included.
              </p>

              <a href={BOOKING_URL} className="btn btn-light mt-6">
                Book Now
                <span className="btn-arrow">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-[0.82/1] w-full max-w-[320px] overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src="/assets/arcadia_6.jpg"
                  alt="Guests outside Arcadia Hotel in Garden City"
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
