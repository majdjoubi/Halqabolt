import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, BookOpen, Clock, Star } from 'lucide-react';

interface RecordedLesson {
  id: string;
  title: string;
  teacher: string;
  duration: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  views: number;
  uploadDate: string;
  videoUrl: string;
}

const RecordedLessons = () => {
  const [lessons] = useState<RecordedLesson[]>([
    {
      id: '1',
      title: 'أحكام التجويد - الدرس الأول',
      teacher: 'الشيخ أحمد محمد',
      duration: '45:30',
      description: 'تعلم أساسيات التجويد وأحكام النون الساكنة والتنوين',
      thumbnail: '🎥',
      category: 'تجويد',
      rating: 4.9,
      views: 1250,
      uploadDate: '2024-01-15',
      videoUrl: '#'
    },
    {
      id: '2',
      title: 'حفظ سورة البقرة - الجزء الأول',
      teacher: 'الأستاذة فاطمة أحمد',
      duration: '60:15',
      description: 'طريقة منهجية لحفظ سورة البقرة مع التكرار والمراجعة',
      thumbnail: '📖',
      category: 'تحفيظ',
      rating: 4.8,
      views: 980,
      uploadDate: '2024-01-10',
      videoUrl: '#'
    },
    {
      id: '3',
      title: 'تفسير آيات الأحكام',
      teacher: 'الشيخ يوسف علي',
      duration: '75:20',
      description: 'شرح مفصل لآيات الأحكام في القرآن الكريم',
      thumbnail: '📚',
      category: 'تفسير',
      rating: 5.0,
      views: 2100,
      uploadDate: '2024-01-05',
      videoUrl: '#'
    },
    {
      id: '4',
      title: 'القراءات العشر - مقدمة',
      teacher: 'الشيخ عبد الرحمن الكويتي',
      duration: '90:45',
      description: 'مقدمة شاملة عن القراءات العشر وأهميتها',
      thumbnail: '🎭',
      category: 'قراءات',
      rating: 4.9,
      views: 750,
      uploadDate: '2024-01-01',
      videoUrl: '#'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [filteredLessons, setFilteredLessons] = useState(lessons);

  const categories = ['الكل', 'تجويد', 'تحفيظ', 'تفسير', 'قراءات'];

  useEffect(() => {
    if (selectedCategory === 'الكل') {
      setFilteredLessons(lessons);
    } else {
      setFilteredLessons(lessons.filter(lesson => lesson.category === selectedCategory));
    }
  }, [selectedCategory, lessons]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            مكتبة{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">
              الدروس المسجلة
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة شاملة من الدروس المسجلة عالية الجودة مع تقنية Agora المتقدمة
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-200 h-48 flex items-center justify-center">
                <div className="text-6xl">{lesson.thumbnail}</div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transform scale-0 hover:scale-100 transition-all duration-300">
                    <Play className="h-8 w-8 text-emerald-600" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {lesson.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                    {lesson.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 mr-1">{lesson.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{lesson.teacher}</span>
                  <span>{lesson.views} مشاهدة</span>
                </div>

                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2 space-x-reverse">
                  <Play className="h-5 w-5" />
                  <span>مشاهدة الدرس</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agora Integration Info */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">
              تقنية Agora المتقدمة للبث
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Volume2 className="h-8 w-8 mx-auto" />
                </div>
                <h4 className="font-bold mb-2">جودة صوتية فائقة</h4>
                <p className="text-emerald-100 text-sm">
                  تقنية متقدمة لضمان وضوح الصوت والتلاوة
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Play className="h-8 w-8 mx-auto" />
                </div>
                <h4 className="font-bold mb-2">بث مباشر سلس</h4>
                <p className="text-emerald-100 text-sm">
                  تجربة بث مباشر بدون انقطاع أو تأخير
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <BookOpen className="h-8 w-8 mx-auto" />
                </div>
                <h4 className="font-bold mb-2">تسجيل عالي الجودة</h4>
                <p className="text-emerald-100 text-sm">
                  حفظ الدروس بجودة عالية للمراجعة اللاحقة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordedLessons;