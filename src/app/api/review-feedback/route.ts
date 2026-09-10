// POST target for the private feedback branch of the /leave-a-review gate.
//
// Always answers 200 once the payload is valid, even with no delivery
// configured — the guest has done their part and shouldn't see an error
// because our env vars are missing. The response body reports what actually
// happened via `delivery` so the state is visible in the network tab.
import { deliverFeedback, type FeedbackSubmission } from "@/lib/review-feedback";

/** Trim and cap, so a pasted essay can't blow up the email or the log. */
function readField(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;

  const rating = Number(payload.rating);
  const firstName = readField(payload.firstName, 100);
  const lastName = readField(payload.lastName, 100);
  const email = readField(payload.email, 200);
  const phone = readField(payload.phone, 40);
  const message = readField(payload.message, 5000);

  const errors: string[] = [];

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.push("rating must be a whole number from 1 to 5.");
  }
  // 5-star guests go to Google, so they never post here.
  if (rating === 5) {
    errors.push("A 5-star rating doesn't use the private feedback form.");
  }
  if (!firstName) errors.push("firstName is required.");
  if (!lastName) errors.push("lastName is required.");
  // Deliberately loose: shape only. Real validation is the reply bouncing.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email is required.");
  }
  if (!message) errors.push("message is required.");

  if (errors.length > 0) {
    return Response.json({ error: errors.join(" ") }, { status: 400 });
  }

  const submission: FeedbackSubmission = {
    rating,
    firstName,
    lastName,
    email,
    phone,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const result = await deliverFeedback(submission);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    // Everything configured failed. The submission is already in the server
    // log (deliverFeedback writes it before throwing), so tell the client the
    // truth rather than a silent success.
    console.error("[review-feedback] Delivery failed for a valid submission.", error);
    return Response.json(
      { error: "We couldn't send that just now. Please call us instead." },
      { status: 502 },
    );
  }
}
