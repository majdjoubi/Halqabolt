import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, MapPin, DollarSign } from 'lucide-react';
import { useTeachers, Teacher } from '../hooks/useTeachers';
import TeacherProfile from './TeacherProfile';

interface SearchPageProps {
  onClose: () => void;
  showGroupLessonsOnly?: boolean;
}

const SearchPage: React.FC<SearchPageProps> = ({ onClose, showGroupLessonsOnly = false }) => {
  const { teachers, loading, error } = useTeachers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [lessonType, setLessonType] = useState(showGroupLessonsOnly ? 'group' : '');
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isTeacherProfileOpen, setIsTeacherProfileOpen] = useState(false);

  const specializations = [
    'تحفيظ القرآن الكريم والتجويد',
    'تجويد القرآن الكريم',
    'علوم القرآن والتفسير',
    'تحفيظ القرآن للأطفال'
  ];

  const genders = [
    'ذكر',
    'أنثى'
  ];

  const handleSearch = () => {
    let filtered = teachers;

    // إذا كان showGroupLessonsOnly مفعل، أظهر فقط المعلمين الذين لديهم دروس جماعية متاحة
    if (showGroupLessonsOnly) {
      filtered = filtered.filter(teacher => teacher.group_lesson_price > 0);
    }

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
        Number(teacher.individual_lesson_price) >= min && Number(teacher.individual_lesson_price) <= max
      );
    }

    setFilteredTeachers(filtered);
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsTeacherProfileOpen(true);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedSpecialization, selectedGender, priceRange, lessonType, teachers, showGroupLessonsOnly]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المعلمين...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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
                  {showGroupLessonsOnly ? 'الدروس الجماعية المتاحة' : 'تصفية النتائج'}
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
                      placeholder={showGroupLessonsOnly ? "ابحث عن معلم للدروس الجماعية..." : "ابحث عن معلم أو تخصص..."}
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
                    نطاق السعر للدرس الفردي ($)
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">جميع الأسعار</option>
                    <option value="0-15">أقل من $15</option>
                    <option value="15-25">$15 - $25</option>
                    <option value="25-35">$25 - $35</option>
                    <option value="35-999">أكثر من $35</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialization('');
                    setSelectedGender('');
                    setPriceRange('');
                    if (!showGroupLessonsOnly) {
                      setLessonType('');
                    }
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
                  {showGroupLessonsOnly 
                    ? `${filteredTeachers.length} معلم متاح للدروس الجماعية المجانية`
                    : `تم العثور على ${filteredTeachers.length} معلم`
                  }
                </p>
                {showGroupLessonsOnly && (
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-medium">
                    🎁 الدرس الأول مجاني!
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    onClick={() => handleTeacherClick(teacher)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 cursor-pointer hover:border-emerald-200"
                  >
                    <div className="text-center mb-4">
                      <img
                        src={teacher.profile_image_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face`}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                      />
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{teacher.name}</h3>
                      <p className="text-emerald-600 font-medium text-sm">{teacher.specialization}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        teacher.gender === 'ذكر' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        معلم {teacher.gender === 'ذكر' ? '' : 'ة'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 ml-1 text-yellow-400" />
                          <span>التقييم</span>
                        </div>
                        <span className="font-medium">{Number(teacher.rating).toFixed(1)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 ml-1" />
                          <span>الطلاب</span>
                        </div>
                        <span className="font-medium">{teacher.students_count}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 ml-1" />
                          <span>الخبرة</span>
                        </div>
                        <span className="font-medium">{teacher.experience_years} سنوات</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 ml-1" />
                          <span>درس فردي</span>
                        </div>
                        <span className="font-medium text-emerald-600">
                          ${teacher.individual_lesson_price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 ml-1" />
                          <span>درس جماعي</span>
                        </div>
                        <span className="font-medium text-blue-600">
                          ${teacher.group_lesson_price}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.languages?.slice(0, 2).map((language) => (
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
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-600">
                          فردي: ${teacher.individual_lesson_price}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          جماعي: ${teacher.group_lesson_price}
                        </div>
                      </div>
                      <div className={`text-xs ${
                        teacher.availability_status === 'available' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {teacher.availability_status === 'available' ? '● متاح الآن' : '● مشغول'}
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                      اضغط لعرض الملف الشخصي
                    </div>
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

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <TeacherProfile
          teacher={selectedTeacher}
          onClose={() => {
            setSelectedTeacher(null);
            setIsTeacherProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default SearchPage;