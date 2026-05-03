import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, BookOpen, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Programs = () => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);

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

    const nextCard = () => {
        setActiveIndex((prev) => (prev + 1) % programs.length);
    };

    const prevCard = () => {
        setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
    };

    const handleDragStart = (event) => {
        setDragStartX(event.clientX || event.touches[0].clientX);
    };

    const handleDragEnd = (event, info) => {
        const dragDistance = info.offset.x;
        const threshold = 50;
        
        if (Math.abs(dragDistance) > threshold) {
            if (dragDistance > 0) {
                prevCard();
            } else {
                nextCard();
            }
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
                            Structuring J&K's <span className="text-gradient">AI Future</span>
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed" 
                           style={{ color: 'var(--text-secondary)' }}>
                            We are building more than just models. We are creating a permanent footprint for structured research, talent nurturing, and industrial growth in the region.
                        </p>

                        <div className="flex gap-4 pt-2">
                            <button 
                                onClick={prevCard}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <button 
                                onClick={nextCard}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: Card Stack with background previews */}
                    <div className="lg:col-span-3 h-[350px] sm:h-[400px] md:h-[500px] relative perspective-1000 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] aspect-[4/3]">
                            {/* Render all cards in stack */}
                            {programs.map((prog, idx) => {
                                const offset = idx - activeIndex;
                                const isActive = idx === activeIndex;
                                
                                // Calculate positions for stacked effect
                                const x = offset * 30;
                                const scale = 1 - Math.abs(offset) * 0.15;
                                const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.4);
                                const zIndex = programs.length - Math.abs(offset);
                                
                                return (
                                    <motion.div
                                        key={idx}
                                        drag={isActive ? "x" : false}
                                        dragConstraints={{ left: -100, right: 100 }}
                                        dragElastic={0.2}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                        onTap={() => !isActive && setActiveIndex(idx)}
                                        animate={{
                                            x: `${x}%`,
                                            scale: scale,
                                            opacity: opacity,
                                            zIndex: zIndex
                                        }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 400, 
                                            damping: 25
                                        }}
                                        style={{
                                            backgroundColor: isActive ? 'var(--card-bg)' : 'var(--bg-secondary)', 
                                            borderColor: 'var(--border-color)',
                                            zIndex: zIndex
                                        }}
                                        className={`absolute inset-0 ${isActive ? 'cursor-pointer' : 'cursor-pointer'} rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 backdrop-blur-xl border flex flex-col justify-between group overflow-hidden`}
                                    >
                                        {/* Background Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${prog.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                        <div className="relative z-10 flex-1 flex flex-col">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-2xl group-hover:scale-110 transition-transform flex-shrink-0"
                                                 style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                                                {prog.icon}
                                            </div>
                                            
                                            <h3 className={`font-black mb-2 sm:mb-3 tracking-tighter transition-opacity ${
                                                isActive 
                                                    ? 'text-lg sm:text-xl md:text-2xl' 
                                                    : 'text-sm sm:text-base md:text-lg opacity-60'
                                            }`} 
                                                style={{ color: 'var(--text-primary)' }}>
                                                {prog.title}
                                            </h3>
                                            
                                            {isActive && (
                                                <>
                                                    <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4"
                                                       style={{ color: 'var(--text-muted)' }}>
                                                        {prog.description}
                                                    </p>

                                                    {/* Highlights List */}
                                                    <div className="space-y-1 sm:space-y-2 flex-1">
                                                        {prog.highlights.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-2 sm:gap-3">
                                                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                     style={{ backgroundColor: 'var(--text-muted)' }}></div>
                                                                <span className="text-xs sm:text-sm font-medium" 
                                                                      style={{ color: 'var(--text-muted)' }}>
                                                                    {item}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        
                                        {/* Swipe indicators - only on active card */}
                                        {isActive && (
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                                {programs.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                                                            i === activeIndex ? 'w-4' : 'opacity-30'
                                                        }`}
                                                        style={{ backgroundColor: 'var(--text-muted)' }}
                                                    />
                                                ))}
                                            </div>
                                        )}
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
