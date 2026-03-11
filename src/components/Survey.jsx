import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ClipboardList, ArrowUpRight, Radio } from 'lucide-react';

const Survey = () => {
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
        <section id="survey" className="py-32 bg-[#020202] relative border-t border-white/[0.02]">
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
                    }}
                    className="relative bg-[#050505] rounded-[2.5rem] p-1 border border-white/5 shadow-[0_0_60px_rgba(255,255,255,0.02)] overflow-hidden group cursor-default"
                >
                    {/* Animated conic background for border glow effect */}
                    <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#fff_360deg)] animate-[spin_4s_linear_infinite] opacity-20"></div>

                    <div className="bg-[#0A0A0A] rounded-[2.4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden z-10 h-full">

                        {/* Ambient Lighting & Pulsar */}
                        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#6d28d9]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

                        {/* Survey Pulsar Visual */}
                        <div className="absolute top-10 right-10 scale-150 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                            <div className="relative">
                                <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
                                <div className="absolute inset-0 w-4 h-4 rounded-full border border-purple-500 animate-ping"></div>
                                <div className="absolute inset-[-20px] w-14 h-14 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            </div>
                        </div>

                        <div
                            style={{ transform: "translateZ(50px)" }}
                            className="relative z-10 max-w-2xl text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold uppercase tracking-widest mb-8">
                                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                                <span className="text-emerald-400/80">Live Research Initiative</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
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
