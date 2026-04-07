import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('شكراً لتواصلك! سنرد عليك خلال 24 ساعة.');
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'اتصل بنا',
      description: 'متاحون من 9 صباحاً - 9 مساءً',
      value: '+966 11 XXX XXXX',
      action: 'اتصل الآن',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '💬',
      title: 'واتساب',
      description: 'ردود فورية على مدار الساعة',
      value: '+966 5X XXX XXXX',
      action: 'راسلنا واتساب',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      description: 'ردود خلال 24 ساعة',
      value: 'support@clawcommerce.com',
      action: 'أرسل بريد',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🎥',
      title: 'جدولة عرض تجريبي',
      description: 'اجتماع فيديو مع فريق المبيعات',
      value: 'احجز موعدك الآن',
      action: 'احجز موعد',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const offices = [
    {
      city: 'الرياض',
      country: 'السعودية 🇸🇦',
      address: 'برج المملكة، الدور 25',
      isHQ: true,
    },
    {
      city: 'دبي',
      country: 'الإمارات 🇦🇪',
      address: 'مركز دبي المالي العالمي',
      isHQ: false,
    },
    {
      city: 'الكويت',
      country: 'الكويت 🇰🇼',
      address: 'برج الحمراء، الدور 18',
      isHQ: false,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            📬 تواصل معنا
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            نحن هنا
            <span className="gradient-text"> لمساعدتك</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في بدء رحلتك في التجارة الإلكترونية
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{method.description}</p>
              <p className="text-gray-900 font-semibold mb-4" dir="ltr">{method.value}</p>
              <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center gap-2">
                {method.action}
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">أرسل رسالة</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">نوع الاستفسار</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'general', label: 'استفسار عام' },
                    { value: 'sales', label: 'المبيعات' },
                    { value: 'support', label: 'الدعم الفني' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        formData.type === type.value
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="email@example.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة/المتجر</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    placeholder="اسم متجرك أو شركتك"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسالتك *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Office Locations & FAQ */}
          <div className="space-y-8">
            {/* Offices */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">مكاتبنا</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${
                      office.isHQ 
                        ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200' 
                        : 'bg-white border-gray-100 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{office.city}</h4>
                          {office.isHQ && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                              المقر الرئيسي
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm mb-1">{office.country}</p>
                        <p className="text-gray-600">{office.address}</p>
                      </div>
                      <span className="text-3xl">📍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">روابط مفيدة</h3>
              <div className="space-y-4">
                {[
                  { icon: '📚', label: 'مركز المساعدة', desc: 'مقالات وفيديوهات تعليمية' },
                  { icon: '💬', label: 'الأسئلة الشائعة', desc: 'إجابات لأكثر الأسئلة شيوعاً' },
                  { icon: '🎓', label: 'أكاديمية ClawCommerce', desc: 'دورات مجانية في التجارة الإلكترونية' },
                  { icon: '📊', label: 'حالة الخدمة', desc: 'تحقق من حالة المنصة' },
                ].map((link, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold group-hover:text-orange-400 transition-colors">{link.label}</div>
                      <div className="text-gray-400 text-sm">{link.desc}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-400 rotate-180 group-hover:-translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
