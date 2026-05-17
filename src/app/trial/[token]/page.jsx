"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

const API = "https://delta-labs-ecosystem.vercel.app/api/trial";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = {
  Delta: () => <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Report: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Diag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Arr: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Copy: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Spin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
  High: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
  Med: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Clinic: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="10" y1="8" x2="14" y2="8"/></svg>,
  Key: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="5"/><path d="m21 21-4.35-4.35"/><path d="M11 11v6M8 14h6"/></svg>,
  Launch: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};

const PRODUCT_LABELS = {
  smilecrm: "SmileCRM", fitbiz: "FitBiz Dashboard", homeserv: "HomeServ Pro",
  cafeops: "CafeOps", "ca-manager": "CA Practice Manager", "lead-gen": "Lead Gen Agent",
  content: "Content Agent", "crm-agent": "CRM Agent", outreach: "Outreach Agent", general: "AI Business Suite",
};

const BIZ_LABELS = {
  dental: "Dental / Healthcare", fitness: "Fitness & Wellness", ecommerce: "E-commerce",
  homeservices: "Home Services", realestate: "Real Estate", restaurant: "Restaurant / F&B",
  ca: "Professional Services", other: "Small Business",
};

// ── Score Ring ─────────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 52, c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score));
  const color = pct < 40 ? "#EF4444" : pct < 65 ? "#F59E0B" : "#10B981";
  return (
    <div style={{ position: "relative", width: 130, height: 130, margin: "0 auto 16px" }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
          strokeLinecap="round" transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{pct}</span>
        <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>/ 100</span>
      </div>
    </div>
  );
}

// ── Copy Button ───────────────────────────────────────────────────────────────
function CopyBtn({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ background: "none", border: "1px solid #D1D5DB", borderRadius: 6, padding: "4px 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" }}>
      {copied ? <><Ic.Check /><span>Copied!</span></> : <><Ic.Copy /><span>{label}</span></>}
    </button>
  );
}

// ── SmileCRM Setup + Live Dashboard ──────────────────────────────────────────
function SmileCRMTab({ token, trial }) {
  const [step, setStep] = useState("setup"); // setup | provisioning | ready
  const [form, setForm] = useState({ clinic_name: "", phone: "", address: "" });
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  // If already commissioned in this session (sessionStorage) or trial status = converted
  useEffect(() => {
    const saved = sessionStorage.getItem(`smilecrm_${token}`);
    if (saved) {
      try { setResult(JSON.parse(saved)); setStep("ready"); return; } catch {}
    }
    // Check commission state via status or converted_at
    if (trial.converted_at || trial.status === 'converted') {
      setStep("ready");
      setResult({ already_done: true });
    }
  }, [token, trial.converted_at, trial.status]);

  const provision = async (e) => {
    e.preventDefault();
    if (!form.clinic_name.trim()) { setErrMsg("Clinic name is required"); return; }
    setStep("provisioning"); setErrMsg("");

    try {
      const res = await fetch(`${API}/${token}/commission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.already_done) { setResult({ already_done: true }); setStep("ready"); return; }
        throw new Error(data.error || "Provisioning failed");
      }
      setResult(data);
      sessionStorage.setItem(`smilecrm_${token}`, JSON.stringify(data));
      setStep("ready");
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Please try again.");
      setStep("setup");
    }
  };

  const inp = (field, placeholder, type = "text") => (
    <input
      type={type}
      value={form[field]}
      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
      placeholder={placeholder}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #D1D5DB", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderColor = "#059669"}
      onBlur={e => e.target.style.borderColor = "#D1D5DB"}
    />
  );

  // ── SETUP FORM ──────────────────────────────────────────────────────────────
  if (step === "setup") return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: "#F0FDF4", borderRadius: "50%", marginBottom: 16 }}>
          <Ic.Clinic />
        </div>
        <h2 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800, color: "#0F172A" }}>Set up your SmileCRM clinic</h2>
        <p style={{ margin: 0, fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
          We'll provision a real SmileCRM instance for your dental clinic — with your own login, patient records, calendar, and WhatsApp automation.
        </p>
      </div>

      {/* What you get */}
      <div style={{ background: "#F0FDF4", border: "1px solid #A7F3D0", borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
        <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 13, color: "#065F46", textTransform: "uppercase", letterSpacing: "0.05em" }}>✅ What gets created instantly</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {["Private SmileCRM clinic URL", "20+ dental treatments pre-loaded", "Appointment calendar & queue", "Patient records & history", "WhatsApp follow-up automation", "Analytics & revenue reports"].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#047857" }}>
              <Ic.Check />{f}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "28px" }}>
        <form onSubmit={provision} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Clinic name *</label>
            {inp("clinic_name", "e.g. Sharma Dental Care")}
          </div>
          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Phone number</label>
            {inp("phone", "+91-9876543210", "tel")}
          </div>
          <div>
            <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Clinic address</label>
            {inp("address", "123, MG Road, Bengaluru, Karnataka")}
          </div>
          {errMsg && <p style={{ color: "#DC2626", fontSize: 13, margin: 0 }}>{errMsg}</p>}
          <button type="submit" style={{
            width: "100%", padding: "15px", borderRadius: 11, border: "none", cursor: "pointer",
            background: "#059669", color: "#fff", fontFamily: "'DM Sans',sans-serif",
            fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <Ic.Clinic /> Provision My SmileCRM →
          </button>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>
            Takes ~30 seconds · Login credentials sent to your email · Trial lasts 14 days
          </p>
        </form>
      </div>
    </div>
  );

  // ── PROVISIONING ANIMATION ──────────────────────────────────────────────────
  if (step === "provisioning") return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ display: "inline-flex", width: 72, height: 72, alignItems: "center", justifyContent: "center", background: "#F0FDF4", borderRadius: "50%", marginBottom: 24 }}>
        <Ic.Spin />
      </div>
      <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: "#0F172A" }}>Provisioning your clinic…</h2>
      <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
        Creating your SmileCRM workspace, seeding treatments, and setting up your admin account. This takes about 30 seconds.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
        {["Creating clinic", "Setting up admin", "Loading treatments", "Sending credentials"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#6B7280" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: `pulse ${1 + i * 0.3}s ease infinite` }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );

  // ── SUCCESS / LIVE ──────────────────────────────────────────────────────────
  if (step === "ready") {
    if (result?.already_done) return (
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
        <h2 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 800, color: "#0F172A" }}>Your SmileCRM is already live!</h2>
        <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7 }}>
          We already provisioned your clinic. Check your email (<strong>{trial.email}</strong>) for the login link and credentials.
        </p>
        <div style={{ marginTop: 24, background: "#F0FDF4", borderRadius: 12, padding: "16px 20px", border: "1px solid #A7F3D0" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#065F46" }}>📧 Can't find the email? Check your spam folder or contact <a href="mailto:neil@mail.deltalabsai.com" style={{ color: "#059669" }}>neil@mail.deltalabsai.com</a></p>
        </div>
      </div>
    );

    return (
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Success banner */}
        <div style={{ background: "linear-gradient(135deg, #059669, #047857)", borderRadius: 16, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40 }}>🎉</div>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#fff" }}>SmileCRM is live!</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#D1FAE5" }}>
              <strong>{result?.clinic_name}</strong> is provisioned. Credentials sent to your email.
            </p>
          </div>
        </div>

        {/* Credentials card */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px 28px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0F172A" }}>🔐 Your Login Credentials</h3>
            <CopyBtn text={`URL: ${result?.crm_url}\nEmail: ${result?.login_email}\nPassword: ${result?.temp_password}`} label="Copy All" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Login URL", value: result?.crm_url, isLink: true },
              { label: "Email", value: result?.login_email },
              { label: "Password", value: result?.temp_password, mono: true },
            ].map(({ label, value, isLink, mono }) => (
              <div key={label} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                  {isLink
                    ? <a href={value} target="_blank" rel="noopener" style={{ fontSize: 14, color: "#2563EB", fontWeight: 600 }}>{value}</a>
                    : <p style={{ margin: 0, fontSize: 14, color: "#0F172A", fontWeight: mono ? 800 : 600, fontFamily: mono ? "monospace" : "inherit", letterSpacing: mono ? "0.05em" : "normal" }}>{value}</p>
                  }
                </div>
                <CopyBtn text={value || ""} />
              </div>
            ))}
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 12, color: "#94A3B8" }}>⚠️ Change your password after first login from Settings → Security.</p>
        </div>

        {/* Launch button */}
        <a href={result?.crm_url} target="_blank" rel="noopener" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          background: "#059669", color: "#fff", padding: "16px 32px", borderRadius: 12,
          textDecoration: "none", fontWeight: 700, fontSize: 16, marginBottom: 20,
        }}>
          <Ic.Launch /> Open My SmileCRM
        </a>

        {/* Upgrade CTA */}
        <div style={{ background: "#0F172A", borderRadius: 14, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "#94A3B8" }}>Trial runs for 14 days</p>
            <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700, color: "#fff" }}>Upgrade to keep your clinic + data →</p>
          </div>
          <a href="/store" style={{ background: "#059669", color: "#fff", padding: "11px 22px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
            See Plans
          </a>
        </div>
      </div>
    );
  }

  return null;
}

// ── Standard tabs (non-SmileCRM) ─────────────────────────────────────────────
const TABS = [
  { id: "report",    label: "AI Report",   Icon: Ic.Report },
  { id: "templates", label: "Email Templates", Icon: Ic.Mail },
  { id: "leads",     label: "Lead Intel",  Icon: Ic.Users },
  { id: "diagnostic",label: "Diagnostic",  Icon: Ic.Diag },
];

// ── Business Context Onboarding ───────────────────────────────────────────────
const CHALLENGES = [
  ["no_followup",   "Can't follow up with leads consistently"],
  ["manual_tasks",  "Too many manual / repetitive tasks"],
  ["no_marketing",  "No time for marketing & content"],
  ["lead_tracking", "Losing track of leads and customers"],
  ["no_analytics",  "No visibility into business performance"],
  ["other",         "Something else"],
];

function BusinessContextForm({ trial, onSubmit }) {
  const bizLabel = BIZ_LABELS[trial?.business_type] || "Small Business";
  const [form, setForm] = useState({ company: "", city: "", challenge: "", employees: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.company.trim() && form.challenge;

  const inp = (key, placeholder) => (
    <input value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
      style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10,
        fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }} />
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#0F172A" }}>
          Tell us about your {bizLabel} business
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
          We'll generate a report, email templates, and lead intel <strong>specific to you</strong> — not a generic template.
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {inp("company", "Business / company name *")}
        {inp("city", "City or region (e.g. Mumbai, Delhi NCR)")}

        <select value={form.challenge} onChange={e => set("challenge", e.target.value)}
          style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10,
            fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", color: form.challenge ? "#0F172A" : "#9CA3AF" }}>
          <option value="">Biggest challenge right now *</option>
          {CHALLENGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <select value={form.employees} onChange={e => set("employees", e.target.value)}
          style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10,
            fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", color: form.employees ? "#0F172A" : "#9CA3AF" }}>
          <option value="">Team size (optional)</option>
          {[["solo","Solo / Freelancer"],["2-5","2–5 people"],["6-20","6–20 people"],["20+","20+ people"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <button onClick={() => valid && onSubmit(form)} disabled={!valid}
          style={{ padding: "14px", background: valid ? "#059669" : "#D1D5DB", color: "#fff", border: "none",
            borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}>
          Generate My Personalised Report →
        </button>
        <p style={{ margin: 0, textAlign: "center", fontSize: 12, color: "#94A3B8" }}>Uses 1 AI credit · ~15 seconds · Specific to your business</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TrialDashboard() {
  const { token } = useParams();
  const [trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("report");

  // Business context collected from onboarding form
  const [bizCtx, setBizCtx] = useState(null); // { company, city, challenge, employees }

  // Tool states
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [templates, setTemplates] = useState(null);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [leads, setLeads] = useState(null);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else { setTrial(d); setCredits(d.ai_credits); if (d.product === 'smilecrm') setTab('smilecrm'); }
        setLoading(false);
      })
      .catch(() => { setError("Could not load trial."); setLoading(false); });
  }, [token]);

  const buildContext = useCallback((ctx) => {
    if (!ctx) return "";
    const challengeLabel = CHALLENGES.find(([v]) => v === ctx.challenge)?.[1] || ctx.challenge;
    return [
      ctx.company ? `Business name: ${ctx.company}` : "",
      ctx.city    ? `Location: ${ctx.city}` : "",
      ctx.challenge ? `Main challenge: ${challengeLabel}` : "",
      ctx.employees ? `Team size: ${ctx.employees}` : "",
    ].filter(Boolean).join(" | ");
  }, []);

  const callTool = useCallback(async (tool, setter, loadSetter, ctx) => {
    if (credits <= 0 && tool !== "leads") return;
    loadSetter(true);
    try {
      const context = buildContext(ctx || bizCtx);
      const res = await fetch(`${API}/${token}/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, context }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setter(data.result || data.leads);
      if (data.credits_left !== undefined) setCredits(data.credits_left);
    } catch (e) {
      setter({ error: e.message });
    } finally {
      loadSetter(false);
    }
  }, [token, credits, bizCtx, buildContext]);

  // Don't auto-generate — wait for onboarding form

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
      <div style={{ textAlign: "center" }}><Ic.Spin /><p style={{ fontFamily: "'DM Sans',sans-serif", color: "#6B7280", marginTop: 12 }}>Loading your trial...</p></div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
      <div style={{ textAlign: "center", maxWidth: 400, padding: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏰</div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>
          {error === "Trial expired" ? "Your trial has expired" : "Link not found"}
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#6B7280", marginBottom: 24 }}>
          {error === "Trial expired"
            ? "Your 48-hour trial ended. Upgrade to continue."
            : "This link is invalid or has already been used."}
        </p>
        <a href="/store" style={{ background: "#059669", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15 }}>
          Back to Store →
        </a>
      </div>
    </div>
  );

  const hoursLeft = trial?.hours_left || 0;
  const productLabel = PRODUCT_LABELS[trial?.product] || "AI Business Suite";
  const bizLabel = BIZ_LABELS[trial?.business_type] || "Small Business";
  const isSmileCRM = trial?.product === "smilecrm";

  // SmileCRM gets its own special layout
  const smileTabs = [{ id: "smilecrm", label: "Setup Clinic", Icon: Ic.Clinic }, ...TABS];
  const displayTabs = isSmileCRM ? smileTabs : TABS;

  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:640px){.grid-2col{grid-template-columns:1fr!important}.tab-hide{display:none!important}}
      `}</style>

      {/* Header */}
      <div style={{ background: "#0F172A", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none" }}>
            <Ic.Delta /><span style={{ fontWeight: 700, fontSize: 16 }}>Delta Labs AI</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: hoursLeft > 12 ? "#065F46" : "#7F1D1D", border: `1px solid ${hoursLeft > 12 ? "#10B981" : "#EF4444"}`, borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: hoursLeft > 12 ? "#10B981" : "#FCA5A5" }}>
              ⏱ {hoursLeft}h left
            </div>
            <a href="/store" style={{ background: "#059669", color: "#fff", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Upgrade →</a>
          </div>
        </div>
      </div>

      {/* Welcome bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Welcome,</p>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{trial?.name} — {productLabel} Trial</h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {bizCtx?.company
              ? <span style={{ background: "#EFF6FF", color: "#2563EB", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{bizCtx.company} · {bizLabel}</span>
              : <span style={{ background: "#EFF6FF", color: "#2563EB", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{bizLabel}</span>
            }
            {!isSmileCRM && <span style={{ background: credits > 0 ? "#F0FDF4" : "#FEF2F2", color: credits > 0 ? "#059669" : "#DC2626", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{credits} AI credits</span>}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {displayTabs.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => {
              setTab(id);
              if (id === "templates" && !templates && !templatesLoading) callTool("templates", setTemplates, setTemplatesLoading, bizCtx);
              if (id === "leads" && !leads && !leadsLoading) callTool("leads", setLeads, setLeadsLoading);
            }} style={{
              background: "none", border: "none", cursor: "pointer", padding: "14px 18px",
              fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
              color: tab === id ? (id === "smilecrm" ? "#059669" : "#059669") : "#6B7280",
              borderBottom: tab === id ? "2px solid #059669" : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              <Icon />{label}
              {id === "smilecrm" && <span style={{ background: "#059669", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 100 }}>LIVE</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── SMILECRM TAB ─────────────────────────────────────────── */}
        {tab === "smilecrm" && isSmileCRM && (
          <SmileCRMTab token={token} trial={trial} />
        )}

        {/* ── AI REPORT TAB ────────────────────────────────────────── */}
        {tab === "report" && (
          <div>
            {/* Step 1: Onboarding form — collect business context before generating */}
            {!reportLoading && !report && !bizCtx && !isSmileCRM && (
              <BusinessContextForm trial={trial} onSubmit={(ctx) => {
                setBizCtx(ctx);
                callTool("report", setReport, setReportLoading, ctx);
              }} />
            )}
            {reportLoading && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <Ic.Spin />
                <p style={{ color: "#6B7280", marginTop: 16, fontSize: 15 }}>
                  Analysing {bizCtx?.company || `your ${bizLabel} business`}...<br/>
                  <span style={{ fontSize: 13, color: "#94A3B8" }}>Personalised AI analysis — not a template. ~15 seconds.</span>
                </p>
              </div>
            )}
            {!reportLoading && !report && bizCtx && (
              <div style={{ textAlign: "center", padding: 48 }}>
                <button onClick={() => callTool("report", setReport, setReportLoading)}
                  style={{ background: "#059669", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Generate My AI Business Report
                </button>
                <p style={{ color: "#6B7280", marginTop: 12, fontSize: 13 }}>Uses 1 AI credit · Takes ~15 seconds</p>
              </div>
            )}
            {report && !report.error && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }} className="grid-2col">
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "28px 24px", textAlign: "center" }}>
                  <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Adoption Score</p>
                  <ScoreRing score={report.score} />
                  <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 800, color: "#0F172A", lineHeight: 1.4 }}>{report.headline}</h3>
                  <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{report.summary}</p>
                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "12px 16px", textAlign: "left" }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#065F46" }}>Potential ROI</p>
                    <p style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 800, color: "#059669" }}>{report.roi_estimate}</p>
                  </div>
                  <button onClick={() => { setReport(null); callTool("report", setReport, setReportLoading, bizCtx); }}
                    style={{ marginTop: 16, background: "none", border: "1px solid #E2E8F0", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, color: "#6B7280", width: "100%" }}>
                    Regenerate
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px" }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>🔍 Key Gaps Found</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {(report.gaps || []).map((g, i) => (
                        <div key={i} style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div style={{ flexShrink: 0, width: 72, background: g.impact === "High" ? "#FEE2E2" : "#FEF3C7", borderRadius: 6, padding: "3px 8px", textAlign: "center" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: g.impact === "High" ? "#DC2626" : "#D97706", display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                              {g.impact === "High" ? <Ic.High /> : <Ic.Med />} {g.impact}
                            </span>
                          </div>
                          <div>
                            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{g.title}</p>
                            <p style={{ margin: 0, fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{g.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px" }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>⚡ Quick Wins This Week</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {(report.quick_wins || []).map((w, i) => (
                        <div key={i} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div style={{ flexShrink: 0, width: 28, height: 28, background: "#059669", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 800 }}>{i + 1}</div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: "#065F46" }}>{w.action}</p>
                            <p style={{ margin: 0, fontSize: 12, color: "#047857" }}>Expected: {w.result} · Effort: {w.effort}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#0F172A", borderRadius: 16, padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, color: "#94A3B8" }}>Ready to fix these gaps?</p>
                      <p style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 800, color: "#fff" }}>Upgrade to {productLabel}</p>
                    </div>
                    <a href="/store" style={{ background: "#059669", color: "#fff", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                      See Plans <Ic.Arr />
                    </a>
                  </div>
                </div>
              </div>
            )}
            {report?.error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: 24, color: "#DC2626" }}>
              Error generating report. <button onClick={() => { setReport(null); callTool("report", setReport, setReportLoading); }} style={{ cursor: "pointer", background: "none", border: "none", color: "#DC2626", fontWeight: 700 }}>Try again</button>
            </div>}
          </div>
        )}

        {/* ── EMAIL TEMPLATES TAB ──────────────────────────────────── */}
        {tab === "templates" && (
          <div>
            {templatesLoading && <div style={{ textAlign: "center", padding: "60px 20px" }}><Ic.Spin /><p style={{ color: "#6B7280", marginTop: 16 }}>Generating templates for {bizLabel}...</p></div>}
            {!templatesLoading && !templates && (
              <div style={{ textAlign: "center", padding: 48 }}>
                <button onClick={() => callTool("templates", setTemplates, setTemplatesLoading)}
                  style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Generate Email Templates
                </button>
                <p style={{ color: "#6B7280", marginTop: 12, fontSize: 13 }}>Uses 1 AI credit · AI-written for {bizLabel}</p>
              </div>
            )}
            {templates && !templates.error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0F172A" }}>5 Email Templates — {bizLabel}</h2>
                  <button onClick={() => { setTemplates(null); callTool("templates", setTemplates, setTemplatesLoading, bizCtx); }}
                    style={{ background: "none", border: "1px solid #D1D5DB", borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, color: "#6B7280" }}>
                    Regenerate
                  </button>
                </div>
                {(templates.templates || []).map((t, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <span style={{ background: "#EFF6FF", color: "#2563EB", borderRadius: 100, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>Template {i + 1}</span>
                        <h3 style={{ margin: "8px 0 4px", fontSize: 17, fontWeight: 800, color: "#0F172A" }}>{t.name}</h3>
                        <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{t.best_for}</p>
                      </div>
                      <CopyBtn text={`Subject: ${t.subject}\n\n${t.body}`} />
                    </div>
                    <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
                      <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject Line</p>
                      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{t.subject}</p>
                    </div>
                    <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 16px" }}>
                      <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Body</p>
                      <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{t.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {templates?.error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: 24, color: "#DC2626" }}>Error: {templates.error}</div>}
          </div>
        )}

        {/* ── LEAD INTEL TAB ───────────────────────────────────────── */}
        {tab === "leads" && (
          <div>
            {leadsLoading && <div style={{ textAlign: "center", padding: "60px 20px" }}><Ic.Spin /><p style={{ color: "#6B7280", marginTop: 16 }}>Fetching leads for {bizLabel}...</p></div>}
            {!leadsLoading && !leads && (
              <div style={{ textAlign: "center", padding: 48 }}>
                <button onClick={() => callTool("leads", setLeads, setLeadsLoading)}
                  style={{ background: "#7C3AED", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Show Me Leads
                </button>
                <p style={{ color: "#6B7280", marginTop: 12, fontSize: 13 }}>Free · No AI credits · Real CRM data</p>
              </div>
            )}
            {leads && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0F172A" }}>Sample Leads — {bizLabel}</h2>
                  <span style={{ background: "#F3F4F6", color: "#6B7280", borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>
                    {Array.isArray(leads) ? leads.length : 0} leads shown · Upgrade for 300+ with contacts
                  </span>
                </div>
                {Array.isArray(leads) && leads.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {leads.map((l) => (
                      <div key={l.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{l.company || l.name}</p>
                          <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{l.city}{l.country ? `, ${l.country}` : ""} · {l.industry}</p>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                          {l.email && <a href={`mailto:${l.email}`} style={{ fontSize: 13, color: "#2563EB", textDecoration: "none" }}>{l.email}</a>}
                          {l.score && <span style={{ background: l.score >= 70 ? "#D1FAE5" : "#FEF3C7", color: l.score >= 70 ? "#065F46" : "#92400E", borderRadius: 100, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>Score: {l.score}</span>}
                        </div>
                      </div>
                    ))}
                    <div style={{ background: "#1E293B", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <p style={{ margin: 0, fontSize: 14, color: "#94A3B8" }}>300+ leads with emails, phones, and AI scoring — upgrade for full access.</p>
                      <a href="/store" style={{ background: "#059669", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Unlock Full Database →</a>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 32, textAlign: "center" }}>
                    <p style={{ color: "#6B7280", fontSize: 15 }}>No leads found for your industry yet — our database is growing.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── DIAGNOSTIC TAB ──────────────────────────────────────── */}
        {tab === "diagnostic" && (
          <div style={{ textAlign: "center", padding: "32px 20px" }}>
            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E2E8F0", padding: "40px 32px", maxWidth: 560, margin: "0 auto" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏥</div>
              <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: "#0F172A" }}>9-Dimension Business Diagnostic</h2>
              <p style={{ margin: "0 0 28px", fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
                Get a full AI health score across 9 dimensions: Operations, Marketing, Tech, Finance, Customer Experience, and more.
              </p>
              <a href="/diagnostic" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0F172A", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
                Start Free Diagnostic <Ic.Arr />
              </a>
              <p style={{ margin: "16px 0 0", fontSize: 12, color: "#94A3B8" }}>No credit card · 3 min · Instant results</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
