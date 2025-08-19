import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';
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
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string) => {
    console.log('🔵 Starting signup process:', { email, role, name });
    
    setLoading(true);
    
    try {
      // Test connection first
      if (isSupabaseConfigured()) {
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
          throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
        }
      }
      
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn('⚠️ Supabase not configured, using mock signup');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
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
        setLoading(false);
        return mockUser;
      }
      
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
        setLoading(false);
        throw new Error(authError.message || 'فشل في إنشاء الحساب');
      }

      if (!authData.user) {
        setLoading(false);
        throw new Error('فشل في إنشاء الحساب');
      }

      console.log('🟢 Auth signup successful:', authData.user.id);

      // Wait for auth to be processed and session to be established
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get the fresh session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('فشل في إنشاء الجلسة');
      }

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
      setLoading(false);
      console.log('🟢 Signup completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signup error:', error);
      setLoading(false);
      throw new Error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔵 Starting signin process:', { email });
    
    setLoading(true);
    
    try {
      // Test connection first
      if (isSupabaseConfigured()) {
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
          throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
        }
      }
      
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.warn('⚠️ Supabase not configured, using mock signin');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
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
        setLoading(false);
        return mockUser;
      }
      
      console.log('🔵 Calling Supabase signIn...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        console.error('🔴 Auth signin error:', authError);
        setLoading(false);
        throw new Error(authError.message || 'فشل في تسجيل الدخول');
      }

      if (!authData.user) {
        setLoading(false);
        throw new Error('فشل في تسجيل الدخول');
      }

      console.log('🟢 Auth signin successful:', authData.user.id);

      // Wait for session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      setLoading(false);
      console.log('🟢 Signin completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signin error:', error);
      setLoading(false);
      throw new Error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
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
      setLoading(false);
      console.log('🟢 Signout successful');
    } catch (error) {
      console.error('🔴 Signout error:', error);
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
        setLoading(false);
        throw error;
      }

      const updatedUser = { ...user, profile: data };
      setUser(updatedUser);
      setLoading(false);
      console.log('🟢 Profile updated successfully');
      return updatedUser;
    } catch (error) {
      console.error('🔴 Profile update error:', error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    console.log('🔵 Initializing auth state');
    
    let mounted = true;
    
    // Get initial session
    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('🔴 Session error:', error);
        return;
      }

      if (session?.user && mounted) {
        console.log('🟢 Found existing session:', session.user.id);
        await handleAuthUser(session.user);
      } else {
        console.log('🟡 No existing session found');
      }
    };
    
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔵 Auth state changed:', event);
      
      if (!mounted) return;
      
      if (event === 'SIGNED_OUT' || !session?.user) {
        setUser(null);
      } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
        await handleAuthUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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