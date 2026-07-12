"use client";

import { useEffect, useRef } from "react";

// Fires a fire-and-forget "opened" beacon once per real browser visit, same
// bot-filter pattern as ../clinic/ReportViewTracker.jsx — bots don't execute
// client JS so they never trigger this.
export default function ReputationViewTracker({ slug }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!slug || fired.current) return;
    fired.current = true;

    const key = `score-opened:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage unavailable (private mode etc) — fall through and
      // still send the beacon rather than blocking tracking entirely.
    }

    fetch("/api/score/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
