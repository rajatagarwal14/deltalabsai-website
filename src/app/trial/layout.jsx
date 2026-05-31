// Private per-client trial pages (token URLs) — noindex so they never appear in
// search results. These are personalized links, not public content.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function TrialLayout({ children }) {
  return children;
}
