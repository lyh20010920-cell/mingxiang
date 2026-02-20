const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mingxiang-parts.com';

// LocalBusiness Schema.org 结构化数据
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteUrl,
  name: '明祥精密零件有限公司',
  alternateName: 'Mingxiang Precision Parts Co., Ltd.',
  description: '明祥精密零件有限公司是一家专业的精密零件加工制造商，提供CNC精密加工、数控车削、钣金加工等服务。',
  url: siteUrl,
  telephone: '+86-400-888-8888',
  email: 'info@mingxiang-parts.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '工业园区XX路XX号',
    addressLocality: '苏州市',
    addressRegion: '江苏省',
    postalCode: '215000',
    addressCountry: 'CN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.2989,
    longitude: 120.5853,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  image: `${siteUrl}/og-image.png`,
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '精密零件加工服务',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CNC精密加工',
          description: '三轴、四轴、五轴CNC加工中心，精度可达±0.005mm',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '数控车削加工',
          description: '各类轴类、盘类零件的车削加工',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '钣金加工',
          description: '激光切割、折弯、焊接等一站式钣金服务',
        },
      },
    ],
  },
};

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '明祥精密零件有限公司',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-400-888-8888',
    contactType: 'customer service',
    availableLanguage: ['Chinese', 'English'],
  },
  sameAs: [],
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '明祥精密零件有限公司',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function SchemaScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([localBusinessSchema, organizationSchema, websiteSchema]),
      }}
    />
  );
}

// 用于其他页面的 Schema 组件
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
