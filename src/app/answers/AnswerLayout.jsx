const styles = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px", fontFamily: "inherit", color: "#18181b" },
  eyebrow: { fontSize: 13, fontWeight: 600, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 },
  h1: { fontSize: 34, fontWeight: 700, lineHeight: 1.25, marginBottom: 18, letterSpacing: "-0.01em" },
  intro: { fontSize: 18, lineHeight: 1.65, color: "#3f3f46", marginBottom: 36 },
  h2: { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 14 },
  p: { fontSize: 16, lineHeight: 1.75, color: "#27272a", marginBottom: 16 },
  ul: { paddingLeft: 20, marginBottom: 16 },
  li: { fontSize: 16, lineHeight: 1.75, color: "#27272a", marginBottom: 8 },
  faqBlock: { marginTop: 12, marginBottom: 20 },
  faqQ: { fontSize: 17, fontWeight: 600, marginBottom: 6 },
  faqA: { fontSize: 16, lineHeight: 1.7, color: "#27272a" },
  ctaBox: { marginTop: 56, padding: "32px", borderRadius: 14, background: "#18181b", color: "#fff", textAlign: "center" },
  ctaHeading: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  ctaSub: { fontSize: 15, color: "#d4d4d8", marginBottom: 20 },
  ctaBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, background: "#fff", color: "#18181b", textDecoration: "none" },
};

export default function AnswerLayout({ eyebrow, title, intro, sections, faqs, jsonLd }) {
  return (
    <main style={styles.wrap}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div style={styles.eyebrow}>{eyebrow}</div>
      <h1 style={styles.h1}>{title}</h1>
      <p style={styles.intro}>{intro}</p>

      {sections.map((s, i) => (
        <section key={i}>
          <h2 style={styles.h2}>{s.heading}</h2>
          {s.paragraphs?.map((p, j) => (
            <p key={j} style={styles.p}>{p}</p>
          ))}
          {s.list && (
            <ul style={styles.ul}>
              {s.list.map((item, j) => (
                <li key={j} style={styles.li}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {faqs?.length > 0 && (
        <section>
          <h2 style={styles.h2}>Frequently asked questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={styles.faqBlock}>
              <div style={styles.faqQ}>{f.q}</div>
              <div style={styles.faqA}>{f.a}</div>
            </div>
          ))}
        </section>
      )}

      <div style={styles.ctaBox}>
        <div style={styles.ctaHeading}>Not sure where to start?</div>
        <div style={styles.ctaSub}>Take the free 3-minute diagnostic — it flags the automations that will save your business the most time, based on your actual setup.</div>
        <a href="/diagnostic" style={styles.ctaBtn}>Get your free diagnostic →</a>
      </div>
    </main>
  );
}
