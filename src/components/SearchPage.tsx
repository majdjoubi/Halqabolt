import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, MapPin } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  studentsCount: number;
  hourlyRate: number;
  languages: string[];
  availability: string;
  image: string;
  location: string;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'الشيخ أحمد محمد',
    specialization: 'تحفيظ القرآن الكريم',
    rating: 4.9,
    studentsCount: 150,
    hourlyRate: 50,
    languages: ['العربية', 'الإنجليزية'],
    availability: 'متاح الآن',
    image: '👨‍🏫',
    location: 'السعودية'
  },
  {
    id: '2',
    name: 'الأستاذة فاطمة أحمد',
    specialization: 'تجويد القرآن الكريم',
    rating: 4.8,
    studentsCount: 120,
    hourlyRate: 45,
    languages: ['العربية'],
    availability: 'متاح الآن',
    image: '👩‍🏫',
    location: 'مصر'
  },
  {
    id: '3',
    name: 'الشيخ يوسف علي',
    specialization: 'علوم القرآن والتفسير',
    rating: 4.9,
    studentsCount: 200,
    hourlyRate: 60,
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    availability: 'مشغول',
    image: '👨‍🎓',
    location: 'الإمارات'
  },
  {
    id: '4',
    name: 'الأستاذة خديجة المغربي',
    specialization: 'تحفيظ للأطفال',
    rating: 4.7,
    studentsCount: 80,
    hourlyRate: 40,
    languages: ['العربية', 'الفرنسية'],
    availability: 'متاح الآن',
    image: '👩‍🏫',
    location: 'المغرب'
  },
  {
    id: '5',
    name: 'الشيخ عبد الرحمن الكويتي',
    specialization: 'القراءات العشر',
    rating: 4.9,
    studentsCount: 90,
    hourlyRate: 70,
    languages: ['العربية'],
    availability: 'متاح الآن',
    image: '👨‍🏫',
    location: 'الكويت'
  },
  {
    id: '6',
    name: 'الأستاذة مريم التونسي',
    specialization: 'تجويد وتلاوة',
    rating: 4.6,
    studentsCount: 110,
    hourlyRate: 35,
    languages: ['العربية'],
    availability: 'متاح الآن',
    image: '👩‍🎓',
    location: 'تونس'
  }
];

interface SearchPageProps {
  onClose: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);

  const specializations = [
    'تحفيظ القرآن الكريم',
    'تجويد القرآن الكريم',
    'علوم القرآن والتفسير',
    'القراءات العشر',
    'تحفيظ للأطفال'
  ];

  const genders = [
    'ذكر',
    'أنثى'
  ];

  const handleSearch = () => {
    let filtered = mockTeachers;

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.includes(searchTerm) ||
        teacher.specialization.includes(searchTerm) ||
        teacher.location.includes(searchTerm)
      );
    }

    if (selectedSpecialization) {
      filtered = filtered.filter(teacher =>
        teacher.specialization === selectedSpecialization
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(teacher =>
        teacher.gender === selectedGender
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(teacher =>
        teacher.hourlyRate >= min && teacher.hourlyRate <= max
      );
    }

    setFilteredTeachers(filtered);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedSpecialization, selectedGender, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">البحث عن معلمين</h1>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="h-5 w-5 ml-2" />
                تصفية النتائج
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البحث
                </label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن معلم أو تخصص..."
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التخصص
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">جميع التخصصات</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الجنس
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">جميع المعلمين</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نطاق السعر (ر.س/ساعة)
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">جميع الأسعار</option>
                  <option value="0-40">أقل من 40 ر.س</option>
                  <option value="40-60">40 - 60 ر.س</option>
                  <option value="60-80">60 - 80 ر.س</option>
                  <option value="80-999">أكثر من 80 ر.س</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('');
                  setSelectedGender('');
                  setPriceRange('');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                تم العثور على {filteredTeachers.length} معلم
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{teacher.image}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{teacher.specialization}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 ml-1 text-yellow-400" />
                        <span>التقييم</span>
                      </div>
                      <span className="font-medium">{teacher.rating}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 ml-1" />
                        <span>الطلاب</span>
                      </div>
                      <span className="font-medium">{teacher.studentsCount}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 ml-1" />
                        <span>الموقع</span>
                      </div>
                      <span className="font-medium">{teacher.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 ml-1" />
                        <span>الحالة</span>
                      </div>
                      <span className={`font-medium ${
                        teacher.availability === 'متاح الآن' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {teacher.availability}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.languages.slice(0, 2).map((language) => (
                        <span
                          key={language}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-emerald-600">
                      {teacher.hourlyRate} ر.س
                    </span>
                    <span className="text-gray-600 text-sm">للساعة</span>
                  </div>

                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    احجز درس تجريبي
                  </button>
                </div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600">جرب تغيير معايير البحث</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;