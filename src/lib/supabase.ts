import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured with real values
const isSupabaseConfigured = () => {
  return supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseUrl !== 'https://placeholder-url.supabase.co' &&
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    supabaseAnonKey !== 'your_supabase_anon_key' &&
    supabaseAnonKey !== 'your-actual-anon-key' &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseAnonKey.includes('your-actual');
};

let supabase: any;

if (!isSupabaseConfigured()) {
  console.warn('🔧 Supabase environment variables not configured. Using development mode.');
  console.warn('📝 To use real Supabase, create a .env file with:');
  console.warn('   VITE_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.warn('   VITE_SUPABASE_ANON_KEY=your-actual-anon-key');
  
  // Create a mock client for development
  supabase = {
    auth: {
      signUp: async () => ({ 
        data: { user: null }, 
        error: { message: 'Supabase not configured. Please set up your .env file.' } 
      }),
      signInWithPassword: async () => ({ 
        data: { user: null }, 
        error: { message: 'Supabase not configured. Please set up your .env file.' } 
      }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: async () => ({ data: null, error: { message: 'Supabase not configured' } })
        }),
        order: async () => ({ data: [], error: null })
      }),
      insert: () => ({ 
        select: () => ({ 
          single: async () => ({ data: null, error: { message: 'Supabase not configured' } })
        })
      }),
      upsert: () => ({ 
        select: () => ({ 
          single: async () => ({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    }
  });

  // Test connection
  setTimeout(() => {
    supabase.from('teachers').select('count', { count: 'exact', head: true })
      .then(({ error }: any) => {
        if (error) {
          console.warn('⚠️ Supabase connection test failed:', error.message);
        } else {
          console.log('✅ Supabase connected successfully');
        }
      })
      .catch((error: any) => {
        console.warn('⚠️ Network test failed, but app will continue:', error.message);
      });
  }, 1000);
}

export { supabase, isSupabaseConfigured };
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
  availability_status: string;
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