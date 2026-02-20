// 数据库初始化 SQL 脚本
// 在 Supabase SQL Editor 中执行此脚本

export const initDatabaseSQL = `
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

-- 新闻表
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category VARCHAR(50) DEFAULT '公司新闻',
  author VARCHAR(50),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  specs TEXT[],
  image_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认管理员 (密码: admin123)
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2a$10$YourHashedPasswordHere')
ON CONFLICT (username) DO NOTHING;

-- 插入默认网站内容
INSERT INTO site_content (key, value) VALUES
('company_name', '明祥精密零件有限公司'),
('company_address', '江苏省苏州市工业园区XX路XX号'),
('company_phone', '400-888-8888'),
('company_email', 'info@mingxiang-parts.com'),
('company_intro', '明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。')
ON CONFLICT (key) DO NOTHING;

-- 插入示例新闻
INSERT INTO news (title, content, category, author) VALUES
('公司新引进五轴加工中心', '为进一步提升精密加工能力，公司近期引进了最新型号的五轴联动加工中心...', '公司新闻', '技术部'),
('荣获"优秀供应商"称号', '凭借优质的产品和服务，明祥精密零件荣获某知名汽车厂商颁发的称号...', '公司新闻', '市场部')
ON CONFLICT DO NOTHING;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- 启用 Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 公开访问策略 (允许匿名插入留言)
CREATE POLICY "Allow anonymous insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 允许公开读取新闻和产品
CREATE POLICY "Allow public read on news" ON news
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on site_content" ON site_content
  FOR SELECT USING (true);
`;

// 生成密码哈希的函数（在 Node.js 中使用）
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
