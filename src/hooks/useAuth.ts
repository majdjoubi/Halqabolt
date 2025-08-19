import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';
import type { User } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        console.log('🔴 Supabase not configured, skipping auth initialization');
        if (mounted) {
          setInitializing(false);
        }
        return;
      }

      try {
        console.log('🔵 Initializing auth...');
        
        // Test connection first
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
          throw new Error('Cannot connect to Supabase');
        }

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('🔴 Auth session error:', error);
        } else if (session?.user) {
          console.log('🟢 User session found:', session.user.email);
          if (mounted) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
              role: session.user.user_metadata?.role || 'student',
              created_at: session.user.created_at || new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }
        } else {
          console.log('🟡 No active session found');
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('🔄 Auth state changed:', event);
            
            if (!mounted) return;

            if (event === 'SIGNED_IN' && session?.user) {
              console.log('🟢 User signed in:', session.user.email);
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
                role: session.user.user_metadata?.role || 'student',
                created_at: session.user.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            } else if (event === 'SIGNED_OUT') {
              console.log('🔴 User signed out');
              setUser(null);
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
              console.log('🔄 Token refreshed for:', session.user.email);
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
                role: session.user.user_metadata?.role || 'student',
                created_at: session.user.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            }
          }
        );

        // Cleanup subscription on unmount
        return () => {
          subscription.unsubscribe();
        };

      } catch (error: any) {
        console.error('🔴 Auth initialization error:', error);
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    };

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.log('⏰ Auth initialization timeout');
        setInitializing(false);
      }
    }, 5000);

    initializeAuth().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase not configured' };
    }

    setLoading(true);
    try {
      console.log('🔵 Signing in user:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('🔴 Sign in error:', error);
        return { error: error.message };
      }

      console.log('🟢 Sign in successful');
      return { data };
    } catch (error: any) {
      console.error('🔴 Sign in error:', error);
      return { error: error.message || 'حدث خطأ أثناء تسجيل الدخول' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { name: string; role: 'student' | 'teacher' }) => {
    if (!supabase) {
      return { error: 'Supabase not configured' };
    }

    setLoading(true);
    try {
      console.log('🔵 Signing up user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role
          }
        }
      });

      if (error) {
        console.error('🔴 Sign up error:', error);
        return { error: error.message };
      }

      console.log('🟢 Sign up successful');
      
      // Wait a bit for the session to be established
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { data };
    } catch (error: any) {
      console.error('🔴 Sign up error:', error);
      return { error: error.message || 'حدث خطأ أثناء إنشاء الحساب' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    setLoading(true);
    try {
      console.log('🔵 Signing out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('🔴 Sign out error:', error);
      } else {
        console.log('🟢 Sign out successful');
        setUser(null);
      }
    } catch (error: any) {
      console.error('🔴 Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!supabase || !user) {
      return null;
    }

    try {
      console.log('🔵 Updating user profile');
      
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        console.error('🔴 Profile update error:', error);
        return null;
      }

      console.log('🟢 Profile updated successfully');
      return data;
    } catch (error: any) {
      console.error('🔴 Profile update error:', error);
      return null;
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