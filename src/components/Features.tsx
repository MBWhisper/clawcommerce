export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'متجر احترافي جاهز',
      description: 'اختر من بين أكثر من 100 قالب احترافي مُصمم خصيصاً للسوق العربي مع دعم كامل للغة العربية.',
      color: 'orange',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'بوابات دفع متعددة',
      description: 'تكامل مع أكثر من 20 بوابة دفع محلية وعالمية: مدى، Apple Pay، تمارا، تابي، STC Pay.',
      color: 'blue',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'شحن ذكي ومتكامل',
      description: 'ربط تلقائي مع أرامكس، SMSA، DHL، فيديكس وغيرها. تتبع الشحنات وحساب التكلفة تلقائياً.',
      color: 'green',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'تحليلات متقدمة',
      description: 'لوحة تحكم ذكية مع تقارير مفصلة عن المبيعات، العملاء، المخزون، والأداء التسويقي.',
      color: 'purple',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'تطبيق جوال مجاني',
      description: 'أدر متجرك من أي مكان عبر تطبيق الجوال. إشعارات فورية للطلبات والمبيعات.',
      color: 'pink',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'تكامل واتساب',
      description: 'إرسال تأكيدات الطلبات، تحديثات الشحن، والعروض مباشرة عبر واتساب للعملاء.',
      color: 'emerald',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'تحسين محركات البحث',
      description: 'أدوات SEO مدمجة لتحسين ظهور متجرك في نتائج البحث وجلب المزيد من العملاء.',
      color: 'yellow',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'حماية وأمان كامل',
      description: 'شهادة SSL مجانية، حماية من الاحتيال، نسخ احتياطي يومي، وامتثال PCI DSS.',
      color: 'red',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; gradient: string }> = {
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-500 to-red-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
    green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-500 to-emerald-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', gradient: 'from-pink-500 to-rose-500' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', gradient: 'from-yellow-500 to-orange-500' },
    red: { bg: 'bg-red-100', text: 'text-red-600', gradient: 'from-red-500 to-pink-500' },
  };

  return (
    <section id="features" className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ مميزات قوية
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            كل ما تحتاجه في
            <span className="gradient-text"> مكان واحد</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            منصة متكاملة توفر لك جميع الأدوات والمميزات التي تحتاجها لإدارة متجرك الإلكتروني باحترافية
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 card-hover"
            >
              <div className={`w-14 h-14 ${colorClasses[feature.color].bg} ${colorClasses[feature.color].text} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a href="#pricing" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
            <span>اكتشف جميع المميزات</span>
            <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
