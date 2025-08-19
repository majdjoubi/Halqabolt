import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
  // Student specific fields
  age?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  preferred_schedule?: string;
  // Teacher specific fields
  specialization?: string;
  experience_years?: number;
  hourly_rate?: number;
  bio?: string;
  certificates?: string[];
  languages?: string[];
  is_verified?: boolean;
  rating?: number;
  students_count?: number;
  availability_status?: string;
}

interface AppUser {
  id: string;
  email: string;
  role: 'student' | 'teacher';
  profile?: UserProfile;
}

export const useAuth = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string) => {
    console.log('🔵 Starting signup process:', { email, role, name });
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, using mock signup');
      // Create mock user for development
      const mockUser: AppUser = {
        id: 'mock-' + Date.now(),
        email: email,
        role: role,
        profile: {
          id: 'mock-profile-' + Date.now(),
          user_id: 'mock-' + Date.now(),
          name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      setUser(mockUser);
      return mockUser;
    }
    
    setLoading(true);
    
    try {
      console.log('🔵 Calling Supabase signUp...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            role: role,
            name: name.trim()
          }
        }
      });

      if (authError) {
        console.error('🔴 Auth signup error:', authError);
        throw new Error(authError.message || 'فشل في إنشاء الحساب');
      }

      if (!authData.user) {
        throw new Error('فشل في إنشاء الحساب');
      }

      console.log('🟢 Auth signup successful:', authData.user.id);

      // Wait a bit for auth to be processed
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create profile in appropriate table
      const tableName = role === 'teacher' ? 'teachers' : 'students';
      const profileData = {
        user_id: authData.user.id,
        name: name.trim(),
        ...(role === 'teacher' ? {
          specialization: 'معلم قرآن كريم',
          experience_years: 0,
          hourly_rate: 50,
          bio: 'معلم قرآن كريم مبتدئ',
          certificates: [],
          languages: ['العربية'],
          is_verified: false,
          rating: 0.0,
          students_count: 0,
          availability_status: 'available'
        } : {
          age: null,
          level: 'beginner',
          goals: [],
          preferred_schedule: ''
        })
      };

      console.log('🔵 Creating profile in table:', tableName);
      
      const { data: profileResult, error: profileError } = await supabase
        .from(tableName)
        .insert([profileData])
        .select()
        .single();

      if (profileError) {
        console.error('🔴 Profile creation error:', profileError);
        console.warn('⚠️ Profile creation failed, but user account created');
      }

      const appUser: AppUser = {
        id: authData.user.id,
        email: authData.user.email!,
        role: role,
        profile: profileResult || undefined
      };

      setUser(appUser);
      console.log('🟢 Signup completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signup error:', error);
      throw new Error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔵 Starting signin process:', { email });
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, using mock signin');
      // Create mock user for development
      const mockUser: AppUser = {
        id: 'mock-signin-' + Date.now(),
        email: email,
        role: 'student',
        profile: {
          id: 'mock-profile-signin-' + Date.now(),
          user_id: 'mock-signin-' + Date.now(),
          name: email.split('@')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      setUser(mockUser);
      return mockUser;
    }
    
    setLoading(true);
    
    try {
      console.log('🔵 Calling Supabase signIn...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        console.error('🔴 Auth signin error:', authError);
        throw new Error(authError.message || 'فشل في تسجيل الدخول');
      }

      if (!authData.user) {
        throw new Error('فشل في تسجيل الدخول');
      }

      console.log('🟢 Auth signin successful:', authData.user.id);

      // Get user role and profile
      const userRole = authData.user.user_metadata?.role || 'student';
      
      // Get profile from appropriate table
      const tableName = userRole === 'teacher' ? 'teachers' : 'students';
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('🔴 Profile fetch error:', profileError);
      }

      const appUser: AppUser = {
        id: authData.user.id,
        email: authData.user.email!,
        role: userRole,
        profile: profileData || undefined
      };

      setUser(appUser);
      console.log('🟢 Signin completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signin error:', error);
      throw new Error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('🔵 Starting signout process');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('🔴 Signout error:', error);
        throw error;
      }
      
      setUser(null);
      console.log('🟢 Signout successful');
    } catch (error) {
      console.error('🔴 Signout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return null;
    
    console.log('🔵 Updating profile:', profileData);
    setLoading(true);
    
    try {
      const tableName = user.role === 'teacher' ? 'teachers' : 'students';
      
      const { data, error } = await supabase
        .from(tableName)
        .upsert({
          user_id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('🔴 Profile update error:', error);
        throw error;
      }

      const updatedUser = { ...user, profile: data };
      setUser(updatedUser);
      console.log('🟢 Profile updated successfully');
      return updatedUser;
    } catch (error) {
      console.error('🔴 Profile update error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔵 Initializing auth state');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('🔴 Session error:', error);
        setLoading(false);
        return;
      }

      if (session?.user) {
        console.log('🟢 Found existing session:', session.user.id);
        handleAuthUser(session.user);
      } else {
        console.log('🟡 No existing session found');
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔵 Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setLoading(false);
      } else if (event === 'SIGNED_IN' && session?.user) {
        await handleAuthUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthUser = async (authUser: User) => {
    try {
      const userRole = authUser.user_metadata?.role || 'student';
      const tableName = userRole === 'teacher' ? 'teachers' : 'students';
      
      const { data: profileData } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      const appUser: AppUser = {
        id: authUser.id,
        email: authUser.email!,
        role: userRole,
        profile: profileData || undefined
      };
      
      setUser(appUser);
    } catch (error) {
      console.error('🔴 Error handling auth user:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
};