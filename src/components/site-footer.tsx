import Image from "next/image";
import { FooterCarousel } from "@/components/footer-carousel";
import { FacebookIcon, InstagramIcon, MailIcon } from "@/components/social-icons";

export function SiteFooter() {
  return (
    <footer className="mt-4 bg-[#060704] px-6 pb-14 pt-14 text-white sm:px-10 lg:px-16 lg:pb-16 lg:pt-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <a href="/" className="relative block h-[86px] w-[280px]">
              <Image src="/assets/logo_2.png" alt="Arcadia Hotel" fill className="object-contain object-left" />
            </a>

            <p className="mt-4 text-[1.1rem] tracking-[-0.025em] text-white/48">
              For The Modern Day Traveler
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/StayArcadia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/14 text-sm text-white/95"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/stayarcadia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/14 text-white/95"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@stayarcadia.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/14 text-white/95"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:justify-self-end">
            <div>
              <h3 className="text-[1.9rem] font-light tracking-[-0.04em] text-white/95">
                Address
              </h3>
              <p className="mt-4 text-[1.08rem] leading-[1.8] tracking-[-0.02em] text-white/42">
                3433 W Chinden Blvd,
                <br />
                Boise, ID 83714
              </p>
            </div>

            <div>
              <h3 className="text-[1.9rem] font-light tracking-[-0.04em] text-white/95">
                Contact
              </h3>
              <p className="mt-4 text-[1.08rem] leading-[1.8] tracking-[-0.02em] text-white/42">
                info@stayarcadia.com
                <br />
                208.510.0504
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-[2rem] font-light tracking-[-0.045em] text-white/95">
            Follow Along
          </h3>
          <FooterCarousel />
        </div>

        <div className="mt-8 text-center">
          <a
            href="/privacy-policy"
            className="text-[1.02rem] tracking-[-0.02em] text-white/34"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
