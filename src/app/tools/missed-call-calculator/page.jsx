"use client";

import { useState, useRef, useEffect } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const CAPTURE_API = "https://delta-labs-ecosystem.vercel.app/api/leads/capture";
const BASE_URL = "https://deltalabsai.com/tools/missed-call-calculator";

function useFade() {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.05 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}
function F({ children, d = 0, style = {} }) {
  const [r, v] = useFade();
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${d}s`, ...style }}>{children}</div>;
}

// Currency ratios follow the same market-pricing convention already established in
// /dental/no-show-calculator (local SMB price points, not raw FX) — kept consistent
// so a user comparing both tools doesn't see conflicting AED/INR scaling.
const CURRENCIES = {
  USD: { code: "USD", locale: "en-US", symbol: "$",   ratio: 1 },
  AED: { code: "AED", locale: "en-AE", symbol: "AED", ratio: 3.75 },
  AUD: { code: "AUD", locale: "en-AU", symbol: "A$",  ratio: 1.5 },
  GBP: { code: "GBP", locale: "en-GB", symbol: "£",   ratio: 0.75 },
  SGD: { code: "SGD", locale: "en-SG", symbol: "S$",  ratio: 1.25 },
  CAD: { code: "CAD", locale: "en-CA", symbol: "C$",  ratio: 1.35 },
  INR: { code: "INR", locale: "en-IN", symbol: "₹",   ratio: 22.5 },
};
const MARKETS = [
  { cur: "AED", label: "AED — UAE / Gulf" },
  { cur: "AUD", label: "A$ AUD — Australia" },
  { cur: "SGD", label: "S$ SGD — Singapore" },
  { cur: "GBP", label: "£ GBP — UK" },
  { cur: "CAD", label: "C$ CAD — Canada" },
  { cur: "USD", label: "$ USD — International" },
  { cur: "INR", label: "₹ INR — India" },
];
function fmt(n, curCode = "USD") {
  const c = CURRENCIES[curCode] || CURRENCIES.USD;
  return new Intl.NumberFormat(c.locale, { style: "currency", currency: c.code, maximumFractionDigits: 0 }).format(n);
}
function roundToStep(n, step) {
  return Math.max(step, Math.round(n / step) * step);
}

// Defaults below are illustrative starting points, not guarantees — sourced from published
// industry benchmarks (see Sources footer) and blended where a vertical spans a wide range
// (e.g. HVAC 3-7% vs plumbing 12-16%). avgDealValueUSD is a US anchor; other markets scale
// by the same currency ratio used above, then round to a sensible slider step. Every value
// is an editable slider — the user's own numbers always override the default.
const BUSINESS_TYPES = [
  { key: "dental", label: "Dental clinic", closeRate: 40, avgDealValueUSD: 1000, dealStep: 50, dealMin: 200, dealMax: 4000, workingDays: 300 },
  { key: "home_services", label: "Home services (plumber / electrician / HVAC)", closeRate: 20, avgDealValueUSD: 450, dealStep: 25, dealMin: 100, dealMax: 6000, workingDays: 260 },
  { key: "real_estate", label: "Real estate (independent broker)", closeRate: 3, avgDealValueUSD: 7500, dealStep: 250, dealMin: 1000, dealMax: 30000, workingDays: 260 },
  { key: "salon_fitness", label: "Salon / spa / fitness studio", closeRate: 40, avgDealValueUSD: 85, dealStep: 5, dealMin: 20, dealMax: 500, workingDays: 300 },
  { key: "restaurant", label: "Restaurant / cafe", closeRate: 80, avgDealValueUSD: 65, dealStep: 5, dealMin: 15, dealMax: 300, workingDays: 350 },
  { key: "professional", label: "Professional services (law / accounting / consulting)", closeRate: 25, avgDealValueUSD: 3000, dealStep: 100, dealMin: 300, dealMax: 20000, workingDays: 250 },
];

function bandFor(annualLoss, cur) {
  // Bands are relative to the deal itself, not a fixed $ scale, since deal sizes span
  // $65 restaurant tickets to $7,500 real-estate commissions.
  if (annualLoss <= 0) return { color: "#6b7280", label: "No measurable loss at these inputs" };
  if (annualLoss < 5000) return { color: "#4ade80", label: "Modest — worth fixing, not urgent" };
  if (annualLoss < 25000) return { color: "#facc15", label: "Meaningful — real money walking away every year" };
  if (annualLoss < 100000) return { color: "#fb923c", label: "Serious — one of the bigger silent leaks in this business" };
  return { color: "#ef4444", label: "Severe — this is likely the single biggest lever available" };
}

function SliderInput({ label, min, max, step, value, onChange, prefix = "", suffix = "" }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>{label}</label>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>
          {prefix}{value.toLocaleString("en-IN")}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#6366f1", cursor: "pointer", height: 6 }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#6b7280" }}>{prefix}{min.toLocaleString("en-IN")}{suffix}</span>
        <span style={{ fontSize: 11, color: "#6b7280" }}>{prefix}{max.toLocaleString("en-IN")}{suffix}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight = false, sub = "" }) {
  return (
    <div style={{
      background: highlight ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "rgba(255,255,255,0.04)",
      border: highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "24px 28px", flex: 1, minWidth: 200
    }}>
      <div style={{ fontSize: 12, color: highlight ? "rgba(255,255,255,0.8)" : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: highlight ? "rgba(255,255,255,0.7)" : "#6b7280", marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

function track(eventName, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch (_) {}
}

// Same capture endpoint + payload shape as /dental/no-show-calculator's saveLead.
async function saveLead(data) {
  try {
    await fetch(CAPTURE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        full_name: data.name || data.business || data.email,
        company_name: data.business || data.name || "",
        industry: data.businessTypeLabel,
        source: "diagnostic_tool",
        source_detail: {
          actual_source: "missed_call_calculator",
          business_type: data.businessType,
          market: data.cur,
          inputs: { missedCallsPerDay: data.missedCallsPerDay, closeRate: data.closeRate, avgDealValue: data.avgDealValue, workingDays: data.workingDays },
          results: { monthlyLoss: data.monthlyLoss, annualLoss: data.annualLoss },
        },
        notes: `Missed-Call Cost Calculator (${data.businessTypeLabel}, ${data.cur}). Annual loss ${data.cur} ${data.annualLoss.toLocaleString()}.`,
        tags: ["missed_call_calculator", `vertical_${data.businessType}`],
      }),
    });
  } catch (_) {
    // silent — never block the UX
  }
}

function sanitizeParam(s, max = 48) {
  if (!s) return "";
  return String(s).replace(/[<>"'`]/g, "").trim().slice(0, max);
}

export default function MissedCallCalculator() {
  const [cur, setCur] = useState("USD");
  const CUR = CURRENCIES[cur];
  const f = (n) => fmt(n, cur);

  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0].key);
  const BT = BUSINESS_TYPES.find(b => b.key === businessType) || BUSINESS_TYPES[0];

  const scaledDeal = (bt, ratio) => roundToStep(bt.avgDealValueUSD * ratio, Math.max(1, Math.round(bt.dealStep * ratio)));

  const [missedCallsPerDay, setMissedCallsPerDay] = useState(3);
  const [closeRate, setCloseRate] = useState(BT.closeRate);
  const [avgDealValue, setAvgDealValue] = useState(scaledDeal(BT, CURRENCIES.USD.ratio));
  const [workingDays, setWorkingDays] = useState(BT.workingDays);

  // Business type / market are user-selected inputs — re-seed the editable defaults
  // whenever either changes, but never fight the user's slider once they've touched it
  // within a session (simplest correct behaviour: reseed on type/market change only).
  useEffect(() => {
    const bt = BUSINESS_TYPES.find(b => b.key === businessType) || BUSINESS_TYPES[0];
    setCloseRate(bt.closeRate);
    setAvgDealValue(scaledDeal(bt, CURRENCIES[cur].ratio));
    setWorkingDays(bt.workingDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessType, cur]);

  const [businessName, setBusinessName] = useState("");
  const [partner, setPartner] = useState("");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const b = sanitizeParam(q.get("biz"));
      const p = sanitizeParam(q.get("p") || q.get("partner"));
      if (b) setBusinessName(b);
      if (p) setPartner(p);
      const curQ = (q.get("cur") || "").toUpperCase();
      if (CURRENCIES[curQ]) setCur(curQ);
      const typeQ = q.get("type");
      if (BUSINESS_TYPES.some(t => t.key === typeQ)) setBusinessType(typeQ);
      const calls = Number(q.get("calls")); if (calls >= 1 && calls <= 50) setMissedCallsPerDay(calls);
    } catch (_) {}
    track("missed_call_calc_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState("calc"); // "calc" | "capture" | "done"
  const [form, setForm] = useState({ name: "", email: "", business: "" });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const monthlyLoss = Math.round(missedCallsPerDay * (closeRate / 100) * avgDealValue * (workingDays / 12));
  const annualLoss = Math.round(missedCallsPerDay * (closeRate / 100) * avgDealValue * workingDays);
  const band = bandFor(annualLoss, cur);

  function personalLink() {
    const q = new URLSearchParams();
    if (businessName || form.business) q.set("biz", businessName || form.business);
    if (partner) q.set("p", partner);
    q.set("cur", cur); q.set("type", businessType); q.set("calls", String(missedCallsPerDay));
    return `${BASE_URL}?${q.toString()}`;
  }

  // Completion = the user got a result and asked for the recovery plan (not just page
  // load with defaults). This is the event DELA-4484's kill-if ("< 5 completions in
  // first 2 weeks") should be measured against in GA4.
  function goToCapture() {
    track("missed_call_calc_completed", {
      business_type: businessType, market: cur, annual_loss: annualLoss,
    });
    setStep("capture");
  }

  async function handleCapture(e) {
    e.preventDefault();
    if (!form.email) return;
    setSubmitting(true);
    await saveLead({
      ...form, business: form.business || businessName, businessType, businessTypeLabel: BT.label,
      cur, missedCallsPerDay, closeRate, avgDealValue, workingDays, monthlyLoss, annualLoss,
    });
    track("missed_call_calc_lead_captured", { business_type: businessType, market: cur });
    setSubmitting(false);
    setStep("done");
  }

  function handleShare() {
    const url = personalLink();
    const who = businessName ? `${businessName} is` : `My ${BT.label.toLowerCase()} business is`;
    const msg = `📞 Missed-Call Cost Check\n\n${who} losing an estimated ${f(annualLoss)} a year to calls that just ring out.\n\nFree 30-second calculator — check your own number 👇\n${url}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ text: msg, url }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }
  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(BASE_URL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  }
  function handleCopyPersonal() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(personalLink()).then(() => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); });
    }
  }

  const S = {
    page: { minHeight: "100vh", background: "#0a0a0f", color: "#e2e8f0", fontFamily: "'Inter', -apple-system, sans-serif", padding: "60px 20px 80px" },
    wrap: { maxWidth: 780, margin: "0 auto" },
    tag: { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#a5b4fc", fontWeight: 600, marginBottom: 24 },
    h1: { fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" },
    sub: { fontSize: 17, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 48px", maxWidth: 560 },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 32px", marginBottom: 24 },
    sectionLabel: { fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 },
    resultsRow: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 },
    callout: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 24 },
    input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", fontSize: 15, color: "#e2e8f0", outline: "none", boxSizing: "border-box", marginBottom: 12 },
    select: { background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", fontSize: 14, fontWeight: 600, cursor: "pointer", outline: "none" },
    btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", border: "none", transition: "all .2s", width: "100%" },
    btnPrimary: { background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", color: "#fff" },
    btnSecondary: { background: "rgba(255,255,255,0.08)", color: "#e2e8f0" },
    shareBtn: { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "#94a3b8", transition: "all .2s" },
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <F>
          {partner && (
            <div style={{ ...S.tag, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac", marginRight: 10 }}>
              🤝 Brought to you by {partner}
            </div>
          )}
          <div style={S.tag}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Missed-Call Cost Calculator by Delta Labs AI
          </div>
          <h1 style={S.h1}>{businessName ? `${businessName}: what do missed calls cost you?` : "What are missed calls costing your business?"}</h1>
          <p style={S.sub}>Every call that rings out is a customer who called someone else. Estimate the annual cost in 30 seconds — works for any phone-first small business, not just dental.</p>
        </F>

        <F d={0.1}>
          <div style={S.card}>
            <div style={S.sectionLabel}>Your Business</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <label style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Business type</label>
              <select value={businessType} onChange={e => setBusinessType(e.target.value)} style={S.select}>
                {BUSINESS_TYPES.map(bt => <option key={bt.key} value={bt.key}>{bt.label}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
              <label style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Market</label>
              <select value={cur} onChange={e => setCur(e.target.value)} style={S.select}>
                {MARKETS.map(m => <option key={m.cur} value={m.cur}>{m.label}</option>)}
              </select>
            </div>

            <SliderInput label="Missed calls per day" min={1} max={30} step={1} value={missedCallsPerDay} onChange={setMissedCallsPerDay} />
            <SliderInput label="Close rate on answered calls" min={1} max={95} step={1} value={closeRate} onChange={setCloseRate} suffix="%" />
            <SliderInput label="Average deal value" min={Math.round(BT.dealMin * CUR.ratio)} max={Math.round(BT.dealMax * CUR.ratio)} step={Math.max(1, Math.round(BT.dealStep * CUR.ratio))} value={avgDealValue} onChange={setAvgDealValue} prefix={CUR.symbol + " "} />
            <SliderInput label="Working days per year" min={200} max={365} step={5} value={workingDays} onChange={setWorkingDays} />

            <p style={{ fontSize: 12, color: "#6b7280", marginTop: -8 }}>
              Close rate and deal value are industry-average starting points — see sources below — not your numbers. Drag any slider to match your business.
            </p>
          </div>
        </F>

        <F d={0.15}>
          <div style={{
            border: `1px solid ${band.color}40`, borderRadius: 20, marginBottom: 24, overflow: "hidden",
            background: "rgba(255,255,255,0.03)",
          }}>
            <div style={{ background: `${band.color}14`, borderBottom: `1px solid ${band.color}30`, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af" }}>
                📞 Missed-Call Cost{businessName ? ` — ${businessName}` : ""}
              </span>
              <span style={{ fontSize: 11, color: "#6b7280" }}>illustrative estimate, not audited</span>
            </div>
            <div style={{ padding: "28px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{band.label}</div>
              <div style={{ fontSize: 14, color: "#e2e8f0" }}>
                Estimated annual loss: <strong style={{ color: band.color, fontSize: 20 }}>{f(annualLoss)}</strong>
              </div>
            </div>
            <div style={{ padding: "0 28px 22px", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                💬 Share this result
              </button>
              <button style={S.shareBtn} onClick={handleCopyPersonal}>
                {linkCopied ? "✓ personalised link copied" : "🔗 Copy my personalised link"}
              </button>
            </div>
          </div>
        </F>

        <F d={0.2}>
          <div style={S.sectionLabel}>The Numbers</div>
          <div style={S.resultsRow}>
            <ResultCard label="Missed calls / month" value={Math.round(missedCallsPerDay * (workingDays / 12))} sub={`${missedCallsPerDay} per day`} />
            <ResultCard label="Monthly loss" value={f(monthlyLoss)} sub="Revenue that never got a chance to convert" />
            <ResultCard label="Annual loss" value={f(annualLoss)} highlight sub="Every year, until calls get answered or texted back" />
          </div>
        </F>

        <F d={0.3}>
          <div style={S.callout}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 28 }}>💡</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
                  A missed-call text-back closes this gap without hiring anyone
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  When a call rings out, an automatic text goes to the caller within seconds — before they've called your competitor. It doesn't recover every missed call, but it recovers the ones that would otherwise be gone for good.
                </div>
              </div>
            </div>
          </div>
        </F>

        {step === "calc" && (
          <F d={0.35}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{ ...S.btn, ...S.btnPrimary, flex: 2, minWidth: 220 }} onClick={goToCapture}>
                See how to close this gap →
              </button>
              <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                💬 Share on WhatsApp
              </button>
            </div>
            <p style={{ fontSize: 12, color: "#4b5563", marginTop: 12, textAlign: "center" }}>
              Free · No credit card · <span onClick={handleCopy} style={{ cursor: "pointer", textDecoration: "underline" }}>{copied ? "link copied ✓" : "copy link"}</span>
            </p>
          </F>
        )}

        {step === "capture" && (
          <F d={0}>
            <div style={S.card}>
              <div style={S.sectionLabel}>Get your missed-call recovery plan</div>
              <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20 }}>
                We'll show you exactly how a missed-call text-back would work for your {BT.label.toLowerCase()} business — plus a free 30-minute consultation.
              </p>
              <form onSubmit={handleCapture}>
                <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <input style={S.input} placeholder="Business name" value={form.business || businessName} onChange={e => setForm(f => ({ ...f, business: e.target.value }))} />
                <input style={S.input} type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                <button type="submit" style={{ ...S.btn, ...S.btnPrimary }} disabled={submitting}>
                  {submitting ? "Sending..." : "Send me my recovery plan →"}
                </button>
              </form>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button style={{ ...S.btn, ...S.btnSecondary, width: "auto", padding: "10px 20px", fontSize: 13 }} onClick={() => window.open(CAL, "_blank")}>
                  Or book a 30-min demo directly
                </button>
                <a href={`https://wa.me/917011402167?text=${encodeURIComponent(`Hi Delta Labs AI — I just used the missed-call cost calculator for my ${BT.label.toLowerCase()} business. I want to know more.`)}`} target="_blank" rel="noopener" style={{ ...S.btn, width: "auto", padding: "10px 20px", fontSize: 13, background: "#25D366", color: "#fff", textDecoration: "none" }}>
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </F>
        )}

        {step === "done" && (
          <F d={0}>
            <div style={{ ...S.card, textAlign: "center", padding: "48px 32px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>We'll be in touch within 24 hours!</h2>
              <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 28 }}>
                Your missed-call recovery plan is being prepared. Meanwhile, book a 30-minute demo to see the system live.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={`https://wa.me/917011402167?text=${encodeURIComponent("Hi Delta Labs AI — I just got my missed-call recovery plan and want to talk.")}`} target="_blank" rel="noopener" style={{ ...S.btn, width: "auto", background: "#25D366", color: "#fff", textDecoration: "none" }}>
                  💬 Talk to us on WhatsApp
                </a>
                <a href={CAL} target="_blank" rel="noopener" style={{ ...S.btn, ...S.btnPrimary, width: "auto", textDecoration: "none" }}>
                  Book your free demo →
                </a>
                <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                  💬 Share this result
                </button>
              </div>
            </div>
          </F>
        )}

        <F d={0.4}>
          <div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Sources for default close rate / deal value</p>
            <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.8 }}>
              Home services: <a href="https://www.webfx.com/blog/home-services/home-services-marketing-benchmarks/" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>WebFX 2026 Home Services Benchmarks</a>, <a href="https://www.estatehub.io/articles/2026-benchmarks-lead-conversion-rates-home-services" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>Estatehub 2026</a>.
              {" "}Real estate: <a href="https://www.followupboss.com/blog/real-estate-lead-conversion-rate" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>Follow Up Boss</a>, NAR median commission data via RealTrends.
              {" "}Dental: <a href="https://www.resonateapp.com/resources/call-answering-rates-dental-clinics-statistics" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>Resonate</a>, <a href="https://agentzap.ai/blog/dental-practice-phone-statistics" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>AgentZap 2026</a>.
              {" "}Salon/spa/fitness: <a href="https://www.zenoti.com/thecheckin/beauty-wellness-industry-statistics-2025" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>Zenoti 2025 Beauty & Wellness Benchmark Report</a>.
              {" "}Restaurant: <a href="https://restaurantstables.com/blog/digital-reservations-vs-phone.html" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>RestaurantsTables 2026</a>.
              {" "}Professional services: <a href="https://golawhustle.com/law-firm-conversion-rates/" target="_blank" rel="noopener" style={{ color: "#6b7280" }}>LawHustle</a>.
              {" "}These are blended US-market benchmarks used as an editable starting point — not audited figures for any specific business or market, and India is shown for reference only (inbound market, not an outbound target).
            </p>
            <p style={{ fontSize: 12, color: "#374151", textAlign: "center", marginTop: 24 }}>
              © 2026 Delta Labs AI · <a href="/tools/no-show-calculator" style={{ color: "#4b5563", textDecoration: "none" }}>No-show calculator</a> · <a href="/privacy" style={{ color: "#4b5563", textDecoration: "none" }}>Privacy</a>
            </p>
          </div>
        </F>
      </div>
    </div>
  );
}
