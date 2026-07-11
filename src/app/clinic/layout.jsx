// Leak-report pages describe third-party businesses that never opted in.
// Keep them out of search entirely to avoid defamation/SEO exposure —
// direct-link-only, never indexed or followed.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function ClinicLayout({ children }) {
  return children;
}
