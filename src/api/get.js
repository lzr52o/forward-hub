export default async function get(request, env, key) {
  try {
    if (!env.MODULES_KV) throw new Error("未找到 KV 存储绑定");
    const value = await env.MODULES_KV.get(key, "arrayBuffer");
    
    if (!value) return new Response(JSON.stringify({error: "文件不存在"}), {status: 404, headers: {"Content-Type": "application/json"}});

    return new Response(value, {
      headers: {
        "Content-Disposition": `attachment; filename="${key}"`,
        "Content-Type": "application/octet-stream"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500, headers: {"Content-Type": "application/json"}});
  }
}
