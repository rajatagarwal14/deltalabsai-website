"use client";

import { useState, useRef, useEffect } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const CAPTURE_API = "https://delta-labs-ecosystem.vercel.app/api/leads/capture";
const BASE_URL = "https://deltalabsai.com/dental/no-show-calculator";

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

const CURRENCIES = {
  USD: { code: "USD", locale: "en-US", symbol: "$",   perApptDefault: 80,   apptMin: 20,  apptMax: 500,  apptStep: 5 },
  AED: { code: "AED", locale: "en-AE", symbol: "AED", perApptDefault: 300,  apptMin: 50,  apptMax: 2000, apptStep: 25 },
  AUD: { code: "AUD", locale: "en-AU", symbol: "A$",  perApptDefault: 120,  apptMin: 30,  apptMax: 800,  apptStep: 10 },
  GBP: { code: "GBP", locale: "en-GB", symbol: "£",   perApptDefault: 60,   apptMin: 20,  apptMax: 500,  apptStep: 5 },
  SGD: { code: "SGD", locale: "en-SG", symbol: "S$",  perApptDefault: 100,  apptMin: 25,  apptMax: 700,  apptStep: 5 },
  INR: { code: "INR", locale: "en-IN", symbol: "₹",   perApptDefault: 1800, apptMin: 500, apptMax: 8000, apptStep: 100 },
};
function fmt(n, curCode = "USD") {
  const c = CURRENCIES[curCode] || CURRENCIES.USD;
  return new Intl.NumberFormat(c.locale, { style: "currency", currency: c.code, maximumFractionDigits: 0 }).format(n);
}

// No-show grade — benchmarked against a healthy clinic (industry healthy band ≈ under 10%)
function gradeFor(rate) {
  if (rate <= 6)  return { g: "A+", color: "#22c55e", label: "Excellent — better than almost every clinic",        tone: "Your front desk is doing something right. Protect it." };
  if (rate <= 9)  return { g: "A",  color: "#4ade80", label: "Healthy — at the good end of the industry band",      tone: "Small leaks only. Automation keeps it that way as you grow." };
  if (rate <= 12) return { g: "B",  color: "#a3e635", label: "Average — right at the industry norm",                tone: "Average still means real money walking out. Recoverable." };
  if (rate <= 16) return { g: "C",  color: "#facc15", label: "Leaking — noticeably above the healthy band",         tone: "This is the zone where reminders + recall pay for themselves fastest." };
  if (rate <= 22) return { g: "D",  color: "#fb923c", label: "Serious leak — well above the healthy band",          tone: "At this rate, no-shows are one of your biggest silent costs." };
  return            { g: "F",  color: "#ef4444", label: "Critical — among the highest no-show rates",          tone: "Every week without follow-up automation is real revenue lost." };
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

// Lead capture via the ecosystem's public capture API (validates, resolves org, Telegrams the CEO).
// NOTE: posting straight to Supabase with name/clinic_name/status:'warm' silently failed forever —
// those columns/enum values don't exist. Keep all writes going through the capture API.
async function saveLead(data) {
  try {
    await fetch(CAPTURE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        full_name: data.name || data.clinic || data.email,
        company_name: data.clinic || data.name || "",
        industry: "Dental",
        source: "diagnostic_tool",
        source_detail: {
          actual_source: "no_show_calculator",
          partner: data.partner || null,
          currency: data.cur || "USD",
          grade: data.grade,
          inputs: { apptPerDay: data.apptPerDay, avgRevenue: data.avgRevenue, noShowRate: data.noShowRate, workingDays: data.workingDays },
          results: { monthlyLoss: data.monthlyLoss, annualLoss: data.annualLoss, recoveryPerMonth: data.recovery },
        },
        notes: `No-show calculator (grade ${data.grade}${data.partner ? `, via partner ${data.partner}` : ""}). Annual loss ${data.cur} ${data.annualLoss.toLocaleString()}. Recovery potential ${data.cur} ${data.recovery.toLocaleString()}/mo.`,
        tags: ["no_show_calculator", ...(data.partner ? ["partner_cobrand"] : [])],
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

export default function NoShowCalculator() {
  const [cur, setCur] = useState("USD");
  const CUR = CURRENCIES[cur];
  const f = (n) => fmt(n, cur);
  const [apptPerDay, setApptPerDay] = useState(12);
  const [avgRevenue, setAvgRevenue] = useState(80);
  const [noShowRate, setNoShowRate] = useState(15);
  const [workingDays, setWorkingDays] = useState(26);

  // Personalisation + partner co-brand (read from URL on mount; window-based to avoid
  // useSearchParams/Suspense constraints in static builds)
  const [clinicName, setClinicName] = useState("");
  const [partner, setPartner] = useState("");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const c = sanitizeParam(q.get("clinic"));
      const p = sanitizeParam(q.get("p") || q.get("partner"));
      if (c) setClinicName(c);
      if (p) setPartner(p);
      const curQ = (q.get("cur") || "").toUpperCase();
      if (CURRENCIES[curQ]) { setCur(curQ); setAvgRevenue(CURRENCIES[curQ].perApptDefault); }
      const rate = Number(q.get("rate")); if (rate >= 5 && rate <= 40) setNoShowRate(rate);
      const appts = Number(q.get("appts")); if (appts >= 4 && appts <= 40) setApptPerDay(appts);
    } catch (_) {}
  }, []);

  const [step, setStep] = useState("calc"); // "calc" | "capture" | "done"
  const [form, setForm] = useState({ name: "", email: "", clinic: "" });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const noShowPerDay = (apptPerDay * noShowRate) / 100;
  const noShowPerMonth = noShowPerDay * workingDays;
  const monthlyLoss = Math.round(noShowPerMonth * avgRevenue);
  const annualLoss = monthlyLoss * 12;
  const recoveryRate = 0.65;
  const recovery = Math.round(monthlyLoss * recoveryRate);
  const grade = gradeFor(noShowRate);

  // A link that reproduces THIS exact result — for outreach personalisation + sharing
  function personalLink() {
    const q = new URLSearchParams();
    if (clinicName || form.clinic) q.set("clinic", clinicName || form.clinic);
    if (partner) q.set("p", partner);
    q.set("cur", cur); q.set("rate", String(noShowRate)); q.set("appts", String(apptPerDay));
    return `${BASE_URL}?${q.toString()}`;
  }

  async function handleCapture(e) {
    e.preventDefault();
    if (!form.email) return;
    setSubmitting(true);
    await saveLead({ ...form, clinic: form.clinic || clinicName, partner, cur, grade: grade.g, monthlyLoss, annualLoss, recovery, apptPerDay, avgRevenue, noShowRate, workingDays });
    setSubmitting(false);
    setStep("done");
  }

  function handleShare() {
    const url = personalLink();
    const who = clinicName ? `${clinicName} is` : "My dental clinic is";
    const msg = `📋 No-Show Report Card: Grade ${grade.g}\n\n😳 ${who} losing ${f(annualLoss)} a year to no-shows.\n\nTook 30 seconds with this free calculator — check your clinic's grade 👇\n${url}`;
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            SmileCRM by Delta Labs AI
          </div>
          <h1 style={S.h1}>{clinicName ? `${clinicName}: what's your no-show grade?` : "What's your clinic's no-show grade?"}</h1>
          <p style={S.sub}>Most clinics lose thousands every year to missed appointments — and don't even know it. Get your clinic's report card in 30 seconds.</p>
        </F>

        <F d={0.1}>
          <div style={S.card}>
            <div style={S.sectionLabel}>Your Practice</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <label style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>Currency</label>
              <select value={cur} onChange={e => { const nc = e.target.value; setCur(nc); setAvgRevenue(CURRENCIES[nc].perApptDefault); }}
                style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", fontSize: 14, fontWeight: 600, cursor: "pointer", outline: "none" }}>
                <option value="USD">$ USD — International</option>
                <option value="AED">AED — UAE / Gulf</option>
                <option value="AUD">A$ AUD — Australia</option>
                <option value="GBP">£ GBP — UK</option>
                <option value="SGD">S$ SGD — Singapore</option>
                <option value="INR">₹ INR — India</option>
              </select>
            </div>
            <SliderInput label="Appointments per day" min={4} max={40} step={1} value={apptPerDay} onChange={setApptPerDay} />
            <SliderInput label="Average revenue per appointment" min={CUR.apptMin} max={CUR.apptMax} step={CUR.apptStep} value={avgRevenue} onChange={setAvgRevenue} prefix={CUR.symbol + " "} />
            <SliderInput label="No-show rate" min={5} max={40} step={1} value={noShowRate} onChange={setNoShowRate} suffix="%" />
            <SliderInput label="Working days per month" min={20} max={30} step={1} value={workingDays} onChange={setWorkingDays} />
          </div>
        </F>

        {/* ───── REPORT CARD — the shareable unit ───── */}
        <F d={0.15}>
          <div style={{
            border: `1px solid ${grade.color}40`, borderRadius: 20, marginBottom: 24, overflow: "hidden",
            background: "rgba(255,255,255,0.03)",
          }}>
            <div style={{ background: `${grade.color}14`, borderBottom: `1px solid ${grade.color}30`, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af" }}>
                📋 No-Show Report Card{clinicName ? ` — ${clinicName}` : ""}
              </span>
              <span style={{ fontSize: 11, color: "#6b7280" }}>benchmark: healthy clinics stay under 10%</span>
            </div>
            <div style={{ padding: "28px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{
                width: 110, height: 110, borderRadius: 20, flexShrink: 0,
                background: `${grade.color}1a`, border: `2px solid ${grade.color}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{grade.g}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{noShowRate}% no-shows</div>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{grade.label}</div>
                <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, marginBottom: 12 }}>{grade.tone}</div>
                <div style={{ fontSize: 14, color: "#e2e8f0" }}>
                  Annual leak: <strong style={{ color: grade.color, fontSize: 17 }}>{f(annualLoss)}</strong>
                  <span style={{ color: "#6b7280" }}> · recoverable with automation: ~{f(recovery * 12)}/yr</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 28px 22px", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                💬 Share my report card
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
            <ResultCard label="No-shows / month" value={Math.round(noShowPerMonth)} sub={`${noShowPerDay.toFixed(1)} per day`} />
            <ResultCard label="Monthly loss" value={f(monthlyLoss)} sub="Revenue walking out the door" />
            <ResultCard label="Annual loss" value={f(annualLoss)} highlight sub="Every year, year after year" />
          </div>
        </F>

        <F d={0.3}>
          <div style={S.callout}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 28 }}>💡</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
                  SmileCRM could recover {f(recovery)}/month for your clinic
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  Automated reminders, recall and WhatsApp follow-ups typically recover around 65% of no-show revenue. That's about {f(recovery * 12)}/year — on a flat monthly plan, running 24/7. It's the same system running live in a real dental clinic today.
                </div>
              </div>
            </div>
          </div>
        </F>

        {step === "calc" && (
          <F d={0.35}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                style={{ ...S.btn, ...S.btnPrimary, flex: 2, minWidth: 220 }}
                onClick={() => setStep("capture")}
              >
                Get my free recovery plan →
              </button>
              <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                💬 Share on WhatsApp
              </button>
            </div>
            <p style={{ fontSize: 12, color: "#4b5563", marginTop: 12, textAlign: "center" }}>
              Free demo · No credit card · 30 minutes · <span onClick={handleCopy} style={{ cursor: "pointer", textDecoration: "underline" }}>{copied ? "link copied ✓" : "copy link"}</span>
            </p>
          </F>
        )}

        {step === "capture" && (
          <F d={0}>
            <div style={S.card}>
              <div style={S.sectionLabel}>Get your personalised recovery plan</div>
              <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 20 }}>
                We'll send a custom plan showing exactly how SmileCRM would recover <strong style={{ color: "#a5b4fc" }}>{f(recovery)}/month</strong> for your clinic (grade {grade.g} → A) — plus a free 30-min consultation.
              </p>
              <form onSubmit={handleCapture}>
                <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <input style={S.input} placeholder="Clinic name" value={form.clinic || clinicName} onChange={e => setForm(f => ({ ...f, clinic: e.target.value }))} />
                <input style={S.input} type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                <button type="submit" style={{ ...S.btn, ...S.btnPrimary }} disabled={submitting}>
                  {submitting ? "Sending..." : "Send me my recovery plan →"}
                </button>
              </form>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button style={{ ...S.btn, ...S.btnSecondary, width: "auto", padding: "10px 20px", fontSize: 13 }} onClick={() => window.open(CAL, "_blank")}>
                  Or book a 30-min demo directly
                </button>
                <a href={`https://wa.me/917011402167?text=${encodeURIComponent(`Hi Delta Labs AI — my clinic scored grade ${grade.g} on your no-show calculator. I want to know more.`)}`} target="_blank" rel="noopener" style={{ ...S.btn, width: "auto", padding: "10px 20px", fontSize: 13, background: "#25D366", color: "#fff", textDecoration: "none" }}>
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
                Your personalised SmileCRM recovery plan is being prepared. Meanwhile, book a 30-minute demo to see the system live.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={`https://wa.me/917011402167?text=${encodeURIComponent("Hi Delta Labs AI — I just got my no-show recovery plan and want to talk.")}`} target="_blank" rel="noopener" style={{ ...S.btn, width: "auto", background: "#25D366", color: "#fff", textDecoration: "none" }}>
                  💬 Talk to us on WhatsApp
                </a>
                <a href={CAL} target="_blank" rel="noopener" style={{ ...S.btn, ...S.btnPrimary, width: "auto", textDecoration: "none" }}>
                  Book your free demo →
                </a>
                <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                  💬 Share my report card
                </button>
              </div>
            </div>
          </F>
        )}

        <F d={0.4}>
          <div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { n: "~65%", l: "Typical no-show revenue recovery" },
                { n: "24/7", l: "Reminders + recall, fully automated" },
                { n: "2 weeks", l: "Typical setup time" },
                { n: "Live", l: "Running in a real dental clinic today" },
              ].map(({ n, l }) => (
                <div key={l} style={{ textAlign: "center", flex: 1, minWidth: 100 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#6366f1" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#374151", textAlign: "center" }}>
              © 2026 Delta Labs AI · <a href="/dental" style={{ color: "#4b5563", textDecoration: "none" }}>SmileCRM</a> · <a href="/privacy" style={{ color: "#4b5563", textDecoration: "none" }}>Privacy</a>
            </p>
          </div>
        </F>
      </div>
    </div>
  );
}
