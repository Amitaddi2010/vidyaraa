import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, BrainCircuit, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <div className={`flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 backdrop-blur-2xl transition-all duration-500 ${isScrolled ? 'bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/20' : 'bg-white/5'}`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 border border-white/10 group-hover:border-white/40 transition-all duration-500">
                        <BrainCircuit className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-tighter text-white">Vidyaraa</span>
                </Link>

                <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        link.isExternal ? (
                            <Magnetic key={link.name}>
                                <Link
                                    to={link.href}
                                    className="text-[11px] font-bold uppercase tracking-widest text-[#888] hover:text-white transition-colors py-1 relative group/link"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                                </Link>
                            </Magnetic>
                        ) : (
                            <Magnetic key={link.name}>
                                <a
                                    href={location.pathname === '/' ? link.href : `/${link.href}`}
                                    className="text-[11px] font-bold uppercase tracking-widest text-[#888] hover:text-white transition-colors py-1 relative group/link"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                                </a>
                            </Magnetic>
                        )
                    ))}
                </div>

                <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

                {/* Survey Button */}
                <Magnetic>
                    <a href="#survey" className="hidden md:flex items-center gap-2 group/survey">
                        <span className="text-[11px] font-black uppercase tracking-widest text-white/60 group-hover/survey:text-white transition-colors">Survey</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/survey:bg-white group-hover/survey:text-black transition-all duration-500">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </a>
                </Magnetic>

                {/* Mobile Toggle */}
                <button className="md:hidden text-[#888888] hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-6 space-y-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {link.isExternal ? (
                                        <Link
                                            to={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-[#888888] hover:text-white text-lg font-medium transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={location.pathname === '/' ? link.href : `/${link.href}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-[#888888] hover:text-white text-lg font-medium transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                            <motion.a
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                href="#survey"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-bold transition-transform hover:scale-[1.02]"
                            >
                                Take the AI Ecosystem Survey
                                <ChevronRight className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
