'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PageComponent {
  componentType: string;
  title: string;
  content: Record<string, any>;
  isVisible: boolean;
}

// Hero Component
function HeroComponent({ title, subtitle, button1, button2, backgroundImage }: any) {
  return (
    <section 
      className="hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="hero-buttons">
          {button1 && <Link href="/products" className="btn btn-primary">{button1}</Link>}
          {button2 && <Link href="/contact" className="btn btn-outline">{button2}</Link>}
        </div>
      </div>
    </section>
  );
}

// Stats Component
function StatsComponent({ items }: any) {
  if (!items) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
              <span className="block text-4xl font-bold text-primary mb-2">{item.value}</span>
              <span className="text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Component
function ServicesComponent({ title, subtitle, items }: any) {
  if (!items) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Component
function ProductsComponent({ title, subtitle, items }: any) {
  if (!items) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-gradient-to-br from-primary-light to-primary-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 flex items-center justify-center text-white font-semibold text-lg bg-gray-200">
                {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : item.title}
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="btn btn-primary">查看更多产品</Link>
        </div>
      </div>
    </section>
  );
}

// Advantages Component
function AdvantagesComponent({ title, subtitle, items }: any) {
  if (!items) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// News Component
function NewsComponent({ title, subtitle, items }: any) {
  if (!items) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center flex-shrink-0">
                <span className="block text-3xl font-bold text-primary">{item.date}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Intro Component
function IntroComponent({ title, content }: any) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
            {content && <p className="text-gray-600 mb-4 leading-relaxed">{content}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

// Banner Component
function BannerComponent({ title, subtitle }: any) {
  return (
    <section className="page-banner">
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  hero: HeroComponent,
  stats: StatsComponent,
  services: ServicesComponent,
  products: ProductsComponent,
  advantages: AdvantagesComponent,
  news: NewsComponent,
  intro: IntroComponent,
  banner: BannerComponent,
};

interface DynamicPageProps {
  pageSlug: string;
}

export default function DynamicPage({ pageSlug }: DynamicPageProps) {
  const [components, setComponents] = useState<PageComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await fetch(`/api/pages?page=${pageSlug}`, { credentials: 'include' });
        const data = await res.json();
        
        if (data.components) {
          setComponents(data.components.map((c: any) => ({
            componentType: c.component_type,
            title: c.title,
            content: c.content,
            isVisible: c.is_visible,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch components', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [pageSlug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  // If no components configured, return null (page will use default static content)
  if (components.length === 0) {
    return null;
  }

  return (
    <main>
      {components
        .filter(comp => comp.isVisible)
        .map((comp, index) => {
          const Component = COMPONENT_MAP[comp.componentType];
          if (!Component) return null;
          
          return (
            <Component
              key={index}
              title={comp.title}
              {...comp.content}
            />
          );
        })}
    </main>
  );
}
