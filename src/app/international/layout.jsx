export const metadata = {
  title: "Fix a repeated manual task | Delta Labs AI",
  description:
    "Delta Labs AI is a small studio in India. We take a repeated manual task in your business and, if it is a small, well defined job, fix it for a fixed price inside the tools you already use.",
  alternates: { canonical: "https://deltalabsai.com/international" },
  // Linked from direct outreach only. Kept out of search results until the page has been through a few real conversations.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Fix a repeated manual task | Delta Labs AI",
    description: "A small studio in India. Tell us a repeated manual task; if it is a small, well defined job, we fix it for a fixed price.",
    url: "https://deltalabsai.com/international",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fix a repeated manual task | Delta Labs AI",
    description: "A small studio in India. Tell us a repeated manual task; if it is a small, well defined job, we fix it for a fixed price.",
  },
};

export default function InternationalLayout({ children }) {
  return children;
}
