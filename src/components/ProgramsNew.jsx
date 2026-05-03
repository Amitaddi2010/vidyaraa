import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, BookOpen, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Programs = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % programs.length);
    };

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
    };

    const handleDragEnd = (event, info) => {
        const dragThreshold = 30;
        const velocityThreshold = 500;
        
        // Check both offset and velocity for better swipe detection
        if (info.offset.x > dragThreshold || info.velocity.x > velocityThreshold) {
            prevCard();
        } else if (info.offset.x < -dragThreshold || info.velocity.x < -velocityThreshold) {
            nextCard();
        }
    };

    // Touch event handlers for mobile swipe
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        
        if (isLeftSwipe) {
            nextCard();
        } else if (isRightSwipe) {
            prevCard();
        }
    };

    const programs = [
        {
            title: "Internships",
            description: "An intensive 6-month internship program for top students and professionals in J&K.",
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
            description: "Partnering with universities to build specialized AI models for J&K.",
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
                            Structuring J&K's <span className="text-gradient">AI Future</span>
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed" 
                           style={{ color: 'var(--text-secondary)' }}>
                            We are building more than just models. We are creating a permanent footprint for structured research, talent nurturing, and industrial growth in the region.
                        </p>

                        <div className="flex gap-4 pt-2">
                            <button onClick={prevCard} 
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <button onClick={nextCard} 
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: 3D Stack with swipe */}
                    <div className="lg:col-span-3 h-[350px] sm:h-[400px] md:h-[500px] relative perspective-1000 flex items-center justify-center">
                        <div 
                            className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] aspect-[4/3]"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {programs.map((prog, idx) => {
                                const isCenter = idx === activeIndex;
                                const offset = idx - activeIndex;
                                
                                // Calculate 3D positioning
                                const x = offset * 40;
                                const z = Math.abs(offset) * -100;
                                const rotateY = offset * 15;
                                const scale = 1 - Math.abs(offset) * 0.1;
                                const opacity = 1 - Math.abs(offset) * 0.3;

                                return (
                                    <motion.div
                                        key={idx}
                                        drag="x"
                                        dragElastic={0.3}
                                        dragPropagation={false}
                                        dragMomentum={false}
                                        onDragEnd={handleDragEnd}
                                        onTap={() => setActiveIndex(idx)}
                                        style={{
                                            zIndex: programs.length - Math.abs(offset),
                                            transformStyle: "preserve-3d",
                                            backgroundColor: isCenter ? 'var(--card-bg)' : 'var(--bg-secondary)', 
                                            borderColor: 'var(--border-color)'
                                        }}
                                        animate={{
                                            x: `${x}%`,
                                            z: z,
                                            rotateY: rotateY,
                                            scale: scale,
                                            opacity: opacity,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className={`absolute inset-0 cursor-pointer rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 backdrop-blur-xl border flex flex-col justify-between group overflow-hidden`}
                                    >
                                        {/* Background Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${prog.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                        <div className="relative z-10">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 sm:mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform"
                                                 style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                                                {prog.icon}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-4 tracking-tighter" 
                                                style={{ color: 'var(--text-primary)' }}>
                                                {prog.title}
                                            </h3>
                                            <p className={`text-sm sm:text-base md:text-lg leading-relaxed transition-colors duration-500 mb-3 sm:mb-6 ${isCenter ? 'opacity-100' : 'opacity-50'}`}
                                               style={{ color: 'var(--text-muted)' }}>
                                                {prog.description}
                                            </p>

                                            {/* Highlights List */}
                                            <div className={`space-y-1 sm:space-y-2 md:space-y-3 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-20'}`}>
                                                {prog.highlights.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full"
                                                             style={{ backgroundColor: 'var(--text-muted)' }}></div>
                                                        <span className="text-xs sm:text-sm font-medium transition-colors" 
                                                              style={{ color: 'var(--text-muted)' }}>
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex items-center justify-between">
                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]" 
                                                  style={{ color: 'var(--text-muted)' }}>
                                                Initiative {idx + 1}
                                            </span>
                                            {isCenter && (
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programs;
