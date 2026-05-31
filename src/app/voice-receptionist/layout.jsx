export const metadata = {
  title: "AI Voice Receptionist — Never Miss a Call | Delta Labs AI",
  description:
    "An AI receptionist that answers your business phone 24/7, books appointments, handles FAQs, and hands off to WhatsApp. Built for clinics and small businesses that lose revenue to missed calls.",
  keywords: [
    "AI voice receptionist", "AI phone answering service", "24/7 call answering",
    "AI appointment booking", "virtual receptionist for clinics", "automated phone receptionist",
    "AI receptionist for dental clinic", "missed call recovery",
  ],
  alternates: { canonical: "https://deltalabsai.com/voice-receptionist" },
  openGraph: {
    title: "AI Voice Receptionist — Never Miss a Call | Delta Labs AI",
    description:
      "AI answers your phone 24/7, books appointments, and never misses a call — even after hours.",
    url: "https://deltalabsai.com/voice-receptionist",
    type: "website",
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
