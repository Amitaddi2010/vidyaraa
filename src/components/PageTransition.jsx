import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
    },
    in: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    out: {
        opacity: 0,
        y: -20,
        filter: 'blur(8px)',
    },
};

const pageTransition = {
    type: 'tween',
    ease: [0.16, 1, 0.3, 1],
    duration: 0.6,
};

const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
