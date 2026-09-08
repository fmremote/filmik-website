import { handleLeadRequest } from "./_lib/lead-service.js";

export default function handler(request, response) {
  return handleLeadRequest(request, response, "newsletter");
}
