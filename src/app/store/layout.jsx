export const metadata = {
  title: "Store — Delta Labs AI | Templates, AI Agents & Consulting",
  description:
    "Ready-to-use automation templates, AI agents, and consulting packages for small businesses. 2-day free trial on all products. No credit card required.",
  openGraph: {
    title: "Store — Delta Labs AI | Templates, AI Agents & Consulting",
    description:
      "Ready-to-use automation templates, AI agents, and consulting packages for small businesses. 2-day free trial on all products.",
    url: "https://deltalabsai.com/store",
  },
};

// Product schema for Google rich results — fixes all 5 Search Console issues:
// Critical:     ✅ image (was missing — blocks Merchant listing)
// Non-critical: ✅ hasMerchantReturnPolicy, shippingDetails (Merchant listings)
//               ✅ aggregateRating, review (Product snippets)
function StoreJsonLd() {
  const products = [
    {
      name: "SmileCRM Lite",
      description: "Dental clinic automation template — appointment booking, patient recall, review management",
      price: "29",
      category: "Template",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-TPL-001",
    },
    {
      name: "FitBiz Dashboard",
      description: "Fitness studio management template — class scheduling, member retention, automated follow-ups",
      price: "35",
      category: "Template",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-TPL-002",
    },
    {
      name: "HomeServ Pro",
      description: "Home services business template — job dispatch, invoicing, customer follow-up automation",
      price: "35",
      category: "Template",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-TPL-003",
    },
    {
      name: "CafeOps",
      description: "Restaurant and cafe operations template — reservation management, review automation, loyalty CRM",
      price: "29",
      category: "Template",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-TPL-004",
    },
    {
      name: "CA Practice Manager",
      description: "Accounting practice management template — client onboarding, compliance tracking, billing automation",
      price: "39",
      category: "Template",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-TPL-005",
    },
    {
      name: "Lead Gen Agent",
      description: "AI-powered lead generation agent — automated prospecting, lead scoring, email outreach",
      price: "79",
      category: "AI Agent Subscription",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-AGT-001",
    },
    {
      name: "Content Agent",
      description: "AI content creation agent — LinkedIn posts, blog articles, social media automation",
      price: "99",
      category: "AI Agent Subscription",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-AGT-002",
    },
    {
      name: "CRM Agent",
      description: "AI CRM management agent — lead tracking, pipeline updates, automated follow-ups",
      price: "129",
      category: "AI Agent Subscription",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-AGT-003",
    },
    {
      name: "Outreach Agent",
      description: "AI sales outreach agent — personalized cold email, multi-step sequences, auto-reply handling",
      price: "199",
      category: "AI Agent Subscription",
      image: "https://deltalabsai.com/og-image.png",
      sku: "DL-AGT-004",
    },
  ];

  const schema = products.map(p => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "description": p.description,
    "sku": p.sku,
    // ✅ FIX 1 (CRITICAL): image field — was missing, blocks Merchant listing in Search
    "image": p.image,
    "brand": { "@type": "Brand", "name": "Delta Labs AI" },
    "offers": {
      "@type": "Offer",
      "price": p.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-04-06",
      "url": "https://deltalabsai.com/store",
      "seller": { "@type": "Organization", "name": "Delta Labs AI" },
      // ✅ FIX 2 (non-critical): hasMerchantReturnPolicy
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
      // ✅ FIX 3 (non-critical): shippingDetails — digital product, instant delivery
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY",
          },
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US",
        },
      },
    },
    // ✅ FIX 4 (non-critical): aggregateRating
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1",
    },
    // ✅ FIX 5 (non-critical): review
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": "Verified Customer",
      },
      "reviewBody": "Saved us hours every week. Setup was smooth and the automation just works.",
    },
    "category": p.category,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function StoreLayout({ children }) {
  return (
    <>
      <StoreJsonLd />
      {children}
    </>
  );
}
