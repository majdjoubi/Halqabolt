import React from 'react';
import { BookOpen, Users, Clock, Award, Shield, HeadphonesIcon, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'تعليم متخصص',
      description: 'معلمون مؤهلون وحاصلون على إجازات في القرآن الكريم والتجويد',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      icon: Users,
      title: 'دروس جماعية وفردية',
      description: 'اختر بين الدروس الفردية المخصصة أو الجماعية التفاعلية',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Clock,
      title: 'مرونة في المواعيد',
      description: 'احجز دروسك في الأوقات التي تناسبك على مدار الساعة',
      color: 'text-amber-600 bg-amber-100'
    },
    {
      icon: Award,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات إتمام لمستوياتك في التلاوة والحفظ',
      color: 'text-rose-600 bg-rose-100'
    },
    {
      icon: Shield,
      title: 'بيئة تعليمية آمنة',
      description: 'منصة محمية ومراقبة لضمان أفضل تجربة تعليمية',
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            لماذا تختار{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              حلقة؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم لك تجربة تعليمية فريدة تجمع بين التقنية الحديثة والمنهجية الأصيلة في تعليم القرآن الكريم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                تجربة تعليمية لا مثيل لها
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-emerald-200 rounded-full p-2 mt-1">
                    <HeadphonesIcon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">جودة صوتية عالية</h4>
                    <p className="text-gray-600">تقنية متقدمة لنقل أدق تفاصيل التجويد والنطق</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-emerald-200 rounded-full p-2 mt-1">
                    <Star className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">متابعة دقيقة للتقدم</h4>
                    <p className="text-gray-600">تقارير مفصلة عن مستواك وتطورك في الحفظ والتلاوة</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-emerald-200 rounded-full p-2 mt-1">
                    <Users className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">مجتمع تعليمي متفاعل</h4>
                    <p className="text-gray-600">انضم لمجتمع من المتعلمين والمعلمين المتميزين</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl p-8 text-center">
              <div className="text-8xl mb-4">🕌</div>
              <h4 className="text-xl font-bold text-emerald-800 mb-2">
                بيئة تعليمية إسلامية أصيلة
              </h4>
              <p className="text-emerald-700">
                تعلم في جو إيماني يساعدك على التركيز والخشوع
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;