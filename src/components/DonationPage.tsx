import React, { useState } from 'react';
import { X, Heart, Users, User, Star, CreditCard, Banknote } from 'lucide-react';

interface DonationPageProps {
  onClose: () => void;
}

const DonationPage: React.FC<DonationPageProps> = ({ onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const predefinedAmounts = [25, 50, 100, 200, 500];

  const mockTeachers = [
    {
      id: '1',
      name: 'الشيخ أحمد محمود',
      specialization: 'متخصص في التجويد والقراءات',
      rating: 4.9,
      students: 450,
      image: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'الأستاذة فاطمة السيد',
      specialization: 'تحفيظ القرآن للأطفال',
      rating: 4.8,
      students: 320,
      image: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'الشيخ عمر حسان',
      specialization: 'التفسير وعلوم القرآن',
      rating: 5.0,
      students: 680,
      image: 'https://images.pexels.com/photos/8923903/pexels-photo-8923903.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && selectedTeacher) {
      const teacherAmount = amount * 0.9;
      const platformAmount = amount * 0.1;
      alert(`شكراً لك! سيتم توزيع تبرعك كالتالي:\n• ${teacherAmount} ريال للمعلم\n• ${platformAmount} ريال للمنصة`);
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
            تبرعك يساعد المعلمين على تقديم تعليم مجاني للطلاب المحتاجين ونشر تعليم القرآن الكريم
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">90%</div>
              <p className="text-gray-700">من تبرعك يذهب مباشرة للمعلم المختار</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
              <p className="text-gray-700">لتطوير المنصة وتحسين الخدمات</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Teacher Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">اختر المعلم للتبرع له</h3>
            <div className="space-y-4">
              {mockTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedTeacher === teacher.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{teacher.name}</h4>
                      <p className="text-gray-600 text-sm">{teacher.specialization}</p>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{teacher.rating}</span>
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{teacher.students} طالب</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            {(selectedAmount || customAmount) && selectedTeacher && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">توزيع التبرع:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>للمعلم (90%):</span>
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
              disabled={!selectedTeacher || (!selectedAmount && !customAmount)}
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