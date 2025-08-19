import React from 'react';
import { BookOpen, Users, Clock, Award, PlayCircle, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Hero = () => {
  const { user, isAuthenticated } = useAuth();

  const handleStartLearning = () => {
    if (isAuthenticated) {
      // Navigate to search page if already logged in
      const searchButton = document.querySelector('[data-search-teachers]') as HTMLButtonElement;
      if (searchButton) {
        searchButton.click();
      }
    } else {
      // Open auth modal if not logged in
      const startButton = document.querySelector('[data-start-learning]') as HTMLButtonElement;
      if (startButton) {
        startButton.click();
      }
    }
  };

  const handleBrowseTeachers = () => {
    const searchButton = document.querySelector('[data-search-teachers]') as HTMLButtonElement;
    if (searchButton) {
      searchButton.click();
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            {isAuthenticated ? (
              <>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  مرحباً بك{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
                    {user?.profile?.name || user?.email?.split('@')[0]}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  ابدأ رحلتك في تعلم القرآن الكريم مع أفضل المعلمين المعتمدين
                  في جلسات فردية وجماعية تفاعلية
                </p>
              </>
            ) : (
              <>
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
              </>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={handleBrowseTeachers}
                    data-search-teachers
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
                  >
                    <BookOpen className="inline-block ml-2 h-6 w-6" />
                    ابحث عن معلم
                  </button>
                  <button 
                    onClick={() => {
                      const dashboardButton = document.querySelector('[data-dashboard]') as HTMLButtonElement;
                      if (dashboardButton) {
                        dashboardButton.click();
                      }
                    }}
                    className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl transition-all duration-300 text-lg font-semibold"
                  >
                    لوحة التحكم
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleStartLearning}
                    data-start-learning
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold"
                  >
                    <PlayCircle className="inline-block ml-2 h-6 w-6" />
                    ابدأ درسك الأول مجاناً
                  </button>
                  <button 
                    onClick={handleBrowseTeachers}
                    data-search-teachers
                    className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl transition-all duration-300 text-lg font-semibold"
                  >
                    تصفح المعلمين
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Islamic Pattern Design */}
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl p-12 text-center shadow-2xl">
              <div className="text-6xl mb-6">📖</div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                ﴿وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا﴾
              </h3>
              <p className="text-emerald-700 text-lg">
                تعلم القرآن الكريم بأفضل الطرق التعليمية الحديثة
              </p>
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