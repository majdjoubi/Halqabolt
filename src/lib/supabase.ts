// Simplified Supabase client - only used when properly configured
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      }
    })
  : null;

// Log configuration status
if (supabase) {
  console.log('✅ Supabase client created successfully');
} else {
  console.log('🟡 Supabase not configured - using mock data');
}

// Database types (keep for future use)
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

export interface Session {
  id: string;
  teacher_id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  price: number;
  max_students: number;
  session_type: 'individual' | 'group';
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  student_id: string;
  session_id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}