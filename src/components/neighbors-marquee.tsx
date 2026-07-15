"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/social-icons";

const partners = [
  { src: "/assets/partner_1.png", alt: "Western Collective", href: "https://www.westerncollective.beer/" },
  { src: "/assets/partner_2.png", alt: "Push and Pour", href: "https://www.pushandpour.com/" },
  { src: "/assets/partner_3.png", alt: "Black Moon", href: "https://www.heyblackmoon.com/" },
  { src: "/assets/partner_4.png", alt: "Common Ground", href: "https://common-ground-coffee-market.square.site/" },
  { src: "/assets/partner_5.png", alt: "Caffe Lucianos", href: "https://caffelucianos.com/" },
  { src: "/assets/partner_6.png", alt: "Flourish Bakery", href: "https://www.flourishbakeryboise.com/" },
];

function usePerPage() {
  const [perPage, setPerPage] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerPage(1);
      else if (window.innerWidth < 768) setPerPage(2);
      else if (window.innerWidth < 1024) setPerPage(3);
      else setPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

export function NeighborsMarquee() {
  const total = partners.length;
  const perPage = usePerPage();
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset position when perPage changes to avoid visual glitch
  useEffect(() => {
    setCurrent(0);
  }, [perPage]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((prev) => prev + 1), 3000);
    return () => clearInterval(id);
  }, [paused]);

  // Infinite loop: after sliding into clones, snap back without animation
  useEffect(() => {
    if (current === total) {
      snapTimer.current = setTimeout(() => {
        setAnimated(false);
        setCurrent(0);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimated(true))
        );
      }, 600);
    }
    return () => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, [current, total]);

  // extended = real items + clones of first perPage items (for seamless loop)
  const extended = [...partners, ...partners.slice(0, perPage)];
  const itemWidth = 100 / perPage;

  return (
    <section
      className="mt-14 rounded-[22px] bg-white px-6 py-10 sm:px-10 lg:mt-20 lg:px-16 lg:py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center text-[clamp(1.6rem,2.5vw,2.4rem)] font-light tracking-[-0.045em] text-[#111111]">
          Our Amazing Neighbors
        </h2>

        <div className="relative mt-8 overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(${-(current * itemWidth)}%)`,
              transition: animated ? "transform 600ms ease-in-out" : "none",
            }}
          >
            {extended.map((partner, index) => (
              <a
                key={index}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center px-6"
                style={{ width: `${itemWidth}%` }}
              >
                <div className="relative h-[170px] w-full sm:h-[260px]">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    className="object-contain transition-opacity duration-200 hover:opacity-75"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/neighborhood-partners" className="btn btn-green">
            See The Deals
            <span className="btn-arrow">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
