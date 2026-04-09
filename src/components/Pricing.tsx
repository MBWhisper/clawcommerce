import { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'المبتدئ',
      emoji: '🚀',
      description: 'للبدء في التجارة الإلكترونية',
      monthlyPrice: 99,
      annualPrice: 79,
      popular: false,
      features: ['حتى 100 منتج', 'بوابتين للدفع', '2 شركات شحن', 'شهادة SSL مجانية', 'دعم عبر البريد', 'تقارير أساسية'],
      notIncluded: ['تكامل واتساب', 'تطبيق جوال', 'دعم 24/7'],
      cta: 'ابدأ مجاناً 14 يوم',
    },
    {
      name: 'الاحترافي',
      emoji: '⭐',
      description: 'للمتاجر المتوسطة والنامية',
      monthlyPrice: 249,
      annualPrice: 199,
      popular: true,
      features: ['منتجات غير محدودة', 'جميع بوابات الدفع', 'جميع شركات الشحن', 'تكامل واتساب', 'دعم 24/7', 'تقارير متقدمة', 'كوبونات وخصومات', 'تطبيق جوال'],
      notIncluded: [],
      cta: 'جرب مجاناً 14 يوم',
    },
    {
      name: 'المؤسسي',
      emoji: '🏆',
      description: 'للشركات الكبيرة والمؤسسات',
      monthlyPrice: 599,
      annualPrice: 499,
      popular: false,
      features: ['كل مميزات الاحترافي', 'مدير حساب مخصص', 'API متقدم', 'تقارير مخصصة', 'SLA مضمون', 'تدريب الفريق', 'نطاقات متعددة', 'أولوية في الدعم'],
      notIncluded: [],
      cta: 'تواصل معنا',
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💎 خطط مرنة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            اختر الخطة
            <span className="gradient-text"> المناسبة لك</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ابدأ مجاناً 14 يوم بدون بطاقة ائتمان. يمكنك الترقية في أي وقت.
          </p>

          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            🎁 عرض محدود: وفر 20% على الاشتراك السنوي
          </div>

          <br />
          <div className="inline-flex items-center gap-4 bg-gray-100 p-2 rounded-full">
            <button onClick={() => setIsAnnual(false)} className={`px-6 py-2.5 rounded-full font-semibold transition-all ${!isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`}>
              شهري
            </button>
            <button onClick={() => setIsAnnual(true)} className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'}`}>
              سنوي
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">وفر 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col ${plan.popular ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-2xl shadow-orange-500/30 scale-105 z-10' : 'bg-white border border-gray-200 hover:border-orange-200 hover:shadow-xl'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  ⭐ الأكثر شعبية
                </div>
              )}

              <div className="mb-6">
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={plan.popular ? 'text-white/80' : 'text-gray-500'}>{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={plan.popular ? 'text-white/80' : 'text-gray-500'}>ر.س / شهرياً</span>
                </div>
                {isAnnual && (
                  <p className={`text-sm mt-1 ${plan.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    يُدفع سنوياً ({plan.annualPrice * 12} ر.س)
                    <span className={`mr-2 line-through ${plan.popular ? 'text-white/40' : 'text-gray-300'}`}>{plan.monthlyPrice * 12} ر.س</span>
                  </p>
                )}
              </div>

              <a href="/register" className={`block w-full py-4 rounded-full font-bold transition-all text-center mb-8 ${plan.popular ? 'bg-white text-orange-600 hover:bg-gray-100' : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5'}`}>
                {plan.cta}
              </a>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-green-100'}`}>
                      <svg className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 opacity-40">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-400 line-through">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '🔒', title: 'دفع آمن 100%', desc: 'SSL وتشفير كامل' },
            { icon: '↩️', title: 'ضمان 30 يوم', desc: 'استرداد كامل بدون أسئلة' },
            { icon: '🆓', title: '14 يوم مجاناً', desc: 'بدون بطاقة ائتمان' },
            { icon: '📞', title: 'دعم عربي', desc: 'متاح 24/7 طوال الأسبوع' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{item.title}</div>
              <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-3xl p-8 text-center">
          <p className="text-gray-700 text-lg mb-4">
            انضم لأكثر من <span className="font-black text-orange-600 text-2xl">50,000</span> تاجر ناجح يثقون بـ ClawCommerce
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-6">
            <span>⭐ تقييم 4.9 من 5</span>
            <span>•</span>
            <span>💰 أكثر من 2 مليار ريال مبيعات</span>
            <span>•</span>
            <span>🏆 أفضل منصة تجارة عربية 2024</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3 space-x-reverse">
              {['س', 'أ', 'ف', 'خ', 'ن'].map((letter, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">+49,995 تاجر نشط</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            لديك سؤال؟{' '}
            <a href="#contact" className="text-orange-500 font-semibold hover:underline">تحدث مع فريقنا</a>
            {' '}أو اطلع على{' '}
            <a href="#faq" className="text-orange-500 font-semibold hover:underline">الأسئلة الشائعة</a>
          </p>
        </div>
      </div>
    </section>
  );
}
