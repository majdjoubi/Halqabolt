import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  navigateTo: (page: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard', teacherId?: string | null) => void;
  currentPage: 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard';
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, onOpenAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;
  const isAuthenticated = false;

  const handleStartLearning = () => {
    onOpenAuth('signup');
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
              </nav>
            </div>
          )}
        </div>
      </header>      
    </>
  );
};

export default Header;