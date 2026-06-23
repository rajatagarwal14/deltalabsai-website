"use client";

import { useState, useEffect, useRef } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const FORM = "/diagnostic";

function useScrollTo() { return (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }
function useFade(eager = false) {
  const r = useRef(null); const [v, setV] = useState(eager);
  useEffect(() => {
    if (eager) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (r.current) o.observe(r.current);
    // Fallback: if observer never fires (e.g. already in view, layout quirk), reveal anyway.
    const t = setTimeout(() => setV(true), 1200);
    return () => { o.disconnect(); clearTimeout(t); };
  }, [eager]);
  return [r, v];
}
// eager=true → render visible immediately (above-the-fold; never gate on scroll/JS hydration).
function F({ children, d = 0, eager = false, style = {} }) {
  const [r, v] = useFade(eager);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all 0.65s ease ${d}s`, ...style }}>{children}</div>;
}

// Icons
const Ic = {
  Delta: ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Arr: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Chk: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Wrench: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Bot: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Mail: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  LI: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  FB: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
};

// Btn
function Btn({ children, onClick, primary = true, href, calLink, style: sx = {} }) {
  // calLink → Cal.com popup embed (no redirect). href → regular link. Neither → button with onClick.
  const isCalLink = !!calLink;
  const Tag = isCalLink ? "button" : href ? "a" : "button";
  const calProps = isCalLink ? {
    "data-cal-link": calLink,
    "data-cal-namespace": "30min",
    "data-cal-config": JSON.stringify({ layout: "month_view" }),
    type: "button",
  } : {};
  const props = isCalLink ? calProps : href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : { onClick };
  return (
    <Tag {...props} style={{
      display: "inline-flex", alignItems: "center", gap: 8, border: "none", borderRadius: 10, cursor: "pointer",
      padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15,
      textDecoration: "none", transition: "all 0.2s",
      background: primary ? "#0F172A" : "#fff", color: primary ? "#fff" : "#374151",
      ...(primary ? {} : { border: "1.5px solid #D1D5DB" }), ...sx,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = primary ? "0 8px 24px rgba(15,23,42,0.28)" : "0 4px 16px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
    >{children}</Tag>
  );
}

// FAQ Accordion
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How much does it cost?", a: "Our free diagnostic gives you immediate insights at no cost. Consulting engagements are customized to your business size and needs  - we'll discuss pricing on your discovery call after we understand your situation. Digital products start at $19." },
    { q: "We're not very tech-savvy. Is this for us?", a: "Absolutely. Most of our clients aren't technical. We handle the complex stuff and give you simple, clear recommendations. If you can use email and a spreadsheet, you're good. Our AI tools are designed to be used by anyone on your team." },
    { q: "How quickly will we see results?", a: "Most clients see measurable improvements within 6-12 weeks. Quick wins (like process bottleneck fixes) often show impact within days. Larger transformations typically take 2-3 months to fully implement." },
    { q: "Are we locked into a long-term contract?", a: "No. We don't do lock-in contracts. Engagements are project-based or month-to-month. You stay because you're getting results, not because of a contract." },
    { q: "What if the discovery call isn't useful?", a: "If we can't identify at least one actionable quick win in your 30-minute call, we'll send you our DX Roadmap Template ($79 value) completely free. We've never had to do this." },
  ];
  return (
    <section id="faq" style={{ padding: "88px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <F><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 10px" }}>Common questions</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#6B7280" }}>Everything you need to know before getting started.</p>
        </div></F>
        <div style={{ display: "grid", gap: 8 }}>
          {faqs.map((f, i) => (
            <F key={i} d={i * 0.05}>
              <div style={{ borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden", background: open === i ? "#FAFBFF" : "#fff", transition: "background 0.2s" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 20px", border: "none", background: "none", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600, color: "#0F172A", textAlign: "left",
                }}>
                  {f.q}
                  <span style={{ color: "#9CA3AF", flexShrink: 0, marginLeft: 12, transition: "transform 0.2s", transform: open === i ? "rotate(0)" : "" }}>
                    {open === i ? <Ic.Minus /> : <Ic.Plus />}
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <p style={{ padding: "0 20px 18px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#4B5563", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
              </div>
            </F>
          ))}
        </div>
      </div>
    </section>
  );
}

// Announcement Bar — above-the-fold Free AI Diagnostic CTA
function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const trackClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "diagnostic_annbar_click", { event_category: "CRO", event_label: "announcement_bar" });
    }
  };
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: "linear-gradient(90deg, #065F46 0%, #047857 100%)",
      padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "center",
      gap: 12, flexWrap: "wrap",
    }}>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
        <style>{`@keyframes dl-free-pulse{0%,100%{opacity:1}50%{opacity:.55}}`}</style>
        <span style={{ background: "#10B981", color: "#fff", borderRadius: 100, padding: "2px 10px", fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap", animation: "dl-free-pulse 1.4s infinite" }}>Free</span>
        <span className="ann-text">Find where your business leaks revenue — AI scores you across 9 dimensions in 3 minutes.</span>
      </span>
      <a href="/diagnostic" onClick={trackClick} style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "#fff", color: "#065F46",
        borderRadius: 8, padding: "7px 18px",
        fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13,
        textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
        transition: "background 0.15s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#ECFDF5"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
      >
        Get Your Free Diagnostic <Ic.Arr />
      </a>
      <button onClick={() => setVisible(false)} aria-label="Dismiss" style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)",
        padding: 4, display: "flex", alignItems: "center",
      }}>
        <Ic.X />
      </button>
      <style>{`@media(max-width:640px){.ann-text{display:none!important}}`}</style>
    </div>
  );
}

// Navbar
function Nav() {
  const scrollTo = useScrollTo();
  const [m, setM] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["How It Works", "how"], ["Services", "services"], ["Store", "store"], ["Blog", "blog"], ["FAQ", "faq"]];
  return (
    <nav style={{ position: "fixed", top: 44, left: 0, right: 0, zIndex: 150, background: sc ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: sc ? "blur(12px)" : "none", borderBottom: sc ? "1px solid #E5E7EB" : "none", transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: sc ? "#0F172A" : "#FFFFFF" }}>
          <Ic.Delta /><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Delta Labs AI</span>
        </div>
        <div className="dln" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {links.map(([l, id]) => { const lc = sc ? "#4B5563" : "#E2E8F0"; return id === "blog" || id === "store" ? <a key={id} href={`/${id}`} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: lc, transition: "color 0.15s", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#2563EB"} onMouseLeave={e => e.target.style.color = lc}>{l}</a> : <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: lc, transition: "color 0.15s" }} onMouseEnter={e => e.target.style.color = "#2563EB"} onMouseLeave={e => e.target.style.color = lc}>{l}</button>; })}
          <Btn href={FORM} style={{ padding: "9px 20px", fontSize: 13 }}>Free Diagnostic <Ic.Arr /></Btn>
        </div>
        <button className="dlm" onClick={() => setM(!m)} aria-label={m ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "#0F172A" }}>{m ? <Ic.X /> : <Ic.Menu />}</button>
      </div>
      {m && <div style={{ background: "#fff", padding: "8px 24px 20px", borderTop: "1px solid #E5E7EB" }}>
        {links.map(([l, id]) => id === "blog" || id === "store" ? <a key={id} href={`/${id}`} style={{ display: "block", width: "100%", textAlign: "left", padding: "16px 0", minHeight: 48, fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #F3F4F6" }}>{l}</a> : <button key={id} onClick={() => { scrollTo(id); setM(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "16px 0", minHeight: 48, fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, color: "#374151", cursor: "pointer", borderBottom: "1px solid #F3F4F6" }}>{l}</button>)}
        <Btn href={FORM} onClick={() => setM(false)} style={{ width: "100%", marginTop: 12, justifyContent: "center", fontSize: 14 }}>Free Diagnostic</Btn>
      </div>}
      <style>{`@media(max-width:768px){.dln{display:none!important}.dlm{display:block!important}}`}</style>
    </nav>
  );
}

// Radar instrument \u2014 live 9-dimension diagnostic visual (ported from premium design)
function Radar() {
  const ref = useRef(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    svg.innerHTML = "";
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ACC = "#3B82F6", LEAK = "#F87171", RING = "rgba(255,255,255,0.10)", LBL = "rgba(255,255,255,0.45)";
    const cx = 200, cy = 200, R = 150, NS = "http://www.w3.org/2000/svg";
    const dims = [
      { label: "Revenue", v: 0.58 }, { label: "Sales", v: 0.42 }, { label: "Ops", v: 0.71 },
      { label: "Team", v: 0.66 }, { label: "Tech", v: 0.38 }, { label: "Data", v: 0.49 },
      { label: "Finance", v: 0.62 }, { label: "Marketing", v: 0.45 }, { label: "Customer", v: 0.74 },
    ];
    const n = dims.length;
    const pt = (i, r) => { const a = (Math.PI * 2 * i) / n - Math.PI / 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
    [0.25, 0.5, 0.75, 1].forEach(f => {
      let poly = ""; for (let i = 0; i < n; i++) { const p = pt(i, R * f); poly += p[0] + "," + p[1] + " "; }
      svg.appendChild(el("polygon", { points: poly.trim(), fill: "none", stroke: RING, "stroke-width": 1 }));
    });
    dims.forEach((d, i) => {
      const p = pt(i, R);
      svg.appendChild(el("line", { x1: cx, y1: cy, x2: p[0], y2: p[1], stroke: RING, "stroke-width": 1 }));
      const lp = pt(i, R + 22);
      const t = el("text", { x: lp[0], y: lp[1], fill: LBL, "font-size": 11, "font-family": "monospace", "text-anchor": "middle", "dominant-baseline": "middle" });
      t.textContent = d.label; svg.appendChild(t);
    });
    let dpoly = ""; dims.forEach((d, i) => { const p = pt(i, R * d.v); dpoly += p[0] + "," + p[1] + " "; });
    const area = el("polygon", { points: dpoly.trim(), fill: ACC, "fill-opacity": 0.16, stroke: ACC, "stroke-width": 2, "stroke-linejoin": "round" });
    svg.appendChild(area);
    dims.forEach((d, i) => { const p = pt(i, R * d.v); svg.appendChild(el("circle", { cx: p[0], cy: p[1], r: 3.5, fill: d.v < 0.5 ? LEAK : ACC })); });
    svg.appendChild(el("circle", { cx, cy, r: 2.5, fill: LBL }));
    if (!reduce) {
      // Scale-in of the data polygon (CSS keyframes — reliable on SVG via transform-box)
      area.classList.add("dl-radar-area");
      // Continuous rotating sweep line via pure CSS animation (no rAF lifecycle issues)
      const sweep = el("line", { x1: cx, y1: cy, x2: cx, y2: cy - R, stroke: ACC, "stroke-width": 1.5, "stroke-opacity": 0.5 });
      sweep.setAttribute("class", "dl-radar-sweep");
      svg.appendChild(sweep);
    }
  }, []);
  return (
    <div style={{ position: "relative", aspectRatio: "1", maxWidth: 440, margin: "0 auto", width: "100%" }}>
      <style>{`
        .dl-radar-area{transform-box:fill-box;transform-origin:center;animation:dlRadarIn 1s cubic-bezier(.22,1,.36,1) both}
        @keyframes dlRadarIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        .dl-radar-sweep{transform-origin:200px 200px;animation:dlRadarSpin 6s linear infinite}
        @keyframes dlRadarSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(prefers-reduced-motion:reduce){.dl-radar-area,.dl-radar-sweep{animation:none}}
      `}</style>
      <svg ref={ref} viewBox="0 0 400 400" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Live business diagnostic radar across 9 dimensions" />
      <span style={{ position: "absolute", top: 0, left: 0, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>DIAGNOSTIC · LIVE</span>
      <span style={{ position: "absolute", top: 0, right: 0, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>9 DIMENSIONS</span>
      <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 18, fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>
        <span>HEALTH&nbsp;<b style={{ color: "#3B82F6" }}>57</b></span>
        <span>LEAKS&nbsp;<b style={{ color: "#F87171" }}>3</b></span>
        <span>48 DATA PTS</span>
      </div>
    </div>
  );
}

// Hero \u2014 premium editorial redesign (dark, split layout with live radar)
function Hero() {
  const scrollTo = useScrollTo();
  return (
    <section style={{ background: "linear-gradient(160deg, #0B1220 0%, #0F1B33 100%)", color: "#fff", padding: "120px 24px 92px", overflow: "hidden" }}>
      <div className="hero-grid" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: 48, alignItems: "center" }}>
        <div>
          <F eager>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "6px 14px", fontSize: 13, color: "#cbd5e1", fontFamily: "'DM Sans',sans-serif", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", flexShrink: 0 }} />
              Free · 3 minutes · Instant results across <b style={{ color: "#fff", margin: "0 4px" }}>9 business dimensions</b>
            </div>
          </F>
          <F eager d={0.08}>
            <h1 className="hero-h1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(38px, 5.6vw, 64px)", fontWeight: 500, lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
              AI Automation for Small Business —{" "}
              <em style={{ color: "#60A5FA", fontStyle: "italic" }}>Get Your Free Delta Labs AI Diagnostic</em>
            </h1>
          </F>
          <F eager d={0.16}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(16px, 1.6vw, 19px)", color: "#94a3b8", lineHeight: 1.7, maxWidth: 520, margin: "0 0 34px" }}>
              See exactly where your business is losing time and money — in 3 minutes.
            </p>
          </F>
          <F eager d={0.24}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn href={FORM} style={{ background: "#2563EB", fontSize: 16, padding: "16px 34px", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>Get Your Free Diagnostic <Ic.Arr /></Btn>
              <a onClick={() => scrollTo("how")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", color: "#e2e8f0", border: "1.5px solid rgba(255,255,255,0.18)", background: "transparent" }}>See how it works</a>
            </div>
          </F>
          <F eager d={0.35}>
            <div style={{ marginTop: 44, display: "flex", gap: "clamp(20px, 4vw, 44px)", flexWrap: "wrap" }}>
              {[["3 min", "free diagnostic\nno card needed"], ["14", "industries\nserved globally"], ["6-12 wks", "to measurable\nresults"]].map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, color: i === 0 ? "#60A5FA" : "#fff" }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#64748b", fontWeight: 500, marginTop: 4, whiteSpace: "pre-line", lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </F>
        </div>
        <F eager d={0.2}>
          <div className="hero-radar"><Radar /></div>
        </F>
      </div>
      <style>{`@media(max-width:860px){.hero-grid{grid-template-columns:1fr!important}.hero-radar{margin-top:24px;max-width:380px}.hero-h1{font-size:clamp(34px,9vw,46px)!important}}`}</style>
    </section>
  );
}

// Social Proof Bar \u2014 honest credibility only (real testimonials drop in when ready, no invented numbers)
function Proof() {
  return (
    <div style={{ background: "#0F172A", padding: "18px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(16px, 4vw, 40px)", flexWrap: "wrap" }}>
        {["Built on Fortune 500 consulting frameworks", "AI analysis across 48 data points", "9-dimension diagnostic - free audit"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#34D399" }}><Ic.Chk /></span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero CTA Band — below hero, above diagnostic section
function HeroCTABand() {
  return (
    <section style={{ padding: "48px 24px", background: "linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)", textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <F>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", color: "#34D399", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Free · 3 Minutes · Instant Results
          </p>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 8px", lineHeight: 1.2 }}>
            Stop losing revenue to hidden inefficiencies.
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px, 1.8vw, 17px)", color: "#94A3B8", margin: "0 0 28px", lineHeight: 1.6 }}>
            Our AI scans 9 dimensions of your business and pinpoints exactly where money is leaking — in minutes.
          </p>
          <Btn href={FORM} style={{ background: "#2563EB", color: "#fff", fontSize: 17, padding: "16px 36px", borderRadius: 12, boxShadow: "0 4px 24px rgba(37,99,235,0.4)" }}>
            Get Your Free Diagnostic <Ic.Arr />
          </Btn>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#64748B", margin: "14px 0 0" }}>No credit card required. No sales call needed.</p>
        </F>
      </div>
    </section>
  );
}

// Diagnostic CTA
function DiagnosticCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="diagnostic" style={{ padding: "88px 24px", background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <F>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#fff", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#2563EB", boxShadow: "0 2px 12px rgba(37,99,235,0.08)" }}>
            <Ic.Search />
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 12px" }}>How much is your business leaking?</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#4B5563", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
            Our free 9-dimension diagnostic scores your business across revenue, operations, team, technology, and data. You'll get a radar chart, your scores, and one specific recommendation you can implement today.
          </p>
        </F>
        <F d={0.1}>
          {!sent ? (
            <div style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="Enter your work email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: "1 1 240px", padding: "14px 18px", borderRadius: 10, border: "1.5px solid #D1D5DB", fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", background: "#fff", minWidth: 200 }}
                onFocus={e => e.target.style.borderColor = "#2563EB"} onBlur={e => e.target.style.borderColor = "#D1D5DB"} />
              <Btn onClick={() => { if (email.includes("@")) { setSent(true); window.open("/diagnostic?email=" + encodeURIComponent(email), "_blank"); } }} style={{ flex: "0 0 auto" }}>
                Get Your Free Diagnostic <Ic.Arr />
              </Btn>
            </div>
          ) : (
            <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 12, padding: "20px 28px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600, color: "#065F46", margin: 0 }}>
                {"\u2713"} Opening your diagnostic assessment - check the new tab!
              </p>
            </div>
          )}
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 12 }}>
            Takes 3 minutes. No credit card. Instant results with radar chart.
          </p>
        </F>
      </div>
    </section>
  );
}

// Who This Is For
function WhoFor() {
  const types = [
    { icon: Ic.Users, label: "Agencies & consultancies", detail: "Growing fast but processes aren't keeping up" },
    { icon: Ic.Shield, label: "Healthcare, hospitals & dental clinics", detail: "Patient flow, billing, compliance  - all need systemizing" },
    { icon: Ic.Wrench, label: "Home services & trades", detail: "HVAC, plumbing, electrical  - scaling beyond the owner" },
    { icon: Ic.Zap, label: "Gyms, wellness & fitness", detail: "Member retention, class scheduling, revenue optimization" },
    { icon: Ic.Bot, label: "E-commerce & D2C brands", detail: "Order fulfillment, customer service, inventory management" },
    { icon: Ic.Clock, label: "Any growing service business", detail: "Growing but drowning in operational chaos" },
  ];
  return (
    <section style={{ padding: "88px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <F><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 10px" }}>Built for businesses that are growing faster than their systems</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#6B7280", maxWidth: 500, margin: "0 auto" }}>If you feel like things should be running smoother - we're for you.</p>
        </div></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {types.map((t, i) => (
            <F key={i} d={i * 0.06}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 20px", borderRadius: 12, border: "1px solid #E5E7EB", background: "#FAFBFC", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.background = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#FAFBFC"; }}>
                <div style={{ color: "#2563EB", flexShrink: 0, marginTop: 2 }}><t.icon /></div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 3 }}>{t.label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{t.detail}</div>
                </div>
              </div>
            </F>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works
function How() {
  const steps = [
    { n: "01", title: "Diagnose", desc: "Take our free 9-dimension diagnostic. In 3 minutes, you'll see exactly where your business is strong and where it's leaking revenue  - with a visual radar chart and specific scores.", color: "#2563EB" },
    { n: "02", title: "Fix", desc: "On your discovery call, we'll walk through your results and give you a prioritized action plan. Quick wins first, strategic changes second. Clear timelines, realistic costs.", color: "#059669" },
    { n: "03", title: "Grow", desc: "We implement the fixes  - process redesign, CRM setup, workflow automation, AI agents  - and optimize continuously. Most clients see measurable results within 6-12 weeks.", color: "#7C3AED" },
  ];
  return (
    <section id="how" style={{ padding: "88px 24px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <F><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 10px" }}>Three steps from chaos to clarity</h2>
        </div></F>
        <div style={{ display: "grid", gap: 16 }}>
          {steps.map((s, i) => (
            <F key={i} d={i * 0.1}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "#fff", borderRadius: 14, padding: "28px", border: "1px solid #E5E7EB", borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 36, fontWeight: 800, color: `${s.color}25`, minWidth: 48, lineHeight: 1 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 20, fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, color: "#4B5563", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </F>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services
function Services() {
  const svcs = [
    { icon: Ic.Search, title: "Find out where you're losing money", desc: "Our diagnostic uncovers revenue leaks, operational bottlenecks, and hidden inefficiencies. You'll know exactly what's costing you  - backed by data, not guesswork.", features: ["9-dimension business health score", "Competitor & market intelligence", "Revenue leak identification", "Prioritized fix-it roadmap"], color: "#2563EB", bg: "#EFF6FF" },
    { icon: Ic.Wrench, title: "Fix what's broken  - fast", desc: "We redesign your processes, set up proper systems, and eliminate the chaos. SOPs, CRM, workflows  - everything your business needs to run without you micromanaging.", features: ["Process redesign & SOPs", "CRM setup and optimization", "Workflow automation", "Team structure & role clarity"], color: "#059669", bg: "#ECFDF5" },
    { icon: Ic.Bot, title: "Build AI that works while you sleep", desc: "Custom AI agents that handle the repetitive stuff  - answering calls, qualifying leads, checking compliance, generating reports. Your team focuses on what humans do best.", features: ["AI receptionist & lead qualifier", "Document review automation", "Compliance monitoring bots", "Custom industry-specific agents"], color: "#7C3AED", bg: "#F5F3FF" },
  ];
  return (
    <section id="services" style={{ padding: "88px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <F><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "0 0 10px" }}>Three ways we help you grow</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#6B7280" }}>Whether you need clarity, systems, or automation - we've got you.</p>
        </div></F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {svcs.map((s, i) => (
            <F key={i} d={i * 0.1}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "30px 28px", border: "1px solid #E5E7EB", transition: "all 0.25s", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${s.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 18 }}><s.icon /></div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 19, fontWeight: 700, color: "#0F172A", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>{s.desc}</p>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: s.color, flexShrink: 0 }}><Ic.Chk /></span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#374151", fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </F>
          ))}
        </div>
        <F d={0.3}>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Btn href={FORM}>Get Your Free Diagnostic <Ic.Arr /></Btn>
          </div>
        </F>
      </div>
    </section>
  );
}

// Hero Product
function HeroProduct() {
  return (
    <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <F>
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px", border: "1px solid #E5E7EB", display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 280px", minWidth: 240 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.08em" }}>Featured Product</span>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "8px 0 10px", letterSpacing: "-0.01em" }}>Business Diagnostic Kit</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: "0 0 16px" }}>
                The same 9-dimension framework we use with clients - as a self-serve Notion template. Score your business, identify gaps, get a prioritized action list.
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 32, fontWeight: 800, color: "#0F172A" }}>$49</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#6B7280" }}>one-time purchase</span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn href="https://adventureai4.gumroad.com/l/BusinessDiagnosticKit" style={{ fontSize: 14, padding: "12px 22px" }}>Get the Kit - $49 <Ic.Arr /></Btn>
                <button data-cal-link="ag-ventures-qbqxax/30min" data-cal-namespace="30min" data-cal-config='{"layout":"month_view"}' type="button" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#2563EB", fontWeight: 600, display: "flex", alignItems: "center", cursor: "pointer", textDecoration: "none", background: "none", border: "none", padding: 0 }}>or book a free consultation</button>
              </div>
            </div>
            <div style={{ flex: "0 0 auto", width: 160, height: 160, borderRadius: 20, background: "linear-gradient(135deg, #EFF6FF, #F5F3FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic.Delta s={80} />
            </div>
          </div>
        </F>
      </div>
    </section>
  );
}

// Latest Articles - SEO internal linking section
function LatestArticles() {
  const articles = [
    { slug: "ai-automation-stack-small-business", title: "The AI Automation Stack Your Small Business Actually Needs", category: "Automation", readTime: "12 min" },
    { slug: "manual-processes-costing-money", title: "5 Signs Your Business Is Losing Money to Manual Processes", category: "Operations", readTime: "7 min" },
    { slug: "digital-transformation-roadmap", title: "What Is a Digital Transformation Roadmap?", category: "Strategy", readTime: "8 min" },
    { slug: "how-to-choose-ai-consultant", title: "How to Choose an AI Consultant for Your Business", category: "AI", readTime: "8 min" },
    { slug: "hidden-revenue-leaks-small-business", title: "7 Hidden Revenue Leaks in Your Business", category: "Strategy", readTime: "9 min" },
    { slug: "crm-service-businesses", title: "CRM for Service Businesses: The Complete Guide", category: "Technology", readTime: "9 min" },
  ];
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <F>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em" }}>Latest Insights</span>
            <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", margin: "8px 0 12px" }}>
              Expert Articles on AI, Automation & Growth
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#6B7280", maxWidth: 560, margin: "0 auto" }}>
              Actionable insights for growing businesses from our consulting team
            </p>
          </div>
        </F>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {articles.map((a, i) => (
            <F key={a.slug} d={i * 0.08}>
              <a href={`/blog/${a.slug}`} style={{
                display: "block", borderRadius: 14, border: "1px solid #E5E7EB", padding: "24px",
                background: "#fff", textDecoration: "none", color: "inherit", transition: "all 0.25s", height: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", background: "#EFF6FF", color: "#2563EB", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{a.category}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#9CA3AF" }}>{a.readTime}</span>
                </div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 700, lineHeight: 1.35, color: "#0F172A", margin: 0 }}>{a.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, color: "#2563EB", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
                  Read article <Ic.Arr />
                </div>
              </a>
            </F>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href="/blog" style={{
            fontFamily: "'DM Sans',sans-serif", display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 10, border: "1.5px solid #E5E7EB", color: "#0F172A",
            fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.color = "#2563EB"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#0F172A"; }}
          >
            View All Articles <Ic.Arr />
          </a>
        </div>
      </div>
    </section>
  );
}

// CTA
function CTA() {
  return (
    <section style={{ padding: "88px 24px", background: "linear-gradient(155deg, #0F172A, #1E293B)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "5%", right: "3%", opacity: 0.02, fontSize: 400, fontWeight: 900, color: "#fff", fontFamily: "Georgia,serif" }}>{"\u0394"}</div>
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <F>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 16px" }}>
            Every week you wait costs you money.
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 12px" }}>
            Book a free 30-minute discovery call. We'll show you at least one quick win you can implement this week.
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#FCD34D", fontWeight: 600, margin: "0 0 32px" }}>
            If we can't find a quick win in 30 minutes, you get our $79 DX Roadmap Template free.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn calLink="ag-ventures-qbqxax/30min" style={{ background: "#fff", color: "#0F172A" }}>Book Your Free Call <Ic.Arr /></Btn>
            <Btn primary={false} calLink="ag-ventures-qbqxax/30min" style={{ background: "transparent", color: "#94A3B8", border: "1.5px solid #334155" }}>
              <Ic.Mail /> Contact Us
            </Btn>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#475569", marginTop: 16 }}>
            We take on a maximum of 5 new clients per month. Limited slots available.
          </p>
        </F>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ background: "#0F172A", borderTop: "1px solid #1E293B", padding: "36px 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#fff", marginBottom: 4 }}><Ic.Delta s={22} /><span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15 }}>Delta Labs AI</span></div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#94A3B8", margin: 0 }}>AI-powered business consulting for growing companies.</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <a href="/blog" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Blog</a>
          <a href="/diagnostic" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Diagnostic</a>
          <a href="/blog/ai-automations-small-business" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>AI Automation</a>
          <a href="/blog/9-dimensions-healthy-business" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>9 Dimensions</a>
          <a href="/blog/manual-processes-costing-money" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Manual Process Costs</a>
          <a href="/blog/digital-transformation-roadmap" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>DX Roadmap</a>
          <a href="/blog/crm-service-businesses" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>CRM Guide</a>
          <a href="/blog/how-to-choose-ai-consultant" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", padding: "12px 10px", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}>Choose AI Consultant</a>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "nowrap" }}>
            <button data-cal-link="ag-ventures-qbqxax/30min" data-cal-namespace="30min" data-cal-config='{"layout":"month_view"}' type="button" aria-label="Book a call" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 48, minHeight: 48, background: "none", border: "none", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.Mail /></button>
            <a href="/linkedin" aria-label="LinkedIn" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 48, minHeight: 48 }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.LI /></a>
            <a href="/facebook" aria-label="Facebook" style={{ color: "#94A3B8", transition: "color 0.2s", padding: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 48, minHeight: 48 }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}><Ic.FB /></a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1040, margin: "16px auto 0", paddingTop: 16, borderTop: "1px solid #1E293B", textAlign: "center" }}>
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1E293B", borderRadius: 8, padding: "8px 16px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5" fill="none"/></svg>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#25D366", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>Official Meta</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#fff", fontWeight: 600 }}>WhatsApp Tech Provider</div>
            </div>
          </div>
          <a href="https://aiagentsdirectory.com/agent/delta-labs-ai?utm_source=badge&utm_medium=referral&utm_campaign=free_listing&utm_content=delta-labs-ai" target="_blank" rel="noopener noreferrer">
            <img src="https://aiagentsdirectory.com/featured-badge.svg?v=2024" alt="Delta Labs AI - Featured AI Agent on AI Agents Directory" width="200" height="50" />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#1E293B", borderRadius: 8, padding: "8px 16px" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#E8772E", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 3 }}>Powered by</div>
              {/* Sarvam official wordmark (white), from sarvam.ai/brand — 202x32 */}
              <img src="/sarvam-logo.svg" alt="Sarvam AI" height="15" width="95" style={{ display: "block" }} />
            </div>
          </div>
          <a href="https://bolomate.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1E293B", borderRadius: 8, padding: "8px 16px" }}>
              <img src="/bolomate-logo.svg" alt="BoloMate" width="24" height="24" />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#6D5EF8", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>Voice AI Agent</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#fff", fontWeight: 600 }}>BoloMate</div>
              </div>
            </div>
          </a>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#94A3B8", margin: "0 0 8px" }}>&copy; {new Date().getFullYear()} Delta Labs AI. All rights reserved.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
          <a href="/privacy" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>Privacy Policy</a>
          <span style={{ color: "#475569", fontSize: 11 }}>·</span>
          <a href="/terms" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#64748B", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

// App
export default function App() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <AnnouncementBar />
      <Nav />
      <Hero />
      <Proof />
      <HeroCTABand />
      <DiagnosticCTA />
      <WhoFor />
      <How />
      <Services />
      <HeroProduct />
      <FAQ />
      <LatestArticles />
      <CTA />
      <Footer />
    </div>
  );
}
