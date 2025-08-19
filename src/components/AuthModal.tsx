import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, Mail, Lock, User } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (loading) return; // Prevent multiple submissions

    try {
      if (mode === 'signin') {
        await signIn(email, password, selectedRole);
      } else {
        await signUp(email, password, selectedRole, name);
      }
      onClose();
      if (onSuccess) {
        onSuccess(selectedRole);
      }
    } catch (err: any) {
      console.error('Auth modal error:', err);
      setError(err.message || 'حدث خطأ أثناء المصادقة');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-600">
            {mode === 'signin' ? 'أهلاً بك مرة أخرى' : 'انضم إلى منصة حلقة'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Role Toggle */}
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
          {selectedRole === 'teacher' && mode === 'signup' && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700">
                <strong>ملاحظة:</strong> التسجيل كمعلم يتطلب مراجعة الشهادات والمؤهلات. 
                ستحتاج لرفع شهاداتك بعد التسجيل وانتظار الموافقة قبل البدء في التدريس.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل
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
              البريد الإلكتروني
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
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="أدخل كلمة المرور"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 ${
              selectedRole === 'teacher'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
            }`}
          >
            {loading ? 'جاري التحميل...' : mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'signin' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
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