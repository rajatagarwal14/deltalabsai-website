export const metadata = {
  title: "Free AI Business Diagnostic for SMBs in India | Delta Labs AI",
  description:
    "Free AI diagnostic built for SMBs in India and worldwide. Score revenue, operations, team, technology and data, spot revenue leaks, and get your personalized automation roadmap.",
  keywords: [
    "AI diagnostic India",
    "business diagnostic India",
    "AI business assessment India",
    "free AI diagnostic for small business",
    "free business automation audit",
    "AI business diagnostic",
    "free business diagnostic",
    "business health assessment",
    "revenue leak analysis",
    "business operations assessment",
    "small business health check",
    "AI automation for SMB",
  ],
  alternates: {
    canonical: "https://deltalabsai.com/diagnostic",
  },
  openGraph: {
    title: "Free AI Business Diagnostic for SMBs in India | Delta Labs AI",
    description:
      "Free AI diagnostic built for SMBs in India and worldwide. Score revenue, operations, team, technology and data, spot revenue leaks, and get your personalized automation roadmap.",
    url: "https://deltalabsai.com/diagnostic",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI, Free Business Diagnostic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Business Diagnostic for SMBs in India | Delta Labs AI",
    description:
      "Free AI diagnostic built for SMBs in India and worldwide. Score your business, spot revenue leaks, and get your automation roadmap.",
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
        "text": "The diagnostic scores your business on revenue, operations, technology, team and data practices. You receive a radar chart and a specific quick-win recommendation.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does the diagnostic take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a short self-assessment. You answer a series of questions about your business operations and see your results as a visual scorecard.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the business diagnostic really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the business diagnostic is completely free with no credit card required. You get results including a radar chart, scores, and a personalized quick-win recommendation.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens after I complete the diagnostic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After completing the diagnostic, you receive your scores and a specific quick-win recommendation. If you want help acting on it, send a short written enquiry to neil@mail.deltalabsai.com and we reply in writing.",
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
