'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  type: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages?status=${statusFilter}&page=${page}&limit=10`
      );
      const data = await res.json();

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      setMessages(data.messages || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      console.error('获取留言失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, page]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        fetchMessages();
      }
    } catch {
      console.error('更新状态失败');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('确定要删除这条留言吗？')) return;

    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMessages();
      }
    } catch {
      console.error('删除失败');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      unread: 'bg-red-100 text-red-700',
      read: 'bg-yellow-100 text-yellow-700',
      replied: 'bg-green-100 text-green-700',
    };
    const labels: Record<string, string> = {
      unread: '未读',
      read: '已读',
      replied: '已回复',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status] || ''}`}>
        {labels[status] || status}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN');
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
              className="py-3 border-b-2 border-primary text-primary font-medium"
            >
              留言管理
            </Link>
            <Link
              href="/admin/content"
              className="py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            >
              内容管理
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">状态筛选：</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">全部</option>
              <option value="unread">未读</option>
              <option value="read">已读</option>
              <option value="replied">已回复</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">加载中...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">暂无留言</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">姓名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">电话</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">公司</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">类型</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">留言内容</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">时间</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{msg.name}</td>
                    <td className="px-4 py-3 text-sm">{msg.phone}</td>
                    <td className="px-4 py-3 text-sm">{msg.company || '-'}</td>
                    <td className="px-4 py-3 text-sm">{msg.type || '-'}</td>
                    <td className="px-4 py-3 text-sm max-w-xs truncate">{msg.message}</td>
                    <td className="px-4 py-3 text-sm">{getStatusBadge(msg.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(msg.created_at)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) => updateStatus(msg.id, e.target.value)}
                          className="text-xs border rounded px-1 py-1"
                        >
                          <option value="unread">未读</option>
                          <option value="read">已读</option>
                          <option value="replied">已回复</option>
                        </select>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                上一页
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
