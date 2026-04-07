import { useStoreStore } from '../../store/storeStore';
import { useAuthStore } from '../../store/authStore';

const StatCard = ({ title, value, icon, change, changeType }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className={`text-sm mt-2 flex items-center gap-1 ${
          changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-gray-500'
        }`}>
          {changeType === 'up' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          )}
          {changeType === 'down' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          )}
          {change}
        </p>
      </div>
      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center text-orange-600">
        {icon}
      </div>
    </div>
  </div>
);

export default function DashboardHome() {
  const { stats, orders, products, isLoading } = useStoreStore();
  const { profile, subscription } = useAuthStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              مرحباً، {profile?.full_name || 'صديقي'} 👋
            </h1>
            <p className="text-orange-100">
              إليك ملخص أداء متجرك اليوم
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <p className="text-sm text-orange-100">الخطة الحالية</p>
              <p className="text-2xl font-bold capitalize">{subscription?.plan || 'مجانية'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الإيرادات"
          value={formatCurrency(stats.totalRevenue)}
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          change="+12.5% من الشهر الماضي"
          changeType="up"
        />
        <StatCard
          title="الطلبات"
          value={stats.totalOrders.toString()}
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          change="+8.2% من الشهر الماضي"
          changeType="up"
        />
        <StatCard
          title="المنتجات"
          value={stats.totalProducts.toString()}
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          change="3 منتجات جديدة هذا الأسبوع"
          changeType="neutral"
        />
        <StatCard
          title="العملاء"
          value={stats.totalCustomers.toString()}
          icon={
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          change="+15 عميل جديد هذا الشهر"
          changeType="up"
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">آخر الطلبات</h2>
            <a href="/dashboard/orders" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              عرض الكل
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">رقم الطلب</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">العميل</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المبلغ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p>لا توجد طلبات بعد</p>
                      <p className="text-sm mt-1">ستظهر الطلبات هنا عندما يبدأ العملاء بالشراء</p>
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-orange-600">#{order.order_number}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">عميل</td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(Number(order.total))}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(order.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions & Top products */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">إجراءات سريعة</h2>
            <div className="space-y-3">
              <a
                href="/dashboard/products/new"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium">إضافة منتج جديد</span>
              </a>
              <a
                href="/dashboard/orders/new"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-medium">إنشاء طلب يدوي</span>
              </a>
              <a
                href="/dashboard/coupons/new"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span className="font-medium">إنشاء كوبون خصم</span>
              </a>
            </div>
          </div>

          {/* Top products */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">أفضل المنتجات</h2>
            <div className="space-y-4">
              {products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p>لا توجد منتجات بعد</p>
                </div>
              ) : (
                products.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {Array.isArray(product.images) && product.images[0] ? (
                        <img 
                          src={product.images[0] as string} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.quantity} في المخزون</p>
                    </div>
                    <p className="font-bold text-orange-600">{formatCurrency(Number(product.price))}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
