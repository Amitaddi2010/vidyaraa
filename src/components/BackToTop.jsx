import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * A floating "Back to Top" button that appears after scrolling past the Hero.
 * Features spring animation and a pulsing glow on hover.
 */
const BackToTop = () => {
    const { theme } = useTheme();
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
            className="fixed bottom-24 right-8 z-[100] w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center transition-colors cursor-pointer"
            style={{
                backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.9)' : 'rgba(139, 92, 246, 0.9)',
                borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.3)',
                color: '#ffffff',
                boxShadow: theme === 'light' 
                    ? '0 0 20px rgba(249, 115, 22, 0.3)' 
                    : '0 0 20px rgba(139, 92, 246, 0.3)',
                pointerEvents: visible ? 'auto' : 'none'
            }}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5" />
        </motion.button>
    );
};

export default BackToTop;
