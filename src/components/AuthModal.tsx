import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured, initializeConnections } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onSuccess?: (userRole: 'student' | 'teacher') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [error, setError] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<{
    supabase: boolean;
    google: boolean;
    vercel: boolean;
  } | null>(null);
  const [testingConnections, setTestingConnections] = useState(false);

  const { signIn, signUp, loading } = useAuth();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen && !connectionStatus) {
      testConnections();
    }
  }, [isOpen]);

  const testConnections = async () => {
    setTestingConnections(true);
    try {
      const results = await initializeConnections();
      setConnectionStatus({
        supabase: results[0],
        google: results[1],
        vercel: results[2]
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus({
        supabase: false,
        google: false,
        vercel: false
      });
    } finally {
      setTestingConnections(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isSupabaseConfigured()) {
      setError('يرجى إعداد Supabase أولاً');
      return;
    }

    try {
      const { signInWithOAuth } = await import('../lib/supabase');
      const result = await signInWithOAuth('google');
      if (result.error) {
        setError(result.error.message);
      }
    } catch (error: any) {
      setError(error.message || 'حدث خطأ أثناء تسجيل الدخول بـ Google');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured()) {
      setError('يرجى إعداد Supabase أولاً. راجع التعليمات أعلاه.');
      return;
    }

    if (!connectionStatus?.supabase) {
      setError('لا يمكن الاتصال بـ Supabase. تأكد من صحة البيانات في ملف .env');
      return;
    }

    try {
      if (mode === 'signin') {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onSuccess?.(role);
          onClose();
        }
      } else {
        if (!name.trim()) {
          setError('يرجى إدخال الاسم');
          return;
        }
        
        const result = await signUp(email, password, { name: name.trim(), role });
        if (result.error) {
          setError(result.error);
        } else {
          onSuccess?.(role);
          onClose();
        }
      }
    } catch (error: any) {
      setError(error.message || 'حدث خطأ غير متوقع');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
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
            {mode === 'signin' 
              ? 'أدخل بياناتك للوصول إلى حسابك' 
              : 'انضم إلينا وابدأ رحلتك في تعلم القرآن الكريم'
            }
          </p>
        </div>

        {/* Connection Status */}
        {testingConnections && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600 ml-2" />
              <span className="text-blue-700">جاري اختبار الاتصالات...</span>
            </div>
          </div>
        )}

        {connectionStatus && !testingConnections && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">حالة الاتصالات:</h4>
            {!isSupabaseConfigured() && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm font-medium">⚠️ يرجى إعداد Supabase أولاً:</p>
                <ol className="text-amber-700 text-xs mt-2 mr-4 list-decimal">
                  <li>أنشئ مشروع جديد في <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-bold">supabase.com</a></li>
                  <li>من Settings → API، انسخ:</li>
                  <li className="mr-4">• Project URL</li>
                  <li className="mr-4">• anon/public key</li>
                  <li>أضفهما كمتغيرات بيئة في المنصة</li>
                  <li>أنشئ الجداول باستخدام SQL Editor</li>
                </ol>
                <div className="mt-3 p-2 bg-amber-100 rounded text-xs">
                  <strong>مثال على متغيرات البيئة:</strong><br/>
                  VITE_SUPABASE_URL=https://xxx.supabase.co<br/>
                  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </div>
              </div>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Supabase (قاعدة البيانات)</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  connectionStatus.supabase 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {connectionStatus.supabase ? '✅ متصل' : '❌ غير متصل'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Google OAuth</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  connectionStatus.google 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {connectionStatus.google ? '✅ متاح' : '⚠️ غير متاح'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vercel (الاستضافة)</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  connectionStatus.vercel 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {connectionStatus.vercel ? '✅ متاح' : '⚠️ غير متاح'}
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع الحساب
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      role === 'student'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    طالب
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      role === 'teacher'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    معلم
                  </button>
                </div>
              </div>
            </>
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
            disabled={loading || !connectionStatus?.supabase}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin ml-2" />
                {mode === 'signin' ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
              </>
            ) : (
              mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </button>

          {/* Google OAuth Integration */}
          {connectionStatus?.google && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>
          )}

          {connectionStatus?.google && (
            <button
              type="button"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              onClick={handleGoogleSignIn}
            >
              <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب'} باستخدام Google
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {mode === 'signin' 
              ? 'ليس لديك حساب؟ إنشاء حساب جديد' 
              : 'لديك حساب بالفعل؟ تسجيل الدخول'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;