import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "../cities";
import SmileCRMCityClient from "./client";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) return {};

  const url = `https://deltalabsai.com/smilecrm/${city.slug}`;

  return {
    title: `SmileCRM for Dental Clinics in ${city.name} | Delta Labs AI`,
    description: `Automate appointment reminders, patient recall & Google reviews for dental clinics in ${city.name}, ${city.state}. SmileCRM by Delta Labs AI. Starting at Rs 2,999/month. 14-day free trial.`,
    keywords: [
      `SmileCRM ${city.name}`,
      `dental clinic CRM ${city.name}`,
      `dental appointment software ${city.name}`,
      `dental practice management ${city.name}`,
      `reduce no-shows dental ${city.name}`,
      `patient recall system ${city.name}`,
      `dental clinic automation ${city.state}`,
      "SmileCRM India",
      "dental clinic software India",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `SmileCRM for Dental Clinics in ${city.name}`,
      description: `Automated WhatsApp reminders built to cut no-shows, automate patient recall, and grow Google reviews for your ${city.name} dental clinic. Starting at Rs 2,999/month.`,
      url,
      siteName: "Delta Labs AI",
      type: "website",
      locale: "en_US",
    },
  };
}

export default function SmileCRMCityPage({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();

  const url = `https://deltalabsai.com/smilecrm/${city.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: "SmileCRM",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: `SmileCRM automates appointment reminders, patient recall, and review collection for dental clinics in ${city.name}, ${city.state}.`,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "2999",
          highPrice: "6999",
          priceCurrency: "INR",
          offerCount: "3",
        },
        provider: {
          "@type": "Organization",
          name: "Delta Labs AI",
          url: "https://deltalabsai.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://deltalabsai.com" },
          { "@type": "ListItem", position: 2, name: "SmileCRM", item: "https://deltalabsai.com/dental" },
          { "@type": "ListItem", position: 3, name: city.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Is SmileCRM available for dental clinics in ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes! SmileCRM is available for dental clinics across India, including ${city.name}, ${city.state}. We handle remote setup — most clinics are live within 48 hours.`,
            },
          },
          {
            "@type": "Question",
            name: "Is there a free trial?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we offer a 14-day free trial on all plans. No credit card required.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmileCRMCityClient city={city} />
    </>
  );
}
