import { useState, useEffect } from 'react';

export default function LiveStats() {
  const [stats, setStats] = useState({
    stores: 50847,
    orders: 2847593,
    sales: 2847593847,
    merchants: 48293,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        stores: prev.stores + Math.floor(Math.random() * 3),
        orders: prev.orders + Math.floor(Math.random() * 50),
        sales: prev.sales + Math.floor(Math.random() * 50000),
        merchants: prev.merchants + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + ' مليار';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' مليون';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toLocaleString('ar-SA');
  };

  const liveStats = [
    {
      label: 'متجر نشط',
      value: formatNumber(stats.stores),
      rawValue: stats.stores,
      icon: '🏪',
      color: 'from-blue-500 to-cyan-500',
      change: '+127 اليوم',
    },
    {
      label: 'طلب تم تنفيذه',
      value: formatNumber(stats.orders),
      rawValue: stats.orders,
      icon: '📦',
      color: 'from-green-500 to-emerald-500',
      change: '+3,847 اليوم',
    },
    {
      label: 'ريال حجم المبيعات',
      value: formatNumber(stats.sales),
      rawValue: stats.sales,
      icon: '💰',
      color: 'from-orange-500 to-red-500',
      change: '+12.5M اليوم',
    },
    {
      label: 'تاجر سعيد',
      value: formatNumber(stats.merchants),
      rawValue: stats.merchants,
      icon: '😊',
      color: 'from-purple-500 to-pink-500',
      change: '+89 هذا الأسبوع',
    },
  ];

  const recentActivities = [
    { type: 'order', message: 'طلب جديد #84729 - 450 ر.س', time: 'الآن', icon: '🛒' },
    { type: 'store', message: 'متجر "أناقة" انضم للمنصة', time: 'منذ دقيقة', icon: '🏪' },
    { type: 'sale', message: 'مبيعات "تقنية بلس" تجاوزت 100K', time: 'منذ 3 دقائق', icon: '🎉' },
    { type: 'order', message: 'طلب جديد #84728 - 1,200 ر.س', time: 'منذ 5 دقائق', icon: '🛒' },
    { type: 'review', message: 'تقييم 5 نجوم لمتجر "حلويات سارة"', time: 'منذ 7 دقائق', icon: '⭐' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,107,0,0.3),transparent_40%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.3),transparent_40%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            إحصائيات مباشرة
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            أرقام تتحدث عن
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> نجاحنا</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {liveStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                <span className="text-green-400 text-xs font-medium bg-green-500/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2 tabular-nums">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              النشاط المباشر
            </h3>
            <span className="text-gray-400 text-sm">آخر تحديث: الآن</span>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* World Map Indicator */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">🌍 متاجر نشطة في 8 دول عربية</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['🇸🇦 السعودية', '🇦🇪 الإمارات', '🇰🇼 الكويت', '🇧🇭 البحرين', '🇴🇲 عُمان', '🇶🇦 قطر', '🇪🇬 مصر', '🇯🇴 الأردن'].map((country, index) => (
              <span key={index} className="bg-white/10 px-4 py-2 rounded-full text-white text-sm">
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
