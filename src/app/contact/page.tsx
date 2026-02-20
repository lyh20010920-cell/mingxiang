import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/SchemaScript';

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系明祥精密零件有限公司，地址：江苏省苏州市工业园区XX路XX号，电话：400-888-8888，邮箱：info@mingxiang-parts.com。欢迎咨询精密零件加工服务。',
  keywords: ['联系我们', '明祥联系方式', '精密零件咨询', '零件加工报价', '苏州机械加工'],
  openGraph: {
    title: '联系我们 - 明祥精密零件有限公司',
    description: '联系明祥精密零件有限公司，欢迎咨询精密零件加工服务。',
  },
};

export default function ContactPage() {
  const contactInfo = [
    { icon: '📍', title: '公司地址', lines: ['江苏省苏州市工业园区XX路XX号'] },
    { icon: '📞', title: '联系电话', lines: ['400-888-8888', '0512-12345678'] },
    { icon: '📧', title: '电子邮箱', lines: ['info@mingxiang-parts.com', 'sales@mingxiang-parts.com'] },
    { icon: '🕐', title: '工作时间', lines: ['周一至周六：08:00 - 18:00', '周日休息'] },
  ];

  const directions = [
    { icon: '🚗', title: '自驾', desc: '导航搜索"明祥精密零件有限公司"，园区内免费停车' },
    { icon: '🚇', title: '地铁', desc: '地铁X号线XX站，从A出口步行约10分钟' },
    { icon: '🚌', title: '公交', desc: '乘坐XX路、XX路公交车至XX站下车' },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: '/' },
          { name: '联系我们', url: '/contact' },
        ]}
      />
      <Header />
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>联系我们</h1>
            <p>期待与您的合作</p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-2">在线留言</h2>
                <p className="text-gray-500 mb-8">请填写以下信息，我们会尽快与您联系</p>
                <form className="bg-gray-50 p-8 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-2 font-medium">
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="请输入您的姓名"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">
                        电话 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="请输入您的联系电话"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-2 font-medium">邮箱</label>
                      <input
                        type="email"
                        placeholder="请输入您的邮箱"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">公司名称</label>
                      <input
                        type="text"
                        placeholder="请输入您的公司名称"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">咨询类型</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                      <option value="">请选择咨询类型</option>
                      <option value="quote">询价报价</option>
                      <option value="sample">打样需求</option>
                      <option value="tech">技术咨询</option>
                      <option value="other">其他问题</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">
                      留言内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="请详细描述您的需求，如零件材质、数量、精度要求等"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    提交留言
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b-2 border-primary">联系方式</h3>
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4 mb-6">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <strong className="block mb-1">{item.title}</strong>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-gray-500 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-8 rounded-xl text-center">
                  <h3 className="text-xl font-bold mb-6">扫码联系</h3>
                  <div className="flex justify-center gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-primary-dark rounded-lg flex items-center justify-center text-white text-sm mb-2">
                        企业微信
                      </div>
                      <p className="text-gray-500 text-sm">企业微信</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-primary-dark rounded-lg flex items-center justify-center text-white text-sm mb-2">
                        公众号
                      </div>
                      <p className="text-gray-500 text-sm">微信公众号</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>公司位置</h2>
              <p>欢迎莅临参观指导</p>
            </div>
            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-8">
              <div className="text-center text-gray-400">
                <span className="text-6xl block mb-4">📍</span>
                <p>地图加载区域</p>
                <p className="text-sm">江苏省苏州市工业园区XX路XX号</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6">交通指引</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {directions.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <strong className="block mb-1">{item.title}</strong>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
