import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Teachers from './components/Teachers';
import LessonTypes from './components/LessonTypes';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <Hero />
      <Features />
      <Teachers />
      <LessonTypes />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;