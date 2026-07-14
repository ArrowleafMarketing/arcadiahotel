"use client";

import { useEffect } from "react";

/**
 * Reveals each top-level section (`main > *`) as it scrolls into view.
 *
 * The hidden/animated state lives entirely in CSS (see globals.css), gated on
 * the `reveal-enabled` class that a blocking inline script adds to <html>
 * before first paint — so there is no flash of hidden content, and if this
 * script never runs (or the user prefers reduced motion) everything stays
 * visible. This component only flips elements to `.reveal-in` once seen.
 */
export function ScrollReveal() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      // Trigger a touch before the element is fully in view so it lands
      // quickly and never feels like it's lagging behind the scroll.
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    const observe = () => {
      for (const child of Array.from(main.children)) {
        if (!child.classList.contains("reveal-in")) io.observe(child);
      }
    };

    observe();

    // App Router keeps the layout mounted across navigations and swaps only
    // main's children — re-scan when that happens.
    const mo = new MutationObserver(observe);
    mo.observe(main, { childList: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
