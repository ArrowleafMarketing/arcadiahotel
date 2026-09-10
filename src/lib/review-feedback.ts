// lib/review-feedback.ts
// Delivery for the private feedback captured by the /leave-a-review gate.
//
// Two independent channels, both opt-in via env vars: a Resend email to the
// team and an optional webhook for a CRM. Whatever isn't configured is simply
// skipped, so the module is inert until the keys exist — see
// docs/leave-a-review-setup.md.
//
// Deliberately NO fallback to any general contact-form credentials. An unhappy
// guest's complaint must never drift into the new-lead workflow, so this reads
// review-specific vars only. Don't "fix" that.
import { CONTACT, SITE_NAME } from "@/lib/site";

export type FeedbackSubmission = {
  rating: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  stayType: string;
  message: string;
  submittedAt: string;
};

/** "not configured" = nothing was set up, so the note was logged and dropped. */
export type DeliveryStatus = "sent" | "partial" | "not configured";

export type DeliveryResult = {
  delivery: DeliveryStatus;
  /** Per-channel outcome, for the server log and the response body. */
  channels: { email: ChannelOutcome; webhook: ChannelOutcome };
};

type ChannelOutcome = "skipped" | "ok" | "failed";

const RATING_LABELS: Record<number, string> = {
  1: "Very disappointed",
  2: "Disappointed",
  3: "It was okay",
  4: "Happy with it",
  5: "Couldn't be happier",
};

export function ratingLabel(rating: number): string {
  return RATING_LABELS[rating] ?? "Unrated";
}

/**
 * Reads config fresh on each call rather than at module load, so adding env
 * vars to the host only needs a restart — never a code change.
 */
function readConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = process.env.REVIEW_FEEDBACK_TO?.trim();
  const webhookUrl = process.env.REVIEW_FEEDBACK_WEBHOOK_URL?.trim();

  return {
    // Email needs all three to be meaningful; a key with no recipient is not
    // a configured channel.
    email: apiKey && from && to ? { apiKey, from, to } : null,
    webhook: webhookUrl ? { url: webhookUrl } : null,
  };
}

function fullName(submission: FeedbackSubmission): string {
  return `${submission.firstName} ${submission.lastName}`.trim();
}

/** Subject leads with the rating so it's triageable from the inbox list. */
export function feedbackSubject(submission: FeedbackSubmission): string {
  return `Guest Feedback (${submission.rating} of 5) — ${fullName(submission)}`;
}

function feedbackText(submission: FeedbackSubmission): string {
  return [
    `${submission.rating} of 5 — ${ratingLabel(submission.rating)}`,
    "",
    `Name:       ${fullName(submission)}`,
    `Email:      ${submission.email}`,
    `Phone:      ${submission.phone || "—"}`,
    `Stay type:  ${submission.stayType || "—"}`,
    `Submitted:  ${submission.submittedAt}`,
    "",
    "What could we have done better?",
    submission.message,
    "",
    `— Sent by the ${SITE_NAME} review gate at /leave-a-review`,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function feedbackHtml(submission: FeedbackSubmission): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#8b8d92;font-size:13px;">${label}</td>` +
    `<td style="padding:4px 0;color:#111111;font-size:14px;">${escapeHtml(
      value || "—",
    )}</td></tr>`;

  return `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;">
  <p style="margin:0 0 4px;font-size:20px;color:#111111;">
    ${submission.rating} of 5 — ${escapeHtml(ratingLabel(submission.rating))}
  </p>
  <p style="margin:0 0 20px;font-size:13px;color:#8b8d92;">
    Private feedback from the ${escapeHtml(SITE_NAME)} review gate
  </p>
  <table style="border-collapse:collapse;margin-bottom:20px;">
    ${row("Name", fullName(submission))}
    ${row("Email", submission.email)}
    ${row("Phone", submission.phone)}
    ${row("Stay type", submission.stayType)}
    ${row("Submitted", submission.submittedAt)}
  </table>
  <p style="margin:0 0 6px;font-size:13px;color:#8b8d92;">
    What could we have done better?
  </p>
  <p style="margin:0;padding:14px 16px;background:#fafaf8;border:1px solid rgba(0,0,0,0.08);border-radius:12px;font-size:14px;line-height:1.6;color:#111111;white-space:pre-wrap;">${escapeHtml(
    submission.message,
  )}</p>
</div>`;
}

async function sendEmail(
  submission: FeedbackSubmission,
  config: NonNullable<ReturnType<typeof readConfig>["email"]>,
): Promise<void> {
  // Imported lazily so an unconfigured deploy never pays to load the SDK.
  const { Resend } = await import("resend");
  const resend = new Resend(config.apiKey);

  const { error } = await resend.emails.send({
    from: config.from,
    to: [config.to],
    // Replying in the inbox goes straight back to the guest.
    replyTo: submission.email,
    subject: feedbackSubject(submission),
    text: feedbackText(submission),
    html: feedbackHtml(submission),
  });

  // The SDK reports API failures in `error` rather than throwing — the most
  // common being a RESEND_FROM on an unverified domain.
  if (error) {
    throw new Error(`${error.name ?? "resend_error"}: ${error.message}`);
  }
}

async function sendWebhook(
  submission: FeedbackSubmission,
  config: { url: string },
): Promise<void> {
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "review-gate",
      site: SITE_NAME,
      ...submission,
      ratingLabel: ratingLabel(submission.rating),
    }),
  });

  if (!response.ok) {
    throw new Error(`webhook responded ${response.status}`);
  }
}

/**
 * Attempts every configured channel. Succeeds if at least one does; only fails
 * when every configured channel failed. With nothing configured the submission
 * is logged in full and reported as "not configured" — the guest still gets a
 * clean thank-you, but the note goes nowhere.
 */
export async function deliverFeedback(
  submission: FeedbackSubmission,
): Promise<DeliveryResult> {
  const config = readConfig();
  const channels: DeliveryResult["channels"] = {
    email: "skipped",
    webhook: "skipped",
  };

  if (!config.email && !config.webhook) {
    console.warn(
      "[review-feedback] No delivery configured — logging and discarding this submission. " +
        "Set RESEND_API_KEY, RESEND_FROM and REVIEW_FEEDBACK_TO (see docs/leave-a-review-setup.md).",
      { ...submission, ratingLabel: ratingLabel(submission.rating) },
    );
    return { delivery: "not configured", channels };
  }

  const attempts: Array<Promise<void>> = [];

  if (config.email) {
    attempts.push(
      sendEmail(submission, config.email).then(
        () => {
          channels.email = "ok";
        },
        (error: unknown) => {
          channels.email = "failed";
          console.error("[review-feedback] Resend send failed.", error);
        },
      ),
    );
  }

  if (config.webhook) {
    attempts.push(
      sendWebhook(submission, config.webhook).then(
        () => {
          channels.webhook = "ok";
        },
        (error: unknown) => {
          channels.webhook = "failed";
          console.error("[review-feedback] Webhook POST failed.", error);
        },
      ),
    );
  }

  await Promise.all(attempts);

  const outcomes = Object.values(channels);
  const anyOk = outcomes.includes("ok");
  const anyFailed = outcomes.includes("failed");

  if (!anyOk) {
    // Every configured channel failed — log the note so it isn't lost with the
    // request, then let the caller surface the failure.
    console.error(
      "[review-feedback] Every configured channel failed. Submission follows so it isn't lost.",
      { ...submission, ratingLabel: ratingLabel(submission.rating) },
    );
    throw new Error("All configured delivery channels failed.");
  }

  if (anyFailed) {
    console.warn(
      "[review-feedback] Delivered, but one channel failed. Reply-to guest directly: " +
        `${submission.email} / ${CONTACT.email}`,
      channels,
    );
    return { delivery: "partial", channels };
  }

  return { delivery: "sent", channels };
}
