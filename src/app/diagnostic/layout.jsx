export const metadata = {
  title: "Free 9-Dimension Business Diagnostic | Delta Labs AI",
  description:
    "Find out where your business is leaking revenue. Take Delta Labs AI's free 3-minute diagnostic and get your personalized automation roadmap.",
  keywords: [
    "free business diagnostic",
    "business health assessment",
    "9 dimension business score",
    "revenue leak analysis",
    "business operations assessment",
    "free business audit tool",
    "AI business diagnostic",
    "small business health check",
  ],
  alternates: {
    canonical: "https://deltalabsai.com/diagnostic",
  },
  openGraph: {
    title: "Free 9-Dimension Business Diagnostic | Delta Labs AI",
    description:
      "Score your business across 9 dimensions in 3 minutes. See exactly where you're losing revenue with our AI-powered radar chart analysis.",
    url: "https://deltalabsai.com/diagnostic",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI — Free 9-Dimension Business Diagnostic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 9-Dimension Business Diagnostic | Delta Labs AI",
    description:
      "Score your business across 9 dimensions in 3 minutes. See exactly where you're losing revenue.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// FAQ schema for the diagnostic page
const diagnosticFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the Delta Labs AI business diagnostic measure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The diagnostic scores your business across 9 dimensions: revenue engine, operations, technology, team, data practices, marketing, customer experience, financial health, and growth readiness. You receive a radar chart and a specific quick-win recommendation.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does the diagnostic take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The diagnostic takes approximately 3 minutes to complete. You answer a series of questions about your business operations and receive instant results with a visual scorecard.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the business diagnostic really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the 9-dimension business diagnostic is completely free with no credit card required. You get instant results including a radar chart, scores, and a personalized quick-win recommendation.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens after I complete the diagnostic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After completing the diagnostic, you receive your scores and a specific quick-win recommendation. You can optionally book a free 30-minute discovery call where a consultant walks through your results and builds a custom improvement plan.",
      },
    },
  ],
};

// BreadcrumbList for diagnostic page
const diagnosticBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://deltalabsai.com",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Free Business Diagnostic",
      "item": "https://deltalabsai.com/diagnostic",
    },
  ],
};

export default function DiagnosticLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticBreadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
