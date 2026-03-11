import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, BookOpen, Users, ChevronRight, ChevronLeft } from 'lucide-react';

const Card = ({ program, index, total, activeIndex, setActiveIndex }) => {
    const isCenter = index === activeIndex;
    const offset = index - activeIndex;

    // Calculate 3D positioning
    const x = offset * 40;
    const z = Math.abs(offset) * -100;
    const rotateY = offset * 15;
    const scale = 1 - Math.abs(offset) * 0.1;
    const opacity = 1 - Math.abs(offset) * 0.3;

    return (
        <motion.div
            style={{
                zIndex: total - Math.abs(offset),
                transformStyle: "preserve-3d",
            }}
            animate={{
                x: `${x}%`,
                z: z,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setActiveIndex(index)}
            className={`absolute inset-0 cursor-pointer rounded-[2.5rem] p-10 backdrop-blur-xl border border-white/10 flex flex-col justify-between group overflow-hidden ${isCenter ? 'bg-[#0A0A0A]/90 ring-1 ring-white/20' : 'bg-[#050505]/40'}`}
        >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#0F0F0F] border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                    {program.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">{program.title}</h3>
                <p className={`text-lg leading-relaxed transition-colors duration-500 mb-8 ${isCenter ? 'text-[#AAAAAA]' : 'text-[#555555]'}`}>
                    {program.description}
                </p>

                {/* Highlights List */}
                <div className={`space-y-3 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-20'}`}>
                    {program.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                            <span className="text-sm font-medium text-[#777777] group-hover:text-[#999999] transition-colors">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Initiative {index + 1}</span>
                {isCenter && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-white font-bold text-sm"
                    >
                        Learn More <ChevronRight className="w-4 h-4" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const Programs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const programs = [
        {
            title: "AI Fellowship",
            description: "An intensive 6-month fellowship for top students and professionals in J&K.",
            highlights: ["Industry Mentorship", "Hands-on Projects", "Career Support"],
            icon: <Users className="w-8 h-8 text-purple-400" />,
            color: "from-purple-500/10 to-transparent",
        },
        {
            title: "AI Hackathons",
            description: "State-wide competitions challenging developers to solve regional problems.",
            highlights: ["Exciting Prizes", "Expert Judging", "Networking"],
            icon: <Code className="w-8 h-8 text-indigo-400" />,
            color: "from-indigo-500/10 to-transparent",
        },
        {
            title: "Research Collabs",
            description: "Partnering with universities to build specialized AI models for J&K.",
            highlights: ["Open Source", "Paper Publications", "Regional Focus"],
            icon: <Cpu className="w-8 h-8 text-blue-400" />,
            color: "from-blue-500/10 to-transparent",
        },
        {
            title: "Workshops & Training",
            description: "From basics to advanced levels on local campuses across the region.",
            highlights: ["Deep Learning", "NLP / LLMs", "MLOps Patterns"],
            icon: <BookOpen className="w-8 h-8 text-purple-400" />,
            color: "from-purple-500/10 to-transparent",
        }
    ];

    const nextCard = () => setActiveIndex((prev) => (prev + 1) % programs.length);
    const prevCard = () => setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);

    return (
        <section id="programs" className="py-32 bg-[#020202] relative border-t border-white/[0.02] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-5 gap-16 items-center">

                    {/* Left side: Header info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Core Initiatives
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                            Structuring J&K's <span className="text-gradient">AI Future</span>
                        </h2>
                        <p className="text-[#888888] text-lg leading-relaxed">
                            We are building more than just models. We are creating a permanent footprint for structured research, talent nurturing, and industrial growth in the region.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button onClick={prevCard} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextCard} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right side: 3D Stack */}
                    <div className="lg:col-span-3 h-[500px] relative perspective-1000 flex items-center justify-center">
                        <div className="relative w-full max-w-[450px] aspect-[4/3]">
                            {programs.map((prog, idx) => (
                                <Card
                                    key={idx}
                                    program={prog}
                                    index={idx}
                                    total={programs.length}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Programs;
