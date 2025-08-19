import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Teacher {
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
  availability_status: string;
  created_at: string;
  updated_at: string;
}

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔵 Fetching teachers from Supabase...');
      
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('🔴 Teachers fetch error:', error);
        throw error;
      }

      console.log('🟢 Teachers fetched successfully:', data?.length || 0, 'teachers');
      setTeachers(data || []);
    } catch (err: any) {
      console.error('🔴 Teachers fetch error:', err);
      setError(err.message || 'حدث خطأ أثناء تحميل المعلمين');
      
      // Fallback to mock data if Supabase fails
      const mockTeachers: Teacher[] = [
        {
          id: '1',
          name: 'الشيخ أحمد محمود',
          specialization: 'متخصص في التجويد والقراءات',
          experience_years: 10,
          rating: 4.9,
          students_count: 450,
          hourly_rate: 25,
          bio: 'معلم قرآن كريم متخصص في التجويد والقراءات مع خبرة 10 سنوات',
          certificates: ['إجازة في القراءات العشر', 'شهادة في التجويد'],
          languages: ['العربية', 'الإنجليزية'],
          profile_image_url: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_verified: true,
          availability_status: 'متاح اليوم',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'الأستاذة فاطمة السيد',
          specialization: 'تحفيظ القرآن للأطفال',
          experience_years: 8,
          rating: 4.8,
          students_count: 320,
          hourly_rate: 20,
          bio: 'معلمة متخصصة في تحفيظ القرآن الكريم للأطفال والناشئين',
          certificates: ['إجازة في الحفظ', 'دبلوم في تعليم الأطفال'],
          languages: ['العربية'],
          profile_image_url: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_verified: true,
          availability_status: 'متاحة غداً',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'الشيخ عمر حسان',
          specialization: 'التفسير وعلوم القرآن',
          experience_years: 15,
          rating: 5.0,
          students_count: 680,
          hourly_rate: 30,
          bio: 'دكتور في علوم القرآن والتفسير مع خبرة واسعة في التدريس',
          certificates: ['دكتوراه في التفسير', 'إجازة في القراءات'],
          languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
          profile_image_url: 'https://images.pexels.com/photos/8923903/pexels-photo-8923903.jpeg?auto=compress&cs=tinysrgb&w=400',
          is_verified: true,
          availability_status: 'متاح الآن',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setTeachers(mockTeachers);
      console.log('🟡 Using mock teachers data as fallback');
    } finally {
      setLoading(false);
    }
  };

  const searchTeachers = async (query: string) => {
    if (!query.trim()) {
      await fetchTeachers();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('🔵 Searching teachers:', query);
      
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_verified', true)
        .or(`name.ilike.%${query}%,specialization.ilike.%${query}%`)
        .order('rating', { ascending: false });

      if (error) {
        console.error('🔴 Teachers search error:', error);
        throw error;
      }

      console.log('🟢 Teachers search completed:', data?.length || 0, 'results');
      setTeachers(data || []);
    } catch (err: any) {
      console.error('🔴 Teachers search error:', err);
      setError(err.message || 'حدث خطأ أثناء البحث');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return {
    teachers,
    loading,
    error,
    fetchTeachers,
    searchTeachers
  };
};