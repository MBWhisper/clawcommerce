export default function Footer() {
  const footerLinks = {
    المنتج: [
      { label: 'المميزات', href: '#features' },
      { label: 'الأسعار', href: '#pricing' },
      { label: 'القوالب', href: '#' },
      { label: 'التكاملات', href: '#' },
      { label: 'تطبيق الجوال', href: '#' },
    ],
    الشركة: [
      { label: 'من نحن', href: '#' },
      { label: 'المدونة', href: '#' },
      { label: 'وظائف', href: '#' },
      { label: 'الشركاء', href: '#' },
      { label: 'اتصل بنا', href: '#' },
    ],
    الدعم: [
      { label: 'مركز المساعدة', href: '#' },
      { label: 'الأسئلة الشائعة', href: '#faq' },
      { label: 'فيديوهات تعليمية', href: '#' },
      { label: 'حالة الخدمة', href: '#' },
      { label: 'API للمطورين', href: '#' },
    ],
    القانونية: [
      { label: 'سياسة الخصوصية', href: '#' },
      { label: 'شروط الاستخدام', href: '#' },
      { label: 'سياسة الاسترداد', href: '#' },
      { label: 'اتفاقية المستخدم', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'تويتر', icon: '𝕏', href: '#' },
    { name: 'انستغرام', icon: '📸', href: '#' },
    { name: 'يوتيوب', icon: '▶️', href: '#' },
    { name: 'لينكدإن', icon: '💼', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black">ClawCommerce</span>
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              منصة التجارة الإلكترونية الأولى في الوطن العربي. 
              نساعدك على إنشاء متجرك الإلكتروني وتنمية مبيعاتك بسهولة.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">اشترك في نشرتنا البريدية</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
                  اشترك
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ClawCommerce. جميع الحقوق محفوظة.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">طرق الدفع:</span>
              <div className="flex gap-2">
                {['💳', '🍎', '📱', '💰'].map((icon, index) => (
                  <span key={index} className="text-xl">{icon}</span>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>🌍</span>
              <span>العربية</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
