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
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل المعلمين');
    } finally {
      setLoading(false);
    }
  };

  return { teachers, loading, error, refetch: fetchTeachers };
}