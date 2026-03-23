export default async function upload(request, env) {
  try {
    if (!env.MODULES_KV) throw new Error("未找到 KV 存储绑定");
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) return new Response(JSON.stringify({error: "没收到文件"}), {status: 400, headers: {"Content-Type": "application/json"}});
    
    // 限制 5MB
    if (file.size > 5 * 1024 * 1024) return new Response(JSON.stringify({error: "文件太大，不能超过 5MB"}), {status: 413, headers: {"Content-Type": "application/json"}});

    const key = file.name;
    const buffer = await file.arrayBuffer();

    // 存文件
    await env.MODULES_KV.put(key, buffer);
    // 记名字
    await env.DB.prepare("INSERT OR REPLACE INTO modules (name, size, created_at) VALUES (?, ?, datetime('now'))").bind(key, file.size).run();

    return new Response(JSON.stringify({success: true, name: key, size: file.size}), {headers: {"Content-Type": "application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error: e.message}), {status: 500, headers: {"Content-Type": "application/json"}});
  }
}
