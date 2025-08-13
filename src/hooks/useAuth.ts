import { useState, useEffect } from 'react';
import { AuthService, User } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const result = AuthService.signUp(email, password, name);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signIn = async (email: string, password: string) => {
    const result = AuthService.signIn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signOut = async () => {
    AuthService.signOut();
    setUser(null);
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
}