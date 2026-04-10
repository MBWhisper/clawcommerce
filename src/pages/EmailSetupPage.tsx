import { useState } from 'react';
import { getEmailConfigurationGuide } from '../lib/emailErrors';

export default function EmailSetupPage() {
  const guide = getEmailConfigurationGuide();
  const [activeTab, setActiveTab] = useState<'quick' | 'smtp' | 'troubleshoot'>('quick');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold mb-4">إعداد البريد الإلكتروني</h1>
          <p className="text-lg text-gray-600">
            قم بتكوين البريد الإلكتروني لتفعيل تأكيد الحسابات والإشعارات
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-4 sm:p-6">
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('quick')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'quick'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              إعداد سريع
            </button>
            <button
              onClick={() => setActiveTab('smtp')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'smtp'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              SMTP متقدم
            </button>
            <button
              onClick={() => setActiveTab('troubleshoot')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'troubleshoot'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              استكشاف الأخطاء
            </button>
          </div>

          {/* Quick Setup */}
          {activeTab === 'quick' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-900 font-medium">للتطوير والاختبار:</p>
                <p className="text-blue-800 mt-2">عطّل تأكيد البريد الإلكتروني مؤقتاً</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">الخطوات:</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-gray-700">افتح <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">لوحة تحكم Supabase</a></li>
                  <li className="text-gray-700">اختر مشروعك</li>
                  <li className="text-gray-700">اذهب إلى <strong>Authentication</strong> → <strong>Providers</strong> → <strong>Email</strong></li>
                  <li className="text-gray-700">عطّل <strong>Confirm email</strong></li>
                  <li className="text-gray-700">احفظ التغييرات</li>
                </ol>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-900 font-medium">النتيجة:</p>
                <p className="text-green-800 mt-2">سيتمكن المستخدمون من التسجيل دون الحاجة لتأكيد البريد الإلكتروني</p>
              </div>
            </div>
          )}

          {/* SMTP Setup */}
          {activeTab === 'smtp' && (
            <div className="space-y-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-orange-900 font-medium">للإنتاج:</p>
                <p className="text-orange-800 mt-2">استخدم خدمة بريد احترافية</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">الخيارات المتاحة:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">SendGrid</h4>
                    <p className="text-sm text-gray-600 mb-3">الأكثر شيوعاً وسهل الاستخدام</p>
                    <a href="https://sendgrid.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      تسجيل الدخول →
                    </a>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">Mailgun</h4>
                    <p className="text-sm text-gray-600 mb-3">خيار موثوق وقوي</p>
                    <a href="https://mailgun.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      تسجيل الدخول →
                    </a>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">AWS SES</h4>
                    <p className="text-sm text-gray-600 mb-3">اقتصادي وقابل للتوسع</p>
                    <a href="https://aws.amazon.com/ses/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      تسجيل الدخول →
                    </a>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">SparkPost</h4>
                    <p className="text-sm text-gray-600 mb-3">متخصص في تسليم البريد</p>
                    <a href="https://sparkpost.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      تسجيل الدخول →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                <h4 className="font-bold">خطوات الإعداد العام:</h4>
                <ol className="space-y-2 list-decimal list-inside text-sm">
                  <li>احصل على SMTP credentials من خدمة البريد</li>
                  <li>اذهب إلى <strong>Supabase Dashboard</strong> → <strong>Project Settings</strong> → <strong>Email</strong></li>
                  <li>اختر <strong>Custom SMTP</strong></li>
                  <li>أدخل بيانات الاتصال:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-xs">
                      <li>SMTP Host</li>
                      <li>SMTP Port</li>
                      <li>SMTP User</li>
                      <li>SMTP Password</li>
                    </ul>
                  </li>
                  <li>اختبر الاتصال</li>
                  <li>احفظ التغييرات</li>
                </ol>
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          {activeTab === 'troubleshoot' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">حل المشاكل الشائعة</h3>

              {guide.issues.map((issue, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-600 mb-3">المشكلة: {issue.issue}</h4>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">الحلول:</p>
                    <ul className="space-y-2">
                      {issue.solutions.map((solution, sIndex) => (
                        <li key={sIndex} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-blue-600">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">نصائح إضافية:</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• تحقق من مجلد البريد العشوائي</li>
                  <li>• تأكد من تحقق البريد في خدمة البريد</li>
                  <li>• افحص سجلات Supabase للأخطاء التفصيلية</li>
                  <li>• اختبر مع بريد حقيقي وليس اختباري</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://supabase.com/docs/guides/auth/auth-email"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold mb-2">📚 توثيق Supabase</h3>
            <p className="text-sm text-gray-600">اقرأ التوثيق الكاملة للبريد الإلكتروني</p>
          </a>
          <a
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold mb-2">⚙️ إعداد SMTP</h3>
            <p className="text-sm text-gray-600">دليل تفصيلي لإعداد SMTP مخصص</p>
          </a>
        </div>
      </div>
    </div>
  );
}
