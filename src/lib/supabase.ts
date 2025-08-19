import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration Check:', {
  url: supabaseUrl ? 'Set ✅' : 'Missing ❌',
  key: supabaseAnonKey ? 'Set ✅' : 'Missing ❌',
  urlValue: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0
});

// Enhanced connection test
const testSupabaseConnection = async () => {
  try {
    console.log('🔵 Testing Supabase connection...');
    
    // Test REST API
    const restResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('🔵 REST API Response:', restResponse.status, restResponse.statusText);
    
    // Test Auth API
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    console.log('🔵 Auth API Response:', authResponse.status, authResponse.statusText);
    
    if (restResponse.ok && authResponse.ok) {
      console.log('✅ Supabase connection successful');
      return true;
    } else {
      console.warn('⚠️ Supabase connection issues detected');
      return false;
    }
  } catch (error) {
    console.error('🔴 Supabase connection test failed:', error);
    return false;
  }
};

// Check if environment variables are properly configured
const isSupabaseConfigured = () => {
  const isConfigured = supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseUrl !== 'https://placeholder-url.supabase.co' &&
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    supabaseAnonKey !== 'your_supabase_anon_key' &&
    supabaseAnonKey !== 'your-actual-anon-key' &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseAnonKey.includes('your-actual') &&
    supabaseUrl.includes('supabase.co') &&
    supabaseAnonKey.length > 100; // JWT tokens are typically longer

  console.log('🔧 Configuration check:', isConfigured ? '✅ Valid' : '❌ Invalid');
  return isConfigured;
};

let supabase: any;

if (!isSupabaseConfigured()) {
  console.error('❌ Supabase environment variables not properly configured!');
  console.warn('📝 Please check your environment variables:');
  console.warn('   VITE_SUPABASE_URL should be: https://your-project-ref.supabase.co');
  console.warn('   VITE_SUPABASE_ANON_KEY should be a long JWT token');
  
  // Create a mock client that shows clear error messages
  supabase = {
    auth: {
      signUp: async () => ({ 
        data: { user: null }, 
        error: { message: '❌ Supabase not configured properly. Please check your .env file.' } 
      }),
      signInWithPassword: async () => ({ 
        data: { user: null }, 
        error: { message: '❌ Supabase not configured properly. Please check your .env file.' } 
      }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: async () => ({ data: null, error: { message: '❌ Supabase not configured' } })
        }),
        order: async () => ({ data: [], error: null })
      }),
      insert: () => ({ 
        select: () => ({ 
          single: async () => ({ data: null, error: { message: '❌ Supabase not configured' } })
        })
      }),
      upsert: () => ({ 
        select: () => ({ 
          single: async () => ({ data: null, error: { message: '❌ Supabase not configured' } })
        })
      })
    })
  };
} else {
  console.log('✅ Supabase configuration looks good, creating client...');
  
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: true // Enable debug mode
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'halaqah-platform@1.0.0',
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });

  // Test connection after a short delay
  setTimeout(async () => {
    const isConnected = await testSupabaseConnection();
    if (isConnected) {
      console.log('🎉 All Supabase services are working correctly!');
    } else {
      console.error('❌ Some Supabase services are not responding correctly');
    }
  }, 1000);
}

// Test GitHub connection (for deployment)
const testGitHubConnection = async () => {
  try {
    console.log('🔵 Testing GitHub connection...');
    const response = await fetch('https://api.github.com/zen');
    if (response.ok) {
      const zen = await response.text();
      console.log('✅ GitHub API accessible:', zen);
      return true;
    }
  } catch (error) {
    console.warn('⚠️ GitHub API test failed:', error);
  }
  return false;
};

// Test Vercel connection (for deployment)
const testVercelConnection = async () => {
  try {
    console.log('🔵 Testing Vercel connection...');
    const response = await fetch('https://vercel.com/api/v1/status');
    if (response.ok) {
      console.log('✅ Vercel API accessible');
      return true;
    }
  } catch (error) {
    console.warn('⚠️ Vercel API test failed:', error);
  }
  return false;
};

// Run all connection tests
setTimeout(async () => {
  console.log('🚀 Running comprehensive connection tests...');
  
  const results = {
    supabase: await testSupabaseConnection(),
    github: await testGitHubConnection(),
    vercel: await testVercelConnection()
  };
  
  console.log('📊 Connection Test Results:', results);
  
  if (results.supabase && results.github && results.vercel) {
    console.log('🎉 All services are accessible and working correctly!');
  } else {
    console.warn('⚠️ Some services may have connectivity issues');
  }
}, 2000);

export { supabase, isSupabaseConfigured, testSupabaseConnection };

// Enhanced Database types with better validation
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