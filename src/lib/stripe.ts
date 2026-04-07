// Stripe integration helpers

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// Price IDs - replace with your actual Stripe price IDs
export const STRIPE_PRICES = {
  starter: {
    monthly: 'price_starter_monthly',
    yearly: 'price_starter_yearly',
  },
  professional: {
    monthly: 'price_professional_monthly',
    yearly: 'price_professional_yearly',
  },
  enterprise: {
    monthly: 'price_enterprise_monthly',
    yearly: 'price_enterprise_yearly',
  },
};

// Plan features
export const PLAN_FEATURES = {
  free: {
    name: 'مجاني',
    price: { monthly: 0, yearly: 0 },
    features: [
      '10 منتجات',
      '100 طلب/شهر',
      'دعم البريد الإلكتروني',
      'تقارير أساسية',
    ],
    limits: {
      products: 10,
      orders: 100,
      storage: '100MB',
    },
  },
  starter: {
    name: 'الباقة الأساسية',
    price: { monthly: 99, yearly: 990 },
    features: [
      '100 منتج',
      '1000 طلب/شهر',
      'دعم أولوية',
      'تقارير متقدمة',
      'نطاق مخصص',
      'إزالة العلامة المائية',
    ],
    limits: {
      products: 100,
      orders: 1000,
      storage: '1GB',
    },
  },
  professional: {
    name: 'الباقة الاحترافية',
    price: { monthly: 249, yearly: 2490 },
    features: [
      'منتجات غير محدودة',
      'طلبات غير محدودة',
      'دعم 24/7',
      'تقارير متقدمة مع AI',
      'تكامل API كامل',
      'فريق متعدد',
      'أتمتة متقدمة',
    ],
    limits: {
      products: -1,
      orders: -1,
      storage: '10GB',
    },
  },
  enterprise: {
    name: 'باقة الشركات',
    price: { monthly: 499, yearly: 4990 },
    features: [
      'كل ميزات الاحترافية',
      'مدير حساب مخصص',
      'SLA مخصص',
      'تدريب مخصص',
      'تخصيص كامل',
      'استضافة مخصصة',
    ],
    limits: {
      products: -1,
      orders: -1,
      storage: 'unlimited',
    },
  },
};

// Create checkout session
export async function createCheckoutSession(
  plan: 'starter' | 'professional' | 'enterprise',
  billing: 'monthly' | 'yearly',
  userId: string,
  storeId: string
): Promise<string> {
  const priceId = STRIPE_PRICES[plan][billing];
  
  // In production, this would call your backend API
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId,
      storeId,
      successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/pricing`,
    }),
  });

  const { sessionUrl } = await response.json();
  return sessionUrl;
}

// Create customer portal session
export async function createPortalSession(customerId: string): Promise<string> {
  const response = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      returnUrl: `${window.location.origin}/dashboard/settings`,
    }),
  });

  const { sessionUrl } = await response.json();
  return sessionUrl;
}

// Check if Stripe is configured
export function isStripeConfigured(): boolean {
  return Boolean(STRIPE_PUBLISHABLE_KEY);
}
