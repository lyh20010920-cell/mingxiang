import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SchemaScript } from '@/components/SchemaScript';

export default function Home() {
  return (
    <>
      <SchemaScript />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1>专业精密零件加工制造商</h1>
            <p>精密加工 · 品质保障 · 快速交付</p>
            <div className="hero-buttons">
              <Link href="/products" className="btn btn-primary">
                查看产品
              </Link>
              <Link href="/contact" className="btn btn-outline">
                联系我们
              </Link>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">明祥精密零件有限公司</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。公司拥有先进的CNC加工中心、数控车床、磨床等设备，为汽车、电子、医疗、航空航天等行业提供高品质的零件加工服务。
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  公司通过ISO9001质量管理体系认证，严格执行品质管控流程，确保每一件产品都符合客户要求。经过近20年的发展，公司已成长为行业内具有一定影响力的精密加工企业。
                </p>
                <Link href="/about" className="btn btn-primary">
                  了解更多
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <span className="block text-4xl font-bold text-primary mb-2">18+</span>
                  <span className="text-gray-500">年行业经验</span>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <span className="block text-4xl font-bold text-primary mb-2">500+</span>
                  <span className="text-gray-500">合作客户</span>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <span className="block text-4xl font-bold text-primary mb-2">100+</span>
                  <span className="text-gray-500">专业员工</span>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <span className="block text-4xl font-bold text-primary mb-2">99%</span>
                  <span className="text-gray-500">客户满意度</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>主营业务</h2>
              <p>专业提供各类精密零件加工服务</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '⚙️', title: 'CNC精密加工', desc: '三轴、四轴、五轴CNC加工中心，精度可达±0.005mm' },
                { icon: '🔧', title: '数控车削加工', desc: '各类轴类、盘类零件的车削加工，支持复杂曲面' },
                { icon: '🔩', title: '钣金加工', desc: '激光切割、折弯、焊接等一站式钣金服务' },
                { icon: '📏', title: '模具制造', desc: '注塑模具、压铸模具设计制造' },
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Preview */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2>产品展示</h2>
              <p>品质铸就信任，专业成就未来</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: '汽车精密零件', desc: '发动机零件、传动系统零件等' },
                { title: '电子产品零件', desc: '精密连接器、散热片、外壳等' },
                { title: '医疗器械零件', desc: '手术器械、医疗设备配件' },
                { title: '航空航天零件', desc: '高精度、高强度航空级零件' },
              ].map((product, index) => (
                <div key={index} className="bg-gradient-to-br from-primary-light to-primary-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="h-48 flex items-center justify-center text-white font-semibold text-lg">
                    {product.title}
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-500 text-sm">{product.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/products" className="btn btn-primary">
                查看更多产品
              </Link>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>为什么选择我们</h2>
              <p>专业、品质、服务是我们的核心竞争力</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: '先进设备', desc: '引进国内外先进加工设备，确保加工精度' },
                { title: '专业团队', desc: '拥有经验丰富的技术团队和品质管控人员' },
                { title: '质量保证', desc: '通过ISO9001认证，严格品质管控体系' },
                { title: '快速交付', desc: '高效生产流程，确保订单按时交付' },
              ].map((advantage, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-500 text-sm">{advantage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Preview */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2>新闻动态</h2>
              <p>了解明祥最新资讯</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { date: '15', month: '2026-02', title: '公司新引进五轴加工中心', desc: '为进一步提升精密加工能力，公司近期引进了最新型号的五轴加工中心...' },
                { date: '08', month: '2026-02', title: '荣获"优秀供应商"称号', desc: '凭借优质的产品和服务，明祥精密零件荣获某知名汽车厂商颁发的称号...' },
                { date: '20', month: '2026-01', title: '2026年度企业发展规划', desc: '新的一年，公司将继续加大设备投入，拓展业务领域...' },
              ].map((news, index) => (
                <div key={index} className="flex gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-center flex-shrink-0">
                    <span className="block text-3xl font-bold text-primary">{news.date}</span>
                    <span className="text-sm text-gray-400">{news.month}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 line-clamp-1">{news.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{news.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
