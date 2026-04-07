import { useState } from 'react';

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: 'متجر أزياء لمسة',
      owner: 'نورة الحربي',
      location: 'الرياض، السعودية',
      category: 'أزياء وموضة',
      avatar: '👗',
      color: 'from-pink-500 to-rose-500',
      heroImage: '🛍️',
      stats: {
        revenue: '2.5 مليون ريال',
        growth: '+450%',
        orders: '15,000+',
        customers: '8,000+',
      },
      story: 'بدأت نورة متجرها من غرفتها كهواية لبيع الإكسسوارات اليدوية. بعد انضمامها لـ ClawCommerce، تحول المشروع إلى علامة تجارية معروفة بمبيعات تتجاوز 2.5 مليون ريال سنوياً.',
      quote: 'ClawCommerce أعطتني الأدوات التي احتاجها للتحول من هاوية إلى صاحبة عمل ناجح. الدعم الفني والتدريب كانا عاملين حاسمين في نجاحي.',
      timeline: [
        { date: 'يناير 2022', event: 'بداية المتجر' },
        { date: 'مارس 2022', event: 'أول 100 طلب' },
        { date: 'أغسطس 2022', event: 'توظيف أول موظفة' },
        { date: 'يناير 2023', event: '1 مليون ريال مبيعات' },
        { date: 'ديسمبر 2023', event: 'فتح معرض فعلي' },
      ],
    },
    {
      id: 2,
      name: 'تقنية بلس',
      owner: 'فهد الشمري',
      location: 'جدة، السعودية',
      category: 'إلكترونيات',
      avatar: '💻',
      color: 'from-blue-500 to-cyan-500',
      heroImage: '📱',
      stats: {
        revenue: '5 مليون ريال',
        growth: '+320%',
        orders: '25,000+',
        customers: '12,000+',
      },
      story: 'فهد كان يبيع الإلكترونيات عبر انستغرام فقط. بعد بناء متجره على ClawCommerce مع تكامل جميع بوابات الدفع، ارتفعت مبيعاته 3 أضعاف خلال عام واحد.',
      quote: 'الميزة الأهم كانت تكامل واتساب. العملاء يحبون التواصل المباشر وهذا رفع معدل التحويل لدينا بنسبة 40%.',
      timeline: [
        { date: 'مارس 2021', event: 'إطلاق المتجر' },
        { date: 'يونيو 2021', event: 'أول 500 طلب' },
        { date: 'نوفمبر 2021', event: 'توسيع المخزون' },
        { date: 'مايو 2022', event: '3 مليون مبيعات' },
        { date: 'أكتوبر 2023', event: 'فتح فرع ثاني' },
      ],
    },
    {
      id: 3,
      name: 'حلويات السعادة',
      owner: 'أمل العنزي',
      location: 'الكويت',
      category: 'طعام وحلويات',
      avatar: '🍰',
      color: 'from-yellow-500 to-orange-500',
      heroImage: '🎂',
      stats: {
        revenue: '800 ألف دينار',
        growth: '+280%',
        orders: '20,000+',
        customers: '15,000+',
      },
      story: 'أمل حولت شغفها بالحلويات إلى مشروع ناجح. باستخدام نظام الطلبات المسبقة في ClawCommerce، تدير الآن مطبخاً بفريق من 8 أشخاص.',
      quote: 'نظام إدارة الطلبات غيّر طريقة عملي بالكامل. الآن أستطيع تخطيط إنتاجي مسبقاً وتجنب الهدر.',
      timeline: [
        { date: 'يونيو 2020', event: 'بداية من المطبخ المنزلي' },
        { date: 'ديسمبر 2020', event: 'إطلاق المتجر الإلكتروني' },
        { date: 'يوليو 2021', event: 'استئجار مطبخ تجاري' },
        { date: 'فبراير 2022', event: 'توظيف فريق' },
        { date: 'أغسطس 2023', event: 'افتتاح محل' },
      ],
    },
  ];

  const currentStory = stories[activeStory];

  return (
    <section id="success-stories" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🏆 قصص نجاح حقيقية
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            من الفكرة إلى
            <span className="gradient-text"> النجاح الباهر</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تعرف على قصص رواد أعمال حقيقيين بنوا متاجر ناجحة مع ClawCommerce
          </p>
        </div>

        {/* Story Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(index)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                activeStory === index
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-200 hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${story.color} rounded-xl flex items-center justify-center text-2xl ${activeStory === index ? 'opacity-100' : 'opacity-80'}`}>
                {story.avatar}
              </div>
              <div className="text-right">
                <div className="font-bold">{story.name}</div>
                <div className={`text-sm ${activeStory === index ? 'text-white/80' : 'text-gray-500'}`}>
                  {story.category}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Story Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Story Content */}
            <div className="p-8 lg:p-12">
              {/* Owner Info */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${currentStory.color} rounded-2xl flex items-center justify-center text-3xl`}>
                  {currentStory.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentStory.name}</h3>
                  <p className="text-gray-600">{currentStory.owner} • {currentStory.location}</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {currentStory.story}
              </p>

              {/* Quote */}
              <blockquote className="bg-orange-50 border-r-4 border-orange-500 p-6 rounded-xl mb-8">
                <p className="text-gray-700 italic mb-4">"{currentStory.quote}"</p>
                <footer className="text-orange-600 font-semibold">— {currentStory.owner}</footer>
              </blockquote>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'الإيرادات السنوية', value: currentStory.stats.revenue, icon: '💰' },
                  { label: 'معدل النمو', value: currentStory.stats.growth, icon: '📈' },
                  { label: 'عدد الطلبات', value: currentStory.stats.orders, icon: '📦' },
                  { label: 'العملاء', value: currentStory.stats.customers, icon: '👥' },
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline & Visual */}
            <div className={`bg-gradient-to-br ${currentStory.color} p-8 lg:p-12 text-white`}>
              {/* Hero Image */}
              <div className="text-center mb-12">
                <span className="text-[100px]">{currentStory.heroImage}</span>
              </div>

              {/* Timeline */}
              <h4 className="text-xl font-bold mb-6">رحلة النجاح</h4>
              <div className="space-y-4">
                {currentStory.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-white/70 text-sm">{item.date}</span>
                      <p className="font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full mt-8 bg-white text-gray-900 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                ابدأ قصة نجاحك الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
