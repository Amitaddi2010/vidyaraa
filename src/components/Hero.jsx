import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';

const Hero = () => {
    const cardRef = useRef(null);
    const canvasRef = useRef(null);
    const heroRef = useRef(null);

    // Parallax: content moves faster than background
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const parallaxY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
    const parallaxOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
    const bgParallaxY = useTransform(heroScrollProgress, [0, 1], [0, 50]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize values between -0.5 and 0.5
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const [lines, setLines] = useState([]);

    // Magnetic Button Logic
    const btnX = useMotionValue(0);
    const btnY = useMotionValue(0);
    const btnSpringX = useSpring(btnX, { stiffness: 150, damping: 15 });
    const btnSpringY = useSpring(btnY, { stiffness: 150, damping: 15 });

    const handleBtnMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        btnX.set(distanceX * 0.3);
        btnY.set(distanceY * 0.3);
    };

    const handleBtnMouseLeave = () => {
        btnX.set(0);
        btnY.set(0);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = [];
        const particleCount = 40;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
                // Draw lines between nearby particles
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 150)})`;
                        ctx.stroke();
                    }
                });
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        const newLines = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: `${1 + Math.random() * 98}%`,
            delay: `${Math.random() * 10}s`,
            duration: `${3 + Math.random() * 5}s`,
            height: `${10 + Math.random() * 20}px`,
            opacity: 0.1 + Math.random() * 0.4
        }));
        setLines(newLines);
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen bg-[#020202] flex items-center justify-center pt-20 pb-24 overflow-hidden font-sans tracking-tight perspective-1000">

            {/* 0. Canvas Neural Background */}
            <motion.div style={{ y: bgParallaxY }} className="absolute inset-0">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none z-0 opacity-40"
                />
            </motion.div>

            {/* 1. Falling Stars Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {lines.map((line) => (
                    <div
                        key={line.id}
                        className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent animate-shooting-line"
                        style={{
                            left: line.left,
                            height: line.height,
                            animationDelay: line.delay,
                            animationDuration: line.duration,
                            opacity: line.opacity
                        }}
                    />
                ))}
            </div>

            {/* 2. Soft Layered Silk Waves (CSS approach) */}
            <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-0 overflow-hidden flex justify-between items-end">
                {/* Left Wave Assembly */}
                <div className="relative w-[50vw] h-[80vh] flex items-end justify-start opacity-70">
                    <div className="absolute -bottom-[20%] -left-[20%] w-[120%] h-[120%] bg-gradient-to-tr from-[#020202] via-[#111111] to-transparent rounded-full shadow-[inset_-2px_2px_4px_rgba(255,255,255,0.05),0_0_40px_rgba(255,255,255,0.02)] blur-[1px]"></div>
                    <div className="absolute -bottom-[10%] -left-[10%] w-[100%] h-[100%] bg-gradient-to-tr from-[#000] via-[#0a0a0a] to-transparent rounded-full shadow-[inset_-2px_2px_4px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.03)] blur-[1px]"></div>
                    <div className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-gradient-to-tr from-[#000] via-[#050505] to-transparent rounded-full shadow-[inset_-2px_2px_4px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.04)] blur-[1px]"></div>
                </div>

                {/* Right Wave Assembly */}
                <div className="relative w-[50vw] h-[80vh] flex items-end justify-end opacity-70">
                    <div className="absolute -bottom-[20%] -right-[20%] w-[120%] h-[120%] bg-gradient-to-tl from-[#020202] via-[#111111] to-transparent rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),0_0_40px_rgba(255,255,255,0.02)] blur-[1px]"></div>
                    <div className="absolute -bottom-[10%] -right-[10%] w-[100%] h-[100%] bg-gradient-to-tl from-[#000] via-[#0a0a0a] to-transparent rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.03)] blur-[1px]"></div>
                    <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-to-tl from-[#000] via-[#050505] to-transparent rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.04)] blur-[1px]"></div>
                </div>

                {/* Floor Depth Blur */}
                <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0,transparent_70%)] blur-xl"></div>
            </div>

            <motion.div style={{ y: parallaxY, opacity: parallaxOpacity }} className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center justify-center text-center mt-8">

                {/* Top Minimal Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md text-[#aaaaaa] text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-10 shadow-lg"
                >
                    {/* Custom 4-point star for the badge */}
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="opacity-90">VIDYARAA AI INITIATIVE</span>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-[-0.04em] drop-shadow-2xl">
                        Building the Future of AI<br />in Jammu & Kashmir.
                    </h1>
                </motion.div>

                {/* Subheadline */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="text-[1.1rem] md:text-[1.3rem] leading-relaxed text-[#888888] mb-12 max-w-2xl mx-auto font-normal tracking-wide">
                        Uniting student talent, academic research, and industry to accelerate innovation. Empowering the next generation of AI leaders.
                    </p>
                </motion.div>

                {/* Primary Action Button (Magnetic) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    onMouseMove={handleBtnMouseMove}
                    onMouseLeave={handleBtnMouseLeave}
                    style={{ x: btnSpringX, y: btnSpringY }}
                    className="relative group mb-16 z-30 inline-block"
                >
                    {/* Intense Outer Glow behind button */}
                    <div className="absolute -inset-1.5 bg-white rounded-full blur-[24px] opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute -inset-4 bg-white rounded-full blur-[60px] opacity-10 group-hover:opacity-15 transition-opacity duration-500"></div>

                    <a href="#events" className="relative inline-block px-10 py-4 bg-[#ffffff] text-black text-sm md:text-base font-bold rounded-full transition-transform duration-300 whitespace-nowrap tracking-tight">
                        Get Involved Now
                    </a>
                </motion.div>

                {/* 3D Interactive Center Icon Box + Pillar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="relative w-36 h-36 perspective-[2000px] z-20 mt-8"
                >
                    {/* Vertical Light Pillar passing exactly through the cube */}
                    <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60px] h-[500px] bg-gradient-to-t from-transparent via-white to-transparent blur-[30px] opacity-20 pointer-events-none mix-blend-screen scale-y-150"></div>
                    <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 w-[10px] h-[400px] bg-gradient-to-t from-transparent via-white to-transparent blur-[4px] opacity-60 pointer-events-none mix-blend-screen scale-y-150"></div>

                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="w-full h-full relative group flex items-center justify-center cursor-pointer"
                    >
                        {/* The outer glowing rounded rectangle container with prominent light border */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] group-hover:bg-[#111] overflow-hidden">
                            <div className="absolute inset-0 rounded-[2.5rem] border-[1.5px] border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"></div>
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
                        </div>

                        {/* Deep inner shadow core */}
                        <div className="absolute inset-[6px] rounded-[2.2rem] bg-[#000000] shadow-[inset_0_5px_15px_rgba(255,255,255,0.02)]"></div>

                        {/* The crisp white custom icon exactly matching Onion AI */}
                        <motion.div
                            style={{ translateZ: 50 }}
                            className="relative z-10 w-[4.5rem] h-[4.5rem] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                                <mask id="cutout">
                                    <rect width="100" height="100" fill="white" />
                                    <circle cx="50" cy="-20" r="50" fill="black" />
                                    <circle cx="50" cy="120" r="50" fill="black" />
                                    <circle cx="-20" cy="50" r="50" fill="black" />
                                    <circle cx="120" cy="50" r="50" fill="black" />
                                    <rect x="47" y="10" width="6" height="80" fill="black" rx="3" />
                                    <rect x="10" y="47" width="80" height="6" fill="black" rx="3" />
                                </mask>
                                <circle cx="50" cy="50" r="45" fill="white" mask="url(#cutout)" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
