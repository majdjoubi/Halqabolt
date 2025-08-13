import React, { useState } from 'react';
import { Heart, DollarSign, BookOpen, Users, Clock, Star } from 'lucide-react';

const Pricing = () => {
  const [donationAmount, setDonationAmount] = useState('');

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            كيف{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              يعمل الموقع؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام مرن يتيح للمعلمين تحديد أسعارهم ومواعيدهم، وللطلاب الاختيار من بين الدروس المتاحة
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* How it works for Students */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-emerald-200">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">للطلاب</h3>
              <p className="text-gray-600">كيف تبدأ رحلة التعلم</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">تصفح المعلمين</h4>
                  <p className="text-gray-600 text-sm">اختر من بين مئات المعلمين المؤهلين</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">اختر نوع الدرس</h4>
                  <p className="text-gray-600 text-sm">درس فردي مخصص أو درس جماعي تفاعلي</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">احجز الموعد</h4>
                  <p className="text-gray-600 text-sm">اختر الوقت المناسب من جدول المعلم</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">ادفع واتعلم</h4>
                  <p className="text-gray-600 text-sm">ادفع بالدولار واستمتع بالدرس</p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works for Teachers */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-blue-200">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">للمعلمين</h3>
              <p className="text-gray-600">كيف تبدأ التدريس</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">أنشئ ملفك الشخصي</h4>
                  <p className="text-gray-600 text-sm">أضف خبراتك وشهادaتك ومؤهلاتك</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">حدد أسعارك</h4>
                  <p className="text-gray-600 text-sm">ضع السعر المناسب لدروسك الفردية والجماعية</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">أضف مواعيدك</h4>
                  <p className="text-gray-600 text-sm">حدد الأوقات المتاحة للتدريس</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">ابدأ التدريس</h4>
                  <p className="text-gray-600 text-sm">استقبل الطلاب واحصل على أجرك</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-lg p-8 border-2 border-rose-200">
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

        {/* Lesson Types */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">أنواع الدروس المتاحة</h3>
            <p className="text-xl text-gray-600">اختر النوع المناسب لك</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-200">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">دروس فردية</h4>
                <p className="text-gray-600">درس خاص مع المعلم</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-emerald-500" />
                  <span>انتباه كامل من المعلم</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-emerald-500" />
                  <span>خطة تعلم مخصصة</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-emerald-500" />
                  <span>مرونة في المنهج والوقت</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-emerald-500" />
                  <span>تصحيح فوري للأخطاء</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">دروس جماعية</h4>
                <p className="text-gray-600">تعلم مع مجموعة من الطلاب</p>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-blue-500" />
                  <span>تفاعل مع طلاب آخرين</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-blue-500" />
                  <span>بيئة تعليمية محفزة</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-blue-500" />
                  <span>تحفيز جماعي</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Star className="h-5 w-5 text-blue-500" />
                  <span>تبادل الخبرات</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              <Clock className="inline h-5 w-5 ml-2" />
              جميع الدروس مدتها ساعة كاملة
            </p>
            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg">
              ابدأ البحث عن معلم
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;