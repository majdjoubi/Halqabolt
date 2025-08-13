import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Heart, DollarSign, Users, User, BookOpen } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [donationAmount, setDonationAmount] = useState('');

  const plans = [
    {
      name: 'الباقة الأساسية',
      dailyPrice: 5,
      weeklyPrice: 30,
      monthlyPrice: 100,
      description: 'مثالية للمبتدئين',
      features: [
        'درس جماعي مجاني (ساعة واحدة)',
        '2 درس فردي شهرياً',
        '8 دروس جماعية شهرياً',
        '4 دروس تحفيظ شهرياً',
        'دعم فني أساسي'
      ],
      buttonText: 'ابدأ الآن',
      popular: false,
      color: 'border-gray-200',
      buttonColor: 'bg-gray-900 hover:bg-gray-800',
      icon: Zap
    },
    {
      name: 'الباقة المتوسطة',
      dailyPrice: 8,
      weeklyPrice: 50,
      monthlyPrice: 160,
      description: 'الأكثر شعبية للطلاب الجادين',
      features: [
        'درس جماعي مجاني (ساعة واحدة)',
        '4 دروس فردية شهرياً',
        '16 درس جماعي شهرياً',
        '8 دروس تحفيظ شهرياً',
        'تقارير التقدم',
        'دعم فني متقدم 24/7',
        'أولوية في الحجز'
      ],
      buttonText: 'الأكثر شعبية',
      popular: true,
      color: 'border-emerald-500 ring-2 ring-emerald-500',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      icon: Star
    },
    {
      name: 'الباقة الشاملة',
      dailyPrice: 12,
      weeklyPrice: 75,
      monthlyPrice: 240,
      description: 'للطلاب المتفوقين',
      features: [
        'درس جماعي مجاني (ساعة واحدة)',
        '8 دروس فردية شهرياً',
        'دروس جماعية غير محدودة',
        'دروس تحفيظ غير محدودة',
        'تقارير تفصيلية أسبوعية',
        'دعم شخصي مخصص',
        'شهادات معتمدة',
        'أولوية عالية في الحجز'
      ],
      buttonText: 'ابدأ التجربة',
      popular: false,
      color: 'border-amber-400',
      buttonColor: 'bg-amber-600 hover:bg-amber-700',
      icon: Crown
    }
  ];

  const lessonTypes = [
    {
      type: 'فردي',
      price: 15,
      duration: '60 دقيقة',
      description: 'درس خاص مع المعلم',
      icon: User,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      type: 'جماعي',
      price: 8,
      duration: '60 دقيقة',
      description: 'مع مجموعة من الطلاب (حد أقصى 6)',
      icon: Users,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      type: 'تحفيظ',
      price: 10,
      duration: '60 دقيقة',
      description: 'حلقة تحفيظ (حد أقصى 4 طلاب)',
      icon: BookOpen,
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  const getCurrentPrice = (plan: any) => {
    switch (billingCycle) {
      case 'daily':
        return plan.dailyPrice;
      case 'weekly':
        return plan.weeklyPrice;
      case 'monthly':
        return plan.monthlyPrice;
      default:
        return plan.weeklyPrice;
    }
  };

  const getCycleText = () => {
    switch (billingCycle) {
      case 'daily':
        return 'يومياً';
      case 'weekly':
        return 'أسبوعياً';
      case 'monthly':
        return 'شهرياً';
      default:
        return 'أسبوعياً';
    }
  };

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            اختر الباقة التي تناسب احتياجاتك مع درس جماعي مجاني لجميع الطلاب الجدد
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setBillingCycle('daily')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'daily'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                يومي
              </button>
              <button
                onClick={() => setBillingCycle('weekly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'weekly'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                أسبوعي
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                شهري
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">أسعار الدروس</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {lessonTypes.map((lesson, index) => {
              const IconComponent = lesson.icon;
              return (
                <div key={index} className={`${lesson.color} border-2 rounded-2xl p-6 text-center`}>
                  <div className="inline-flex p-3 bg-white rounded-full mb-4 shadow-sm">
                    <IconComponent className="h-8 w-8 text-gray-700" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">درس {lesson.type}</h4>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">${lesson.price}</div>
                  <p className="text-gray-600 text-sm mb-2">{lesson.duration}</p>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-emerald-800 font-medium">
                🎉 <strong>عرض خاص:</strong> درس جماعي مجاني (ساعة كاملة) لجميع الطلاب الجدد!
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Plans */}
          <div className="lg:col-span-3">
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
                          <span className="text-5xl font-bold text-gray-900">${getCurrentPrice(plan)}</span>
                          <span className="text-gray-600">{getCycleText()}</span>
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
          </div>

          {/* Donation Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-lg p-8 border-2 border-rose-200 sticky top-8">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-rose-100 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ادعم المعلمين</h3>
                <p className="text-gray-600 text-sm">
                  تبرعك يذهب مباشرة لدعم المعلمين (90%) ومساعدة الموقع على الاستمرار (10%)
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مبلغ التبرع ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="أدخل المبلغ"
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      min="1"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-rose-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>للمعلمين (90%):</span>
                      <span className="font-medium text-emerald-600">
                        ${donationAmount ? (Number(donationAmount) * 0.9).toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>للموقع (10%):</span>
                      <span className="font-medium text-gray-700">
                        ${donationAmount ? (Number(donationAmount) * 0.1).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={!donationAmount || Number(donationAmount) <= 0}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-lg hover:from-rose-700 hover:to-pink-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تبرع الآن
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    جميع التبرعات آمنة ومحمية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Sharing Info */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              نموذج عادل للجميع
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نحن نؤمن بالعدالة في توزيع الأرباح بين المعلمين والمنصة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-4">حصة المعلم</h4>
              <div className="text-4xl font-bold text-emerald-600 mb-2">70%</div>
              <p className="text-gray-600">من رسوم كل درس تذهب مباشرة للمعلم</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-4">حصة المنصة</h4>
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <p className="text-gray-600">لتطوير المنصة وتقديم أفضل الخدمات</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;