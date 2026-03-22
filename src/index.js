import { initDatabase } from "./utils/d1.js";
import upload from "./api/upload.js";
import list from "./api/list.js";
import get from "./api/get.js";
import del from "./api/delete.js";

export default {
  async fetch(request, env) {
    // ⭐ 每次请求都确保数据库已初始化（自动创建 modules 表）
    await initDatabase(env);

    const url = new URL(request.url);
    const path = url.pathname;

    // 上传模块
    if (path === "/api/upload" && request.method === "POST") {
      return upload(request, env);
    }

    // 列出所有模块
    if (path === "/api/list") {
      return list(request, env);
    }

    // 获取模块文件
    if (path.startsWith("/api/get/")) {
      const key = path.replace("/api/get/", "");
      return get(request, env, key);
    }

    // 删除模块
    if (path.startsWith("/api/delete/") && request.method === "DELETE") {
      const key = path.replace("/api/delete/", "");
      return del(request, env, key);
    }
// force rebuild
    return new Response("Forward Hub is running.", { status: 200 });
  }
};
