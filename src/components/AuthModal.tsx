import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onSuccess?: (userRole: 'student' | 'teacher') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading } = useAuth();

  if (!isOpen) return null;

  const validateForm = () => {
    if (!email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      return false;
    }
    
    if (!email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return false;
    }
    
    if (!password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return false;
    }
    
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    
    if (mode === 'signup' && !name.trim()) {
      setError('يرجى إدخال الاسم الكامل');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    setError(null);
    
    if (!validateForm()) return;
    
    try {
      if (mode === 'signin') {
        console.log('🔵 AuthModal calling signIn...');
        await signIn(email.trim(), password);
      } else {
        console.log('🔵 AuthModal calling signUp...');
        await signUp(email.trim(), password, selectedRole, name.trim());
      }
      
      console.log('🟢 AuthModal auth successful, closing modal...');
      
      // Close modal immediately on success
      onClose();
      if (onSuccess) {
        onSuccess(selectedRole);
      }
      
    } catch (err: any) {
      console.error('🔴 Auth modal error:', err);
      
      // Provide user-friendly error messages
      let errorMessage = 'حدث خطأ أثناء المصادقة';
      
      if (err.message?.includes('User already registered')) {
        errorMessage = 'هذا البريد الإلكتروني مسجل بالفعل';
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'يرجى تأكيد بريدك الإلكتروني أولاً';
      } else if (err.message?.includes('Password should be at least 6 characters')) {
        errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      } else if (err.message?.includes('Unable to validate email address')) {
        errorMessage = 'البريد الإلكتروني غير صحيح';
      } else if (err.message?.includes('fetch')) {
        errorMessage = 'مشكلة في الاتصال بالخادم. يرجى المحاولة مرة أخرى.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setShowPassword(false);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-600">
            {mode === 'signin' ? 'أهلاً بك مرة أخرى' : 'انضم إلى منصة حلقة'}
          </p>
        </div>

        {/* Role Toggle - Only show for signup */}
        {mode === 'signup' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              اختر نوع الحساب
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'student'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                طالب
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedRole === 'teacher'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                معلم
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {selectedRole === 'student' 
                ? 'ستتمكن من البحث عن المعلمين وحجز الدروس فوراً'
                : 'سيتم مراجعة طلبك والموافقة عليه قبل البدء في التدريس'
              }
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل *
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور *
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="أدخل كلمة المرور"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">
                كلمة المرور يجب أن تكون 6 أحرف على الأقل
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRole === 'teacher' && mode === 'signup'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                {mode === 'signin' ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
              </div>
            ) : (
              mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء الحساب'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'signin' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button
              onClick={switchMode}
              className="text-emerald-600 hover:text-emerald-700 font-medium mr-1"
            >
              {mode === 'signin' ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;