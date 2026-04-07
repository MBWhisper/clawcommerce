export default function Showcase() {
  const templates = [
    {
      name: 'متجر الأزياء',
      category: 'ملابس وأزياء',
      color: 'from-pink-500 to-rose-500',
      image: '👗',
    },
    {
      name: 'متجر الإلكترونيات',
      category: 'أجهزة إلكترونية',
      color: 'from-blue-500 to-cyan-500',
      image: '📱',
    },
    {
      name: 'متجر المجوهرات',
      category: 'مجوهرات وإكسسوارات',
      color: 'from-yellow-500 to-orange-500',
      image: '💎',
    },
    {
      name: 'متجر الطعام',
      category: 'مطاعم وكافيهات',
      color: 'from-green-500 to-emerald-500',
      image: '🍔',
    },
    {
      name: 'متجر الرياضة',
      category: 'أدوات رياضية',
      color: 'from-orange-500 to-red-500',
      image: '⚽',
    },
    {
      name: 'متجر الكتب',
      category: 'كتب ومستلزمات',
      color: 'from-purple-500 to-indigo-500',
      image: '📚',
    },
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎨 قوالب احترافية
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            قوالب مصممة
            <span className="gradient-text"> للنجاح</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            أكثر من 100 قالب احترافي جاهز لجميع أنواع المتاجر. خصصها بسهولة لتناسب علامتك التجارية.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Template Preview */}
                <div className={`bg-gradient-to-br ${template.color} rounded-2xl h-48 flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <div className="text-7xl group-hover:scale-125 transition-transform duration-500">
                    {template.image}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      معاينة القالب
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="px-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-gray-500 text-sm">{template.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="btn-secondary inline-flex items-center gap-2">
            <span>استعرض جميع القوالب</span>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">+100</span>
          </button>
        </div>
      </div>
    </section>
  );
}
