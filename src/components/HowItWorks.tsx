export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'سجّل حسابك مجاناً',
      description: 'أنشئ حسابك في أقل من دقيقة. لا تحتاج بطاقة ائتمان للبدء. فقط أدخل بريدك الإلكتروني وابدأ رحلتك.',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
      features: ['تسجيل فوري', 'بدون بطاقة ائتمان', '14 يوم مجاناً'],
    },
    {
      number: '02',
      title: 'صمم متجرك',
      description: 'اختر من بين أكثر من 100 قالب احترافي أو صمم متجرك من الصفر. خصص الألوان والخطوط والتصميم بسهولة.',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      features: ['100+ قالب جاهز', 'سحب وإفلات', 'تخصيص كامل'],
    },
    {
      number: '03',
      title: 'أضف منتجاتك',
      description: 'أضف منتجاتك بسهولة مع الصور والأسعار والمواصفات. يمكنك استيراد منتجاتك من ملف Excel أو من متجر آخر.',
      icon: '📦',
      color: 'from-green-500 to-emerald-500',
      features: ['رفع سريع', 'استيراد من Excel', 'إدارة المخزون'],
    },
    {
      number: '04',
      title: 'ابدأ البيع!',
      description: 'فعّل بوابات الدفع وشركات الشحن بنقرة واحدة. شارك متجرك مع العالم وابدأ في استقبال الطلبات فوراً.',
      icon: '💰',
      color: 'from-orange-500 to-red-500',
      features: ['20+ بوابة دفع', '15+ شركة شحن', 'تحليلات مباشرة'],
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎯 خطوات بسيطة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            أنشئ متجرك في
            <span className="gradient-text"> 4 خطوات</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            لا تحتاج أي خبرة تقنية. اتبع هذه الخطوات البسيطة وابدأ البيع خلال دقائق
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 -translate-y-1/2 rounded-full opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    {step.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-6 left-6 bg-gray-100 text-gray-400 text-sm font-bold px-3 py-1 rounded-full">
                    الخطوة {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -left-4 w-8 h-8 bg-white rounded-full items-center justify-center shadow-lg z-10 -translate-y-1/2">
                    <svg className="w-4 h-4 text-orange-500 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-100">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">جاهز للبدء؟</p>
              <p className="text-gray-600">أنشئ متجرك في أقل من 5 دقائق</p>
            </div>
            <button className="btn-primary whitespace-nowrap">
              ابدأ الآن مجاناً ←
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
