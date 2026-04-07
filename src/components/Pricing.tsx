import { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'المبتدئ',
      description: 'مثالي للبدء في التجارة الإلكترونية',
      monthlyPrice: 99,
      annualPrice: 79,
      popular: false,
      features: [
        'حتى 100 منتج',
        'بوابتين للدفع',
        '2 شركات شحن',
        'شهادة SSL مجانية',
        'دعم عبر البريد',
        'تقارير أساسية',
      ],
      cta: 'ابدأ مجاناً',
      color: 'gray',
    },
    {
      name: 'الاحترافي',
      description: 'للمتاجر المتوسطة والنامية',
      monthlyPrice: 249,
      annualPrice: 199,
      popular: true,
      features: [
        'منتجات غير محدودة',
        'جميع بوابات الدفع',
        'جميع شركات الشحن',
        'تكامل واتساب',
        'دعم 24/7',
        'تقارير متقدمة',
        'كوبونات وخصومات',
        'تطبيق جوال',
      ],
      cta: 'جرب 14 يوم مجاناً',
      color: 'orange',
    },
    {
      name: 'المؤسسي',
      description: 'للشركات الكبيرة والمؤسسات',
      monthlyPrice: 599,
      annualPrice: 499,
      popular: false,
      features: [
        'كل مميزات الاحترافي',
        'مدير حساب مخصص',
        'API متقدم',
        'تقارير مخصصة',
        'SLA مضمون',
        'تدريب الفريق',
        'نطاقات متعددة',
        'أولوية في الدعم',
      ],
      cta: 'تواصل معنا',
      color: 'gray',
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💎 خطط مرنة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            اختر الخطة
            <span className="gradient-text"> المناسبة لك</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            ابدأ مجاناً واختر الخطة التي تناسب حجم أعمالك. يمكنك الترقية في أي وقت.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 bg-gray-100 p-2 rounded-full">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                !isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500'
              }`}
            >
              سنوي
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                وفر 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-2xl shadow-orange-500/30 scale-105 z-10'
                  : 'bg-white border border-gray-200 hover:border-orange-200 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full">
                  ⭐ الأكثر شعبية
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    ر.س / شهرياً
                  </span>
                </div>
                {isAnnual && (
                  <p className={`text-sm mt-2 ${plan.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    يُدفع سنوياً ({(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12} ر.س)
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-white/20' : 'bg-green-100'
                    }`}>
                      <svg className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-full font-bold transition-all ${
                  plan.popular
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            جميع الخطط تشمل: شهادة SSL مجانية، نسخ احتياطي يومي، وضمان استرداد المال خلال 30 يوم
          </p>
        </div>
      </div>
    </section>
  );
}
