import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';
import GradientMesh from './GradientMesh';

const Events = () => {
    const events = [
        {
            type: "Workshop",
            title: "One Day Workshop on AI Tools",
            date: "March 18, 2026",
            location: "Bhaderwah Campus",
            status: "Registered",
            active: false
        },
        {
            type: "Workshop",
            title: "One DayWorkshop on Google AI Tools",
            date: "March 28, 2026",
            location: "University of Jammu",
            status: "Opening Registration Soon",
            active: true
        },
        {
            type: "Event",
            title: "Something BIG",
            date: "April",
            location: "Multiple Locations",
            status: "Planning",
            active: false
        }
    ];

    return (
        <section id="events" className="py-32 bg-[#020202] border-t border-white/[0.02] relative overflow-hidden">
            <GradientMesh variant="subtle" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
                >
                    <div className="max-w-xl">
                        <TextReveal className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">Upcoming Events</TextReveal>
                        <p className="text-[#888888] text-lg leading-relaxed">
                            Join us at our upcoming hackathons, workshops, and meetups to connect, learn, and build real-world AI projects.
                        </p>
                    </div>
                    <button className="group px-6 py-3 rounded-full bg-transparent border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center gap-2 shrink-0">
                        View All Events
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {events.map((evt, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            key={idx}
                            className="bg-[#050505] rounded-3xl p-1 border border-white/5 hover:border-white/15 hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                        >
                            <div className="bg-[#0A0A0A] rounded-[1.4rem] p-8 h-full flex flex-col justify-between relative overflow-hidden">

                                {/* Subtle highlight if active */}
                                {evt.active && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#6d28d9]/20 rounded-full blur-[40px] pointer-events-none"></div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10 text-[#a1a1aa] bg-white/5">
                                            {evt.type}
                                        </span>
                                        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${evt.active ? 'border-[#6d28d9]/50 text-[#a78bfa] bg-[#6d28d9]/10' : 'border-white/5 text-[#555]'}`}>
                                            {evt.status}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#94a3b8] transition-all">
                                        {evt.title}
                                    </h3>

                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center gap-3 text-[#777777] text-sm font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-white" />
                                            </div>
                                            <span>{evt.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[#777777] text-sm font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center">
                                                <MapPin className="w-4 h-4 text-white" />
                                            </div>
                                            <span>{evt.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    to="/contact" 
                                    className="relative z-10 w-full py-4 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black font-bold transition-colors border border-white/10 uppercase tracking-widest text-xs block text-center"
                                >
                                    Contact for more details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Events;
