import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ClipboardList, ArrowUpRight, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Survey = () => {
    const { theme } = useTheme();
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX);
    const mouseYSpring = useSpring(mouseY);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = x / width - 0.5;
        const yPct = y / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section id="survey" className="py-16 md:py-24 lg:py-32 relative border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-color)',
                        boxShadow: '0 0 60px rgba(0,0,0,0.02)'
                    }}
                    className="relative rounded-[2.5rem] p-1 border overflow-hidden group cursor-default"
                >
                    {/* Animated conic background for border glow effect */}
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#fff_360deg)] animate-[spin_4s_linear_infinite] opacity-20"></div>

                    <div className="rounded-[2.4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden z-10 h-full"
                         style={{ backgroundColor: 'var(--card-bg)' }}>

                        {/* Ambient Lighting & Pulsar - Orange for light theme */}
                        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"
                             style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(109, 40, 217, 0.1)' }}></div>

                        {/* Survey Pulsar Visual */}
                        <div className="absolute top-10 right-10 scale-150 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                            <div className="relative">
                                <div className="w-4 h-4 rounded-full animate-pulse"
                                     style={{ backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6' }}></div>
                                <div className="absolute inset-0 w-4 h-4 rounded-full border animate-ping"
                                     style={{ borderColor: theme === 'light' ? '#f97316' : '#8b5cf6' }}></div>
                                <div className="absolute inset-[-20px] w-14 h-14 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            </div>
                        </div>

                        <div
                            style={{ transform: "translateZ(50px)" }}
                            className="relative z-10 max-w-2xl text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-8"
                                 style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                                <span className="text-emerald-400/80">Live Research Initiative</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                Take the AI Ecosystem <br className="hidden md:block" /> Research Survey
                            </h2>
                            <p className="text-xl text-[#888888] leading-relaxed">
                                Are you a student, researcher, or educator in J&K? Fill out our comprehensive survey to help us understand the current AI landscape and shape future programs.
                            </p>
                        </div>

                        <div
                            style={{ transform: "translateZ(80px)" }}
                            className="relative z-10 shrink-0"
                        >
                            <motion.a
                                href="https://forms.cloud.microsoft/r/sfWgaqT5A7"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow"
                            >
                                Start Survey Now
                                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover/btn:bg-black/20 transition-colors">
                                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </div>
                            </motion.a>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Survey;
