"use client";

import { useState } from "react";
import { ClinicHeader, ClinicFooter } from "../clinic/BrandChrome";

export default function ReputationScoreLandingPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/score/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong");
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      setStatus("done");
      setMessage(body.message || "We got your request — we'll follow up shortly.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <ClinicHeader />
      <main
        style={{
          minHeight: "calc(100vh - 130px)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#F8FAFC",
          padding: "56px 16px 72px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 480 }}>
          <span
            style={{
              display: "inline-block",
              borderRadius: 999,
              background: "#E9EFF8",
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 600,
              color: "#2563EB",
            }}
          >
            Free Reputation Score
          </span>
          <h1
            style={{
              marginTop: 14,
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              lineHeight: 1.2,
            }}
          >
            Is your restaurant losing customers to bad reviews?
          </h1>
          <p style={{ marginTop: 10, fontSize: 15, color: "#475569", lineHeight: 1.6 }}>
            Get your free Reputation Score. We pull your Google rating, review
            count, and where you rank against other local businesses nearby,
            then show you what it&apos;s estimated to be costing you.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 28,
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              background: "#fff",
              padding: 24,
              boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#334155" }}>
                Business name or Google Business Profile link
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Hakkasan Bandra, or a maps.google.com link"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  marginTop: 4,
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #E2E8F0",
                  padding: "10px 12px",
                  fontSize: 14,
                  color: "#1E293B",
                }}
              />
            </div>

            {status === "error" && <p style={{ fontSize: 14, color: "#DC2626" }}>{message}</p>}
            {status === "done" && <p style={{ fontSize: 14, color: "#16A34A" }}>{message}</p>}

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
              {status === "loading" ? "Checking…" : "Get my free Reputation Score"}
            </button>
            <p style={{ fontSize: 12, color: "#94A3B8", textAlign: "center" }}>
              Free, no card needed. We only use public Google review data.
            </p>
          </form>
        </div>
      </main>
      <ClinicFooter />
    </>
  );
}
