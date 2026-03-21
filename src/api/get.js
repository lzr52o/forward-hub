import { jsonResponse, errorResponse } from "../utils/response.js";

export default async function get(request, env, key) {
  try {
    const file = await env.MODULES_KV.get(key, { type: "arrayBuffer" });

    if (!file) {
      return errorResponse("Module not found", 404);
    }

    return new Response(file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${key}"`
      }
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
