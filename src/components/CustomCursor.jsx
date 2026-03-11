import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHoverStart = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.group') ||
                target.classList.contains('cursor-pointer');

            if (isInteractive) setIsHovered(true);
        };

        const handleHoverEnd = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mouseout', handleHoverEnd);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mouseout', handleHoverEnd);
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
            />

            {/* Expanded Aura */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-white/20 bg-white/5"
                animate={{
                    width: isHovered ? 80 : 40,
                    height: isHovered ? 80 : 40,
                    opacity: isHovered ? 1 : 0.3,
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
            >
                {/* Inner Glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
