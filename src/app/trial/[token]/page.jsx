"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

const API = "https://delta-labs-ecosystem.vercel.app/api/trial";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = {
  Delta: () => <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><polygon points="20,5 35,33 5,33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/><circle cx="20" cy="22" r="3.5" fill="currentColor" opacity="0.3"/></svg>,
  Spin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
  Copy: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Arr: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Post: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Cal: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Sub: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Reply: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Score: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Pipe: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  Gym: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>,
  Alert: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>,
  Renew: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Blog: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Clinic: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="10" y1="8" x2="14" y2="8"/></svg>,
};

const PRODUCT_LABELS = {
  smilecrm: "SmileCRM", fitbiz: "FitBiz Dashboard", homeserv: "HomeServ Pro",
  cafeops: "CafeOps", "ca-manager": "CA Practice Manager", "lead-gen": "Lead Gen Agent",
  content: "Content Agent", "crm-agent": "CRM Agent", outreach: "Outreach Agent", general: "AI Business Suite",
};

// ── Copy Button ───────────────────────────────────────────────────────────────
function CopyBtn({ text, label = "Copy", small = false }) {
  const [copied, setCopied] = useState(false);
  const click = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const pad = small ? "4px 10px" : "6px 14px";
  const fs = small ? 11 : 12;
  return (
    <button onClick={click} style={{ background: "none", border: "1px solid #D1D5DB", borderRadius: 6, padding: pad, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, fontSize: fs, color: "#6B7280", whiteSpace: "nowrap" }}>
      {copied ? <><Ic.Check /><span>Copied!</span></> : <><Ic.Copy /><span>{label}</span></>}
    </button>
  );
}

// ── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 90 }) {
  const r = size * 0.4, c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score));
  const color = pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={size*0.08}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.08}
          strokeDasharray={c} strokeDashoffset={c*(1-pct/100)} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dashoffset 1s ease" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size*0.28, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{pct}</span>
      </div>
    </div>
  );
}

// ── Generic Input Form ─────────────────────────────────────────────────────────
function ToolForm({ fields, onRun, loading, creditCost = 1, label = "Generate" }) {
  const init = Object.fromEntries(fields.map(f => [f.key, f.default || ""]));
  const [vals, setVals] = useState(init);
  const set = (k, v) => setVals(p => ({ ...p, [k]: v }));
  const required = fields.filter(f => f.required);
  const valid = required.every(f => vals[f.key]?.trim());

  const buildCtx = () => fields.map(f => {
    const v = vals[f.key];
    return v ? `${f.label}: ${v}` : "";
  }).filter(Boolean).join(" | ");

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "24px", marginBottom: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
        {fields.map(f => f.type === "select" ? (
          <div key={f.key}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}{f.required ? " *" : ""}</label>
            <select value={vals[f.key]} onChange={e => set(f.key, e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: vals[f.key] ? "#0F172A" : "#9CA3AF" }}>
              <option value="">{f.placeholder || "Select…"}</option>
              {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        ) : (
          <div key={f.key}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}{f.required ? " *" : ""}</label>
            <input value={vals[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder || ""}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => valid && !loading && onRun(buildCtx())} disabled={!valid || loading}
          style={{ background: valid && !loading ? "#059669" : "#D1D5DB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: valid && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
          {loading ? <><Ic.Spin />{label}…</> : <>{label} <Ic.Arr /></>}
        </button>
        {creditCost > 0 && <span style={{ fontSize: 12, color: "#94A3B8" }}>Uses {creditCost} AI credit</span>}
        {creditCost === 0 && <span style={{ fontSize: 12, color: "#10B981" }}>Free · No credit used</span>}
      </div>
    </div>
  );
}

// ── Card wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "20px 24px", ...style }}>{children}</div>
);
const Tag = ({ label, color = "#E0F2FE", textColor = "#0369A1" }) => (
  <span style={{ background: color, color: textColor, borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{label}</span>
);
const priorityColor = (p) => p === "High" || p === "Hot" ? "#FEE2E2" : p === "Medium" || p === "Warm" ? "#FEF3C7" : "#F1F5F9";
const priorityText = (p) => p === "High" || p === "Hot" ? "#DC2626" : p === "Medium" || p === "Warm" ? "#D97706" : "#64748B";

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT TAB CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCT_TABS = {
  content: [
    { id: "linkedin_posts", label: "LinkedIn Posts", Icon: Ic.Post,
      fields: [
        { key: "company", label: "Company / Brand Name", placeholder: "e.g. FlowFit Studio", required: true },
        { key: "industry", label: "Industry", placeholder: "e.g. Fitness, Dental, E-commerce", required: true },
        { key: "recent_win", label: "Recent win or topic", placeholder: "e.g. helped client cut costs by 30%" },
      ],
      prompt: (ctx) => `Company context: ${ctx}. Generate 3 LinkedIn posts for this business.`,
    },
    { id: "blog_outline", label: "Blog Outline", Icon: Ic.Blog,
      fields: [
        { key: "topic", label: "Blog Topic", placeholder: "e.g. How AI reduces no-shows for dentists", required: true },
        { key: "company", label: "Company Name", placeholder: "e.g. Delta Labs AI" },
        { key: "audience", label: "Target Audience", placeholder: "e.g. Dental clinic owners", required: true },
        { key: "goal", label: "Goal", type: "select", options: [["leads","Drive leads"],["seo","SEO ranking"],["thought_leadership","Thought leadership"],["educate","Educate audience"]], required: true },
      ],
    },
    { id: "content_calendar", label: "30-Day Calendar", Icon: Ic.Cal,
      fields: [
        { key: "company", label: "Company Name", placeholder: "e.g. FlowFit Studio", required: true },
        { key: "industry", label: "Industry", placeholder: "e.g. Fitness", required: true },
        { key: "themes", label: "Content Themes (comma separated)", placeholder: "e.g. member retention, class tips, success stories", required: true },
      ],
    },
  ],

  outreach: [
    { id: "cold_sequence", label: "Email Sequence", Icon: Ic.Mail,
      fields: [
        { key: "product", label: "Your Product / Service", placeholder: "e.g. AI booking automation for gyms", required: true },
        { key: "target", label: "Target Persona", placeholder: "e.g. Solo dentists in Mumbai", required: true },
        { key: "value_prop", label: "Core Value Prop", placeholder: "e.g. Cut no-shows by 40% with WhatsApp reminders", required: true },
        { key: "sender", label: "Sender Name", placeholder: "e.g. Neil from Delta Labs AI" },
      ],
    },
    { id: "subject_lab", label: "Subject Line Lab", Icon: Ic.Sub,
      fields: [
        { key: "target", label: "Target Persona", placeholder: "e.g. Gym owners in Bangalore", required: true },
        { key: "goal", label: "Email Goal", type: "select", options: [["call","Book a call"],["reply","Get a reply"],["resource","Share a resource"],["referral","Get a referral"]], required: true },
        { key: "product", label: "Your Product / Service", placeholder: "e.g. member retention software" },
      ],
    },
    { id: "reply_handlers", label: "Reply Handlers", Icon: Ic.Reply,
      fields: [
        { key: "product", label: "Product / Service Name", placeholder: "e.g. SmileCRM for dental clinics", required: true },
        { key: "differentiator", label: "Key Differentiator", placeholder: "e.g. WhatsApp-first, no app install needed", required: true },
        { key: "next_step", label: "Desired Next Step", type: "select", options: [["call","Book a discovery call"],["website","Visit the website"],["demo","Watch a 2-min demo"],["info","Send more info"]], required: true },
      ],
    },
  ],

  "lead-gen": [
    { id: "lead_preview", label: "Live Leads", Icon: Ic.Users, creditCost: 0,
      fields: [
        { key: "industry", label: "Industry (pre-filled from signup)", placeholder: "e.g. Dental, Fitness" },
        { key: "city", label: "Preferred City / Region", placeholder: "e.g. Mumbai, Delhi NCR" },
      ],
    },
    { id: "lead_score", label: "Score a Lead", Icon: Ic.Score,
      fields: [
        { key: "business", label: "Business Name", placeholder: "e.g. Sharma Dental Care, Koramangala", required: true },
        { key: "city", label: "City", placeholder: "e.g. Bangalore", required: true },
        { key: "industry", label: "Industry", placeholder: "e.g. Dental clinic", required: true },
        { key: "notes", label: "What you know about them", placeholder: "e.g. Active on Instagram, no website booking" },
      ],
    },
    { id: "weekly_preview", label: "Weekly Delivery Preview", Icon: Ic.Cal,
      fields: [
        { key: "industry", label: "Industry", placeholder: "e.g. Dental, Fitness, E-commerce", required: true },
        { key: "region", label: "Region", placeholder: "e.g. Mumbai & Pune, Pan India", required: true },
        { key: "min_score", label: "Minimum Lead Score", type: "select", options: [["65","65+"],["70","70+"],["75","75+"]], default: "65" },
      ],
    },
  ],

  "crm-agent": [
    { id: "pipeline_snapshot", label: "Pipeline Snapshot", Icon: Ic.Pipe,
      fields: [
        { key: "lead1", label: "Lead 1 (Name, Stage, Days since contact)", placeholder: "e.g. Priya Dental, Proposal Sent, 8 days", required: true },
        { key: "lead2", label: "Lead 2", placeholder: "e.g. Raj Gym, Contacted, 3 days" },
        { key: "lead3", label: "Lead 3", placeholder: "e.g. Mumbai Fitclub, Negotiating, 14 days" },
        { key: "product", label: "What you sell", placeholder: "e.g. CRM software for clinics", required: true },
      ],
    },
    { id: "followup_sequence", label: "Follow-up Sequence", Icon: Ic.Mail,
      fields: [
        { key: "product", label: "Your Product / Service", placeholder: "e.g. AI booking tool for dental clinics", required: true },
        { key: "deal_size", label: "Typical Deal Size", type: "select", options: [["small","Under ₹25,000"],["medium","₹25K–₹1L"],["large","Above ₹1 lakh"]], required: true },
        { key: "industry", label: "Target Industry", placeholder: "e.g. dental, fitness, e-commerce", required: true },
      ],
    },
    { id: "lead_triage", label: "Lead Triage", Icon: Ic.Score,
      fields: [
        { key: "lead1", label: "Lead 1 (Name, Source, Last convo)", placeholder: "e.g. Priya-inbound-asked pricing", required: true },
        { key: "lead2", label: "Lead 2", placeholder: "e.g. Raj-cold outreach-no response yet" },
        { key: "lead3", label: "Lead 3", placeholder: "e.g. Ananya-referral-interested, needs time" },
        { key: "product", label: "What you sell", placeholder: "e.g. WhatsApp automation for gyms", required: true },
      ],
    },
  ],

  fitbiz: [
    { id: "class_schedule", label: "Class Schedule", Icon: Ic.Gym,
      fields: [
        { key: "studio", label: "Studio Name", placeholder: "e.g. FlowFit Studio", required: true },
        { key: "classes", label: "Class Types (comma separated)", placeholder: "e.g. Yoga, HIIT, Zumba, Pilates", required: true },
        { key: "instructors", label: "Number of Instructors", type: "select", options: [["1","1 (solo)"],["2","2"],["3","3"],["4","4+"], ["5","5+"]], required: true },
        { key: "peak", label: "Peak Preference", type: "select", options: [["morning","Morning (6–9 AM)"],["evening","Evening (6–9 PM)"],["both","Both morning + evening"],["weekend","Weekend focus"]], required: true },
      ],
    },
    { id: "churn_radar", label: "Churn Radar", Icon: Ic.Alert,
      fields: [
        { key: "studio", label: "Studio Name", placeholder: "e.g. FlowFit Studio", required: true },
        { key: "member1", label: "Member 1 (Name, Membership, Last class)", placeholder: "e.g. Ananya, Monthly, 18 days ago, 2 classes this month", required: true },
        { key: "member2", label: "Member 2", placeholder: "e.g. Rahul, Quarterly, 4 days ago, 8 classes" },
        { key: "member3", label: "Member 3", placeholder: "e.g. Priya, Annual, 25 days ago, 1 class" },
        { key: "price", label: "Monthly Membership Price (₹)", placeholder: "e.g. 1999" },
      ],
    },
    { id: "renewal_sequence", label: "Renewal Messages", Icon: Ic.Renew,
      fields: [
        { key: "studio", label: "Studio Name", placeholder: "e.g. FlowFit Studio", required: true },
        { key: "price", label: "Membership Price", placeholder: "e.g. ₹1,999/month", required: true },
        { key: "discount", label: "Renewal Offer / Discount", placeholder: "e.g. 10% off for 3-month renewal" },
        { key: "tone", label: "Studio Personality", type: "select", options: [["friendly","Friendly & Community"],["professional","Professional & Structured"],["energetic","Energetic & Fun"]], required: true },
      ],
    },
  ],

  smilecrm: [], // handled separately
  general: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// OUTPUT RENDERERS — one per tool type
// ─────────────────────────────────────────────────────────────────────────────

function RenderLinkedinPosts({ data }) {
  if (!data?.posts) return <ErrorCard data={data} />;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>3 LinkedIn Posts — Ready to Publish</h2>
        <CopyBtn text={data.posts.map(p => `--- ${p.format} ---\n${p.hook}\n\n${p.body}\n\n${p.hashtags?.join(" ")}`).join("\n\n")} label="Copy All 3" />
      </div>
      {data.posts.map((p, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 12 }}>
            <div>
              <Tag label={p.format} />
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#94A3B8" }}>Best time: {p.best_time}</p>
            </div>
            <CopyBtn text={`${p.hook}\n\n${p.body}\n\n${p.hashtags?.join(" ")}`} />
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: 15, color: "#0F172A", lineHeight: 1.4 }}>{p.hook}</p>
            <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{p.body}</p>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {p.hashtags?.map(h => <Tag key={h} label={h} color="#EFF6FF" textColor="#2563EB" />)}
          </div>
        </Card>
      ))}
    </div>
  );
}

function RenderBlogOutline({ data }) {
  if (!data?.sections) return <ErrorCard data={data} />;
  const text = `Title: ${data.seo_title}\nMeta: ${data.meta_description}\n\n${data.sections.map(s => `## ${s.h2}\n${s.summary}${s.suggested_stat ? "\nStat: " + s.suggested_stat : ""}`).join("\n\n")}\n\nCTA: ${data.call_to_action}`;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Blog Outline</h2>
        <CopyBtn text={text} label="Copy Full Outline" />
      </div>
      <Card style={{ marginBottom: 16 }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" }}>SEO Title</p>
        <p style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 17, color: "#0F172A" }}>{data.seo_title}</p>
        <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" }}>Meta Description</p>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "#475569" }}>{data.meta_description}</p>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 12, color: "#6B7280" }}>~{data.word_count_estimate} words</span>
        </div>
      </Card>
      {data.intro_hook && (
        <Card style={{ marginBottom: 16, background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#065F46", textTransform: "uppercase" }}>Intro Hook</p>
          <p style={{ margin: 0, fontSize: 14, color: "#064E3B", fontStyle: "italic" }}>"{data.intro_hook}"</p>
        </Card>
      )}
      {data.sections?.map((s, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: 15, color: "#0F172A" }}>H2: {s.h2}</p>
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{s.summary}</p>
          {s.suggested_stat && <Tag label={`📊 ${s.suggested_stat}`} color="#FEF3C7" textColor="#92400E" />}
        </Card>
      ))}
      {data.call_to_action && (
        <Card style={{ background: "#0F172A" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>Call to Action</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>{data.call_to_action}</p>
        </Card>
      )}
    </div>
  );
}

function RenderContentCalendar({ data }) {
  if (!data?.schedule) return <ErrorCard data={data} />;
  const platformColor = { LinkedIn: "#EFF6FF", Blog: "#F0FDF4", Instagram: "#FDF4FF", Twitter: "#F0F9FF" };
  const platformText = { LinkedIn: "#2563EB", Blog: "#059669", Instagram: "#7C3AED", Twitter: "#0891B2" };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>4-Week Content Calendar</h2>
        <CopyBtn text={data.schedule.map(w => `WEEK ${w.week}\n${w.days?.map(d => `${d.day}: [${d.platform}] ${d.format} — ${d.topic}`).join("\n")}`).join("\n\n")} label="Export as Text" />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {data.themes?.map(t => <Tag key={t} label={t} />)}
      </div>
      {data.schedule?.map(week => (
        <Card key={week.week} style={{ marginBottom: 16 }}>
          <p style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 14, color: "#0F172A" }}>Week {week.week}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {week.days?.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < week.days.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", width: 70, flexShrink: 0, paddingTop: 2 }}>{d.day}</span>
                <Tag label={d.platform} color={platformColor[d.platform] || "#F3F4F6"} textColor={platformText[d.platform] || "#374151"} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{d.format} · </span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{d.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function RenderColdSequence({ data }) {
  if (!data?.emails) return <ErrorCard data={data} />;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{data.sequence_name}</h2>
        <CopyBtn text={data.emails?.map(e => `Email ${e.step} (Day ${e.send_day})\nSubject: ${e.subject}\n\n${e.body}`).join("\n\n---\n\n")} label="Copy All 3" />
      </div>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: "#6B7280" }}>Target: {data.target} · Expected reply rate: {data.expected_reply_rate}</p>
      {data.emails?.map((e, i) => (
        <Card key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0F172A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{e.step}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Day {e.send_day} · {e.send_time}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{e.word_count} words</p>
              </div>
            </div>
            <CopyBtn text={`Subject: ${e.subject}\n\n${e.body}`} />
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
            <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" }}>Subject</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{e.subject}</p>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{e.body}</p>
        </Card>
      ))}
      {data.sequence_tip && (
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "12px 16px" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#065F46" }}>💡 {data.sequence_tip}</p>
        </div>
      )}
    </div>
  );
}

function RenderSubjectLab({ data }) {
  if (!data?.variants) return <ErrorCard data={data} />;
  const frameworks = [...new Set(data.variants?.map(v => v.framework))];
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>8 Subject Line Variants</h2>
        <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>Target: {data.persona} · Goal: {data.goal}</p>
      </div>
      {data.recommended && (
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "10px 16px", marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 13, color: "#065F46" }}>⭐ Recommended: {data.recommended}</p>
        </div>
      )}
      {frameworks.map(fw => (
        <Card key={fw} style={{ marginBottom: 16 }}>
          <p style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 14, color: "#0F172A" }}>{fw}</p>
          {data.variants?.filter(v => v.framework === fw).map((v, i) => (
            <div key={i} style={{ background: "#F8FAFC", borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: "#0F172A" }}>{v.subject}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>{v.why_it_works}</p>
              </div>
              <CopyBtn text={v.subject} small />
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

function RenderReplyHandlers({ data }) {
  if (!data?.handlers) return <ErrorCard data={data} />;
  const colors = ["#FEF2F2", "#FEF3C7", "#EFF6FF"];
  const borders = ["#FECACA", "#FDE68A", "#BFDBFE"];
  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Reply Handler Scripts</h2>
      {data.handlers?.map((h, i) => (
        <Card key={i} style={{ marginBottom: 16, background: colors[i] || "#F8FAFC", border: `1px solid ${borders[i] || "#E2E8F0"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <Tag label={h.trigger} color="rgba(0,0,0,0.08)" textColor="#374151" />
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6B7280" }}>Tone: {h.tone}</p>
            </div>
            <CopyBtn text={h.response} small />
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#0F172A", lineHeight: 1.7, fontStyle: "italic" }}>"{h.response}"</p>
          <p style={{ margin: 0, fontSize: 11, color: "#6B7280", background: "rgba(0,0,0,0.04)", borderRadius: 6, padding: "6px 10px" }}>
            🤖 Agent does: {h.auto_action}
          </p>
        </Card>
      ))}
    </div>
  );
}

function RenderLeadPreview({ data }) {
  if (!data?.leads) return <ErrorCard data={data} />;
  const leads = data.leads || [];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Live Lead Preview</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>Showing {leads.length} leads from database · Upgrade for full contact details</p>
        </div>
      </div>
      {leads.length === 0 && (
        <Card><p style={{ margin: 0, color: "#6B7280", textAlign: "center" }}>No leads found for this industry yet — our database is growing.</p></Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {leads.map((l, i) => (
          <Card key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{l.company}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{[l.city, l.country].filter(Boolean).join(", ")} · {l.industry}</p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ background: "#F3F4F6", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>Email locked</span>
              </div>
              <span style={{ background: l.score >= 70 ? "#D1FAE5" : "#FEF3C7", color: l.score >= 70 ? "#065F46" : "#92400E", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>Score {l.score}</span>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ background: "#0F172A", borderRadius: 12, padding: "20px 24px", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 14, color: "#94A3B8" }}>Upgrade to unlock emails, phones & AI-written outreach for 300+ leads</p>
        <a href="/store" style={{ background: "#059669", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Unlock Full Access →</a>
      </div>
    </div>
  );
}

function RenderLeadScore({ data }) {
  if (!data?.dimensions) return <ErrorCard data={data} />;
  const tierColor = data.tier === "Hot" ? "#059669" : data.tier === "Warm" ? "#D97706" : "#6B7280";
  return (
    <div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
        <ScoreRing score={data.overall_score} size={100} />
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#0F172A" }}>{data.business}</h2>
          <Tag label={data.tier} color={tierColor === "#059669" ? "#D1FAE5" : tierColor === "#D97706" ? "#FEF3C7" : "#F3F4F6"} textColor={tierColor} />
        </div>
      </div>
      <Card style={{ marginBottom: 16 }}>
        <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 15, color: "#0F172A" }}>Scoring Breakdown</p>
        {data.dimensions?.map((d, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{d.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: d.score >= 70 ? "#059669" : d.score >= 50 ? "#D97706" : "#DC2626" }}>{d.score}</span>
            </div>
            <div style={{ background: "#E5E7EB", borderRadius: 100, height: 6, marginBottom: 3 }}>
              <div style={{ background: d.score >= 70 ? "#10B981" : d.score >= 50 ? "#F59E0B" : "#EF4444", width: `${d.score}%`, height: "100%", borderRadius: 100, transition: "width 1s ease" }} />
            </div>
            <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>{d.finding}</p>
          </div>
        ))}
      </Card>
      {data.recommended_approach && (
        <Card style={{ marginBottom: 12, background: "#FFFBEB", border: "1px solid #FDE68A" }}>
          <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13, color: "#92400E" }}>🎯 Recommended Approach</p>
          <p style={{ margin: 0, fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>{data.recommended_approach}</p>
        </Card>
      )}
      {data.suggested_first_line && (
        <Card style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13, color: "#065F46" }}>💬 Suggested First Line</p>
              <p style={{ margin: 0, fontSize: 14, color: "#064E3B", fontStyle: "italic" }}>"{data.suggested_first_line}"</p>
            </div>
            <CopyBtn text={data.suggested_first_line} small />
          </div>
        </Card>
      )}
    </div>
  );
}

function RenderWeeklyPreview({ data }) {
  if (!data?.leads) return <ErrorCard data={data} />;
  return (
    <div>
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
        <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14, color: "#065F46" }}>📦 {data.week} — Example Weekly Delivery</p>
        <p style={{ margin: 0, fontSize: 13, color: "#047857" }}>Filter: {data.criteria}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.leads?.map((l, i) => (
          <Card key={i}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0F172A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>#{l.rank}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{l.company}</p>
                  <span style={{ background: l.score >= 75 ? "#D1FAE5" : "#FEF3C7", color: l.score >= 75 ? "#065F46" : "#92400E", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>Score {l.score}</span>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6B7280" }}>{l.city} · {l.email}</p>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#374151" }}>📌 {l.pain_point}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Angle: {l.outreach_angle}</p>
              </div>
              <CopyBtn text={`${l.company}, ${l.city}\nEmail: ${l.email}\nPain: ${l.pain_point}\nAngle: ${l.outreach_angle}`} small />
            </div>
          </Card>
        ))}
      </div>
      <div style={{ background: "#0F172A", borderRadius: 12, padding: "16px 20px", marginTop: 16 }}>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "#94A3B8" }}>{data.delivery_note}</p>
        <a href="/store" style={{ color: "#10B981", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Unlock full weekly delivery →</a>
      </div>
    </div>
  );
}

function RenderPipelineSnapshot({ data }) {
  if (!data?.leads) return <ErrorCard data={data} />;
  return (
    <div>
      <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#92400E" }}>📊 {data.pipeline_health}</p>
      </div>
      {data.leads?.map((l, i) => (
        <Card key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 15, color: "#0F172A" }}>{l.name}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag label={l.stage} color="#EFF6FF" textColor="#2563EB" />
                <Tag label={`${l.priority} Priority`} color={priorityColor(l.priority)} textColor={priorityText(l.priority)} />
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#6B7280" }}>{l.days_since_contact}d since last contact</span>
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#374151" }}>→ {l.action}</p>
          <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#065F46", fontStyle: "italic", lineHeight: 1.6 }}>"{l.suggested_message}"</p>
            <CopyBtn text={l.suggested_message} small />
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", background: "#F8FAFC", borderRadius: 6, padding: "5px 10px" }}>
            🤖 Agent would: {l.agent_would}
          </p>
        </Card>
      ))}
    </div>
  );
}

function RenderFollowupSequence({ data }) {
  if (!data?.touches) return <ErrorCard data={data} />;
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{data.sequence_name}</h2>
        <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>Trigger: {data.trigger}</p>
      </div>
      {data.touches?.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0F172A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>D{t.day}</div>
            {i < data.touches.length - 1 && <div style={{ width: 2, flex: 1, background: "#E2E8F0", margin: "6px 0" }} />}
          </div>
          <Card style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag label={t.channel} />
                {t.subject && <span style={{ fontSize: 12, color: "#6B7280" }}>Sub: {t.subject}</span>}
              </div>
              <CopyBtn text={t.message} small />
            </div>
            <p style={{ margin: "0 0 8px", fontSize: 14, color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>"{t.message}"</p>
            <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF", background: "#F8FAFC", borderRadius: 6, padding: "5px 10px" }}>
              🤖 {t.agent_action}
            </p>
          </Card>
        </div>
      ))}
      {data.why_it_works && (
        <Card style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 13, color: "#065F46" }}>💡 Why this works</p>
          <p style={{ margin: 0, fontSize: 13, color: "#064E3B", lineHeight: 1.6 }}>{data.why_it_works}</p>
        </Card>
      )}
    </div>
  );
}

function RenderLeadTriage({ data }) {
  if (!data?.triage) return <ErrorCard data={data} />;
  const { close_now = [], nurture = [], drop = [] } = data.triage;
  const Section = ({ title, leads, color, textColor, bg }) => leads.length === 0 ? null : (
    <div style={{ marginBottom: 20 }}>
      <div style={{ background: bg, border: `1px solid ${color}`, borderRadius: 8, padding: "6px 14px", marginBottom: 10, display: "inline-block" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: textColor }}>{title} ({leads.length})</span>
      </div>
      {leads.map((l, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{l.name}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Score: {l.score} · {l.reason}</p>
            </div>
            <Tag label={`Score ${l.score}`} color={bg} textColor={textColor} />
          </div>
          {(l.suggested_opening || l.nurture_plan) && (
            <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#374151", fontStyle: "italic" }}>"{l.suggested_opening || l.nurture_plan}"</p>
              {l.suggested_opening && <CopyBtn text={l.suggested_opening} small />}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Lead Triage Results</h2>
      <Section title="🔥 Close Now" leads={close_now} color="#10B981" textColor="#065F46" bg="#D1FAE5" />
      <Section title="🌱 Nurture" leads={nurture} color="#F59E0B" textColor="#92400E" bg="#FEF3C7" />
      <Section title="❌ Drop for Now" leads={drop} color="#6B7280" textColor="#374151" bg="#F3F4F6" />
      {data.agent_note && (
        <Card style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#065F46" }}>🤖 {data.agent_note}</p>
        </Card>
      )}
    </div>
  );
}

function RenderClassSchedule({ data }) {
  if (!data?.weekly_schedule) return <ErrorCard data={data} />;
  const classColors = { Yoga: "#EDE9FE", HIIT: "#FEE2E2", Zumba: "#FEF3C7", Pilates: "#E0F2FE", CrossFit: "#FEE2E2", Spinning: "#F0FDF4", Dance: "#FDF4FF", Boxing: "#FEF2F2" };
  return (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{data.studio} — Weekly Schedule</h2>
      {data.weekly_schedule?.map((day, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <p style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 14, color: "#0F172A" }}>{day.day}</p>
          {day.slots?.map((s, j) => (
            <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderTop: j > 0 ? "1px solid #F1F5F9" : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", width: 55, flexShrink: 0 }}>{s.time}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                  <Tag label={s.class} color={classColors[s.class] || "#F3F4F6"} textColor="#374151" />
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Cap: {s.capacity} · {s.demand_signal}</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>🤖 {s.automated_reminder}</p>
              </div>
            </div>
          ))}
        </Card>
      ))}
      {data.optimization_tips?.length > 0 && (
        <Card style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 14, color: "#92400E" }}>💡 Optimisation Tips</p>
          {data.optimization_tips.map((t, i) => (
            <p key={i} style={{ margin: i < data.optimization_tips.length - 1 ? "0 0 6px" : 0, fontSize: 13, color: "#78350F" }}>• {t}</p>
          ))}
        </Card>
      )}
    </div>
  );
}

function RenderChurnRadar({ data }) {
  if (!data?.members) return <ErrorCard data={data} />;
  const riskColor = { High: "#FEE2E2", Medium: "#FEF3C7", Low: "#D1FAE5" };
  const riskText = { High: "#DC2626", Medium: "#D97706", Low: "#065F46" };
  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {[["High Risk", data.summary?.high_risk, "#DC2626"], ["Medium Risk", data.summary?.medium_risk, "#D97706"], ["Healthy", data.summary?.healthy, "#059669"]].map(([label, count, color]) => (
          <Card key={label} style={{ textAlign: "center", minWidth: 100 }}>
            <p style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 800, color }}>{count || 0}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B7280" }}>{label}</p>
          </Card>
        ))}
        {data.summary?.revenue_at_risk && (
          <Card style={{ background: "#FEF2F2", border: "1px solid #FECACA", textAlign: "center", minWidth: 140 }}>
            <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 800, color: "#DC2626" }}>{data.summary.revenue_at_risk}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B7280" }}>Revenue at risk</p>
          </Card>
        )}
      </div>
      {data.members?.map((m, i) => (
        <Card key={i} style={{ marginBottom: 12, borderLeft: `4px solid ${riskText[m.churn_risk] || "#6B7280"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 15, color: "#0F172A" }}>{m.name}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag label={m.membership} color="#EFF6FF" textColor="#2563EB" />
                <Tag label={`${m.churn_risk} Risk`} color={riskColor[m.churn_risk] || "#F3F4F6"} textColor={riskText[m.churn_risk] || "#374151"} />
              </div>
            </div>
            <Tag label={m.urgency} color="#FEF3C7" textColor="#92400E" />
          </div>
          <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6B7280" }}>{m.risk_reason}</p>
          <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#065F46" }}>💬 {m.re_engagement_message}</p>
            <CopyBtn text={m.re_engagement_message} small />
          </div>
        </Card>
      ))}
    </div>
  );
}

function RenderRenewalSequence({ data }) {
  if (!data?.sequence) return <ErrorCard data={data} />;
  return (
    <div>
      <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#0F172A" }}>Renewal Reminder Sequence</h2>
      {data.expected_renewal_rate && (
        <div style={{ background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 10, padding: "10px 16px", marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#065F46" }}>📈 {data.expected_renewal_rate}</p>
        </div>
      )}
      {data.sequence?.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: i === 0 ? "#059669" : i === 1 ? "#F59E0B" : "#DC2626", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0, textAlign: "center", lineHeight: 1.2 }}>
              {i === 0 ? "D-7" : i === 1 ? "D-3" : "D-0"}
            </div>
            {i < data.sequence.length - 1 && <div style={{ width: 2, flex: 1, background: "#E2E8F0", margin: "6px 0" }} />}
          </div>
          <Card style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <Tag label={s.trigger} />
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#94A3B8" }}>via {s.channel}</p>
              </div>
              <CopyBtn text={s.message} small />
            </div>
            <p style={{ margin: "0 0 8px", fontSize: 14, color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>"{s.message}"</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B7280" }}>{s.tone_note}</p>
          </Card>
        </div>
      ))}
      {data.automation_note && (
        <Card style={{ background: "#0F172A" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#94A3B8" }}>🤖 {data.automation_note}</p>
        </Card>
      )}
    </div>
  );
}

function ErrorCard({ data }) {
  return (
    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: 20, color: "#DC2626" }}>
      {data?.error || "Could not generate result."} {data?.raw && <span style={{ fontSize: 11 }}>{data.raw}</span>}
    </div>
  );
}

// Map tool id → renderer
const RENDERERS = {
  linkedin_posts: RenderLinkedinPosts,
  blog_outline: RenderBlogOutline,
  content_calendar: RenderContentCalendar,
  cold_sequence: RenderColdSequence,
  subject_lab: RenderSubjectLab,
  reply_handlers: RenderReplyHandlers,
  lead_preview: RenderLeadPreview,
  lead_score: RenderLeadScore,
  weekly_preview: RenderWeeklyPreview,
  pipeline_snapshot: RenderPipelineSnapshot,
  followup_sequence: RenderFollowupSequence,
  lead_triage: RenderLeadTriage,
  class_schedule: RenderClassSchedule,
  churn_radar: RenderChurnRadar,
  renewal_sequence: RenderRenewalSequence,
};

// ── SmileCRM Tab (unchanged) ──────────────────────────────────────────────────
function SmileCRMTab({ token, trial }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>🦷</div>
      <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: "#0F172A" }}>SmileCRM Trial Active</h2>
      <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7 }}>
        Your SmileCRM trial is ready. Check your email (<strong>{trial.email}</strong>) for the setup link and clinic provisioning steps.
      </p>
      <a href="mailto:neil@mail.deltalabsai.com" style={{ display: "inline-block", marginTop: 20, background: "#059669", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
        Contact Support →
      </a>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function TrialDashboard() {
  const { token } = useParams();
  const [trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Active tab + per-tab result/loading state keyed by tool id
  const tabs = trial ? (PRODUCT_TABS[trial.product] || PRODUCT_TABS["lead-gen"]) : [];
  const [tab, setTab] = useState(null);
  const [toolState, setToolState] = useState({}); // { [toolId]: { result, loading } }
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else {
          setTrial(d);
          setCredits(d.ai_credits);
          const productTabs = PRODUCT_TABS[d.product] || [];
          if (productTabs.length) setTab(productTabs[0].id);
          else if (d.product === 'smilecrm') setTab('smilecrm');
        }
        setLoading(false);
      })
      .catch(() => { setError("Could not load trial."); setLoading(false); });
  }, [token]);

  const runTool = useCallback(async (toolId, context) => {
    setToolState(s => ({ ...s, [toolId]: { ...(s[toolId] || {}), loading: true } }));
    try {
      const res = await fetch(`${API}/${token}/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolId, context }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.credits_left !== undefined) setCredits(data.credits_left);
      setToolState(s => ({ ...s, [toolId]: { result: data.result, loading: false } }));
    } catch (e) {
      setToolState(s => ({ ...s, [toolId]: { result: { error: e.message }, loading: false } }));
    }
  }, [token]);

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
          {error === "Trial expired" ? "Your 48-hour trial ended. Upgrade to continue." : "This link is invalid or has already been used."}
        </p>
        <a href="/store" style={{ background: "#059669", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}>
          Back to Store →
        </a>
      </div>
    </div>
  );

  const hoursLeft = trial?.hours_left || 0;
  const productLabel = PRODUCT_LABELS[trial?.product] || "AI Business Suite";
  const isSmileCRM = trial?.product === "smilecrm";
  const activeTab = tabs.find(t => t.id === tab);
  const state = toolState[tab] || {};

  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@media(max-width:640px){.hide-sm{display:none!important}}`}</style>

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
            <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Welcome, {trial?.name}</p>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{productLabel} — 2-Day Trial</h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ background: "#EFF6FF", color: "#2563EB", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{productLabel}</span>
            {!isSmileCRM && <span style={{ background: credits > 0 ? "#F0FDF4" : "#FEF2F2", color: credits > 0 ? "#059669" : "#DC2626", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{credits} AI credits</span>}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      {!isSmileCRM && tabs.length > 0 && (
        <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 24px", overflowX: "auto" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 0 }}>
            {tabs.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setTab(id)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "14px 18px",
                fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                color: tab === id ? "#059669" : "#6B7280",
                borderBottom: tab === id ? "2px solid #059669" : "2px solid transparent",
              }}>
                <Icon />{label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        {isSmileCRM && <SmileCRMTab token={token} trial={trial} />}

        {!isSmileCRM && activeTab && (
          <div>
            {/* Input form */}
            <ToolForm
              fields={activeTab.fields || []}
              loading={state.loading || false}
              onRun={(ctx) => runTool(tab, ctx)}
              creditCost={activeTab.creditCost !== undefined ? activeTab.creditCost : 1}
              label={state.result ? "Regenerate" : "Generate"}
            />

            {/* Output */}
            {state.loading && (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <Ic.Spin />
                <p style={{ color: "#6B7280", marginTop: 16, fontSize: 15 }}>Generating your {activeTab.label}…<br /><span style={{ fontSize: 13, color: "#94A3B8" }}>Tailored to your business — ~15 seconds.</span></p>
              </div>
            )}
            {!state.loading && state.result && (() => {
              const Renderer = RENDERERS[tab];
              return Renderer ? <Renderer data={state.result} /> : <pre style={{ fontSize: 11 }}>{JSON.stringify(state.result, null, 2)}</pre>;
            })()}
            {!state.loading && !state.result && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#94A3B8", fontSize: 14 }}>
                Fill in the fields above and click Generate to see your personalised output.
              </div>
            )}
          </div>
        )}

        {/* Upgrade CTA */}
        {!isSmileCRM && (
          <div style={{ marginTop: 32, background: "#0F172A", borderRadius: 16, padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: "#94A3B8" }}>Love what you see?</p>
              <p style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 800, color: "#fff" }}>Upgrade {productLabel} — runs 24/7 on autopilot</p>
            </div>
            <a href="/store" style={{ background: "#059669", color: "#fff", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
              See Plans →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
