import React, { useState } from 'react';
import { Star, Clock, Users, Award, BookOpen, Calendar, MessageCircle, Heart } from 'lucide-react';
import BookingModal from './BookingModal';

interface TeacherProfileProps {
  teacher: {
    id: string;
    name: string;
    specialization: string;
    experience_years: number;
    rating: number;
    students_count: number;
    hourly_rate: number;
    bio?: string;
    certificates: string[];
    languages: string[];
    availability_status: string;
    profile_image_url?: string;
    is_verified: boolean;
  };
  onClose: () => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onClose }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const lessons = [
    {
      id: '1',
      title: 'درس فردي - تلاوة وتجويد',
      duration_minutes: 60,
      price: teacher.hourly_rate,
      description: 'درس فردي مخصص لتعلم التلاوة الصحيحة وأحكام التجويد'
    },
    {
      id: '2',
      title: 'حلقة تحفيظ',
      duration_minutes: 45,
      price: teacher.hourly_rate * 0.75,
      description: 'حلقة مخصصة لحفظ القرآن الكريم مع المراجعة'
    },
    {
      id: '3',
      title: 'درس جماعي',
      duration_minutes: 90,
      price: teacher.hourly_rate * 0.5,
      description: 'درس جماعي تفاعلي مع مجموعة من الطلاب'
    }
  ];

  const reviews = [
    {
      id: 1,
      student_name: 'أحمد محمد',
      rating: 5,
      comment: 'معلم ممتاز وصبور، تحسن مستواي كثيراً معه',
      date: '2024-01-15'
    },
    {
      id: 2,
      student_name: 'فاطمة أحمد',
      rating: 5,
      comment: 'أسلوب تعليم رائع ومفهوم، أنصح بشدة',
      date: '2024-01-10'
    },
    {
      id: 3,
      student_name: 'يوسف علي',
      rating: 4,
      comment: 'معلم متميز ومتفهم لاحتياجات الطلاب',
      date: '2024-01-05'
    }
  ];

  const handleBookLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="relative">
              <img
                src={teacher.profile_image_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={teacher.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              {teacher.is_verified && (
                <div className="absolute -bottom-2 -right-2 bg-white text-emerald-600 rounded-full p-1">
                  <Award className="w-5 h-5" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
              <p className="text-emerald-100 text-lg mb-3">{teacher.specialization}</p>
              
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(teacher.rating)
                            ? 'text-yellow-300 fill-current'
                            : 'text-white text-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-medium">({teacher.rating})</span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="w-5 h-5" />
                  <span>{teacher.students_count} طالب</span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-5 h-5" />
                  <span>{teacher.experience_years} سنوات خبرة</span>
                </div>
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-3xl font-bold">{teacher.hourly_rate} ر.س</div>
              <div className="text-emerald-100">للساعة</div>
              <div className={`mt-2 px-3 py-1 rounded-full text-sm ${
                teacher.availability_status === 'available' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-white'
              }`}>
                {teacher.availability_status === 'available' ? 'متاح الآن' : 'مشغول'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">نبذة عن المعلم</h2>
                <p className="text-gray-700 leading-relaxed">
                  {teacher.bio || 'معلم متخصص في تعليم القرآن الكريم وعلومه، يتمتع بخبرة واسعة في التدريس والتعامل مع الطلاب من مختلف الأعمار والمستويات.'}
                </p>
              </div>

              {/* Certificates */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">الشهادات والمؤهلات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teacher.certificates.length > 0 ? teacher.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse p-4 bg-emerald-50 rounded-lg">
                      <Award className="w-6 h-6 text-emerald-600" />
                      <span className="text-gray-800">{cert}</span>
                    </div>
                  )) : (
                    <div className="col-span-2 text-gray-600">لم يتم إضافة شهادات بعد</div>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">اللغات</h2>
                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">آراء الطلاب</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.student_name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.student_name}</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Lessons */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">الدروس المتاحة</h3>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{lesson.duration_minutes} دقيقة</span>
                        <span className="text-lg font-bold text-emerald-600">{lesson.price} ر.س</span>
                      </div>
                      <button
                        onClick={() => handleBookLesson(lesson)}
                        className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                      >
                        احجز الآن
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <MessageCircle className="w-5 h-5" />
                    <span>إرسال رسالة</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <Heart className="w-5 h-5" />
                    <span>إضافة للمفضلة</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <Calendar className="w-5 h-5" />
                    <span>عرض التقويم</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedLesson && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          teacher={teacher}
          lesson={selectedLesson}
        />
      )}
    </div>
  );
};

export default TeacherProfile;