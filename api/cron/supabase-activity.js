function isAuthorized(request) {
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.authorization;

  return Boolean(cronSecret && authorization === `Bearer ${cronSecret}`);
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!isAuthorized(request)) {
    return response.status(401).json({ error: "Unauthorized." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase activity check is not configured.");
    return response.status(503).json({ error: "Supabase activity check is not configured." });
  }

  try {
    // A lightweight authenticated query keeps the database active and confirms lead storage is reachable.
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/website_leads?select=id&limit=1`, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    });

    if (!supabaseResponse.ok) {
      console.error("Supabase activity check failed", { status: supabaseResponse.status });
      return response.status(502).json({ error: "Supabase activity check failed." });
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({ ok: true, checkedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Supabase activity check failed", { message: error instanceof Error ? error.message : "Unknown error" });
    return response.status(502).json({ error: "Supabase activity check failed." });
  }
}
