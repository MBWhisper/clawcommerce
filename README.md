# ClawCommerce - منصة التجارة الإلكترونية

منصة تجارة إلكترونية متكاملة مبنية باستخدام React، Supabase، وStripe.

## 🚀 البدء السريع

### 1. إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ حساباً
2. أنشئ مشروعاً جديداً
3. انتظر حتى يكتمل إنشاء المشروع

### 2. إعداد قاعدة البيانات

انسخ محتوى ملف `supabase/schema.sql` والصقه في SQL Editor في Supabase:

```bash
# أو استخدم Supabase CLI
supabase db push
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env`:

```bash
cp .env.example .env
```

ثم أضف القيم من Supabase Dashboard:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### 4. تشغيل المشروع

```bash
npm install
npm run dev
```

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

## 💳 إعداد Stripe

### 1. إنشاء حساب Stripe

1. اذهب إلى [stripe.com](https://stripe.com)
2. أنشئ حساباً واحصل على مفاتيح API

### 2. إنشاء المنتجات والأسعار

```javascript
// في Stripe Dashboard أو باستخدام API
const starterMonthly = await stripe.prices.create({
  product_data: { name: 'Starter Monthly' },
  unit_amount: 9900, // 99 ريال
  currency: 'sar',
  recurring: { interval: 'month' },
});
```

### 3. إعداد Webhook

1. في Stripe Dashboard، اذهب إلى Developers > Webhooks
2. أضف endpoint جديد: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. اختر الأحداث:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`

### 4. نشر Edge Function

```bash
supabase functions deploy stripe-webhook
supabase secrets set STRIPE_SECRET_KEY=sk_xxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx
```

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

## 📝 الميزات

### ✅ مكتملة
- [x] صفحة هبوط احترافية
- [x] نظام المصادقة (تسجيل/دخول)
- [x] لوحة تحكم
- [x] إدارة المنتجات (CRUD)
- [x] إدارة الطلبات (CRUD)
- [x] قاعدة بيانات Supabase
- [x] Row Level Security

### 🔜 قادمة
- [ ] إدارة التصنيفات
- [ ] إدارة العملاء
- [ ] إدارة الكوبونات
- [ ] التحليلات والتقارير
- [ ] تكامل Stripe كامل
- [ ] واجهة المتجر العامة
- [ ] إشعارات البريد الإلكتروني

## 🤝 المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## 📄 الرخصة

MIT License
