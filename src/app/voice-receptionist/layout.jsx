export const metadata = {
  title: "AI Voice Receptionist Pilot Programme (Beta) | Delta Labs AI",
  description:
    "Delta Labs AI is running a pilot programme for its AI voice receptionist, currently in beta. It answers calls, books appointments and hands off to WhatsApp. Apply for a pilot setup call.",
  keywords: [
    "AI voice receptionist pilot", "AI receptionist beta",
    "AI appointment booking", "missed call recovery",
  ],
  alternates: { canonical: "https://deltalabsai.com/voice-receptionist" },
  openGraph: {
    title: "AI Voice Receptionist Pilot Programme (Beta) | Delta Labs AI",
    description:
      "AI answers your phone 24/7, books appointments, and never misses a call — even after hours.",
    url: "https://deltalabsai.com/voice-receptionist",
    type: "website",
    images: [
      {
        url: "https://deltalabsai.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Delta Labs AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Receptionist | Delta Labs AI",
    description:
      "24/7 AI call answering, appointment booking, and WhatsApp handoff for small businesses.",
  },
};

export default function VoiceReceptionistLayout({ children }) {
  return children;
}
