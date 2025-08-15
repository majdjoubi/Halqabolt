import React, { useState } from 'react';
import { X, Heart, Users, User, Star, CreditCard, Banknote } from 'lucide-react';

interface DonationPageProps {
  onClose: () => void;
}

const DonationPage: React.FC<DonationPageProps> = ({ onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [25, 50, 100, 200, 500];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount) {
      const teachersAmount = amount * 0.9;
      const platformAmount = amount * 0.1;
      alert(`شكراً لك! سيتم توزيع تبرعك كالتالي:\n• ${teachersAmount} ريال للمعلمين (بالتساوي حسب عملهم)\n• ${platformAmount} ريال للمنصة`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Heart className="h-8 w-8 text-red-500 ml-3" />
              تبرع لدعم المعلمين
            </h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ادعم معلمي القرآن الكريم</h2>
          <p className="text-gray-700 text-lg mb-6">
            تبرعك يساعد جميع المعلمين على تقديم تعليم مجاني للطلاب المحتاجين ونشر تعليم القرآن الكريم. يتم توزيع التبرعات بالتساوي على جميع المعلمين حسب عملهم في الشهر.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">90%</div>
              <p className="text-gray-700">من تبرعك يذهب لجميع المعلمين بالتساوي</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
              <p className="text-gray-700">لتطوير المنصة وتحسين الخدمات</p>
            </div>
          </div>
        </div>

        {/* How Distribution Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">كيف يتم توزيع التبرعات؟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">التوزيع العادل</h4>
              <p className="text-gray-600 text-sm">يتم توزيع 90% من التبرع على جميع المعلمين بالتساوي</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">حسب الأداء</h4>
              <p className="text-gray-600 text-sm">التوزيع يعتمد على عدد الساعات والطلاب في الشهر</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">دعم شامل</h4>
              <p className="text-gray-600 text-sm">تبرعك يدعم جميع المعلمين ويحفزهم على العطاء</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Donation Amount */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">اختر مبلغ التبرع</h3>
            
            {/* Predefined Amounts */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-lg font-bold">{amount} ريال</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                أو أدخل مبلغاً مخصصاً
              </label>
              <div className="relative">
                <Banknote className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="أدخل المبلغ بالريال"
                />
              </div>
            </div>

            {/* Donation Breakdown */}
            {(selectedAmount || customAmount) && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">توزيع التبرع:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>للمعلمين (90%):</span>
                    <span className="font-bold text-emerald-600">
                      {((selectedAmount || parseFloat(customAmount)) * 0.9).toFixed(2)} ريال
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>للمنصة (10%):</span>
                    <span className="font-bold text-blue-600">
                      {((selectedAmount || parseFloat(customAmount)) * 0.1).toFixed(2)} ريال
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>المجموع:</span>
                    <span>{(selectedAmount || parseFloat(customAmount)).toFixed(2)} ريال</span>
                  </div>
                </div>
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!selectedAmount && !customAmount}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
            >
              <CreditCard className="h-5 w-5" />
              <span>تبرع الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;