"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryCard = { src: string };

function usePerPage() {
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perPage;
}

export function GalleryCarousel({ cards }: { cards: GalleryCard[] }) {
  const total = cards.length;
  const perPage = usePerPage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Extra clones of the leading cards appended to the end so the track can
  // keep sliding forward past the last real slide, then snap back to 0
  // invisibly once the clones are fully in view.
  const extendedCards = [...cards, ...cards.slice(0, perPage)];

  useEffect(() => {
    setIndex(0);
    setTransitionEnabled(false);
    const id = requestAnimationFrame(() => setTransitionEnabled(true));
    return () => cancelAnimationFrame(id);
  }, [perPage]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev < total ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(id);
  }, [paused, total]);

  // Once the track has slid onto the cloned leading slides (index === total),
  // snap it back to the real first slide once the slide transition has had
  // time to finish, then re-enable the transition on the next frame.
  useEffect(() => {
    if (index < total) return;
    const id = setTimeout(() => {
      setTransitionEnabled(false);
      setIndex(0);
    }, 550);
    return () => clearTimeout(id);
  }, [index, total]);

  useEffect(() => {
    if (transitionEnabled) return;
    const id = requestAnimationFrame(() => setTransitionEnabled(true));
    return () => cancelAnimationFrame(id);
  }, [transitionEnabled]);

  const goTo = (i: number) => {
    setTransitionEnabled(true);
    setIndex(i);
  };

  const activeDot = ((index % total) + total) % total;
  const slideCount = extendedCards.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mt-20 overflow-hidden">
        <div
          className="flex"
          style={{
            width: `${(slideCount / perPage) * 100}%`,
            transform: `translateX(-${index * (100 / slideCount)}%)`,
            transition: transitionEnabled ? "transform 500ms ease-in-out" : "none",
          }}
        >
          {extendedCards.map((card, i) => (
            <div
              key={i}
              className="shrink-0 px-1"
              style={{ width: `${100 / slideCount}%` }}
            >
              <div className="relative aspect-[1.48/1] overflow-hidden rounded-[18px]">
                <Image src={card.src} alt="Arcadia Hotel" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeDot
                ? "h-2.5 w-2.5 bg-[#111111]"
                : "h-2 w-2 bg-[#c8c8c8]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
