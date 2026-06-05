"use client";

import { useState, useEffect, useRef } from "react";

const TRIAL_API = "https://delta-labs-ecosystem.vercel.app/api/trial/signup";
const DIAG = "/diagnostic";

// ── Intersection fade ─────────────────────────────────────────────────────────
function useFade() {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}
function F({ children, d = 0, style: sx = {} }) {
  const [r, v] = useFade();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `all 0.6s ease ${d}s`, ...sx }}>{children}</div>;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = {
  Delta: () => <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Chk: ({ c = "#059669", s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Spin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
};

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [m, setM] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["Home", "/"], ["Services", "/#services"], ["Store", "/store"], ["Blog", "/blog"], ["Diagnostic", "/diagnostic"]];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", boxShadow: sc ? "0 2px 16px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.3s" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#0F172A" }}>
          <Ic.Delta /><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>Delta Labs AI</span>
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {links.map(([l, href]) => (
            <a key={href} href={href} style={{ fontSize: 14, fontWeight: href === "/store" ? 700 : 500, color: href === "/store" ? "#2563EB" : "#374151", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "#2563EB"} onMouseLeave={e => e.target.style.color = href === "/store" ? "#2563EB" : "#374151"}>{l}</a>
          ))}
          <a href={DIAG} style={{ background: "#0F172A", color: "#fff", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Free Diagnostic</a>
        </div>
        <button className="nav-mobile" onClick={() => setM(!m)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "#0F172A" }}>{m ? <Ic.X /> : <Ic.Menu />}</button>
      </div>
      {m && (
        <div style={{ background: "#fff", padding: "8px 24px 20px", borderTop: "1px solid #F3F4F6" }}>
          {links.map(([l, href]) => <a key={href} href={href} onClick={() => setM(false)} style={{ display: "block", padding: "14px 0", fontSize: 16, fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #F3F4F6" }}>{l}</a>)}
          <a href={DIAG} style={{ display: "block", marginTop: 12, textAlign: "center", background: "#0F172A", color: "#fff", padding: "14px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>Free Diagnostic</a>
        </div>
      )}
      <style>{`@media(max-width:768px){.nav-links{display:none!important}.nav-mobile{display:block!important}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </nav>
  );
}

// ── Trial Modal ───────────────────────────────────────────────────────────────
const BIZ_TYPES = [
  ["dental", "Dental / Healthcare"],
  ["fitness", "Fitness & Wellness"],
  ["ecommerce", "E-commerce / Online Store"],
  ["homeservices", "Home Services"],
  ["realestate", "Real Estate"],
  ["restaurant", "Restaurant / Café / F&B"],
  ["ca", "CA / Accounting / Professional Services"],
  ["other", "Other Small Business"],
];

function TrialModal({ product, productName, defaultBiz, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", business_type: defaultBiz || "" });
  const [state, setState] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.business_type) { setErrMsg("All fields are required."); return; }
    setState("loading"); setErrMsg("");
    try {
      const res = await fetch(TRIAL_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, product }) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      setState("done");
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Try again.");
      setState("error");
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: "#fff", borderRadius: 22, padding: "36px 32px", width: "100%", maxWidth: 460, boxShadow: "0 28px 64px rgba(0,0,0,0.22)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}><Ic.X /></button>

        {state === "done" ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📬</div>
            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>Check your inbox!</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#4B5563", lineHeight: 1.7, margin: "0 0 24px" }}>
              Magic link sent to <strong>{form.email}</strong>.<br/>Click it to open your trial — no password needed.
            </p>
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "16px 20px", textAlign: "left", marginBottom: 20 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#065F46", margin: "0 0 8px", fontWeight: 700 }}>✅ Your trial includes:</p>
              <ul style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#047857", margin: 0, paddingLeft: 18, lineHeight: 2.1 }}>
                <li>AI business report (real analysis, not a template)</li>
                <li>5 industry email templates</li>
                <li>Live leads from our database</li>
                {product === "smilecrm" && <li>Your own SmileCRM clinic instance</li>}
              </ul>
            </div>
            <button onClick={onClose} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 22 }}>
              <span style={{ background: "#DCFCE7", color: "#166534", borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>FREE 2-DAY TRIAL</span>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "10px 0 4px" }}>{productName}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", margin: 0 }}>No credit card · No install · Cancel anytime</p>
            </div>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { key: "name", label: "Your name", type: "text", placeholder: "e.g. Priya Sharma" },
                { key: "email", label: "Work email", type: "email", placeholder: "you@yourcompany.com" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} required
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: "1.5px solid #D1D5DB", fontFamily: "'DM Sans',sans-serif", fontSize: 14, boxSizing: "border-box", outline: "none" }}
                    onFocus={e => e.target.style.borderColor = "#059669"} onBlur={e => e.target.style.borderColor = "#D1D5DB"} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Your business type</label>
                <select value={form.business_type} onChange={e => setForm(f => ({ ...f, business_type: e.target.value }))} required
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: "1.5px solid #D1D5DB", fontFamily: "'DM Sans',sans-serif", fontSize: 14, boxSizing: "border-box", background: "#fff", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#059669"} onBlur={e => e.target.style.borderColor = "#D1D5DB"}>
                  <option value="">Select your industry…</option>
                  {BIZ_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              {errMsg && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#DC2626", margin: 0 }}>{errMsg}</p>}
              <button type="submit" disabled={state === "loading"}
                style={{ width: "100%", padding: "14px", borderRadius: 11, border: "none", cursor: state === "loading" ? "wait" : "pointer", background: state === "loading" ? "#6B7280" : "#059669", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
                {state === "loading" ? <><Ic.Spin />Starting trial…</> : "Start My Free Trial →"}
              </button>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>Magic link sent to your inbox · Trial lasts 48 hours</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Pill badge ────────────────────────────────────────────────────────────────
function Pill({ children, color = "#2563EB", bg = "#EFF6FF" }) {
  return <span style={{ background: bg, color, borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{children}</span>;
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ name, emoji, desc, price, pricePeriod = "/mo", badge, badgeColor = "#2563EB", badgeBg = "#EFF6FF", features = [], cta = "Start Free Trial", ctaHref, onTrial, highlight = false, delay = 0, ribbon }) {
  return (
    <F d={delay}>
      <div style={{
        borderRadius: 18, border: highlight ? "2px solid #2563EB" : "1.5px solid #E5E7EB",
        padding: "28px 24px", background: "#fff", display: "flex", flexDirection: "column",
        height: "100%", position: "relative", transition: "all 0.25s",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.09)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
      >
        {ribbon && <div style={{ position: "absolute", top: -1, right: 20, background: "#2563EB", color: "#fff", padding: "5px 14px", borderRadius: "0 0 10px 10px", fontSize: 11, fontWeight: 800, letterSpacing: "0.04em" }}>{ribbon}</div>}
        {badge && <div style={{ marginBottom: 12 }}><Pill color={badgeColor} bg={badgeBg}>{badge}</Pill></div>}
        <div style={{ fontSize: 32, marginBottom: 8 }}>{emoji}</div>
        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#0F172A", margin: "0 0 8px", lineHeight: 1.2 }}>{name}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: "0 0 18px", flex: "0 0 auto" }}>{desc}</p>
        <div style={{ margin: "0 0 20px" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 32, fontWeight: 800, color: "#0F172A" }}>{price}</span>
          {pricePeriod && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{pricePeriod}</span>}
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
          {features.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 9, fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}><Ic.Chk /></span>{f}
            </li>
          ))}
        </ul>
        {onTrial ? (
          <button onClick={onTrial} style={{
            width: "100%", padding: "13px 20px", borderRadius: 11, border: "none", cursor: "pointer",
            background: highlight ? "#059669" : "#0F172A", color: "#fff",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            🚀 {cta}
          </button>
        ) : (
          <a href={ctaHref || "#cal-book"} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px 20px", borderRadius: 11, textDecoration: "none",
            background: "#F8FAFC", color: "#0F172A", border: "1.5px solid #E5E7EB",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0F172A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0F172A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
          >
            {cta} <Ic.Arr />
          </a>
        )}
      </div>
    </F>
  );
}

// ── Consulting Card ───────────────────────────────────────────────────────────
function ConsultCard({ emoji, name, desc, price, highlight = false, delay = 0 }) {
  return (
    <F d={delay}>
      <div style={{
        borderRadius: 16, border: highlight ? "2px solid #0F172A" : "1.5px solid #E5E7EB",
        padding: "24px", background: highlight ? "#0F172A" : "#fff",
        display: "flex", flexDirection: "column", height: "100%", transition: "all 0.25s",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
      >
        <div style={{ fontSize: 28, marginBottom: 10 }}>{emoji}</div>
        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 700, color: highlight ? "#fff" : "#0F172A", margin: "0 0 8px" }}>{name}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: highlight ? "#94A3B8" : "#6B7280", lineHeight: 1.65, margin: "0 0 auto", paddingBottom: 20 }}>{desc}</p>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 800, color: highlight ? "#10B981" : "#0F172A" }}>{price}</span>
        </div>
        <a href="#cal-book" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "12px 16px", borderRadius: 10, textDecoration: "none",
          background: highlight ? "#059669" : "transparent",
          color: highlight ? "#fff" : "#0F172A",
          border: highlight ? "none" : "1.5px solid #D1D5DB",
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, transition: "all 0.2s",
        }}
          onMouseEnter={e => { if (!highlight) { e.currentTarget.style.background = "#0F172A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0F172A"; } }}
          onMouseLeave={e => { if (!highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.borderColor = "#D1D5DB"; } }}
        >
          Book a Call <Ic.Arr />
        </a>
      </div>
    </F>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHead({ pill, title, sub, light = false }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      {pill && <div style={{ marginBottom: 14 }}><Pill>{pill}</Pill></div>}
      <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: light ? "#fff" : "#0F172A", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: light ? "#94A3B8" : "#6B7280", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ── Trust logos ───────────────────────────────────────────────────────────────
const TRUST = ["Dental Clinics", "Fitness Studios", "Real Estate Agencies", "Home Services", "E-commerce Brands", "CA Firms"];

// ── Reviews ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Dr. Anita Sharma", role: "Dentist, Bengaluru", quote: "SmileCRM cut my no-show rate by 40% in the first month. The WhatsApp automation is magic.", stars: 5 },
  { name: "Ravi Kumar", role: "Gym Owner, Hyderabad", quote: "Set up in under 10 minutes. The AI handles follow-ups I used to do manually every evening.", stars: 5 },
  { name: "Priya Nair", role: "E-commerce Founder", quote: "The outreach agent booked 3 B2B calls in the first week. I didn't have to do anything.", stars: 5 },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function StorePage() {
  const [modal, setModal] = useState(null); // { product, productName, defaultBiz }
  const openTrial = (product, productName, defaultBiz) => setModal({ product, productName, defaultBiz });

  // ── Region-based pricing ──────────────────────────────────────────────────────
  // India visitors see ₹ pricing. International visitors see custom/book-a-call
  // (premium positioning — no cheap-anchor ₹ shown abroad). Free, timezone-based.
  const [region, setRegion] = useState("in"); // "in" | "intl" — default ₹ to avoid flash
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setRegion(tz === "Asia/Kolkata" || tz === "Asia/Calcutta" ? "in" : "intl");
    } catch { setRegion("in"); }
  }, []);
  const isIntl = region === "intl";
  const px = (raw) => (isIntl ? "Custom" : raw);
  const pxPeriod = (raw) => (isIntl ? "— book a call" : raw);

  const SAAS_PRODUCTS = [
    {
      id: "smilecrm", emoji: "🦷", name: "SmileCRM", defaultBiz: "dental", highlight: true, ribbon: "MOST POPULAR",
      badge: "For Dental Clinics", badgeColor: "#059669", badgeBg: "#F0FDF4",
      desc: "Purpose-built CRM for dental clinics. Appointment automation, patient recall, WhatsApp follow-ups, and analytics — all in one.",
      price: "₹2,999", pricePeriod: "/mo · Free 14-day trial",
      features: ["Appointment calendar + queue management", "Patient records & treatment history", "WhatsApp reminder automation", "No-show reduction workflows", "Revenue & analytics dashboard", "Practo sync (optional)"],
    },
    {
      id: "fitbiz", emoji: "💪", name: "FitBiz Dashboard", defaultBiz: "fitness",
      badge: "For Gyms & Studios", badgeColor: "#7C3AED", badgeBg: "#F5F3FF",
      desc: "Member management, churn prevention, class scheduling, and AI-powered retention campaigns for fitness businesses.",
      price: "₹1,999", pricePeriod: "/mo · Free trial",
      features: ["Member attendance & tracking", "Churn prediction alerts", "Automated renewal reminders", "Class schedule management", "Revenue dashboard"],
    },
    {
      id: "lead-gen", emoji: "🎯", name: "Lead Gen Agent", defaultBiz: "other",
      badge: "For Any Business", badgeColor: "#2563EB", badgeBg: "#EFF6FF",
      desc: "AI agent that scrapes, qualifies, and delivers high-intent leads for your industry — with emails, phone numbers, and AI scoring.",
      price: "₹3,499", pricePeriod: "/mo",
      features: ["300+ pre-qualified leads", "Email + phone contacts", "AI lead scoring (0-100)", "Industry-specific filters", "Weekly lead delivery"],
    },
    {
      id: "outreach", emoji: "📧", name: "Outreach Agent", defaultBiz: "other",
      badge: "Cold Email AI", badgeColor: "#D97706", badgeBg: "#FFFBEB",
      desc: "AI writes, sends, and follows up on cold emails for you. Tracks opens, clicks, bounces. All on autopilot.",
      price: "₹2,499", pricePeriod: "/mo",
      features: ["AI-written personalized emails", "Automated follow-up sequences", "Open & click tracking", "Bounce handling + blocklist", "Zoho Mail integration"],
    },
    {
      id: "content", emoji: "✍️", name: "Content Agent", defaultBiz: "other",
      badge: "LinkedIn + Blog", badgeColor: "#0891B2", badgeBg: "#ECFEFF",
      desc: "Generates LinkedIn posts, blog drafts, and social content for your business — tailored to your industry and voice.",
      price: "₹1,499", pricePeriod: "/mo",
      features: ["Daily LinkedIn posts", "Blog article drafts", "Industry-relevant topics", "Engagement optimization", "Approval workflow"],
    },
    {
      id: "crm-agent", emoji: "🤖", name: "CRM Agent", defaultBiz: "other",
      badge: "AI CRM Assistant", badgeColor: "#6D28D9", badgeBg: "#EDE9FE",
      desc: "Automates your CRM workflows — follow-ups, status updates, lead scoring, pipeline management — without you lifting a finger.",
      price: "₹2,999", pricePeriod: "/mo",
      features: ["Auto follow-up sequences", "Lead scoring & prioritization", "Pipeline health alerts", "Activity logging", "Telegram notifications"],
    },
  ];

  const CONSULT_PRODUCTS = [
    { emoji: "🧠", name: "AI Strategy Sprint", desc: "2-week intensive: map your business, identify automation opportunities, build a 90-day AI roadmap.", price: "₹24,999", highlight: false },
    { emoji: "⚡", name: "Automation Setup", desc: "We build your custom automation stack — CRM, outreach, follow-ups, reporting — from scratch, end to end.", price: "₹49,999+", highlight: true },
    { emoji: "📊", name: "Monthly AI Retainer", desc: "Ongoing AI & automation partnership. We operate as your embedded AI team: strategy + execution + reporting.", price: "₹19,999/mo", highlight: false },
  ];

  const STAT_ITEMS = [
    { n: "300+", l: "SMBs using our tools" },
    { n: "9%", l: "Cold email open rate" },
    { n: "48h", l: "Setup to first result" },
    { n: "40%", l: "Avg no-show reduction" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#fff", overflowX: "hidden" }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ color: "#10B981", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>🟢 ALL SYSTEMS LIVE · NO THEATRICS</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5.5vw,58px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            AI tools for small businesses.<br />
            <span style={{ background: "linear-gradient(90deg, #10B981, #059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ready in 2 minutes.</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
            From dental CRMs to cold email agents — real tools, real automation. Start a 2-day free trial and see results before you pay.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => openTrial("general", "AI Business Suite", "other")} style={{ background: "#059669", color: "#fff", border: "none", padding: "15px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              🚀 Start Free Trial <Ic.Arr />
            </button>
            <a href={DIAG} style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              Free Diagnostic <Ic.Arr />
            </a>
          </div>
          <p style={{ margin: "20px 0 0", fontSize: 13, color: "#64748B" }}>No credit card · No install · Cancel anytime</p>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E5E7EB", padding: "28px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
          {STAT_ITEMS.map(({ n, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 32, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.03em" }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST BAR ────────────────────────────────────────────────── */}
      <div style={{ padding: "24px", textAlign: "center", borderBottom: "1px solid #E5E7EB" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>USED BY SMALL BUSINESSES IN</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {TRUST.map(t => <Pill key={t} color="#374151" bg="#F3F4F6">{t}</Pill>)}
        </div>
      </div>

      {/* ── SAAS PRODUCTS ────────────────────────────────────────────── */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <SectionHead pill="READY-TO-USE PRODUCTS" title="Start a trial. Use it today." sub="Real tools with real functionality — not demos. Sign up and be running in under 10 minutes." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {SAAS_PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} delay={i * 0.07}
                name={p.name} emoji={p.emoji} desc={p.desc}
                price={px(p.price)} pricePeriod={pxPeriod(p.pricePeriod)}
                badge={p.badge} badgeColor={p.badgeColor} badgeBg={p.badgeBg}
                features={p.features} highlight={p.highlight} ribbon={p.ribbon}
                onTrial={() => openTrial(p.id, p.name, p.defaultBiz)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <div style={{ background: "#F8FAFC", padding: "80px 24px", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHead pill="HOW IT WORKS" title="From signup to running in 3 steps" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
            {[
              { n: "01", title: "Pick your product", body: "Choose the tool that fits your business. Click Start Free Trial — takes 30 seconds." },
              { n: "02", title: "Magic link to inbox", body: "We email you a secure link — no password, no install. Click to open your trial dashboard." },
              { n: "03", title: "Use it for real", body: "Real AI, real data, real automation. See results before the 48-hour trial ends." },
            ].map(({ n, title, body }, i) => (
              <F key={n} d={i * 0.1}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 40, fontWeight: 900, color: "#E5E7EB", lineHeight: 1, marginBottom: 14 }}>{n}</div>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 800, color: "#0F172A", margin: "0 0 10px" }}>{title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{body}</p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead pill="WHAT CUSTOMERS SAY" title="Results, not promises" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {REVIEWS.map(({ name, role, quote, stars }, i) => (
              <F key={name} d={i * 0.1}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #E5E7EB", padding: "24px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: stars }).map((_, i) => <Ic.Star key={i} />)}
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#374151", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>"{quote}"</p>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#0F172A", margin: 0 }}>{name}</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>{role}</p>
                  </div>
                </div>
              </F>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONSULTING ───────────────────────────────────────────────── */}
      <div style={{ background: "#0F172A", padding: "80px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionHead light pill="DONE-FOR-YOU" title="Need us to build it for you?" sub="Our consulting packages include strategy, build, and ongoing operations. We become your AI team." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
            {CONSULT_PRODUCTS.map((p, i) => <ConsultCard key={p.name} delay={i * 0.1} {...p} price={px(p.price)} />)}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #059669, #047857)", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <F>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Start your 2-day trial today
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: "#D1FAE5", margin: "0 0 36px", lineHeight: 1.65 }}>
              No credit card. No install. Real tools that run in your browser. If you don't see value in 48 hours, the trial expires — no questions asked.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => openTrial("general", "AI Business Suite", "other")} style={{ background: "#fff", color: "#059669", border: "none", padding: "15px 32px", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                🚀 Start Free Trial
              </button>
              <a href="#cal-book" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                Book a Call <Ic.Arr />
              </a>
            </div>
          </F>
        </div>
      </div>

      {/* Diagnostic CTA */}
      <div style={{ padding: "64px 24px", background: "#fafafa", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <F>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "#374151", marginBottom: 28, lineHeight: 1.65 }}>
              Not sure which solution fits your business? Take the free 5-minute AI diagnostic and find out.
            </p>
            <a href={DIAG} style={{ fontFamily: "'DM Sans',sans-serif", background: "#18181b", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>Start Free Diagnostic →</a>
          </div>
        </F>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <div style={{ background: "#0F172A", padding: "40px 24px", borderTop: "1px solid #1E293B" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#fff" }}><Ic.Delta /></span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>Delta Labs AI</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Home", "/"], ["Store", "/store"], ["Blog", "/blog"], ["Diagnostic", "/diagnostic"], ["Privacy", "/privacy"]].map(([l, href]) => (
              <a key={href} href={href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#64748B", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#64748B"}>{l}</a>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#475569", margin: 0 }}>© 2026 Delta Labs AI</p>
        </div>
      </div>

      {/* Trial modal */}
      {modal && <TrialModal product={modal.product} productName={modal.productName} defaultBiz={modal.defaultBiz} onClose={() => setModal(null)} />}
    </div>
  );
}
