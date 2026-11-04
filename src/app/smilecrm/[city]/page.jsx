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
    description: `WhatsApp booking and visit reminders for dental clinics in ${city.name}, ${city.state}. SmileCRM by Delta Labs AI. Pricing by quote.`,
    keywords: [
      `SmileCRM ${city.name}`,
      `dental clinic CRM ${city.name}`,
      `dental appointment software ${city.name}`,
      `dental practice management ${city.name}`,
      `reduce no-shows dental ${city.name}`,
      `dental clinic automation ${city.state}`,
      "SmileCRM India",
      "dental clinic software India",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `SmileCRM for Dental Clinics in ${city.name}`,
      description: `Patients book on WhatsApp and get a reminder before each visit. SmileCRM for your ${city.name} dental clinic.`,
      url,
      siteName: "Delta Labs AI",
      type: "website",
      locale: "en_US",
    images: [
      {
        url: "https://deltalabsai.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI",
      },
    ],
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
        description: `SmileCRM gives dental clinics in ${city.name}, ${city.state} WhatsApp booking, reminders before each visit, patient records and desk billing.`,
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
            name: `Can a dental clinic in ${city.name} use SmileCRM?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. Setup is done remotely, with written step by step instructions, so it works for clinics in ${city.name}, ${city.state}.`,
            },
          },
          {
            "@type": "Question",
            name: "How is the price set?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "By written quote, after you tell us about your clinic. You agree it before anything starts.",
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
