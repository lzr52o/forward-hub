import { initDatabase } from "./utils/d1.js";
import upload from "./api/upload.js";
import list from "./api/list.js";
import get from "./api/get.js";
import del from "./api/delete.js";

export default {
  async fetch(request, env) {
    await initDatabase(env);

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/upload" && request.method === "POST") {
      return upload(request, env);
    }

    if (path === "/api/list") {
      return list(request, env);
    }

    if (path.startsWith("/api/get/")) {
      const key = path.replace("/api/get/", "");
      return get(request, env, key);
    }

    if (path.startsWith("/api/delete/") && request.method === "DELETE") {
      const key = path.replace("/api/delete/", "");
      return del(request, env, key);
    }

    // ⭐ 你之前缺少的部分
    return new Response("Forward Hub is running.", { status: 200 });
  }
};
