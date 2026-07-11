export const metadata = {
  title: "Clinic Digital Score — How does your clinic rank? | Delta Labs AI",
  description:
    "Free 90-second benchmark: see how your dental clinic ranks in your city. Get your Clinic Digital Score instantly.",
  keywords: [
    "clinic digital score",
    "dental clinic benchmark",
    "dental clinic ranking",
    "SmileCRM",
    "dental digital readiness",
    "dental clinic AI score",
    "Google reviews dental",
    "online booking dental clinic",
  ],
  metadataBase: new URL("https://deltalabsai.com"),
  alternates: {
    canonical: "https://deltalabsai.com/clinic-score",
  },
  openGraph: {
    title: "How does your clinic rank? Get your Clinic Digital Score",
    description:
      "Free 90-second benchmark tool. See how your dental clinic compares in your city.",
    url: "https://deltalabsai.com/clinic-score",
    siteName: "Delta Labs AI",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://deltalabsai.com/api/og/clinic-score?score=68&tier=Digital-Forward&name=Your+Clinic&city=Your+City",
        width: 1080,
        height: 1080,
        alt: "Clinic Digital Score",
      },
    ],
  },
};

export default function ClinicScoreLayout({ children }) {
  return children;
}
