// Hook بسيط بدون مصادقة
import { useState } from 'react';

export const useAuth = () => {
  const [user] = useState(null);
  const [loading] = useState(false);
  const [initializing] = useState(false);

  return {
    user: null,
    loading: false,
    initializing: false,
    isAuthenticated: false,
    signIn: async () => ({ error: 'المصادقة غير متاحة حالياً' }),
    signUp: async () => ({ error: 'المصادقة غير متاحة حالياً' }),
    signOut: async () => {},
    updateProfile: async () => null,
  };
};