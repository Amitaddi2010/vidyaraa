import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Target, Lightbulb, Rocket } from 'lucide-react';

const AnimatedNumber = ({ value, duration = 2 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration, ease: "easeOut" });
        return controls.stop;
    }, [value, duration]);

    useEffect(() => {
        return rounded.onChange((latest) => setDisplayValue(latest));
    }, [rounded]);

    return displayValue;
};

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`${className} transition-colors duration-500`}
        >
            <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Mission = () => {
    const points = [
        {
            icon: <Target className="w-6 h-6 text-purple-400" />,
            title: "Identify & Nurture Talent",
            description: "Discovering exceptional AI talent across J&K and providing them with world-class resources to grow."
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-indigo-400" />,
            title: "Foster Innovation",
            description: "Creating an environment where students and researchers can collaborate on state-of-the-art AI solutions."
        },
        {
            icon: <Rocket className="w-6 h-6 text-purple-400" />,
            title: "Industry Integration",
            description: "Bridging the gap between academia and industry to create real-world impact and local opportunities."
        }
    ];

    return (
        <section id="mission" className="py-32 bg-[#020202] relative border-t border-white/[0.02] overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[#6d28d9]/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Column: Text & 3D Cards */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                Accelerating <span className="text-gradient">AI Innovation</span> in the Valley
                            </h2>
                            <p className="text-[#888888] text-lg leading-relaxed max-w-xl">
                                At Vidyaraa, we believe that the next breakthrough in AI can come from anywhere. Our mission is to build a robust, self-sustaining Artificial Intelligence ecosystem in Jammu & Kashmir.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {points.map((point, i) => (
                                <TiltCard
                                    key={i}
                                    className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 group cursor-default"
                                >
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:bg-[#111] transition-all duration-300 shadow-xl">
                                            <div style={{ transform: "translateZ(30px)" }}>
                                                {point.icon}
                                            </div>
                                        </div>
                                        <div style={{ transform: "translateZ(20px)" }}>
                                            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{point.title}</h3>
                                            <p className="text-[#666666] text-sm font-medium leading-relaxed">{point.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Grid with 3D Pop */}
                    <div className="relative perspective-1000">
                        {/* Center ambient glow for grid */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-6 pt-12">
                                <TiltCard className="bg-glass p-8 rounded-3xl aspect-square flex flex-col justify-between group border border-white/5 hover:border-purple-500/30">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-purple-500/50 transition-colors">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-purple-500 group-hover:shadow-[0_0_10px_#a855f7] transition-all"></div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-white mb-1">
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                            >
                                                <AnimatedNumber value={500} />+
                                            </motion.span>
                                        </div>
                                        <div className="text-[10px] text-[#888888] font-black uppercase tracking-[0.2em] mb-2">Students Reached</div>
                                        <div className="text-[11px] text-[#555555] font-medium leading-relaxed group-hover:text-[#777777] transition-colors">Empowering the next generation.</div>
                                    </div>
                                </TiltCard>

                                <TiltCard className="bg-[#050505] p-8 rounded-3xl border border-white/5 aspect-[4/3] flex flex-col justify-between group relative overflow-hidden hover:border-indigo-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="text-4xl font-black text-white relative z-10 mb-1">
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            <AnimatedNumber value={10} />+
                                        </motion.span>
                                    </div>
                                    <div className="text-[10px] text-[#888888] font-black uppercase tracking-[0.2em] relative z-10 mb-3">Univ Partners</div>
                                    <div className="text-[11px] text-[#555555] font-medium leading-relaxed relative z-10 group-hover:text-[#777777] transition-colors">Strategic academic alliances.</div>
                                </TiltCard>
                            </div>

                            <div className="space-y-6">
                                <TiltCard className="bg-gradient-to-br from-[#111] to-[#050505] p-8 rounded-3xl border border-white/10 aspect-[4/3] flex flex-col justify-between group relative overflow-hidden hover:border-purple-500/30">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[50px] group-hover:bg-purple-600/40 transition-colors duration-500"></div>
                                    <div className="text-4xl font-black text-white relative z-10 mb-1">
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            <AnimatedNumber value={3} />
                                        </motion.span>
                                    </div>
                                    <div className="text-[10px] text-[#888888] font-black uppercase tracking-[0.2em] relative z-10 mb-3">Hackathons</div>
                                    <div className="text-[11px] text-[#555555] font-medium leading-relaxed relative z-10 group-hover:text-[#777777] transition-colors">Innovation in action.</div>
                                </TiltCard>

                                <TiltCard className="bg-glass p-8 rounded-3xl aspect-square flex flex-col justify-between group border border-white/5 hover:border-indigo-500/30">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-indigo-400/30 transition-colors">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-150 group-hover:bg-indigo-400 transition-all duration-300"></div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black text-white mb-1">
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                            >
                                                <AnimatedNumber value={50} />+
                                            </motion.span>
                                        </div>
                                        <div className="text-[10px] text-[#888888] font-black uppercase tracking-[0.2em] mb-2">Research</div>
                                        <div className="text-[11px] text-[#555555] font-medium leading-relaxed group-hover:text-[#777777] transition-colors">Pioneering AI breakthroughs.</div>
                                    </div>
                                </TiltCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
