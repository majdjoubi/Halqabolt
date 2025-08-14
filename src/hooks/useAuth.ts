import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  isTeacher?: boolean;
  teacherProfile?: {
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
  };
  isStudent?: boolean;
  studentProfile?: {
    id: string;
    name: string;
    age: number;
    level: string;
    goals: string[];
    preferred_schedule: string;
    profile_image_url: string;
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Set to true initially to handle session loading

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) throw error;
    return data;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // Redirects back to your app after sign-in
      },
    });
    setLoading(false);
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) throw error;
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const supabaseUser = session.user;
          let currentUser: User = { id: supabaseUser.id, email: supabaseUser.email || '' };

          // Check if user is a teacher
          const { data: teacherData, error: teacherError } = await supabase
            .from('teachers')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .single();

          if (teacherData) {
            currentUser.isTeacher = true;
            currentUser.teacherProfile = teacherData;
          }

          // Check if user is a student
          const { data: studentData, error: studentError } = await supabase
            .from('students')
            .select('*')
            .eq('user_id', supabaseUser.id)
            .single();

          if (studentData) {
            currentUser.isStudent = true;
            currentUser.studentProfile = studentData;
          }

          setUser(currentUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) setLoading(false); // If no session, stop loading
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
};