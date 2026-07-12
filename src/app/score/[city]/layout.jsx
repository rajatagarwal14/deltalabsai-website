// Reputation Score report/leaderboard pages describe third-party businesses
// that never opted in. Keep them out of search entirely, same as
// src/app/clinic/layout.jsx — direct-link-only, never indexed or followed.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function ScoreCityLayout({ children }) {
  return children;
}
