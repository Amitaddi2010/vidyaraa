import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, User } from 'lucide-react';
import TextReveal from './TextReveal';
import GradientMesh from './GradientMesh';
import { useTheme } from '../context/ThemeContext';

const Team = () => {
    const { theme } = useTheme();
    const teamMembers = [
        {
            name: "Rahul Sharma",
            role: "CEO",
            bio: "Leading the strategic vision and growth of the Vidyaraa AI Initiative across J&K.",
            image: "/team/rahul.jpg",
            social: {
                linkedin: "https://www.linkedin.com/in/rahul-sharma15/",
                instagram: "https://www.instagram.com/rahul._sharma_31/"
            }
        },
        {
            name: "Amit Raj Saraswat",
            role: "President",
            bio: "Driving academic partnerships and fostering a culture of continuous AI innovation.",
            image: "/team/amit.jpg",
            social: {
                linkedin: "https://www.linkedin.com/in/amitrajsaraswat/",
                instagram: "https://www.instagram.com/aamit.ai/"
            }
        },
        {
            name: "Abhay Khajuria",
            role: "COO",
            bio: "Overseeing operations, execution, and scaling the real-world impact of our programs.",
            image: "/team/abhay.jpg",
            social: {
                linkedin: "https://www.linkedin.com/in/abhay-khajuria-14772b1a1/",
                instagram: "https://www.instagram.com/abhay_khajuria/"
            }
        }
    ];

    return (
        <section id="team" className="py-16 md:py-24 lg:py-32 border-t relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            {/* Background glow for depth */}
            <GradientMesh variant="subtle" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <span className="px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-6 inline-block"
                          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-muted)' }}>
                        Leadership
                    </span>
                    <TextReveal className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight justify-center" style={{ color: 'var(--text-primary)' }} delay={0.1}>Meet the Team</TextReveal>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Meet the brilliant minds behind Vidyaraa, dedicated to innovation and excellence in establishing Jammu & Kashmir as a premier AI hub.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"
                                 style={{ background: theme === 'light' ? 'linear-gradient(to bottom, rgba(249, 115, 22, 0.2), transparent)' : 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }}></div>

                            <div className="relative rounded-[2rem] p-8 border h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
                                 style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>

                                {/* Decorative background element for the card */}
                                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent"></div>

                                {/* Premium Geometric Profile Box */}
                                <div className="relative group/avatar mb-8 z-10">
                                    <div className="absolute -inset-2 rounded-3xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"
                                         style={{ background: theme === 'light' ? 'linear-gradient(to top right, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.3))' : 'linear-gradient(to top right, rgba(109, 40, 217, 0.3), rgba(99, 102, 241, 0.3))' }}></div>
                                    <div className="relative w-32 h-32 rounded-3xl border-2 overflow-hidden transition-all duration-500 transform group-hover/avatar:scale-105 group-hover/avatar:rotate-3 shadow-2xl"
                                         style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                        <div className="absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"
                                             style={{ background: theme === 'light' ? 'linear-gradient(to top right, rgba(249, 115, 22, 0.2), transparent)' : 'linear-gradient(to top right, rgba(109, 40, 217, 0.2), transparent)' }}></div>
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-10" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                                <User className="w-12 h-12 transition-colors relative z-10" style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        )}
                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg z-30" style={{ borderColor: 'var(--border-color)' }}></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-lg z-30" style={{ borderColor: 'var(--border-color)' }}></div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                                    <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: theme === 'light' ? '#f97316' : '#c084fc' }}>{member.role}</p>
                                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                                        {member.bio}
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="mt-auto flex items-center justify-center gap-4 relative z-10">
                                    <a 
                                        href={member.social.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a 
                                        href={member.social.instagram} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Team;
