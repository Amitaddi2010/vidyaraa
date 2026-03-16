import React from 'react';
import { motion } from 'framer-motion';
import { User, Globe, GraduationCap, Building2 } from 'lucide-react';

const Experts = () => {
    const nationalExperts = [
        {
            name: "Prof. Vinod Sharma",
            affiliation: "Department of Computer Science & IT, University of Jammu",
            expertise: ["Machine Learning", "Data Mining", "Educational Technology", "AI Education"],
            image: "/experts/Prof. Vinod Sharma.jpg",
            portfolio: "https://vinodsharma.netlify.app/"
        },
        {
            name: "Dr. Neeraj Kumar",
            affiliation: "Dept of CS & IT, Bhaderwah Campus, University of Jammu",
            expertise: ["Deep Learning", "Neural Networks", "Pattern Recognition", "Machine Learning", "Research"],
            image: "/experts/Neeraj Kumar.jpg",
            portfolio: "https://admin.jammuuniversity.ac.in/JUProfiles/profilepage.aspx?id=135"
        }
       
    ];

    const internationalExperts = [
        {
            name: "Dr. Sameer Ranjan",
            affiliation: "PhD – Stanford University, USA | CTO & Director (Data Science) – Catenate",
            expertise: ["Generative AI", "Data Science", "AI Strategy", "Startup Mentorship", "Technology Leadership"],
            image: "/experts/sameer.jpg",
            portfolio: "https://www.linkedin.com/in/sameerranjan009/"
        },
        {
            name: "Dr. Ajay Sharma",
            affiliation: "Postdoctoral Fellow, Johns Hopkins University, USA",
            expertise: ["Computer Vision", "Medical Imaging", "MRI Analysis", "Deep Learning", "AI in Healthcare"],
            image: "/experts/ajay.jpg",
            portfolio: "https://ajaychem12.github.io/sharma-lab-website/team.html"
        }
    ];

    return (
        <section id="experts" className="py-32 bg-[#020202] border-t border-white/[0.02] relative overflow-hidden">

            {/* Background gradients */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#6d28d9]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#4338ca]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Main Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#a1a1aa] text-xs font-bold tracking-widest uppercase mb-6 inline-block">
                        Advisors
                    </span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight"
                    >
                        Experts On Board
                    </motion.h2>
                    <p className="text-[#888888] text-lg max-w-3xl mx-auto leading-relaxed">
                        World-renowned AI researchers and industry leaders supporting Vidyaraa's mission.
                    </p>
                </motion.div>

                {/* National Experts Block */}
                <div className="mb-32">
                    {/* Subheader */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-16"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-6">
                            <GraduationCap className="w-8 h-8 text-[#6d28d9]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">National Experts</h3>
                        <p className="text-[#777] max-w-2xl mx-auto">
                            Leading AI professionals from University of Jammu supporting Vidyaraa's educational mission and research initiatives.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#888]">
                            <div className="w-2 h-2 rounded-full bg-[#6d28d9] animate-pulse"></div>
                            <span>2 Core Advisors</span>
                        </div>
                    </motion.div>

                    {/* Render National Experts in a centered 2-column layout */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {nationalExperts.map((expert, idx) => (
                                <motion.a
                                    key={idx}
                                    href={expert.portfolio || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                                    className="bg-[#050505] border border-white/5 hover:border-white/15 rounded-3xl p-8 transition-all group shadow-[0_4px_20px_transparent] hover:shadow-[0_4px_40px_rgba(255,255,255,0.02)] flex flex-col h-full cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative group/avatar shrink-0">
                                            <div className="absolute -inset-2 bg-gradient-to-tr from-[#6d28d9]/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>
                                            <div className="relative w-16 h-16 rounded-2xl border-2 border-white/10 bg-[#111] flex items-center justify-center overflow-hidden group-hover/avatar:border-white/30 transition-all duration-500 transform group-hover/avatar:scale-105 group-hover/avatar:rotate-2 shadow-xl">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[#6d28d9]/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"></div>
                                                {expert.image ? (
                                                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover relative z-10" />
                                                ) : (
                                                    <User className="w-7 h-7 text-[#555] group-hover/avatar:text-white transition-colors relative z-10" />
                                                )}
                                                {/* Corner accents */}
                                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-md z-30"></div>
                                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 rounded-br-md z-30"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{expert.name}</h4>
                                        </div>
                                    </div>

                                    <p className="text-[#a78bfa] text-sm leading-relaxed flex gap-2 mb-6">
                                        <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>{expert.affiliation}</span>
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/[0.05]">
                                        <p className="text-[10px] font-bold text-[#555] uppercase tracking-widest mb-4">Expertise</p>
                                        <div className="flex flex-wrap gap-2">
                                            {expert.expertise.map((tag, tagIdx) => (
                                                <span key={tagIdx} className="px-3 py-1 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-[#a1a1aa] font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* International Experts Block */}
                <div>
                    {/* Subheader */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-16"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-6">
                            <Globe className="w-8 h-8 text-[#a78bfa]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">International Experts</h3>
                        <p className="text-[#777] max-w-2xl mx-auto">
                            World-renowned AI experts collaborating with Vidyaraa to bring cutting-edge knowledge and global perspectives.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {internationalExperts.map((expert, idx) => (
                            <motion.a
                                key={idx}
                                href={expert.portfolio || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-[#050505] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group cursor-pointer"
                            >
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="relative group/avatar shrink-0">
                                        <div className="absolute -inset-2 bg-gradient-to-tr from-[#6d28d9]/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative w-20 h-20 rounded-2xl border-2 border-white/10 bg-[#111] flex items-center justify-center overflow-hidden group-hover/avatar:border-white/30 transition-all duration-500 transform group-hover/avatar:scale-105 group-hover/avatar:rotate-3 shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#6d28d9]/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"></div>
                                            {expert.image ? (
                                                <img src={expert.image} alt={expert.name} className="w-full h-full object-cover relative z-10" />
                                            ) : (
                                                <User className="w-8 h-8 text-[#555] group-hover/avatar:text-white transition-colors relative z-10" />
                                            )}
                                            {/* Corner accents */}
                                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 rounded-tl-md z-30"></div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 rounded-br-md z-30"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-2">{expert.name}</h4>
                                        <p className="text-[#a78bfa] text-sm leading-relaxed flex gap-2">
                                            <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{expert.affiliation}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/[0.05]">
                                    <p className="text-xs font-bold text-[#555] uppercase tracking-widest mb-4">Expertise</p>
                                    <div className="flex flex-wrap gap-2">
                                        {expert.expertise.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="px-3 py-1 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-[#a1a1aa] font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experts;
