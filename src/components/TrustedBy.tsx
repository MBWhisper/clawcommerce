export default function TrustedBy() {
  const stats = [
    { value: '50,000+', label: 'متجر نشط', icon: '🏪' },
    { value: '2M+', label: 'طلب شهرياً', icon: '📦' },
    { value: '500M+', label: 'ريال مبيعات', icon: '💰' },
    { value: '99.9%', label: 'وقت التشغيل', icon: '⚡' },
  ];

  const brands = [
    'نمشي', 'سيفي', 'نون', 'جرير', 'إكسترا', 'لولو', 'العربية للعود', 'باث & بودي'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trusted Brands */}
        <div className="text-center">
          <p className="text-gray-500 mb-8 font-medium">يثق بنا أكبر العلامات التجارية في المنطقة</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="text-gray-500 hover:text-white transition-colors text-lg md:text-xl font-bold opacity-60 hover:opacity-100"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
