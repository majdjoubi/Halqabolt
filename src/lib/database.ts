import { supabase } from './supabase';
import type { User, UserProfile, StudentProfile, TeacherProfile, Session, Booking } from './supabase';

// Authentication functions
export const auth = {
  signUp: async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    console.log('🔵 Starting signUp:', { email, role, name });
    try {
      // Check if user already exists with different role
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy' // This will fail but we just want to check if user exists
      });
      
      // If user exists, check their current role
      if (existingUser?.user) {
        const currentRole = existingUser.user.user_metadata?.role;
        if (currentRole && currentRole !== role) {
          throw new Error(`هذا البريد الإلكتروني مسجل بالفعل كـ ${currentRole === 'student' ? 'طالب' : 'معلم'}. لا يمكن التسجيل بدور مختلف.`);
        }
      }

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

      // Create user profile based on role
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
            is_verified: false, // Teachers need approval
            approval_status: 'pending', // New field for approval process
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

      const tableName = role === 'teacher' ? 'teachers' : 'students';
      const { error: profileError } = await supabase
        .from(tableName)
        .insert([profileData]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('فشل في إنشاء الملف الشخصي');
      }

      return {
        id: authData.user.id,
        email: authData.user.email!,
        role,
        profile: profileData
      };
    } catch (error: any) {
      console.error('Sign up error:', error);
      if (error.message.includes('User already registered')) {
        throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
      }
      throw new Error(error.message || 'فشل في إنشاء الحساب');
    }
  },

  signIn: async (email: string, password: string, role: 'student' | 'teacher') => {
    console.log('🔵 Starting signIn:', { email, role });
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('🔵 Auth response:', { authData: !!authData.user, error: authError });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to sign in');

      // Check if user's registered role matches the attempted login role
      const userRole = authData.user.user_metadata?.role;
      console.log('🔵 User metadata role:', userRole, 'Attempted role:', role);
      
      if (userRole && userRole !== role) {
        console.log('🔴 Role mismatch, signing out');
        await supabase.auth.signOut(); // Sign out immediately
        throw new Error(`هذا الحساب مسجل كـ ${userRole === 'student' ? 'طالب' : 'معلم'}. يرجى اختيار الدور الصحيح.`);
      }
      
      // If no role in metadata, use the attempted role (for backward compatibility)
      const actualRole = userRole || role;
      console.log('🔵 Using role:', actualRole);
      
      // Get user profile
      const tableName = actualRole === 'teacher' ? 'teachers' : 'students';
      console.log('🔵 Fetching from table:', tableName);
      
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      console.log('🔵 Profile response:', { profileData: !!profileData, error: profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
        throw new Error('فشل في جلب بيانات الملف الشخصي');
      }

      const result = {
        id: authData.user.id,
        email: authData.user.email!,
        role: actualRole,
        profile: profileData || {}
      };
      
      console.log('🟢 SignIn successful:', result);
      return result;
    } catch (error: any) {
      console.error('🔴 Sign in error:', error);
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
    console.log('🔵 Getting current user...');
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        if (error.message === 'Auth session missing!') {
          console.log('🟡 No auth session (user not logged in)');
          return null;
        }
        throw error;
      }
      if (!user) {
        console.log('🟡 No user found');
        return null;
      }

      console.log('🔵 Found user:', user.id, user.email);

      // Try to get role from user metadata first
      const role = user.user_metadata?.role;
      if (!role) {
        console.log('🟡 No role in metadata');
        return null;
      }

      console.log('🔵 User role:', role);

      // Get user profile
      const tableName = role === 'teacher' ? 'teachers' : 'students';
      console.log('🔵 Fetching profile from:', tableName);
      
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('🔵 Profile data:', { profileData: !!profileData, error: profileError });

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        if (profileError.code === 'PGRST116') {
          throw new Error('الملف الشخصي غير موجود. يرجى التواصل مع الدعم الفني.');
        }
      }

      // For teachers, check if they are approved
      if (role === 'teacher' && profileData && !profileData.is_verified) {
        const approvalStatus = profileData.approval_status || 'pending';
        if (approvalStatus === 'pending') {
          throw new Error('حسابك كمعلم قيد المراجعة. سيتم إشعارك عند الموافقة.');
        } else if (approvalStatus === 'rejected') {
          throw new Error('تم رفض طلب التسجيل كمعلم. يرجى التواصل مع الدعم الفني.');
        }
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
      const tableName = role === 'teacher' ? 'teachers' : 'students';
      
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

      const result = {
        id: userId,
        email: '', // We don't have email in profile update
        role,
        profile: data
      };
      
      console.log('🟢 getCurrentUser successful:', result);
      return result;
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
        .from('teachers')
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
        .from('teachers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('🔴 Get current user error:', error);
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
          lessons (
            *,
            teachers (name, specialization)
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
          lessons!inner (
            *
          ),
          students (name)
        `)
        .eq('lessons.teacher_id', teacherId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Get teacher bookings error:', error);
      return [];
    }
  }
};