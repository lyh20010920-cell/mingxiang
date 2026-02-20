import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>明祥精密零件有限公司</h3>
            <p>
              专业零件加工制造商
              <br />
              精密加工 · 品质保障 · 快速交付
            </p>
          </div>
          <div className="footer-section">
            <h3>快速链接</h3>
            <ul>
              <li>
                <Link href="/about">关于我们</Link>
              </li>
              <li>
                <Link href="/products">产品中心</Link>
              </li>
              <li>
                <Link href="/equipment">生产设备</Link>
              </li>
              <li>
                <Link href="/contact">联系我们</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>联系方式</h3>
            <ul className="contact-info">
              <li>📍 江苏省苏州市工业园区XX路XX号</li>
              <li>📞 400-888-8888</li>
              <li>📧 info@mingxiang-parts.com</li>
              <li>🕐 工作时间：周一至周六 8:00-18:00</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 明祥精密零件有限公司 版权所有 | 苏ICP备XXXXXXXX号</p>
        </div>
      </div>
    </footer>
  );
}
