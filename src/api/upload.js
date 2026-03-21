import { jsonResponse, errorResponse } from "../utils/response.js";

export default async function upload(request, env) {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!file) {
      return errorResponse("No file uploaded", 400);
    }

    // 限制 5MB（你选择的）
    if (file.size > 5 * 1024 * 1024) {
      return errorResponse("File exceeds 5MB limit", 400);
    }

    const key = file.name;

    // 存入 KV
    await env.MODULES_KV.put(key, await file.text());

    // 写入 D1 元数据
    await env.DB.prepare(
      "INSERT INTO modules (name, size, created_at) VALUES (?, ?, datetime('now'))"
    ).bind(key, file.size).run();

    return jsonResponse({
      message: "Upload success",
      name: key,
      size: file.size
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
