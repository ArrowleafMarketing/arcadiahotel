import Image from "next/image";
import { DateNightGallery } from "@/components/date-night-gallery";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { NeighborsMarquee } from "@/components/neighbors-marquee";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/social-icons";

const BOOKING_URL =
  "https://booking.stayarcadia.com/";

export default function Home() {
  const socialItems = [
    { label: "Facebook", icon: <FacebookIcon className="h-[22px] w-[22px]" /> },
    {
      label: "Instagram",
      icon: <InstagramIcon className="h-[22px] w-[22px]" />,
    },
    { label: "Email", icon: <MailIcon className="h-[22px] w-[22px]" /> },
  ];
  const featureItems = [
    {
      number: "01.",
      title: "Prime Location",
      description:
        "Unparalleled access to Garden City and Boise's top attractions like the Boise River, downtown shopping and dining",
    },
    {
      number: "02.",
      title: "Modern Design",
      description:
        "Redesigned with a focus on modern luxury, we feature stylish and comfortable accommodations.",
    },
    {
      number: "03.",
      title: "Exceptional Service",
      description:
        "Our dedicated staff is committed to making your stay as comfortable and enjoyable as possible.",
    },
    {
      number: "04.",
      title: "Community Centered",
      description:
        "We proudly host a variety of community events that bring people together. From local art exhibits and cultural festivals to fundraisers.",
    },
  ];
  const galleryCards = [
    { src: "/assets/arcadia_1.jpg" },
    { src: "/assets/arcadia_2.jpg" },
    { src: "/assets/arcadia_3.jpg" },
    { src: "/assets/arcadia_4.jpg" },
    { src: "/assets/arcadia_5.jpg" },
  ];
  const dateNightSteps = [
    {
      step: "Step 01",
      title: "Check In, Turn On The Vibes",
      description:
        "Glide into your stylish Arcadia room where romance has already checked in early—rose petals, macarons, and wine glasses waiting like they knew exactly who you are.",
    },
    {
      step: "Step 02",
      title: "Wine Like You Mean It",
      description:
        "Flash your voucher at Parcero Winery next door and score two glasses to sip there or a full bottle to-go for... later. Your call, we don't judge — we encourage.",
    },
    {
      step: "Step 03",
      title: "Get Cozy and Connect",
      description:
        "Pop that bottle, turn on your song, and let the night unfold however you two see fit. Want to level up? Your discount at PLUNJ is your invitation to go from steaming hot to ice-cold together. (Trust us, it's a bonding experience.)",
    },
  ];

  return (
    <>
      <section className="relative isolate min-h-[calc(100vh-112px)] overflow-hidden rounded-[22px] bg-[#c8c2bb]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.mov" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-black/28" />

        <div className="relative z-10 flex min-h-[calc(100vh-112px)] flex-col items-center justify-center px-6 py-16 text-center text-white">
          <span className="font-display mb-7 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[0.98rem] font-normal tracking-[0.01em] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-sm">
            Welcome to Arcadia Hotel
          </span>
          <h1 className="max-w-[1080px] text-[clamp(3.7rem,7.4vw,5.9rem)] font-light leading-[0.95] tracking-[-0.055em] text-white">
            Boise&apos;s First Contactless Hotel
          </h1>
          <p className="mt-8 text-[clamp(1.25rem,2vw,2rem)] font-normal tracking-[-0.03em] text-white/94">
            Book Your Arcadia Stay
          </p>
          <a
            href="https://booking.stayarcadia.com/"
            className="btn btn-light mt-9 shadow-[0_10px_35px_rgba(0,0,0,0.16)]"
          >
            BOOK NOW
            <span className="btn-arrow">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-7 pb-7">
          <div className="flex items-center gap-3">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href="#"
                aria-label={item.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/14 text-sm font-medium uppercase text-white backdrop-blur-sm transition-colors hover:bg-black/24"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <a
            href="https://boisedev.com/news/2023/01/13/sunliner-arcadia-garden-city/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-full px-3 py-2 text-left text-white"
          >
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/assets/partner_7.png"
                alt="Boise Dev"
                fill
                className="object-cover"
              />
            </span>
            <span className="max-w-[170px] text-[13px] leading-[1.35] text-white/95 sm:text-[14px] [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              Check out our feature on Boise Dev!
            </span>
          </a>
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto max-w-[1120px] text-center">
            <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-light tracking-[-0.05em] text-[#111111]">
              For The Modern Day Traveler
            </h2>
            <p className="mx-auto mt-2 max-w-[1080px] text-[clamp(1rem,1.45vw,1.28rem)] leading-[1.7] tracking-[-0.025em] text-[#6d7178]">
              Perfectly positioned near the Boise River in Garden City, our
              newly redesigned, modern hotel offers unparalleled convenience and
              comfort.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featureItems.map((item) => (
              <div key={item.number} className="min-w-0">
                <p className="text-[1.05rem] font-normal tracking-[-0.03em] text-[#1c1c1c]">
                  {item.number}
                </p>
                <div className="mt-8 h-px w-full bg-[#2d2d2d]" />
                <h3 className="mt-7 text-[clamp(1.9rem,2.1vw,2.35rem)] font-light leading-[1.12] tracking-[-0.045em] text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-6 max-w-[280px] text-[clamp(1rem,1.18vw,1.16rem)] leading-[1.72] tracking-[-0.02em] text-[#8b8d92]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[22px] bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto max-w-[1220px]">
          <div className="max-w-[1120px]">
            <span className="font-display inline-flex items-center rounded-full border border-[#c8d1c7] bg-[#e8ede6] px-5 py-2 text-[1.05rem] font-normal tracking-[-0.025em] text-[#1f2521]">
              Thoughtfully Designed, With You In Mind
            </span>
            <h2 className="mt-6 max-w-[980px] text-[clamp(2.8rem,5vw,4.7rem)] font-light leading-[1.02] tracking-[-0.055em] text-[#111111]">
              From Sunliner to Arcadia: The Journey
            </h2>
            <p className="mt-8 max-w-[1120px] text-[clamp(1.04rem,1.45vw,1.32rem)] leading-[1.72] tracking-[-0.025em] text-[#666c74]">
              Once the mid-century Sunliner Motel, established in the 1950s,
              they hosted families, friends, and business travelers as Boise
              expanded into Garden City. Recently purchased by visionary owners,
              is being revitalized to serve modern travelers and the local
              community, with a grand reopening set for early 2025.
            </p>
          </div>

          <GalleryCarousel cards={galleryCards} />
        </div>
      </section>

      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[1220px]">
          <h2 className="text-center text-[clamp(2.8rem,4.4vw,4.25rem)] font-light tracking-[-0.05em] text-[#111111]">
            Date Night: Upgraded
          </h2>

          <div className="mt-8 flex justify-center">
            <a href={BOOKING_URL} className="btn btn-green">
              Make It A Night To Remember
              <span className="btn-arrow">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-[1100px] gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <div className="relative min-h-[420px] w-full overflow-hidden rounded-[16px]">
              <Image
                src="/assets/arcadia_6.jpg"
                alt="Date Night at Arcadia"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="mt-5">
                {dateNightSteps.map((item, index) => (
                  <div
                    key={item.step}
                    className={index === 0 ? "" : "mt-8 pt-8"}
                  >
                    {index > 0 ? (
                      <div className="mb-8 border-t border-dashed border-[#b6b7b0]" />
                    ) : null}
                    <p className="text-[0.98rem] font-normal tracking-[-0.02em] text-[#8a8a84]">
                      {item.step}
                    </p>
                    <div className="mt-3 flex items-start gap-4">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-sm text-white">
                        ✓
                      </span>
                      <div>
                        <h3 className="text-[clamp(1.75rem,2.2vw,2.25rem)] font-light leading-[1.15] tracking-[-0.045em] text-[#111111]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[530px] text-[clamp(1rem,1.2vw,1.12rem)] leading-[1.95] tracking-[-0.02em] text-[#848484]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DateNightGallery />
      <NeighborsMarquee />

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
              <div className="relative aspect-[0.82/1] w-full max-w-[320px] overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <Image
                  src="/assets/arcadia_15.jpg"
                  alt="Arcadia Hotel"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[22px] bg-white px-6 py-18 sm:px-10 lg:px-16 lg:py-22">
        <div className="mx-auto max-w-[980px]">
          <div className="flex justify-center">
            <span className="eyebrow">Stay In The Know</span>
          </div>

          <h2 className="mt-6 text-center text-[clamp(3rem,4.5vw,4.3rem)] font-light tracking-[-0.055em] text-[#111111]">
            Subscribe to Our Newsletter
          </h2>

          <div className="mx-auto mt-12 max-w-[680px]">
            <iframe
              src="https://api.arrowleafmarketing.com/widget/form/xNtVPkzohMs5fSfrRmSD"
              style={{
                width: "100%",
                height: "790px",
                border: "none",
                borderRadius: "3px",
              }}
              id="inline-xNtVPkzohMs5fSfrRmSD"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Newsletter Form"
              data-height="790"
              data-layout-iframe-id="inline-xNtVPkzohMs5fSfrRmSD"
              data-form-id="xNtVPkzohMs5fSfrRmSD"
              title="Newsletter Form"
            />
          </div>
        </div>
      </section>
    </>
  );
}
