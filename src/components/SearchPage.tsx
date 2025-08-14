import React from 'react';
import { X, Search, Star, Clock, Users } from 'lucide-react';

interface SearchPageProps {
  onClose: () => void;
  onSelectTeacher: (teacherId: string) => void;
  onSelectTeacher: (teacherId: string) => void;
  showGroupLessonsOnly?: boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({ onClose, onSelectTeacher, showGroupLessonsOnly = false }) => {
  const mockTeachers = [
    {
      id: '1',
      name: 'الشيخ أحمد محمود',
      specialization: 'متخصص في التجويد والقراءات',
      rating: 4.9,
      students: 450,
      price: 25,
      image: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: 'متاح اليوم'
    },
    {
      id: '2',
      name: 'الأستاذة فاطمة السيد',
      specialization: 'تحفيظ القرآن للأطفال',
      rating: 4.8,
      students: 320,
      price: 20,
      image: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: 'متاحة غداً'
    },
    {
      id: '3',
      name: 'الشيخ عمر حسان',
      specialization: 'التفسير وعلوم القرآن',
      rating: 5.0,
      students: 680,
      price: 30,
      image: 'https://images.pexels.com/photos/8923903/pexels-photo-8923903.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: 'متاح الآن'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {showGroupLessonsOnly ? 'الدروس الجماعية المتاحة' : 'البحث عن معلمين'}
            </h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن معلم أو تخصص..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => onSelectTeacher(teacher.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
              <div className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                    <p className="text-gray-600 text-sm">{teacher.specialization}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{teacher.students} طالب</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">{teacher.availability}</span>
                  </div>

                  <div className="text-lg font-bold text-gray-900">
                    {teacher.price} ريال / ساعة
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200">
                  {showGroupLessonsOnly ? 'انضم للدرس المجاني' : 'احجز درس'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;