import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const valueFor = (name) => args[args.indexOf(name) + 1];
const format = valueFor("--format") || "table";
const output = valueFor("--out");
const kind = valueFor("--kind");
const since = valueFor("--since");
const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before running this report.");
}

const filters = ["select=id,kind,email,name,department,marketing_opt_in,source,created_at", "order=created_at.desc"];
if (kind) filters.push(`kind=eq.${encodeURIComponent(kind)}`);
if (since) filters.push(`created_at=gte.${encodeURIComponent(since)}`);

const response = await fetch(`${url}/rest/v1/website_leads?${filters.join("&")}`, {
  headers: {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  },
});

if (!response.ok) {
  throw new Error(`Could not retrieve website leads (${response.status}): ${(await response.text()).slice(0, 300)}`);
}

const leads = await response.json();
const columns = ["id", "kind", "email", "name", "department", "marketing_opt_in", "page_url", "referrer", "created_at"];
const rows = leads.map((lead) => ({
  id: lead.id,
  kind: lead.kind,
  email: lead.email,
  name: lead.name || "",
  department: lead.department || "",
  marketing_opt_in: lead.marketing_opt_in ? "yes" : "no",
  page_url: lead.source?.page_url || "",
  referrer: lead.source?.referrer || "",
  created_at: lead.created_at,
}));
const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => `"${String(row[column] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
const rendered = format === "json" ? `${JSON.stringify(rows, null, 2)}\n` : format === "csv" ? `${csv}\n` : undefined;

if (format !== "table" && format !== "csv" && format !== "json") {
  throw new Error("Use --format table, csv, or json.");
}

if (output) {
  const destination = resolve(output);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, format === "json" ? rendered : `${csv}\n`);
  console.log(`Wrote ${rows.length} lead${rows.length === 1 ? "" : "s"} to ${destination}`);
} else if (format === "table") {
  console.table(rows);
  console.log(`${rows.length} lead${rows.length === 1 ? "" : "s"}.`);
} else {
  process.stdout.write(rendered);
}
