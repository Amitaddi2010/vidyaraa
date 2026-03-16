import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain, Handshake, Target, Microscope, Globe, BookOpen, Eye, MessageSquare, Bot, Settings, Stethoscope } from 'lucide-react';

const AboutUs = () => {
    const features = [
        { icon: <Rocket className="w-5 h-5 text-purple-400" />, title: "AI Education" },
        { icon: <Brain className="w-5 h-5 text-blue-400" />, title: "Research Collaboration" },
        { icon: <Handshake className="w-5 h-5 text-green-400" />, title: "Industry Partnerships" },
        { icon: <Target className="w-5 h-5 text-red-400" />, title: "Career Development" },
        { icon: <Microscope className="w-5 h-5 text-yellow-400" />, title: "Innovation Hub" },
        { icon: <Globe className="w-5 h-5 text-cyan-400" />, title: "Regional Impact" }
    ];

    const domains = [
        { icon: <BookOpen className="w-6 h-6 text-purple-400" />, title: "Machine Learning" },
        { icon: <Eye className="w-6 h-6 text-blue-400" />, title: "Computer Vision" },
        { icon: <MessageSquare className="w-6 h-6 text-green-400" />, title: "Natural Language Processing" },
        { icon: <Bot className="w-6 h-6 text-red-400" />, title: "Generative AI" },
        { icon: <Settings className="w-6 h-6 text-yellow-400" />, title: "MLOps" },
        { icon: <Stethoscope className="w-6 h-6 text-cyan-400" />, title: "Healthcare AI" }
    ];

    return (
        <section id="about" className="py-32 bg-[#020202] relative overflow-hidden border-t border-white/[0.02]">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6d28d9]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4338ca]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                    {/* Left Column: Mission Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f5f5f5] mb-8 tracking-tight leading-[1.1]"
                        >
                            About Us
                        </motion.h2>
                        <div className="space-y-6 text-[#999999] text-lg leading-relaxed">
                            <p>
                                To establish Jammu & Kashmir as a recognized hub for Artificial Intelligence research, talent development, and innovation.
                            </p>
                            <p>
                                Despite having strong academic institutions and talented students, the region still faces gaps in AI infrastructure, mentorship, and industry exposure. Our goal is to bridge these gaps and create opportunities for the next generation of AI professionals.
                            </p>
                            <p>
                                We aim to build a platform where students, faculty, and innovators collaborate to solve real-world problems using AI.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Vision & Why Choose Us */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#050505] border border-white/5 rounded-3xl p-10 lg:p-12 shadow-[0_0_40px_rgba(255,255,255,0.02)] relative overflow-hidden"
                    >
                        {/* Decorative inner glow */}
                        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none"></div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]"
                        >
                            Structuring J&K's <span className="text-gradient">AI Future</span>
                        </motion.h2>
                        <h4 className="text-3xl font-bold text-[#f5f5f5] mb-6 tracking-tight">Our Vision & Mission</h4>
                        <p className="text-[#a1a1aa] text-lg leading-relaxed mb-10">
                            Advancing research, education, and talent in Artificial Intelligence to establish Jammu & Kashmir as a recognized AI hub.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                    <div className="w-8 h-8 flex items-center justify-center">{feat.icon}</div>
                                    <span className="text-sm font-semibold text-[#e2e8f0]">{feat.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Core Domains Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-16 border-t border-white/[0.05]"
                >
                    <p className="text-center text-xs font-bold text-[#555555] uppercase tracking-[0.2em] mb-10">
                        Our Core AI Domains
                    </p>

                    <div className="relative flex overflow-hidden group/marquee">
                        {/* Gradient Masks for smooth edges */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none"></div>

                        <div className="flex animate-infinite-scroll whitespace-nowrap gap-6 py-4">
                            {[...domains, ...domains].map((domain, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 px-8 py-5 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 hover:bg-[#111] transition-all cursor-default shrink-0"
                                >
                                    <div className="w-8 h-8 flex items-center justify-center">{domain.icon}</div>
                                    <span className="text-base font-bold tracking-wide text-white">{domain.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutUs;
