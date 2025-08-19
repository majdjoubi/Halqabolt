import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onSuccess?: (userRole: 'student' | 'teacher') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المصادقة غير متاحة</h2>
          <p className="text-gray-600 mb-6">
            نعتذر، خدمة تسجيل الدخول وإنشاء الحسابات غير متاحة حالياً
          </p>
          <button
            onClick={onClose}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;