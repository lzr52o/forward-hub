export default async function del(request, env, key) {
  try {
    if (!env.MODULES_KV) throw new Error("未找到 KV 存储绑定");
    
    await env.MODULES_KV.delete(key);
    await env.DB.prepare("DELETE FROM modules WHERE name = ?").bind(key).run();

    return new Response(JSON.stringify({success: true, message: "删除成功"}), {headers: {"Content-Type": "application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500, headers: {"Content-Type": "application/json"}});
  }
}
