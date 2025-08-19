import { useState, useEffect } from 'react';
import { auth } from '../lib/database';

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
    console.log('🔵 useAuth signIn called:', { email, role });
    try {
      setLoading(true);
      const userData = await auth.signIn(email, password, role);
      console.log('🔵 useAuth signIn userData:', userData);
      setUser(userData);
      return userData;
    } catch (error: any) {
      console.error('🔴 Sign in error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'teacher', name: string = '') => {
    console.log('🔵 useAuth signUp called:', { email, role, name });
    try {
      setLoading(true);
      const userData = await auth.signUp(email, password, role, name);
      console.log('🔵 useAuth signUp userData:', userData);
      setUser(userData);
      return userData;
    } catch (error: any) {
      console.error('🔴 Sign up error in hook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return null;
    
    try {
      setLoading(true);
      const updatedUser = await auth.updateUserProfile(user.id, user.role, profileData);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      setLoading(true);
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