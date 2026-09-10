import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/expo/giveaway",
        destination: "/expo",
        permanent: true,
      },

      // The review gate lives at /leave-a-review. Keep the older /review URL
      // working — it's already on printed in-room QR cards.
      {
        source: "/review",
        destination: "/leave-a-review",
        permanent: true,
      },

      // Blog rebranded to "Explore Boise" -> /explore-boise/*
      {
        source: "/blog",
        destination: "/explore-boise",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/explore-boise/:slug",
        permanent: true,
      },

      // Legacy WordPress blog posts (root-level slugs) -> new /explore-boise/* routes
      {
        source: "/top-5-things-to-do-in-garden-city",
        destination: "/explore-boise/top-5-things-to-do-in-garden-city",
        permanent: true,
      },
      {
        source: "/a-weekend-getaway-to-arcadia-hotel",
        destination: "/explore-boise/a-weekend-getaway-to-arcadia-hotel",
        permanent: true,
      },
      {
        source: "/experience-garden-city-like-a-local",
        destination:
          "/explore-boise/experience-garden-city-like-a-local-top-8-must-see-attractions-near-arcadia-hotel",
        permanent: true,
      },
      {
        source: "/reasons-travelers-love-arcadia-hotel",
        destination:
          "/explore-boise/top-5-reasons-travelers-love-staying-at-arcadia-hotel-in-garden-city",
        permanent: true,
      },
      {
        source:
          "/selling-your-home-in-boise-idaho-make-it-stress-free-with-trusted-home-offer-and-arcadia-hotel-3-night-stay-for-free",
        destination:
          "/explore-boise/sell-your-home-fast-and-stress-free-in-boise-idaho-arcadia-hotel-stay-trusted-home-offer",
        permanent: true,
      },

      // Legacy WordPress taxonomy archives (no equivalent) -> Explore Boise index
      {
        source: "/category/:slug*",
        destination: "/explore-boise",
        permanent: true,
      },
      {
        source: "/tag/:slug*",
        destination: "/explore-boise",
        permanent: true,
      },
      {
        source: "/author/:slug*",
        destination: "/explore-boise",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
