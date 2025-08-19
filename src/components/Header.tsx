import React, { useState } from 'react';
import { BookOpen, Menu, X, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  navigateTo: (page: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard', teacherId?: string | null) => void;
  currentPage: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard';
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, onOpenAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const handleStartLearning = () => {
    onOpenAuth('signup');
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const handleAccountSettings = () => {
    // Navigate to account settings
    if (user?.role === 'student') {
      navigateTo('studentDashboard');
    } else if (user?.role === 'teacher') {
      navigateTo('teacherDashboard');
    }
    setIsUserMenuOpen(false);
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
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {/* Navigation Links */}
              <nav className="flex items-center space-x-6 space-x-reverse">
                <button 
                  onClick={() => navigateTo('home')}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  الرئيسية
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
              
              {/* Separator */}
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* User Section */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={handleUserMenuToggle}
                    className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                  >
                    <User className="h-5 w-5" />
                    <span>مرحباً {user.name || user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={handleAccountSettings}
                        className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
                      >
                        <Settings className="h-4 w-4" />
                        <span>إعدادات الحساب</span>
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2 space-x-reverse"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleStartLearning}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  ابدأ التعلم الآن
                </button>
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
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-right"
                >
                  الرئيسية
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
                
                <hr className="border-gray-200" />
                
                {/* Mobile User Section */}
                {isAuthenticated && user ? (
                  <>
                    <div className="text-center py-2">
                      <span className="text-emerald-600 font-semibold">مرحباً {user.name || user.email}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleAccountSettings();
                      }}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold text-center flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <Settings className="h-5 w-5" />
                      <span>إعدادات الحساب</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                      className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold text-center flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleStartLearning();
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold text-center"
                  >
                    ابدأ التعلم الآن
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>      
    </>
  );
};

export default Header;