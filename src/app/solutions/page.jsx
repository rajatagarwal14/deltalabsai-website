"use client";
import { useState, useEffect, useRef } from "react";
import { useRegionPricing } from "../lib/useRegion";

const DIAG = "/diagnostic";
const BOOK = "https://cal.com/ag-ventures-qbqxax/30min";

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
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all 0.55s ease ${d}s`, ...style }}>{children}</div>;
}

function useTriggeredCTA(key) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) return;
    let shown = false;
    const show = () => { if (!shown) { shown = true; setVisible(true); } };
    const onScroll = () => {
      if ((window.scrollY + window.innerHeight) / document.body.scrollHeight >= 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(show, 45000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, [key]);
  const dismiss = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(key, "1");
  };
  return [visible, dismiss];
}

function StickyBar() {
  const [visible, dismiss] = useTriggeredCTA("cta_solutions");
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      background: "#18181b", color: "#fff", padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.18)", animation: "slideUp 0.4s ease", flexWrap: "wrap",
    }}>
      <p style={{ margin: 0, fontSize: 14, color: "#d4d4d8" }}>Not sure which solution fits your business?</p>
      <a href={DIAG} onClick={dismiss} style={{
        background: "#fff", color: "#18181b", padding: "10px 24px", borderRadius: 8,
        fontWeight: 700, fontSize: 14, textDecoration: "none", flexShrink: 0,
      }}>Take the Free Diagnostic →</a>
      <button onClick={dismiss} style={{
        background: "none", border: "none", color: "#71717a", cursor: "pointer",
        fontSize: 20, lineHeight: 1, padding: 4, position: "absolute", right: 16,
      }}>×</button>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

const solutions = [
  {
    tag: "Dental Clinics",
    name: "SmileCRM",
    desc: "Purpose-built CRM for independent dental clinics. Automates appointment reminders, patient recall, review requests, and WhatsApp follow-ups.",
    features: ["No-show reduction by 40%", "Automated patient recall", "WhatsApp & SMS reminders", "Google review automation"],
    price: "₹2,999–6,999/mo",
    href: "/dental",
    cta: "See SmileCRM",
    accent: "#4f46e5",
  },
  {
    tag: "Sales & Outreach",
    name: "AI BDR",
    desc: "A fully automated business development system that researches leads, writes personalised emails, follows up, and hands warm replies to you.",
    features: ["200 personalised sequences/mo", "35–50% open rates", "AI-written, not templates", "48-hour setup"],
    price: "₹15,000/mo",
    href: "/ai-bdr",
    cta: "See AI BDR",
    accent: "#0ea5e9",
  },
  {
    tag: "Clinics & SMBs",
    name: "AI Voice Receptionist",
    desc: "An AI that answers your business phone 24/7, books appointments, handles FAQs, and never misses a call — even after hours.",
    features: ["24/7 call answering", "Appointment booking", "WhatsApp handoff", "Human escalation"],
    price: "₹2,999/mo",
    href: "/voice-receptionist",
    cta: "Join Waitlist",
    accent: "#38bdf8",
  },
  {
    tag: "Any SMB",
    name: "AI Business Ecosystem",
    desc: "End-to-end automation for your business: CRM setup, workflow automation, lead capture, and AI agents — all connected and running.",
    features: ["n8n / Make.com automations", "Custom AI agents", "CRM + email integration", "Monthly strategy review"],
    price: "Custom",
    href: DIAG,
    cta: "Get a Free Diagnostic",
    accent: "#22c55e",
  },
];

export default function SolutionsPage() {
  const { price } = useRegionPricing();
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: "#18181b", background: "#fff" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f4f4f5", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#18181b", fontWeight: 700, fontSize: 15 }}>
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" /><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3" /></svg>
            Delta Labs AI
          </a>
          <a href={DIAG} style={{ background: "#18181b", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Free Diagnostic</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "72px 24px 48px", textAlign: "center" }}>
        <F>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", marginBottom: 12 }}>Solutions</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>
            AI automation for<br />every small business
          </h1>
          <p style={{ fontSize: 17, color: "#52525b", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Pick the solution that fits your industry. From dental clinics to home services — Delta Labs AI has you covered.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DIAG} style={{ background: "#18181b", color: "#fff", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Take Free Diagnostic</a>
            <a href={BOOK} style={{ background: "transparent", color: "#18181b", border: "1.5px solid #e4e4e7", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Book a Call</a>
          </div>
        </F>
      </section>

      {/* Solutions Grid */}
      <section style={{ padding: "32px 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {solutions.map((s, i) => (
            <F key={s.name} d={i * 0.08}>
              <div style={{ border: "1px solid #e4e4e7", borderRadius: 16, padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: s.accent, textTransform: "uppercase", marginBottom: 10 }}>{s.tag}</p>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>{s.name}</h2>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3f3f46" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f4f4f5", paddingTop: 20 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{price(s.price)}</span>
                  <a href={s.href} style={{ background: s.accent, color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>{s.cta} →</a>
                </div>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* Diagnostic CTA */}
      <section style={{ padding: "64px 24px", background: "#fafafa", borderTop: "1px solid #f4f4f5", textAlign: "center" }}>
        <F>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <p style={{ fontSize: 18, color: "#374151", marginBottom: 28, lineHeight: 1.65 }}>
              Not sure which solution fits your business? Take the free 5-minute AI diagnostic and find out.
            </p>
            <a href={DIAG} style={{ background: "#18181b", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Free Diagnostic →</a>
          </div>
        </F>
      </section>

      {/* Footer */}
      <footer style={{ padding: "28px 24px", borderTop: "1px solid #f4f4f5", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 13, color: "#71717a", flexWrap: "wrap", marginBottom: 12 }}>
            <a href="/" style={{ color: "#71717a", textDecoration: "none" }}>Home</a>
            <a href="/diagnostic" style={{ color: "#71717a", textDecoration: "none" }}>Diagnostic</a>
            <a href="/ai-bdr" style={{ color: "#71717a", textDecoration: "none" }}>AI BDR</a>
            <a href="/voice-receptionist" style={{ color: "#71717a", textDecoration: "none" }}>Voice Receptionist</a>
            <a href="/dental" style={{ color: "#71717a", textDecoration: "none" }}>SmileCRM</a>
            <a href="/privacy" style={{ color: "#71717a", textDecoration: "none" }}>Privacy</a>
          </div>
          <p style={{ fontSize: 12, color: "#a1a1aa", margin: 0 }}>© {new Date().getFullYear()} Delta Labs AI. All rights reserved.</p>
        </div>
      </footer>

      <StickyBar />
    </div>
  );
}
