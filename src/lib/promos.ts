// Scheduled promo popups.
//
// Each entry owns its own date window, copy, and backdrop, and the popup shows
// whichever one is live today — so campaigns hand off to each other without a
// code change. Adding next month's promo means appending an entry here.
//
// Keep the list in chronological order. Windows shouldn't overlap; if two ever
// do, the earlier entry wins.

/** Banner photo across the top of the card. Optional — a campaign without one
 *  renders as a text-only card. */
export type PromoImage = { src: string; alt: string };

export type Promo = {
  /** Stable slug. Namespaces the once-per-session flag and the preview link. */
  id: string;
  code: string;
  /** Local midnight on the first day it should appear. */
  start: Date;
  /** Last moment it should appear — use 23:59:59 on the final day. */
  end: Date;
  eyebrow: string;
  headline: string;
  subtext: string;
  cta: string;
  image?: PromoImage;
  /** Exact pathnames the popup may appear on. */
  paths: string[];
};

// Month is 0-indexed: 8 is September.
export const PROMOS: Promo[] = [
  {
    id: "artpk26a",
    code: "ARTPK26A",
    start: new Date(2026, 8, 3),
    end: new Date(2026, 8, 13, 23, 59, 59),
    eyebrow: "Art in the Park",
    headline: "10% Off Your Art in the Park Weekend",
    subtext:
      "Julia Davis Park fills with local artists Sep 11–13 — book your weekend and get a complimentary artist print with your stay.",
    cta: "Book Now",
    image: {
      src: "/assets/art-in-the-park.jpg",
      alt: "Crowds browsing artist tents under the trees at Art in the Park",
    },
    paths: ["/", "/book"],
  },
  {
    id: "hydepk26",
    code: "HYDEPK26",
    start: new Date(2026, 8, 14),
    end: new Date(2026, 8, 20, 23, 59, 59),
    eyebrow: "Hyde Park Street Fair",
    headline: "10% Off Your Hyde Park Street Fair Weekend",
    subtext:
      "North End makers, food, and live music Sep 18–20 — book your weekend and get a neighborhood walking map.",
    cta: "Book Now",
    // No photo for this one yet — add an `image` the way Art in the Park does
    // and the banner appears; without one the card is text-only.
    paths: ["/", "/book"],
  },
];

/** The promo whose window contains `now`, or null outside every window. */
export function activePromo(now: Date = new Date()): Promo | null {
  return PROMOS.find((promo) => now >= promo.start && now <= promo.end) ?? null;
}

/** Look up a promo by id, for the ?promo=<id> preview link. */
export function promoById(id: string): Promo | null {
  return PROMOS.find((promo) => promo.id === id) ?? null;
}
