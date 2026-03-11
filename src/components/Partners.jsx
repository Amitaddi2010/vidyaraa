import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const Partners = () => {
    const partners = [
        { name: "HACKwithIndia" },
        { name: "Devnovate" },
        { name: "SIN Technologies" }
    ];

    return (
        <section className="py-32 bg-[#020202] border-t border-white/[0.02] overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <p className="text-center text-xs font-bold text-[#555555] uppercase tracking-[0.2em] mb-16">
                    Backed by
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-16 lg:gap-32"
                >
                    {partners.map((partner, idx) => (
                        <div key={idx} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">

                            {/* Custom Wordmark Logos */}
                            {partner.name === "HACKwithIndia" && (
                                <div className="flex items-center gap-1 border-b-2 border-transparent hover:border-white/20 pb-1 transition-colors">
                                    <span className="text-2xl md:text-[1.75rem] font-black tracking-tighter text-white uppercase font-sans">
                                        HACK
                                    </span>
                                    <span className="text-xl md:text-2xl font-normal italic text-[#a1a1aa] lowercase font-serif">
                                        with
                                    </span>
                                    <span className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-white font-sans">
                                        India
                                    </span>
                                </div>
                            )}

                            {partner.name === "Devnovate" && (
                                <div className="flex items-center gap-3">
                                    <Layers className="w-8 h-8 text-[#6d28d9]" />
                                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                                        Devnovate
                                    </span>
                                </div>
                            )}

                            {partner.name === "SIN Technologies" && (
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl md:text-4xl font-black tracking-[0.1em] text-white uppercase leading-none">
                                        SIN
                                    </span>
                                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#a1a1aa] uppercase mt-1 leading-none border-l-2 border-[#a1a1aa]/50 pl-2">
                                        TECH
                                    </span>
                                </div>
                            )}

                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Partners;
