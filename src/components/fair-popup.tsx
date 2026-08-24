"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@/components/social-icons";
import { BOOKING_URL } from "@/lib/site";

/* Western Idaho Fair — FAIR2026.
   Site-wide promo for the run of the campaign. It self-expires on
   CAMPAIGN_END, so nothing has to be torn out by hand afterward. To reuse this
   for the next campaign, change the constants below.

   Two showings per session, each at most once:
     "timed" — 5s after landing, on a plain dark lightbox. An early, low-key
               nudge, so it stays visually quiet.
     "exit"  — on exit intent, on the full fair-night backdrop. The last-chance
               pitch, so it gets the loud treatment.
   Booking suppresses both for the rest of the session. */

type Variant = "timed" | "exit";

const PROMO_CODE = "FAIR2026";
const CAMPAIGN_START = new Date(2026, 7, 10); // Aug 10, 2026, local time
const CAMPAIGN_END = new Date(2026, 7, 30, 23, 59, 59); // through Aug 30
const STORAGE_KEY = "arcadia:fair2026-popup";
const CONVERTED = "done";

// Don't stack the promo on top of the /review lightbox — that page is already
// a full-screen dialog and a second one over it reads as broken.
const EXCLUDED_PATHS = ["/review"];

const TIMED_DELAY_MS = 5000;
// Grace period before exit-intent is armed, so a stray cursor flick on arrival
// doesn't trigger it.
const ARM_DELAY_MS = 5000;
// Breathing room after any dismissal, so closing the timed popup and drifting
// toward the tab bar doesn't immediately summon the second one.
const REARM_DELAY_MS = 15000;
// Touch devices have no exit-intent signal; fall back to dwell + scroll depth.
const TOUCH_DWELL_MS = 25000;
const TOUCH_SCROLL_DEPTH = 0.35;

function readSeen(): Set<string> {
  try {
    return new Set(
      (sessionStorage.getItem(STORAGE_KEY) ?? "").split(",").filter(Boolean),
    );
  } catch {
    // Private browsing / storage disabled — the popup just may show again.
    return new Set();
  }
}

function markSeen(entry: string) {
  const seen = readSeen();
  seen.add(entry);
  try {
    sessionStorage.setItem(STORAGE_KEY, [...seen].join(","));
  } catch {
    // See readSeen.
  }
}

export function FairPopup() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant | null>(null);

  // Mirrored in refs so the trigger effect can read them without re-running
  // (and tearing down its listeners) every time the popup opens or closes.
  const variantRef = useRef<Variant | null>(null);
  const rearmAtRef = useRef(0);

  const show = useCallback((next: Variant) => {
    variantRef.current = next;
    setVariant(next);
  }, []);

  const close = useCallback(() => {
    if (variantRef.current) markSeen(variantRef.current);
    variantRef.current = null;
    rearmAtRef.current = Date.now() + REARM_DELAY_MS;
    setVariant(null);
  }, []);

  // CTA click — they're on their way to book, so don't pitch them again.
  const convert = useCallback(() => {
    markSeen(CONVERTED);
    close();
  }, [close]);

  useEffect(() => {
    if (EXCLUDED_PATHS.includes(pathname)) return;

    const now = new Date();
    if (now < CAMPAIGN_START || now > CAMPAIGN_END) return;

    const seen = readSeen();
    if (seen.has(CONVERTED)) return;

    const timers: number[] = [];

    // Only fire a trigger when nothing is already on screen and the post-
    // dismissal cooldown has elapsed.
    const canShow = () =>
      variantRef.current === null && Date.now() >= rearmAtRef.current;

    if (!seen.has("timed")) {
      timers.push(
        window.setTimeout(() => {
          if (canShow()) show("timed");
        }, TIMED_DELAY_MS),
      );
    }

    if (seen.has("exit")) return () => timers.forEach(window.clearTimeout);

    let armed = false;
    timers.push(
      window.setTimeout(() => {
        armed = true;
      }, ARM_DELAY_MS),
    );

    // Desktop: cursor leaves through the top of the viewport toward the tab
    // bar / address bar. relatedTarget is null only when it left the document.
    const handleMouseOut = (event: MouseEvent) => {
      if (!armed || !canShow()) return;
      if (event.clientY > 0 || event.relatedTarget) return;
      show("exit");
    };

    // Touch: no exit signal exists, so use engaged-then-idle as the proxy.
    let dwellReached = false;
    timers.push(
      window.setTimeout(() => {
        dwellReached = true;
      }, TOUCH_DWELL_MS),
    );

    const handleScroll = () => {
      if (!dwellReached || !canShow()) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= TOUCH_SCROLL_DEPTH) show("exit");
    };

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [pathname, show]);

  // Lock the page behind the dialog and wire up Escape while it's open.
  useEffect(() => {
    if (!variant) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKey);
    };
  }, [variant, close]);

  if (!variant) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fair-popup-title"
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 sm:px-6"
    >
      {/* Backdrop. Clicking it dismisses, so it's a button for keyboard/AT
          users too. The timed showing gets a plain lightbox; exit intent gets
          the full fair-night sky under a light blur. */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default"
      >
        {variant === "exit" ? (
          <>
            <span className="absolute inset-0 bg-[#2a1608]" />
            <FairLights />
            <span className="absolute inset-0 bg-black/25 backdrop-blur-[3px]" />
          </>
        ) : (
          <span className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        )}
      </button>

      <div className="fair-popup-card relative w-full max-w-[560px] overflow-hidden rounded-[24px] bg-[#faf9f5] px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-12 sm:py-12">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#8b8d92] transition-colors hover:bg-black/5 hover:text-[#111111]"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <span className="eyebrow">Western Idaho Fair</span>

        <h2
          id="fair-popup-title"
          className="mt-6 text-[clamp(1.7rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-[-0.055em] text-[#111111]"
        >
          Western Idaho Fair starts August 21. Arcadia is your base.
        </h2>

        <p className="mx-auto mt-5 max-w-[420px] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
          Fair by day, boutique hotel by night. 10 minutes from Expo Idaho. Code{" "}
          {PROMO_CODE} for fair week rate.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-[14px] border border-dashed border-[#9ec29e] bg-[#bfd9bd]/25 px-5 py-3">
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#7a7b77]">
            Code
          </span>
          <span className="font-display text-[1.15rem] font-medium tracking-[0.06em] text-[#1f231f]">
            {PROMO_CODE}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={BOOKING_URL}
            onClick={convert}
            className="btn btn-dark w-full sm:w-auto"
          >
            <span>Book with code {PROMO_CODE}</span>
            <span className="btn-arrow">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </a>

          <button
            type="button"
            onClick={close}
            className="text-[0.95rem] tracking-[-0.02em] text-[#8b8d92] transition-colors hover:text-[#111111]"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

/* Fair-lights atmosphere: a bokeh field of warm midway bulbs plus a ferris
   wheel arc, all softened so the off-white card stays the focal point. Pure
   CSS/SVG rather than a photo — nothing to license, nothing to download. */

const BOKEH = [
  { left: "8%", top: "18%", size: 120, color: "#ffb547", opacity: 0.85 },
  { left: "22%", top: "62%", size: 90, color: "#ff7a45", opacity: 0.7 },
  { left: "34%", top: "12%", size: 70, color: "#ffd88a", opacity: 0.75 },
  { left: "48%", top: "78%", size: 140, color: "#ff9a3c", opacity: 0.65 },
  { left: "61%", top: "26%", size: 100, color: "#ffc46b", opacity: 0.8 },
  { left: "74%", top: "68%", size: 80, color: "#ff6f61", opacity: 0.7 },
  { left: "86%", top: "34%", size: 130, color: "#ffb547", opacity: 0.8 },
  { left: "14%", top: "88%", size: 95, color: "#ffd88a", opacity: 0.6 },
  { left: "92%", top: "82%", size: 75, color: "#ff9a3c", opacity: 0.65 },
  { left: "56%", top: "48%", size: 60, color: "#fff0c9", opacity: 0.55 },
] as const;

function FairLights() {
  return (
    <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Summer-dusk sky gradient behind the lights. */}
      <span className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_100%,#b2621f_0%,#6d3512_38%,#2a1608_100%)]" />

      <FerrisWheel />
      <LightStrings />

      {BOKEH.map((light, index) => (
        <span
          key={index}
          className="fair-bokeh absolute rounded-full"
          style={{
            left: light.left,
            top: light.top,
            width: light.size,
            height: light.size,
            marginLeft: -light.size / 2,
            marginTop: -light.size / 2,
            background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
            opacity: light.opacity,
            filter: "blur(14px)",
            animationDelay: `${index * 0.7}s`,
          }}
        />
      ))}
    </span>
  );
}

function FerrisWheel() {
  // Spokes at even intervals with a bulb at each rim point.
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return { x: 100 + Math.cos(angle) * 78, y: 100 + Math.sin(angle) * 78 };
  });

  return (
    /* Parked off to the left so the card never covers it. On narrow screens the
       card wins and the bokeh carries the atmosphere on its own. */
    <svg
      viewBox="0 0 200 200"
      className="absolute left-[6%] top-1/2 h-[min(72vh,72vw)] w-[min(72vh,72vw)] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-[1.5px]"
      fill="none"
    >
      <circle cx="100" cy="100" r="78" stroke="#ffdda0" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="58" stroke="#ffcf8a" strokeWidth="0.9" />
      {spokes.map((point, index) => (
        <g key={index}>
          <line
            x1="100"
            y1="100"
            x2={point.x}
            y2={point.y}
            stroke="#ffc46b"
            strokeWidth="0.8"
          />
          <circle cx={point.x} cy={point.y} r="3.4" fill="#fff0c9" />
        </g>
      ))}
      <circle cx="100" cy="100" r="6" fill="#fff0c9" />
    </svg>
  );
}

/* Two swags of midway bulbs — one across the top, one lower and dimmer for
   depth. Bulb spacing follows the same catenary the wire is drawn on. */
function LightStrings() {
  const swags = [
    { drop: 46, y: 18, opacity: 0.75, bulbs: 22, radius: 2.6 },
    { drop: 34, y: 62, opacity: 0.4, bulbs: 16, radius: 2 },
  ];

  return (
    <svg
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-[38%] w-full blur-[1.5px]"
      fill="none"
    >
      {swags.map((swag, swagIndex) => {
        // y = apex + drop * sin(pi * t) gives a symmetric sag across the span.
        const sag = (t: number) => swag.y + swag.drop * Math.sin(Math.PI * t);
        const path = Array.from({ length: 41 }, (_, i) => {
          const t = i / 40;
          return `${i === 0 ? "M" : "L"}${t * 1000} ${sag(t)}`;
        }).join(" ");

        return (
          <g key={swagIndex} opacity={swag.opacity}>
            <path d={path} stroke="#ffcf8a" strokeWidth="1" opacity="0.5" />
            {Array.from({ length: swag.bulbs }, (_, i) => {
              const t = (i + 0.5) / swag.bulbs;
              return (
                <circle
                  key={i}
                  cx={t * 1000}
                  cy={sag(t)}
                  r={swag.radius}
                  fill={i % 3 === 0 ? "#ffd88a" : "#fff0c9"}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
