// Ad landing page — kept out of organic search (noindex) so it doesn't compete
// with real content pages or dilute crawl budget. Still fully accessible via the ad link.
export const metadata = {
  title: "Delta Labs AI",
  robots: { index: false, follow: false },
};

export default function FacebookLayout({ children }) {
  return children;
}
