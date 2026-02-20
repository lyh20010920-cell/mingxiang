import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/SchemaScript';

export const metadata: Metadata = {
  title: '产品中心',
  description: '明祥精密零件提供汽车精密零件、电子产品零件、医疗器械零件、航空航天零件等各类精密加工产品。支持来图来样定制加工。',
  keywords: ['精密零件', '汽车零件', '电子零件', '医疗零件', '航空零件', '定制加工', 'CNC加工'],
  openGraph: {
    title: '产品中心 - 明祥精密零件有限公司',
    description: '明祥精密零件提供各类精密加工产品，支持来图来样定制加工。',
  },
};

export default function ProductsPage() {
  const products = [
    {
      category: '汽车零件',
      title: '汽车发动机精密零件',
      desc: '采用优质铝合金材料，通过CNC精密加工而成，精度可达±0.01mm，适用于各类汽车发动机系统。',
      specs: ['材质：铝合金/不锈钢', '精度：±0.01mm', '工艺：CNC加工'],
    },
    {
      category: '汽车零件',
      title: '传动系统精密零件',
      desc: '专为汽车传动系统设计的精密零件，经过严格的动平衡测试，确保运转平稳可靠。',
      specs: ['材质：合金钢', '精度：±0.005mm', '工艺：车削+磨削'],
    },
    {
      category: '电子零件',
      title: '电子精密连接器',
      desc: '高精度电子连接器零件，应用于通讯设备、消费电子产品，导电性能优异。',
      specs: ['材质：铜合金', '精度：±0.005mm', '工艺：精密冲压'],
    },
    {
      category: '电子零件',
      title: '电子散热片',
      desc: '高效散热解决方案，采用优质铝合金材料，多种规格可选，支持定制化生产。',
      specs: ['材质：铝合金6063', '精度：±0.02mm', '工艺：挤压+CNC'],
    },
    {
      category: '医疗零件',
      title: '医疗器械精密零件',
      desc: '按照医疗行业标准生产，可提供各类手术器械、医疗设备精密零件，符合生物相容性要求。',
      specs: ['材质：医用不锈钢', '精度：±0.005mm', '工艺：CNC+抛光'],
    },
    {
      category: '医疗零件',
      title: '医疗设备配件',
      desc: '为CT、核磁共振等医疗设备提供高精度配件，品质稳定可靠。',
      specs: ['材质：钛合金/不锈钢', '精度：±0.01mm', '工艺：五轴加工'],
    },
    {
      category: '航空零件',
      title: '航空结构件',
      desc: '采用航空级材料，通过严格的质量检测，满足航空航天领域的高标准要求。',
      specs: ['材质：航空铝合金', '精度：±0.005mm', '工艺：五轴CNC'],
    },
    {
      category: '航空零件',
      title: '航天精密零件',
      desc: '为航天器提供高可靠性精密零件，经过严格的环境试验和功能测试。',
      specs: ['材质：钛合金', '精度：±0.003mm', '工艺：精密加工'],
    },
  ];

  const customServices = [
    { icon: '📐', title: '来图定制', desc: '提供CAD图纸即可报价生产' },
    { icon: '📦', title: '来样加工', desc: '提供样品即可进行逆向工程' },
    { icon: '💡', title: '设计支持', desc: '专业团队提供工艺优化建议' },
    { icon: '🚀', title: '快速打样', desc: '最快3天完成样品交付' },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: '/' },
          { name: '产品中心', url: '/products' },
        ]}
      />
      <Header />
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>产品中心</h1>
            <p>品质铸就信任，专业成就未来</p>
          </div>
        </section>

        {/* Products List */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <div key={index} className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="w-48 bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-white font-semibold text-center p-4">
                    {product.category}
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Services */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <h2 className="text-3xl font-bold mb-4">定制服务</h2>
              <p className="text-gray-500 mb-10">我们提供来图来样定制加工服务，可根据客户需求定制各类非标零件</p>
              <div className="grid md:grid-cols-4 gap-8 mb-10">
                {customServices.map((service, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-500 text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
              <a href="/contact" className="btn btn-primary">
                立即咨询
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
