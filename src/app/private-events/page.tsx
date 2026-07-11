import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/social-icons";
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs-jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Private Events",
  description:
    "Host bachelorette parties, small weddings, showers, and corporate events at Arcadia Hotel — a boutique event space in Garden City, Idaho, minutes from Boise.",
  path: "/private-events",
  image: "/assets/arcadia_32.jpg",
  imageAlt: "Private event space at Arcadia Hotel",
});

const eventTypes = [
  {
    number: "01.",
    title: "Bachelorette & Bachelor Parties:",
    description: "Celebrate in style with friends in our vibrant setting.",
  },
  {
    number: "02.",
    title: "Small Weddings & Elopements:",
    description: "Say “I do” in an intimate, creative space.",
  },
  {
    number: "03.",
    title: "Baby Showers",
    description: "Make new memories in our cozy, modern environment.",
  },
  {
    number: "04.",
    title: "Corporate Events",
    description: "Ideal for meetings, workshops, or retreats.",
  },
];

export default function PrivateEventsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Private Events", path: "/private-events" },
        ]}
      />
      <section className="relative isolate min-h-[402px] overflow-hidden rounded-[22px]">
        <Image
          src="/assets/arcadia_26.jpg"
          alt="Arcadia Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/34" />

        <div className="relative z-10 flex min-h-[402px] flex-col items-center justify-center px-6 py-14 text-center text-white">
          <h1 className="text-[clamp(2.4rem,3.6vw,3.6rem)] font-light tracking-[-0.055em] text-white">
            Private Events
          </h1>
          <div className="mt-5 flex items-center gap-4 text-[1.18rem] tracking-[-0.025em] text-white/82">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span aria-hidden="true">→</span>
            <span>Events</span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1fr_1.02fr] lg:items-stretch">
          <div className="relative hidden min-h-[460px] w-full overflow-hidden rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] lg:block">
            <Image
              src="/assets/arcadia_32.jpg"
              alt="Private Events at Arcadia"
              fill
              sizes="560px"
              className="object-cover"
            />
          </div>

          <div className="max-w-[640px]">
            <span className="eyebrow">Your Event, Our Place</span>

            <h2 className="mt-6 text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-[1.05] tracking-[-0.06em] text-[#111111]">
              Celebrate Life&apos;s Moments In Style
            </h2>

            <p className="mt-8 text-[clamp(1.08rem,1.45vw,1.3rem)] leading-[1.8] tracking-[-0.025em] text-[#7a7b77]">
              Host your next unforgettable event at Arcadia Hotel! From intimate gatherings to lively celebrations, our boutique charm sets the perfect stage for:
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {eventTypes.map((event) => (
                <div key={event.number}>
                  <p className="text-[1.05rem] tracking-[-0.03em] text-[#1c1c1c]">
                    {event.number}
                  </p>
                  <div className="mt-7 h-px w-full bg-[#c1d5b8]" />
                  <h3 className="mt-6 text-[clamp(1.8rem,2vw,2.25rem)] font-light leading-[1.2] tracking-[-0.045em] text-[#111111]">
                    {event.title}
                  </h3>
                  {event.description ? (
                    <p className="mt-5 text-[clamp(1rem,1.18vw,1.14rem)] leading-[1.72] tracking-[-0.02em] text-[#8b8d92]">
                      {event.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="relative mx-auto max-w-[1220px] overflow-hidden rounded-[24px] bg-accent-green px-8 py-8 sm:px-12 sm:py-10 lg:px-14 lg:py-10">
          <Image
            src="/assets/background_1.png"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.7fr] lg:items-center">
            <div className="max-w-[640px] px-4 py-4 lg:px-6 lg:py-6">
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

              <h2 className="mt-4 text-[clamp(2.4rem,4vw,3.8rem)] font-light tracking-[-0.06em] text-[#111111]">
                Why Arcadia?
              </h2>
              <p className="mt-4 max-w-[640px] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.72] tracking-[-0.025em] text-[#181818]">
                Why the name Arcadia? When we got a second chance for a new life
                we tried to imagine what it was we wanted to be. We wanted to be
                a place for community to come together, for simplicity within
                the chaos of our world, and a place to breed happiness. The
                britannic and greek meaning for Arcadia is "A place of simple,
                peaceful pleasures" – so there it was, our new name and identity
                for the future.
              </p>

              <a
                href="https://booking.stayarcadia.com/"
                className="btn btn-light mt-6"
              >
                Book Now
                <span className="btn-arrow">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-[0.82/1] w-full max-w-[400px]">
                <div className="absolute right-0 top-0 aspect-[0.72/1] w-[60%] overflow-hidden rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/assets/arcadia_24.jpg"
                    alt="Arcadia Hotel"
                    fill
                    sizes="(min-width: 1024px) 240px, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 aspect-[0.72/1] w-[60%] overflow-hidden rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/assets/arcadia_31.jpg"
                    alt="Arcadia Hotel"
                    fill
                    sizes="(min-width: 1024px) 240px, 60vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
