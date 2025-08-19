import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SearchPage from './components/SearchPage';
import DonationPage from './components/DonationPage';
import TeacherProfilePage from './components/TeacherProfilePage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

type Page = 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, isAuthenticated, initializing } = useAuth();

  // Hide loading screen when app is ready
  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }
  }, []);

  // Show loading while initializing auth
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل التطبيق...</p>
        </div>
      </div>
    );
  }
  const navigateTo = (page: Page, teacherId: string | null = null) => {
    setCurrentPage(page);
    setSelectedTeacherId(teacherId);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = (userRole: 'student' | 'teacher') => {
    closeAuthModal();
    // Stay on home page after successful auth to show the updated interface
    // User can navigate to dashboard using the new buttons
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Features />
          </>
        );
      case 'search':
        return (
          <SearchPage 
            onClose={() => navigateTo('home')} 
            onSelectTeacher={(id) => navigateTo('teacherProfile', id)} 
          />
        );
      case 'teacherProfile':
        return selectedTeacherId ? (
          <TeacherProfilePage 
            teacherId={selectedTeacherId} 
            onClose={() => navigateTo('search')} 
          />
        ) : null;
      case 'donation':
        return <DonationPage onClose={() => navigateTo('home')} />;
      case 'studentDashboard':
        return <StudentDashboard onClose={() => navigateTo('home')} />;
      case 'teacherDashboard':
        return <TeacherDashboard onClose={() => navigateTo('home')} />;
      default:
        return (
          <>
            <Hero />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <Header 
        navigateTo={navigateTo} 
        currentPage={currentPage}
        onOpenAuth={openAuthModal}
      />
      
      {/* Hidden buttons for Hero component to trigger navigation */}
      <button 
        data-start-learning 
        onClick={() => openAuthModal('signup')} 
        className="hidden"
      />
      <button 
        data-search-teachers 
        onClick={() => navigateTo('search')} 
        className="hidden"
      />
      <button 
        data-dashboard 
        onClick={() => navigateTo(user?.role === 'student' ? 'studentDashboard' : 'teacherDashboard')} 
        className="hidden"
      />
      
      {renderPage()}
      {currentPage === 'home' && <Footer />}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;