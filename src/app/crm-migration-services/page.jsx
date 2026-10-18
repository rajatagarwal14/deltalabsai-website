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

const PAIRS = [
  { h: "Spreadsheets to a CRM", b: "The hard part is not the export, it is that a spreadsheet has no schema. The same customer appears three times with three spellings, dates are text, and one column holds two facts. Most of the work is deciding what a record is before anything gets loaded." },
  { h: "HubSpot to Salesforce", b: "Different object models. HubSpot treats companies and contacts as loosely associated; Salesforce enforces Account and Contact relationships and validation rules on import. Lifecycle stages and deal stages need an explicit mapping, and Salesforce will reject records that HubSpot accepted happily." },
  { h: "Salesforce to HubSpot", b: "The usual loss is custom objects and the reporting built on them. Salesforce records that depend on record types and page-layout logic flatten out, so the decision is which of that structure to rebuild as HubSpot properties and which to retire." },
  { h: "Zoho to HubSpot or Pipedrive", b: "Zoho modules map cleanly enough, but Zoho installs tend to accumulate custom fields that nobody uses. The audit usually removes more fields than it migrates, and that is the point of doing one." },
  { h: "Pipedrive to HubSpot", b: "Pipedrive is deal-centric, HubSpot is contact-centric. Deals carry the history in Pipedrive, so activity and note history needs a deliberate home on the HubSpot side or it silently does not come across." },
  { h: "Practo Ray, Dentrix and other vertical systems", b: "Vertical clinic and practice systems often expose limited or no export. Whether a migration is even possible has to be established first, before scope or price means anything." },
];

const FAQ = [
  { q: "How long does a CRM migration take?", a: "A fixed-scope migration is normally about three weeks: roughly a week on audit and mapping, a week on cleaning and the staged load, and a week on verification and cutover. Migrations that need custom-object work or that uncover unusable source data take longer, and we say so at scoping rather than mid-project." },
  { q: "What does it cost?", a: "Estimates vary widely with record volume and custom field mapping. We scope to a fixed number before starting. Below a few thousand clean records in a single system, a migration service is usually not worth paying for and we will tell you that." },
  { q: "Will the team be locked out during the move?", a: "No. The load runs into a sandbox first and is verified against the audit counts object by object. The source system is frozen read-only at cutover rather than deleted, so it stays available if something needs checking afterwards." },
  { q: "What happens to the old system?", a: "It stays intact and readable. Deleting the source is the customer's decision to make later, once they are satisfied the new system holds everything. Nothing in our process depends on destroying it." },
  { q: "Do custom fields and record relationships survive?", a: "Where the destination supports them, yes, and that is mapped explicitly during the audit. Where it does not, that becomes a written decision before the load rather than a surprise afterwards. Unmapped fields are the most common cause of silent data loss in a migration." },
  { q: "What if the data is a mess?", a: "That is the normal case and it is why the clean phase exists. Deduplication and format standardisation happen before the load, because migrating dirty data faithfully reproduces the mess in a more expensive system." },
  { q: "Can you migrate from a system with no export?", a: "Sometimes, and sometimes not. Establishing whether the source can be exported at all is the first thing we check, because it determines whether there is a project here." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((x) => ({
    "@type": "Question",
    name: x.q,
    acceptedAnswer: { "@type": "Answer", text: x.a },
  })),
};

export default function CrmMigrationServicesPage() {
  const wrap = { fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" };
  const section = { maxWidth: 860, margin: "0 auto", padding: "0 24px" };
  const h2 = { fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 800, letterSpacing: -0.8, margin: "0 0 20px" };
  const p = { fontSize: 17, lineHeight: 1.7, color: "#3f3f46", margin: "0 0 18px" };
  const btn = { display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", background: "#6366f1", color: "#fff" };

  return (
    <main style={wrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#6366f1" }}>{"\u0394"}</span>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/solutions" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Solutions</a>
            <a href="/blog" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Blog</a>
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Diagnostic</a>
          </div>
        </div>
      </nav>
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

      <section style={{ ...section, padding: "44px 24px" }}>
        <h2 style={h2}>Migrations we take</h2>
        <p style={p}>
          The platform pair decides most of the work. These are common moves and what is actually
          difficult about each.
        </p>
        {PAIRS.map((x) => (
          <div key={x.h} style={{ marginBottom: 22 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>{x.h}</h3>
            <p style={{ ...p, margin: 0 }}>{x.b}</p>
          </div>
        ))}
        <p style={{ ...p, marginTop: 26 }}>
          If your pair is not listed, the process is the same. What changes is how much of the source schema survives
          the move, and that is what the audit establishes before anyone quotes a number.
        </p>
      </section>

      <section style={{ ...section, padding: "44px 24px" }}>
        <h2 style={h2}>Common questions</h2>
        {FAQ.map((x) => (
          <div key={x.q} style={{ marginBottom: 22 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>{x.q}</h3>
            <p style={{ ...p, margin: 0 }}>{x.a}</p>
          </div>
        ))}
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
      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center", marginTop: 64 }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>Delta Labs AI. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>
    </main>
  );
}
