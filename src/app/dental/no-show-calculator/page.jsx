"use client";

import { useState, useRef, useEffect } from "react";

const CAL = "https://cal.com/ag-ventures-qbqxax/30min";
const SUPABASE_URL = "https://qkcafjbmqrxhqyyayrqz.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";


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

function fmt(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
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

async function saveLead(data) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        clinic_name: data.clinic,
        industry: "dental",
        source: "no_show_calculator",
        status: "warm",
        notes: `No-show calculator lead. Monthly loss: ₹${data.monthlyLoss.toLocaleString()}. Annual loss: ₹${data.annualLoss.toLocaleString()}. Recovery potential: ₹${data.recovery.toLocaleString()}/mo. Inputs: ${data.apptPerDay} appts/day, ₹${data.avgRevenue} avg revenue, ${data.noShowRate}% no-show rate.`,
        created_at: new Date().toISOString()
      })
    });
  } catch (_) {
    // silent — don't block UX
  }
}

export default function NoShowCalculator() {
  const [apptPerDay, setApptPerDay] = useState(12);
  const [avgRevenue, setAvgRevenue] = useState(1800);
  const [noShowRate, setNoShowRate] = useState(15);
  const [workingDays, setWorkingDays] = useState(26);

  const [step, setStep] = useState("calc"); // "calc" | "capture" | "done"
  const [form, setForm] = useState({ name: "", email: "", clinic: "" });
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const noShowPerDay = (apptPerDay * noShowRate) / 100;
  const noShowPerMonth = noShowPerDay * workingDays;
  const monthlyLoss = noShowPerMonth * avgRevenue;
  const annualLoss = monthlyLoss * 12;
  const recoveryRate = 0.65;
  const recovery = monthlyLoss * recoveryRate;

  async function handleCapture(e) {
    e.preventDefault();
    if (!form.email) return;
    setSubmitting(true);
    await saveLead({ ...form, monthlyLoss, annualLoss, recovery, apptPerDay, avgRevenue, noShowRate });
    setSubmitting(false);
    setStep("done");
  }

  function handleShare() {
    const url = `https://deltalabsai.com/dental/no-show-calculator`;
    // Viral unit = the personalised shocking number, pre-filled, 1-click, on WhatsApp (India's channel).
    const msg = `😳 My dental clinic is losing ${fmt(annualLoss)} a year to no-shows — I had no idea.\n\nFound out in 30 seconds with this free calculator. Check your clinic's number 👇\n${url}`;
    // Native share sheet on mobile (lets them pick WhatsApp/anything); WhatsApp deep-link on desktop.
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ text: msg, url }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function handleCopy() {
    const url = `https://deltalabsai.com/dental/no-show-calculator`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
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
          <div style={S.tag}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            SmileCRM by Delta Labs AI
          </div>
          <h1 style={S.h1}>How much revenue are you losing to no-shows?</h1>
          <p style={S.sub}>Most dental clinics lose ₹1–3 lakhs every year to missed appointments — and don't even know it. Use this free calculator to find your exact number.</p>
        </F>

        <F d={0.1}>
          <div style={S.card}>
            <div style={S.sectionLabel}>Your Practice</div>

            <SliderInput label="Appointments per day" min={4} max={40} step={1} value={apptPerDay} onChange={setApptPerDay} />
            <SliderInput label="Average revenue per appointment" min={500} max={8000} step={100} value={avgRevenue} onChange={setAvgRevenue} prefix="₹" />
            <SliderInput label="No-show rate" min={5} max={40} step={1} value={noShowRate} onChange={setNoShowRate} suffix="%" />
            <SliderInput label="Working days per month" min={20} max={30} step={1} value={workingDays} onChange={setWorkingDays} />
          </div>
        </F>

        <F d={0.2}>
          <div style={S.sectionLabel}>Your Revenue Loss</div>
          <div style={S.resultsRow}>
            <ResultCard label="No-shows / month" value={Math.round(noShowPerMonth)} sub={`${noShowPerDay.toFixed(1)} per day`} />
            <ResultCard label="Monthly loss" value={fmt(monthlyLoss)} sub="Revenue walking out the door" />
            <ResultCard label="Annual loss" value={fmt(annualLoss)} highlight sub="Every year, year after year" />
          </div>
        </F>

        <F d={0.3}>
          <div style={S.callout}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 28 }}>💡</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
                  SmileCRM could recover {fmt(recovery)}/month for your clinic
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  Our automated reminder + follow-up system recovers an average of 65% of no-shows within 90 days. That's {fmt(recovery * 12)}/year back in your pocket — on a plan that costs ₹2,999–6,999/month.
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
                Get my free SmileCRM recovery plan →
              </button>
              <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                💬 Share my number on WhatsApp
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
                We'll send you a custom PDF showing exactly how SmileCRM would recover <strong style={{ color: "#a5b4fc" }}>{fmt(recovery)}/month</strong> for your clinic — plus a free 30-min consultation.
              </p>
              <form onSubmit={handleCapture}>
                <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <input style={S.input} placeholder="Clinic name" value={form.clinic} onChange={e => setForm(f => ({ ...f, clinic: e.target.value }))} />
                <input style={S.input} type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                <button type="submit" style={{ ...S.btn, ...S.btnPrimary }} disabled={submitting}>
                  {submitting ? "Sending..." : "Send me my recovery plan →"}
                </button>
              </form>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
                <button style={{ ...S.btn, ...S.btnSecondary, width: "auto", padding: "10px 20px", fontSize: 13 }} onClick={() => window.open(CAL, "_blank")}>
                  Or book a 30-min demo directly
                </button>
                <a href={`https://wa.me/917011402167?text=${encodeURIComponent("Hi Delta Labs AI — I just used your no-show calculator and want to know more.")}`} target="_blank" rel="noopener" style={{ ...S.btn, width: "auto", padding: "10px 20px", fontSize: 13, background: "#25D366", color: "#fff", textDecoration: "none" }}>
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
                <a href="#cal-book" target="_blank" rel="noopener" style={{ ...S.btn, ...S.btnPrimary, width: "auto" }}>
                  Book your free demo →
                </a>
                <button style={{ ...S.shareBtn, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }} onClick={handleShare}>
                  💬 Share my number on WhatsApp
                </button>
              </div>
            </div>
          </F>
        )}

        <F d={0.4}>
          <div style={{ marginTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                { n: "65%", l: "Average no-show recovery" },
                { n: "₹2,999", l: "Starting price / month" },
                { n: "2 weeks", l: "Typical setup time" },
                { n: "200+", l: "Clinics served" },
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
