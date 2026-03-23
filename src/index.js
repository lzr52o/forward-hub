// 文件路径: index.js
import { initDatabase } from "./utils/d1.js";
import upload from "./api/upload.js";
import list from "./api/list.js";
import get from "./api/get.js";
import del from "./api/delete.js";

export default {
  async fetch(request, env) {
    try {
      // 每次运行前先确保数据库表存在
      await initDatabase(env);

      const url = new URL(request.url);
      const path = url.pathname;

      // 路由判断：根据网址路径决定做什么
      if (path === "/api/upload" && request.method === "POST") {
        return await upload(request, env);
      }

      if (path === "/api/list") {
        return await list(request, env);
      }

      if (path.startsWith("/api/get/")) {
        const key = path.replace("/api/get/", "");
        return await get(request, env, key);
      }

      if (path.startsWith("/api/delete/") && request.method === "DELETE") {
        const key = path.replace("/api/delete/", "");
        return await del(request, env, key);
      }

      // 默认首页
      return new Response("🎉 Forward Hub 运行正常！\n你可以访问 /api/list 查看文件列表。", { 
        status: 200, 
        headers: { "Content-Type": "text/plain" } 
      });

    } catch (error) {
      // 如果有错误，在这里捕获并显示，而不是让页面白屏
      console.error("系统出错:", error);
      return new Response("发生错误: " + error.message, { 
        status: 500, 
        headers: { "Content-Type": "text/plain" } 
      });
    }
  }
};
