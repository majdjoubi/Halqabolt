import React from 'react';
import { BookOpen, Heart, Award, Globe } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            من{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              نحن
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            رؤيتنا ورسالتنا في خدمة كتاب الله الكريم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Personal Info */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">د. مجد الدين جوبي</h3>
              <p className="text-emerald-600 font-medium mb-4">ألمانيا</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-emerald-100 rounded-full p-2 mt-1">
                  <Heart className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">الرسالة</h4>
                  <p className="text-gray-600">
                    تعليم كتاب الله الكريم للأجر والثواب، ونشر علوم القرآن بين المسلمين في جميع أنحاء العالم
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-emerald-100 rounded-full p-2 mt-1">
                  <Award className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">الخبرة</h4>
                  <p className="text-gray-600">
                    طبيب متخصص في العظام والطوارئ، يجمع بين العلم الطبي وحب تعليم القرآن الكريم
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-emerald-100 rounded-full p-2 mt-1">
                  <Globe className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">الموقع</h4>
                  <p className="text-gray-600">
                    مقيم في ألمانيا، يخدم الجالية المسلمة والعربية في أوروبا والعالم
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-emerald-100 leading-relaxed">
                أن نكون المنصة الرائدة في تعليم القرآن الكريم عن بُعد، نجمع بين التقنية الحديثة والمنهجية الأصيلة 
                لخدمة كتاب الله وتيسير تعلمه على المسلمين في كل مكان.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                نسعى لتوفير تعليم قرآني متميز يجمع بين:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>الجودة العالية في التعليم</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>المرونة في المواعيد والمناهج</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>الوصول لأكبر عدد من المتعلمين</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span>الحفاظ على الأصالة والمعاصرة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">قيمنا</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">الإخلاص</h4>
              <p className="text-gray-600">
                نعمل بإخلاص لوجه الله الكريم، طلباً للأجر والثواب
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">الجودة</h4>
              <p className="text-gray-600">
                نلتزم بأعلى معايير الجودة في التعليم والخدمة
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600 mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">المحبة</h4>
              <p className="text-gray-600">
                نتعامل مع طلابنا بمحبة واحترام وصبر
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;