import { loadStripe } from '@stripe/stripe-js';

// تحميل Stripe مع المفتاح العام
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export { stripePromise };

// أنواع البيانات للدفع
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

// خطط الاشتراك المتاحة
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic_monthly',
    name: 'الخطة الأساسية - شهرية',
    price: 99,
    currency: 'SAR',
    interval: 'month',
    features: [
      '4 دروس شهرياً',
      'دروس فردية',
      'دعم فني',
      'تسجيلات الدروس'
    ]
  },
  {
    id: 'premium_monthly',
    name: 'الخطة المميزة - شهرية',
    price: 199,
    currency: 'SAR',
    interval: 'month',
    features: [
      '8 دروس شهرياً',
      'دروس فردية وجماعية',
      'دعم فني متقدم',
      'تسجيلات الدروس',
      'مواد تعليمية إضافية'
    ]
  },
  {
    id: 'premium_yearly',
    name: 'الخطة المميزة - سنوية',
    price: 1999,
    currency: 'SAR',
    interval: 'year',
    features: [
      '96 درس سنوياً',
      'دروس فردية وجماعية',
      'دعم فني متقدم',
      'تسجيلات الدروس',
      'مواد تعليمية إضافية',
      'خصم 17% على السعر الشهري'
    ]
  }
];

// إنشاء Payment Intent للدفع الفوري
export const createPaymentIntent = async (amount: number, currency: string = 'SAR') => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe يستخدم أصغر وحدة عملة (هللة للريال)
        currency: currency.toLowerCase(),
      }),
    });

    if (!response.ok) {
      throw new Error('فشل في إنشاء عملية الدفع');
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في إنشاء Payment Intent:', error);
    throw error;
  }
};

// إنشاء اشتراك
export const createSubscription = async (planId: string, customerId?: string) => {
  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('فشل في إنشاء الاشتراك');
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في إنشاء الاشتراك:', error);
    throw error;
  }
};

// إلغاء الاشتراك
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId,
      }),
    });

    if (!response.ok) {
      throw new Error('فشل في إلغاء الاشتراك');
    }

    return await response.json();
  } catch (error) {
    console.error('خطأ في إلغاء الاشتراك:', error);
    throw error;
  }
};