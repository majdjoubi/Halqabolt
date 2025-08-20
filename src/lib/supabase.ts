import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  const hasUrl = Boolean(supabaseUrl && supabaseUrl.startsWith('https://') && supabaseUrl.includes('.supabase.co'));
  const hasKey = Boolean(supabaseAnonKey && supabaseAnonKey.startsWith('eyJ') && supabaseAnonKey.length > 100);
  
  console.log('🔍 Supabase Configuration Check:');
  console.log('  URL:', hasUrl ? '✅' : '❌', supabaseUrl || '(empty)');
  console.log('  Key:', hasKey ? '✅' : '❌', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : '(empty)');
  console.log('  Environment:', import.meta.env.MODE);
  console.log('  All env vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  
  return hasUrl && hasKey;
};

// Create Supabase client
let supabase: any = null;

if (isSupabaseConfigured()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      global: {
        headers: {
          'X-Client-Info': 'halaqah-platform@1.0.0'
        }
      }
    });
    console.log('🟢 Supabase client created successfully');
  } catch (error) {
    console.error('🔴 Failed to create Supabase client:', error);
    supabase = null;
  }
} else {
  console.log('🔴 Supabase not configured properly');
}

export { supabase };

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) {
    console.error('🔴 Supabase client not available');
    return false;
  }

  try {
    console.log('🔵 Testing Supabase connection...');
    
    // Test with a simple query
    const { data, error } = await supabase
      .from('teachers')
      .select('count')
      .limit(1);

    if (error) {
      console.error('🔴 Supabase connection error:', error.message, error.details);
      
      // Try alternative test - check if we can reach the API
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        });
        
        if (response.ok || response.status === 404) {
          console.log('🟡 Supabase API reachable but table query failed');
          return true;
        }
      } catch (fetchError) {
        console.error('🔴 Cannot reach Supabase API:', fetchError);
      }
      
      return false;
    }

    console.log('🟢 Supabase connection successful');
    return true;
  } catch (error) {
    console.error('🔴 Supabase connection failed:', error);
    return false;
  }
};

// Initialize connections for testing
export const initializeConnections = async (): Promise<boolean[]> => {
  const results = await Promise.allSettled([
    testSupabaseConnection(),
    // Test Google OAuth availability (check if we can reach Google's OAuth endpoint)
    fetch('https://accounts.google.com/.well-known/openid_configuration').then(() => true).catch(() => false),
    // Test Vercel availability
    fetch('https://vercel.com').then(() => true).catch(() => false)
  ]);

  return results.map(result => result.status === 'fulfilled' ? result.value : false);
};

// Google OAuth sign in function
export const signInWithOAuth = async (provider: 'google') => {
  if (!supabase) {
    return { error: { message: 'Supabase غير مُعد' } };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('🔴 خطأ في OAuth:', error);
      return { error };
    }

    console.log('🟢 تم بدء عملية OAuth بنجاح');
    return { data };
  } catch (error: any) {
    console.error('🔴 خطأ في OAuth:', error);
    return { error: { message: error.message || 'حدث خطأ أثناء تسجيل الدخول' } };
  }
};
// Types
export interface User {
  id: string;
  email: string;
  name?: string;
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
  wallet_balance?: number;
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
  monthly_earnings?: number;
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

export interface Review {
  id: string;
  student_id: string;
  teacher_id: string;
  booking_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  student_id: string;
  plan_name: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  starts_at: string;
  ends_at: string;
  created_at: string;
}