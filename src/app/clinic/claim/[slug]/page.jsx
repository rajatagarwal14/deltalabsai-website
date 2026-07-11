"use client";

import { useState } from "react";
import { ClinicHeader, ClinicFooter } from "../../BrandChrome";

export default function ClaimPage({ params }) {
  const { slug } = params;
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [website, setWebsite] = useState(""); // honeypot — bots fill this, humans never see it
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/clinic/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...form, website }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const inputStyle = {
    marginTop: 4,
    width: "100%",
    borderRadius: 8,
    border: "1px solid #E2E8F0",
    padding: "10px 12px",
    fontSize: 14,
    color: "#1E293B",
  };
  const labelStyle = { display: "block", fontSize: 14, fontWeight: 500, color: "#334155" };

  if (status === "done") {
    return (
      <>
        <ClinicHeader />
        <main style={{ minHeight: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", padding: "32px 16px" }}>
          <div style={{ width: "100%", maxWidth: 384, borderRadius: 16, border: "1px solid #E2E8F0", background: "#fff", padding: 32, textAlign: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1E293B" }}>Thanks, we&apos;ll be in touch</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: "#475569" }}>
              We&apos;ll reach out within a day to set up your first month free.
            </p>
          </div>
        </main>
        <ClinicFooter />
      </>
    );
  }

  return (
    <>
    <ClinicHeader />
    <main style={{ minHeight: "calc(100vh - 130px)", display: "flex", alignItems: "flex-start", justifyContent: "center", background: "#F8FAFC", padding: "48px 16px 72px" }}>
      <div style={{ width: "100%", maxWidth: 384, borderRadius: 16, border: "1px solid #E2E8F0", background: "#fff", padding: 28, boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.01em" }}>Claim this report</h1>
        <p style={{ marginTop: 6, fontSize: 14, color: "#64748B" }}>First month free, cancel anytime. No card needed to start.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: -9999, height: 0, width: 0, opacity: 0 }}
            aria-hidden="true"
          />
          <div>
            <label style={labelStyle}>Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Dr. Sarah Khan"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              required
              type="tel"
              placeholder="+971 50 000 0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              required
              type="email"
              placeholder="you@yourclinic.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          {status === "error" && <p style={{ fontSize: 14, color: "#DC2626" }}>{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              minHeight: 44,
              width: "100%",
              borderRadius: 8,
              background: "#EA580C",
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              opacity: status === "loading" ? 0.6 : 1,
              cursor: status === "loading" ? "default" : "pointer",
            }}
          >
            {status === "loading" ? "Submitting…" : "Claim my free month"}
          </button>
        </form>
      </div>
    </main>
    <ClinicFooter />
    </>
  );
}
