import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/SchemaScript';

export const metadata: Metadata = {
  title: '关于我们',
  description: '明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。了解我们的发展历程、企业文化和资质荣誉。',
  keywords: ['明祥精密零件', '公司简介', '发展历程', '企业文化', '资质荣誉'],
  openGraph: {
    title: '关于我们 - 明祥精密零件有限公司',
    description: '明祥精密零件有限公司成立于2005年，是一家专业从事精密机械零件加工的现代化企业。',
  },
};

export default function AboutPage() {
  const timeline = [
    { year: '2005', title: '公司成立', desc: '明祥精密零件有限公司在苏州成立，初期主要从事简单零件加工业务' },
    { year: '2008', title: '业务拓展', desc: '引进首批CNC加工中心，开始承接精密零件加工订单' },
    { year: '2012', title: '规模扩大', desc: '搬迁至新厂房，员工数量突破50人，通过ISO9001认证' },
    { year: '2016', title: '转型升级', desc: '引进五轴加工中心，进入高端精密加工领域' },
    { year: '2020', title: '持续发展', desc: '拓展医疗、航空等高精尖领域，年产值突破5000万' },
    { year: '2026', title: '展望未来', desc: '持续推进智能制造，提升核心竞争力，向行业领先迈进' },
  ];

  const culture = [
    { icon: '🎯', title: '企业使命', desc: '为客户提供高品质的精密零件加工服务，助力中国制造' },
    { icon: '👁️', title: '企业愿景', desc: '成为行业领先的精密加工解决方案提供商' },
    { icon: '💎', title: '核心价值观', desc: '品质至上、诚信为本、持续创新、合作共赢' },
    { icon: '🤝', title: '经营理念', desc: '以质量求生存，以信誉求发展，以服务赢市场' },
  ];

  const qualifications = [
    { title: 'ISO9001', desc: '质量管理体系认证' },
    { title: 'ISO14001', desc: '环境管理体系认证' },
    { title: '高新技术企业', desc: '国家高新技术企业认定' },
    { title: 'AAA信用', desc: 'AAA级信用企业' },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: '/' },
          { name: '关于我们', url: '/about' },
        ]}
      />
      <Header />
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>关于我们</h1>
            <p>专业、专注、专心，铸就品质辉煌</p>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">公司简介</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                明祥精密零件有限公司成立于2005年，坐落于江苏省苏州市工业园区，是一家专业从事精密机械零件加工的现代化制造企业。公司占地面积15000平方米，建筑面积8000平方米，拥有各类先进的加工设备100余台。
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                公司主要从事CNC精密加工、数控车削加工、钣金加工、模具制造等业务，产品广泛应用于汽车、电子、医疗器械、航空航天、通讯设备等领域。公司通过ISO9001质量管理体系认证，严格执行品质管控流程，确保每一件产品都符合客户要求。
              </p>
              <p className="text-gray-600 leading-relaxed">
                经过近20年的发展，公司已成长为行业内具有一定影响力的精密加工企业，与国内外众多知名企业建立了长期稳定的合作关系。
              </p>
            </div>
          </div>
        </section>

        {/* Development History */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>发展历程</h2>
              <p>稳健发展，砥砺前行</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 mb-8">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Culture */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2>企业文化</h2>
              <p>以人为本，追求卓越</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {culture.map((item, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>资质荣誉</h2>
              <p>实力见证，品质保证</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {qualifications.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-gradient-to-br from-primary-light to-primary-dark text-white p-8 rounded-lg font-bold mb-4">
                    {item.title}
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
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
