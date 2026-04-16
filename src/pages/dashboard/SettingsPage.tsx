import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

export default function SettingsPage() {
  const { store, profile, subscription } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [storeForm, setStoreForm] = useState({
    name: store?.name || '',
    description: store?.description || '',
    currency: store?.currency || 'SAR',
    logo_url: store?.logo_url || '',
  });

  const [profileForm, setProfileForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  });

  const handleStoreUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store?.id) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('stores')
        .update({
          name: storeForm.name,
          description: storeForm.description || null,
          currency: storeForm.currency,
          logo_url: storeForm.logo_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', store.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'تم تحديث إعدادات المتجر بنجاح' });
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء التحديث' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileForm.full_name,
          phone: profileForm.phone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'تم تحديث الملف الشخصي بنجاح' });
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء التحديث' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    const plans: Record<string, { bg: string; text: string }> = {
      free: { bg: 'bg-gray-100', text: 'text-gray-800' },
      starter: { bg: 'bg-blue-100', text: 'text-blue-800' },
      professional: { bg: 'bg-purple-100', text: 'text-purple-800' },
      enterprise: { bg: 'bg-orange-100', text: 'text-orange-800' },
    };
    const badge = plans[plan] || plans.free;
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${badge.bg} ${badge.text}`}>
        {plan === 'free' ? 'مجاني' : plan === 'starter' ? 'المبتدئ' : plan === 'professional' ? 'احترافي' : 'مؤسسات'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p className="text-gray-600 mt-1">إدارة إعدادات متجرك وحسابك</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">معلومات المتجر</h2>
            <form onSubmit={handleStoreUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
                <input
                  type="text"
                  value={storeForm.name}
                  onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="متجري"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف المتجر</label>
                <textarea
                  value={storeForm.description}
                  onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="وصف متجرك..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                <select
                  value={storeForm.currency}
                  onChange={(e) => setStoreForm({ ...storeForm, currency: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                  <option value="EGP">جنيه مصري (EGP)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
                <input
                  type="url"
                  value={storeForm.logo_url}
                  onChange={(e) => setStoreForm({ ...storeForm, logo_url: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">الملف الشخصي</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="محمد أحمد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+966501234567"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'جاري الحفظ...' : 'تحديث الملف الشخصي'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">الاشتراك</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">الخطة الحالية</span>
                {getPlanBadge(subscription?.plan || 'free')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">الحالة</span>
                {subscription?.status === 'active' ? (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">نشط</span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">غير نشط</span>
                )}
              </div>
              {subscription?.current_period_end && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ينتهي في</span>
                  <span className="font-medium">
                    {new Date(subscription.current_period_end).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              )}
            </div>
            <button className="w-full mt-6 py-3 px-4 border border-orange-500 text-orange-500 rounded-xl font-medium hover:bg-orange-50 transition-colors">
              ترقية الخطة
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">خيارات إضافية</h2>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 text-right text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between">
                <span>تصدير البيانات</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button className="w-full py-3 px-4 text-right text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center justify-between">
                <span>حذف المتجر</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}