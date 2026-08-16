// Receives MindShift landing page applications.
// - Re-validates every field server-side (never trusts the client)
// - Recomputes qualification server-side
// - Basic anti-spam: honeypot, minimum time-on-form, per-IP rate limit
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const FOCUS_AREAS = [
  "Career",
  "Purpose / Direction",
  "Confidence",
  "Financial situation",
  "Relationships",
  "Personal growth",
  "Other",
] as const;

const DURATIONS = [
  "Less than 3 months",
  "3–12 months",
  "1–3 years",
  "More than 3 years",
] as const;

const FINANCIAL_OPTIONS = [
  "I'm ready to invest $4,000 if I believe MindShift is right for me.",
  "I could invest using a payment plan.",
  "I would need to discuss the investment with my partner.",
  "I'm interested, but I'm not currently able to make this level of investment.",
] as const;

const optionalText = z.string().trim().max(500).optional().nullable();

const ApplicationSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  focusArea: z.enum(FOCUS_AREAS),
  situation: z.string().trim().min(10).max(4000),
  durationStuck: z.enum(DURATIONS),
  triedBefore: z.string().trim().min(5).max(4000),
  whyNow: z.string().trim().min(5).max(4000),
  commitmentScore: z.number().int().min(1).max(10),
  willParticipate: z.enum(["Yes", "No"]),
  financialFit: z.enum(FINANCIAL_OPTIONS),
  // anti-spam
  website: z.string().max(0).optional().default(""), // honeypot: must stay empty
  elapsedMs: z.number().int().min(0).max(1000 * 60 * 60 * 6),
  // attribution
  utmSource: optionalText,
  utmMedium: optionalText,
  utmCampaign: optionalText,
  utmContent: optionalText,
  utmTerm: optionalText,
  fbclid: optionalText,
  landingUrl: z.string().trim().max(2000).optional().nullable(),
  referrer: z.string().trim().max(2000).optional().nullable(),
});

const MIN_TIME_ON_FORM_MS = 8000; // realistic humans take longer than 8s
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX = 3;

async function hashIp(ip: string) {
  const data = new TextEncoder().encode(`mindshift:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const raw = await req.json().catch(() => null);
    const parsed = ApplicationSchema.safeParse(raw);

    if (!parsed.success) {
      return json({ error: "Invalid application", fields: parsed.error.flatten().fieldErrors }, 400);
    }

    const d = parsed.data;

    // Honeypot / too-fast submissions: accept quietly, store nothing.
    if ((d.website ?? "") !== "" || d.elapsedMs < MIN_TIME_ON_FORM_MS) {
      return json({ ok: true, qualified: false, discarded: true });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const ipHash = await hashIp(ip);

    // Per-IP rate limit
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("mindshift_applications")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return json({ error: "Too many submissions. Please try again later." }, 429);
    }

    // Qualification is decided here, on the server.
    const qualified =
      d.willParticipate === "Yes" &&
      d.commitmentScore >= 7 &&
      d.financialFit !== FINANCIAL_OPTIONS[3];

    const { error } = await supabase.from("mindshift_applications").insert({
      first_name: d.firstName,
      last_name: d.lastName,
      email: d.email.toLowerCase(),
      phone: d.phone,
      focus_area: d.focusArea,
      situation: d.situation,
      duration_stuck: d.durationStuck,
      tried_before: d.triedBefore,
      why_now: d.whyNow,
      commitment_score: d.commitmentScore,
      will_participate: d.willParticipate,
      financial_fit: d.financialFit,
      qualified,
      utm_source: d.utmSource ?? null,
      utm_medium: d.utmMedium ?? null,
      utm_campaign: d.utmCampaign ?? null,
      utm_content: d.utmContent ?? null,
      utm_term: d.utmTerm ?? null,
      fbclid: d.fbclid ?? null,
      landing_url: d.landingUrl ?? null,
      referrer: d.referrer ?? null,
      ip_hash: ipHash,
    });

    if (error) {
      console.error("Failed to store application:", error.message);
      return json({ error: "Could not save your application. Please try again." }, 500);
    }

    return json({ ok: true, qualified });
  } catch (err) {
    console.error("Unexpected error:", err instanceof Error ? err.message : err);
    return json({ error: "Unexpected error" }, 500);
  }
});
