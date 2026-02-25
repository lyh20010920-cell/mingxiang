'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PageComponent {
  id?: number;
  componentType: string;
  title: string;
  content: Record<string, any>;
  isVisible: boolean;
}

const COMPONENT_TYPES = [
  { type: 'hero', label: 'Hero横幅', icon: '🖼️', defaultContent: { title: '', subtitle: '', button1: '', button2: '' } },
  { type: 'intro', label: '公司简介', icon: '📝', defaultContent: { title: '', content: '' } },
  { type: 'stats', label: '数据统计', icon: '📊', defaultContent: { items: [{ value: '18+', label: '年行业经验' }, { value: '500+', label: '合作客户' }, { value: '100+', label: '专业员工' }, { value: '99%', label: '客户满意度' }] } },
  { type: 'services', label: '服务项目', icon: '⚙️', defaultContent: { title: '', subtitle: '', items: [{ icon: '⚙️', title: '', desc: '' }, { icon: '🔧', title: '', desc: '' }, { icon: '🔩', title: '', desc: '' }, { icon: '📏', title: '', desc: '' }] } },
  { type: 'products', label: '产品展示', icon: '📦', defaultContent: { title: '', subtitle: '', items: [{ title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }] } },
  { type: 'advantages', label: '优势展示', icon: '✨', defaultContent: { title: '', subtitle: '', items: [{ title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }, { title: '', desc: '' }] } },
  { type: 'news', label: '新闻动态', icon: '📰', defaultContent: { title: '', subtitle: '', items: [{ date: '', title: '', desc: '' }, { date: '', title: '', desc: '' }, { date: '', title: '', desc: '' }] } },
  { type: 'contact', label: '联系我们', icon: '📞', defaultContent: {} },
  { type: 'gallery', label: '图片画廊', icon: '🖼️', defaultContent: { title: '', images: [] } },
  { type: 'banner', label: '页面横幅', icon: '🎨', defaultContent: { title: '', subtitle: '' } },
];

const PAGES = [
  { slug: 'home', label: '首页' },
  { slug: 'about', label: '关于我们' },
  { slug: 'products', label: '产品中心' },
  { slug: 'equipment', label: '设备展示' },
  { slug: 'news', label: '新闻动态' },
  { slug: 'contact', label: '联系我们' },
];

export default function PageBuilderPage() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState('home');
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingComponent, setEditingComponent] = useState<number | null>(null);

  const fetchPageConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pages?page=${selectedPage}`, { credentials: 'include' });
      const data = await res.json();
      
      if (data.components && data.components.length > 0) {
        setComponents(data.components.map((c: any) => ({
          id: c.id,
          componentType: c.component_type,
          title: c.title,
          content: c.content,
          isVisible: c.is_visible,
        })));
      } else {
        setComponents([]);
      }
    } catch (error) {
      console.error('获取页面配置失败', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageConfig();
  }, [selectedPage]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: selectedPage,
          components: components,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('页面配置已保存');
      } else {
        setMessage(data.error || '保存失败');
      }
    } catch {
      setMessage('网络错误');
    } finally {
      setSaving(false);
    }
  };

  const addComponent = (type: string) => {
    const compType = COMPONENT_TYPES.find(t => t.type === type);
    if (!compType) return;

    setComponents([...components, {
      componentType: type,
      title: '',
      content: JSON.parse(JSON.stringify(compType.defaultContent)),
      isVisible: true,
    }]);
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const updateComponent = (index: number, field: string, value: any) => {
    setComponents(components.map((comp, i) => {
      if (i === index) {
        return { ...comp, [field]: value };
      }
      return comp;
    }));
  };

  const updateComponentContent = (index: number, contentKey: string, value: any) => {
    setComponents(components.map((comp, i) => {
      if (i === index) {
        return { ...comp, content: { ...comp.content, [contentKey]: value } };
      }
      return comp;
    }));
  };

  const moveComponent = (from: number, to: number) => {
    const newComponents = [...components];
    const [removed] = newComponents.splice(from, 1);
    newComponents.splice(to, 0, removed);
    setComponents(newComponents);
    setDraggedIndex(null);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  const handleImageUpload = async (compIndex: number, field: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', selectedPage);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      
      if (data.url) {
        updateComponentContent(compIndex, field, data.url);
      }
    } catch (error) {
      console.error('上传图片失败', error);
    }
  };

  const renderComponentEditor = (comp: PageComponent, index: number) => {
    const compType = COMPONENT_TYPES.find(t => t.type === comp.componentType);
    
    return (
      <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{compType?.icon}</span>
            <span className="font-medium">{compType?.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={comp.isVisible}
                onChange={(e) => updateComponent(index, 'isVisible', e.target.checked)}
                className="rounded"
              />
              显示
            </label>
            <button
              onClick={() => setEditingComponent(editingComponent === index ? null : index)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {editingComponent === index ? '收起' : '编辑'}
            </button>
            <button
              onClick={() => removeComponent(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              删除
            </button>
          </div>
        </div>

        {editingComponent === index && (
          <div className="space-y-4 pl-10">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                标题
              </label>
              <input
                type="text"
                value={comp.title}
                onChange={(e) => updateComponent(index, 'title', e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="请输入标题"
              />
            </div>

            {/* Content fields based on component type */}
            {comp.componentType === 'hero' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">主标题</label>
                  <input
                    type="text"
                    value={comp.content.title || ''}
                    onChange={(e) => updateComponentContent(index, 'title', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                  <input
                    type="text"
                    value={comp.content.subtitle || ''}
                    onChange={(e) => updateComponentContent(index, 'subtitle', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">按钮1文字</label>
                  <input
                    type="text"
                    value={comp.content.button1 || ''}
                    onChange={(e) => updateComponentContent(index, 'button1', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">按钮2文字</label>
                  <input
                    type="text"
                    value={comp.content.button2 || ''}
                    onChange={(e) => updateComponentContent(index, 'button2', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">背景图片</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(index, 'backgroundImage', e.target.files[0])}
                    className="block w-full text-sm"
                  />
                  {comp.content.backgroundImage && (
                    <img src={comp.content.backgroundImage} alt="背景预览" className="mt-2 h-20 object-cover rounded" />
                  )}
                </div>
              </>
            )}

            {comp.componentType === 'intro' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">公司简介内容</label>
                <textarea
                  value={comp.content.content || ''}
                  onChange={(e) => updateComponentContent(index, 'content', e.target.value)}
                  rows={6}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="请输入公司简介内容"
                />
              </div>
            )}

            {comp.componentType === 'stats' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">统计数据项</label>
                {comp.content.items?.map((item: any, i: number) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const newItems = [...(comp.content.items || [])];
                        newItems[i] = { ...newItems[i], value: e.target.value };
                        updateComponentContent(index, 'items', newItems);
                      }}
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      placeholder="数值"
                    />
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newItems = [...(comp.content.items || [])];
                        newItems[i] = { ...newItems[i], label: e.target.value };
                        updateComponentContent(index, 'items', newItems);
                      }}
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      placeholder="标签"
                    />
                  </div>
                ))}
              </div>
            )}

            {(comp.componentType === 'services' || comp.componentType === 'products' || comp.componentType === 'advantages') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {comp.componentType === 'services' ? '服务项目' : comp.componentType === 'products' ? '产品' : '优势'}
                </label>
                {comp.content.items?.map((item: any, i: number) => (
                  <div key={i} className="border rounded p-3 mb-2">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...(comp.content.items || [])];
                          newItems[i] = { ...newItems[i], title: e.target.value };
                          updateComponentContent(index, 'items', newItems);
                        }}
                        className="flex-1 border rounded px-2 py-1 text-sm"
                        placeholder="标题"
                      />
                      {comp.componentType === 'services' && (
                        <input
                          type="text"
                          value={item.icon || ''}
                          onChange={(e) => {
                            const newItems = [...(comp.content.items || [])];
                            newItems[i] = { ...newItems[i], icon: e.target.value };
                            updateComponentContent(index, 'items', newItems);
                          }}
                          className="w-16 border rounded px-2 py-1 text-sm"
                          placeholder="图标"
                        />
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.desc || ''}
                      onChange={(e) => {
                        const newItems = [...(comp.content.items || [])];
                        newItems[i] = { ...newItems[i], desc: e.target.value };
                        updateComponentContent(index, 'items', newItems);
                      }}
                      className="w-full border rounded px-2 py-1 text-sm"
                      placeholder="描述"
                    />
                    {comp.componentType === 'products' && (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(index, `image${i}`, e.target.files[0])}
                          className="mt-2 block w-full text-sm"
                        />
                        {item.image && (
                          <img src={item.image} alt={`产品${i + 1}`} className="mt-2 h-20 object-cover rounded" />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {comp.componentType === 'news' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">新闻项</label>
                {comp.content.items?.map((item: any, i: number) => (
                  <div key={i} className="border rounded p-3 mb-2">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => {
                          const newItems = [...(comp.content.items || [])];
                          newItems[i] = { ...newItems[i], date: e.target.value };
                          updateComponentContent(index, 'items', newItems);
                        }}
                        className="w-24 border rounded px-2 py-1 text-sm"
                        placeholder="日期"
                      />
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...(comp.content.items || [])];
                          newItems[i] = { ...newItems[i], title: e.target.value };
                          updateComponentContent(index, 'items', newItems);
                        }}
                        className="flex-1 border rounded px-2 py-1 text-sm"
                        placeholder="标题"
                      />
                    </div>
                    <textarea
                      value={item.desc || ''}
                      onChange={(e) => {
                        const newItems = [...(comp.content.items || [])];
                        newItems[i] = { ...newItems[i], desc: e.target.value };
                        updateComponentContent(index, 'items', newItems);
                      }}
                      className="w-full border rounded px-2 py-1 text-sm"
                      placeholder="描述"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}

            {comp.componentType === 'banner' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                  <input
                    type="text"
                    value={comp.content.title || ''}
                    onChange={(e) => updateComponentContent(index, 'title', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                  <input
                    type="text"
                    value={comp.content.subtitle || ''}
                    onChange={(e) => updateComponentContent(index, 'subtitle', e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">明祥精密零件 - 页面编辑器</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-primary hover:underline text-sm">查看网站</Link>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800 text-sm">退出登录</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <Link href="/admin/messages" className="py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-800">留言管理</Link>
            <Link href="/admin/content" className="py-3 border-b-2 border-transparent text-gray-600 hover:text-gray-800">内容管理</Link>
            <Link href="/admin/pages" className="py-3 border-b-2 border-primary text-primary font-medium">页面编辑</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">选择页面：</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              {PAGES.map(page => (
                <option key={page.slug} value={page.slug}>{page.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Available Components */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-4">添加组件</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {COMPONENT_TYPES.map(type => (
              <button
                key={type.type}
                onClick={() => addComponent(type.type)}
                className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:border-primary hover:bg-primary-light transition-colors"
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="text-xs text-center">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Components */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-4">
            当前页面组件 ({PAGES.find(p => p.slug === selectedPage)?.label})
          </h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">加载中...</div>
          ) : components.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无组件，请从上方添加组件
            </div>
          ) : (
            <div className="space-y-2">
              {components.map((comp, index) => (
                <div key={index} className="relative">
                  {/* Drag handle */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 p-2 cursor-move">
                    <button 
                      onClick={() => moveComponent(index, Math.max(0, index - 1))}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => moveComponent(index, Math.min(components.length - 1, index + 1))}
                      disabled={index === components.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>
                  <div className="ml-10">
                    {renderComponentEditor(comp, index)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        {message && (
          <div className={`mb-4 px-4 py-3 rounded-lg ${message.includes('成功') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存页面配置'}
          </button>
        </div>
      </main>
    </div>
  );
}
