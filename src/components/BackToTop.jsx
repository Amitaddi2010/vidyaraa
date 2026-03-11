import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * A floating "Back to Top" button that appears after scrolling past the Hero.
 * Features spring animation and a pulsing glow on hover.
 */
const BackToTop = () => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 800);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[100] w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] cursor-pointer"
            style={{ pointerEvents: visible ? 'auto' : 'none' }}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5" />
        </motion.button>
    );
};

export default BackToTop;
