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
  bio?: string;
  certificates: string[];
  languages: string[];
  availability_status: string;
  profile_image_url?: string;
  is_verified: boolean;
  created_at: string;
}

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      
      if (!supabase) {
        console.warn('Supabase not configured, using mock data');
        setTeachers(mockTeachers);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل المعلمين');
      // Use mock data as fallback
      setTeachers(mockTeachers);
    } finally {
      setLoading(false);
    }
  };

  return { teachers, loading, error, refetch: fetchTeachers };
}

// Mock data for fallback
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'الشيخ أحمد محمد',
    specialization: 'تحفيظ القرآن الكريم',
    experience_years: 15,
    rating: 4.9,
    students_count: 150,
    hourly_rate: 50,
    bio: 'معلم متخصص في تحفيظ القرآن الكريم مع خبرة 15 عام',
    certificates: ['إجازة في القرآن الكريم', 'دبلوم التجويد'],
    languages: ['العربية', 'الإنجليزية'],
    availability_status: 'available',
    profile_image_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'الأستاذة فاطمة أحمد',
    specialization: 'تجويد القرآن الكريم',
    experience_years: 12,
    rating: 4.8,
    students_count: 120,
    hourly_rate: 45,
    bio: 'معلمة متخصصة في تجويد القرآن الكريم للنساء والأطفال',
    certificates: ['إجازة في التجويد', 'دبلوم التربية الإسلامية'],
    languages: ['العربية'],
    availability_status: 'available',
    profile_image_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    is_verified: true,
    created_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'الشيخ يوسف علي',
    specialization: 'علوم القرآن والتفسير',
    experience_years: 20,
    rating: 4.9,
    students_count: 200,
    hourly_rate: 60,
    bio: 'دكتور في علوم القرآن والتفسير مع خبرة طويلة في التدريس',
    certificates: ['دكتوراه في علوم القرآن', 'إجازة في القراءات'],
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    availability_status: 'busy',
    profile_image_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    is_verified: true,
    created_at: '2024-01-01'
  }
];