import { useStoreStore } from '../../store/storeStore';

export default function AnalyticsPage() {
  const { stats, orders, products, customers } = useStoreStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA');
  };

  const paidOrders = orders.filter(o => o.payment_status === 'paid');
  const pendingOrders = orders.filter(o => o.payment_status === 'pending');
  const failedOrders = orders.filter(o => o.payment_status === 'failed');

  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const revenueByDay = paidOrders.reduce((acc, order) => {
    const day = formatDate(order.created_at);
    acc[day] = (acc[day] || 0) + Number(order.total);
    return acc;
  }, {} as Record<string, number>);

  const avgOrderValue = paidOrders.length > 0
    ? paidOrders.reduce((sum, o) => sum + Number(o.total), 0) / paidOrders.length
    : 0;

  const conversionRate = orders.length > 0
    ? (paidOrders.length / orders.length) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">التحليلات</h1>
        <p className="text-gray-600 mt-1">نظرة عامة على أداء متجرك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-sm opacity-80 mb-1">إجمالي الإيرادات</div>
          <div className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <div className="text-sm opacity-80 mt-2">{stats.totalOrders} طلب</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">متوسط قيمة الطلب</div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(avgOrderValue)}</div>
          <div className="text-sm text-gray-500 mt-2">لكل طلب مدفوع</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">نسبة التحويل</div>
          <div className="text-3xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-500 mt-2">{paidOrders.length} من {orders.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">عدد العملاء</div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</div>
          <div className="text-sm text-gray-500 mt-2">عميل نشط</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">حالات الطلبات</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">قيد الانتظار</span>
                <span className="font-medium">{ordersByStatus.pending}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${orders.length > 0 ? (ordersByStatus.pending / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">قيد التجهيز</span>
                <span className="font-medium">{ordersByStatus.processing}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${orders.length > 0 ? (ordersByStatus.processing / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">تم الشحن</span>
                <span className="font-medium">{ordersByStatus.shipped}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${orders.length > 0 ? (ordersByStatus.shipped / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">تم التوصيل</span>
                <span className="font-medium">{ordersByStatus.delivered}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${orders.length > 0 ? (ordersByStatus.delivered / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">ملغي</span>
                <span className="font-medium">{ordersByStatus.cancelled}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${orders.length > 0 ? (ordersByStatus.cancelled / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">حالات الدفع</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">مدفوع</span>
                <span className="font-medium">{paidOrders.length}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${orders.length > 0 ? (paidOrders.length / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">قيد الانتظار</span>
                <span className="font-medium">{pendingOrders.length}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${orders.length > 0 ? (pendingOrders.length / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">فشل الدفع</span>
                <span className="font-medium">{failedOrders.length}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${orders.length > 0 ? (failedOrders.length / orders.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">أفضل المنتجات</h2>
          {stats.topProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد بيانات</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{formatCurrency(Number(product.price))}</div>
                  </div>
                  <span className="text-orange-600 font-bold">
                    {product.quantity} مبيعات
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">آخر الطلبات</h2>
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد طلبات</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{order.order_number}</div>
                    <div className="text-sm text-gray-500">{formatDate(order.created_at)}</div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-orange-600">{formatCurrency(Number(order.total))}</div>
                    <div className="text-sm">
                      {order.payment_status === 'paid' && <span className="text-green-600">مدفوع</span>}
                      {order.payment_status === 'pending' && <span className="text-yellow-600">قيد الانتظار</span>}
                      {order.payment_status === 'failed' && <span className="text-red-600">فشل</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}