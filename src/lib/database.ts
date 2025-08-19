import { supabase } from './supabase';
import type { User, UserProfile, StudentProfile, TeacherProfile, Session, Booking } from './supabase';

// Authentication functions
export const auth = {
  signUp: async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // Create user profile
      const profileData = role === 'teacher' 
        ? {
            user_id: authData.user.id,
            name,
            specialization: '',
            experience_years: 0,
            hourly_rate: 0,
            bio: '',
            certificates: [],
            languages: ['العربية'],
            is_verified: false,
            rating: 0,
            students_count: 0
          }
        : {
            user_id: authData.user.id,
            name,
            age: null,
            level: 'beginner' as const,
            goals: [],
            preferred_schedule: ''
          };

      const tableName = role === 'teacher' ? 'teacher_profiles' : 'student_profiles';
      const { error: profileError } = await supabase
        .from(tableName)
        .insert([profileData]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't throw here, user is created but profile failed
      }

      return {
        id: authData.user.id,
        email: authData.user.email!,
        role,
        profile: profileData
      };
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'فشل في إنشاء الحساب');
    }
  },

  signIn: async (email: string, password: string, role: 'student' | 'teacher') => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to sign in');

      // Get user profile
      const tableName = role === 'teacher' ? 'teacher_profiles' : 'student_profiles';
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      return {
        id: authData.user.id,
        email: authData.user.email!,
        role,
        profile: profileData || {}
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'فشل في تسجيل الدخول');
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'فشل في تسجيل الخروج');
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) return null;

      // Try to get role from user metadata first
      const role = user.user_metadata?.role;
      if (!role) return null;

      // Get user profile
      const tableName = role === 'teacher' ? 'teacher_profiles' : 'student_profiles';
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      return {
        id: user.id,
        email: user.email!,
        role,
        profile: profileData || {}
      };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  updateUserProfile: async (userId: string, role: 'student' | 'teacher', profileData: any) => {
    try {
      const tableName = role === 'teacher' ? 'teacher_profiles' : 'student_profiles';
      
      const { data, error } = await supabase
        .from(tableName)
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return {
        id: userId,
        email: '', // We don't have email in profile update
        role,
        profile: data
      };
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'فشل في تحديث الملف الشخصي');
    }
  }
};

// Database functions
export const database = {
  getTeachers: async (): Promise<TeacherProfile[]> => {
    try {
      const { data, error } = await supabase
        .from('teacher_profiles')
        .select('*')
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get teachers error:', error);
      return [];
    }
  },

  getTeacher: async (id: string): Promise<TeacherProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('teacher_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Get teacher error:', error);
      return null;
    }
  },

  getSessions: async (teacherId?: string): Promise<Session[]> => {
    try {
      let query = supabase
        .from('sessions')
        .select('*')
        .eq('status', 'scheduled')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true });

      if (teacherId) {
        query = query.eq('teacher_id', teacherId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get sessions error:', error);
      return [];
    }
  },

  createSession: async (sessionData: Omit<Session, 'id' | 'created_at' | 'updated_at'>): Promise<Session | null> => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{
          ...sessionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Create session error:', error);
      throw new Error(error.message || 'فشل في إنشاء الحصة');
    }
  },

  bookSession: async (studentId: string, sessionId: string): Promise<Booking | null> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          student_id: studentId,
          session_id: sessionId,
          status: 'pending',
          payment_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Book session error:', error);
      throw new Error(error.message || 'فشل في حجز الحصة');
    }
  },

  getStudentBookings: async (studentId: string): Promise<Booking[]> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          sessions (
            *,
            teacher_profiles (name, specialization)
          )
        `)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get student bookings error:', error);
      return [];
    }
  },

  getTeacherBookings: async (teacherId: string): Promise<Booking[]> => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          sessions!inner (
            *
          ),
          student_profiles (name)
        `)
        .eq('sessions.teacher_id', teacherId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get teacher bookings error:', error);
      return [];
    }
  }
};