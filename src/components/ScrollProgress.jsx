import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ScrollProgress = () => {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ 
                scaleX,
                background: theme === 'light' 
                    ? 'linear-gradient(to right, #f97316, #fb923c, #f97316)'
                    : 'linear-gradient(to right, #8b5cf6, #a78bfa, #8b5cf6)',
                boxShadow: theme === 'light'
                    ? '0 0 10px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.2)'
                    : '0 0 10px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)'
            }}
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998]"
        />
    );
};

export default ScrollProgress;
