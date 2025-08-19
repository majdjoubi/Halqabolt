import React from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: BookOpen,
      title: 'تعليم متخصص',
      titleEn: 'Specialized Teaching',
      description: 'معلمون مؤهلون وحاصلون على إجازات في القرآن الكريم والتجويد',
      descriptionEn: 'Qualified teachers with certifications in Quran and Tajweed',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      icon: Users,
      title: 'دروس فردية وجماعية',
      titleEn: 'Individual & Group Lessons',
      description: 'دروس خاصة مع المعلم أو دروس جماعية تفاعلية مع طلاب آخرين',
      descriptionEn: 'Private lessons with teachers or interactive group lessons with other students',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Clock,
      title: 'مرونة في المواعيد',
      titleEn: 'Flexible Scheduling',
      description: 'احجز دروسك في الأوقات التي تناسبك على مدار الساعة',
      descriptionEn: 'Book your lessons at times that suit you around the clock',
      color: 'text-amber-600 bg-amber-100'
    },
    {
      icon: Award,
      title: 'معلمون معتمدون',
      titleEn: 'Certified Teachers',
      description: 'جميع المعلمين حاصلون على إجازات وشهادات معتمدة في تعليم القرآن',
      descriptionEn: 'All teachers have certified licenses and credentials in Quran teaching',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('whyChoose')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              حلقة؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {document.dir === 'rtl' ? feature.title : feature.titleEn}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {document.dir === 'rtl' ? feature.description : feature.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;