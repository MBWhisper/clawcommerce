export default function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />
      
      {/* Floating Elements */}
      <div className="absolute top-40 left-20 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl rotate-12 opacity-20 animate-float hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 right-40 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl opacity-20 animate-float hidden lg:block" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 animate-slide-up">
              <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
              🎉 أكثر من 50,000 متجر نشط
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 leading-tight animate-slide-up stagger-1">
              أنشئ متجرك
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                الإلكتروني الآن
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-2">
              منصة ClawCommerce تمنحك كل الأدوات التي تحتاجها لبناء متجر إلكتروني احترافي، 
              إدارة المنتجات، استقبال المدفوعات، وتنمية مبيعاتك - بدون أي خبرة تقنية.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10 animate-slide-up stagger-3">
              <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 group">
                <span>ابدأ تجربتك المجانية</span>
                <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>شاهد الفيديو</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 animate-slide-up stagger-4">
              {[
                { icon: '✓', text: '14 يوم تجربة مجانية' },
                { icon: '✓', text: 'بدون بطاقة ائتمان' },
                { icon: '✓', text: 'دعم عربي 24/7' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative animate-slide-up stagger-5">
            <div className="relative z-10">
              {/* Main Dashboard */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-2 border border-gray-100">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex-1 bg-gray-700/50 rounded-lg px-4 py-1.5 text-gray-400 text-xs text-center">
                      dashboard.clawcommerce.com
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">مرحباً، سارة 👋</h3>
                        <p className="text-sm text-gray-500">متجر "أزياء سارة" يعمل بشكل ممتاز</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        متجرك نشط
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: 'المبيعات اليوم', value: '٢٤,٥٠٠ ر.س', change: '+٢٣٪', color: 'green', icon: '💰' },
                        { label: 'طلبات جديدة', value: '٨٦', change: '+١٢٪', color: 'blue', icon: '📦' },
                        { label: 'زوار الموقع', value: '٢,٤٥٠', change: '+٤٥٪', color: 'purple', icon: '👥' },
                      ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className={`text-xs font-semibold text-${stat.color}-600 bg-${stat.color}-50 px-2 py-0.5 rounded-full`}>
                              {stat.change}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-700">📈 المبيعات الأسبوعية</span>
                        <span className="text-xs text-gray-400">آخر 7 أيام</span>
                      </div>
                      <div className="h-32 flex items-end gap-2">
                        {[45, 65, 55, 80, 70, 90, 85].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                              className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-t-lg transition-all hover:from-orange-600 hover:to-red-500"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-[10px] text-gray-400">
                              {['سبت', 'أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">طلب جديد! 🎉</div>
                    <div className="text-xs text-gray-500">منتج × ٣ - ٤٥٠ ر.س</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-32 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float hidden md:block" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                    ⭐
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">تقييم جديد</div>
                    <div className="text-xs text-gray-500">★★★★★ (5/5)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
