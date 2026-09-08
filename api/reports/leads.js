const ALLOWED_KINDS = new Set(["request-access", "newsletter"]);

function setPrivateHeaders(response) {
  response.setHeader("Cache-Control", "private, no-store, max-age=0");
  response.setHeader("X-Content-Type-Options", "nosniff");
}

function hasValidCredentials(request) {
  const expectedUsername = process.env.LEAD_REPORT_USERNAME || "filmik-report";
  const expectedPassword = process.env.LEAD_REPORT_PASSWORD;
  const authorization = request.headers.authorization || "";

  if (!expectedPassword || !authorization.startsWith("Basic ")) return false;

  const [username, password] = Buffer.from(authorization.slice(6), "base64").toString("utf8").split(":");
  return username === expectedUsername && password === expectedPassword;
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export default async function handler(request, response) {
  setPrivateHeaders(response);

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!hasValidCredentials(request)) {
    response.setHeader("WWW-Authenticate", 'Basic realm="Filmik lead reports", charset="UTF-8"');
    return response.status(401).json({ error: "Authentication required." });
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return response.status(503).json({ error: "Lead reporting is not configured." });
  }

  const format = request.query.format === "json" ? "json" : "csv";
  const kind = String(request.query.kind || "");
  const since = String(request.query.since || "");
  if (kind && !ALLOWED_KINDS.has(kind)) {
    return response.status(400).json({ error: "Invalid lead type." });
  }
  if (since && Number.isNaN(Date.parse(since))) {
    return response.status(400).json({ error: "Use an ISO 8601 value for since." });
  }

  const params = new URLSearchParams({
    select: "id,kind,email,name,department,marketing_opt_in,source,created_at",
    order: "created_at.desc",
  });
  if (kind) params.set("kind", `eq.${kind}`);
  if (since) params.set("created_at", `gte.${since}`);

  const supabaseResponse = await fetch(`${url}/rest/v1/website_leads?${params}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });

  if (!supabaseResponse.ok) {
    console.error("Lead report retrieval failed", { status: supabaseResponse.status });
    return response.status(502).json({ error: "Could not retrieve the lead report." });
  }

  const leads = await supabaseResponse.json();
  if (format === "json") return response.status(200).json({ generated_at: new Date().toISOString(), leads });

  const columns = ["id", "kind", "email", "name", "department", "marketing_opt_in", "page_url", "referrer", "created_at"];
  const rows = leads.map((lead) => [
    lead.id,
    lead.kind,
    lead.email,
    lead.name,
    lead.department,
    lead.marketing_opt_in ? "yes" : "no",
    lead.source?.page_url || "",
    lead.source?.referrer || "",
    lead.created_at,
  ].map(csvCell).join(","));

  response.setHeader("Content-Type", "text/csv; charset=utf-8");
  response.setHeader("Content-Disposition", 'attachment; filename="filmik-website-leads.csv"');
  return response.status(200).send(`${columns.join(",")}\n${rows.join("\n")}\n`);
}
