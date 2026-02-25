import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mingxiang-parts.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '明祥精密零件有限公司 - 专业精密零件加工制造商',
    template: '%s | 明祥精密零件',
  },
  description: '明祥精密零件有限公司是一家专业的精密零件加工制造商，提供CNC精密加工、数控车削、钣金加工等服务。服务于汽车、电子、医疗、航空航天等行业。',
  keywords: ['精密零件加工', 'CNC加工', '数控车削', '钣金加工', '零件制造商', '苏州机械加工', '明祥精密零件'],
  authors: [{ name: '明祥精密零件有限公司' }],
  creator: '明祥精密零件有限公司',
  publisher: '明祥精密零件有限公司',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    siteName: '明祥精密零件有限公司',
    title: '明祥精密零件有限公司 - 专业精密零件加工制造商',
    description: '明祥精密零件有限公司是一家专业的精密零件加工制造商，提供CNC精密加工、数控车削、钣金加工等服务。',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: '明祥精密零件有限公司',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '明祥精密零件有限公司 - 专业精密零件加工制造商',
    description: '明祥精密零件有限公司是一家专业的精密零件加工制造商，提供CNC精密加工、数控车削、钣金加工等服务。',
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
