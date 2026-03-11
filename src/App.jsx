import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Team from './components/Team'
import Experts from './components/Experts'
import Mission from './components/Mission'
import Programs from './components/Programs'
import Events from './components/Events'
import Survey from './components/Survey'
import Partners from './components/Partners'
import Community from './components/Community'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import SystemStatus from './components/SystemStatus'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import BackToTop from './components/BackToTop'

const Home = () => (
  <>
    <Hero />
    <SectionDivider />
    <section id="about"><AboutUs /></section>
    <SectionDivider />
    <section id="mission"><Mission /></section>
    <SectionDivider />
    <section id="programs"><Programs /></section>
    <SectionDivider />
    <section id="events"><Events /></section>
    <SectionDivider />
    <section id="team"><Team /></section>
    <SectionDivider />
    <section id="experts"><Experts /></section>
    <SectionDivider />
    <section id="survey"><Survey /></section>
    <SectionDivider />
    <Partners />
    <SectionDivider />
    <section id="community"><Community /></section>
  </>
)

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="bg-[#020202] min-h-screen text-slate-200 font-sans selection:bg-purple-900/40 flex flex-col cursor-none">
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="flex-grow pt-20">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <SystemStatus />
          <BackToTop />
        </div>
      )}
    </>
  )
}

export default App;
