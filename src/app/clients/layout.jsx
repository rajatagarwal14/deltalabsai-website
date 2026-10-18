// Without this the route inherits the diagnostic page's metadata: the tab reads
// "Free 3-Min AI Diagnostic..." and the canonical points at the homepage. That matters
// twice over. A Meta reviewer opening the link we submit sees a lead-generation title
// rather than a clients page, and Google treats /clients as a duplicate of home and
// declines to index it despite the sitemap entry.
export const metadata = {
  title: "Clients | Delta Labs AI",
  description:
    "Delta Labs AI builds and operates WhatsApp booking and commerce for small businesses, including Dent-Ox | The Dental Studio in Pitampura, Delhi.",
  alternates: { canonical: "https://deltalabsai.com/clients" },
  openGraph: {
    title: "Clients | Delta Labs AI",
    description:
      "Delta Labs AI builds and operates WhatsApp booking and commerce for small businesses, including Dent-Ox | The Dental Studio in Pitampura, Delhi.",
    url: "https://deltalabsai.com/clients",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ClientsLayout({ children }) {
  return children;
}
