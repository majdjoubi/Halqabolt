import React, { useState } from 'react';
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
  const { user, isAuthenticated } = useAuth();

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
    if (userRole === 'student') {
      navigateTo('studentDashboard');
    } else if (userRole === 'teacher') {
      navigateTo('teacherDashboard');
    }
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