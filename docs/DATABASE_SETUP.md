# Supabase 数据库初始化脚本

在 Supabase SQL Editor 中执行以下步骤：

## 步骤 1：创建表结构

```sql
-- 联系留言表
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

-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 网站内容配置表
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

## 步骤 2：设置 RLS 策略

```sql
-- 启用 Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 允许匿名插入留言
CREATE POLICY "Allow anonymous insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 允许公开读取网站内容
CREATE POLICY "Allow public read on site_content" ON site_content
  FOR SELECT USING (true);
```

## 步骤 3：插入默认管理员

首先需要生成密码哈希。在本地运行：

```javascript
// 在 Node.js 中运行
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 10);
console.log(hash);
```

然后插入：

```sql
-- 插入默认管理员（用户名: admin, 密码: admin123）
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '你的密码哈希值');
```

## 步骤 4：插入默认网站内容

```sql
INSERT INTO site_content (key, value) VALUES
('company_name', '明祥精密零件有限公司'),
('company_address', '江苏省苏州市工业园区XX路XX号'),
('company_phone', '400-888-8888'),
('company_email', 'info@mingxiang-parts.com'),
('company_intro', '明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。')
ON CONFLICT (key) DO NOTHING;
```

## 完成！

执行完以上 SQL 后，你的数据库就配置好了。
