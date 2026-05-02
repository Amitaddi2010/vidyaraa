import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Github, Instagram, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CommunityCard = ({ href, icon: Icon, title, description, buttonText, color }) => {
    const { theme } = useTheme();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="w-full sm:w-80 group relative"
        >
            <div
                style={{ transform: "translateZ(50px)", backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                className="border rounded-[2rem] p-8 h-full flex flex-col items-center text-center transition-colors shadow-2xl overflow-hidden"
            >
                {/* Background Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${color} opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-500`}></div>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255, 255, 255, 0.05)' }}>
                    <Icon className="w-8 h-8" style={{ color: theme === 'light' ? '#f97316' : '#ffffff' }} />
                </div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    {title}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
                </h3>
                <p className="text-sm leading-relaxed mb-6 font-medium transition-colors" style={{ color: 'var(--text-muted)' }}>
                    {description}
                </p>
                <div className="mt-auto px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255, 255, 255, 0.05)', borderColor: 'var(--border-color)', color: theme === 'light' ? '#f97316' : '#ffffff', borderWidth: '1px', borderStyle: 'solid' }}>
                    {buttonText || "Connect Now"}
                </div>
            </div>
        </motion.a>
    );
};

const Community = () => {
    const { theme } = useTheme();
    return (
        <section id="community" className="py-16 md:py-24 lg:py-32 relative overflow-hidden border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>

            {/* Abstract Background Elements - Orange for light theme */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full blur-[100px] opacity-50"
                     style={{ background: theme === 'light' ? 'linear-gradient(to bottom, rgba(249, 115, 22, 0.08), transparent)' : 'linear-gradient(to bottom, rgba(109, 40, 217, 0.05), transparent)' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px]"
                     style={{ background: theme === 'light' ? 'linear-gradient(to right, transparent, rgba(249, 115, 22, 0.3), transparent)' : 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                        Join the <span className="text-gradient">Local Network</span>
                    </h2>
                    <p className="text-xl mb-12 md:mb-20 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Whether you're a student, researcher, or developer, there's a place for you in the Vidyaraa ecosystem. Connect with peers, find mentors, and start shipping.
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-stretch justify-center gap-8 perspective-1000">
                    <CommunityCard
                        href="https://www.linkedin.com/in/vidyaraaai/"
                        target="_blank" 
                        icon={Linkedin}
                        title="LinkedIn"
                        color={theme === 'light' ? 'bg-orange-500' : 'bg-indigo-500'}
                        description="Real-time discussions, project collaboration, and community events."
                        buttonText="Connect"
                        theme={theme}
                    />
                    <CommunityCard
                        href="https://github.com/Vidyaraa"
                        target="_blank" 
                        icon={Github}
                        title="GitHub Org"
                        color={theme === 'light' ? 'bg-orange-400' : 'bg-white'}
                        description="Open source projects, research papers, and technical contributions."
                        buttonText="View Code"
                        theme={theme}
                    />
                    <CommunityCard
                        href="https://www.instagram.com/vidyaraa_ai/"
                        target="_blank" 
                        icon={Instagram}
                        title="Follow on Instagram"
                        color={theme === 'light' ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600' : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'}
                        description="Stay updated with the latest AI news and breakthroughs from J&K."
                        buttonText="Follow"
                        theme={theme}
                    />
                </div>
            </div>
        </section>
    );
};

export default Community;
