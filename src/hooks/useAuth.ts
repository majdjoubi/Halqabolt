import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Mock sign in - في التطبيق الحقيقي ستتصل بـ API
    setTimeout(() => {
      setUser({ id: '1', email });
      setLoading(false);
    }, 1000);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    // Mock sign up - في التطبيق الحقيقي ستتصل بـ API
    setTimeout(() => {
      setUser({ id: '1', email });
      setLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };
};