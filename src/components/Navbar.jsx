import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        x.set(distanceX * 0.4);
        y.set(distanceY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hash link navigation with scroll
    const scrollToSection = (e, href) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.pathname !== '/') {
            navigate('/' + href);
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Mission', href: '#mission' },
        { name: 'Programs', href: '#programs' },
        { name: 'Events', href: '#events' },
        { name: 'Team', href: '#team' },
        { name: 'Experts', href: '#experts' },
        { name: 'Community', href: '#community' },
        { name: 'Contact', href: '/contact', isExternal: true },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-auto"
        >
            <div className={`flex items-center gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 py-3 rounded-full border backdrop-blur-xl transition-all duration-500 ${isScrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : ''}`}
                 style={{ 
                     background: theme === 'light' 
                         ? 'rgba(255, 255, 255, 0.7)'
                         : 'rgba(10, 10, 10, 0.7)',
                     borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(139, 92, 246, 0.4)'
                 }}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-500 overflow-hidden"
                         style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                        {/* Vidyaraa Logo - Different for light/dark theme */}
                        <img 
                            src={theme === 'light' ? "/VidyaraaLogo-light.PNG" : "/VidyaraaLogo-dark.PNG"} 
                            alt="Vidyaraa" 
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                    <span className="text-sm font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>Vidyaraa</span>
                </Link>

                <div className="h-4 w-[1px] hidden lg:block" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.3)' }}></div>

                {/* Desktop Nav Links - Hidden on mobile and tablet, visible on lg+ */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        link.isExternal ? (
                            <Magnetic key={link.name}>
                                <Link
                                    to={link.href}
                                    className="text-[11px] font-bold uppercase tracking-widest transition-colors py-1 relative group/link"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover/link:w-full" style={{ backgroundColor: theme === 'light' ? '#f97316' : '#a78bfa' }}></span>
                                </Link>
                            </Magnetic>
                        ) : (
                            <Magnetic key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-[11px] font-bold uppercase tracking-widest transition-colors py-1 relative group/link cursor-pointer"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover/link:w-full" style={{ backgroundColor: theme === 'light' ? '#f97316' : '#a78bfa' }}></span>
                                </a>
                            </Magnetic>
                        )
                    ))}
                </div>

                <div className="h-4 w-[1px] hidden lg:block" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.3)' }}></div>

                {/* Survey Button - Visible on md+ (tablet and desktop) */}
                <Magnetic>
                    <a href="#survey" className="hidden md:flex items-center gap-2 group/survey shrink-0">
                        <span className="text-[11px] font-black uppercase tracking-widest transition-colors hidden sm:inline" style={{ color: theme === 'light' ? '#c2410c' : '#c4b5fd' }}>Survey</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
                             style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(139, 92, 246, 0.2)' }}>
                            <ChevronRight className="w-4 h-4" style={{ color: theme === 'light' ? '#f97316' : '#a78bfa' }} />
                        </div>
                    </a>
                </Magnetic>

                <div className="h-4 w-[1px] hidden md:block" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.3)' }}></div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0"
                    style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(139, 92, 246, 0.15)' }}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                    {theme === 'light' ? (
                        <Moon className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                    ) : (
                        <Sun className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                    )}
                </button>

                {/* Mobile Toggle - Visible on mobile and tablet (lg:hidden) */}
                <button className="lg:hidden transition-colors shrink-0" style={{ color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile/Tablet Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-0 w-full border-b overflow-hidden rounded-b-3xl mt-2 z-[100] backdrop-blur-xl"
                        style={{ 
                            background: theme === 'light' 
                                ? 'rgba(255, 255, 255, 0.85)'
                                : 'rgba(10, 10, 10, 0.85)',
                            borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(139, 92, 246, 0.4)'
                        }}
                    >
                        <div className="flex flex-col px-6 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.isExternal ? (
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg font-medium transition-colors block py-2"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            onTouchStart={(e) => {
                                                e.preventDefault();
                                                scrollToSection(e, link.href);
                                            }}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className="text-lg font-medium transition-colors block py-2"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </div>
                            ))}
                            <div className="pt-2">
                                <a
                                    href="#survey"
                                    onTouchStart={(e) => {
                                        e.preventDefault();
                                        scrollToSection(e, '#survey');
                                    }}
                                    onClick={(e) => scrollToSection(e, '#survey')}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-transform active:scale-[0.98]"
                                    style={{ 
                                        backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6',
                                        color: '#ffffff'
                                    }}
                                >
                                    Take the AI Ecosystem Survey
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Mobile Theme Toggle */}
                            <div className="pt-4 border-t" style={{ borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(139, 92, 246, 0.3)' }}>
                                <button
                                    onClick={() => {
                                        toggleTheme();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all"
                                    style={{ 
                                        borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.4)',
                                        color: theme === 'light' ? '#c2410c' : '#c4b5fd',
                                        backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                                    }}
                                >
                                    {theme === 'light' ? (
                                        <>
                                            <Moon className="w-5 h-5" />
                                            <span>Switch to Dark Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sun className="w-5 h-5" />
                                            <span>Switch to Light Mode</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
