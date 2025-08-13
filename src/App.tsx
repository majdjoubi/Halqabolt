import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Teachers from './components/Teachers';
import RecordedLessons from './components/RecordedLessons';
import LessonTypes from './components/LessonTypes';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <Hero />
      <Features />
      <Teachers />
      <RecordedLessons />
      <LessonTypes />
      <Pricing />
      <Testimonials />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;