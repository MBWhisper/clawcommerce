export default function Testimonials() {
  const testimonials = [
    {
      name: 'سارة الأحمد',
      role: 'صاحبة متجر أزياء سارة',
      location: 'الرياض، السعودية',
      content: 'ClawCommerce غيّرت حياتي! بدأت متجري من الصفر وخلال 6 أشهر فقط وصلت مبيعاتي إلى 500,000 ريال. المنصة سهلة جداً والدعم ممتاز.',
      rating: 5,
      growth: '+320%',
      avatar: '👩‍💼',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'محمد العتيبي',
      role: 'مؤسس متجر تقنية',
      location: 'جدة، السعودية',
      content: 'أفضل قرار اتخذته هو الانتقال إلى ClawCommerce. سرعة الموقع تحسنت 3 أضعاف والمبيعات ارتفعت بشكل ملحوظ.',
      rating: 5,
      growth: '+180%',
      avatar: '👨‍💻',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'نورة السالم',
      role: 'مديرة متجر مستحضرات',
      location: 'دبي، الإمارات',
      content: 'تكامل واتساب مع المتجر ساعدني في زيادة معدل التحويل بنسبة 40%. العملاء يحبون التواصل المباشر.',
      rating: 5,
      growth: '+240%',
      avatar: '👩‍🔬',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'خالد الدوسري',
      role: 'صاحب متجر رياضي',
      location: 'الكويت',
      content: 'لوحة التحكم رائعة وسهلة الاستخدام. أدير متجري بالكامل من تطبيق الجوال حتى وأنا في السفر.',
      rating: 5,
      growth: '+150%',
      avatar: '🏃',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'فاطمة الهاشمي',
      role: 'مؤسسة متجر حلويات',
      location: 'مسقط، عمان',
      content: 'بدأت كهواية والآن لدي فريق من 5 أشخاص! ClawCommerce ساعدتني في التوسع بسهولة.',
      rating: 5,
      growth: '+400%',
      avatar: '👩‍🍳',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'عبدالله المنصور',
      role: 'صاحب متجر عطور',
      location: 'المنامة، البحرين',
      content: 'الدعم الفني سريع جداً ويحل أي مشكلة في دقائق. هذا ما يميز ClawCommerce عن غيرها.',
      rating: 5,
      growth: '+200%',
      avatar: '🧔',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ قصص نجاح
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            ماذا يقول
            <span className="gradient-text"> عملاؤنا؟</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            أكثر من 50,000 تاجر يثقون بـ ClawCommerce لإدارة متاجرهم الإلكترونية
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>

                {/* Growth Badge */}
                <div className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1.5 rounded-full">
                  {testimonial.growth}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '4.9/5', label: 'تقييم المنصة', icon: '⭐' },
              { value: '50,000+', label: 'متجر نشط', icon: '🏪' },
              { value: '99%', label: 'رضا العملاء', icon: '😊' },
              { value: '24/7', label: 'دعم متواصل', icon: '💬' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
