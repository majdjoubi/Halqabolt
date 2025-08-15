import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  navigateTo: (page: 'home' | 'search' | 'teacherProfile' | 'donation', teacherId?: string | null) => void;
  currentPage: 'home' | 'search' | 'teacherProfile' | 'donation';
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, onOpenAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigateTo('search');
    } else {
      onOpenAuth('signup');
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2 rounded-xl shadow-md">
                <img 
                  src="/حلقة 2.png" 
                  alt="شعار حلقة" 
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <BookOpen className="h-8 w-8 text-white hidden" />
              </div>
              <h1 className="text-2xl font-bold text-emerald-700">حلقة</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                الرئيسية
              </a>
              <button 
                onClick={() => navigateTo('search')}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                المعلمون
              </button>
              <button 
                onClick={() => navigateTo('search')}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                الدروس الحية
              </button>
              <button 
                onClick={() => navigateTo('donation')}
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
              >
                تبرع الآن
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {user ? (
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-gray-700">مرحباً، {user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={handleStartLearning}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    ابدأ التعلم
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-emerald-600 font-medium">
                  الرئيسية
                </a>
                <button 
                  onClick={() => {
                    navigateTo('search');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-right"
                >
                  المعلمون
                </button>
                <button 
                  onClick={() => {
                    navigateTo('search');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-right"
                >
                  الدروس الحية
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigateTo('donation');
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium text-right"
                >
                  تبرع الآن
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <span className="text-gray-700 text-sm">مرحباً، {user.email}</span>
                      <button
                        onClick={() => navigateTo('search')}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-right w-full"
                      >
                        البحث عن معلمين
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-right"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          onOpenAuth('signin');
                          setIsMenuOpen(false);
                        }}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-right"
                      >
                        تسجيل الدخول
                      </button>
                      <button
                        onClick={() => {
                          handleStartLearning();
                          setIsMenuOpen(false);
                        }}
                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
                      >
                        ابدأ التعلم
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>      
    </>
  );
};

export default Header;