export const metadata = {
  title: "Store — Delta Labs AI | Templates, AI Agents & Consulting",
  description:
    "Ready-to-use automation templates, AI agents, and consulting packages for small businesses. 2-day free trial on all products. No credit card required.",
  alternates: {
    canonical: "https://deltalabsai.com/store",
  },
  openGraph: {
    title: "Store — Delta Labs AI | Templates, AI Agents & Consulting",
    description:
      "Ready-to-use automation templates, AI agents, and consulting packages for small businesses. 2-day free trial on all products.",
    url: "https://deltalabsai.com/store",
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

export default function StoreLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
