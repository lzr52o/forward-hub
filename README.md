# Forward Hub (Cloudflare Workers + KV + D1)

一个完全免费、无需 R2、可直接部署到 Cloudflare 的 Forward 模块托管服务。

支持：
- 上传 Forward 模块（≤5MB）
- 自动存储到 KV
- 自动写入 D1 数据库
- 列出所有模块
- 获取模块内容
- 删除模块
- 自动生成订阅链接

---

## 🚀 部署步骤

### 1. Fork 或 Clone 本仓库


### 2. 进入 Cloudflare Dashboard → Workers & Pages → Create

选择：

- **Deploy from GitHub**
- 选择你的仓库 `forward-widget`

Cloudflare 会自动识别 `wrangler.toml` 并部署。

---

## 📦 API 说明

### 上传模块（POST）


FormData:

| 字段 | 类型 | 说明 |
|------|------|------|
| file | File | 模块文件（≤5MB） |

---

### 获取模块列表


---

### 获取模块内容


---

### 删除模块


---

## 📌 订阅链接格式


可直接用于 Forward App。

---

## 🛠 技术栈

- Cloudflare Workers
- KV 存储
- D1 数据库
- 原生 JavaScript（无依赖）

---

## 🧩 数据库结构（自动创建）


---

## ❤️ 作者

仓库维护者：lzr52o  
用途：Forward 模块托管服务
