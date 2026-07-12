import { NextResponse } from "next/server";
import { reputationReportExists, recordReputationReportOpen } from "../../../../lib/reports-db";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = [
  "https://deltalabsai.com",
  "https://www.deltalabsai.com",
  ...(process.env.NODE_ENV !== "production" ? ["http://localhost:3460", "http://localhost:3000"] : []),
];

/**
 * POST /api/score/track
 * Fire-and-forget beacon from the Reputation Score report page — mirrors
 * /api/clinic/track exactly, just against reputation_reports.
 */
export async function POST(request) {
  try {
    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    const originOk = ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
    if (!originOk) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const exists = await reputationReportExists(slug);
    if (!exists) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    await recordReputationReportOpen(slug);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("POST /api/score/track error:", error);
    return new NextResponse(null, { status: 500 });
  }
}
