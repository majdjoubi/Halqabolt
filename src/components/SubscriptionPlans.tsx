import React, { useState } from 'react';
import { Check, Crown, Star } from 'lucide-react';
import { subscriptionPlans, SubscriptionPlan } from '../lib/stripe';
import PaymentModal from './PaymentModal';

const SubscriptionPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log('Payment successful:', paymentIntent);
    // هنا يمكنك إضافة منطق حفظ الاشتراك في قاعدة البيانات
    alert('تم الاشتراك بنجاح! مرحباً بك في منصة حلقة');
  };

  const getPlanIcon = (planId: string) => {
    if (planId.includes('premium')) {
      return <Crown className="h-8 w-8 text-amber-500" />;
    }
    return <Star className="h-8 w-8 text-emerald-500" />;
  };

  const getPlanColor = (planId: string) => {
    if (planId.includes('premium')) {
      return 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50';
    }
    return 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50';
  };

  const getButtonColor = (planId: string) => {
    if (planId.includes('premium')) {
      return 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700';
    }
    return 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            اختر الخطة المناسبة لك
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            خطط مرنة تناسب جميع الاحتياجات والميزانيات لتعلم القرآن الكريم
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${getPlanColor(plan.id)}`}
            >
              {plan.id.includes('yearly') && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    الأكثر توفيراً
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {getPlanIcon(plan.id)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plan.price} ريال
                </div>
                <p className="text-gray-600">
                  {plan.interval === 'month' ? 'شهرياً' : 'سنوياً'}
                </p>
                {plan.id.includes('yearly') && (
                  <p className="text-sm text-amber-600 font-medium mt-2">
                    وفر 408 ريال سنوياً!
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-500 ml-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full text-white py-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${getButtonColor(plan.id)}`}
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            جميع الخطط تشمل ضمان استرداد المال خلال 30 يوماً
          </p>
          <div className="flex justify-center items-center space-x-8 space-x-reverse text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="h-4 w-4 text-emerald-500 ml-1" />
              دفع آمن ومشفر
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-emerald-500 ml-1" />
              إلغاء في أي وقت
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 text-emerald-500 ml-1" />
              دعم فني 24/7
            </span>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedPlan?.price || 0}
        description={selectedPlan?.name || ''}
        onSuccess={handlePaymentSuccess}
      />
    </section>
  );
};

export default SubscriptionPlans;