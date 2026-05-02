import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Partners = () => {
    const { theme } = useTheme();
    const partners = [
        { name: "HACKwithIndia", url: "https://hackwithindia.in/" },
        { name: "Devnovate", url: "https://devnovate.co/" },
        { name: "SIN Technologies", url: "https://www.sintechnologies.in/" }
    ];

    // Double the partners array for seamless infinite scroll
    const scrollingPartners = [...partners, ...partners];

    return (
        <section className="py-16 md:py-24 lg:py-32 border-t overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <p className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ color: 'var(--text-muted)' }}>
                    Supported by
                </p>

                {/* Infinite Scrolling Partner Names */}
                <div className="relative mb-12 overflow-hidden">
                    <div className="flex animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
                        {scrollingPartners.map((partner, idx) => (
                            <a
                                key={idx}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 px-8 md:px-12 group"
                            >
                                <span 
                                    className="text-2xl md:text-4xl font-black tracking-tight uppercase transition-all duration-300 group-hover:scale-110 inline-block"
                                    style={{ 
                                        color: theme === 'light' 
                                            ? (idx % 3 === 0 ? '#f97316' : idx % 3 === 1 ? '#fb923c' : '#fdba74')
                                            : (idx % 3 === 0 ? '#a78bfa' : idx % 3 === 1 ? '#8b5cf6' : '#c084fc'),
                                        textShadow: theme === 'light' 
                                            ? '0 0 30px rgba(249, 115, 22, 0.3)'
                                            : '0 0 30px rgba(139, 92, 246, 0.3)'
                                    }}
                                >
                                    {partner.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Gradient overlay for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
                     style={{ background: `linear-gradient(to right, ${theme === 'light' ? '#f5f5f5' : '#0a0a0a'}, transparent)` }}></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
                     style={{ background: `linear-gradient(to left, ${theme === 'light' ? '#f5f5f5' : '#0a0a0a'}, transparent)` }}></div>

            </div>
        </section>
    );
};

export default Partners;
