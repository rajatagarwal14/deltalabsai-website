import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function supa(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: init.method === "POST" ? "return=representation" : undefined,
      ...init.headers,
    },
  });
  return res;
}

/**
 * POST /api/leads/capture
 * Public lead capture endpoint for the marketing site (diagnostic form etc).
 * Ported from delta-labs-ecosystem/src/app/api/leads/capture — this repo's
 * own build never had it, which silently broke the diagnostic funnel (the
 * page never checked res.ok, so it showed "success" even on a 404).
 */
export async function POST(request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[leads/capture] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const body = await request.json();
    const {
      email,
      full_name,
      name,
      company_name,
      phone,
      industry,
      source = "website_form",
      source_detail,
      notes,
      metadata,
      tags,
    } = body || {};

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailNorm = String(email).trim().toLowerCase();
    if (emailNorm === "null" || emailNorm === "undefined" || !emailNorm.includes("@") || !emailNorm.includes(".")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Resolve org_id — default to the Delta Labs org
    const orgRes = await supa("organizations?select=id&slug=eq.delta-labs-ai&limit=1");
    const orgRows = await orgRes.json();
    const orgId = orgRows?.[0]?.id;
    if (!orgId) {
      console.error("[leads/capture] Could not resolve delta-labs-ai org_id");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    // Dedup by email+org
    const dedupRes = await supa(
      `leads?select=id,full_name,email,status,created_at&org_id=eq.${orgId}&email=ilike.${encodeURIComponent(emailNorm)}&limit=1`
    );
    const existing = await dedupRes.json();
    if (Array.isArray(existing) && existing.length) {
      return NextResponse.json({ lead: existing[0], duplicate: true }, { status: 200 });
    }

    const sourceDetailObj = {};
    if (source_detail) sourceDetailObj.detail = source_detail;
    if (notes) sourceDetailObj.notes = notes;
    if (metadata) sourceDetailObj.metadata = metadata;

    const resolvedName = full_name || name || emailNorm.split("@")[0];

    const insertRes = await supa("leads", {
      method: "POST",
      body: JSON.stringify({
        org_id: orgId,
        full_name: resolvedName,
        email: emailNorm,
        phone: phone || null,
        company_name: company_name || null,
        industry: industry || null,
        source,
        source_detail: Object.keys(sourceDetailObj).length ? sourceDetailObj : {},
        status: "new",
        tags: tags || [],
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("[leads/capture] Insert failed:", errText);
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    const [lead] = await insertRes.json();
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("[leads/capture] Unhandled error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
