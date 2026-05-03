// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
// This is the root component that handles routing, global state, and layout
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ThemeProvider } from './context/ThemeContext';

// ============================================================================
// COMPONENT IMPORTS
// ============================================================================
// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Mission from './components/MissionOptimized';
import Programs from './components/ProgramsSimple';
import Events from './components/EventsFixed';
import Team from './components/Team';
import Experts from './components/Experts';
import Survey from './components/Survey';
import Partners from './components/Partners';
import Community from './components/Community';

// Route Components
import EventsPage from './components/EventsPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';

// UI Components
import CustomCursor from './components/CustomCursor';
import SystemStatus from './components/SystemStatus';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

// ============================================================================
// HOME PAGE COMPONENT
// ============================================================================
// Combines all main sections for the home page
const Home = () => (
  <>
    <Hero />
    <section id="about"><AboutUs /></section>
    <section id="mission"><Mission /></section>
    <section id="programs"><Programs /></section>
    <section id="events"><Events /></section>
    <section id="team"><Team /></section>
    <section id="experts"><Experts /></section>
    <section id="survey"><Survey /></section>
    <Partners />
    <section id="community"><Community /></section>
  </>
);

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
function App() {
  // State for loading screen
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // ============================================================================
  // SMOOTH SCROLLING SETUP
  // ============================================================================
  // Initialize Lenis for smooth scrolling animations
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop for smooth scrolling
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // ============================================================================
  // RENDER APPLICATION
  // ============================================================================
  return (
    <ThemeProvider>
      {/* Preloader - shows while loading */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Application */}
      {!isLoading && (
        <div 
          className="min-h-screen font-sans flex flex-col transition-colors duration-300" 
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            color: 'var(--text-primary)' 
          }}
        >
          {/* UI Elements */}
          <ScrollProgress />
          <CustomCursor />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Home Page Route */}
                <Route 
                  path="/" 
                  element={<PageTransition><Home /></PageTransition>} 
                />
                
                {/* Event Page Route */}
                <Route 
                  path="/events" 
                  element={<PageTransition><EventsPage /></PageTransition>} 
                />
                
                {/* Legal Pages */}
                <Route 
                  path="/privacy" 
                  element={<PageTransition><PrivacyPolicy /></PageTransition>} 
                />
                <Route 
                  path="/terms" 
                  element={<PageTransition><TermsOfService /></PageTransition>} 
                />
                
                {/* Contact Page */}
                <Route 
                  path="/contact" 
                  element={<PageTransition><Contact /></PageTransition>} 
                />
              </Routes>
            </AnimatePresence>
          </main>
          
          {/* Footer and UI Elements */}
          <Footer />
          <SystemStatus />
          <BackToTop />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
