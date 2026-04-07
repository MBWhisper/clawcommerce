import { useState } from 'react';
import { useStoreStore } from '../../store/storeStore';
import type { Order } from '../../types/database';

export default function OrdersPage() {
  const { orders, updateOrder, deleteOrder } = useStoreStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'قيد الانتظار' },
    processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'قيد المعالجة' },
    shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'تم الشحن' },
    delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'تم التوصيل' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'ملغي' },
    refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'مسترد' },
  };

  const paymentStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'في انتظار الدفع' },
    paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'مدفوع' },
    failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'فشل الدفع' },
    refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'مسترد' },
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrder(orderId, { 
      status: newStatus as Order['status'],
      ...(newStatus === 'shipped' && { shipped_at: new Date().toISOString() }),
      ...(newStatus === 'delivered' && { delivered_at: new Date().toISOString() }),
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      await deleteOrder(id);
      setSelectedOrder(null);
    }
  };

  const getStatusBadge = (status: string, config: Record<string, { bg: string; text: string; label: string }>) => {
    const badge = config[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">الطلبات</h1>
          <p className="text-gray-600 mt-1">{orders.length} طلب</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">الإجمالي</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-yellow-600 text-sm">قيد الانتظار</p>
          <p className="text-2xl font-bold mt-1 text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-blue-600 text-sm">قيد المعالجة</p>
          <p className="text-2xl font-bold mt-1 text-blue-700">{stats.processing}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-purple-600 text-sm">تم الشحن</p>
          <p className="text-2xl font-bold mt-1 text-purple-700">{stats.shipped}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-green-600 text-sm">تم التوصيل</p>
          <p className="text-2xl font-bold mt-1 text-green-700">{stats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث برقم الطلب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد المعالجة</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Orders table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-500">ستظهر الطلبات هنا عندما يبدأ العملاء بالشراء</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">رقم الطلب</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الدفع</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المبلغ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="font-medium text-orange-600 hover:text-orange-700"
                      >
                        #{order.order_number}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status, statusConfig)}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.payment_status, paymentStatusConfig)}</td>
                    <td className="px-6 py-4 font-bold">{formatCurrency(Number(order.total))}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1 focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="processing">قيد المعالجة</option>
                          <option value="shipped">تم الشحن</option>
                          <option value="delivered">تم التوصيل</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">
                تفاصيل الطلب #{selectedOrder.order_number}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-4">
                {getStatusBadge(selectedOrder.status, statusConfig)}
                {getStatusBadge(selectedOrder.payment_status, paymentStatusConfig)}
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">الجدول الزمني</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>تم الإنشاء: {formatDate(selectedOrder.created_at)}</span>
                  </div>
                  {selectedOrder.shipped_at && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>تم الشحن: {formatDate(selectedOrder.shipped_at)}</span>
                    </div>
                  )}
                  {selectedOrder.delivered_at && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>تم التوصيل: {formatDate(selectedOrder.delivered_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-medium mb-3">المنتجات</h3>
                <div className="border rounded-xl divide-y">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span>{formatCurrency(Number(selectedOrder.subtotal))}</span>
                </div>
                {Number(selectedOrder.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>-{formatCurrency(Number(selectedOrder.discount))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن</span>
                  <span>{formatCurrency(Number(selectedOrder.shipping_cost))}</span>
                </div>
                {Number(selectedOrder.tax) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضريبة</span>
                    <span>{formatCurrency(Number(selectedOrder.tax))}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>الإجمالي</span>
                  <span className="text-orange-600">{formatCurrency(Number(selectedOrder.total))}</span>
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.shipping_address && typeof selectedOrder.shipping_address === 'object' && (
                <div>
                  <h3 className="font-medium mb-3">عنوان الشحن</h3>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm">
                    <p>{(selectedOrder.shipping_address as any).name}</p>
                    <p>{(selectedOrder.shipping_address as any).address}</p>
                    <p>{(selectedOrder.shipping_address as any).city}, {(selectedOrder.shipping_address as any).country}</p>
                    <p>{(selectedOrder.shipping_address as any).phone}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-medium mb-3">ملاحظات</h3>
                  <p className="bg-gray-50 rounded-xl p-4 text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
