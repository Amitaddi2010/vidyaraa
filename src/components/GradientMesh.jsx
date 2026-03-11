import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated gradient mesh background with floating orbs.
 * Inspired by award-winning dark-theme AI sites (Star Atlas, Scale, etc.)
 */
const GradientMesh = ({ variant = 'default' }) => {
    const configs = {
        default: {
            orbs: [
                { color: 'rgba(109,40,217,0.15)', size: 600, x: '20%', y: '30%', duration: 20 },
                { color: 'rgba(67,56,202,0.12)', size: 500, x: '70%', y: '60%', duration: 25 },
                { color: 'rgba(139,92,246,0.08)', size: 400, x: '50%', y: '20%', duration: 18 },
            ],
        },
        hero: {
            orbs: [
                { color: 'rgba(109,40,217,0.12)', size: 800, x: '30%', y: '40%', duration: 22 },
                { color: 'rgba(67,56,202,0.10)', size: 600, x: '70%', y: '30%', duration: 28 },
                { color: 'rgba(79,70,229,0.08)', size: 500, x: '50%', y: '70%', duration: 20 },
                { color: 'rgba(139,92,246,0.06)', size: 700, x: '20%', y: '60%', duration: 24 },
            ],
        },
        subtle: {
            orbs: [
                { color: 'rgba(109,40,217,0.06)', size: 500, x: '40%', y: '50%', duration: 30 },
                { color: 'rgba(67,56,202,0.04)', size: 400, x: '60%', y: '40%', duration: 25 },
            ],
        },
    };

    const { orbs } = configs[variant] || configs.default;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />

            {/* Floating gradient orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: [0, 30, -20, 10, 0],
                        y: [0, -20, 30, -10, 0],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: 'blur(80px)',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
        </div>
    );
};

export default GradientMesh;
