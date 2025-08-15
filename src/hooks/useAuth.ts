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
    setLoading(true);
    try {
      const userData = await auth.signIn(email, password, role);
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'student' | 'teacher') => {
    setLoading(true);
    try {
      const userData = await auth.signUp(email, password, role);
      setUser(userData);
      return userData;
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

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
};