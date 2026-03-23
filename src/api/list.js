export default async function list(request, env) {
  try {
    const { results } = await env.DB.prepare("SELECT name, size, created_at FROM modules ORDER BY created_at DESC").all();
    return new Response(JSON.stringify({success: true, count: results.length, data: results}), {headers: {"Content-Type": "application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500, headers: {"Content-Type": "application/json"}});
  }
}
