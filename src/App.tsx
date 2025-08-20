import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';
import DonationPage from './components/DonationPage';
import TeacherProfilePage from './components/TeacherProfilePage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import SubscriptionPlans from './components/SubscriptionPlans';
import AuthModal from './components/AuthModal';
import ConnectionStatus from './components/ConnectionStatus';
import { isSupabaseConfigured } from './lib/supabase';
import './lib/i18n'; // Initialize i18n

type Page = 'home' | 'search' | 'teacherProfile' | 'donation' | 'studentDashboard' | 'teacherDashboard' | 'pricing';

function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Set document direction based on language
  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Hide loading screen when app is ready
  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }
  }, []);

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
    // Navigate to appropriate dashboard after successful auth
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
      case 'pricing':
        return <SubscriptionPlans />;
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
    <div className="min-h-screen">
      {/* Connection Status - only show if Supabase is not configured */}
      {!isSupabaseConfigured() && <ConnectionStatus />}
      
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
        data-view-pricing 
        onClick={() => navigateTo('pricing')} 
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