import { jsonResponse, errorResponse } from "../utils/response.js";

export default async function list(request, env) {
  try {
    const { results } = await env.DB.prepare(
      "SELECT name, size, created_at FROM modules ORDER BY created_at DESC"
    ).all();

    return jsonResponse({
      count: results.length,
      modules: results
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
