"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@/components/social-icons";
import { BOOKING_URL } from "@/lib/site";

/* Art in the Park — ARTPK26A.
   Promo for the Julia Davis Park festival weekend. It self-expires on
   CAMPAIGN_END, so nothing has to be torn out by hand afterward. To reuse this
   shell for the next campaign, change the constants below.

   Shown once per session, on whichever trigger comes first:
     "timed" — 5s after landing, on a plain dark lightbox.
     "exit"  — on exit intent, on the full park-festival backdrop.
   The richer backdrop is saved for exit intent, so the earlier and less
   invited interruption stays visually quiet. */

type Variant = "timed" | "exit";

const PROMO_CODE = "ARTPK26A";
const CAMPAIGN_START = new Date(2026, 8, 8); // Sep 8, 2026, local time
const CAMPAIGN_END = new Date(2026, 8, 13, 23, 59, 59); // through Sep 13
const STORAGE_KEY = "arcadia:artpk26a-popup";

// Homepage and booking page only.
const ALLOWED_PATHS = ["/", "/book"];

const TIMED_DELAY_MS = 5000;
// Short guard so a stray cursor flick as the page settles isn't read as intent
// to leave. Kept well under TIMED_DELAY_MS so a fast bounce still gets caught.
const EXIT_ARM_MS = 1000;

/* Hosteeva keeps its coupon field on the checkout step, which isn't reachable
   from a public URL, so there's no confirmed query parameter for pre-filling
   it. Set this to the parameter name once it's confirmed in the Hosteeva
   dashboard and the CTA starts carrying the code on its own; until then the
   card shows the code for the guest to paste at checkout. */
const PROMO_PARAM = "";

const BOOKING_HREF = PROMO_PARAM
  ? `${BOOKING_URL}?${PROMO_PARAM}=${PROMO_CODE}`
  : BOOKING_URL;

export function ArtInParkPopup() {
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant | null>(null);

  // Guards the one-showing-per-session rule from inside the trigger callbacks,
  // which would otherwise race each other on a fast bounce.
  const shownRef = useRef(false);

  const show = useCallback((next: Variant) => {
    if (shownRef.current) return;
    shownRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "seen");
    } catch {
      // Private browsing / storage disabled — it may show again next page.
    }
    setVariant(next);
  }, []);

  const close = useCallback(() => setVariant(null), []);

  useEffect(() => {
    if (!ALLOWED_PATHS.includes(pathname)) return;

    const now = new Date();
    if (now < CAMPAIGN_START || now > CAMPAIGN_END) return;

    if (shownRef.current) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Storage unavailable — fall through and show it.
    }

    const timedTimer = window.setTimeout(() => show("timed"), TIMED_DELAY_MS);

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, EXIT_ARM_MS);

    // Cursor leaves through the top of the viewport toward the tab bar /
    // address bar. relatedTarget is null only when it left the document.
    // Touch has no equivalent signal, so those visitors get the timed showing.
    const handleMouseOut = (event: MouseEvent) => {
      if (!armed || shownRef.current) return;
      if (event.clientY > 0 || event.relatedTarget) return;
      show("exit");
    };

    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.clearTimeout(timedTimer);
      window.clearTimeout(armTimer);
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
      aria-labelledby="promo-popup-title"
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 sm:px-6"
    >
      {/* Backdrop. Clicking it dismisses, so it's a button for keyboard/AT
          users too. */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default"
      >
        {variant === "exit" ? (
          <>
            <span className="absolute inset-0 bg-[#1b2411]" />
            <ParkScene />
            <span className="absolute inset-0 bg-black/25 backdrop-blur-[3px]" />
          </>
        ) : (
          <span className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        )}
      </button>

      <div className="promo-popup-card relative w-full max-w-[560px] overflow-hidden rounded-[24px] bg-[#faf9f5] px-6 py-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-12 sm:py-12">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#8b8d92] transition-colors hover:bg-black/5 hover:text-[#111111]"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <span className="eyebrow">Art in the Park</span>

        <h2
          id="promo-popup-title"
          className="mt-6 text-[clamp(1.7rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-[-0.055em] text-[#111111]"
        >
          10% Off Your Art in the Park Weekend
        </h2>

        <p className="mx-auto mt-5 max-w-[420px] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
          Julia Davis Park fills with local artists Sep 11–13 — book your
          weekend and get a complimentary artist print with your stay.
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
            href={BOOKING_HREF}
            onClick={close}
            className="btn btn-dark w-full sm:w-auto"
          >
            <span>Book Now</span>
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

/* Park-festival atmosphere: a late-summer canopy, a row of artist tents, and
   pennant bunting, all softened so the off-white card stays the focal point.
   Pure CSS/SVG rather than a photo — nothing to license, nothing to download.
   Each SVG scales uniformly off its own width, so nothing skews on mobile. */

const BOKEH = [
  { left: "8%", top: "18%", size: 120, color: "#cfe0a8", opacity: 0.7 },
  { left: "22%", top: "62%", size: 90, color: "#e8d48a", opacity: 0.6 },
  { left: "34%", top: "12%", size: 70, color: "#f2e6bb", opacity: 0.65 },
  { left: "48%", top: "78%", size: 140, color: "#a8bf70", opacity: 0.5 },
  { left: "61%", top: "26%", size: 100, color: "#bfd9bd", opacity: 0.6 },
  { left: "74%", top: "68%", size: 80, color: "#e8b07a", opacity: 0.5 },
  { left: "86%", top: "34%", size: 130, color: "#cfe0a8", opacity: 0.65 },
  { left: "14%", top: "88%", size: 95, color: "#e8d48a", opacity: 0.45 },
  { left: "92%", top: "82%", size: 75, color: "#a8bf70", opacity: 0.5 },
  { left: "56%", top: "48%", size: 60, color: "#f2e6bb", opacity: 0.45 },
] as const;

function ParkScene() {
  return (
    <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Sunlit-lawn gradient behind everything. */}
      <span className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_100%,#8a9a4a_0%,#47552a_38%,#1b2411_100%)]" />

      <TentRow />
      <Bunting />

      {BOKEH.map((light, index) => (
        <span
          key={index}
          className="promo-bokeh absolute rounded-full"
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

/* A row of artist tents along the bottom, peaks overlapping for depth. */
const TENTS = [
  { x: 90, w: 105, h: 74, opacity: 0.34 },
  { x: 295, w: 128, h: 92, opacity: 0.44 },
  { x: 500, w: 112, h: 80, opacity: 0.38 },
  { x: 705, w: 132, h: 95, opacity: 0.44 },
  { x: 910, w: 108, h: 74, opacity: 0.34 },
] as const;

function TentRow() {
  const base = 150;

  return (
    <svg
      viewBox="0 0 1000 220"
      className="absolute inset-x-0 bottom-0 w-full blur-[2px]"
      fill="none"
    >
      {TENTS.map((tent, index) => (
        <g key={index} opacity={tent.opacity}>
          <path
            d={`M${tent.x - tent.w} ${base} L${tent.x} ${base - tent.h} L${tent.x + tent.w} ${base} Z`}
            fill="#f3f1e6"
          />
          <line
            x1={tent.x - tent.w}
            y1={base}
            x2={tent.x - tent.w}
            y2="220"
            stroke="#f3f1e6"
            strokeWidth="2.5"
          />
          <line
            x1={tent.x + tent.w}
            y1={base}
            x2={tent.x + tent.w}
            y2="220"
            stroke="#f3f1e6"
            strokeWidth="2.5"
          />
        </g>
      ))}
    </svg>
  );
}

/* Two swags of pennant bunting. Flags hang from the same catenary the wire is
   drawn on, so they sit on the line rather than floating near it. */
const PENNANT_COLORS = ["#f2e6bb", "#bfd9bd", "#e8b07a", "#cfe0a8"];

function Bunting() {
  const swags = [
    { drop: 44, y: 20, opacity: 0.85, count: 17, size: 20 },
    { drop: 32, y: 66, opacity: 0.45, count: 13, size: 15 },
  ];

  return (
    <svg
      viewBox="0 0 1000 200"
      className="absolute inset-x-0 top-0 w-full blur-[1.5px]"
      fill="none"
    >
      {swags.map((swag, swagIndex) => {
        // y = apex + drop * sin(pi * t) gives a symmetric sag across the span.
        const sag = (t: number) => swag.y + swag.drop * Math.sin(Math.PI * t);
        const wire = Array.from({ length: 41 }, (_, i) => {
          const t = i / 40;
          return `${i === 0 ? "M" : "L"}${t * 1000} ${sag(t)}`;
        }).join(" ");

        return (
          <g key={swagIndex} opacity={swag.opacity}>
            <path d={wire} stroke="#f3f1e6" strokeWidth="1.2" opacity="0.5" />
            {Array.from({ length: swag.count }, (_, i) => {
              const t = (i + 0.5) / swag.count;
              const x = t * 1000;
              const y = sag(t);
              const half = swag.size / 2;
              return (
                <path
                  key={i}
                  d={`M${x - half} ${y} L${x + half} ${y} L${x} ${y + swag.size * 1.35} Z`}
                  fill={PENNANT_COLORS[i % PENNANT_COLORS.length]}
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
