import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Github, Instagram, Linkedin, Mail, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#020202] py-32 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* The Monolith: Centered & Wide */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#050505]/40 backdrop-blur-2xl rounded-[3.5rem] border border-white/5 p-12 md:p-24 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                >
                    {/* Neural Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Brand Header */}
                        <Link to="/" className="flex items-center gap-5 mb-12 group">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700 group-hover:scale-105 group-hover:rotate-6">
                                <BrainCircuit className="w-8 h-8" />
                            </div>
                            <span className="text-4xl font-black tracking-tighter text-white">Vidyaraa</span>
                        </Link>

                        <p className="text-slate-400 text-xl leading-relaxed mb-16 max-w-2xl text-center font-medium">
                            Architecting the future of Artificial Intelligence in Jammu & Kashmir. <br className="hidden md:block" />
                            Join the movement to build a self-sustaining innovation hub.
                        </p>

                        {/* Navigation Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mb-20 w-full pt-16 border-t border-white/5">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Ecosystem</h4>
                                <ul className="space-y-5">
                                    {['Mission', 'Programs', 'Events', 'Team'].map((item) => (
                                        <li key={item}>
                                            <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group/link">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 scale-0 group-hover/link:scale-100 transition-transform"></span>
                                                <span className="text-sm font-bold tracking-wide">{item}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8">Resources</h4>
                                <ul className="space-y-5">
                                    {['Contact', 'Privacy', 'Terms'].map((item) => (
                                        <li key={item}>
                                            <Link to={`/${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group/link">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 scale-0 group-hover/link:scale-100 transition-transform"></span>
                                                <span className="text-sm font-bold tracking-wide">{item}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-span-2 flex flex-col md:items-end">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 md:text-right">Join the Network</h4>
                                <div className="flex gap-4 mb-8">
                                    {[
                                        { icon: <Instagram />, label: "Instagram", href: "https://www.instagram.com/vidyaraa_ai/" },
                                        { icon: <Github />, label: "GitHub", href: "https://github.com/Vidyaraa" },
                                        { icon: <Linkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/vidyaraaai/" }
                                    ].map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -8, scale: 1.1 }}
                                            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 shadow-lg"
                                        >
                                            {React.cloneElement(social.icon, { size: 22 })}
                                        </motion.a>
                                    ))}
                                </div>
                                <a href="#survey" className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    Start Survey
                                    <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div className="w-full pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <span className="text-xs font-black text-slate-500 tracking-[0.2em] uppercase">&copy; {new Date().getFullYear()} Vidyaraa AI</span>
                                <div className="hidden md:block w-px h-4 bg-white/10"></div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <Globe size={14} className="text-purple-500" />
                                    <span className="tracking-wide">JAMMU & KASHMIR, INDIA</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/5 shadow-inner">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">System Core</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                                <span className="text-[10px] font-black text-white tracking-widest uppercase">v2.5.0 STABLE</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
