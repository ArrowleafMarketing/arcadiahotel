"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  "/assets/arcadia_16.jpg",
  "/assets/arcadia_17.jpg",
  "/assets/arcadia_18.jpg",
  "/assets/arcadia_19.jpg",
  "/assets/arcadia_20.jpg",
  "/assets/arcadia_21.jpg",
  "/assets/arcadia_22.jpg",
];

const PER_PAGE = 3;

export function FooterCarousel() {
  const total = photos.length;
  const [current, setCurrent] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((prev) => prev + 1), 3000);
    return () => clearInterval(id);
  }, [paused]);

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

  // extended = real photos + clones of first PER_PAGE for seamless loop
  const extended = [...photos, ...photos.slice(0, PER_PAGE)];
  const itemWidth = 100 / PER_PAGE;

  return (
    <div
      className="mt-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[14px]">
        <div
          className="flex"
          style={{
            transform: `translateX(${-(current * itemWidth)}%)`,
            transition: animated ? "transform 600ms ease-in-out" : "none",
          }}
        >
          {extended.map((src, index) => (
            <div
              key={index}
              className="relative shrink-0 px-2"
              style={{ width: `${itemWidth}%` }}
            >
              <a
                href="https://www.instagram.com/stayarcadia/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[1.46/1] overflow-hidden rounded-[14px]"
              >
                <Image src={src} alt="Arcadia Hotel" fill className="object-cover" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAnimated(true);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current % total ? "h-2 w-2 bg-white" : "h-1.5 w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
