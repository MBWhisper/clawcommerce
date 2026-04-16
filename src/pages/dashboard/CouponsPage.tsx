import { useState } from 'react';
import { useStoreStore } from '../../store/storeStore';
import { useAuthStore } from '../../store/authStore';
import type { Coupon } from '../../types/database';

export default function CouponsPage() {
  const { coupons, createCoupon, updateCoupon, deleteCoupon } = useStoreStore();
  const { store } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    min_order_amount: '',
    max_uses: '',
    starts_at: '',
    expires_at: '',
    is_active: true,
  });

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value.toString(),
        min_order_amount: coupon.min_order_amount?.toString() || '',
        max_uses: coupon.max_uses?.toString() || '',
        starts_at: coupon.starts_at ? coupon.starts_at.slice(0, 16) : '',
        expires_at: coupon.expires_at ? coupon.expires_at.slice(0, 16) : '',
        is_active: coupon.is_active,
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        type: 'percentage',
        value: '',
        min_order_amount: '',
        max_uses: '',
        starts_at: '',
        expires_at: '',
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store?.id) return;

    setIsSubmitting(true);

    const couponData = {
      store_id: store.id,
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: parseFloat(formData.value),
      min_order_amount: formData.min_order_amount ? parseFloat(formData.min_order_amount) : null,
      max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
      starts_at: formData.starts_at || null,
      expires_at: formData.expires_at || null,
      is_active: formData.is_active,
    };

    if (editingCoupon) {
      await updateCoupon(editingCoupon.id, couponData);
    } else {
      await createCoupon(couponData);
    }

    setIsSubmitting(false);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكوبون؟')) {
      await deleteCoupon(id);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-SA');
  };

  const getStatusBadge = (coupon: Coupon) => {
    const now = new Date();
    const isExpired = coupon.expires_at && new Date(coupon.expires_at) < now;
    const isNotStarted = coupon.starts_at && new Date(coupon.starts_at) > now;
    const isExhausted = coupon.max_uses && coupon.used_count >= coupon.max_uses;

    if (!coupon.is_active) {
      return <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">غير نشط</span>;
    }
    if (isExpired) {
      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">منتهي</span>;
    }
    if (isNotStarted) {
      return <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">لم يبدأ</span>;
    }
    if (isExhausted) {
      return <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">مستخدم</span>;
    }
    return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">نشط</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">الكوبونات</h1>
          <p className="text-gray-600 mt-1">{coupons.length} كوبون</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة كوبون
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="بحث عن كوبون..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {filteredCoupons.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد كوبونات</h3>
          <p className="text-gray-500 mb-6">ابدأ بإضافة كوبونك الأول</p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            إضافة كوبون جديد
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  {coupon.code}
                </div>
                {getStatusBadge(coupon)}
              </div>
              
              <div className="text-3xl font-bold text-orange-600 mb-3">
                {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} ر.س`}
              </div>
              
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                {coupon.min_order_amount && (
                  <p>الحد الأدنى: {coupon.min_order_amount} ر.س</p>
                )}
                <p>المستخدم: {coupon.used_count}/{coupon.max_uses || '∞'}</p>
                <p>ينتهي: {formatDate(coupon.expires_at)}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(coupon)}
                  className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingCoupon ? 'تعديل الكوبون' : 'إضافة كوبون جديد'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">كود الكوبون *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="SUMMER2024"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخصم *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="percentage">نسبة مئوية</option>
                    <option value="fixed">مبلغ ثابت</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">القيمة *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للطلب</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.min_order_amount}
                  onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للاستخدام</label>
                <input
                  type="number"
                  min="1"
                  value={formData.max_uses}
                  onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block textSm font-medium text-gray-700 mb-2">تاريخ البدء</label>
                  <input
                    type="datetime-local"
                    value={formData.starts_at}
                    onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
                  <input
                    type="datetime-local"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="is_active" className="font-medium">نشط</label>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 border rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري الحفظ...' : editingCoupon ? 'حفظ التغييرات' : 'إضافة الكوبون'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}