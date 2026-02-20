// 数据库表类型定义

// 联系留言表
export interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  type: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

// 管理员表
export interface Admin {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

// 网站内容表
export interface SiteContent {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

// 新闻表
export interface News {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  views: number;
  created_at: string;
  updated_at: string;
}

// 产品表
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  specs: string[];
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}
