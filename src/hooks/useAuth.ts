import { useState, useEffect } from 'react';
import { auth } from '../lib/database';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher';
  profile: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string, role: 'student' | 'teacher') => {
    setLoading(true);
    try {
      const userData = await auth.signIn(email, password, role);
      setUser(userData);
      return userData;
    } catch (error: any) {
      console.error('Sign in error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    setLoading(true);
    try {
      const userData = await auth.signUp(email, password, role, name);
      setUser(userData);
      return userData;
    } catch (error: any) {
      console.error('Sign up error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return null;
    
    setLoading(true);
    try {
      const updatedUser = await auth.updateUserProfile(user.id, user.role, profileData);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        try {
          const currentUser = await auth.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Auth state change error:', error);
          setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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