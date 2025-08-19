import React, { useState } from 'react';
import { User, BookOpen, Star, Clock, Calendar, Upload, Camera, Award, Globe, X } from 'lucide-react';

interface TeacherDashboardProps {
  onClose: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onClose }) => {
  const user = null;
  const [activeTab, setActiveTab] = useState('profile');
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [teacherData, setTeacherData] = useState({
    name: '',
    specialization: '',
    experience_years: 0,
    hourly_rate: 0,
    bio: '',
    certificates: [] as string[],
    languages: ['العربية'],
    profile_image_url: ''
  });

  const [newCertificate, setNewCertificate] = useState('');
  const [stats] = useState({
    totalStudents: 45,
    totalLessons: 120,
    rating: 4.8,
    earnings: 2500
  });

  const handleInputChange = (field: string, value: string | number) => {
    setTeacherData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCertificate = () => {
    if (newCertificate.trim()) {
      setTeacherData(prev => ({
        ...prev,
        certificates: [...prev.certificates, newCertificate.trim()]
      }));
      setNewCertificate('');
    }
  };

  const handleRemoveCertificate = (index: number) => {
    setTeacherData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProfile = async () => {
    try {
      alert('المصادقة غير متاحة حالياً');
    } catch (error: any) {
      alert('المصادقة غير متاحة حالياً');
    }
  };

  // Check if teacher is approved
  const isApproved = false;
  const currentApprovalStatus = 'pending';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المعلم</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Approval Status Banner */}
      {!isApproved && (
        <div className={`${
          currentApprovalStatus === 'pending' ? 'bg-amber-50 border-amber-200' :
          currentApprovalStatus === 'rejected' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        } border-b px-4 py-3`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${
                currentApprovalStatus === 'pending' ? 'text-amber-600' :
                currentApprovalStatus === 'rejected' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                <Clock className="h-5 w-5" />
              </div>
              <div className="mr-3">
                <p className={`text-sm font-medium ${
                  currentApprovalStatus === 'pending' ? 'text-amber-800' :
                  currentApprovalStatus === 'rejected' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {currentApprovalStatus === 'pending' && 'حسابك قيد المراجعة'}
                  {currentApprovalStatus === 'rejected' && 'تم رفض طلب التسجيل'}
                </p>
                <p className={`text-xs ${
                  currentApprovalStatus === 'pending' ? 'text-amber-700' :
                  currentApprovalStatus === 'rejected' ? 'text-red-700' :
                  'text-blue-700'
                }`}>
                  {currentApprovalStatus === 'pending' && 'يرجى إكمال ملفك الشخصي ورفع الشهادات. سيتم إشعارك عند الموافقة.'}
                  {currentApprovalStatus === 'rejected' && 'يرجى التواصل مع الدعم الفني لمعرفة أسباب الرفض.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={teacherData.profile_image_url || 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=200'}
                    alt="الصورة الشخصية"
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-3">مستخدم</h3>
                <p className="text-gray-600">معلم</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                  <div className="text-xs text-gray-600">طالب</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{stats.rating}</div>
                  <div className="text-xs text-gray-600">تقييم</div>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <User className="inline-block ml-3 h-5 w-5" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'certificates' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Award className="inline-block ml-3 h-5 w-5" />
                  الشهادات
                </button>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'lessons' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="inline-block ml-3 h-5 w-5" />
                  دروسي
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">الملف الشخصي</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      value={teacherData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                    <input
                      type="text"
                      value={teacherData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="مثال: تجويد وقراءات"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                    <input
                      type="number"
                      value={teacherData.experience_years}
                      onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="عدد سنوات الخبرة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر بالساعة (ريال)</label>
                    <input
                      type="number"
                      value={teacherData.hourly_rate}
                      onChange={(e) => handleInputChange('hourly_rate', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="السعر بالريال"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">نبذة عنك</label>
                    <textarea
                      value={teacherData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="اكتب نبذة مختصرة عن خبرتك وأسلوبك في التدريس"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  حفظ التغييرات
                </button>
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">الشهادات والإجازات</h2>
                
                {/* Add Certificate */}
                <div className="mb-8">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newCertificate}
                      onChange={(e) => setNewCertificate(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أضف شهادة أو إجازة جديدة"
                    />
                    <button
                      onClick={handleAddCertificate}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      إضافة
                    </button>
                  </div>
                </div>

                {/* Certificates List */}
                <div className="space-y-4">
                  {teacherData.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-blue-600 ml-3" />
                        <span className="text-gray-900">{cert}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveCertificate(index)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                  {teacherData.certificates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      لم تقم بإضافة أي شهادات بعد
                    </div>
                  )}
                </div>

                {/* Upload Certificate Image */}
                <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">ارفع صور الشهادات والإجازات</p>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    اختر الملفات
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة الدروس</h2>
                
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalLessons}</div>
                    <div className="text-blue-700">إجمالي الدروس</div>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{stats.totalStudents}</div>
                    <div className="text-emerald-700">عدد الطلاب</div>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <div className="text-2xl font-bold text-amber-600">{stats.earnings} ريال</div>
                    <div className="text-amber-700">الأرباح الشهرية</div>
                  </div>
                </div>

                {/* Create Lesson Button */}
                <button className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                  إنشاء درس جديد
                </button>

                {/* Lessons List */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">درس التجويد المتقدم</h3>
                        <p className="text-gray-600">درس فردي - 60 دقيقة</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 ml-1" />
                          الأحد 15 يناير - 10:00 ص
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold text-gray-900">50 ريال</div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          مؤكد
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;