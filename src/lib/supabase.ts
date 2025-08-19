import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Declare supabase at top level
let supabase: any;

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-ref.supabase.co' || 
    supabaseUrl === 'https://placeholder-url.supabase.co' ||
    supabaseAnonKey === 'your-anon-key-here' ||
    supabaseAnonKey === 'placeholder-anon-key') {
  console.log('🔧 Supabase في وضع التطوير - يرجى إعداد متغيرات البيئة للإنتاج');
  // Create a mock client that won't make actual requests
  supabase = {
    auth: {
      signUp: (credentials: any) => {
        console.log('🔧 Mock signup:', credentials.email);
        return Promise.resolve({ 
          data: { 
            user: { 
              id: 'mock-user-' + Date.now(), 
              email: credentials.email,
              user_metadata: credentials.options?.data || {}
            } 
          }, 
          error: null 
        });
      },
      signInWithPassword: (credentials: any) => {
        console.log('🔧 Mock signin:', credentials.email);
        return Promise.resolve({ 
          data: { 
            user: { 
              id: 'mock-user-' + Date.now(), 
              email: credentials.email,
              user_metadata: { role: 'student' }
            } 
          }, 
          error: null 
        });
      },
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve({ 
            data: { 
              id: 'mock-profile-' + Date.now(), 
              name: 'مستخدم تجريبي',
              user_id: 'mock-user-' + Date.now()
            }, 
            error: null 
          }) 
        }) 
      }),
      insert: () => ({ 
        select: () => ({ 
          single: () => Promise.resolve({ 
            data: { 
              id: 'mock-profile-' + Date.now(), 
              name: 'مستخدم تجريبي',
              user_id: 'mock-user-' + Date.now()
            }, 
            error: null 
          }) 
        }) 
      }),
      upsert: () => ({ 
        select: () => ({ 
          single: () => Promise.resolve({ 
            data: { 
              id: 'mock-profile-' + Date.now(), 
              name: 'مستخدم تجريبي',
              user_id: 'mock-user-' + Date.now()
            }, 
            error: null 
          }) 
        }) 
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: 'pkce'
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'X-Client-Info': 'halqa-platform'
      }
    }
  });

  // Test connection only if properly configured
  supabase.from('teachers').select('count', { count: 'exact', head: true })
    .then(({ error }: any) => {
      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
      } else {
        console.log('✅ Supabase connected successfully');
      }
    })
    .catch(() => {
      console.warn('⚠️ Supabase connection test failed - this is normal if tables don\'t exist yet');
    });
}

// Export the supabase client
export { supabase };

// Database types
export interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher';
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile extends UserProfile {
  age?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferred_schedule?: string;
}

export interface TeacherProfile extends UserProfile {
  specialization: string;
  experience_years: number;
  hourly_rate: number;
  bio: string;
  certificates: string[];
  languages: string[];
  is_verified: boolean;
  rating: number;
  students_count: number;
}

export interface Lesson {
  id: string;
  teacher_id: string;
  title: string;
  description?: string;
  type: 'individual' | 'group' | 'memorization' | 'tajweed';
  duration_minutes: number;
  price: number;
  max_students: number;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  student_id: string;
  lesson_id: string;
  teacher_id: string;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meeting_url?: string;
  notes?: string;
  created_at: string;
}