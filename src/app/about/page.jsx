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
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" /><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3" /></svg>,
  Chk: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
};

function Btn({ children, href, v = "primary", ...p }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .2s", textDecoration: "none", border: "none" };
  const styles = v === "primary"
    ? { ...base, background: "#18181b", color: "#fff" }
    : { ...base, background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7" };
  return <a href={href} style={styles} {...p}>{children}</a>;
}

const proofPoints = [
  "5-dimension diagnostic",
  "Free, about 3 minutes",
  "No credit card needed",
];

const services = [
  { title: "Find out where you're losing money", desc: "Our diagnostic uncovers revenue leaks, operational bottlenecks, and hidden inefficiencies — backed by data, not guesswork." },
  { title: "Fix what's broken, fast", desc: "We redesign your processes, set up proper systems, and eliminate the chaos. SOPs, CRM, workflows — everything your business needs to run without you micromanaging." },
  { title: "Build AI that works while you sleep", desc: "Custom AI agents that handle the repetitive stuff — answering calls, qualifying leads, checking compliance, generating reports — so your team focuses on what humans do best." },
];

const industries = [
  { name: "Dental", href: "/dental", desc: "Appointment reminders, patient recall, and review automation for independent clinics — powered by SmileCRM." },
  { name: "Fitness & Wellness", href: "/fitness", desc: "Class booking, retention, and review automation for gyms and yoga studios." },
  { name: "E-commerce", href: "/solutions", desc: "Cart recovery, support triage, and order automation for D2C sellers." },
  { name: "Home Services", href: "/home-services", desc: "Booking, dispatch, and follow-up automation for plumbers, electricians, and more." },
  { name: "Real Estate", href: "/solutions", desc: "Lead management and WhatsApp drip automation for independent brokers and small agencies." },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#18181b" }}>
            <Ic.Delta /><span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/blog" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Blog</a>
            <a href="/diagnostic" style={{ fontSize: 14, color: "#52525b", textDecoration: "none" }}>Diagnostic</a>
            <Btn href={FORM} v="primary" style={{ padding: "9px 20px", fontSize: 13 }}>Book a Call</Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <F>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#eff6ff", color: "#2563eb", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>About Delta Labs AI</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, margin: "0 0 20px" }}>
            AI consulting and automation<br />built for small businesses
          </h1>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Delta Labs AI helps independent dental clinics, gyms, e-commerce sellers, home services businesses, and real estate agencies automate the operations that eat up their time — so they can focus on the work only they can do.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={FORM}>Get Your Free Diagnostic <Ic.Arr /></Btn>
            <Btn href="/solutions" v="secondary">See Our Solutions</Btn>
          </div>
        </F>
      </section>

      {/* Proof strip */}
      <div style={{ background: "#0F172A", padding: "18px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(16px, 4vw, 40px)", flexWrap: "wrap" }}>
          {proofPoints.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#34D399" }}><Ic.Chk /></span>
              <span style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Why we exist</h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7 }}>
            Small and independent businesses are run by owners who are excellent at their craft — treating patients, coaching members, running a shop, closing a sale — but were never given the systems that large chains and franchises take for granted.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginTop: 16 }}>
            Delta Labs AI was built to close that gap. We combine consulting frameworks with practical AI automation to find exactly where a business is leaking revenue, then fix it — with systems that keep running long after the engagement ends.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7, marginTop: 16 }}>
            SmileCRM, our dental practice management product, is one example of that approach: a purpose-built system for independent dental clinics. It's one product in a broader, founder-led practice focused on solving the same problem across the industries we target.
          </p>
        </F>
      </section>

      {/* Services */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Three ways we help you grow</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <F key={i} d={i * 0.08}>
                <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #f4f4f5", height: "100%" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Founder-led, hands-on</h2>
          <p style={{ fontSize: 16, color: "#52525b", lineHeight: 1.7 }}>
            Delta Labs AI is a small, founder-led consulting team. We work directly with each client to understand their business before recommending or building anything — no account handoffs, no generic playbooks. Every engagement is scoped to the size of business we serve: 2–50 employee independent operators, not chains or franchises.
          </p>
        </F>
      </section>

      {/* Industries */}
      <section style={{ background: "#fafafa", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <F><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: "center" }}>Who we build for</h2></F>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {industries.map((s, i) => (
              <F key={s.name} d={i * 0.06}>
                <a href={s.href} style={{ display: "block", background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #f4f4f5", height: "100%", textDecoration: "none", color: "inherit" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.name}</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </a>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "72px 24px", textAlign: "center" }}>
        <F>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to find out where you're leaking revenue?</h2>
          <p style={{ fontSize: 16, color: "#52525b", marginBottom: 32, lineHeight: 1.6 }}>
            Take our free diagnostic or book a call — no pitch, no commitment.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href={FORM}>Get Your Free Diagnostic <Ic.Arr /></Btn>
            <Btn href="/blog" v="secondary">Read Our Blog</Btn>
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
