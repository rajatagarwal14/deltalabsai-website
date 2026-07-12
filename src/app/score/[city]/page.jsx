export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getReputationReportBySlug } from "../../../lib/reports-db";
import { ClinicHeader, ClinicFooter } from "../../clinic/BrandChrome";

// Ref-gated leaderboard, mirrors src/app/clinic/[city]/page.jsx exactly: only
// ever renders the ONE report the visitor already holds a direct link to
// (?ref=<slug>), never the full competitor list, so anonymous visitors can't
// scrape a city's whole business list.
export default async function ReputationLeaderboardPage({ params, searchParams }) {
  let { city } = params;
  city = decodeURIComponent(city);
  const ref = searchParams?.ref;

  const row = ref ? await getReputationReportBySlug(city, ref) : null;

  return (
    <>
      <ClinicHeader />
      <main style={{ minHeight: "100vh", background: "#F8FAFC", padding: "32px 16px" }}>
      <div style={{ maxWidth: 672, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#1E293B" }}>
          {decodeURIComponent(city)} Reputation Score leaderboard
        </h1>

        {row ? (
          <>
            <p style={{ marginTop: 4, fontSize: 14, color: "#64748B" }}>Your business&apos;s standing</p>
            <ol style={{ marginTop: 24, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  background: "#fff",
                  padding: "12px 16px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 28, flexShrink: 0, fontSize: 14, fontWeight: 600, color: "#94A3B8" }}>
                    #{row.rank_in_city}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#1E293B" }}>{row.business_name}</span>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    borderRadius: 999,
                    background: "#E9EFF8",
                    padding: "2px 10px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#2563EB",
                  }}
                >
                  {row.star_rating}★ ({row.review_count} reviews)
                </span>
              </li>
            </ol>
            <p style={{ marginTop: 16, fontSize: 12, color: "#94A3B8" }}>
              Ranked out of {row.city_total} {decodeURIComponent(city)} {row.niche || "businesses"} reviewed.
            </p>
          </>
        ) : (
          <p style={{ marginTop: 16, fontSize: 14, color: "#64748B" }}>
            This page is only viewable via a business&apos;s own report link.
          </p>
        )}

      </div>
      </main>
      <ClinicFooter />
    </>
  );
}
