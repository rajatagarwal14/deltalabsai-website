"use client";

import { useEffect, useRef } from "react";

// Fires a fire-and-forget "opened" beacon once per real browser visit. Bots
// and crawlers don't execute client JS, so they never trigger this — that's
// the bot filter for view tracking on clinic leak reports.
export default function ReportViewTracker({ slug }) {
  const fired = useRef(false);

  useEffect(() => {
    if (!slug || fired.current) return;
    fired.current = true;

    // sessionStorage guard so a single visit only counts once even across
    // React strict-mode double-invokes or client-side re-renders.
    const key = `report-opened:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage unavailable (private mode etc) — fall through and
      // still send the beacon rather than blocking tracking entirely.
    }

    fetch("/api/clinic/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
