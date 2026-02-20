import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/SchemaScript';

export const metadata: Metadata = {
  title: '新闻动态',
  description: '了解明祥精密零件有限公司的最新新闻、行业动态和技术文章。获取精密加工行业的最新资讯。',
  keywords: ['公司新闻', '行业动态', '技术文章', '精密加工资讯', '明祥新闻'],
  openGraph: {
    title: '新闻动态 - 明祥精密零件有限公司',
    description: '了解明祥精密零件有限公司的最新新闻、行业动态和技术文章。',
  },
};

export default function NewsPage() {
  const news = [
    {
      date: '15',
      month: '2026-02',
      tag: '公司新闻',
      title: '公司新引进五轴加工中心，精密加工能力再上新台阶',
      desc: '为进一步提升精密加工能力，满足航空航天、医疗器械等高端领域客户的加工需求，公司近期引进了最新型号的五轴联动加工中心。该设备可实现复杂曲面的高精度加工，定位精度达到±0.003mm，将大大提升公司的核心竞争力...',
      author: '技术部',
      views: 328,
    },
    {
      date: '08',
      month: '2026-02',
      tag: '公司新闻',
      title: '明祥精密零件荣获某知名汽车厂商"年度优秀供应商"称号',
      desc: '凭借优质的产品质量、准时的交付能力和完善的售后服务，明祥精密零件有限公司在众多供应商中脱颖而出，荣获某知名汽车厂商颁发的"2025年度优秀供应商"称号。这是对我们团队努力的肯定，也是对我们品质的认可...',
      author: '市场部',
      views: 256,
    },
    {
      date: '20',
      month: '2026-01',
      tag: '公司新闻',
      title: '2026年度企业发展规划发布',
      desc: '新的一年，公司制定了新的发展战略：继续加大设备投入，计划新增10台CNC加工中心；拓展医疗、航空等高精尖领域业务；推进数字化工厂建设；提升员工技能培训。我们将以更高的标准为客户提供优质服务...',
      author: '行政部',
      views: 189,
    },
    {
      date: '15',
      month: '2026-01',
      tag: '行业动态',
      title: '2026年中国精密加工行业发展趋势分析',
      desc: '随着制造业转型升级的深入推进，精密加工行业正迎来新的发展机遇。智能制造、自动化生产、绿色制造成为行业发展关键词。预计未来五年，高端精密加工市场将保持10%以上的年均增长率...',
      author: '行业研究',
      views: 445,
    },
    {
      date: '05',
      month: '2026-01',
      tag: '技术文章',
      title: 'CNC加工中常见问题及解决方案',
      desc: '在CNC精密加工过程中，经常会遇到一些常见问题，如加工精度不达标、表面粗糙度差、刀具磨损快等。本文将从实际生产经验出发，分析这些问题的成因，并提供相应的解决方案...',
      author: '技术部',
      views: 567,
    },
    {
      date: '25',
      month: '2025-12',
      tag: '技术文章',
      title: '医疗器械零件加工的特殊要求与工艺要点',
      desc: '医疗器械零件对材料、精度、表面质量都有严格要求。本文详细介绍医疗器械零件加工的行业标准、材料选择、加工工艺、表面处理及检验要求...',
      author: '技术部',
      views: 389,
    },
    {
      date: '18',
      month: '2025-12',
      tag: '公司新闻',
      title: '公司成功举办2025年度总结表彰大会',
      desc: '12月18日，明祥精密零件有限公司2025年度总结表彰大会在公司会议室隆重举行。大会回顾了过去一年的成绩，表彰了优秀员工和团队，并对新的一年工作进行了部署...',
      author: '行政部',
      views: 234,
    },
    {
      date: '10',
      month: '2025-12',
      tag: '行业动态',
      title: '新能源汽车产业蓬勃发展，带动精密加工需求增长',
      desc: '随着新能源汽车市场的快速增长，汽车零部件的精密加工需求也随之上升。电机零件、电池结构件、电控系统零件等都需要高精度加工。精密加工企业正积极布局新能源领域...',
      author: '行业研究',
      views: 312,
    },
  ];

  const tags = ['全部', '公司新闻', '行业动态', '技术文章'];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: '/' },
          { name: '新闻动态', url: '/news' },
        ]}
      />
      <Header />
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>新闻动态</h1>
            <p>了解明祥最新资讯与技术动态</p>
          </div>
        </section>

        {/* News Filter */}
        <section className="py-8 bg-white">
          <div className="container">
            <div className="flex justify-center gap-4 flex-wrap">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full border-2 border-primary ${
                    index === 0 ? 'bg-primary text-white' : 'bg-white text-primary'
                  } transition-colors hover:bg-primary hover:text-white`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="space-y-6">
              {news.map((item, index) => (
                <article key={index} className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:translate-x-2">
                  <div className="w-24 bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center text-white p-4 flex-shrink-0">
                    <span className="text-4xl font-bold leading-none">{item.date}</span>
                    <span className="text-sm opacity-90">{item.month}</span>
                  </div>
                  <div className="flex-1 p-6">
                    <span className="inline-block bg-gray-100 text-primary px-3 py-1 rounded-full text-xs mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.desc}</p>
                    <div className="flex gap-6 text-gray-400 text-sm">
                      <span>作者：{item.author}</span>
                      <span>阅读：{item.views}次</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-12">
              <span className="w-10 h-10 flex items-center justify-center rounded bg-primary text-white">1</span>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                2
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                3
              </a>
              <a href="#" className="px-4 h-10 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                下一页 →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
