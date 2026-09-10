# Review gate setup (`/leave-a-review`)

How the post-stay review page works, and what has to be true for the feedback
it collects to actually reach someone.

---

## 1. Current state

Environment variables **have been added**, so the page is no longer in
log-only mode by default. What it does now depends entirely on whether those
variables are present in the environment that's actually running:

| Where | Behaviour |
| --- | --- |
| Local (`.env.local`) | Configured → sends |
| Production (host dashboard) | Configured → sends. **If the vars were only added locally, production is still log-only** — see section 3 |

**Confirm which mode production is in before trusting it.** The page looks
identical either way: the guest always sees the thank-you screen. Submit one
real test on the live URL and check the response body (section 5) — that is the
only reliable signal.

Two failure modes survive a correct-looking setup, and neither is visible in
the UI:

- Vars set locally but **not** in the host dashboard → production silently
  discards feedback.
- `RESEND_FROM` on an **unverified domain** → the send fails, the guest still
  sees a thank-you. See section 6.

If delivery is off for either reason, submissions are written to the server log
and then dropped. Nothing is queued, stored, or retried — there is no database
behind this, so anything submitted while it's misconfigured is lost.

The 5-star path to Google needs no configuration and works regardless.

| Path | Status |
| --- | --- |
| 5 stars → Google review | ✅ Working, no configuration needed |
| 1–4 stars → private feedback | ⚙️ Configured — verify per section 5 |

---

---

## 2. Turning on email

### 2.1 Create a Resend account

Sign up at [resend.com](https://resend.com). The free tier is enough for this —
review feedback is low volume.

### 2.2 Add and verify the sending domain

In the Resend dashboard: **Domains → Add Domain**, and enter the domain you
want to send from (e.g. `stayarcadia.com`).

Resend gives you a set of **DNS records** (DKIM, plus SPF/MX entries) to add
wherever the domain's DNS is hosted — the registrar or whoever manages the
nameservers.

> **This is the step that actually gates everything.** Until the domain shows
> **Verified** in Resend, sends will be rejected no matter how correctly the
> environment variables are set. DNS propagation is usually minutes but can
> take up to 48 hours. Don't move on until Resend shows a green Verified badge.

If you'd rather not touch DNS yet, you can test with Resend's shared
`onboarding@resend.dev` sender, but it can only deliver to the email address
that owns the Resend account. It is not suitable for production.

### 2.3 Generate an API key

**API Keys → Create API Key**. Sending permission is all it needs. Copy it
immediately — Resend shows the full key once. It starts with `re_`.

### 2.4 Set the environment variables

| Variable | Value | Required |
| --- | --- | --- |
| `RESEND_API_KEY` | The `re_...` key from 2.3 | Yes |
| `RESEND_FROM` | Sender address, **must be on the verified domain** from 2.2 — e.g. `reviews@stayarcadia.com`. A display name works too: `Arcadia Hotel <reviews@stayarcadia.com>` | Yes |
| `REVIEW_FEEDBACK_TO` | Internal inbox that receives guest feedback and follows up — e.g. `info@stayarcadia.com` | Yes |
| `REVIEW_FEEDBACK_WEBHOOK_URL` | Optional. Each submission is also POSTed here as JSON, for a CRM or Zapier/Make automation | No |

All three required vars must be present. A key with no `REVIEW_FEEDBACK_TO` is
not treated as configured, and the page stays in log-only mode.

These are deliberately **review-specific** variables. The code will not fall
back to any general contact-form credentials, because an unhappy guest's
complaint must never flow into the new-lead workflow. Please don't "simplify"
this by pointing it at a shared inbox variable.

---

## 3. Where to set them

You need to do this in **two places**.

### Locally — `.env.local`

Copy `.env.example` to `.env.local` in the project root and fill in the values:

```bash
cp .env.example .env.local
```

Restart `npm run dev` afterwards. Env vars are read at request time, but the
dev server only loads the file on boot.

### Production — the host's dashboard

Add the same variables in the hosting provider's environment settings
(Vercel: **Project → Settings → Environment Variables**), then **redeploy**.
Most hosts only apply new env vars to new deployments.

> ⚠️ **`.env.local` is gitignored and does not deploy.** Setting the variables
> locally changes nothing in production. If you only do the local half,
> production stays in log-only mode and live guest feedback keeps getting
> discarded — which is the exact failure this doc exists to prevent.

Never commit real keys. `.env.example` holds empty placeholders only.

---

## 4. The Google review link

The 5-star branch sends guests to `GOOGLE_REVIEW_URL`, defined in
[`src/lib/site.ts`](../src/lib/site.ts) alongside the phone, address, and social
links. It is a plain constant so any future review CTA can import it:

```ts
import { GOOGLE_REVIEW_URL } from "@/lib/site";
```

The current value is a real Arcadia Hotel short link:
`https://g.page/r/CU90pTYiW7rnEBM/review`

### Getting the link from Google Business Profile

If it ever needs replacing:

1. Sign in to [business.google.com](https://business.google.com) with the
   account that manages the listing.
2. Select the Arcadia Hotel location.
3. Choose **Ask for reviews** (older dashboards: **Get more reviews**).
4. Copy the short link it offers — it looks like
   `https://g.page/r/<id>/review`.

Paste it into `GOOGLE_REVIEW_URL`. It must be the **review deep link**, ending
in `/review` — the plain listing or Maps URL drops the guest on the profile
without opening the review dialog, which measurably costs reviews.

Verify by opening it in a logged-out browser: it should land on the listing with
the star-rating dialog already open.

---

## 5. How to verify it works

Once the vars are set and the app restarted/redeployed:

1. Open `/leave-a-review` (the older `/review` URL redirects here).
2. Click **4 stars** — you should get "What would have made it five stars?".
3. Fill in the form and submit. You should see "Thank you — we hear you."
4. Check the `REVIEW_FEEDBACK_TO` inbox. The email subject leads with the
   rating so it's triageable at a glance:
   `Guest Feedback (4 of 5) — Jane Smith`
5. Hit **Reply** on that email. It should address the *guest*, not the site —
   reply-to is set to their address.

### Confirming which mode you're in

The form's POST to `/api/review-feedback` returns a `delivery` field. Open the
browser devtools **Network** tab, submit, and look at the response:

| Response | Meaning |
| --- | --- |
| `{"delivery":"not configured"}` | Still log-only. Vars missing — recheck section 3 |
| `{"delivery":"sent"}` | Every configured channel delivered |
| `{"delivery":"partial"}` | One channel worked, another failed — see logs |

### When a submission doesn't arrive

Check the **server logs**, not the browser console — delivery is server-side.
On Vercel: **Project → Logs**, filtered to the `/api/review-feedback` function.
Locally: the `npm run dev` terminal.

Every log line is prefixed `[review-feedback]`:

- `No delivery configured` → the vars aren't reaching the running app.
  In production, confirm you redeployed after adding them.
- `Resend send failed` → the API rejected it. The message is included; the
  usual cause is an unverified `RESEND_FROM` domain (see section 6).
- `Webhook POST failed` → the CRM endpoint returned a non-2xx status.
- `Every configured channel failed` → nothing got through. **The full
  submission is written to the log on this line**, so the guest's note can be
  recovered by hand.

---

## 6. A failure mode worth knowing

**If `RESEND_FROM` is on an unverified domain, the send fails silently from the
guest's point of view.**

They complete the form and get the normal "Thank you — we hear you." screen.
The API still answers `200`, because the guest did nothing wrong and a scary
error would just lose the feedback and annoy them further. But no email is
delivered, and the only trace is a `[review-feedback] Resend send failed` line
in the server logs.

Nothing in the UI will ever tell you this is happening.

So: **after any change to `RESEND_FROM` or the Resend domain, send yourself one
real test submission and confirm it lands** (section 5). That is the only
reliable check. The same applies to a rotated API key.

---

## 7. How the page is wired

| Concern | Location |
| --- | --- |
| Page + metadata (`noindex, nofollow`) | [`src/app/leave-a-review/page.tsx`](../src/app/leave-a-review/page.tsx) |
| Star gate, both branches, form UI | [`src/app/leave-a-review/review-gate.tsx`](../src/app/leave-a-review/review-gate.tsx) |
| Validation + response shape | [`src/app/api/review-feedback/route.ts`](../src/app/api/review-feedback/route.ts) |
| Email/webhook delivery, subject, logging | [`src/lib/review-feedback.ts`](../src/lib/review-feedback.ts) |
| `GOOGLE_REVIEW_URL`, `STAY_TYPES`, contact details | [`src/lib/site.ts`](../src/lib/site.ts) |
| `/review` → `/leave-a-review` redirect | [`next.config.ts`](../next.config.ts) |
| Sitemap exclusion | [`next-sitemap.config.js`](../next-sitemap.config.js) |

Notes for whoever picks this up next:

- The page is **not** in the header or footer nav, and is excluded from the
  sitemap and marked `noindex, nofollow`. It's a link you send, not a page
  Google should surface. Keep it that way.
- Only a **5-star** rating routes to Google. 1–4 stars go to the private form,
  and the 4-star copy is intentionally softer than the 1–3 star copy.
- The API rejects a 5-star POST — that rating never uses the form.
- **Stay type** options come from `STAY_TYPES` in `src/lib/site.ts`. Update that
  list when the room lineup or packages change; the API validates against it.
