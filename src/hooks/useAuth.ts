import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
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

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    console.log('🔵 Starting signup process:', { email, role, name });
    setLoading(true);
    
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
            name: name
          }
        }
      });

      if (authError) {
        console.error('🔴 Auth signup error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('فشل في إنشاء الحساب');
      }

      console.log('🟢 Auth signup successful:', authData.user.id);

      // Create profile in appropriate table
      const tableName = role === 'teacher' ? 'teachers' : 'students';
      const newProfileData = {
        user_id: authData.user.id,
        name: name,
        email: email,
        ...(role === 'teacher' ? {
          specialization: '',
          experience_years: 0,
          hourly_rate: 0,
          bio: '',
          certificates: [],
          languages: ['العربية'],
          is_verified: false,
          rating: 0.0,
          students_count: 0
        } : {
          age: null,
          level: 'beginner',
          goals: [],
          preferred_schedule: ''
        })
      };

      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .insert([newProfileData])
        .select()
        .single();

      if (profileError) {
        console.error('🔴 Profile creation error:', profileError);
        console.warn('⚠️ Profile will be created later if needed');
      }

      const appUser: AppUser = {
        id: authData.user.id,
        email: authData.user.email!,
        role: role,
        profile: profileData || { 
          id: 'temp-' + Date.now(), 
          user_id: authData.user.id, 
          name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      setUser(appUser);
      console.log('🟢 Signup completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string, role: 'student' | 'teacher') => {
    console.log('🔵 Starting signin process:', { email, role });
    setLoading(true);
    
    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('🔴 Auth signin error:', authError);
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('فشل في تسجيل الدخول');
      }

      console.log('🟢 Auth signin successful:', authData.user.id);

      // Get user role from metadata or use attempted role
      const userRole = authData.user.user_metadata?.role || role;
      
      // Use the actual user role from the database instead of throwing error
      const actualRole = userRole;

      // Get profile from appropriate table
      const tableName = actualRole === 'teacher' ? 'teachers' : 'students';
      const { data: profileData, error: profileError } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('🔴 Profile fetch error:', profileError);
        // Don't throw error, user can create profile later
      }

      const appUser: AppUser = {
        id: authData.user.id,
        email: authData.user.email!,
        role: actualRole,
        profile: profileData || undefined
      };

      setUser(appUser);
      console.log('🟢 Signin completed successfully');
      return appUser;

    } catch (error: any) {
      console.error('🔴 Signin error:', error);
      throw error;
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

  const signInWithGoogle = async (role: 'student' | 'teacher') => {
    console.log('🔵 Starting Google OAuth signin:', { role });
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            role: role
          }
        }
      });
      
      if (error) {
        console.error('🔴 Google OAuth error:', error);
        throw error;
      }
      
      console.log('🟢 Google OAuth initiated successfully');
      return data;
    } catch (error: any) {
      console.error('🔴 Google OAuth error:', error);
      throw error;
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
        // Get role from URL params (for OAuth) or user metadata
        const urlParams = new URLSearchParams(window.location.search);
        const roleFromUrl = urlParams.get('role') as 'student' | 'teacher' | null;
        const userRole = roleFromUrl || session.user.user_metadata?.role || 'student';
        
        // Get profile
        const tableName = userRole === 'teacher' ? 'teachers' : 'students';
        supabase
          .from(tableName)
          .select('*')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            const appUser: AppUser = {
              id: session.user.id,
              email: session.user.email!,
              role: userRole,
              profile: profileData || undefined
            };
            setUser(appUser);
            setLoading(false);
          });
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
        // Get role from URL params (for OAuth) or user metadata
        const urlParams = new URLSearchParams(window.location.search);
        const roleFromUrl = urlParams.get('role') as 'student' | 'teacher' | null;
        const userRole = roleFromUrl || session.user.user_metadata?.role || 'student';
        const tableName = userRole === 'teacher' ? 'teachers' : 'students';
        
        const { data: profileData } = await supabase
          .from(tableName)
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        const appUser: AppUser = {
          id: session.user.id,
          email: session.user.email!,
          role: userRole,
          profile: profileData || undefined
        };
        
        setUser(appUser);
        setLoading(false);
        
        // Clean up URL params after successful OAuth
        if (roleFromUrl) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  };
};