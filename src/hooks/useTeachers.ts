import { useState, useEffect } from 'react';

export interface Teacher {
  id: string;
  name: string;
  gender: string;
  specialization: string;
  experience_years: number;
  rating: number;
  students_count: number;
  individual_lesson_price: number;
  group_lesson_price: number;
  bio?: string;
  certificates: string[];
  languages: string[];
  availability_status: string;
  profile_image_url?: string;
  is_verified: boolean;
  created_at: string;
}

// بيانات وهمية للمعلمين
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'الشيخ أحمد محمد',
    gender: 'ذكر',
    specialization: 'تحفيظ القرآن الكريم والتجويد',
    experience_years: 15,
    rating: 4.9,
    students_count: 150,
    individual_lesson_price: 25,
    group_lesson_price: 15,
    bio: 'معلم متخصص في تحفيظ القرآن الكريم والتجويد مع خبرة 15 عام في التدريس',
    certificates: ['إجازة في القرآن الكريم', 'دبلوم التجويد'],
    languages: ['العربية', 'الإنجليزية'],
    availability_status: 'available',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'الأستاذة فاطمة أحمد',
    gender: 'أنثى',
    specialization: 'تجويد القرآن الكريم',
    experience_years: 12,
    rating: 4.8,
    students_count: 120,
    individual_lesson_price: 20,
    group_lesson_price: 12,
    bio: 'معلمة متخصصة في تجويد القرآن الكريم للنساء والأطفال',
    certificates: ['إجازة في التجويد', 'دبلوم التربية الإسلامية'],
    languages: ['العربية'],
    availability_status: 'available',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'الشيخ يوسف علي',
    gender: 'ذكر',
    specialization: 'علوم القرآن والتفسير',
    experience_years: 20,
    rating: 4.9,
    students_count: 200,
    individual_lesson_price: 30,
    group_lesson_price: 18,
    bio: 'دكتور في علوم القرآن والتفسير مع خبرة طويلة في التدريس',
    certificates: ['دكتوراه في علوم القرآن', 'إجازة في القراءات'],
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    availability_status: 'busy',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '4',
    name: 'الأستاذة خديجة المغربي',
    gender: 'أنثى',
    specialization: 'تحفيظ القرآن للأطفال',
    experience_years: 8,
    rating: 4.7,
    students_count: 80,
    individual_lesson_price: 18,
    group_lesson_price: 10,
    bio: 'معلمة متخصصة في تحفيظ القرآن للأطفال بطرق تفاعلية ممتعة',
    certificates: ['دبلوم تعليم الأطفال', 'إجازة في التحفيظ'],
    languages: ['العربية', 'الفرنسية'],
    availability_status: 'available',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '5',
    name: 'الشيخ عبد الرحمن الكويتي',
    gender: 'ذكر',
    specialization: 'القراءات العشر',
    experience_years: 18,
    rating: 4.9,
    students_count: 90,
    individual_lesson_price: 35,
    group_lesson_price: 20,
    bio: 'متخصص في القراءات العشر وعلوم القرآن المتقدمة',
    certificates: ['إجازة في القراءات العشر', 'ماجستير في علوم القرآن'],
    languages: ['العربية'],
    availability_status: 'available',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '6',
    name: 'الأستاذة مريم التونسي',
    gender: 'أنثى',
    specialization: 'تجويد وتلاوة',
    experience_years: 10,
    rating: 4.6,
    students_count: 110,
    individual_lesson_price: 15,
    group_lesson_price: 8,
    bio: 'معلمة تجويد وتلاوة مع التركيز على الأداء الصحيح والخشوع',
    certificates: ['إجازة في التجويد', 'دبلوم التلاوة'],
    languages: ['العربية'],
    availability_status: 'available',
    profile_image_url: '',
    is_verified: true,
    created_at: '2024-01-01'
  }
];

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTeachers(mockTeachers);
      } catch (err) {
        setError('حدث خطأ في تحميل المعلمين');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return { teachers, loading, error, refetch: () => {} };
}