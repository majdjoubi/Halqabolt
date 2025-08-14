import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SearchPage from './components/SearchPage';
import DonationPage from './components/DonationPage';
import TeacherProfilePage from './components/TeacherProfilePage';
import Footer from './components/Footer';

type Page = 'home' | 'search' | 'teacherProfile' | 'donation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const navigateTo = (page: Page, teacherId: string | null = null) => {
    setCurrentPage(page);
    setSelectedTeacherId(teacherId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero navigateTo={navigateTo} />
            <Features />
          </>
        );
      case 'search':
        return <SearchPage onClose={() => navigateTo('home')} onSelectTeacher={(id) => navigateTo('teacherProfile', id)} />;
      case 'teacherProfile':
        return selectedTeacherId ? <TeacherProfilePage teacherId={selectedTeacherId} onClose={() => navigateTo('search')} /> : null;
      case 'donation':
        return <DonationPage onClose={() => navigateTo('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;