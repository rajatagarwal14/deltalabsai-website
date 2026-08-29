// Supabase REST helper for the clinic leak-report and reputation-score pages.
// Was previously Neon (raw `pg`) — Neon's compute-time quota was exceeded and
// it stopped accepting connections, silently breaking all 7 report/score routes
// in production. The clinic_reports/reputation_reports tables already existed
// in Supabase (migrations 063-075) but were never the write target — this was
// a temporary Jul 2026 failover bridge that never got migrated back. Ported
// 1:1 to Supabase's REST API; no query here needs raw SQL (no joins/CTEs/tx).

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function supa(path, init = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...(init.method && init.method !== "GET" ? { Prefer: "return=representation" } : {}),
      ...init.headers,
    },
  });
  return res;
}

export async function getReportBySlug(city, slug) {
  const res = await supa(
    `clinic_reports?select=*&slug=eq.${encodeURIComponent(slug)}&city=ilike.${encodeURIComponent(city)}&limit=1`
  );
  const rows = await res.json();
  return rows[0] || null;
}

export async function getReportsByCity(city) {
  const res = await supa(
    `clinic_reports?select=*&city=ilike.${encodeURIComponent(city)}&order=rank_in_city.asc`
  );
  return await res.json();
}

export async function reportExists(slug) {
  const res = await supa(`clinic_reports?select=slug&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  const rows = await res.json();
  return rows.length > 0;
}

export async function recordReportOpen(slug) {
  // Read-modify-write to replicate `open_count = open_count + 1` (PostgREST
  // has no atomic increment via plain PATCH). Fine at this traffic volume.
  const getRes = await supa(
    `clinic_reports?select=open_count,first_opened_at&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  const rows = await getRes.json();
  if (!rows.length) return false;
  const current = rows[0];
  const now = new Date().toISOString();
  const patchRes = await supa(`clinic_reports?slug=eq.${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify({
      open_count: (current.open_count || 0) + 1,
      last_opened_at: now,
      first_opened_at: current.first_opened_at || now,
    }),
  });
  return patchRes.ok;
}

// --- Reputation Score reports (reputation_reports table) ---------------

export async function getReputationReportBySlug(city, slug) {
  const res = await supa(
    `reputation_reports?select=*&slug=eq.${encodeURIComponent(slug)}&city=ilike.${encodeURIComponent(city)}&limit=1`
  );
  const rows = await res.json();
  return rows[0] || null;
}

export async function getReputationReportsByCity(city) {
  const res = await supa(
    `reputation_reports?select=*&city=ilike.${encodeURIComponent(city)}&order=rank_in_city.asc`
  );
  return await res.json();
}

export async function reputationReportExists(slug) {
  const res = await supa(`reputation_reports?select=slug&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  const rows = await res.json();
  return rows.length > 0;
}

export async function recordReputationReportOpen(slug) {
  const getRes = await supa(
    `reputation_reports?select=open_count,first_opened_at&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  const rows = await getRes.json();
  if (!rows.length) return false;
  const current = rows[0];
  const now = new Date().toISOString();
  const patchRes = await supa(`reputation_reports?slug=eq.${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify({
      open_count: (current.open_count || 0) + 1,
      last_opened_at: now,
      first_opened_at: current.first_opened_at || now,
    }),
  });
  return patchRes.ok;
}

export async function insertClaimLead({ slug, name, phone, email }) {
  // Dedup by email or phone before inserting — same order/behavior as before.
  if (email) {
    const res = await supa(`leads?select=id&email=eq.${encodeURIComponent(email)}&limit=1`);
    const rows = await res.json();
    if (rows.length) return { id: rows[0].id, deduped: true };
  }
  if (phone) {
    const res = await supa(`leads?select=id&phone=eq.${encodeURIComponent(phone)}&limit=1`);
    const rows = await res.json();
    if (rows.length) return { id: rows[0].id, deduped: true };
  }

  const orgRes = await supa(`organizations?select=id&slug=eq.delta-labs-ai&limit=1`);
  const orgRows = await orgRes.json();
  const orgId = orgRows[0]?.id;
  if (!orgId) throw new Error("Organization not found");

  const insertRes = await supa(`leads`, {
    method: "POST",
    body: JSON.stringify({
      org_id: orgId,
      full_name: name,
      email: email || null,
      phone: phone || null,
      industry: "Dental",
      source: "leak_report",
      source_detail: { report_slug: slug },
      status: "new",
      score: 70,
      tags: ["leak_report_claim"],
    }),
  });
  if (!insertRes.ok) {
    const errText = await insertRes.text();
    throw new Error(`Failed to insert claim lead: ${errText}`);
  }
  const [lead] = await insertRes.json();
  return { id: lead.id, deduped: false };
}
