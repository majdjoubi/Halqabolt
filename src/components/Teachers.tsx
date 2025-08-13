import React from 'react';
import { Star, Clock, Users, Award, BookOpen } from 'lucide-react';
import { useTeachers } from '../hooks/useTeachers';

export default function Teachers() {
  const { teachers, loading, error } = useTeachers();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">معلمونا المعتمدون</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نخبة من المعلمين المؤهلين والمعتمدين في تعليم القرآن الكريم وعلومه
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">خطأ في تحميل البيانات</h2>
            <p className="text-red-600">عذراً، حدث خطأ أثناء تحميل بيانات المعلمين. يرجى المحاولة مرة أخرى.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">معلمونا المعتمدون</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نخبة من المعلمين المؤهلين والمعتمدين في تعليم القرآن الكريم وعلومه
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 group"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={teacher.profile_image_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face`}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-100 group-hover:border-emerald-200 transition-colors"
                  />
                  {teacher.is_verified && (
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1">
                      <Award className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                <p className="text-emerald-600 font-medium mb-2">{teacher.specialization}</p>
                
                <div className="flex items-center justify-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(Number(teacher.rating))
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 mr-1">
                    ({Number(teacher.rating).toFixed(1)})
                  </span>
                </div>
                
                <div className="text-center mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    teacher.gender === 'ذكر' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    معلم {teacher.gender === 'ذكر' ? '' : 'ة'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 ml-2" />
                    <span>الخبرة</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {teacher.experience_years} سنوات
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 ml-2" />
                    <span>الطلاب</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {teacher.students_count} طالب
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 ml-2" />
                    <span>السعر</span>
                  </div>
                  <span className="font-bold text-emerald-600">
                    {Number(teacher.hourly_rate).toFixed(0)} ر.س/ساعة
                  </span>
                </div>
              </div>

              {teacher.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {teacher.bio}
                </p>
              )}

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {teacher.languages?.slice(0, 3).map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
                  احجز درس
                </button>
                <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium text-sm">
                  الملف الشخصي
                </button>
              </div>

              <div className={`mt-3 text-center text-xs ${
                teacher.availability_status === 'available' 
                  ? 'text-green-600' 
                  : teacher.availability_status === 'busy'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                {teacher.availability_status === 'available' && '● متاح الآن'}
                {teacher.availability_status === 'busy' && '● مشغول'}
                {teacher.availability_status === 'offline' && '● غير متصل'}
              </div>
            </div>
          ))}
        </div>

        {teachers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد معلمين متاحين حالياً</h3>
            <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-white text-emerald-600 border-2 border-emerald-600 py-3 px-8 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300 font-medium">
            عرض جميع المعلمين
          </button>
        </div>
      </div>
    </section>
  );
}