import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ReviewGate } from "./review-gate";

// Utility landing reached from an in-room / front-desk QR code. It should never
// rank in search, so flag it noindex via the shared metadata helper.
export const metadata: Metadata = pageMeta({
  title: "How Was Your Stay?",
  description:
    "Tell us about your stay at Arcadia Hotel. Loved it? Leave us a review. Something fell short? Let us know so we can make it right.",
  path: "/review",
  noindex: true,
});

export default function ReviewPage() {
  return <ReviewGate />;
}
