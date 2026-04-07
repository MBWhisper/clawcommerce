export default function About() {
  const team = [
    {
      name: 'أحمد الراشد',
      role: 'المؤسس والرئيس التنفيذي',
      bio: 'خبرة 15 عاماً في التجارة الإلكترونية',
      avatar: '👨‍💼',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'سارة المالكي',
      role: 'مديرة المنتج',
      bio: 'قادت تطوير أكثر من 50 منتج رقمي',
      avatar: '👩‍💻',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'محمد الغامدي',
      role: 'رئيس الهندسة',
      bio: 'خبير في بناء منصات قابلة للتوسع',
      avatar: '👨‍🔧',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'نورة العتيبي',
      role: 'مديرة نجاح العملاء',
      bio: 'ساعدت آلاف التجار في النمو',
      avatar: '👩‍🎓',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'التركيز على العميل',
      description: 'نضع نجاح عملائنا في صدارة أولوياتنا',
    },
    {
      icon: '💡',
      title: 'الابتكار المستمر',
      description: 'نطور منصتنا باستمرار بأحدث التقنيات',
    },
    {
      icon: '🤝',
      title: 'الشراكة الحقيقية',
      description: 'نعمل مع عملائنا كشركاء في النجاح',
    },
    {
      icon: '🌟',
      title: 'التميز في الخدمة',
      description: 'نقدم دعماً استثنائياً على مدار الساعة',
    },
  ];

  const milestones = [
    { year: '2019', event: 'تأسيس ClawCommerce في الرياض', icon: '🚀' },
    { year: '2020', event: 'إطلاق المنصة رسمياً مع 500 متجر', icon: '🎉' },
    { year: '2021', event: 'تجاوز 10,000 متجر نشط', icon: '📈' },
    { year: '2022', event: 'التوسع إلى الإمارات والكويت', icon: '🌍' },
    { year: '2023', event: 'إطلاق تطبيق الجوال الرسمي', icon: '📱' },
    { year: '2024', event: 'تجاوز 50,000 متجر في 8 دول', icon: '🏆' },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🏢 من نحن
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            نبني مستقبل
            <span className="gradient-text"> التجارة الإلكترونية</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            منذ 2019، نعمل على تمكين رواد الأعمال العرب من بناء متاجر إلكترونية ناجحة
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                بدأت ClawCommerce من فكرة بسيطة: لماذا يجب أن يكون إنشاء متجر إلكتروني صعباً ومكلفاً؟
              </p>
              <p>
                في عام 2019، قرر فريقنا المؤسس بناء منصة تجارة إلكترونية مصممة خصيصاً للسوق العربي، 
                مع واجهة عربية كاملة، ودعم لبوابات الدفع المحلية، وتكامل مع شركات الشحن في المنطقة.
              </p>
              <p>
                اليوم، نفخر بخدمة أكثر من 50,000 تاجر في 8 دول عربية، ونعمل يومياً على تطوير 
                منصتنا لتكون الخيار الأفضل للتجارة الإلكترونية في الوطن العربي.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: '50K+', label: 'متجر نشط' },
                { value: '8', label: 'دول عربية' },
                { value: '2B+', label: 'ريال مبيعات' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-orange-500">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">رحلتنا</h4>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                    {milestone.icon}
                  </div>
                  <div>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-semibold mb-1">
                      {milestone.year}
                    </span>
                    <p className="text-gray-700 font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">قيمنا</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">فريق القيادة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {member.avatar}
                </div>
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <p className="text-orange-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
