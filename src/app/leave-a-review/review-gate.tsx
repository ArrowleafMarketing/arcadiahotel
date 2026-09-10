"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/social-icons";
import { CONTACT, GOOGLE_REVIEW_URL, STAY_TYPES } from "@/lib/site";

type Step = "rating" | "google" | "form" | "done";

/** Index 0 is unused so a rating doubles as its own array index. */
const RATING_LABELS = [
  "",
  "Very disappointed",
  "Disappointed",
  "It was okay",
  "Happy with it",
  "Couldn't be happier",
] as const;

export function ReviewGate() {
  const [step, setStep] = useState<Step>("rating");
  const [rating, setRating] = useState(0);

  // The gate is a full-screen lightbox, so keep the page behind it from
  // scrolling while it's open. Restored on unmount (e.g. "Back to Arcadia").
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // 5 stars go to Google; everything else opens the private form. Clicking a
  // star is the only submit — there's no separate button.
  function handleRate(value: number) {
    setRating(value);
    setStep(value === 5 ? "google" : "form");
  }

  function handleChangeRating() {
    setRating(0);
    setStep("rating");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How was your stay?"
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/70 backdrop-blur-sm"
    >
      {/* Dismiss → back to the site. Pinned regardless of card scroll. */}
      <Link
        href="/"
        aria-label="Close and return to Arcadia"
        className="fixed right-4 top-4 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <CloseIcon className="h-5 w-5" />
      </Link>

      {/* Centers the card when it fits; scrolls with padding when it doesn't. */}
      <div className="flex min-h-full items-center justify-center px-4 py-14 sm:px-6">
        <div className="w-full max-w-[620px]">
          {step === "rating" && <RatingStep onRate={handleRate} rating={rating} />}
          {step === "google" && <GoogleStep onChangeRating={handleChangeRating} />}
          {step === "form" && (
            <FeedbackForm
              rating={rating}
              onChangeRating={handleChangeRating}
              onDone={() => setStep("done")}
            />
          )}
          {step === "done" && <ThankYou />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: the rating ---------- */

function RatingStep({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (value: number) => void;
}) {
  // Whichever star the guest is pointing at or has tabbed to wins over the
  // committed rating, so the row previews before it commits.
  const [preview, setPreview] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const shown = preview || rating;

  // Arrow/Home/End move between stars like a real radio group. Focus follows,
  // which drives the fill and the label via onFocus.
  function handleKeyDown(event: React.KeyboardEvent, value: number) {
    const next = {
      ArrowRight: value + 1,
      ArrowDown: value + 1,
      ArrowLeft: value - 1,
      ArrowUp: value - 1,
      Home: 1,
      End: 5,
    }[event.key];

    if (!next) return;

    event.preventDefault();
    const clamped = Math.min(5, Math.max(1, next));
    buttonRefs.current[clamped]?.focus();
  }

  return (
    <div className="rounded-[24px] bg-white px-6 py-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
      <span className="eyebrow">Your Stay</span>

      <h1 className="mt-6 text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.055em] text-[#111111]">
        How was your stay?
      </h1>
      <p className="mx-auto mt-5 max-w-[440px] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        Your honest feedback helps us take care of the next guest — it only
        takes a few seconds.
      </p>

      <div
        role="radiogroup"
        aria-label="Rate your stay from 1 to 5 stars"
        className="mt-9 flex items-center justify-center gap-1.5 sm:gap-2.5"
        onMouseLeave={() => setPreview(0)}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            ref={(node) => {
              buttonRefs.current[value] = node;
            }}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} ${value === 1 ? "star" : "stars"} — ${
              RATING_LABELS[value]
            }`}
            // Roving tabindex: one stop for the whole group.
            tabIndex={rating === value || (rating === 0 && value === 1) ? 0 : -1}
            onClick={() => onRate(value)}
            onMouseEnter={() => setPreview(value)}
            onFocus={() => setPreview(value)}
            onBlur={() => setPreview(0)}
            onKeyDown={(event) => handleKeyDown(event, value)}
            className="rounded-full p-1.5 outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#9ec29e] focus-visible:ring-offset-2 sm:p-2"
          >
            <StarIcon
              filled={value <= shown}
              className="h-9 w-9 transition-colors duration-200 sm:h-11 sm:w-11"
            />
          </button>
        ))}
      </div>

      {/* Height reserved so revealing the label never shifts the card. */}
      <p
        aria-live="polite"
        className="mt-4 flex min-h-[1.75rem] items-center justify-center text-[1rem] font-medium tracking-[-0.02em] text-[#1f231f]"
      >
        {shown ? RATING_LABELS[shown] : ""}
      </p>
    </div>
  );
}

/* ---------- Step 2a: five stars → Google ---------- */

function GoogleStep({ onChangeRating }: { onChangeRating: () => void }) {
  return (
    <div className="rounded-[24px] bg-white px-6 py-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
      {/* Reflect the five stars back first, so the ask below reads as the other
          half of what they already started rather than a fresh request. */}
      <div className="flex items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((value) => (
          <StarIcon key={value} filled className="h-7 w-7 sm:h-8 sm:w-8" />
        ))}
      </div>

      <span className="eyebrow mt-7">One Last Step</span>

      <h1 className="mt-6 text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.06] tracking-[-0.055em] text-[#111111]">
        Would you share it on Google?
      </h1>
      <p className="mx-auto mt-5 max-w-[470px] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        Right now those five stars live only with us. Posting them on Google is
        what puts them in front of the next traveler deciding where to stay —
        and for a hotel our size, that means more than anything we could say
        about ourselves.
      </p>

      {/* The whole point of this screen. Full-width, tall, and heavier than any
          other control on the card so there's no question what to tap next. */}
      <div className="mt-9">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark w-full min-h-[4rem] gap-3 whitespace-nowrap px-5 text-[1.06rem] shadow-[0_12px_32px_rgba(0,0,0,0.18)] sm:min-h-[4.5rem] sm:gap-4 sm:px-7 sm:text-[1.2rem]"
        >
          <GoogleGlyph className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
          Leave a Google Review
          {/* Decorative only, and the label needs the width on small screens —
              so it earns its place from sm up, where there's room to spare. */}
          <span className="btn-arrow hidden p-1.5 sm:inline-flex">
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        </a>
        <p className="mt-3.5 text-[0.86rem] tracking-[-0.01em] text-[#a1a199]">
          Opens Google in a new tab — takes about 30 seconds
        </p>
      </div>

      <p className="mt-8 text-[0.92rem] leading-relaxed tracking-[-0.02em] text-[#8b8d92]">
        Thank you for staying with us — it genuinely makes our day.
      </p>

      <ChangeRatingLink onChangeRating={onChangeRating} />
    </div>
  );
}

/* ---------- Step 2b: one to four stars → private form ---------- */

function FeedbackForm({
  rating,
  onChangeRating,
  onDone,
}: {
  rating: number;
  onChangeRating: () => void;
  onDone: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  // Four stars means it mostly went well — don't accuse that guest of a
  // disaster. One to three gets the direct version.
  const nearMiss = rating === 4;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/review-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          stayType: data.get("stayType"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "That didn't go through.");
      }

      onDone();
    } catch (caught) {
      setStatus("error");
      setError(
        caught instanceof Error
          ? caught.message
          : "That didn't go through. Please try again.",
      );
    }
  }

  return (
    <div className="rounded-[24px] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-12">
      <span className="eyebrow">Tell Us More</span>

      <h1 className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.055em] text-[#111111]">
        {nearMiss ? "What would have made it five stars?" : "Tell us what went wrong"}
      </h1>
      <p className="mt-4 text-[clamp(1rem,1.3vw,1.14rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        {nearMiss
          ? "Glad it went well overall — but we'd rather hear what fell short so the next stay is perfect. This goes straight to the Arcadia team."
          : "We'd rather hear it directly so we can make it right. This goes straight to the Arcadia team — tell us what happened and we'll follow up."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" htmlFor="firstName">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Last name" htmlFor="lastName">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Phone (optional)" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Stay type (optional)" htmlFor="stayType">
          <select
            id="stayType"
            name="stayType"
            defaultValue=""
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238b8d92%22 stroke-width=%222%22 stroke-linecap=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px_18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
          >
            <option value="">Select one</option>
            {STAY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="What could we have done better?" htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={`${inputClass} resize-y`}
          />
        </Field>

        {status === "error" && (
          <p
            role="alert"
            className="rounded-[12px] border border-[#e5c2c2] bg-[#fbf3f3] px-4 py-3 text-[0.95rem] leading-relaxed text-[#8a3a3a]"
          >
            {error} You can also call us at{" "}
            <a href={`tel:${CONTACT.phoneE164}`} className="underline">
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-dark mt-2 self-start disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send to the team"}
          <span className="btn-arrow">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </form>

      <p className="mt-7 border-t border-black/[0.08] pt-6 text-[0.92rem] leading-relaxed tracking-[-0.02em] text-[#8b8d92]">
        Would rather talk it through? Call us at{" "}
        <a
          href={`tel:${CONTACT.phoneE164}`}
          className="font-medium text-[#111111] underline decoration-[#9ec29e] decoration-2 underline-offset-4"
        >
          {CONTACT.phoneDisplay}
        </a>
        .
      </p>

      <ChangeRatingLink onChangeRating={onChangeRating} />
    </div>
  );
}

/* ---------- Step 3: confirmation ---------- */

function ThankYou() {
  return (
    <div className="rounded-[24px] bg-white px-6 py-14 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#9ec29e] bg-[#bfd9bd]">
        <CheckIcon className="h-8 w-8 text-[#1f231f]" />
      </div>
      <h1 className="mt-7 text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.06] tracking-[-0.055em] text-[#111111]">
        Thank you — we hear you.
      </h1>
      <p className="mx-auto mt-4 max-w-[440px] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        Someone from the Arcadia team will follow up within one business day.
      </p>
      <p className="mt-5 text-[0.92rem] leading-relaxed tracking-[-0.02em] text-[#8b8d92]">
        Need us sooner? Reach us at{" "}
        <a
          href={`mailto:${CONTACT.email}`}
          className="font-medium text-[#111111] underline decoration-[#9ec29e] decoration-2 underline-offset-4"
        >
          {CONTACT.email}
        </a>
        .
      </p>
      <Link href="/" className="btn btn-green mt-8">
        Back to Arcadia
        <span className="btn-arrow">
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}

/* ---------- Shared bits ---------- */

const inputClass =
  "w-full rounded-[12px] border border-black/[0.12] bg-[#fafaf8] px-4 py-3 text-[1rem] tracking-[-0.01em] text-[#111111] outline-none transition-colors placeholder:text-[#a1a199] focus:border-[#9ec29e] focus:bg-white focus:ring-2 focus:ring-[#bfd9bd]/60";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-[0.82rem] font-medium uppercase tracking-[0.08em] text-[#8b8d92]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChangeRatingLink({ onChangeRating }: { onChangeRating: () => void }) {
  return (
    <button
      type="button"
      onClick={onChangeRating}
      className="mt-6 inline-flex items-center gap-2 text-[0.92rem] tracking-[-0.02em] text-[#8b8d92] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#111111]"
    >
      <span aria-hidden="true">←</span> Change my rating
    </button>
  );
}

/* ---------- Icons (match the site's inline-SVG convention) ---------- */

function StarIcon({
  filled,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "#bfd9bd" : "none"}
      stroke={filled ? "#9ec29e" : "#c9c9c2"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.2l2.7 5.6 6.1.86-4.45 4.3 1.06 6.06L12 17.2l-5.41 2.82 1.06-6.06L3.2 9.66l6.1-.86L12 3.2Z" />
    </svg>
  );
}

/* Google's four-color "G". Inline so there's no icon library and no remote
   asset — the button has to render before anything else loads. */
function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.74 0-10.6-3.87-12.34-9.08H4.34v5.7C7.96 41.07 15.4 46 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.66 28.17c-.44-1.32-.69-2.73-.69-4.17s.25-2.85.69-4.17v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.87l7.32-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.13l7.32 5.7c1.74-5.21 6.6-9.08 12.34-9.08Z"
      />
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
