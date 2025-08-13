import React, { useState } from 'react';
import { BookOpen, Menu, X, User, Star, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import SearchPage from './SearchPage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      // إظهار الدروس الجماعية المتاحة للدرس المجاني
      setShowSearchPage(true);
    } else {
      openAuthModal('signup');
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
                onClick={() => setShowSearchPage(true)}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                المعلمون
              </button>
              <a href="#lessons" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200">
                الدروس
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {user ? (
                <div className="flex items-center space-x-4 space-x-reverse">
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
                    onClick={() => openAuthModal('signin')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    data-start-learning
                    onClick={handleStartLearning}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    ابدأ درسك الأول مجاناً
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                    setShowSearchPage(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-right"
                >
                  المعلمون
                </button>
                <a href="#lessons" className="text-gray-700 hover:text-emerald-600 font-medium">
                  الدروس
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowSearchPage(true)}
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
                        onClick={() => openAuthModal('signin')}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-right"
                      >
                        تسجيل الدخول
                      </button>
                      <button
                        data-start-learning
                        onClick={handleStartLearning}
                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
                      >
                        ابدأ درسك الأول مجاناً
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={() => setShowSearchPage(true)}
      />
      
      {showSearchPage && (
        <div className="fixed inset-0 bg-white z-50">
          <SearchPage 
            onClose={() => setShowSearchPage(false)} 
            showGroupLessonsOnly={isAuthenticated}
          />
        </div>
      )}
    </>
  );
};

export default Header;