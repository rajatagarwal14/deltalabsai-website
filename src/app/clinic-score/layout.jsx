export const metadata = {
  title: "Clinic Digital Score: how digitally ready is your clinic? | Delta Labs AI",
  description:
    "A free self-check for independent clinics: see how patients find, book and hear from your clinic, and get practical improvements.",
  keywords: [
    "clinic digital score",
    "clinic digital readiness",
    "SmileCRM",
    "dental digital readiness",
    "Google reviews for clinics",
    "online booking for clinics",
  ],
  metadataBase: new URL("https://deltalabsai.com"),
  alternates: {
    canonical: "https://deltalabsai.com/clinic-score",
  },
  openGraph: {
    title: "How digitally ready is your clinic? Get your Clinic Digital Score",
    description:
      "A free self-check for independent clinics, with practical improvements.",
    url: "https://deltalabsai.com/clinic-score",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_IN",
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

export default function ClinicScoreLayout({ children }) {
  return children;
}
