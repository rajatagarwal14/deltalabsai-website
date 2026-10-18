export const metadata = {
  title: "One manual task at a time | Delta Labs AI",
  description:
    "Delta Labs AI is a small studio in India. We take one repeated manual task in your business and, if it fits a two-week scope, fix it for a fixed price inside the tools you already use.",
  alternates: { canonical: "https://deltalabsai.com/international" },
  // Linked from direct outreach only. Kept out of search results until the page has been through a few real conversations.
  robots: { index: false, follow: true },
  openGraph: {
    title: "One manual task at a time | Delta Labs AI",
    description: "A small studio in India. One repeated manual task at a time; if it fits a two-week scope, we fix it for a fixed price.",
    url: "https://deltalabsai.com/international",
    type: "website",
  },
};

export default function InternationalLayout({ children }) {
  return children;
}
