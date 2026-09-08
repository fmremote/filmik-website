import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requests = new Map();

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getIpAddress(request) {
  return String(request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function allowRequest(request) {
  const ip = getIpAddress(request);
  const now = Date.now();
  const attempts = (requests.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (attempts.length >= MAX_REQUESTS_PER_WINDOW) {
    requests.set(ip, attempts);
    return false;
  }

  attempts.push(now);
  requests.set(ip, attempts);
  return true;
}

function readBody(request) {
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return request.body || {};
}

function json(response, status, payload) {
  response.status(status).json(payload);
}

async function upsertMailchimpMember({ email, tags, statusIfNew }) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  // Mailchimp encodes the required data center in the API key suffix (for example, -us21).
  const serverPrefix = apiKey?.split("-").at(-1);
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    throw new Error("Mailchimp marketing is not configured.");
  }

  const subscriberHash = createHash("md5").update(email).digest("hex");
  const memberUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;
  const authorization = `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`;

  const memberResponse = await fetch(memberUrl, {
    method: "PUT",
    headers: { Authorization: authorization, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email, status_if_new: statusIfNew }),
  });

  if (!memberResponse.ok) {
    const detail = (await memberResponse.text()).slice(0, 500);
    throw new Error(`Mailchimp could not save this contact (${memberResponse.status}): ${detail}`);
  }

  const tagsResponse = await fetch(`${memberUrl}/tags`, {
    method: "POST",
    headers: { Authorization: authorization, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: tags.map((name) => ({ name, status: "active" })) }),
  });

  if (!tagsResponse.ok) {
    const detail = (await tagsResponse.text()).slice(0, 500);
    throw new Error(`Mailchimp could not apply contact tags (${tagsResponse.status}): ${detail}`);
  }
}

async function sendTransactionalEmail({ to, subject, text, html, tag }) {
  const apiKey = process.env.MAILCHIMP_TRANSACTIONAL_API_KEY;

  if (!apiKey) {
    throw new Error("Mailchimp Transactional email is not configured.");
  }

  const response = await fetch("https://mandrillapp.com/api/1.0/messages/send.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: apiKey,
      message: {
        // Keep all website acknowledgements and notifications aligned with Filmik's public inbox.
        from_email: "info@filmik.io",
        from_name: "Filmik",
        subject,
        text,
        html,
        to: [{ email: to, type: "to" }],
        tags: [tag],
      },
    }),
  });

  const result = await response.json().catch(() => []);
  const deliveryStatus = Array.isArray(result) ? result[0]?.status : undefined;
  if (!response.ok || !["sent", "queued", "scheduled"].includes(deliveryStatus)) {
    throw new Error(`Transactional email could not be sent${deliveryStatus ? ` (${deliveryStatus})` : ""}.`);
  }
}

function emailShell(content) {
  return `<div style="margin:0;padding:32px;background:#f5f6f8;color:#101828;font-family:Arial,sans-serif"><div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e7ec;border-radius:18px;overflow:hidden"><div style="padding:24px 28px;background:#09111b;color:#ffffff"><div style="font-size:20px;font-weight:700;letter-spacing:.04em">FILMIK</div></div><div style="padding:30px 28px;line-height:1.6">${content}</div><div style="padding:18px 28px;border-top:1px solid #e4e7ec;color:#667085;font-size:13px">Filmik<br><a href="https://filmik.io" style="color:#3278ee">filmik.io</a></div></div></div>`;
}

async function saveToSupabase(record) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return;

  const response = await fetch(`${url}/rest/v1/website_leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    console.error("Supabase lead storage failed", { status: response.status });
  }
}

async function notifyTwilioWebhook(payload) {
  const webhookUrl = process.env.TWILIO_ACCESS_REQUEST_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.TWILIO_ACCESS_REQUEST_WEBHOOK_SECRET
        ? { "x-filmik-webhook-secret": process.env.TWILIO_ACCESS_REQUEST_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("Twilio in-app notification webhook failed", { status: response.status });
  }
}

export async function handleLeadRequest(request, response, kind) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Method not allowed." });
  }

  if (!allowRequest(request)) {
    return json(response, 429, { error: "Please wait a few minutes before trying again." });
  }

  const body = readBody(request);
  if (body.company) return json(response, 200, { ok: true });

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return json(response, 400, { error: "Enter a valid email address." });
  }

  const source = {
    page_url: String(body.pageUrl || "").slice(0, 2048),
    referrer: String(body.referrer || "").slice(0, 2048),
  };

  try {
    if (kind === "request-access") {
      const name = String(body.name || "").trim().slice(0, 120);
      const department = String(body.department || "").trim().slice(0, 120);
      const marketingOptIn = Boolean(body.marketingOptIn);

      if (!name || !department) {
        return json(response, 400, { error: "Complete your name and department." });
      }

      await saveToSupabase({ kind, email, name, department, marketing_opt_in: marketingOptIn, source });
      await upsertMailchimpMember({
        email,
        tags: ["website", "request-access", `department:${department.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`],
        statusIfNew: marketingOptIn ? "pending" : "transactional",
      });
      await sendTransactionalEmail({
        to: process.env.LEAD_NOTIFICATION_EMAIL || "info@filmik.io",
        subject: `Request Access: ${name}`,
        tag: "request-access",
        text: `New Filmik access request\n\nName: ${name}\nEmail: ${email}\nDepartment: ${department}\nMarketing opt-in: ${marketingOptIn ? "Yes" : "No"}\nPage: ${source.page_url || "Not provided"}`,
        html: `<h2>New Filmik access request</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Department:</strong> ${escapeHtml(department)}</p><p><strong>Marketing opt-in:</strong> ${marketingOptIn ? "Yes" : "No"}</p><p><strong>Page:</strong> ${escapeHtml(source.page_url || "Not provided")}</p>`,
      });
      await sendTransactionalEmail({
        to: email,
        subject: "We received your Filmik access request",
        tag: "request-access-confirmation",
        text: `Hi ${name},\n\nThanks for requesting access to Filmik. We received your request for the ${department} department and our team will review it shortly.\n\nWe will follow up from info@filmik.io with the right next steps for your team.${marketingOptIn ? "\n\nYou also asked to receive Filmik updates. Look for a separate email from Mailchimp to confirm your subscription." : ""}\n\n- Filmik`,
        html: emailShell(`<h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">We received your access request.</h1><p>Hi ${escapeHtml(name)},</p><p>Thanks for requesting access to Filmik. We received your request for the <strong>${escapeHtml(department)}</strong> department and our team will review it shortly.</p><p>We will follow up from <a href="mailto:info@filmik.io" style="color:#3278ee">info@filmik.io</a> with the right next steps for your team.</p>${marketingOptIn ? "<p>You also asked to receive Filmik updates. Look for a separate email from Mailchimp to confirm your subscription.</p>" : ""}<p style="margin:24px 0 0">- Filmik</p>`),
      });
      await notifyTwilioWebhook({ event: "website.request_access", name, email, department, marketingOptIn, source });
    } else {
      await saveToSupabase({ kind, email, marketing_opt_in: true, source });
      await upsertMailchimpMember({ email, tags: ["website", "newsletter"], statusIfNew: "pending" });
      await sendTransactionalEmail({
        to: process.env.LEAD_NOTIFICATION_EMAIL || "info@filmik.io",
        subject: "Newsletter signup",
        tag: "newsletter",
        text: `New Filmik newsletter signup\n\nEmail: ${email}\nPage: ${source.page_url || "Not provided"}`,
        html: `<h2>New Filmik newsletter signup</h2><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Page:</strong> ${escapeHtml(source.page_url || "Not provided")}</p>`,
      });
      await sendTransactionalEmail({
        to: email,
        subject: "Confirm your Filmik newsletter subscription",
        tag: "newsletter-confirmation",
        text: "Thanks for subscribing to Filmik updates.\n\nLook for a separate email from Mailchimp and click the confirmation link to finish subscribing. Once confirmed, you will receive Filmik product updates and industry news.\n\nIf you did not request this, no action is needed.\n\n- Filmik",
        html: emailShell('<h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">Thanks for subscribing.</h1><p>Look for a separate email from Mailchimp and click the confirmation link to finish subscribing.</p><p>Once confirmed, you will receive Filmik product updates and industry news.</p><p>If you did not request this, no action is needed.</p><p style="margin:24px 0 0">- Filmik</p>'),
      });
    }
  } catch (error) {
    console.error("Website lead delivery failed", { kind, message: error instanceof Error ? error.message : "Unknown error" });
    return json(response, 503, { error: "We could not send your request. Please try again shortly." });
  }

  return json(response, 200, { ok: true });
}
