import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const navItems = [
    { href: '/', label: '首页' },
    { href: '/about', label: '关于我们' },
    { href: '/products', label: '产品中心' },
    { href: '/equipment', label: '生产设备' },
    { href: '/news', label: '新闻动态' },
    { href: '/contact', label: '联系我们' },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">明祥</span>
          <span className="logo-text">明祥精密零件有限公司</span>
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-contact">
          <span>📞</span>
          <span>400-888-8888</span>
        </div>
      </div>
    </header>
  );
}
