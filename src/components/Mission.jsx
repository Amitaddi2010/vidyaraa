import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const images = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/301',
  'https://picsum.photos/200/302',
  'https://picsum.photos/200/303',
  'https://picsum.photos/200/304',
];

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
            icon: <Target className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />,
            title: "Identify & Nurture Talent",
            description: "Discovering exceptional AI talent across India and providing them with world-class resources to grow."
        },
        {
            icon: <Lightbulb className="w-6 h-6" style={{ color: 'var(--accent-secondary)' }} />,
            title: "Foster Innovation",
            description: "Creating an environment where students and researchers can collaborate on state-of-the-art AI solutions."
        },
        {
            icon: <Rocket className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />,
            title: "Industry Integration",
            description: "Bridging the gap between academia and industry to create real-world impact and local opportunities."
        }
    ];

    return (
        <section id="mission" className="py-16 md:py-24 lg:py-32 relative border-t overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 left-0 w-1/3 h-1/2 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"
                 style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}></div>

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
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                Accelerating <span className="text-gradient">AI Innovation</span> in the Valley
                            </h2>
                            <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                                At Vidyaraa, we believe that the next breakthrough in AI can come from anywhere. Our mission is to build a robust, self-sustaining Artificial Intelligence ecosystem in India.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {points.map((point, i) => (
                                <TiltCard
                                    key={i}
                                    className="p-8 rounded-3xl border group cursor-default"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-xl"
                                             style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                                            <div style={{ transform: "translateZ(30px)" }}>
                                                {point.icon}
                                            </div>
                                        </div>
                                        <div style={{ transform: "translateZ(20px)" }}>
                                            <h3 className="text-xl font-bold mb-2 transition-colors uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>{point.title}</h3>
                                            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>{point.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Grid with 3D Pop */}
                    <div className="relative perspective-1000">
                        {/* Center ambient glow for grid */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
                             style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)' }}></div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="pt-12">
                                {/* Statistics cards removed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
