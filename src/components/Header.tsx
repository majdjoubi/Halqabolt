import React, { useState } from 'react';
import { BookOpen, Menu, X, User, Settings, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  navigateTo: (page: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard', teacherId?: string | null) => void;
  currentPage: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard';
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, onOpenAuth }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
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
    if (user?.role === 'student') {
      navigateTo('studentDashboard');
    } else if (user?.role === 'teacher') {
      navigateTo('teacherDashboard');
    }
    setIsUserMenuOpen(false);
  };

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setIsLangMenuOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2 rounded-xl shadow-md">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-emerald-700">{t('appName')}</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8 space-x-reverse">
              <nav className="flex items-center space-x-6 space-x-reverse">
                <button 
                  onClick={() => navigateTo('home')}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  {t('home')}
                </button>
                <button 
                  onClick={() => navigateTo('search')}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  {t('liveLessons')}
                </button>
                <button 
                  onClick={() => navigateTo('donation')}
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
                >
                  {t('donate')}
                </button>
              </nav>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{currentLang === 'ar' ? 'العربية' : 'English'}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => toggleLanguage('ar')}
                      className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 ${currentLang === 'ar' ? 'bg-emerald-50 text-emerald-700' : ''}`}
                    >
                      العربية
                    </button>
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 ${currentLang === 'en' ? 'bg-emerald-50 text-emerald-700' : ''}`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>

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
                  {t('startLearning')}
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
                  {t('home')}
                </button>
                <button 
                  onClick={() => {
                    navigateTo('search');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-right"
                >
                  {t('liveLessons')}
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigateTo('donation');
                  }}
                  className="text-amber-600 hover:text-amber-700 font-medium text-right"
                >
                  {t('donate')}
                </button>
                
                <hr className="border-gray-200" />
                
                {/* Mobile Language Switcher */}
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className={`px-3 py-1 rounded ${currentLang === 'ar' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600'}`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-3 py-1 rounded ${currentLang === 'en' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600'}`}
                  >
                    English
                  </button>
                </div>
                
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
                    {t('startLearning')}
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