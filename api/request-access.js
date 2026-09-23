import { checkBotId } from "botid/server";
import { handleLeadRequest } from "./_lib/lead-service.js";

export default async function handler(request, response) {
  if (request.method === "POST") {
    const verification = await checkBotId({
      advancedOptions: {
        checkLevel: "basic",
        headers: request.headers,
      },
    });

    if (verification.isBot) {
      return response.status(403).json({ error: "We could not verify this request. Please try again." });
    }
  }

  return handleLeadRequest(request, response, "request-access");
}
