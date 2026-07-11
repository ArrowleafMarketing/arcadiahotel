import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/social-icons";
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs-jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book Your Stay",
  description:
    "Book your stay at Arcadia Hotel in Garden City, Idaho. Modern boutique rooms, contactless check-in, and easy access to Boise's best food, wine, and river trails.",
  path: "/book",
  image: "/assets/arcadia_33.jpg",
  imageAlt: "Book your stay at Arcadia Hotel",
});

const BOOKING_URL = "https://booking.stayarcadia.com/";

function GemIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M6 3.5h12l3 5.2-9 12.3L3 8.7 6 3.5Z" />
      <path d="M3 8.7h18" />
      <path d="M9 3.5 7 8.7l5 12.3" />
      <path d="M15 3.5l2 5.2-5 12.3" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M2 8.8a15 15 0 0 1 20 0" />
      <path d="M5 12.2a10 10 0 0 1 14 0" />
      <path d="M8.4 15.6a5 5 0 0 1 7.2 0" />
      <circle cx="12" cy="19" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TvIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="1.6" />
      <path d="M8.5 20.5h7" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="currentColor"
    >
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
    </svg>
  );
}

export default function BookPage() {
  const roomCards = [
    {
      title: "King Suite",
      description:
        "Ideal for families or groups, our suites provide extra space with King + Sofa Bed, perfect for a relaxing getaway.",
      image: "/assets/arcadia_23.jpg",
    },
    {
      title: "Queen Room",
      description:
        "Perfect for solo travelers or couples, this cozy room offers comfort and functionality with a sleek design.",
      image: "/assets/arcadia_29.jpeg",
    },
    {
      title: "Ground Floor Queen Room",
      description:
        "Enjoy the convenience of ground-floor access without compromising on style and comfort.",
      image: "/assets/arcadia_30.jpg",
    },
  ];
  const roomFeatures = [
    { icon: <GemIcon />, label: "Modern Furniture" },
    { icon: <WifiIcon />, label: "High-Speed Wi-Fi" },
    { icon: <TvIcon />, label: "Large Flat Screen Smart TV's" },
    { icon: <WalkIcon />, label: "Easy Access To Your Room" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ]}
      />
      <section className="relative isolate min-h-[402px] overflow-hidden rounded-[22px]">
        <Image
          src="/assets/arcadia_33.jpg"
          alt="Arcadia Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/34" />

        <div className="relative z-10 flex min-h-[402px] flex-col items-center justify-center px-6 py-14 text-center text-white">
          <h1 className="text-[clamp(2.4rem,3.6vw,3.6rem)] font-light tracking-[-0.055em] text-white">
            Book Your Stay with Arcadia Hotel
          </h1>
          <a href={BOOKING_URL} className="btn btn-green mt-6">
            Book Now
            <span className="btn-arrow">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="text-center">
            <span className="font-display inline-flex items-center rounded-full border border-[#d8c987] bg-[#f5edc7] px-5 py-2 text-[0.98rem] font-normal tracking-[-0.02em] text-[#1f231f]">
              Modern Design
            </span>
            <h2 className="mt-4 text-[clamp(3rem,4.5vw,4.7rem)] font-light tracking-[-0.055em] text-[#111111]">
              Relax and Recharge
            </h2>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-6 lg:grid-cols-2">
            {roomCards.map((room, index) => (
              <article
                key={room.title}
                className={index === 2 ? "lg:col-start-1" : undefined}
              >
                <div className="relative aspect-[1.47/1] overflow-hidden rounded-[14px]">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-4 text-[0.96rem] tracking-[-0.02em] text-[#7a7b77]">
                  {roomFeatures.map((feature, i) => (
                    <span
                      key={feature.label}
                      className={`inline-flex items-center gap-2.5 ${
                        i % 2 === 1 ? "justify-self-end" : ""
                      }`}
                    >
                      {feature.icon}
                      <span>{feature.label}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-4 h-px w-full bg-[#d6d1ca]" />

                <h3 className="mt-4 text-[clamp(2rem,2.3vw,2.5rem)] font-light tracking-[-0.045em] text-[#111111]">
                  {room.title}
                </h3>
                <p className="mt-3 max-w-[590px] text-[clamp(1rem,1.22vw,1.14rem)] leading-[1.72] tracking-[-0.02em] text-[#8a8b86]">
                  {room.description}
                </p>

                <a href={BOOKING_URL} className="btn btn-green mt-4">
                  Book Now
                  <span className="btn-arrow">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </a>
              </article>
            ))}
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

              <a href={BOOKING_URL} className="btn btn-light mt-6">
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
                    src="/assets/arcadia_27.jpg"
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
