import React, { useState, useEffect } from 'react';
import { X, Star, Users, BookOpen, DollarSign, Award, Globe, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TeacherProfilePageProps {
  teacherId: string;
  onClose: () => void;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  experience_years: number;
  rating: number;
  students_count: number;
  hourly_rate: number;
  bio: string;
  certificates: string[];
  languages: string[];
  profile_image_url: string;
  is_verified: boolean;
}

const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({ teacherId, onClose }) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      setLoading(true);
      try {
        console.log('🔵 Fetching teacher:', teacherId);
        
        const { data, error } = await supabase
          .from('teachers')
          .select('*')
          .eq('id', teacherId)
          .single();

        if (error) {
          console.error('🔴 Teacher fetch error:', error);
          throw error;
        }
        
        if (data) {
          console.log('🟢 Teacher fetched successfully:', data);
          setTeacher(data);
          setError(null);
        } else {
          setError('لم يتم العثور على المعلم');
          setTeacher(null);
        }
      } catch (err: any) {
        console.error('🔴 Teacher fetch error:', err);
        setError(err.message || 'حدث خطأ أثناء تحميل بيانات المعلم');
        setTeacher(null);
      }
      setLoading(false);
    };

    fetchTeacher();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المعلم...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">خطأ: {error}</p>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">لم يتم العثور على المعلم.</p>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">ملف المعلم</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse mb-8">
            <img
              src={teacher.profile_image_url || 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=300'}
              alt={teacher.name}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <div className="text-center md:text-right flex-1">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{teacher.name}</h2>
                {teacher.is_verified && (
                  <div className="mr-2 bg-emerald-100 p-1 rounded-full">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                )}
              </div>
              <p className="text-emerald-600 text-lg font-medium mb-4">{teacher.specialization}</p>
              <div className="flex items-center justify-center md:justify-start space-x-6 space-x-reverse text-gray-600">
                <span className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" /> 
                  {teacher.rating.toFixed(1)}
                </span>
                <span className="flex items-center">
                  <Users className="h-5 w-5 ml-1" /> 
                  {teacher.students_count} طالب
                </span>
                <span className="flex items-center">
                  <Clock className="h-5 w-5 ml-1" /> 
                  {teacher.experience_years} سنوات خبرة
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">نبذة عن المعلم</h3>
            <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 text-emerald-600 ml-2" /> 
                الشهادات والإجازات
              </h3>
              <ul className="space-y-2">
                {teacher.certificates.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-6 w-6 text-emerald-600 ml-2" /> 
                اللغات
              </h3>
              <ul className="space-y-2">
                {teacher.languages.map((lang, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{lang}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center bg-emerald-50 p-6 rounded-xl mb-8">
            <p className="text-2xl font-bold text-emerald-800 flex items-center justify-center">
              <DollarSign className="h-7 w-7 ml-2" />
              {teacher.hourly_rate} ريال / ساعة
            </p>
            <p className="text-emerald-600 mt-2">سعر الدرس الفردي</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 text-lg font-semibold flex items-center justify-center">
              <BookOpen className="h-6 w-6 ml-2" />
              احجز درسك الأول الآن
            </button>
            <button className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white py-4 rounded-xl transition-all duration-200 text-lg font-semibold">
              إرسال رسالة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;