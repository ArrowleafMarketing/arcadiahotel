"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/social-icons";
import { GOOGLE_REVIEW_URL } from "@/lib/site";

type Step = "choice" | "form" | "done";

export function ReviewGate() {
  const [step, setStep] = useState<Step>("choice");

  // The gate is a full-screen lightbox, so keep the page behind it from
  // scrolling while it's open. Restored on unmount (e.g. "Back to Arcadia").
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO(feedback-delivery): the form is presentational for now. Wire this up
    // to send the captured fields to us — either POST to a Next route handler
    // that emails info@stayarcadia.com, or forward to the Hosteeva API once
    // that endpoint is chosen. Read values via new FormData(event.currentTarget).
    setStep("done");
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
          {step === "choice" && (
            <ChoiceStep onNegative={() => setStep("form")} />
          )}
          {step === "form" && (
            <FeedbackForm
              onBack={() => setStep("choice")}
              onSubmit={handleSubmit}
            />
          )}
          {step === "done" && <ThankYou />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: the gate ---------- */

function ChoiceStep({ onNegative }: { onNegative: () => void }) {
  return (
    <div className="rounded-[24px] bg-white px-6 py-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
      <span className="eyebrow">Your Stay</span>

      <h1 className="mt-6 text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.055em] text-[#111111]">
        How was your stay?
      </h1>
      <p className="mx-auto mt-5 max-w-[440px] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        Your feedback helps us take care of the next guest. It only takes a
        moment.
      </p>

      <div className="mt-9 flex flex-col gap-4">
        {/* Positive → straight to Google. A real anchor so it works without JS. */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-[18px] border border-[#9ec29e] bg-[#bfd9bd] px-6 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.10)]"
        >
          <span className="flex items-center gap-4">
            <ThumbsUpIcon className="h-7 w-7 shrink-0 text-[#1f231f]" />
            <span>
              <span className="font-display block text-[1.15rem] font-medium tracking-[-0.02em] text-[#1f231f]">
                I had a great stay
              </span>
              <span className="mt-0.5 block text-[0.92rem] leading-snug text-[#3a463a]">
                Share it in a quick Google review
              </span>
            </span>
          </span>
          <span className="btn-arrow bg-[#1f231f] text-white transition-transform duration-300 group-hover:translate-x-1.5">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </a>

        {/* Negative → reveal the private feedback form. */}
        <button
          type="button"
          onClick={onNegative}
          className="group flex items-center justify-between gap-4 rounded-[18px] border border-black/[0.09] bg-white px-6 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_34px_rgba(0,0,0,0.08)]"
        >
          <span className="flex items-center gap-4">
            <ChatIcon className="h-7 w-7 shrink-0 text-[#111111]" />
            <span>
              <span className="font-display block text-[1.15rem] font-medium tracking-[-0.02em] text-[#111111]">
                Something fell short
              </span>
              <span className="mt-0.5 block text-[0.92rem] leading-snug text-[#8b8d92]">
                Tell us privately so we can make it right
              </span>
            </span>
          </span>
          <span className="btn-arrow bg-black text-white transition-transform duration-300 group-hover:translate-x-1.5">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Step 2: the private feedback form ---------- */

function FeedbackForm({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="rounded-[24px] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:px-12 sm:py-12">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-[0.92rem] tracking-[-0.02em] text-[#8b8d92] transition-colors hover:text-[#111111]"
      >
        <span aria-hidden="true">←</span> Back
      </button>

      <span className="eyebrow">Tell Us More</span>
      <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.055em] text-[#111111]">
        We&apos;d like to make it right
      </h2>
      <p className="mt-4 text-[clamp(1rem,1.3vw,1.14rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        This note comes straight to the Arcadia team — it isn&apos;t posted
        publicly. Share what happened and we&apos;ll follow up.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <Field label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
          />
        </Field>

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

        <Field label="What could we have done better?" htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={`${inputClass} resize-y`}
          />
        </Field>

        <button type="submit" className="btn btn-dark mt-2 self-start">
          Send to the team
          <span className="btn-arrow">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </form>
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
      <h2 className="mt-7 text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.06] tracking-[-0.055em] text-[#111111]">
        Thank you
      </h2>
      <p className="mx-auto mt-4 max-w-[440px] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.7] tracking-[-0.025em] text-[#7a7b77]">
        We&apos;ve received your note and someone from the Arcadia team will be
        in touch. We appreciate you giving us the chance to make it right.
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

/* ---------- Icons (match the site's inline-SVG convention) ---------- */

function ThumbsUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Z" />
      <path d="M7 11l4.2-7.2a1.6 1.6 0 0 1 3 .8V9h4.4a1.8 1.8 0 0 1 1.77 2.13l-1.2 6.4A2 2 0 0 1 17.2 20H7" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9Z" />
      <path d="M9 9.5h6M9 12.5h4" />
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
