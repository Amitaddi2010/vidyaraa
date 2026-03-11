import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, User } from 'lucide-react';
import TextReveal from './TextReveal';
import GradientMesh from './GradientMesh';

const Team = () => {
    const teamMembers = [
        {
            name: "Rahul Sharma",
            role: "CEO",
            bio: "Leading the strategic vision and growth of the Vidyaraa AI Initiative across J&K.",
            image: "/team/rahul.jpg"
        },
        {
            name: "Amit Raj Saraswat",
            role: "President",
            bio: "Driving academic partnerships and fostering a culture of continuous AI innovation.",
            image: "/team/amit.jpg"
        },
        {
            name: "Abhay Khajuria",
            role: "COO",
            bio: "Overseeing operations, execution, and scaling the real-world impact of our programs.",
            image: "/team/abhay.jpg"
        }
    ];

    return (
        <section id="team" className="py-32 bg-[#020202] border-t border-white/[0.02] relative overflow-hidden">
            {/* Background glow for depth */}
            <GradientMesh variant="subtle" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase mb-6 inline-block">
                        Leadership
                    </span>
                    <TextReveal className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#f5f5f5] mb-6 tracking-tight justify-center" delay={0.1}>Meet the Team</TextReveal>
                    <p className="text-[#888888] text-lg max-w-2xl mx-auto leading-relaxed">
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
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>

                            <div className="relative bg-[#0a0a0a] rounded-[2rem] p-8 border border-white/5 h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 overflow-hidden">

                                {/* Decorative background element for the card */}
                                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent"></div>

                                {/* Premium Geometric Profile Box */}
                                <div className="relative group/avatar mb-8 z-10">
                                    <div className="absolute -inset-2 bg-gradient-to-tr from-[#6d28d9]/30 to-indigo-500/30 rounded-3xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative w-32 h-32 rounded-3xl border-2 border-white/10 bg-[#111] overflow-hidden group-hover/avatar:border-white/30 transition-all duration-500 transform group-hover/avatar:scale-105 group-hover/avatar:rotate-3 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#6d28d9]/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"></div>
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-10" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#111]">
                                                <User className="w-12 h-12 text-[#555] group-hover/avatar:text-white transition-colors relative z-10" />
                                            </div>
                                        )}
                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-lg z-30"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-lg z-30"></div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-[#a78bfa] text-sm font-bold tracking-widest uppercase mb-6">
                                        {member.role}
                                    </p>
                                    <p className="text-[#777] text-sm leading-relaxed mb-8">
                                        {member.bio}
                                    </p>
                                </div>

                                {/* Social Links */}
                                <div className="mt-auto flex items-center justify-center gap-4 relative z-10">
                                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#777] hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#777] hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                        <Twitter className="w-4 h-4" />
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
