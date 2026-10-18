import "./globals.css";
import WhatsAppFloat from "./WhatsAppFloat";

export const metadata = {
  title: "Free 3-Min AI Diagnostic: Find Your Automation Gaps | Delta Labs AI",
  description:
    "Take the free 3-minute AI diagnostic — score your business on 5 dimensions, find revenue leaks, get a custom automation roadmap for your dental clinic, gym, or SMB. No lock-in, no sales call.",
  keywords: [
    "free AI diagnostic for small business",
    "AI consulting for dental clinics",
    "AI automation for SMB",
    "free business automation audit",
    "AI tools for independent dental practice",
    "AI business consulting",
    "digital transformation consulting",
    "business operations consulting",
    "business diagnostic tool",
    "workflow automation",
    "CRM setup consulting",
    "AI agents for business",
    "business process automation",
    "small business AI tools",
  ],
  metadataBase: new URL("https://deltalabsai.com"),
  alternates: {
    canonical: "https://deltalabsai.com",
  },
  openGraph: {
    title: "AI Automation for Small Business | Free AI Diagnostic | Delta Labs AI",
    description:
      "AI automation for small businesses and dental clinics. Free 3-min AI diagnostic that scores 5 dimensions, finds revenue leaks, and gives your automation roadmap.",
    url: "https://deltalabsai.com",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI — AI-Powered Business Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Small Business | Free AI Diagnostic | Delta Labs AI",
    description:
      "AI automation for small businesses and dental clinics. Free 3-min AI diagnostic that scores 5 dimensions, finds revenue leaks, and gives your automation roadmap.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  other: {
    "theme-color": "#0F172A",
    "color-scheme": "light",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  verification: {},
  category: "Business Consulting",
};

// Enhanced JSON-LD with Organization + ProfessionalService + FAQPage for LLM/Perplexity visibility
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://deltalabsai.com/#organization",
  name: "Delta Labs AI",
  alternateName: "Delta Labs AI Consulting",
  description:
    "AI-powered business consulting for growing companies. We diagnose revenue leaks across 5 business dimensions, fix operations, implement CRM systems, and build AI automation for small and mid-sized businesses.",
  url: "https://deltalabsai.com",
  logo: {
    "@type": "ImageObject",
    url: "https://deltalabsai.com/logo.png",
    width: 400,
    height: 400,
  },
  image: "https://deltalabsai.com/og-image.png",
  sameAs: [
    "https://www.linkedin.com/company/delta-labs-ai-consulting",
    "https://www.facebook.com/profile.php?id=61588293766138",
    // ADD after creation: "https://www.google.com/maps?cid=<GBP_CID>",
    // ADD after creation: "https://www.crunchbase.com/organization/delta-labs-ai",
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  serviceType: [
    "AI Consulting",
    "Digital Transformation Consulting",
    "Business Process Automation",
    "CRM Setup and Implementation",
    "Revenue Optimization",
    "Operations Consulting",
    "Business Diagnostic Assessment",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Business Process Automation",
    "Digital Transformation",
    "CRM Implementation",
    "Revenue Optimization",
    "Small Business Operations",
    "AI Agents",
    "Workflow Automation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free 5-Dimension Business Diagnostic",
          description:
            "A free 3-minute assessment that scores your business across 5 dimensions including revenue, operations, technology, and team. Generates a radar chart with specific quick-win recommendations.",
          url: "https://deltalabsai.com/diagnostic",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Diagnostic Kit",
          description:
            "Self-serve Notion template for comprehensive business assessment with scoring framework",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Discovery Call",
          description:
            "30-minute consultation to review your diagnostic results and discuss specific recommendations for your business",
          url: "https://cal.com/ag-ventures-qbqxax/30min",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    url: "https://cal.com/ag-ventures-qbqxax/30min",
    availableLanguage: ["English"],
  },
};

// NOTE: FAQPage JSON-LD moved out of the root layout — it now lives on the
// home page (src/app/page.jsx) next to the visible FAQ accordion it describes,
// so it only emits on pages that actually show matching Q&A content.

// NOTE: removed the duplicate bare Organization node — the canonical entity is the
// single #organization ProfessionalService node (jsonLd above). Two conflicting
// Organization nodes (different description + LinkedIn trailing-slash) confused the
// entity graph. Keep ONE source of truth.

// Service schema for homepage
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Business Consulting",
  "provider": {
    "@type": "Organization",
    "name": "Delta Labs AI",
    "url": "https://deltalabsai.com",
  },
  "name": "AI Automation & Business Consulting",
  "description": "AI-powered business consulting for small and mid-sized businesses. We diagnose revenue leaks, fix broken operations, and build AI automation that runs while you sleep.",
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Delta Labs AI Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free 5-Dimension Business Diagnostic",
          "description": "A free 3-minute assessment scoring your business across 5 dimensions with radar chart and quick-win recommendations.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Automation Implementation",
          "description": "Custom AI agents, CRM setup, workflow automation, and process redesign for growing service businesses.",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SmileCRM for Dental Clinics",
          "description": "Purpose-built CRM for dental clinics with appointment automation, patient recall, review management, and WhatsApp follow-ups.",
        },
      },
    ],
  },
};

// BreadcrumbList schema for homepage

// WebSite schema for sitelinks search box
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Delta Labs AI",
  url: "https://deltalabsai.com",
  description:
    "AI-powered business consulting for growing companies. Free 5-dimension diagnostic, expert blog, and consulting services.",
  publisher: {
    "@type": "Organization",
    name: "Delta Labs AI",
    url: "https://deltalabsai.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0F172A" />
        {/* DM Sans from Google Fonts on every page EXCEPT /international, which self-hosts its own fonts (next/font) so that
            visitors from the UK and EU make no request to Google before they have chosen anything. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.pathname.indexOf('/international') !== 0) {
                var l1 = document.createElement('link'); l1.rel = 'preconnect'; l1.href = 'https://fonts.googleapis.com';
                var l2 = document.createElement('link'); l2.rel = 'preconnect'; l2.href = 'https://fonts.gstatic.com'; l2.crossOrigin = 'anonymous';
                var l3 = document.createElement('link'); l3.rel = 'stylesheet'; l3.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap';
                document.head.appendChild(l1); document.head.appendChild(l2); document.head.appendChild(l3);
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (window.location.pathname.indexOf('/international') === 0) return; // no analytics on the outreach page
                var s = document.createElement('script');
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-E8311XDVDX';
                s.async = true;
                document.head.appendChild(s);
                s.onload = function() {
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function(){dataLayer.push(arguments);}
                  window.gtag('js', new Date());
                  window.gtag('config', 'G-E8311XDVDX');
                };
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Cal.com Embed — popup + inline support site-wide, except /international (plain links there, no third-party load) */}
        <script dangerouslySetInnerHTML={{ __html: `
          if (window.location.pathname.indexOf('/international') !== 0) {
          (function (C, A, L) {
            var p = function (a, ar) { a.q.push(ar); };
            var d = C.document;
            C.Cal = C.Cal || function () {
              var cal = C.Cal; var ar = arguments;
              if (!cal.loaded) {
                cal.ns = {}; cal.q = cal.q || [];
                var s = d.createElement("script"); s.src = A; s.async = true;
                d.head.appendChild(s);
                cal.loaded = true;
              }
              if (ar[0] === L) {
                var api = function () { p(api, arguments); };
                var ns = ar[1]; api.q = api.q || [];
                if (typeof ns === "string") { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, [L, ns, ar[2]]); }
                else p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "30min", { origin: "https://cal.com" });
          Cal.ns["30min"]("ui", {
            styles: { branding: { brandColor: "#059669" } },
            hideEventTypeDetails: false,
            layout: "month_view"
          });

          // Global interceptor — catch ANY click on a cal.com link and open as popup instead
          function openCalPopup() {
            if (window.Cal && window.Cal.ns && window.Cal.ns["30min"]) {
              window.Cal.ns["30min"]("modal", { calLink: "ag-ventures-qbqxax/30min" });
            }
          }
          window.openCalPopup = openCalPopup;
          document.addEventListener("click", function(e) {
            var el = e.target.closest('a[href*="cal.com/ag-ventures"], a[href="#cal-book"], [data-cal-link]');
            if (el) {
              e.preventDefault();
              e.stopPropagation();
              if (window.gtag) window.gtag("event", "book_call_click");
              openCalPopup();
            }
          }, true);
          }
        `}} />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}

        <WhatsAppFloat />

      </body>
    </html>
  );
}
