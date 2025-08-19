import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
    console.log('🔴 Supabase not configured');
    return false;
  }

  try {
    console.log('🔵 Testing Supabase connection...');
    
    // Test REST API
    const { data, error } = await supabase
      .from('teachers')
      .select('count')
      .limit(1);

    if (error) {
      console.error('🔴 Supabase REST API error:', error);
      return false;
    }

    // Test Auth API
    const { data: { session } } = await supabase.auth.getSession();
    
    console.log('🟢 Supabase connection successful');
    return true;
  } catch (error) {
    console.error('🔴 Supabase connection failed:', error);
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