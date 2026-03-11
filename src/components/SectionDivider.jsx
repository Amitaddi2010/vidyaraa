import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionDivider = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="relative w-full h-[1px] overflow-hidden">
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-left"
            >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            </motion.div>
        </div>
    );
};

export default SectionDivider;
