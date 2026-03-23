export async function initDatabase(env) {
  await env.DB.exec(`
    CREATE TABLE IF NOT EXISTS modules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      size INTEGER,
      created_at TEXT
    );
  `);
}
}
