// Ad / campaign landing page — noindex so it stays out of organic search results
// while remaining accessible via the campaign link.
export const metadata = {
  title: "Delta Labs AI",
  robots: { index: false, follow: false },
};

export default function LinkedInLayout({ children }) {
  return children;
}
