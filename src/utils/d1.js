// 文件路径: utils/d1.js
export async function initDatabase(env) {
  try {
    // 1. 先检查有没有绑定数据库，没绑定会直接提示，方便排查
    if (!env.DB) {
      throw new Error("❌ 错误：没有在后台绑定 D1 数据库！请检查变量名是否为 'DB'");
    }

    // 2. 执行建表语句 (这里修复了之前缺少括号和字段的问题)
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        size INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    
    console.log("✅ 数据库表检查完成，一切正常。");
  } catch (error) {
    console.error("❌ 数据库初始化失败:", error);
    throw error;
  }
}
