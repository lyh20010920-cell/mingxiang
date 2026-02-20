# 明祥精密零件有限公司 - 部署指南

## 🚀 完整部署步骤

### 步骤 1：注册 Supabase（免费数据库）

1. 访问 https://supabase.com
2. 点击 **Start your project** 使用 GitHub 账号登录
3. 创建新组织（Organization）
4. 创建新项目：
   - 项目名称：`mingxiang-parts`
   - 数据库密码：设置一个强密码（记住它！）
   - 区域：选择 **Singapore**（离中国最近）
5. 等待约 2 分钟项目创建完成

### 步骤 2：获取 API 密钥

1. 进入项目后，点击左侧 **Settings** → **API**
2. 复制以下值（稍后在 Vercel 中使用）：
   - **Project URL** → 这是 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → 这是 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → 点击 **Reveal** 显示，这是 `SUPABASE_SERVICE_ROLE_KEY`

### 步骤 3：初始化数据库

1. 在 Supabase 左侧点击 **SQL Editor**
2. 点击 **New query**
3. 复制粘贴以下 SQL 并点击 **Run**：

```sql
-- 创建联系留言表
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  company VARCHAR(200),
  type VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建管理员表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建网站内容表
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 创建安全策略
CREATE POLICY "Allow anonymous insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on site_content" ON site_content
  FOR SELECT USING (true);

-- 插入默认网站内容
INSERT INTO site_content (key, value) VALUES
('company_name', '明祥精密零件有限公司'),
('company_address', '江苏省苏州市工业园区XX路XX号'),
('company_phone', '400-888-8888'),
('company_email', 'info@mingxiang-parts.com'),
('company_intro', '明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。')
ON CONFLICT (key) DO NOTHING;
```

### 步骤 4：创建管理员账户

在 SQL Editor 中继续执行：

```sql
-- 创建管理员账户（用户名: admin, 密码: admin123）
-- 请登录后立即修改密码！
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2a$10$rQZ9QxZxGkL0vJ3W5Y2cXu8mNpK1sT6vY4wE7iO2pA3sD5fG8hJ1q');
```

### 步骤 5：部署到 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **Add New...** → **Project**
4. 选择 `mingxiang` 仓库
5. 点击 **Import**
6. 展开左侧 **Environment Variables**，添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | 你的 Supabase service_role key |
| `JWT_SECRET` | 随便设置一个长字符串，如：`mingxiang-jwt-secret-2026-secure` |
| `NEXT_PUBLIC_SITE_URL` | 部署后的域名（可以先不填） |

7. 点击 **Deploy**
8. 等待约 2 分钟部署完成

### 步骤 6：访问网站

部署完成后，你会获得一个 `.vercel.app` 域名，例如：
```
https://mingxiang-xxx.vercel.app
```

## 🔐 管理员后台

访问 `/admin/login` 登录：
- 用户名：`admin`
- 密码：`admin123`

登录后可以：
- 查看和管理客户留言
- 修改网站内容

## 📞 功能说明

### 前台功能
- ✅ 6 个完整页面（首页、关于、产品、设备、新闻、联系）
- ✅ 在线留言表单（数据保存到数据库）
- ✅ SEO 优化（Meta、sitemap.xml、robots.txt、Schema.org）
- ✅ 响应式设计（支持手机、平板、电脑）

### 后台功能
- ✅ 管理员登录/退出
- ✅ 留言管理（查看、标记状态、删除）
- ✅ 内容管理（修改公司信息）

## 🔄 更新网站

修改代码后，只需推送到 GitHub：
```bash
git add .
git commit -m "更新内容"
git push
```
Vercel 会自动重新部署。

## 📧 提交到搜索引擎

网站上线后，提交到：

| 平台 | 链接 |
|------|------|
| Google | https://search.google.com/search-console |
| 百度 | https://ziyuan.baidu.com |
| Bing | https://www.bing.com/webmasters |

Sitemap 地址：`https://你的域名/sitemap.xml`

## ⚠️ 安全提示

1. **修改管理员密码**：登录后台后立即修改
2. **保护密钥**：不要在代码中暴露 Supabase 密钥
3. **定期备份**：在 Supabase 中定期备份数据库
