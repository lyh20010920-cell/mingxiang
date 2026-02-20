import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/SchemaScript';

export const metadata: Metadata = {
  title: '生产设备',
  description: '明祥精密零件拥有五轴加工中心、四轴CNC加工中心、数控车床、线切割、磨床等先进生产设备，以及三坐标测量机等检测设备。',
  keywords: ['生产设备', 'CNC加工中心', '数控车床', '五轴加工', '检测设备', '三坐标测量机'],
  openGraph: {
    title: '生产设备 - 明祥精密零件有限公司',
    description: '明祥精密零件拥有先进的加工设备和完善的检测体系。',
  },
};

export default function EquipmentPage() {
  const stats = [
    { number: '100+', label: '加工设备' },
    { number: '50+', label: '检测仪器' },
    { number: '15000', label: '厂房面积(㎡)' },
    { number: '±0.003', label: '最高精度(mm)' },
  ];

  const equipment = [
    {
      title: '五轴联动加工中心',
      brand: '品牌：DMG MORI / 马扎克',
      desc: '可实现复杂曲面的高精度加工，适用于航空、医疗等领域的高难度零件加工。',
      specs: ['工作台尺寸：500×500mm', '主轴转速：18000rpm', '定位精度：±0.003mm', '数量：5台'],
    },
    {
      title: '四轴CNC加工中心',
      brand: '品牌：发那科 / 兄弟机',
      desc: '高效四轴联动加工，适合批量生产，广泛应用于汽车、电子行业零件加工。',
      specs: ['工作台尺寸：400×400mm', '主轴转速：12000rpm', '定位精度：±0.005mm', '数量：25台'],
    },
    {
      title: '三轴CNC加工中心',
      brand: '品牌：海天 / 纽威',
      desc: '通用型三轴加工中心，性价比高，适合各类常规零件的精密加工。',
      specs: ['工作台尺寸：600×400mm', '主轴转速：10000rpm', '定位精度：±0.008mm', '数量：40台'],
    },
    {
      title: '数控车床',
      brand: '品牌：村田 / STAR',
      desc: '精密数控车床，擅长轴类、盘类零件的车削加工，支持棒料自动送料。',
      specs: ['最大加工直径：Φ200mm', '最大加工长度：300mm', '定位精度：±0.005mm', '数量：20台'],
    },
    {
      title: '慢走丝线切割',
      brand: '品牌：沙迪克 / 牧野',
      desc: '高精度电火花线切割，适用于精密模具、硬质材料的精密加工。',
      specs: ['工作行程：400×300mm', '加工精度：±0.003mm', '表面粗糙度：Ra0.2', '数量：8台'],
    },
    {
      title: '精密磨床',
      brand: '品牌：冈本 / 建德',
      desc: '高精度平面磨床和外圆磨床，实现镜面级表面加工。',
      specs: ['工作台尺寸：300×600mm', '加工精度：±0.002mm', '表面粗糙度：Ra0.1', '数量：10台'],
    },
  ];

  const inspection = [
    { icon: '📏', title: '三坐标测量机', desc: '海克斯康/蔡司品牌，测量精度0.001mm', quantity: '数量：3台' },
    { icon: '🔬', title: '投影仪', desc: '二次元影像测量仪，快速检测外形尺寸', quantity: '数量：5台' },
    { icon: '📊', title: '硬度计', desc: '洛氏/维氏硬度计，检测材料硬度', quantity: '数量：4台' },
    { icon: '🔍', title: '粗糙度仪', desc: '表面粗糙度检测，精度Ra0.05', quantity: '数量：6台' },
    { icon: '📐', title: '高度尺/千分尺', desc: '各类精密量具，满足日常检测需求', quantity: '数量：若干' },
    { icon: '🌡️', title: '恒温检测室', desc: '20±1℃恒温环境，确保精密检测', quantity: '面积：50㎡' },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: '/' },
          { name: '生产设备', url: '/equipment' },
        ]}
      />
      <Header />
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>生产设备</h1>
            <p>先进设备，精密加工的有力保障</p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <span className="block text-5xl font-bold text-primary">{stat.number}</span>
                  <span className="text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment List */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="section-header">
              <h2>主要加工设备</h2>
              <p>引进国内外先进加工设备，确保加工精度和效率</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {equipment.map((item, index) => (
                <div key={index} className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="w-56 bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center text-white font-semibold text-center p-4">
                    {item.title}
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-primary text-sm mb-3">{item.brand}</p>
                    <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                    <ul className="space-y-1">
                      {item.specs.map((spec, i) => (
                        <li key={i} className="text-gray-400 text-sm border-b border-dashed border-gray-100 py-1">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspection Equipment */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="section-header">
              <h2>检测设备</h2>
              <p>完善的检测体系，确保产品质量</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {inspection.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                  <span className="inline-block bg-gray-100 px-4 py-1 rounded-full text-primary text-sm">
                    {item.quantity}
                  </span>
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
