"use client";

import { useState, useEffect, useRef } from "react";

const FORM = "/diagnostic";

function useFade() {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}
function F({ children, d = 0, style = {} }) {
  const [r, v] = useFade();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${d}s`, ...style }}>{children}</div>;
}

const Ic = {
  Chk: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Pin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Wa: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" /><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" /></svg>,
  Play: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>,
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#2563EB", color: "#fff" }
    : { ...base, background: "#fff", color: "#0F172A", border: "1px solid #E5E7EB" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

// Organised by USE CASE, not by industry.
//
// Every comparable provider (Gallabox filters on both axes, and "Appointment booking" is
// one of its named use cases) segments this page somehow. Industry is the wrong axis for
// us: a page whose only heading reads "Dental" would narrow Delta Labs to dentistry on
// the one page an outside reviewer reads, and the standing position is that SmileCRM is
// one example of what we do, not the company.
//
// A use case also lets a real client and a working demo sit side by side without either
// pretending to be the other. Which one a card is comes from `kind`, and the two are
// never styled the same way.
const USE_CASES = [
  {
    id: "appointment-booking",
    label: "Appointment booking",
    blurb: "Patients and customers book, reschedule and confirm without anyone answering the phone.",
    entries: [
      {
        kind: "client",
        name: "Dent-Ox | The Dental Studio",
        logo: "/clients/dentox-logo.webp",
        sector: "Dental practice",
        location: "Pitampura, Delhi",
        since: "September 2026",
        relationship:
          "Delta Labs AI builds and operates the WhatsApp appointment booking service for Dent-Ox | The Dental Studio, under the clinic's authorisation.",
        operates: [
          "Appointment booking over WhatsApp",
          "Automated appointment reminders",
          "Visit feedback collection",
          "Clinic dashboard and patient records",
        ],
        waNumber: "+91 99717 19706",
      },
    ],
  },
  {
    id: "wholesale-reordering",
    label: "Wholesale reordering and negotiation",
    blurb: "A returning trade buyer reorders and negotiates bulk pricing in their own language, on credit terms.",
    entries: [
      {
        kind: "demo",
        name: "Wholesale reordering",
        subject: "Shree Wholesale Traders",
        poster: "/demos/video/kirana-wholesale-poster.jpg",
        href: "/demos/kirana-wholesale.html",
        desc: "Reorder and price negotiation in Hindi, with khata (credit) rather than forced online payment, because that is how the trade actually runs.",
      },
    ],
  },
  {
    id: "catalog-to-checkout",
    label: "Catalogue to checkout",
    blurb: "A complete storefront that never leaves the chat: browse, cart, pay, track.",
    entries: [
      {
        kind: "demo",
        name: "Full commerce",
        subject: "Bellavie Skincare",
        poster: "/demos/video/bellavie-commerce-poster.jpg",
        href: "/demos/bellavie-commerce.html",
        desc: "Browse categories, build a cart, check out and track delivery, all inside WhatsApp.",
      },
    ],
  },
];

function ClientCard({ c }) {
  return (
    <article className="client-card" style={{
      border: "1px solid #E5E7EB", borderRadius: 20, overflow: "hidden",
      display: "grid", gridTemplateColumns: "minmax(0, 300px) minmax(0, 1fr)", alignItems: "stretch",
    }}>
      {/* The mark is light-on-black, so it gets a dark field rather than floating on white. */}
      <div style={{ background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", padding: 30, minHeight: 210 }}>
        <img src={c.logo} alt={`${c.name} logo`} width={190} height={190}
          style={{ width: "100%", maxWidth: 190, height: "auto", borderRadius: "50%", display: "block" }} />
      </div>

      <div style={{ padding: "28px 30px 26px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EFF6FF", color: "#2563EB", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, marginBottom: 12 }}>
          Client
        </div>
        <h3 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 9px", lineHeight: 1.25 }}>{c.name}</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", marginBottom: 16, fontSize: 13.5, color: "#64748B" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Ic.Pin /> {c.location}</span>
          <span>{c.sector}</span>
          <span>Client since {c.since}</span>
        </div>

        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#374151", margin: "0 0 18px" }}>{c.relationship}</p>

        <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#64748B", marginBottom: 9 }}>
          What we operate
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 7 }}>
          {c.operates.map((o) => (
            <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 14.5, color: "#374151", lineHeight: 1.5 }}>
              <span style={{ color: "#2563EB", flexShrink: 0, marginTop: 2 }}><Ic.Chk /></span>{o}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#64748B", flexWrap: "wrap" }}>
          <span style={{ color: "#16A34A" }}><Ic.Wa /></span>
          WhatsApp business number operated by Delta Labs AI:
          <strong style={{ color: "#0F172A", fontWeight: 600 }}>{c.waNumber}</strong>
        </div>
      </div>
    </article>
  );
}

function DemoCard({ d }) {
  // Deliberately an <article>, not one giant <a>. Wrapping the whole card in a link gave
  // a screen-reader user a single ~50-word link whose accessible name swallowed the
  // "not a client" disclaimer. The link now covers the poster and the heading only, so
  // the disclaimer is read as its own text.
  return (
    <article className="demo-card" style={{
      display: "grid", gridTemplateColumns: "minmax(0, 300px) minmax(0, 1fr)", alignItems: "stretch",
      border: "1px dashed #CBD5E1", borderRadius: 20, overflow: "hidden", background: "#FCFCFD",
    }}>
      <a href={d.href} style={{ background: "#0F172A", position: "relative", minHeight: 180, display: "block" }}
        aria-label={`Watch the ${d.name} demo`}>
        <img src={d.poster} alt="" width={300} height={180}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.92 }} />
        <span style={{ position: "absolute", left: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(15,23,42,.82)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 999 }}>
          <Ic.Play /> Watch the demo
        </span>
      </a>

      <div style={{ padding: "26px 30px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, marginBottom: 12 }}>
          Live demo
        </div>
        {/* "Demo:" sits in the heading text itself, so the distinction survives a
            screen-reader headings list, a print stylesheet and a greyscale screenshot,
            none of which carry the badge or the dashed border. */}
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.25 }}>
          Demo: {d.name}
        </h3>
        {/* Leads with what it is. Darkened from #94A3B8 (2.50:1, below WCAG AA) to
            #475569 (7.5:1) because this is the one sentence that stops a demo being
            read as a customer, and it was the faintest text on the page. */}
        <p style={{ fontSize: 13.5, color: "#475569", margin: "0 0 10px", lineHeight: 1.6, fontWeight: 500 }}>
          Illustrative demo, not a client. {d.subject} is a fictional business created to show the product.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "#374151", margin: "0 0 12px" }}>{d.desc}</p>
        <a href={d.href} style={{ fontSize: 14, fontWeight: 600, color: "#2563EB", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
          Open the demo <Ic.Arr />
        </a>
      </div>
    </article>
  );
}

export default function Clients() {
  return (
    <div className="clients-page" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0F172A", background: "#fff", minHeight: "100vh" }}>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 36px" }}>
        <F>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#2563EB", marginBottom: 14 }}>
            Clients and demos
          </div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", maxWidth: 720, textWrap: "balance" }}>
            What we build, and who we build it for
          </h1>
          <p style={{ fontSize: 17, color: "#52525b", lineHeight: 1.65, margin: 0, maxWidth: 640 }}>
            Delta Labs AI builds and operates WhatsApp booking and commerce for small businesses.
            Demos on this page are marked as demos and are not customers.
          </p>
        </F>
      </section>

      {/* The one fact a platform reviewer is looking for, stated before anything else and
          rendered statically. Previously it appeared only at the foot of the page, below
          two demo cards, and inside a fade wrapper that starts at opacity 0. */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 4px" }}>
        <p style={{
          fontSize: 15.5, lineHeight: 1.7, color: "#374151", margin: "0 0 28px", maxWidth: 760,
          background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px 18px",
        }}>
          <strong>Dent-Ox | The Dental Studio is a client of Delta Labs AI.</strong>{" "}
          Delta Labs AI operates its WhatsApp Business number +91 99717 19706 on the clinic's behalf.{" "}
          <a href="#verification" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
            Full verification details
          </a>.
        </p>
      </section>

      {/* Use-case index. Real anchors, so the sections below are linkable. */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 8px" }}>
        <F>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 28, borderBottom: "1px solid #F1F5F9" }}>
            {USE_CASES.map((u) => (
              <a key={u.id} href={`#${u.id}`} style={{
                fontSize: 13.5, fontWeight: 500, color: "#475569", textDecoration: "none",
                border: "1px solid #E5E7EB", borderRadius: 999, padding: "8px 15px", background: "#fff",
              }}>{u.label}</a>
            ))}
          </div>
        </F>
      </section>

      {USE_CASES.map((u, i) => (
        <section key={u.id} id={u.id} style={{ maxWidth: 1100, margin: "0 auto", padding: i === 0 ? "36px 24px 0" : "44px 24px 0", scrollMarginTop: 24 }}>
          <F>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 7px", lineHeight: 1.3 }}>{u.label}</h2>
            <p style={{ fontSize: 15.5, color: "#64748B", lineHeight: 1.65, margin: "0 0 20px", maxWidth: 640 }}>{u.blurb}</p>
          </F>
          <div style={{ display: "grid", gap: 18 }}>
            {u.entries.map((e, j) => (
              // A client card is evidence, not decoration. It must not depend on JS to
              // become visible: an automated screenshot, reader mode or a JS-off crawler
              // would otherwise capture a blank page.
              e.kind === "client"
                ? <ClientCard key={e.name} c={e} />
                : <F key={e.name} d={j * 0.06}><DemoCard d={e} /></F>
            ))}
          </div>
        </section>
      ))}

      {/* For platform reviewers. Says the one thing they need, in plain terms. */}
      <section id="verification" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 72px", scrollMarginTop: 24 }}>
        <div>
          <div style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 16, padding: "28px 30px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#64748B", marginBottom: 12 }}>
              Platform and partner verification
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#374151", margin: "0 0 14px", maxWidth: 760 }}>
              Delta Labs AI operates the WhatsApp Business number <strong>+91 99717 19706</strong> on behalf of
              Dent-Ox | The Dental Studio, Shop No. 3, 28, Engineers Enclave, Pitampura, Delhi 110034.
              Dent-Ox | The Dental Studio is a client of Delta Labs AI. Messages sent from that number are sent
              by Delta Labs AI in the clinic's name and with the clinic's authorisation.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#64748B", margin: 0, maxWidth: 760 }}>
              For verification queries, contact{" "}
              <a href="mailto:deltalabsai@mail.deltalabsai.com" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 500 }}>
                deltalabsai@mail.deltalabsai.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 80px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 14 }}>Want one of these running for your business?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 28, lineHeight: 1.6 }}>
            Start with the free diagnostic. It takes a few minutes and there is no pitch at the end of it.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={FORM}>Get your free diagnostic <Ic.Arr /></Btn>
            <Btn href="/" v="secondary">See how it works</Btn>
          </div>
        </F>
      </section>

      {/* The site's floating chat and support widgets are position:fixed in the bottom
          corners. Extra bottom padding keeps the footer and the last CTA out from under
          them. Mid-scroll overlap is inherent to a fixed widget and affects every page
          equally, so it is not fixed here. */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px 108px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa", margin: 0 }}>Delta Labs AI. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>

      <style>{`
        @media (max-width: 760px) {
          .client-card, .demo-card { grid-template-columns: 1fr !important; }
        }
        .demo-card:hover { border-color: #94A3B8; }
        .clients-page a:focus-visible { outline: 2px solid #2563EB; outline-offset: 3px; border-radius: 4px; }
        /* Scoped: an unscoped * rule here applied to the whole document, including the
           site's fixed widgets, for as long as this page was mounted. */
        @media (prefers-reduced-motion: reduce) { .clients-page * { transition: none !important; } }
      `}</style>
    </div>
  );
}

// PUBLISHING RULES for this page:
// 1. A client is named here only with their written permission.
// 2. A demo is never presented as a client. Different badge, different border, and an
//    explicit line saying the business is illustrative.
// 3. No outcome claims, percentages or testimonials until something has actually been
//    measured and the client has agreed to it being published. Every comparable provider
//    pairs a client name with a metric; we do not have one yet, and inventing it is the
//    one thing that would make this page worse than having none.
