import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const Partners = () => {
    const partners = [
        { 
            name: "HACKwithIndia",
            logo: "/partners/hackwithindia.png",
            alt: "HACKwithIndia Logo"
        },
        { 
            name: "Devnovate",
            logo: "/partners/devnovate.png",
            alt: "Devnovate Logo"
        },
        { 
            name: "SIN Technologies",
            logo: "/partners/sin-technologies.png",
            alt: "SIN Technologies Logo"
        }
    ];

    return (
        <section className="py-32 bg-[#020202] border-t border-white/[0.02] overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <p className="text-center text-xs font-bold text-[#555555] uppercase tracking-[0.2em] mb-16">
                    Supported by
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-16 lg:gap-32"
                >
                    {partners.map((partner, idx) => (
                        <div key={idx} className="flex items-center justify-center min-w-[200px] md:min-w-[250px] opacity-60 hover:opacity-100 transition-all duration-700 cursor-default grayscale hover:grayscale-0 transform hover:scale-105">
                            
                            {/* Partner Logo */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-white/10 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg"></div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                                <div className="relative overflow-hidden rounded-lg flex items-center justify-center h-16 md:h-20 w-48 md:w-56">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-white/5 group-hover:to-blue-500/10 transition-all duration-700"></div>
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.alt}
                                        className="relative h-12 md:h-16 w-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 drop-shadow-lg group-hover:drop-shadow-2xl"
                                        onError={(e) => {
                                            // Fallback to text-based logo if image fails to load
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    
                                    {/* Fallback to text-based logos */}
                                    <div className="hidden items-center justify-center" style={{ display: 'none' }}>
                                        {partner.name === "HACKwithIndia" && (
                                            <div className="flex items-center gap-1 border-b-2 border-transparent hover:border-white/20 pb-1 transition-colors">
                                                <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase font-sans">
                                                    HACK
                                                </span>
                                                <span className="text-lg md:text-xl font-normal italic text-[#a1a1aa] lowercase font-serif">
                                                    with
                                                </span>
                                                <span className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
                                                    India
                                                </span>
                                            </div>
                                        )}

                                        {partner.name === "Devnovate" && (
                                            <div className="flex items-center gap-2">
                                                <Layers className="w-6 h-6 md:w-8 md:h-8 text-[#6d28d9]" />
                                                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-sans">
                                                    Devnovate
                                                </span>
                                            </div>
                                        )}

                                        {partner.name === "SIN Technologies" && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl md:text-3xl font-black tracking-[0.1em] text-white uppercase leading-none">
                                                    SIN
                                                </span>
                                                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-[#a1a1aa] uppercase mt-1 leading-none border-l-2 border-[#a1a1aa]/50 pl-2">
                                                    TECH
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Partners;
