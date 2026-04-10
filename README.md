# 🏪 ClawCommerce - منصة إدارة المتاجر الإلكترونية

<div dir="rtl">

منصة تجارة إلكترونية متكاملة وقوية لإدارة المتاجر الإلكترونية بكفاءة عالية.

**الحالة:** ✅ **مكتملة وجاهزة للاستخدام**



## ⚡ البدء الفوري (5 دقائق فقط!)

### للبدء السريع جداً:
👉 **اقرأ:** [INSTANT_TEST.md](./INSTANT_TEST.md)

```bash
# تشغيل المشروع
npm run dev

# ثم افتح في المتصفح
http://localhost:5173/register
```

### معلومات الاتصال الحالية:
```
✅ Supabase URL: https://migypgckiukmqomucfhj.supabase.co
✅ متغيرات البيئة: معينة في .env
✅ قاعدة البيانات: 9 جداول مع RLS
✅ جاهز للاستخدام الفوري
```

---

## 📚 دليل البدء الشامل

### للمبتدئين:
1. **[START_HERE.md](./START_HERE.md)** - دليل شامل
2. **[INSTANT_TEST.md](./INSTANT_TEST.md)** - اختبار سريع
3. **[FINAL_VERIFICATION.md](./FINAL_VERIFICATION.md)** - اختبار شامل

### للمطورين:
1. **[PROJECT_STATUS_REPORT.md](./PROJECT_STATUS_REPORT.md)** - تقرير تقني
2. **[BROWSER_TESTING_COMMANDS.md](./BROWSER_TESTING_COMMANDS.md)** - أوامر فحص
3. **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - فهرس كامل

### للإعداد والإصلاح:
1. **[EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md)** - إعداد البريد
2. **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - قائمة تحقق

## 🛠️ التقنيات المستخدمة

```
Frontend:  React 19.2.3 + Vite 7.3.2
Styling:   Tailwind CSS 4.1.17
Database:  Supabase (PostgreSQL)
Auth:      Supabase Auth (JWT)
State:     Zustand
Forms:     React Hook Form
Validation: Zod
Icons:     Lucide React
UI:        Custom Components
```

---

## 📁 هيكل المشروع

```
src/
├── components/          # مكونات صفحة الهبوط
├── pages/
│   ├── auth/           # صفحات المصادقة
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   └── dashboard/      # لوحة التحكم
│       ├── DashboardLayout.tsx
│       ├── DashboardHome.tsx
│       ├── ProductsPage.tsx
│       └── OrdersPage.tsx
├── store/              # Zustand stores
│   ├── authStore.ts
│   └── storeStore.ts
├── lib/
│   ├── supabase.ts     # Supabase client
│   └── stripe.ts       # Stripe helpers
├── types/
│   └── database.ts     # TypeScript types
└── App.tsx             # Main app with routing

supabase/
├── schema.sql          # Database schema
└── functions/
    └── stripe-webhook/ # Stripe webhook handler
```

## 🗄️ قاعدة البيانات

### الجداول الرئيسية

| الجدول | الوصف |
|--------|-------|
| `profiles` | معلومات المستخدمين |
| `stores` | المتاجر |
| `products` | المنتجات |
| `categories` | التصنيفات |
| `customers` | العملاء |
| `orders` | الطلبات |
| `subscriptions` | الاشتراكات |
| `coupons` | كوبونات الخصم |

### Row Level Security (RLS)

جميع الجداول محمية بسياسات RLS:
- المستخدمون يرون فقط بياناتهم
- المتاجر والمنتجات مرتبطة بالمستخدم المالك

## 🚀 النشر والاستضافة

### نشر على Vercel (الأسهل)
```bash
npm run build        # بناء المشروع
vercel --prod        # نشر على Vercel
```

### نشر على منصات أخرى
- **GitHub Pages:** `npm run build` ثم ادفع إلى GitHub
- **Netlify:** ربط مع GitHub وأترك Netlify للقيام بالباقي
- **AWS S3 + CloudFront:** `npm run build` ثم ارفع dist/

### متغيرات البيئة للإنتاج
تأكد من إضافة هذه المتغيرات في منصة النشر:
```
VITE_SUPABASE_URL=https://migypgckiukmqomucfhj.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

---

## 💳 إعداد Stripe (اختياري)

هذا ليس مطلوباً للعمل الأساسي، لكن يمكن إضافته لاحقاً.
اقرأ `.env.example` للمزيد من المعلومات.

## 🔗 ربط المشروع مع GitHub

```bash
# 1. إنشاء repository جديد
git init
git add .
git commit -m "Initial commit: ClawCommerce Platform"

# 2. ربط مع GitHub
git remote add origin https://github.com/YOUR_USERNAME/clawcommerce.git
git branch -M main
git push -u origin main
```

## 🚀 النشر على Vercel

### الطريقة الأولى: عبر GitHub

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "Add New Project"
3. اختر repository من GitHub
4. أضف متغيرات البيئة
5. اضغط "Deploy"

### الطريقة الثانية: عبر CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## ✨ الميزات الرئيسية

### ✅ نظام المصادقة والأمان
- [x] تسجيل وتسجيل دخول آمن
- [x] استعادة كلمة المرور
- [x] JWT tokens آمنة
- [x] Row Level Security على جميع الجداول
- [x] عزل كامل بين بيانات المستخدمين

### ✅ لوحة التحكم الرئيسية
- [x] إحصائيات شاملة
- [x] رسوم بيانية وتقارير
- [x] معلومات المستخدم والمتجر
- [x] عرض الطلبات والمنتجات الأخيرة

### ✅ إدارة المنتجات
- [x] إضافة/تحرير/حذف منتجات
- [x] إدارة المخزون
- [x] تصنيف المنتجات
- [x] صور ومتغيرات المنتجات
- [x] البحث والفلترة

### ✅ إدارة الطلبات
- [x] عرض وإدارة الطلبات
- [x] تحديث حالة الطلب
- [x] تتبع الشحنة
- [x] ملاحظات والفواتير

### ✅ واجهة المستخدم
- [x] دعم كامل للغة العربية
- [x] تصميم حديث وأنيق
- [x] واجهة متجاوبة (Responsive)
- [x] أداء عالي جداً

### 🔜 قادمة في المستقبل
- [ ] نسخة متعددة المتاجر
- [ ] نسخة تطبيق الهاتف المحمول
- [ ] تكامل Stripe كامل
- [ ] نظام التقارير المتقدم
- [ ] إشعارات البريد الإلكتروني المتقدمة

## 🆘 استكشاف الأخطاء والمشاكل

### الخطوة الأولى: افتح Console
```
اضغط: F12 في المتصفح
ابحث عن الأخطاء الحمراء
اقرأ الرسالة بعناية
```

### الأخطاء الشائعة وحلولها

| الخطأ | السبب | الحل |
|------|------|------|
| Cannot connect | متغيرات البيئة | تحقق من .env |
| Invalid credentials | بيانات خاطئة | تأكد من البيانات |
| Database error | اتصال مقطوع | أعد تشغيل الخادم |
| Page not loading | مشكلة في الجلسة | امسح cookies وأعد تحميل |

### للمزيد من المساعدة
- اقرأ `DOCUMENTATION_INDEX.md` للبحث عن ملف معين
- استخدم `BROWSER_TESTING_COMMANDS.md` لأوامر فحص متقدمة
- تحقق من logs في Supabase Dashboard

---

## 📞 التواصل والدعم

### الأسئلة المتكررة:
- **السؤال:** هل يمكن استخدام قاعدة بيانات مختلفة؟
- **الإجابة:** نعم، لكن ستحتاج لتعديل الأكواد

- **السؤال:** هل يمكن إضافة ميزات جديدة؟
- **الإجابة:** بالتأكيد، اتبع البنية الموجودة

- **السؤال:** كيفية الإبلاغ عن خلل؟
- **الإجابة:** افتح issue مع وصف واضح للمشكلة

---

## 📊 إحصائيات المشروع

| البند | الرقم |
|------|-------|
| عدد الصفحات | 10+ |
| عدد المكونات | 25+ |
| عدد المتاجر | 10+ |
| حجم قاعدة البيانات | 9 جداول |
| ملفات التوثيق | 12+ |
| سطور الكود | 3000+ |

---

## ✅ قائمة التحقق قبل الاستخدام

- [ ] قراءة START_HERE.md
- [ ] اختبار التسجيل والدخول
- [ ] استكشاف الداشبورد
- [ ] اختبار حسابات متعددة
- [ ] فحص أمان النظام
- [ ] مراجعة التوثيق الكامل
- [ ] اختبار الأداء
- [ ] الاستعداد للنشر

---

## 🎯 الخطوات التالية

```
1. ابدأ الآن:      npm run dev
2. اختبر سريع:    اقرأ INSTANT_TEST.md
3. اختبر شامل:   اقرأ FINAL_VERIFICATION.md
4. استعد للنشر:   npm run build
```

---

## 🙏 شكر خاص

شكراً لكونك جزءاً من رحلة ClawCommerce!

---

## 📄 الرخصة

MIT License - استخدم بحرية للمشاريع الشخصية والتجارية

---

**صنع بـ ❤️ لإدارة المتاجر الإلكترونية**

</div>
