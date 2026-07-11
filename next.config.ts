import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/expo/giveaway",
        destination: "/expo",
        permanent: true,
      },

      // Legacy WordPress blog posts (root-level slugs) -> new /blog/* routes
      {
        source: "/top-5-things-to-do-in-garden-city",
        destination: "/blog/top-5-things-to-do-in-garden-city",
        permanent: true,
      },
      {
        source: "/a-weekend-getaway-to-arcadia-hotel",
        destination: "/blog/a-weekend-getaway-to-arcadia-hotel",
        permanent: true,
      },
      {
        source: "/experience-garden-city-like-a-local",
        destination:
          "/blog/experience-garden-city-like-a-local-top-8-must-see-attractions-near-arcadia-hotel",
        permanent: true,
      },
      {
        source: "/reasons-travelers-love-arcadia-hotel",
        destination:
          "/blog/top-5-reasons-travelers-love-staying-at-arcadia-hotel-in-garden-city",
        permanent: true,
      },
      {
        source:
          "/selling-your-home-in-boise-idaho-make-it-stress-free-with-trusted-home-offer-and-arcadia-hotel-3-night-stay-for-free",
        destination:
          "/blog/sell-your-home-fast-and-stress-free-in-boise-idaho-arcadia-hotel-stay-trusted-home-offer",
        permanent: true,
      },

      // Legacy WordPress taxonomy archives (no equivalent) -> blog index
      {
        source: "/category/:slug*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tag/:slug*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/author/:slug*",
        destination: "/blog",
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
