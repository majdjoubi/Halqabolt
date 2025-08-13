import React from 'react';
import { User, Users, BookOpen, Volume2, Calendar, CheckCircle } from 'lucide-react';

const LessonTypes = () => {
  const lessonTypes = [
    {
      id: 1,
      title: 'دروس فردية',
      description: 'دروس خاصة مخصصة لك وحدك مع المعلم',
      icon: User,
      features: [
        'انتباه كامل من المعلم',
        'خطة تعلم مخصصة',
        'مرونة في المنهج والوقت',
        'تصحيح فوري للأخطاء'
      ],
      price: '20-30',
      duration: '60 دقيقة',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'دروس جماعية',
      description: 'تعلم مع مجموعة من الطلاب في جو تفاعلي',
      icon: Users,
      features: [
        'تفاعل مع طلاب آخرين',
        'تكلفة أقل',
        'تحفيز جماعي',
        'تبادل الخبرات'
      ],
      price: '8-15',
      duration: '90 دقيقة',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 3,
      title: 'حلقات التحفيظ',
      description: 'برامج مخصصة لحفظ القرآن الكريم',
      icon: BookOpen,
      features: [
        'منهج متدرج للحفظ',
        'مراجعة دورية',
        'تتبع التقدم',
        'شهادات إتمام'
      ],
      price: '12-18',
      duration: '45 دقيقة',
      color: 'from-amber-600 to-amber-700',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      id: 4,
      title: 'دورات التجويد',
      description: 'تعلم أحكام التجويد وتحسين التلاوة',
      icon: Volume2,
      features: [
        'أحكام التجويد كاملة',
        'تطبيق عملي',
        'تسجيلات للمراجعة',
        'شهادة معتمدة'
      ],
      price: '15-25',
      duration: '75 دقيقة',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <section id="lessons" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            أنواع{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              الدروس
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر النوع المناسب لك من دروسنا المتنوعة التي تلبي جميع احتياجاتك التعليمية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {lessonTypes.map((lesson) => {
            const IconComponent = lesson.icon;
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className={`${lesson.bgColor} p-6 text-center`}>
                  <div className={`inline-flex p-4 rounded-full bg-white shadow-md mb-4`}>
                    <IconComponent className={`h-8 w-8 ${lesson.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {lesson.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">المدة:</span>
                      <span className="font-semibold">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">السعر:</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gray-900">{lesson.price}$</span>
                        <span className="text-gray-600 text-sm"> / درس</span>
                      </div>
                    </div>
                  </div>

                  <button className={`w-full mt-6 bg-gradient-to-r ${lesson.color} text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold`}>
                    احجز الآن
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              مميزات إضافية لجميع الدروس
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
                  <Calendar className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">جدولة مرنة</h4>
                <p className="text-gray-600 text-sm">
                  احجز دروسك في الأوقات المناسبة لك
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
                  <Volume2 className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">تسجيل الدروس</h4>
                <p className="text-gray-600 text-sm">
                  احصل على تسجيلات دروسك للمراجعة
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
                  <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">ضمان الجودة</h4>
                <p className="text-gray-600 text-sm">
                  ضمان استرداد المال في حالة عدم الرضا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonTypes;