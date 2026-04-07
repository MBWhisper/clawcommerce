export default function Blog() {
  const articles = [
    {
      title: '10 استراتيجيات لزيادة مبيعات متجرك الإلكتروني في 2024',
      excerpt: 'تعرف على أفضل الاستراتيجيات المجربة لزيادة مبيعاتك وتحسين معدل التحويل في متجرك الإلكتروني.',
      category: 'التسويق',
      readTime: '8 دقائق',
      date: '15 يناير 2024',
      image: '📈',
      color: 'from-blue-500 to-cyan-500',
      featured: true,
    },
    {
      title: 'دليلك الشامل لاختيار شركة الشحن المناسبة',
      excerpt: 'مقارنة شاملة بين أفضل شركات الشحن في المنطقة العربية وكيفية اختيار الأنسب لمتجرك.',
      category: 'الشحن',
      readTime: '6 دقائق',
      date: '12 يناير 2024',
      image: '📦',
      color: 'from-green-500 to-emerald-500',
      featured: false,
    },
    {
      title: 'كيف تبني علامة تجارية قوية لمتجرك الإلكتروني',
      excerpt: 'خطوات عملية لبناء هوية بصرية مميزة وعلامة تجارية تبقى في أذهان عملائك.',
      category: 'العلامة التجارية',
      readTime: '10 دقائق',
      date: '10 يناير 2024',
      image: '🎨',
      color: 'from-purple-500 to-pink-500',
      featured: false,
    },
    {
      title: 'أفضل طرق الدفع الإلكتروني في السعودية 2024',
      excerpt: 'دليل شامل لبوابات الدفع المتاحة في المملكة وكيفية تفعيلها في متجرك.',
      category: 'المدفوعات',
      readTime: '7 دقائق',
      date: '8 يناير 2024',
      image: '💳',
      color: 'from-orange-500 to-red-500',
      featured: false,
    },
    {
      title: 'تحسين ظهور متجرك في محركات البحث (SEO)',
      excerpt: 'نصائح وحيل لتحسين ترتيب متجرك في نتائج البحث وجلب المزيد من الزوار.',
      category: 'SEO',
      readTime: '12 دقائق',
      date: '5 يناير 2024',
      image: '🔍',
      color: 'from-yellow-500 to-orange-500',
      featured: false,
    },
    {
      title: 'استخدام الذكاء الاصطناعي في التجارة الإلكترونية',
      excerpt: 'كيف يمكن للذكاء الاصطناعي تحسين تجربة العملاء وزيادة المبيعات.',
      category: 'التكنولوجيا',
      readTime: '9 دقائق',
      date: '3 يناير 2024',
      image: '🤖',
      color: 'from-indigo-500 to-purple-500',
      featured: false,
    },
  ];

  const categories = [
    { name: 'الكل', count: 48 },
    { name: 'التسويق', count: 15 },
    { name: 'الشحن', count: 8 },
    { name: 'المدفوعات', count: 10 },
    { name: 'SEO', count: 7 },
    { name: 'التكنولوجيا', count: 8 },
  ];

  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            📚 المدونة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            مقالات ونصائح
            <span className="gradient-text"> لنجاح متجرك</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف أحدث المقالات والنصائح والاستراتيجيات لتنمية متجرك الإلكتروني
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                index === 0
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
              }`}
            >
              {category.name}
              <span className={`mr-2 text-sm ${index === 0 ? 'text-white/80' : 'text-gray-400'}`}>
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          {articles.filter(a => a.featured).map((article, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group cursor-pointer">
              <div className="grid lg:grid-cols-2">
                <div className={`bg-gradient-to-br ${article.color} p-12 flex items-center justify-center`}>
                  <span className="text-[120px] group-hover:scale-110 transition-transform">{article.image}</span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="text-gray-400 text-sm">{article.date}</span>
                    <span className="text-gray-400 text-sm">• {article.readTime} قراءة</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-semibold group/link">
                    <span>اقرأ المقال كاملاً</span>
                    <svg className="w-5 h-5 rotate-180 group-hover/link:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.filter(a => !a.featured).map((article, index) => (
            <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer">
              <div className={`bg-gradient-to-br ${article.color} p-8 flex items-center justify-center`}>
                <span className="text-6xl group-hover:scale-110 transition-transform">{article.image}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.readTime} قراءة</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <a href="#" className="text-orange-600 text-sm font-semibold hover:text-orange-700">
                    اقرأ المزيد ←
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary inline-flex items-center gap-2">
            <span>عرض جميع المقالات</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
