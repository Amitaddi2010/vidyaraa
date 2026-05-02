import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const bootMessages = [
    'Initializing neural core...',
    'Loading AI modules...',
    'Calibrating ecosystem parameters...',
    'Syncing knowledge graph...',
    'System ready.',
];

const Preloader = ({ onComplete }) => {
    const { theme } = useTheme();
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const totalDuration = 2800;
        const steps = 100;
        const interval = totalDuration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(currentStep, steps);
            setProgress(newProgress);

            // Update boot messages at specific progress points
            if (newProgress === 15) setMessageIndex(1);
            if (newProgress === 35) setMessageIndex(2);
            if (newProgress === 60) setMessageIndex(3);
            if (newProgress === 90) setMessageIndex(4);

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(() => {
                        onComplete();
                    }, 800);
                }, 400);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    key="preloader"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden cursor-none"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                >
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03]">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>

                    {/* Ambient Glow - Purple for dark, Orange for light */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
                        style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(139, 92, 246, 0.15)' }}
                    />

                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center gap-12">

                        {/* Logo Assembly */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            {/* Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-20px] rounded-full"
                                style={{ border: '1px solid var(--border-color)' }}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] border border-dashed rounded-full"
                                style={{ borderColor: 'var(--border-color)' }}
                            />

                            {/* Logo Container */}
                            <div className="w-28 h-28 rounded-[2rem] flex items-center justify-center backdrop-blur-sm relative overflow-hidden"
                                 style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                {/* Scanning Line - Orange for light, Purple for dark */}
                                <motion.div
                                    animate={{ y: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent"
                                    style={{ background: theme === 'light' ? 'linear-gradient(to right, transparent, rgba(249, 115, 22, 0.4), transparent)' : 'linear-gradient(to right, transparent, rgba(139, 92, 246, 0.4), transparent)' }}
                                />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex items-center justify-center"
                                >
                                    {/* Vidyaraa Logo - Different for light/dark theme */}
                                    <img 
                                        src={theme === 'light' ? "/VidyaraaLogo-light.PNG" : "/VidyaraaLogo-dark.PNG"} 
                                        alt="Vidyaraa" 
                                        className="w-16 h-16 object-contain"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Brand Name with Glitch */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center relative"
                        >
                            <h1 className="text-5xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                                Vidyaraa<span style={{ color: 'var(--accent-primary)' }}>.</span>
                            </h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-3" style={{ color: 'var(--text-muted)' }}>
                                Artificial Intelligence Ecosystem
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 280 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="w-[280px] h-[2px] rounded-full overflow-hidden relative"
                                 style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ 
                                        width: `${progress}%`, 
                                        background: theme === 'light' ? 'linear-gradient(to right, #f97316, #fb923c, #f97316)' : 'linear-gradient(to right, #8b5cf6, #a78bfa, #8b5cf6)',
                                        boxShadow: theme === 'light' ? '0 0 15px rgba(249, 115, 22, 0.5)' : '0 0 15px rgba(139, 92, 246, 0.5)'
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Boot Messages */}
                            <div className="h-5 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={messageIndex}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[11px] font-mono font-bold tracking-wider"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {bootMessages[messageIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Progress Percentage */}
                            <p className="text-[10px] font-black font-mono tracking-[0.3em]"
                               style={{ color: 'var(--text-muted)' }}>
                                {progress}%
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom System Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-10 flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em]"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <span>System Core v2.5.0</span>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} />
                        <span>J&K • India</span>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} />
                        <span>Neural Engine Active</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
