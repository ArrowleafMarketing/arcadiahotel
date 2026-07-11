import type { Metadata } from "next";
import Script from "next/script";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Enter to Win a 2-Night Getaway",
  description:
    "Enter the Arcadia Hotel giveaway for your chance to win a 2-night boutique getaway in Garden City, Idaho — steps from Boise's wineries, breweries, and the river.",
  path: "/expo",
});

export default function ExpoPage() {
  return (
    <section className="bg-[var(--background)] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[720px]">
        <h1 className="text-center text-[clamp(2.4rem,4vw,3.6rem)] font-light tracking-[-0.055em] text-[#111111]">
          Enter to Win a 2-Night Getaway
        </h1>

        <div className="mt-10 h-[1150px] w-full sm:h-[950px] lg:h-[700px]">
          <iframe
            src="https://api.arrowleafmarketing.com/widget/form/itwiMCdpYF22OBZqi2Be"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
            id="inline-itwiMCdpYF22OBZqi2Be"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Giveaway"
            data-height="1150"
            data-layout-iframe-id="inline-itwiMCdpYF22OBZqi2Be"
            data-form-id="itwiMCdpYF22OBZqi2Be"
            title="Giveaway"
          />
        </div>
      </div>

      <Script src="https://api.arrowleafmarketing.com/js/form_embed.js" strategy="afterInteractive" />
    </section>
  );
}
