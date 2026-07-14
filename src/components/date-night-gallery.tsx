"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon } from "@/components/social-icons";

const BOOKING_URL =
  "https://booking.stayarcadia.com/";

type GalleryItem = {
  id: number;
  title: string;
  caption: string;
  src: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Winery Welcome",
    caption: "A7400246",
    src: "/assets/arcadia_7.jpg",
  },
  {
    id: 2,
    title: "Gifted Arrival",
    caption: "A7400247",
    src: "/assets/arcadia_8.jpg",
  },
  {
    id: 3,
    title: "Our Amazing Neighbors",
    caption: "A7400248",
    src: "/assets/arcadia_9.jpg",
  },
  {
    id: 4,
    title: "Courtyard Play",
    caption: "A7400249",
    src: "/assets/arcadia_10.jpg",
  },
  {
    id: 5,
    title: "Evening Stroll",
    caption: "A7400250",
    src: "/assets/arcadia_11.jpg",
  },
  {
    id: 6,
    title: "Room Reveal",
    caption: "A7400251",
    src: "/assets/arcadia_12.jpg",
  },
  {
    id: 7,
    title: "Check-In Balcony",
    caption: "A7400252",
    src: "/assets/arcadia_13.jpg",
  },
  {
    id: 8,
    title: "Ride Into The Night",
    caption: "A7400253",
    src: "/assets/arcadia_14.jpg",
  },
];

export function DateNightGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = useMemo(
    () => (activeIndex === null ? null : galleryItems[activeIndex]),
    [activeIndex],
  );
  const activePosition = activeIndex === null ? null : activeIndex + 1;
  const activeNeighborIndex = activeIndex ?? 0;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % galleryItems.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? galleryItems.length - 1
            : (current - 1 + galleryItems.length) % galleryItems.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  return (
    <>
      <section className="bg-[var(--background)] px-6 sm:px-10 lg:px-16 ">
        <div className="mx-auto max-w-[1220px]">
          <div className="flex justify-center">
            <a href={BOOKING_URL} className="btn btn-green">
              Book a Room Today
              <span className="btn-arrow">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="mt-16 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-[1.42/1] overflow-hidden rounded-[14px] text-left"
                aria-label={`Open ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[rgba(20,20,18,0.92)] backdrop-blur-sm">
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-6 py-4 text-white">
            <p className="text-[1.1rem] tracking-[-0.02em] text-white/70">
              {activePosition} / {galleryItems.length}
            </p>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[1.4rem] text-white hover:bg-white/20"
            >
              ×
            </button>
          </div>

          {/* Image area */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
            {/* Click backdrop to close */}
            <button
              type="button"
              aria-label="Close lightbox"
              className="absolute inset-0"
              onClick={() => setActiveIndex(null)}
            />

            {/* Prev arrow */}
            <button
              type="button"
              aria-label="Previous image"
              onClick={() =>
                setActiveIndex((c) =>
                  c === null
                    ? galleryItems.length - 1
                    : (c - 1 + galleryItems.length) % galleryItems.length,
                )
              }
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[1.6rem] text-white hover:bg-white/20"
            >
              ‹
            </button>

            {/* Main image */}
            <div className="relative z-10 flex max-h-full w-full max-w-3xl flex-col items-center">
              <div
                className="relative w-full"
                style={{ height: "calc(100vh - 180px)" }}
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-center text-[1rem] tracking-[-0.02em] text-white/60">
                {activeItem.caption}
              </p>
            </div>

            {/* Next arrow */}
            <button
              type="button"
              aria-label="Next image"
              onClick={() =>
                setActiveIndex((c) =>
                  c === null ? 0 : (c + 1) % galleryItems.length,
                )
              }
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[1.6rem] text-white hover:bg-white/20"
            >
              ›
            </button>
          </div>

          <div className="shrink-0 py-4" />
        </div>
      ) : null}
    </>
  );
}
