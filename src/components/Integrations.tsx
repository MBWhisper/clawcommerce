export default function Integrations() {
  const categories = [
    {
      title: 'بوابات الدفع',
      description: 'استقبل المدفوعات بسهولة وأمان من جميع الدول العربية',
      icon: '💳',
      color: 'from-blue-500 to-cyan-500',
      integrations: [
        { name: 'مدى', logo: '🏧', popular: true },
        { name: 'Apple Pay', logo: '🍎', popular: true },
        { name: 'STC Pay', logo: '📱', popular: true },
        { name: 'تمارا', logo: '💜', popular: true },
        { name: 'تابي', logo: '💚', popular: false },
        { name: 'فيزا', logo: '💳', popular: false },
        { name: 'ماستركارد', logo: '🔶', popular: false },
        { name: 'PayPal', logo: '🅿️', popular: false },
      ],
    },
    {
      title: 'شركات الشحن',
      description: 'توصيل سريع وموثوق لجميع أنحاء المنطقة العربية',
      icon: '🚚',
      color: 'from-green-500 to-emerald-500',
      integrations: [
        { name: 'أرامكس', logo: '📦', popular: true },
        { name: 'SMSA', logo: '🚛', popular: true },
        { name: 'DHL', logo: '✈️', popular: false },
        { name: 'فيديكس', logo: '📮', popular: false },
        { name: 'ناقل', logo: '🚚', popular: true },
        { name: 'سبل', logo: '📬', popular: false },
        { name: 'زاجل', logo: '🛵', popular: false },
        { name: 'إمسال', logo: '📫', popular: false },
      ],
    },
    {
      title: 'التسويق',
      description: 'أدوات تسويقية قوية لزيادة مبيعاتك ووصولك',
      icon: '📣',
      color: 'from-purple-500 to-pink-500',
      integrations: [
        { name: 'Facebook Pixel', logo: '📘', popular: true },
        { name: 'Google Ads', logo: '🔍', popular: true },
        { name: 'TikTok Pixel', logo: '🎵', popular: true },
        { name: 'Snapchat', logo: '👻', popular: false },
        { name: 'Twitter Ads', logo: '🐦', popular: false },
        { name: 'Mailchimp', logo: '📧', popular: false },
        { name: 'Google Analytics', logo: '📊', popular: true },
        { name: 'Hotjar', logo: '🔥', popular: false },
      ],
    },
    {
      title: 'التواصل',
      description: 'تواصل مع عملائك بطرق متعددة وفعالة',
      icon: '💬',
      color: 'from-orange-500 to-red-500',
      integrations: [
        { name: 'واتساب بزنس', logo: '💬', popular: true },
        { name: 'Telegram', logo: '✈️', popular: false },
        { name: 'SMS', logo: '📱', popular: true },
        { name: 'البريد الإلكتروني', logo: '📧', popular: true },
        { name: 'Zendesk', logo: '💼', popular: false },
        { name: 'Intercom', logo: '💭', popular: false },
        { name: 'Freshdesk', logo: '🎧', popular: false },
        { name: 'LiveChat', logo: '🗨️', popular: false },
      ],
    },
  ];

  return (
    <section id="integrations" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🔗 تكاملات قوية
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            متجرك متصل مع
            <span className="gradient-text"> كل شيء</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            أكثر من 100 تكامل جاهز مع أفضل الخدمات في المنطقة. فعّلها بنقرة واحدة!
          </p>
        </div>

        {/* Integration Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-500 text-sm">{category.description}</p>
                </div>
              </div>

              {/* Integrations Grid */}
              <div className="grid grid-cols-4 gap-3">
                {category.integrations.map((integration, idx) => (
                  <div 
                    key={idx}
                    className="relative group bg-gray-50 hover:bg-orange-50 rounded-xl p-4 text-center transition-all cursor-pointer"
                  >
                    <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">
                      {integration.logo}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">{integration.name}</span>
                    {integration.popular && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[8px]">⭐</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* See All Link */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors flex items-center gap-2">
                  <span>عرض جميع التكاملات</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* API Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🔧 للمطورين
              </span>
              <h3 className="text-3xl font-bold mb-4">API متقدم وموثق بالكامل</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                بنينا API قوي ومرن يمكنك من بناء تكاملات مخصصة، تطبيقات جوال، أو ربط متجرك مع أنظمتك الداخلية.
              </p>
              <div className="flex flex-wrap gap-3">
                {['REST API', 'Webhooks', 'OAuth 2.0', 'SDK'].map((feature, idx) => (
                  <span key={idx} className="bg-white/10 px-4 py-2 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="mr-4">api-example.js</span>
              </div>
              <pre className="text-green-400 overflow-x-auto">
{`// الحصول على الطلبات
const orders = await clawcommerce.orders.list({
  status: 'pending',
  limit: 10
});

// إنشاء منتج جديد
const product = await clawcommerce.products.create({
  name: 'منتج جديد',
  price: 99.99,
  inventory: 100
});`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
