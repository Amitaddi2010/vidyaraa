import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const bootMessages = [
    'Initializing neural core...',
    'Loading AI modules...',
    'Calibrating ecosystem parameters...',
    'Syncing knowledge graph...',
    'System ready.',
];

const Preloader = ({ onComplete }) => {
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
                    className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center overflow-hidden cursor-none"
                >
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03]">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>

                    {/* Ambient Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"
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
                                className="absolute inset-[-20px] border border-white/5 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] border border-dashed border-white/[0.03] rounded-full"
                            />

                            {/* Logo Container */}
                            <div className="w-28 h-28 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                                {/* Scanning Line */}
                                <motion.div
                                    animate={{ y: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
                                />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <BrainCircuit className="w-12 h-12 text-white" />
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
                            <h1 className="text-5xl font-black tracking-tighter text-white">
                                Vidyaraa<span className="text-purple-400">.</span>
                            </h1>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-3">
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
                            <div className="w-[280px] h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                                    style={{ width: `${progress}%` }}
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
                                        className="text-[11px] font-mono font-bold text-white/40 tracking-wider"
                                    >
                                        {bootMessages[messageIndex]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Progress Percentage */}
                            <p className="text-[10px] font-black font-mono text-white/20 tracking-[0.3em]">
                                {progress}%
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom System Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-10 flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-white/15"
                    >
                        <span>System Core v2.5.0</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span>J&K • India</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span>Neural Engine Active</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
