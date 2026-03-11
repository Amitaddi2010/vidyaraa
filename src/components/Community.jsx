import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, Github, Twitter, ExternalLink } from 'lucide-react';

const CommunityCard = ({ href, icon: Icon, title, description, color }) => {
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
                style={{ transform: "translateZ(50px)" }}
                className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 h-full flex flex-col items-center text-center hover:border-white/20 transition-colors shadow-2xl overflow-hidden"
            >
                {/* Background Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${color} opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-500`}></div>

                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {title}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-[#666] text-sm leading-relaxed mb-6 font-medium group-hover:text-[#888] transition-colors">
                    {description}
                </p>
                <div className="mt-auto px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all">
                    Connect Now
                </div>
            </div>
        </motion.a>
    );
};

const Community = () => {
    return (
        <section id="community" className="py-32 bg-[#020202] relative overflow-hidden border-t border-white/[0.02]">

            {/* Abstract Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#6d28d9]/5 to-transparent rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 tracking-tighter">
                        Join the <span className="text-gradient">Local Network</span>
                    </h2>
                    <p className="text-xl text-[#888888] mb-20 max-w-2xl mx-auto leading-relaxed">
                        Whether you're a student, researcher, or developer, there's a place for you in the Vidyaraa ecosystem. Connect with peers, find mentors, and start shipping.
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-stretch justify-center gap-8 perspective-1000">
                    <CommunityCard
                        href="#"
                        icon={MessageSquare}
                        title="Discord Server"
                        color="bg-indigo-500"
                        description="Real-time discussions, project collaboration, and community events."
                    />
                    <CommunityCard
                        href="#"
                        icon={Github}
                        title="GitHub Org"
                        color="bg-white"
                        description="Open source projects, research papers, and technical contributions."
                    />
                    <CommunityCard
                        href="#"
                        icon={Twitter}
                        title="Follow on X"
                        color="bg-blue-400"
                        description="Stay updated with the latest AI news and breakthroughs from J&K."
                    />
                </div>
            </div>
        </section>
    );
};

export default Community;
