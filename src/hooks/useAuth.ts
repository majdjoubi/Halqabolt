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
        console.log('🔴 Supabase غير مُعد - تخطي تهيئة المصادقة');
        if (mounted) {
          setInitializing(false);
        }
        return;
      }

      try {
        console.log('🔵 تهيئة المصادقة...');
        
        // Test connection first
        const isConnected = await testSupabaseConnection();
        if (!isConnected) {
          console.error('🔴 لا يمكن الاتصال بـ Supabase');
          if (mounted) {
            setInitializing(false);
          }
          return;
        }

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('🔴 خطأ في جلسة المصادقة:', error);
        } else if (session?.user) {
          console.log('🟢 تم العثور على جلسة مستخدم:', session.user.email);
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
          console.log('🟡 لا توجد جلسة نشطة');
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('🔄 تغيير حالة المصادقة:', event);
            
            if (!mounted) return;

            if (event === 'SIGNED_IN' && session?.user) {
              console.log('🟢 تم تسجيل الدخول:', session.user.email);
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
                role: session.user.user_metadata?.role || 'student',
                created_at: session.user.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            } else if (event === 'SIGNED_OUT') {
              console.log('🔴 تم تسجيل الخروج');
              setUser(null);
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
              console.log('🔄 تم تحديث الرمز المميز لـ:', session.user.email);
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

        return () => {
          subscription.unsubscribe();
        };

      } catch (error: any) {
        console.error('🔴 خطأ في تهيئة المصادقة:', error);
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.log('⏰ انتهت مهلة تهيئة المصادقة');
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
      return { error: 'Supabase غير مُعد' };
    }

    setLoading(true);
    try {
      console.log('🔵 تسجيل دخول المستخدم:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('🔴 خطأ في تسجيل الدخول:', error);
        return { error: error.message };
      }

      console.log('🟢 تم تسجيل الدخول بنجاح');
      return { data };
    } catch (error: any) {
      console.error('🔴 خطأ في تسجيل الدخول:', error);
      return { error: error.message || 'حدث خطأ أثناء تسجيل الدخول' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { name: string; role: 'student' | 'teacher' }) => {
    if (!supabase) {
      return { error: 'Supabase غير مُعد' };
    }

    setLoading(true);
    try {
      console.log('🔵 إنشاء حساب المستخدم:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            full_name: userData.name
          }
        }
      });

      if (error) {
        console.error('🔴 خطأ في إنشاء الحساب:', error);
        return { error: error.message };
      }

      console.log('🟢 تم إنشاء الحساب بنجاح');
      
      // Wait for session to be established
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { data };
    } catch (error: any) {
      console.error('🔴 خطأ في إنشاء الحساب:', error);
      return { error: error.message || 'حدث خطأ أثناء إنشاء الحساب' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      return { error: 'Supabase غير مُعد' };
    }

    setLoading(true);
    try {
      console.log('🔵 تسجيل دخول المستخدم بـ Google');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('🔴 خطأ في تسجيل الدخول بـ Google:', error);
        return { error: error.message };
      }

      console.log('🟢 تم بدء عملية تسجيل الدخول بـ Google');
      return { data };
    } catch (error: any) {
      console.error('🔴 خطأ في تسجيل الدخول بـ Google:', error);
      return { error: error.message || 'حدث خطأ أثناء تسجيل الدخول بـ Google' };
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
      console.log('🔵 تسجيل خروج المستخدم');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('🔴 خطأ في تسجيل الخروج:', error);
      } else {
        console.log('🟢 تم تسجيل الخروج بنجاح');
        setUser(null);
      }
    } catch (error: any) {
      console.error('🔴 خطأ في تسجيل الخروج:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    initializing,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
};