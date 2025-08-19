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
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Enhanced connection test
  const testConnection = async (): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured properly');
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
        console.error('🔴 Connection test failed:', error);
        return false;
      }
      
      console.log('✅ Supabase connection successful');
      return true;
    } catch (error) {
      console.error('🔴 Connection test error:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string) => {
    console.log('🔵 Starting signup process:', { email, role, name });
    
    if (loading) {
      console.log('⚠️ Already processing, skipping...');
      return;
    }
    
    setLoading(true);
    
    try {
      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
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
        throw new Error(authError.message || 'فشل في إنشاء الحساب');
      }

      if (!authData.user) {
        throw new Error('فشل في إنشاء الحساب - لم يتم إرجاع بيانات المستخدم');
      }

      console.log('🟢 Auth signup successful:', authData.user.id);

      // Wait for session to be established
      console.log('🔵 Waiting for session...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get the fresh session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('🔴 Session error:', sessionError);
        throw new Error('فشل في إنشاء الجلسة');
      }

      if (!session) {
        console.warn('⚠️ No session found after signup');
        throw new Error('فشل في إنشاء الجلسة');
      }

      console.log('🟢 Session established successfully');

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
      } else {
        console.log('🟢 Profile created successfully');
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
      
      // Provide user-friendly error messages
      let errorMessage = 'حدث خطأ أثناء إنشاء الحساب';
      
      if (error.message?.includes('لا يمكن الاتصال بالخادم')) {
        errorMessage = error.message;
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'هذا البريد الإلكتروني مسجل بالفعل';
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      } else if (error.message?.includes('Unable to validate email address')) {
        errorMessage = 'البريد الإلكتروني غير صحيح';
      } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
        errorMessage = 'مشكلة في الاتصال بالخادم. يرجى المحاولة مرة أخرى.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔵 Starting signin process:', { email });
    
    if (loading) {
      console.log('⚠️ Already processing, skipping...');
      return;
    }
    
    setLoading(true);
    
    try {
      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.');
      }
      
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
        throw new Error('فشل في تسجيل الدخول - لم يتم إرجاع بيانات المستخدم');
      }

      console.log('🟢 Auth signin successful:', authData.user.id);

      // Wait for session to be established
      console.log('🔵 Waiting for session...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      
      // Provide user-friendly error messages
      let errorMessage = 'حدث خطأ أثناء تسجيل الدخول';
      
      if (error.message?.includes('لا يمكن الاتصال بالخادم')) {
        errorMessage = error.message;
      } else if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'يرجى تأكيد بريدك الإلكتروني أولاً';
      } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
        errorMessage = 'مشكلة في الاتصال بالخادم. يرجى المحاولة مرة أخرى.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
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
    
    let mounted = true;
    
    // Get initial session
    const initializeAuth = async () => {
      try {
        // Set a timeout to prevent infinite initializing
        const timeoutId = setTimeout(() => {
          if (mounted) {
            console.log('⏰ Auth initialization timeout, proceeding without session');
            setInitializing(false);
          }
        }, 5000); // 5 seconds timeout
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        clearTimeout(timeoutId);
        
        if (error) {
          console.error('🔴 Session error:', error);
          if (mounted) {
            setInitializing(false);
          }
          return;
        }

        if (session?.user && mounted) {
          console.log('🟢 Found existing session:', session.user.id);
          await handleAuthUser(session.user);
        } else {
          console.log('🟡 No existing session found');
        }
      } catch (error) {
        console.error('🔴 Auth initialization error:', error);
      } finally {
        if (mounted) {
          setInitializing(false);
        }
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
      console.log('🟢 User state updated:', appUser.email);
    } catch (error) {
      console.error('🔴 Error handling auth user:', error);
    }
  };

  return {
    user,
    loading,
    initializing,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
};