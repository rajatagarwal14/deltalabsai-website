import { NextResponse } from "next/server";
import { reportExists, insertClaimLead } from "../../../../lib/reports-db";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = [
  "https://deltalabsai.com",
  "https://www.deltalabsai.com",
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:3460", "http://localhost:3000"] : []),
];

// Simple in-memory rate limiter — v1, resets on deploy/restart. Max 3 claims/hour/IP.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\s()-]{6,20}$/;

/**
 * POST /api/clinic/claim
 * Visitor claims a clinic leak report — the ONE write path for the report generator
 * flow. Upserts into `leads` with source='leak_report' so it flows through the
 * existing CRM pipeline. Only runs when a real visitor submits the claim form.
 */
export async function POST(request) {
  try {
    // --- Origin/referer check ---
    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    const originOk = ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
    if (!originOk) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // --- Rate limit by IP ---
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests, try again later." }, { status: 429 });
    }

    const body = await request.json();
    const { slug, name, phone, email, website } = body;

    // Honeypot — bots fill hidden fields, real users leave them blank
    if (website) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!slug || typeof slug !== "string" || !name || typeof name !== "string" || (!email && !phone)) {
      return NextResponse.json(
        { error: "slug, name, and email or phone are required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().slice(0, 120);
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedSlug = slug.trim();

    if (!trimmedName) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (trimmedPhone && !PHONE_RE.test(trimmedPhone)) {
      return NextResponse.json({ error: "Invalid phone format" }, { status: 400 });
    }
    if (!trimmedEmail && !trimmedPhone) {
      return NextResponse.json({ error: "email or phone are required" }, { status: 400 });
    }

    // Reject claims for reports that don't exist — kills random spam
    const exists = await reportExists(trimmedSlug);
    if (!exists) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const lead = await insertClaimLead({
      slug: trimmedSlug,
      name: trimmedName,
      phone: trimmedPhone || null,
      email: trimmedEmail || null,
    });

    if (lead.deduped) {
      return NextResponse.json({
        message: "We already have your details — our team will be in touch.",
        lead_id: lead.id,
      });
    }

    return NextResponse.json(
      { message: "Claimed — our team will reach out within 24 hours.", lead_id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/clinic/claim error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to claim report" },
      { status: 500 }
    );
  }
}
