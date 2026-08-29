import expiryMap from "../expiry.json";

export const dynamic = "force-dynamic";

export default async function DashboardPreviewPage({ params }) {
  const { slug } = await params;
  const entry = expiryMap[slug];

  if (!entry) {
    return <ExpiredCard name={null} />;
  }

  const isExpired = new Date() > new Date(entry.expiresAt + "T23:59:59");
  if (isExpired) {
    return <ExpiredCard name={entry.name} />;
  }

  return (
    <div style={{ margin: 0, height: "100vh", width: "100vw" }}>
      <iframe
        src="/clinic-dashboard-sample/index.html"
        title="Sample Clinic Analytics Dashboard"
        style={{ border: "none", width: "100%", height: "100%" }}
      />
    </div>
  );
}

function ExpiredCard({ name }) {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: "-apple-system, sans-serif",
        background: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>
          This preview link has expired
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: "0 0 8px" }}>
          {name
            ? `This dashboard preview was prepared exclusively for ${name} and is no longer available at this link.`
            : "This dashboard preview link is no longer available."}
        </p>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
          To request an updated preview, contact{" "}
          <a href="mailto:neil@mail.deltalabsai.com" style={{ color: "#28963d", textDecoration: "none" }}>
            neil@mail.deltalabsai.com
          </a>
        </p>
      </div>
    </div>
  );
}
