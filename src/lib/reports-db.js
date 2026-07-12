import { Client } from "pg";

// Minimal Neon Postgres helper for the clinic leak-report pages.
// Opens a fresh Client per call and closes it — simplest safe pattern for
// serverless functions (no shared pool across invocations to leak).
async function withClient(fn) {
  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

export async function getReportBySlug(city, slug) {
  return withClient(async (client) => {
    const { rows } = await client.query(
      `select * from clinic_reports where slug = $1 and city ilike $2 limit 1`,
      [slug, city]
    );
    return rows[0] || null;
  });
}

export async function getReportsByCity(city) {
  return withClient(async (client) => {
    const { rows } = await client.query(
      `select * from clinic_reports where city ilike $1 order by rank_in_city asc`,
      [city]
    );
    return rows;
  });
}

export async function reportExists(slug) {
  return withClient(async (client) => {
    const { rows } = await client.query(`select slug from clinic_reports where slug = $1 limit 1`, [slug]);
    return !!rows[0];
  });
}

export async function recordReportOpen(slug) {
  return withClient(async (client) => {
    const { rowCount } = await client.query(
      `update clinic_reports
       set open_count = open_count + 1,
           last_opened_at = now(),
           first_opened_at = coalesce(first_opened_at, now())
       where slug = $1`,
      [slug]
    );
    return rowCount > 0;
  });
}

export async function insertClaimLead({ slug, name, phone, email }) {
  return withClient(async (client) => {
    // Dedup by email or phone before inserting.
    if (email) {
      const { rows } = await client.query(`select id from leads where email = $1 limit 1`, [email]);
      if (rows[0]) return { id: rows[0].id, deduped: true };
    }
    if (phone) {
      const { rows } = await client.query(`select id from leads where phone = $1 limit 1`, [phone]);
      if (rows[0]) return { id: rows[0].id, deduped: true };
    }

    const { rows: orgRows } = await client.query(
      `select id from organizations where slug = 'delta-labs-ai' limit 1`
    );
    const orgId = orgRows[0]?.id;
    if (!orgId) throw new Error("Organization not found");

    const { rows } = await client.query(
      `insert into leads (org_id, full_name, email, phone, industry, source, source_detail, status, score, tags)
       values ($1, $2, $3, $4, 'Dental', 'leak_report', $5::jsonb, 'new', 70, ARRAY['leak_report_claim'])
       returning id`,
      [orgId, name, email || null, phone || null, JSON.stringify({ report_slug: slug })]
    );
    return { id: rows[0].id, deduped: false };
  });
}
