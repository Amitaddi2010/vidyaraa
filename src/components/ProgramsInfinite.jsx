import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, BookOpen, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Programs = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    const programs = [
        {
            title: "Internships",
            description: "An intensive 6-month internship program for top students and professionals in India.",
            highlights: ["Industry Mentorship", "Hands-on Projects", "Career Support"],
            icon: <Users className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />,
            color: theme === 'light' ? "from-orange-500/10 to-transparent" : "from-purple-500/10 to-transparent",
        },
        {
            title: "AI Hackathons",
            description: "State-wide competitions challenging developers to solve regional problems.",
            highlights: ["Exciting Prizes", "Expert Judging", "Networking"],
            icon: <Code className="w-8 h-8" style={{ color: 'var(--accent-secondary)' }} />,
            color: theme === 'light' ? "from-orange-400/10 to-transparent" : "from-indigo-500/10 to-transparent",
        },
        {
            title: "Research Collabs",
            description: "Partnering with universities to build specialized AI models for India.",
            highlights: ["Open Source", "Paper Publications", "Regional Focus"],
            icon: <Cpu className="w-8 h-8" style={{ color: theme === 'light' ? '#fdba74' : '#60a5fa' }} />,
            color: theme === 'light' ? "from-orange-300/10 to-transparent" : "from-blue-500/10 to-transparent",
        },
        {
            title: "Workshops & Training",
            description: "From basics to advanced levels on local campuses across the region.",
            highlights: ["Deep Learning", "NLP / LLMs", "MLOps Patterns"],
            icon: <BookOpen className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />,
            color: theme === 'light' ? "from-orange-500/10 to-transparent" : "from-purple-500/10 to-transparent",
        }
    ];

    // Create infinite array by duplicating programs
    const infinitePrograms = [...programs, ...programs];

    const nextCard = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % programs.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const prevCard = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
        setTimeout(() => setIsAnimating(false), 300);
    };

    // Touch event handlers for mobile swipe
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        
        const handleTouchMove = (e) => {
            if (!startX || !startY) return;
            const touch = e.touches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Prevent vertical scrolling when swiping horizontally
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        };
        
        const handleTouchEnd = (e) => {
            if (!startX || !startY) return;
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextCard(); // Swipe left (next)
                } else {
                    prevCard(); // Swipe right (previous)
                }
            }
            
            // Clean up event listeners
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleDragEnd = (event, info) => {
        const dragThreshold = 50;
        const velocityThreshold = 300;
        
        if (info.offset.x > dragThreshold || info.velocity.x > velocityThreshold) {
            prevCard();
        } else if (info.offset.x < -dragThreshold || info.velocity.x < -velocityThreshold) {
            nextCard();
        }
    };

    return (
        <section id="programs" className="py-12 md:py-16 lg:py-20 relative border-t overflow-hidden" 
                 style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
                     style={{ background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[450px]">
                    {/* Left side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em]"
                             style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                            Core Initiatives
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.1]" 
                            style={{ color: 'var(--text-primary)' }}>
                            Structuring India's <span className="text-gradient">AI Future</span>
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed" 
                           style={{ color: 'var(--text-secondary)' }}>
                            We are building more than just models. We are creating a permanent footprint for structured research, talent nurturing, and industrial growth in the region.
                        </p>

                        <div className="flex gap-4 pt-2">
                            <button 
                                onClick={prevCard}
                                disabled={isAnimating}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <button 
                                onClick={nextCard}
                                disabled={isAnimating}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: Infinite Swiper */}
                    <div className="lg:col-span-3 h-[350px] sm:h-[400px] md:h-[500px] relative perspective-1000 flex items-center justify-center overflow-hidden">
                        <div 
                            ref={containerRef}
                            className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] aspect-[4/3]"
                            onTouchStart={handleTouchStart}
                        >
                            <AnimatePresence mode="wait">
                                {infinitePrograms.map((prog, idx) => {
                                    // Only render the active card and adjacent cards for smooth infinite effect
                                    const displayIndex = idx % programs.length;
                                    const isActive = displayIndex === activeIndex;
                                    const offset = displayIndex - activeIndex;
                                    
                                    // Only show cards that are close to the active position
                                    if (Math.abs(offset) > 2) return null;
                                    
                                    const x = offset * 100;
                                    const z = Math.abs(offset) * -150;
                                    const rotateY = offset * 25;
                                    const scale = 1 - Math.abs(offset) * 0.15;
                                    const opacity = Math.max(0, 1 - Math.abs(offset) * 0.4);

                                    return (
                                        <motion.div
                                            key={`${displayIndex}-${idx}`}
                                            drag="x"
                                            dragElastic={0.4}
                                            dragPropagation={false}
                                            dragMomentum={false}
                                            onDragEnd={handleDragEnd}
                                            onTap={() => !isAnimating && setActiveIndex(displayIndex)}
                                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                                            animate={{
                                                x: `${x}%`,
                                                z: z,
                                                rotateY: rotateY,
                                                scale: scale,
                                                opacity: opacity,
                                            }}
                                            exit={{ opacity: 0, x: -100, scale: 0.8 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 400, 
                                                damping: 30,
                                                mass: 0.8
                                            }}
                                            style={{
                                                zIndex: infinitePrograms.length - Math.abs(offset),
                                                transformStyle: "preserve-3d",
                                                backgroundColor: isActive ? 'var(--card-bg)' : 'var(--bg-secondary)', 
                                                borderColor: 'var(--border-color)'
                                            }}
                                            className={`absolute inset-0 cursor-pointer rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 backdrop-blur-xl border flex flex-col justify-between group overflow-hidden`}
                                        >
                                            {/* Background Glow */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${prog.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                            <div className="relative z-10 flex-1 flex flex-col">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-2xl group-hover:scale-110 transition-transform flex-shrink-0"
                                                     style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                                                    {prog.icon}
                                                </div>
                                                
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 tracking-tighter line-clamp-2" 
                                                    style={{ color: 'var(--text-primary)' }}>
                                                    {prog.title}
                                                </h3>
                                                
                                                <p className={`text-xs sm:text-sm md:text-base leading-relaxed transition-colors duration-500 mb-3 sm:mb-4 line-clamp-3 ${isActive ? 'opacity-100' : 'opacity-70'}`}
                                                   style={{ color: 'var(--text-muted)' }}>
                                                    {prog.description}
                                                </p>

                                                {/* Highlights List */}
                                                <div className={`space-y-1 sm:space-y-2 transition-opacity duration-500 flex-1 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                                                    {prog.highlights.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 sm:gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                 style={{ backgroundColor: 'var(--text-muted)' }}></div>
                                                            <span className="text-xs sm:text-sm font-medium transition-colors line-clamp-1" 
                                                                  style={{ color: 'var(--text-muted)' }}>
                                                                {item}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4">
                                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]" 
                                                      style={{ color: 'var(--text-muted)' }}>
                                                    Initiative {displayIndex + 1}
                                                </span>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-center gap-2 font-bold text-xs sm:text-sm"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        Learn More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programs;
