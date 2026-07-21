import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Target, Lightbulb, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// IMAGE CONFIGURATION
// ============================================================================
// Add your AI innovation images here
// Recommended size: 1600px × 1200px (4:3 aspect ratio)
// Place images in /public/images/ folder
const carouselImages = [
    '/images/ai-innovation-1.jpg',      // Your first image
    '/images/ai-innovation-2.jpg',      // Your second image  
    '/images/ai-innovation-3.jpg',      // Your third image
    '/images/ai-innovation-4.jpg',      // Your fourth image
    '/images/ai-innovation-5.jpg'       // Your fifth image
    // Add more images here as needed
];

// ============================================================================
// ANIMATED NUMBER COMPONENT
// ============================================================================
// Creates smooth counting animations for statistics
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

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================
// Creates interactive 3D tilt effects on hover for mission points
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

// ============================================================================
// IMAGE CAROUSEL COMPONENT
// ============================================================================
// Auto-playing image carousel with smooth transitions and navigation
const ImageCarousel = () => {
    // State management
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const containerRef = useRef(null);

    // ============================================================================
    // AUTO-PLAY FUNCTIONALITY
    // ============================================================================
    // Automatically advances images every 4 seconds when enabled
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // ============================================================================
    // NAVIGATION FUNCTIONS
    // ============================================================================
    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    // ============================================================================
    // USER INTERACTION HANDLERS
    // ============================================================================
    const handleTouchStart = () => {
        setIsAutoPlaying(false); // Pause on touch
    };

    const handleMouseEnter = () => {
        setIsAutoPlaying(false); // Pause on hover
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);  // Resume when not hovering
    };

    // ============================================================================
    // RENDER CAROUSEL
    // ============================================================================
    return (
        <div 
            ref={containerRef}
            className="relative h-[600px] md:h-[700px] lg:h-[800px] rounded-2xl overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            {/* Image display with smooth transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 300, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -300, scale: 0.9 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        mass: 0.5,
                        velocity: 2
                    }}
                >
                    <img
                        src={carouselImages[currentIndex]}
                        alt={`AI Innovation ${currentIndex + 1}`}
                        className="w-full h-full"
                        style={{
                            objectFit: 'cover',           // Fill entire container
                            objectPosition: 'center',     // Center the image
                            imageRendering: 'auto',        // Optimize rendering
                            WebkitImageRendering: 'optimize-contrast',
                            backfaceVisibility: 'hidden',  // Performance optimization
                            transform: 'translateZ(0)',    // Hardware acceleration
                            filter: 'contrast(1.05) brightness(1.02)', // Subtle enhancement
                            willChange: 'transform'        // Optimize animations
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                {/* Previous Button */}
                <button
                    onClick={prevImage}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                    onClick={nextImage}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentIndex 
                                ? 'w-8 bg-white' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play Control */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
                    aria-label={isAutoPlaying ? "Pause" : "Play"}
                >
                    {isAutoPlaying ? (
                        // Pause icon
                        <div className="w-3 h-3 flex items-center justify-center">
                            <div className="w-1 h-3 bg-white rounded-sm mr-1"></div>
                            <div className="w-1 h-3 bg-white rounded-sm"></div>
                        </div>
                    ) : (
                        // Play icon
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[3px] border-y-transparent ml-1"></div>
                    )}
                </button>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN MISSION COMPONENT
// ============================================================================
const Mission = () => {
    // Mission points configuration
    const missionPoints = [
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
        <section 
            id="mission" 
            className="py-16 md:py-24 lg:py-32 relative border-t overflow-hidden" 
            style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border-color)' 
            }}
        >
            {/* Background ambient lighting effect */}
            <div 
                className="absolute top-1/2 left-0 w-1/3 h-1/2 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none"
                style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
            />

            {/* Main content container */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Two-column grid layout */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Column: Text Content */}
                    <div>
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h2 
                                className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" 
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Accelerating <span className="text-gradient">AI Innovation</span> in the Valley
                            </h2>
                            <p 
                                className="text-lg leading-relaxed max-w-xl" 
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                At Vidyaraa, we believe that the next breakthrough in AI can come from anywhere. 
                                Our mission is to build a robust, self-sustaining Artificial Intelligence ecosystem 
                                in India.
                            </p>
                        </motion.div>

                        {/* Mission Points with 3D Cards */}
                        <div className="space-y-6">
                            {missionPoints.map((point, index) => (
                                <TiltCard
                                    key={index}
                                    className="p-8 rounded-3xl border group cursor-default"
                                    style={{ 
                                        backgroundColor: 'var(--card-bg)', 
                                        borderColor: 'var(--border-color)' 
                                    }}
                                >
                                    <div className="flex gap-6">
                                        {/* Icon Container */}
                                        <div 
                                            className="shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-xl"
                                            style={{ 
                                                backgroundColor: 'var(--bg-tertiary)', 
                                                borderColor: 'var(--border-color)' 
                                            }}
                                        >
                                            <div style={{ transform: "translateZ(30px)" }}>
                                                {point.icon}
                                            </div>
                                        </div>
                                        {/* Text Content */}
                                        <div style={{ transform: "translateZ(20px)" }}>
                                            <h3 
                                                className="text-xl font-bold mb-2 transition-colors uppercase tracking-tight" 
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {point.title}
                                            </h3>
                                            <p 
                                                className="text-sm font-medium leading-relaxed" 
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image Carousel */}
                    <div className="relative perspective-1000">
                        {/* Center ambient glow for carousel */}
                        <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
                            style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)' }}
                        />

                        {/* Carousel Component */}
                        <div className="relative z-10">
                            <ImageCarousel />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
