import React, { useState } from 'react';
import { User, BookOpen, Star, Clock, Calendar, Camera, X, Wallet, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import PaymentModal from './PaymentModal';

interface StudentDashboardProps {
  onClose: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [studentData, setStudentData] = useState({
    name: user?.name || '',
    age: '',
    level: 'beginner',
    goals: [] as string[],
    preferred_schedule: '',
    profile_image_url: '',
    wallet_balance: 150.00 // Mock wallet balance
  });

  const [bookings] = useState([
    {
      id: '1',
      teacher_name: 'الشيخ أحمد محمود',
      lesson_title: 'درس التجويد',
      scheduled_at: '2025-01-15 10:00',
      status: 'confirmed'
    },
    {
      id: '2',
      teacher_name: 'الأستاذة فاطمة السيد',
      lesson_title: 'حفظ سورة البقرة',
      scheduled_at: '2025-01-16 14:00',
      status: 'pending'
    }
  ]);

  const [favoriteTeachers] = useState([
    {
      id: '1',
      name: 'الشيخ أحمد محمود',
      specialization: 'التجويد والقراءات',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '2',
      name: 'الأستاذة فاطمة السيد',
      specialization: 'تحفيظ القرآن',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would save to Supabase
      alert('تم حفظ الملف الشخصي بنجاح');
    } catch (error: any) {
      alert('حدث خطأ أثناء حفظ الملف الشخصي');
    }
  };

  const handleChargeWallet = () => {
    setShowPaymentModal(true);
  };

  const handleChargeAmount = (amount: number) => {
    setChargeAmount(amount);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log('Payment successful:', paymentIntent);
    // تحديث رصيد المحفظة
    setStudentData(prev => ({
      ...prev,
      wallet_balance: prev.wallet_balance + chargeAmount
    }));
    alert(`تم شحن ${chargeAmount} ريال بنجاح!`);
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الطالب</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={studentData.profile_image_url || 'https://images.pexels.com/photos/8923904/pexels-photo-8923904.jpeg?auto=compress&cs=tinysrgb&w=200'}
                    alt="الصورة الشخصية"
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{user?.name || 'مستخدم'}</h3>
                <p className="text-gray-600">طالب</p>
              </div>

              {/* Wallet Balance */}
              <div className="bg-emerald-50 p-4 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700">رصيد المحفظة</p>
                    <p className="text-2xl font-bold text-emerald-800">{studentData.wallet_balance.toFixed(2)} ريال</p>
                  </div>
                  <Wallet className="h-8 w-8 text-emerald-600" />
                </div>
                <button
                  onClick={handleChargeWallet}
                  className="w-full mt-3 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  شحن الرصيد
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <User className="inline-block ml-3 h-5 w-5" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'wallet' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Wallet className="inline-block ml-3 h-5 w-5" />
                  المحفظة
                </button>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'lessons' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="inline-block ml-3 h-5 w-5" />
                  دروسي
                </button>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'teachers' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Star className="inline-block ml-3 h-5 w-5" />
                  المعلمون المفضلون
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">الملف الشخصي</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      value={studentData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">العمر</label>
                    <input
                      type="number"
                      value={studentData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="أدخل عمرك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
                    <select
                      value={studentData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="beginner">مبتدئ</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">متقدم</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الجدول المفضل</label>
                    <input
                      type="text"
                      value={studentData.preferred_schedule}
                      onChange={(e) => handleInputChange('preferred_schedule', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="مثال: صباحاً من 9-12"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
                >
                  حفظ التغييرات
                </button>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">المحفظة</h2>
                
                {/* Current Balance */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-xl mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">الرصيد الحالي</p>
                      <p className="text-3xl font-bold">{studentData.wallet_balance.toFixed(2)} ريال</p>
                    </div>
                    <Wallet className="h-12 w-12 text-emerald-200" />
                  </div>
                </div>

                {/* Charge Options */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleChargeAmount(amount)}
                      className="border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 p-4 rounded-xl transition-all duration-200 text-center"
                    >
                      <CreditCard className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="font-bold text-gray-900">{amount} ريال</p>
                      <p className="text-sm text-gray-600">شحن سريع</p>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">شحن مبلغ مخصص</h3>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="أدخل المبلغ"
                      value={chargeAmount || ''}
                      onChange={(e) => setChargeAmount(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      onClick={() => chargeAmount > 0 && setShowPaymentModal(true)}
                      disabled={!chargeAmount || chargeAmount <= 0}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      شحن
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">دروسي</h2>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{booking.lesson_title}</h3>
                          <p className="text-gray-600">مع {booking.teacher_name}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 ml-1" />
                            {new Date(booking.scheduled_at).toLocaleString('ar-SA')}
                          </div>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">المعلمون المفضلون</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {favoriteTeachers.map((teacher) => (
                    <div key={teacher.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                          <p className="text-gray-600 text-sm">{teacher.specialization}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 mr-1">{teacher.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        احجز درس
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={chargeAmount}
        description={`شحن رصيد المحفظة - ${chargeAmount} ريال`}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default StudentDashboard;