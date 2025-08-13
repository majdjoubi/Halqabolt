import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, CreditCard, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: {
    id: string;
    name: string;
    hourly_rate: number;
    profile_image_url?: string;
    specialization: string;
  };
  lesson: {
    id: string;
    title: string;
    duration_minutes: number;
    price: number;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, teacher, lesson }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Confirmation, 3: Payment, 4: Success

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleBooking = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get student profile
      const { data: student } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!student) {
        throw new Error('يجب إنشاء ملف شخصي للطالب أولاً');
      }

      const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`);

      const { error } = await supabase
        .from('bookings')
        .insert({
          student_id: student.id,
          lesson_id: lesson.id,
          teacher_id: teacher.id,
          scheduled_at: scheduledAt.toISOString(),
          notes: notes,
          status: 'pending'
        });

      if (error) throw error;

      setStep(4);
    } catch (error) {
      console.error('Error booking lesson:', error);
      alert('حدث خطأ أثناء حجز الدرس');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">حجز درس</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum === 4 && step === 4 ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Teacher & Lesson Info */}
          <div className="bg-emerald-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={teacher.profile_image_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={teacher.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-emerald-600 font-medium">{teacher.specialization}</p>
                <p className="text-gray-600">{lesson.title}</p>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-emerald-600">{lesson.price} ر.س</div>
                <div className="text-sm text-gray-600">{lesson.duration_minutes} دقيقة</div>
              </div>
            </div>
          </div>

          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اختر التاريخ
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اختر الوقت
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTime === time
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ملاحظات إضافية (اختياري)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="أضف أي ملاحظات أو طلبات خاصة..."
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">تأكيد تفاصيل الحجز</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">التاريخ:</span>
                  <span className="font-medium">{new Date(selectedDate).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الوقت:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المدة:</span>
                  <span className="font-medium">{lesson.duration_minutes} دقيقة</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-900 font-semibold">المجموع:</span>
                  <span className="text-xl font-bold text-emerald-600">{lesson.price} ر.س</span>
                </div>
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  السابق
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  المتابعة للدفع
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">الدفع</h3>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-amber-600 ml-2" />
                  <span className="text-amber-800 font-medium">
                    سيتم تفعيل نظام الدفع قريباً. سيتم تأكيد حجزك مؤقتاً.
                  </span>
                </div>
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  السابق
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {loading ? 'جاري الحجز...' : 'تأكيد الحجز'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">تم حجز الدرس بنجاح!</h3>
                <p className="text-gray-600">
                  سيتم التواصل معك قريباً لتأكيد الحجز وإرسال رابط الدرس
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                إغلاق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;