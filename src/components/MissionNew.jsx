import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Target, Lightbulb, Rocket, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Add your AI innovation images here
// Replace these URLs with your actual image paths
const images = [
    '/images/ai-innovation-1.jpg',      // Your first image
    '/images/ai-innovation-2.jpg',      // Your second image  
    '/images/ai-innovation-3.jpg',      // Your third image
    '/images/ai-innovation-4.jpg',      // Your fourth image
    '/images/ai-innovation-5.jpg'       // Your fifth image
];

// TEMPORARY: Using placeholder images until you add your custom ones
// You can remove this section after adding your images
// const tempImages = [
//     'https://picsum.photos/600/400?random=1',
//     'https://picsum.photos/600/400?random=2', 
//     'https://picsum.photos/600/400?random=3',
//     'https://picsum.photos/600/400?random=4',
//     'https://picsum.photos/600/400?random=5'
// ];

// Use your custom images now that they're added to public/images folder
const carouselImages = images;

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

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Auto-play is ON by default
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
    const containerRef = useRef(null);

    // Auto-play functionality - CHANGES EVERY 4 SECONDS
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const handleDragEnd = (event, info) => {
        const dragThreshold = 50;
        if (info.offset.x > dragThreshold) {
            prevImage();
        } else if (info.offset.x < -dragThreshold) {
            nextImage();
        }
    };

    const handleTouchStart = (e) => {
        setIsAutoPlaying(false); // Pause auto-play on touch
    };

    const handleMouseEnter = () => {
        setIsAutoPlaying(false); // Pause auto-play on hover
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true); // Resume auto-play
    };

    // Lightbox functions
    const openLightbox = (imageIndex) => {
        setLightboxImage(carouselImages[imageIndex]);
        setLightboxImageIndex(imageIndex);
        setIsAutoPlaying(false); // Pause auto-play when lightbox opens
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxImageIndex(0);
        setIsAutoPlaying(true); // Resume auto-play when lightbox closes
    };

    const navigateImage = (direction) => {
        if (direction === 'next') {
            const nextIndex = (lightboxImageIndex + 1) % carouselImages.length;
            openLightbox(nextIndex);
        } else {
            const prevIndex = (lightboxImageIndex - 1 + carouselImages.length) % carouselImages.length;
            openLightbox(prevIndex);
        }
    };

    // Handle keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (lightboxImage) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') navigateImage('next');
                if (e.key === 'ArrowLeft') navigateImage('prev');
            }
        };

        // Prevent body scroll when lightbox is open
        if (lightboxImage) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [lightboxImage, lightboxImageIndex, navigateImage]);

    return (
        <>
            <div 
                ref={containerRef}
                className="relative h-[500px] md:h-[600px] lg:h-[650px] rounded-2xl overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={carouselImages[currentIndex]}
                        alt={`AI Innovation ${currentIndex + 1}`}
                        className="w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            imageRendering: 'auto',
                            WebkitImageRendering: 'optimize-contrast',
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            filter: 'contrast(1.1) brightness(1.05)',
                            willChange: 'transform'
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.3}
                        onDragEnd={handleDragEnd}
                        onClick={() => openLightbox(currentIndex)}
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -100 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 25,
                            mass: 0.8
                        }}
                    />

                    {/* Zoom Indicator */}
                    <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity z-10">
                        <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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

                {/* Auto-play indicator */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                        aria-label={isAutoPlaying ? "Pause" : "Play"}
                    >
                        {isAutoPlaying ? (
                            <div className="w-3 h-3 flex items-center justify-center">
                                <div className="w-1 h-3 bg-white rounded-sm mr-1"></div>
                                <div className="w-1 h-3 bg-white rounded-sm"></div>
                            </div>
                        ) : (
                            <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[3px] border-y-transparent ml-1"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[1000] flex items-center justify-center"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            overflow: 'hidden'
                        }}
                        onClick={closeLightbox}
                    >
                        {/* Previous Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('prev');
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                            style={{ color: '#ffffff' }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage('next');
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                            style={{ color: '#ffffff' }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <div onClick={(e) => e.stopPropagation()}>
                            <img 
                                src={lightboxImage} 
                                alt={`AI Innovation image ${lightboxImageIndex + 1}`}
                                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                                style={{ 
                                    maxHeight: '85vh',
                                    maxWidth: '90vw'
                                }}
                            />
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                            style={{ color: '#ffffff' }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm z-10"
                             style={{ color: '#ffffff' }}>
                            <span className="text-sm font-medium">
                                {lightboxImageIndex + 1} / {carouselImages.length}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Mission = () => {
    // const { theme } = useTheme();
    
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
        <section id="mission" className="py-16 md:py-24 lg:py-32 relative border-t overflow-hidden" 
                 style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            
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
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" 
                                style={{ color: 'var(--text-primary)' }}>
                                Accelerating <span className="text-gradient">AI Innovation</span> in the Valley
                            </h2>
                            <p className="text-lg leading-relaxed max-w-xl" 
                               style={{ color: 'var(--text-secondary)' }}>
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
                                            <h3 className="text-xl font-bold mb-2 transition-colors uppercase tracking-tight" 
                                                style={{ color: 'var(--text-primary)' }}>
                                                {point.title}
                                            </h3>
                                            <p className="text-sm font-medium leading-relaxed" 
                                               style={{ color: 'var(--text-muted)' }}>
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
                             style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)' }}></div>

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
