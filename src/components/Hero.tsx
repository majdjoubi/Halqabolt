import React from 'react';
import { BookOpen, Users, Clock, Award, PlayCircle, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              تعلم{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
                القرآن الكريم
              </span>{' '}
              عن بُعد
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              انضم إلى آلاف الطلاب الذين يتعلمون تلاوة وتجويد القرآن الكريم مع أفضل المعلمين المعتمدين
              في جلسات فردية وجماعية تفاعلية
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold">
                <PlayCircle className="inline-block ml-2 h-6 w-6" />
                ابدأ درسك الأول مجاناً
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl transition-all duration-300 text-lg font-semibold">
                تصفح المعلمين
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">200+</div>
                  <div className="text-gray-600 text-sm">معلم متخصص</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">5000+</div>
                  <div className="text-gray-600 text-sm">طالب نشط</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">4.9</div>
                  <div className="text-gray-600 text-sm flex items-center justify-center">
                    <Star className="h-4 w-4 text-amber-400 ml-1" />
                    تقييم
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/8923900/pexels-photo-8923900.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="تعليم القرآن الكريم"
                className="rounded-2xl shadow-2xl object-cover w-full h-96 lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg animate-bounce">
              <div className="flex items-center space-x-2 space-x-reverse">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <span className="font-semibold text-gray-700">درس حي</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="h-6 w-6 text-amber-500" />
                <span className="font-semibold text-gray-700">12 طالب متصل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;