# أوامر اختبار المتصفح (Browser Console Commands)

استخدم هذه الأوامر في Console (F12) للتحقق من حالة التطبيق أثناء الاختبار.

## التحقق من حالة المستخدم

```javascript
// الحصول على معلومات المستخدم الحالي
useAuthStore.getState().user

// الحصول على الملف الشخصي
useAuthStore.getState().profile

// الحصول على معلومات المتجر
useAuthStore.getState().store

// الحصول على الاشتراك
useAuthStore.getState().subscription

// التحقق من حالة التحميل
useAuthStore.getState().isLoading
```

## أمثلة على النتائج المتوقعة

### بعد التسجيل الناجح:

```javascript
// يجب أن ترى شيء مشابه:
{
  id: "uuid-here",
  email: "test1@example.com",
  user_metadata: {
    full_name: "محمد أحمد"
  },
  // ... other properties
}
```

### الملف الشخصي:

```javascript
{
  id: "uuid-here",
  full_name: "محمد أحمد",
  avatar_url: null,
  // ... other properties
}
```

### المتجر:

```javascript
{
  id: "uuid-here",
  user_id: "uuid-here",
  name: "محمد أحمد's Store",
  slug: "test1-1234567890",
  is_active: true,
  // ... other properties
}
```

---

## أوامر مفيدة للاختبار

### التحقق من localStorage

```javascript
// عرض جميع البيانات المحفوظة
JSON.parse(localStorage.getItem('auth-storage'))

// حذف البيانات المحفوظة (لإعادة تشغيل التطبيق)
localStorage.removeItem('auth-storage')
```

### فحص حالة Zustand

```javascript
// عرض جميع الحالات
useAuthStore.getState()

// مراقبة التغييرات في الحالة
useAuthStore.subscribe(state => {
  console.log('Auth state changed:', state)
})
```

### اختبار Supabase

```javascript
// الحصول على جلسة المستخدم الحالية
import { supabase } from './lib/supabase'

// التحقق من JWT
supabase.auth.getSession().then(({ data: { session } }) => {
  console.log('Current session:', session)
})

// الحصول على المستخدم
supabase.auth.getUser().then(({ data }) => {
  console.log('User:', data)
})
```

---

## سيناريوهات الاختبار الكاملة

### سيناريو 1: تسجيل حساب جديد

```javascript
// 1. تسجيل كحساب جديد
// ملأ النموذج و الضغط على الزر

// 2. التحقق الفوري بعد التسجيل
useAuthStore.getState().user
// يجب أن ترى معرف المستخدم الجديد

// 3. التحقق من المتجر
useAuthStore.getState().store
// يجب أن يكون slug مثل "test1-1234567890"

// 4. التحقق من localStorage
JSON.parse(localStorage.getItem('auth-storage'))
// يجب أن يحتوي على user و session
```

### سيناريو 2: تسجيل الدخول

```javascript
// 1. اذهب إلى صفحة تسجيل الدخول
// 2. أدخل البيانات و اضغط الزر

// 3. تحقق من تسجيل الدخول الناجح
useAuthStore.getState().user?.email
// يجب أن يطابق البريد الذي أدخلته

// 4. تحقق من بيانات المتجر
useAuthStore.getState().store?.name
// يجب أن تطابق اسم المتجر المحفوظ
```

### سيناريو 3: تسجيل الخروج

```javascript
// 1. اضغط زر "تسجيل الخروج" من الداشبورد

// 2. تحقق من تسجيل الخروج
useAuthStore.getState().user
// يجب أن يكون null

// 3. تحقق من حذف البيانات الشخصية
useAuthStore.getState().profile
// يجب أن يكون null

// 4. تحقق من localStorage
JSON.parse(localStorage.getItem('auth-storage'))
// يجب أن تكون فارغة أو بدون user
```

---

## أوامر تصحيح الأخطاء (Debug)

### تفعيل التسجيل التفصيلي

```javascript
// ضبط وضع Debug في Supabase
import { supabase } from './lib/supabase'

// عرض جميع الرسائل من Supabase
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  console.log('Session:', session)
})
```

### اختبار الأخطاء

```javascript
// محاولة تسجيل دخول مع بيانات خاطئة
import { supabase } from './lib/supabase'

supabase.auth.signInWithPassword({
  email: 'invalid@example.com',
  password: 'wrongpassword'
}).then(({ data, error }) => {
  console.log('Error:', error)
})
```

---

## نصائح مفيدة

| المشكلة | الحل |
|-------|------|
| "الداشبورد فارغ" | اختبر: `useAuthStore.getState().store` |
| "لا أستطيع الدخول" | اختبر: `useAuthStore.getState().user` |
| "البيانات لم تحفظ" | افحص: `localStorage` و `Supabase` |
| "رسالة خطأ غريبة" | افتح: `Console` واقرأ الأخطاء |

---

## قائمة فحص سريعة

```javascript
// قائمة شاملة للفحص السريع
const checkAll = () => {
  console.log('=== CHECKLIST ===')
  console.log('1. User logged in:', !!useAuthStore.getState().user)
  console.log('2. Profile exists:', !!useAuthStore.getState().profile)
  console.log('3. Store exists:', !!useAuthStore.getState().store)
  console.log('4. Loading finished:', !useAuthStore.getState().isLoading)
  console.log('5. LocalStorage has data:', !!localStorage.getItem('auth-storage'))
}

checkAll()
```

انسخ هذا في Console و اضغط Enter للتحقق من كل شيء مرة واحدة!
