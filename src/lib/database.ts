// Mock database for development without Supabase
const mockAuth = {
  signUp: async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    console.log('🔵 Mock signUp:', { email, role, name });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `mock-${Date.now()}`,
      email,
      role,
      profile: {
        name,
        ...(role === 'teacher' ? {
          specialization: '',
          experience_years: 0,
          hourly_rate: 0,
          bio: '',
          certificates: [],
          languages: ['العربية'],
          is_verified: false,
          rating: 0,
          students_count: 0
        } : {
          age: null,
          level: 'beginner' as const,
          goals: [],
          preferred_schedule: ''
        })
      }
    };
  },

  signIn: async (email: string, password: string, role: 'student' | 'teacher') => {
    console.log('🔵 Mock signIn:', { email, role });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'test@example.com' && password === '123456') {
      return {
        id: `mock-${role}-user`,
        email,
        role,
        profile: {
          name: role === 'student' ? 'طالب تجريبي' : 'معلم تجريبي',
          ...(role === 'teacher' ? {
            specialization: 'تجويد وقراءات',
            experience_years: 5,
            hourly_rate: 25,
            bio: 'معلم تجريبي',
            certificates: ['شهادة تجريبية'],
            languages: ['العربية'],
            is_verified: true,
            rating: 4.5,
            students_count: 10
          } : {
            age: 25,
            level: 'intermediate' as const,
            goals: ['تحسين التلاوة'],
            preferred_schedule: 'مساءً'
          })
        }
      };
    }
    
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  },

  signOut: async () => {
    console.log('🔵 Mock signOut');
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  getCurrentUser: async () => {
    console.log('🔵 Mock getCurrentUser');
    // Return null for now (no persistent login in mock)
    return null;
  },

  updateUserProfile: async (userId: string, role: 'student' | 'teacher', profileData: any) => {
    console.log('🔵 Mock updateUserProfile:', { userId, role, profileData });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: userId,
      email: 'mock@example.com',
      role,
      profile: profileData
    };
  }
};

const mockDatabase = {
  getTeachers: async () => {
    console.log('🔵 Mock getTeachers');
    return [
      {
        id: '1',
        user_id: 'mock-teacher-1',
        name: 'الشيخ أحمد محمود',
        specialization: 'متخصص في التجويد والقراءات',
        experience_years: 15,
        rating: 4.9,
        students_count: 450,
        hourly_rate: 25,
        bio: 'معلم قرآن كريم بخبرة 15 سنة، حاصل على إجازات في القراءات العشر.',
        certificates: ['إجازة في رواية حفص عن عاصم', 'شهادة التجويد المتقدم'],
        languages: ['العربية', 'الإنجليزية'],
        profile_image_url: 'https://images.pexels.com/photos/8923901/pexels-photo-8923901.jpeg?auto=compress&cs=tinysrgb&w=400',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: 'mock-teacher-2',
        name: 'الأستاذة فاطمة السيد',
        specialization: 'تحفيظ القرآن للأطفال',
        experience_years: 10,
        rating: 4.8,
        students_count: 320,
        hourly_rate: 20,
        bio: 'متخصصة في تعليم الأطفال وتحفيظهم القرآن الكريم بطرق تفاعلية ومبتكرة.',
        certificates: ['إجازة في القرآن الكريم', 'دبلوم تعليم الأطفال'],
        languages: ['العربية', 'الفرنسية'],
        profile_image_url: 'https://images.pexels.com/photos/8923902/pexels-photo-8923902.jpeg?auto=compress&cs=tinysrgb&w=400',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  },

  getTeacher: async (id: string) => {
    console.log('🔵 Mock getTeacher:', id);
    const teachers = await mockDatabase.getTeachers();
    return teachers.find(t => t.id === id) || null;
  },

  getSessions: async (teacherId?: string) => {
    console.log('🔵 Mock getSessions:', teacherId);
    return [];
  },

  createSession: async (sessionData: any) => {
    console.log('🔵 Mock createSession:', sessionData);
    return null;
  },

  bookSession: async (studentId: string, sessionId: string) => {
    console.log('🔵 Mock bookSession:', { studentId, sessionId });
    return null;
  },

  getStudentBookings: async (studentId: string) => {
    console.log('🔵 Mock getStudentBookings:', studentId);
    return [];
  },

  getTeacherBookings: async (teacherId: string) => {
    console.log('🔵 Mock getTeacherBookings:', teacherId);
    return [];
  }
};

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== '' && key !== '');
};

// Export the appropriate implementation
export const auth = mockAuth;
export const database = mockDatabase;

console.log('🟡 Using mock database (Supabase not configured)');