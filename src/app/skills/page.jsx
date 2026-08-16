"use client";

import { useState, useEffect, useRef } from "react";

const GITHUB = "https://github.com/delta-labs-ai/delta-labs-skills";
const ENTERPRISE_MAILTO =
  "mailto:neil@mail.deltalabsai.com?subject=Delta%20Labs%20Skills%20-%20Enterprise%20Support";

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
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" /><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3" /></svg>,
  Chk: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Git: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z" /></svg>,
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff" }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

const skills = [
  {
    name: "Cold Email Outreach",
    tagline: "AI-generated cold email pipeline with bounce recovery and follow-ups",
    features: [
      "AI-generated emails, quality-gated before send",
      "OAuth2 mail send with MX validation on every address",
      "Blocklist + hallucinated-address rejection",
      "Auto bounce detection, dead leads never retried",
      "3-step follow-up sequence (day 3, day 7)",
      "Open/click tracking synced to your CRM",
    ],
    stat: "Production stats: 222 emails sent, 9% open rate, 0 spam complaints",
  },
  {
    name: "LinkedIn Company Page Automation",
    tagline: "Daily AI-generated LinkedIn posts with image generation and an approval gate",
    features: [
      "AI copywriting, quality-gated before publish",
      "AI-generated header image for every post",
      "Human approval step before anything goes live",
      "Publishes to your company page, not a personal profile",
      "Every post logged with URL and engagement data",
    ],
    stat: "Production stats: daily posts since March 2026, 100% first-pass approval",
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: [
      "Both skills, full source",
      "Setup docs + env template",
      '"Powered by Delta Labs AI" attribution in output',
      "Community support (GitHub issues)",
    ],
    cta: "Download on GitHub",
    href: GITHUB,
  },
  {
    name: "Enterprise Support",
    price: "4,999",
    period: "/month",
    popular: true,
    features: [
      "Everything in Free, attribution removed",
      "We install and configure it for you",
      "Adapted to your CRM, mail provider, and LinkedIn page",
      "Direct support line for setup and issues",
      "Priority fixes when Delta Labs ships updates",
    ],
    cta: "Contact Us",
    href: ENTERPRISE_MAILTO,
  },
];

const faqs = [
  { q: "Are these actually free?", a: "Yes. Both skills are open source on GitHub under the Free tier. Output carries a small \"powered by Delta Labs AI\" attribution — that's how we fund building and maintaining them." },
  { q: "What do I need to run them?", a: "Each skill folder has a SKILL.md (agent instructions), a README (human setup guide), and a .env.example listing the API keys you need — Zoho Mail for cold email, LinkedIn Company API + WaveSpeed for LinkedIn posts." },
  { q: "What does Enterprise Support include?", a: "We remove the attribution, install and configure the skill against your own stack (your CRM, your mail provider, your LinkedIn page), and give you a direct line for support and priority fixes." },
  { q: "Is this the same code Delta Labs AI runs internally?", a: "Yes. Both skills are extracted directly from our live production automation stack — the same code sending our outreach and posting to our own LinkedIn page." },
  { q: "Do you offer more than these 2 skills?", a: "These are the 2 we're distributing publicly today. If you need something custom, reach out through Enterprise Support and we'll scope it." },
];

export default function SkillsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta /><span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/blog" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Blog</a>
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Diagnostic</a>
            <Btn href={GITHUB} v="primary" style={{ padding: "9px 20px", fontSize: 13 }}><Ic.Git s={15} /> GitHub</Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <F>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>Free, Open Source, Production-Tested</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            AI Automation Skills,<br />Straight From Our Production Stack
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Cold Email Outreach and LinkedIn Company Page Automation — the exact Claude/Paperclip skills Delta Labs AI runs every day. Free to download. Enterprise Support if you want us to set it up for you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={GITHUB}><Ic.Git /> Download on GitHub</Btn>
            <Btn href={ENTERPRISE_MAILTO} v="secondary">Get Enterprise Support</Btn>
          </div>
        </F>
      </section>

      {/* Skills */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>2 skills. Both free.</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {skills.map((sk, i) => (
              <F key={sk.name} d={i * 0.1}>
                <div style={{ background: "#fff", borderRadius: 14, padding: 32, border: "1px solid #f4f4f5", height: "100%", display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{sk.name}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6, marginBottom: 20 }}>{sk.tagline}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", flex: 1 }}>
                    {sk.features.map((f, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#52525b", marginBottom: 10, lineHeight: 1.5 }}>
                        <span style={{ marginTop: 2 }}><Ic.Chk /></span> {f}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 12, color: "#a1a1aa", borderTop: "1px solid #f4f4f5", paddingTop: 16 }}>{sk.stat}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Simple pricing. No middle tier.</h2></F>
        <F d={0.1}><p style={{ textAlign: "center", color: "#71717a", marginBottom: 40, fontSize: 15 }}>Free forever, or let us run it for you.</p></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {plans.map((p, i) => (
            <F key={p.name} d={i * 0.1}>
              <div style={{ borderRadius: 14, padding: 32, border: p.popular ? "2px solid #18181b" : "1px solid #e4e4e7", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#18181b", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 20 }}>Enterprise Support</div>}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 800 }}>{p.price === "0" ? "$0" : `Rs ${p.price}`}</span>
                  <span style={{ color: "#71717a", fontSize: 14 }}> {p.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#52525b", marginBottom: 10 }}>
                      <Ic.Chk /> {f}
                    </li>
                  ))}
                </ul>
                <Btn href={p.href} v={p.popular ? "primary" : "secondary"} style={{ justifyContent: "center", width: "100%" }}>{p.cta}</Btn>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: "center" }}>Frequently asked questions</h2></F>
          {faqs.map((f, i) => (
            <F key={i} d={i * 0.05}>
              <div style={{ borderBottom: "1px solid #e4e4e7", padding: "20px 0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#18181b", textAlign: "left" }}>
                  {f.q}
                  <span style={{ fontSize: 20, transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, marginTop: 12 }}>{f.a}</p>}
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Want the full Delta Labs AI stack?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6 }}>
            These skills are 2 pieces of what we run. If you want the whole automation system built and run for your business, talk to us.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={GITHUB}><Ic.Git /> Download on GitHub</Btn>
            <Btn href={ENTERPRISE_MAILTO} v="secondary">Get Enterprise Support</Btn>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f4f4f5", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#a1a1aa" }}>Delta Labs AI. All rights reserved.</p>
        <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4 }}>neil@mail.deltalabsai.com</p>
      </footer>
    </div>
  );
}
