"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/social-icons";
import { activePromo, promoById, type Promo } from "@/lib/promos";
import { BOOKING_URL } from "@/lib/site";

/* Scheduled promo popup.

   The campaigns themselves live in @/lib/promos — this component just shows
   whichever one is live, so promos start and expire on their own and nothing
   has to be torn out by hand. Each is shown once per session, on whichever
   trigger comes first: 5s after landing, or on exit intent. Both open the same
   card over the same plain dark lightbox.

   To preview a campaign outside its window (including one that hasn't started
   yet), load any of its pages with ?promo=<id> — see PROMOS for the ids. That
   bypasses the dates and the once-per-session flag for that page load only;
   real visitors are still governed entirely by the campaign's window. */

const TIMED_DELAY_MS = 5000;
// Short guard so a stray cursor flick as the page settles isn't read as intent
// to leave. Kept well under TIMED_DELAY_MS so a fast bounce still gets caught.
const EXIT_ARM_MS = 1000;

const storageKey = (promo: Promo) => `arcadia:promo:${promo.id}`;

/* Hosteeva keeps its coupon field on the checkout step, which isn't reachable
   from a public URL, so there's no confirmed query parameter for pre-filling
   it. Set this to the parameter name once it's confirmed in the Hosteeva
   dashboard and every campaign's CTA starts carrying its code; until then the
   card shows the code for the guest to paste at checkout. */
const PROMO_PARAM = "";

function bookingHref(promo: Promo) {
  return PROMO_PARAM
    ? `${BOOKING_URL}?${PROMO_PARAM}=${promo.code}`
    : BOOKING_URL;
}

export function PromoPopup() {
  const pathname = usePathname();
  const [showing, setShowing] = useState<Promo | null>(null);

  // Guards the one-showing-per-session rule from inside the trigger callbacks,
  // which would otherwise race each other on a fast bounce.
  const shownRef = useRef(false);

  const close = useCallback(() => setShowing(null), []);

  useEffect(() => {
    // Preview link wins over the schedule, and skips the session flag so the
    // page can be reloaded repeatedly while checking copy.
    const previewId = new URLSearchParams(window.location.search).get("promo");
    const preview = previewId ? promoById(previewId) : null;
    const promo = preview ?? activePromo();
    if (!promo) return;

    if (!promo.paths.includes(pathname)) return;

    if (shownRef.current) return;
    if (!preview) {
      try {
        if (sessionStorage.getItem(storageKey(promo))) return;
      } catch {
        // Private browsing / storage disabled — fall through and show it.
      }
    }

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      if (!preview) {
        try {
          sessionStorage.setItem(storageKey(promo), "seen");
        } catch {
          // See above — it may simply show again on the next page.
        }
      }
      setShowing(promo);
    };

    const timedTimer = window.setTimeout(show, TIMED_DELAY_MS);

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
      show();
    };

    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.clearTimeout(timedTimer);
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [pathname]);

  // Lock the page behind the dialog and wire up Escape while it's open.
  useEffect(() => {
    if (!showing) return;

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
  }, [showing, close]);

  if (!showing) return null;

  const promo = showing;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-title"
      className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain"
    >
      {/* Clicking the lightbox dismisses, so it's a button for keyboard/AT
          users too. Fixed rather than absolute so it still covers the viewport
          when a tall card scrolls. */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      {/* Centers the card when it fits, scrolls with padding when it doesn't. */}
      <div className="relative flex min-h-full items-center justify-center px-4 py-8 sm:px-6">
        <div className="promo-popup-card relative w-full max-w-[560px] overflow-hidden rounded-[24px] bg-[#faf9f5] text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className={
              promo.image
                ? // Sits over the photo, so it carries its own contrast.
                  "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                : "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#8b8d92] transition-colors hover:bg-black/5 hover:text-[#111111]"
            }
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {/* A banner strip rather than a tall hero: the card still has to fit
              a laptop viewport once the copy and CTA are under it. */}
          {promo.image && (
            <div className="relative h-[170px] w-full sm:h-[210px]">
              <Image
                src={promo.image.src}
                alt={promo.image.alt}
                fill
                sizes="(max-width: 608px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          )}

          <div className="px-6 pb-10 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <span className="eyebrow">{promo.eyebrow}</span>

            <h2
              id="promo-popup-title"
              className="mt-6 text-[clamp(1.7rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-[-0.055em] text-[#111111]"
            >
              {promo.headline}
            </h2>

            <p className="mx-auto mt-5 max-w-[420px] text-[clamp(1rem,1.4vw,1.14rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
              {promo.subtext}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-[14px] border border-dashed border-[#9ec29e] bg-[#bfd9bd]/25 px-5 py-3">
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[#7a7b77]">
                Code
              </span>
              <span className="font-display text-[1.15rem] font-medium tracking-[0.06em] text-[#1f231f]">
                {promo.code}
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={bookingHref(promo)}
                onClick={close}
                className="btn btn-dark w-full sm:w-auto"
              >
                <span>{promo.cta}</span>
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
      </div>
    </div>
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
