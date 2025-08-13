import React from 'react';
import { BookOpen, Users, Clock, Star, CheckCircle } from 'lucide-react';

const LessonTypes = () => {
  const lessonTypes = [
    {
      id: 1,
      title: 'دروس فردية',
      description: 'دروس خاصة مخصصة لك وحدك مع المعلم',
      icon: BookOpen,
      features: [
        'انتباه كامل من المعلم',
        'خطة تعلم مخصصة حسب مستواك',
        'مرونة في المنهج والوقت',
        'تصحيح فوري للأخطاء',
        'تركيز على نقاط الضعف',
        'تقدم أسرع في التعلم'
      ],
      duration: '60 دقيقة',
      color: 'from-emerald-600 to-emerald-700',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      priceNote: 'السعر يحدده المعلم'
    },
    {
      id: 2,
      title: 'دروس جماعية',
      description: 'تعلم مع مجموعة من الطلاب في جو تفاعلي',
      icon: Users,
      features: [
        'تفاعل مع طلاب آخرين',
        'بيئة تعليمية محفزة',
        'تحفيز جماعي للتعلم',
        'تبادل الخبرات والتجارب',
        'تكلفة أقل من الدروس الفردية',
        'جو أسري ودود'
      ],
      duration: '60 دقيقة',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      priceNote: 'السعر يحدده المعلم'
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
            اختر النوع المناسب لك من دروسنا المتنوعة. كل معلم يحدد أسعاره ومواعيده المتاحة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {lessonTypes.map((lesson) => {
            const IconComponent = lesson.icon;
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className={`${lesson.bgColor} p-8 text-center`}>
                  <div className={`inline-flex p-6 rounded-full bg-white shadow-lg mb-6`}>
                    <IconComponent className={`h-12 w-12 ${lesson.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{lesson.title}</h3>
                  <p className="text-gray-600 text-lg">{lesson.description}</p>
                </div>

                <div className="p-8">
                  <div className="space-y-4 mb-8">
                    {lesson.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="h-5 w-5 ml-2" />
                        المدة:
                      </span>
                      <span className="font-semibold text-lg">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">السعر:</span>
                      <span className="font-semibold text-emerald-600">{lesson.priceNote}</span>
                    </div>
                  </div>

                  <button className={`w-full mt-8 bg-gradient-to-r ${lesson.color} text-white py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold text-lg`}>
                    ابحث عن معلم
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              كيف يعمل النظام؟
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <BookOpen className="h-8 w-8 text-emerald-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">المعلم يحدد السعر</h4>
                <p className="text-gray-600">
                  كل معلم يضع أسعاره الخاصة للدروس الفردية والجماعية حسب خبرته ومؤهلاته
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">المعلم يحدد المواعيد</h4>
                <p className="text-gray-600">
                  المعلمون يضعون جداولهم المتاحة والطلاب يختارون الأوقات المناسبة لهم
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <Users className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">الطالب يختار ويحجز</h4>
                <p className="text-gray-600">
                  تصفح المعلمين، اختر المناسب لك، واحجز الدرس في الوقت المتاح
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg">
              ابدأ الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonTypes;