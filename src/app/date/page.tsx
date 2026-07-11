import type { Metadata } from "next";
import Image from "next/image";
import { DateNightGallery } from "@/components/date-night-gallery";
import { ArrowRightIcon } from "@/components/social-icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Date Night: Upgraded",
  description:
    "Upgrade date night at Arcadia Hotel — a romance-ready room, wine from Parcero Winery next door, and a PLUNJ discount. Add the Date Night Package at checkout.",
  path: "/date",
  image: "/assets/arcadia_6.jpg",
  imageAlt: "Date night at Arcadia Hotel",
});

const BOOKING_URL = "https://booking.stayarcadia.com/";

const steps = [
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

export default function DatePage() {
  return (
    <>
      <section className="bg-[var(--background)] px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[1220px]">
          <h1 className="text-center text-[clamp(2.8rem,4.4vw,4.25rem)] font-light tracking-[-0.05em] text-[#111111]">
            Date Night: Upgraded
          </h1>

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
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="mt-5">
                {steps.map((item, index) => (
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

          <div className="mx-auto mt-16 max-w-[1100px]">
            <h2 className="text-[clamp(2.2rem,3vw,3rem)] font-normal tracking-[-0.045em] text-[#111111]">
              Don't wing it —{" "}
              <strong className="font-semibold">
                romance needs 48 hours' notice.
              </strong>
            </h2>
            <p className="mt-6 text-[clamp(1.08rem,1.32vw,1.22rem)] leading-[1.75] tracking-[-0.02em] text-[#8a8b86]">
              Pick your dates, add the{" "}
              <strong className="font-semibold text-[#6b6b68]">
                Date Night Package
              </strong>{" "}
              at checkout, and let us make you look <em>very</em> good.
            </p>
          </div>
        </div>
      </section>

      <DateNightGallery />
    </>
  );
}
