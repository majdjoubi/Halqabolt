import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

// Log environment variables for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 Supabase Config Check:');
  console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.log('Environment:', import.meta.env.MODE);
}

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  const hasUrl = supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co' && supabaseUrl.includes('supabase.co');
  const hasKey = supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here' && supabaseAnonKey.length > 50;
  return !!(hasUrl && hasKey);
};

// Create Supabase client
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : null;

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) {
    console.log('🔴 Supabase غير مُعد - يرجى إضافة متغيرات البيئة');
    console.log('المطلوب: VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY');
    return false;
  }

  try {
    console.log('🔵 اختبار اتصال Supabase...');
    console.log('URL:', supabaseUrl ? 'موجود' : 'مفقود');
    console.log('Key:', supabaseAnonKey ? 'موجود' : 'مفقود');
    
    // Test REST API
    const { data, error } = await supabase
      .from('teachers')
      .select('id')
      .limit(1);

    if (error) {
      console.error('🔴 خطأ في Supabase REST API:', error.message);
      console.error('التفاصيل:', error);
      return false;
    }

    // Test Auth API
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('🔴 خطأ في Supabase Auth:', authError.message);
    }
    
    console.log('🟢 اتصال Supabase ناجح');
    console.log('عدد المعلمين المتاحين:', data?.length || 0);
    return true;
  } catch (error) {
    console.error('🔴 فشل اتصال Supabase:', error);
    return false;
  }
};

// GitHub integration
export const testGitHubConnection = async (): Promise<boolean> => {
  try {
    console.log('🔵 Testing GitHub connection...');
    
    const response = await fetch('https://api.github.com/rate_limit');
    if (response.ok) {
      console.log('🟢 GitHub API accessible');
      return true;
    } else {
      console.log('🔴 GitHub API not accessible');
      return false;
    }
  } catch (error) {
    console.error('🔴 GitHub connection failed:', error);
    return false;
  }
};

// Vercel integration
export const testVercelConnection = async (): Promise<boolean> => {
  try {
    console.log('🔵 Testing Vercel connection...');
    
    const response = await fetch('https://api.vercel.com/v1/user', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_VERCEL_TOKEN || 'test'}`
      }
    });
    
    // Even if unauthorized, if we get a response, Vercel is accessible
    console.log('🟢 Vercel API accessible');
    return true;
  } catch (error) {
    console.error('🔴 Vercel connection failed:', error);
    return false;
  }
};

// Initialize connections test
export const initializeConnections = async () => {
  console.log('🚀 Initializing all connections...');
  
  const results = await Promise.all([
    testSupabaseConnection(),
    testGitHubConnection(),
    testVercelConnection()
  ]);
  
  console.log('📊 Connection Results:', {
    supabase: results[0],
    github: results[1],
    vercel: results[2]
  });
  
  return results;
};

// Types
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