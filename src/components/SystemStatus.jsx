import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const SystemStatus = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-8 right-8 z-[100] hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl group cursor-default"
        >
            <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 leading-none mb-0.5">Vidyaraa System</span>
                <span className="text-[11px] font-bold text-emerald-400 leading-none flex items-center gap-1.5 uppercase tracking-wider">
                    <Activity className="w-3 h-3" />
                    Status: Online
                </span>
            </div>

            {/* Hover Tooltip (Internal) */}
            <div className="absolute bottom-full right-0 mb-4 w-48 p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none transform origin-bottom-right shadow-2xl">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#555]">
                        <span>Latency</span>
                        <span className="text-emerald-400">12ms</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="h-full bg-emerald-500/40"
                        ></motion.div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#555]">
                        <span>Uptime</span>
                        <span className="text-white">99.9%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SystemStatus;
