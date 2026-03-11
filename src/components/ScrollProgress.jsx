import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-indigo-400 to-purple-600 origin-left z-[9998] shadow-[0_0_10px_rgba(139,92,246,0.5),0_0_30px_rgba(139,92,246,0.2)]"
        />
    );
};

export default ScrollProgress;
