'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Content {
  [key: string]: string;
}

export default function AdminContentPage() {
  const router = useRouter();
  const [content, setContent] = useState<Content>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const editableFields = [
    { key: 'company_name', label: '公司名称' },
    { key: 'company_address', label: '公司地址' },
    { key: 'company_phone', label: '联系电话' },
    { key: 'company_email', label: '联系邮箱' },
    { key: 'company_intro', label: '公司简介', multiline: true },
    { key: 'company_keywords', label: 'SEO 关键词' },
    { key: 'company_description', label: 'SEO 描述', multiline: true },
  ];

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data.content || {});
    } catch {
      console.error('获取内容失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (key: string, value: string) => {
    setSaving(key);
    setMessage('');

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${editableFields.find(f => f.key === key)?.label} 已保存`);
        setContent((prev) => ({ ...prev, [key]: value }));
      } else {
        setMessage(data.error || '保存失败');
      }
    } catch {
      setMessage('网络错误');
    } finally {
      setSaving(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">明祥精密零件 - 管理后台</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-primary hover:underline text-sm">
              查看网站
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <Link
              href="/admin/messages"
              className="py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            >
              留言管理
            </Link>
            <Link
              href="/admin/content"
              className="py-3 border-b-2 border-primary text-primary font-medium"
            >
              内容管理
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {message && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-6">网站内容管理</h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">加载中...</div>
          ) : (
            <div className="space-y-6">
              {editableFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="flex gap-3">
                    {field.multiline ? (
                      <textarea
                        value={content[field.key] || ''}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        rows={4}
                        className="flex-1 border rounded-lg px-4 py-2 text-sm"
                      />
                    ) : (
                      <input
                        type="text"
                        value={content[field.key] || ''}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="flex-1 border rounded-lg px-4 py-2 text-sm"
                      />
                    )}
                    <button
                      onClick={() => handleSave(field.key, content[field.key] || '')}
                      disabled={saving === field.key}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark disabled:opacity-50"
                    >
                      {saving === field.key ? '保存中...' : '保存'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
          <strong>提示：</strong> 修改内容后会立即生效。SEO 关键词用逗号分隔，如：精密零件,CNC加工,机械加工
        </div>
      </main>
    </div>
  );
}
