/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      // Blog cannibalization cleanup — consolidate duplicate/near-duplicate posts
      // targeting the same head query onto a single canonical URL.
      { source: "/blog/ai-automation-stack-small-business", destination: "/blog/ai-automations-small-business", permanent: true },
      { source: "/blog/ai-automation-for-small-business-owners", destination: "/blog/ai-automations-small-business", permanent: true },
      { source: "/blog/ai-automation-for-small-business-guide", destination: "/blog/ai-automations-small-business", permanent: true },
      { source: "/blog/ai-automation-for-small-business", destination: "/blog/ai-automations-small-business", permanent: true },
      { source: "/blog/ecommerce-revenue-leaks-fix", destination: "/blog/ecommerce-revenue-leakage-fix", permanent: true },
      { source: "/blog/smilecrm-dental-clinics-uae", destination: "/blog/smilecrm-uae-dental-clinic-management", permanent: true },
      { source: "/blog/reduce-no-shows-dental-practice-automation", destination: "/blog/reduce-dental-no-shows-scheduling-workflows", permanent: true },
      // SmileCRM city pages — tier-2/3 cities collapse into the main /smilecrm
      // page to consolidate thin, low-traffic city landing pages.
      { source: "/smilecrm/jaipur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/surat", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/lucknow", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/kanpur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/nagpur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/indore", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/thane", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/bhopal", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/visakhapatnam", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/patna", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/vadodara", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/ghaziabad", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/ludhiana", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/agra", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/nashik", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/faridabad", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/meerut", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/rajkot", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/varanasi", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/aurangabad", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/amritsar", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/navi-mumbai", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/prayagraj", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/ranchi", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/howrah", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/coimbatore", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/jabalpur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/gwalior", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/vijayawada", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/jodhpur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/madurai", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/raipur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/kota", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/chandigarh", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/guwahati", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/solapur", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/hubballi", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/tiruchirappalli", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/bareilly", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/moradabad", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/mysuru", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/gurugram", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/noida", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/dehradun", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/jalandhar", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/mangaluru", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/kochi", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/thiruvananthapuram", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/bhubaneswar", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/salem", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/warangal", destination: "/smilecrm", permanent: true },
      { source: "/smilecrm/guntur", destination: "/smilecrm", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
