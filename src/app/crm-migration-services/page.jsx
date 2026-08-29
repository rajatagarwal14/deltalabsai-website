import Link from "next/link";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";

const PHASES = [
  { n: "1", h: "Audit", b: "Record counts per object, custom fields in genuine use, attachments, and the duplicates already in the source. Written down, because these are the numbers we verify against later." },
  { n: "2", h: "Map", b: "Every source field gets a destination or an explicit decision not to migrate it. Unmapped fields are the single most common cause of silent data loss." },
  { n: "3", h: "Clean", b: "Deduplicate, standardise date and currency formats, and fix records that would fail validation on import." },
  { n: "4", h: "Stage", b: "Load into a sandbox first. Verify counts object by object against the audit before anything touches production." },
  { n: "5", h: "Cut over", b: "Load production, freeze the source as read-only rather than deleting it, verify counts again, and keep the old system accessible." },
];

const FOR_YOU = [
  "You are moving off spreadsheets and the data has grown past what one person can reconcile",
  "You are moving between two CRMs with different schemas, not doing a flat export and import",
  "Custom objects and relationships between records need to survive the move",
  "The records are revenue-critical and a partial migration would stop the team working",
  "Nobody internally owns the project, which is the most reliable predictor of a stalled migration",
];

const NOT_FOR_YOU = [
  "A few thousand clean records in a single system, where a free native loader will do the job",
  "You have someone internally who owns the mapping decisions and the time to do it",
];

export default function CrmMigrationServicesPage() {
  const wrap = { fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" };
  const section = { maxWidth: 860, margin: "0 auto", padding: "0 24px" };
  const h2 = { fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 800, letterSpacing: -0.8, margin: "0 0 20px" };
  const p = { fontSize: 17, lineHeight: 1.7, color: "#3f3f46", margin: "0 0 18px" };
  const btn = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", background: "#6366f1", color: "#fff" };

  return (
    <main style={wrap}>
      <section style={{ ...section, padding: "80px 24px 44px", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", marginBottom: 14 }}>
          CRM Migration Services
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.12, margin: "0 0 20px" }}>
          Move your CRM data without losing records
        </h1>
        <p style={{ ...p, fontSize: 19, maxWidth: 620, margin: "0 auto 30px" }}>
          Audit, field mapping, staged load, and verification against source counts before cutover. Fixed scope, about three weeks, and the old system stays intact until you say otherwise.
        </p>
        <a href={CAL} style={btn}>Book a migration scoping call</a>
      </section>

      <section style={{ ...section, padding: "44px 24px" }}>
        <h2 style={h2}>How the migration runs</h2>
        {PHASES.map((ph) => (
          <div key={ph.n} style={{ display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 8, background: "#eef2ff", color: "#6366f1", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{ph.n}</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "4px 0 6px" }}>{ph.h}</h3>
              <p style={{ ...p, margin: 0, fontSize: 16 }}>{ph.b}</p>
            </div>
          </div>
        ))}
        <p style={{ ...p, marginTop: 22, fontStyle: "italic" }}>
          The audit and mapping phases take longer than the transfer itself. Skipping them is why migrations lose data.
        </p>
      </section>

      <section style={{ ...section, padding: "44px 24px" }}>
        <h2 style={h2}>What we verify before cutover</h2>
        <p style={p}>
          Record counts per object, matched against the audit taken at the start. Relationships between records, so contacts still belong to companies and deals still belong to contacts. Attachments, notes and activity history, which are the things most often left behind. Required fields in the destination, so an import does not stop halfway.
        </p>
        <p style={p}>
          If the counts do not match, we do not cut over.
        </p>
      </section>

      <section style={{ ...section, padding: "44px 24px" }}>
        <h2 style={h2}>When this is worth hiring for</h2>
        <ul style={{ ...p, paddingLeft: 22 }}>
          {FOR_YOU.map((x) => <li key={x} style={{ marginBottom: 10 }}>{x}</li>)}
        </ul>
        <h3 style={{ fontSize: 19, fontWeight: 700, margin: "30px 0 12px" }}>When it is not</h3>
        <ul style={{ ...p, paddingLeft: 22 }}>
          {NOT_FOR_YOU.map((x) => <li key={x} style={{ marginBottom: 10 }}>{x}</li>)}
        </ul>
        <p style={p}>
          For small, clean datasets a free loader genuinely does the job. The{" "}
          <Link href="/blog/crm-data-migration-tools" style={{ color: "#6366f1" }}>comparison of CRM data migration tools</Link>{" "}
          sets out which tool fits which record count, including the free ones.
        </p>
      </section>

      <section style={{ ...section, padding: "44px 24px 80px" }}>
        <h2 style={h2}>Start with a scoping call</h2>
        <p style={p}>
          Bring your record counts and the two systems involved. We will tell you whether this needs a migration service at all, and what the scope looks like if it does.
        </p>
        <p style={p}>
          If you want the process in detail first, the{" "}
          <Link href="/blog/crm-service-businesses" style={{ color: "#6366f1" }}>step by step CRM data migration guide</Link>{" "}
          covers the same five phases, the pre-migration checklist, and the failure modes to watch for.
        </p>
        <a href={CAL} style={btn}>Book a migration scoping call</a>
      </section>
    </main>
  );
}
