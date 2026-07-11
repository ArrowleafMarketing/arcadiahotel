import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "Read the Arcadia Hotel privacy policy — how we collect, use, and protect your information, including SMS messaging terms and your privacy choices.",
  path: "/privacy-policy",
});

const providedInformation = [
  "Name",
  "Email address",
  "Phone number",
  "Payment details (processed securely through third-party systems; we do not store full card numbers)",
  "Reservation details",
  "Special requests or travel preferences",
  "Information provided through forms, emails, or phone calls",
];

const automaticInformation = [
  "Device and browser information",
  "IP address",
  "Pages visited, time spent, and interactions",
  "General location information",
  "Cookies, tags, and other tracking technologies",
];

const thirdPartyInformation = [
  "Online travel and booking platforms (e.g., Expedia, Booking.com)",
  "Payment processors",
  "Marketing and analytics tools (e.g., Google Analytics, Meta Pixel)",
];

const usesOfInformation = [
  "Process reservations and payments",
  "Provide customer service and support",
  "Communicate booking confirmations and stay-related updates",
  "Improve website performance and user experience",
  "Send marketing communications (with your consent, where required)",
  "Provide relevant advertising through platforms such as Google Ads",
  "Detect and prevent fraud or security threats",
  "Comply with legal and operational requirements",
];

const cookieUses = [
  "Improve website functionality",
  "Analyze website usage",
  "Personalize content and marketing",
  "Measure advertising effectiveness",
];

const sharingPartners = [
  "Reservation and payment processors",
  "Website hosting and IT providers",
  "Marketing and analytics partners",
  "Customer support tools",
  "Legal or regulatory authorities if required",
];

const smsUses = [
  "Reservation confirmations and updates",
  "Check-in instructions or stay-related notifications",
  "Customer service communications",
  "Promotional or marketing messages (only if you explicitly opt in)",
  "Event updates, offers, or follow-up messages",
];

const privacyChoices = [
  "Access your personal information",
  "Update or correct your information",
  "Delete your information (subject to legal obligations)",
  "Opt out of marketing emails",
  "Opt out of marketing text messages (as described above)",
];

function PrivacySectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-[clamp(2.25rem,3vw,3rem)] font-semibold tracking-[-0.05em] text-[#111111]">
      {children}
    </h2>
  );
}

function PrivacySubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[clamp(1.7rem,2vw,2.2rem)] font-semibold tracking-[-0.04em] text-[#111111]">
      {children}
    </h3>
  );
}

function PrivacyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[clamp(1.08rem,1.35vw,1.3rem)] leading-[1.75] tracking-[-0.025em] text-[#777874]">
      {children}
    </p>
  );
}

function PrivacyList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 list-disc space-y-3 pl-8 text-[clamp(1.08rem,1.35vw,1.3rem)] leading-[1.7] tracking-[-0.02em] text-[#777874] marker:text-[#9a9b97]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="flex min-h-[256px] items-center justify-center rounded-[22px] bg-[#656561] px-6 py-12 text-center sm:min-h-[300px]">
        <h1 className="text-[clamp(3.2rem,5.2vw,5rem)] font-light tracking-[-0.055em] text-white">
          Privacy Policy
        </h1>
      </section>

      <section className="px-4 py-18 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1040px]">
          <p className="text-[clamp(1.45rem,1.8vw,1.8rem)] font-semibold tracking-[-0.04em] text-[#111111]">
            Last Updated: 11/24/2025
          </p>

          <PrivacyParagraph>
            Arcadia Hotel ("we," "our," "us") is committed to protecting your
            privacy. This Privacy Policy explains what information we collect,
            how we use it, how we protect it, and the choices you have. By
            using our website, booking a stay, or interacting with us—including
            SMS text messaging—you agree to the terms of this Privacy Policy.
          </PrivacyParagraph>

          <PrivacySectionTitle>1. Information We Collect</PrivacySectionTitle>
          <PrivacySubTitle>A. Information You Provide to Us</PrivacySubTitle>
          <PrivacyParagraph>
            We collect information you voluntarily provide, including:
          </PrivacyParagraph>
          <PrivacyList items={providedInformation} />

          <PrivacySubTitle>B. Information Collected Automatically</PrivacySubTitle>
          <PrivacyParagraph>
            When you use our website, we may automatically collect:
          </PrivacyParagraph>
          <PrivacyList items={automaticInformation} />

          <PrivacySubTitle>C. Information From Third Parties</PrivacySubTitle>
          <PrivacyParagraph>
            We may receive information from:
          </PrivacyParagraph>
          <PrivacyList items={thirdPartyInformation} />
          <PrivacyParagraph>
            We only receive information relevant to providing or improving our
            services.
          </PrivacyParagraph>

          <PrivacySectionTitle>2. How We Use Your Information</PrivacySectionTitle>
          <PrivacyParagraph>We use collected information to:</PrivacyParagraph>
          <PrivacyList items={usesOfInformation} />
          <PrivacyParagraph>
            We <strong className="font-semibold text-[#111111]">do not</strong>{" "}
            sell personal information.
          </PrivacyParagraph>

          <PrivacySectionTitle>
            3. Cookies &amp; Tracking Technologies
          </PrivacySectionTitle>
          <PrivacyParagraph>
            We use cookies and similar technologies to:
          </PrivacyParagraph>
          <PrivacyList items={cookieUses} />
          <PrivacyParagraph>
            You can control cookies through your browser settings. Disabling
            cookies may affect your experience on our website.
          </PrivacyParagraph>

          <PrivacySectionTitle>4. Sharing Your Information</PrivacySectionTitle>
          <PrivacyParagraph>
            We may share your data with trusted third parties that help us
            operate our business, such as:
          </PrivacyParagraph>
          <PrivacyList items={sharingPartners} />
          <PrivacyParagraph>
            These third parties are only permitted to use your information as
            needed to perform their services.
          </PrivacyParagraph>

          <PrivacySectionTitle>5. SMS Text Messaging</PrivacySectionTitle>
          <PrivacySubTitle>How We Collect and Use Mobile Numbers</PrivacySubTitle>
          <PrivacyParagraph>
            When you provide your phone number—whether online, during booking,
            at check-in, or through forms—you agree that we may send SMS text
            messages related to:
          </PrivacyParagraph>
          <PrivacyList items={smsUses} />
          <PrivacyParagraph>
            Messages may be sent using an automated system.
            <br />
            <strong className="font-semibold text-[#111111]">
              Message frequency varies. Standard message and data rates may
              apply.
            </strong>
          </PrivacyParagraph>

          <PrivacySubTitle>Your Consent to Receive Messages</PrivacySubTitle>
          <PrivacyParagraph>
            By providing your phone number, you consent to receive SMS
            communications from Arcadia Hotel for the purposes listed above.
          </PrivacyParagraph>
          <PrivacyParagraph>
            Promotional SMS messages require explicit opt-in. You can still
            receive necessary reservation messages without opting into
            marketing.
          </PrivacyParagraph>

          <PrivacySubTitle>Opt-Out Instructions</PrivacySubTitle>
          <PrivacyParagraph>
            You may opt out of SMS messages at any time by replying:
          </PrivacyParagraph>
          <ul className="mt-5 list-disc space-y-3 pl-8 text-[clamp(1.08rem,1.35vw,1.3rem)] leading-[1.7] tracking-[-0.02em] text-[#777874] marker:text-[#9a9b97]">
            <li>
              <strong className="font-semibold text-[#111111]">STOP</strong> to
              cancel
            </li>
            <li>
              <strong className="font-semibold text-[#111111]">HELP</strong> for
              help
            </li>
          </ul>
          <PrivacyParagraph>
            Once you opt out, you will no longer receive marketing or general
            SMS messages, though we may still send essential messages required
            to complete your requests (such as reservation confirmations).
          </PrivacyParagraph>

          <PrivacySubTitle>Data Use &amp; Restrictions</PrivacySubTitle>
          <ul className="mt-5 list-disc space-y-3 pl-8 text-[clamp(1.08rem,1.35vw,1.3rem)] leading-[1.7] tracking-[-0.02em] text-[#777874] marker:text-[#9a9b97]">
            <li>
              We <strong className="font-semibold text-[#111111]">do not sell, rent, or share</strong> your phone number with any third party for their marketing.
            </li>
            <li>
              Your phone number is used only for Arcadia Hotel communications
              or by service providers who assist in delivering messages on our
              behalf.
            </li>
            <li>
              All SMS data is stored securely and handled in accordance with
              this Privacy Policy.
            </li>
          </ul>

          <PrivacySectionTitle>6. Data Security</PrivacySectionTitle>
          <PrivacyParagraph>
            We use administrative, technical, and physical safeguards to
            protect your information from unauthorized access, disclosure, or
            misuse. While no system is completely secure, we work to protect
            your data and review our security practices regularly.
          </PrivacyParagraph>

          <PrivacySectionTitle>7. Your Privacy Choices</PrivacySectionTitle>
          <PrivacyParagraph>You may request to:</PrivacyParagraph>
          <PrivacyList items={privacyChoices} />
          <PrivacyParagraph>
            To submit a request, contact us at:
            <br />
            info@stayarcadia.com
          </PrivacyParagraph>

          <PrivacySectionTitle>8. Children's Privacy</PrivacySectionTitle>
          <PrivacyParagraph>
            Our website and services are not directed to children under 16. We
            do not knowingly collect personal information from children.
          </PrivacyParagraph>

          <PrivacySectionTitle>9. Third-Party Links</PrivacySectionTitle>
          <PrivacyParagraph>
            Our website may contain links to third-party sites. We are not
            responsible for their content or privacy practices. We recommend
            reviewing their privacy policies before providing personal
            information.
          </PrivacyParagraph>

          <PrivacySectionTitle>
            10. Changes to This Privacy Policy
          </PrivacySectionTitle>
          <PrivacyParagraph>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated "Last Updated" date at
            the top.
          </PrivacyParagraph>

          <PrivacySectionTitle>11. Contact Us</PrivacySectionTitle>
          <PrivacyParagraph>
            If you have any questions about this Privacy Policy or your
            personal information, you may contact us at:
          </PrivacyParagraph>
          <PrivacyParagraph>
            <strong className="font-semibold text-[#111111]">Arcadia Hotel</strong>
            <br />
            3433 W Chinden Blvd
            <br />
            Boise, ID 83714
            <br />
            Email:{" "}
            <strong className="font-semibold text-[#111111]">
              info@stayarcadia.com
            </strong>
            <br />
            Phone:{" "}
            <strong className="font-semibold text-[#111111]">
              (208) 510-0504
            </strong>
          </PrivacyParagraph>
        </div>
      </section>
    </>
  );
}
