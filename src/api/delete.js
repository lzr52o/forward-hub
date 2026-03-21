import { jsonResponse, errorResponse } from "../utils/response.js";

export default async function del(request, env, key) {
  try {
    // 删除 KV 文件
    await env.MODULES_KV.delete(key);

    // 删除 D1 元数据
    await env.DB.prepare(
      "DELETE FROM modules WHERE name = ?"
    ).bind(key).run();

    return jsonResponse({
      message: "Delete success",
      name: key
    });
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
