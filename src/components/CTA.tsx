export default function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          🎁 عرض خاص: خصم 30% على الاشتراك السنوي
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          جاهز لبدء
          <br />
          رحلة نجاحك؟
        </h2>

        {/* Description */}
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          انضم لأكثر من 50,000 تاجر ناجح يثقون بـ ClawCommerce. 
          ابدأ تجربتك المجانية الآن واحصل على كل الأدوات التي تحتاجها.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="/register" className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 group">
            <span>ابدأ تجربتك المجانية</span>
            <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all flex items-center gap-3 border border-white/30">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>شاهد العرض التوضيحي</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
          {[
            { icon: '✓', text: '14 يوم تجربة مجانية' },
            { icon: '✓', text: 'بدون بطاقة ائتمان' },
            { icon: '✓', text: 'إلغاء في أي وقت' },
            { icon: '✓', text: 'ضمان استرداد 30 يوم' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50,000+', label: 'متجر نشط' },
            { value: '2 مليار+', label: 'ريال مبيعات' },
            { value: '99%', label: 'رضا العملاء' },
            { value: '4.9/5', label: 'تقييم المنصة' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
