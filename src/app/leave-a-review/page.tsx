import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ReviewGate } from "./review-gate";

// Utility landing we send guests after checkout, also reached from in-room /
// front-desk QR codes (the older /review URL redirects here). It's a private
// link, not a page Google should surface, so flag it noindex + nofollow via the
// shared metadata helper. Also excluded from the sitemap in
// next-sitemap.config.js, and deliberately absent from the header and footer nav.
export const metadata: Metadata = pageMeta({
  title: "How Was Your Stay?",
  description:
    "Tell us about your stay at Arcadia Hotel. Loved it? Leave us a review. Something fell short? Let us know so we can make it right.",
  path: "/leave-a-review",
  noindex: true,
  nofollow: true,
});

export default function ReviewPage() {
  return <ReviewGate />;
}
