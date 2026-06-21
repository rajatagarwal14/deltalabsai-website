export const metadata = {
  title: "Blog — Delta Labs AI | AI & Operations Insights for Growing Businesses",
  description:
    "Practical AI automation guides for small businesses. No jargon, just results. By Delta Labs AI.",
  keywords: [
    "AI business blog",
    "business automation insights",
    "digital transformation articles",
    "small business operations tips",
    "CRM strategy blog",
    "AI consulting insights",
    "business efficiency articles",
    "revenue optimization",
    "process automation guide",
  ],
  alternates: {
    canonical: "https://deltalabsai.com/blog",
  },
  openGraph: {
    title: "Blog — Delta Labs AI | AI & Operations Insights",
    description:
      "Expert insights on AI automation, digital transformation, and operational efficiency for growing businesses.",
    url: "https://deltalabsai.com/blog",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI Blog — AI & Operations Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Delta Labs AI | AI & Operations Insights",
    description:
      "Expert insights on AI automation, digital transformation, and operational efficiency for growing businesses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

// BreadcrumbList for blog index page
const blogBreadcrumbJsonLd = {
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
      "name": "Blog",
      "item": "https://deltalabsai.com/blog",
    },
  ],
};

export default function BlogLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
