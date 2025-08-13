import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'الباقة الأساسية',
      price: '29',
      period: 'شهرياً',
      description: 'مثالية للمبتدئين',
      features: [
        '4 دروس فردية شهرياً',
        'دروس جماعية غير محدودة',
        'تسجيلات الدروس',
        'دعم فني أساسي',
        'تطبيق الهاتف المحمول'
      ],
      buttonText: 'ابدأ الآن',
      popular: false,
      color: 'border-gray-200',
      buttonColor: 'bg-gray-900 hover:bg-gray-800',
      icon: Zap
    },
    {
      name: 'الباقة المتقدمة',
      price: '49',
      period: 'شهرياً',
      description: 'الأكثر شعبية للطلاب الجادين',
      features: [
        '8 دروس فردية شهرياً',
        'دروس جماعية غير محدودة',
        'حلقات تحفيظ مخصصة',
        'دورات التجويد المتقدم',
        'تسجيلات الدروس',
        'تقارير التقدم التفصيلية',
        'دعم فني متقدم 24/7',
        'شهادات إتمام'
      ],
      buttonText: 'الأكثر شعبية',
      popular: true,
      color: 'border-emerald-500 ring-2 ring-emerald-500',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      icon: Star
    },
    {
      name: 'الباقة الشاملة',
      price: '79',
      period: 'شهرياً',
      description: 'للطلاب المتفوقين',
      features: [
        'دروس فردية غير محدودة',
        'دروس جماعية غير محدودة',
        'حلقات تحفيظ شخصية',
        'دورات التجويد والقراءات',
        'جلسات تفسير القرآن',
        'تسجيلات الدروس',
        'تقارير تفصيلية أسبوعية',
        'دعم شخصي مخصص',
        'شهادات معتمدة',
        'أولوية في الحجز'
      ],
      buttonText: 'ابدأ التجربة',
      popular: false,
      color: 'border-amber-400',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      icon: Crown
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            باقات{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              مناسبة للجميع
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر الباقة التي تناسب احتياجاتك وميزانيتك، مع ضمان أفضل جودة تعليمية
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${plan.color} ${
                  plan.popular ? 'scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      الأكثر شعبية
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-gray-100 rounded-full mb-4">
                      <IconComponent className={`h-8 w-8 ${plan.popular ? 'text-emerald-600' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}$</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 space-x-reverse">
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${plan.buttonColor}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              هل تحتاج باقة مخصصة؟
            </h3>
            <p className="text-gray-600 mb-6">
              نقدم حلول تعليمية مخصصة للمؤسسات التعليمية والمجموعات الكبيرة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold">
                تواصل معنا
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-xl transition-all duration-200 font-semibold">
                اطلب عرض سعر
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;