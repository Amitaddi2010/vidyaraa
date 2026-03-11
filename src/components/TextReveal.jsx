import React from 'react';
import { motion } from 'framer-motion';

/**
 * World-class text reveal animation inspired by Awwwards-winning sites.
 * Each word staggers into view with a smooth blur-up effect.
 */
const TextReveal = ({ children, className = '', delay = 0, as = 'h2' }) => {
    const words = children.split(' ');
    const Tag = as;

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            filter: 'blur(12px)',
            rotateX: 45,
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={`${className} flex flex-wrap gap-x-[0.3em] perspective-[1000px]`}
            style={{ overflowHidden: false }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="inline-block origin-bottom"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextReveal;
