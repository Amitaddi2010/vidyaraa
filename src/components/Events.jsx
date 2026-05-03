import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TextReveal from './TextReveal';
import GradientMesh from './GradientMesh';
import { useTheme } from '../context/ThemeContext';

const Events = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const events = [
        {
            type: "Partnership",
            title: "Something BIG",
            date: "May 2026",
            location: "Jammu",
            status: "Coming Soon",
            active: true
        },
        {
            type: "Workshop",
            title: "Build with AI: Workshop on Google AI Tools",
            date: "April 11, 2026",
            location: "University of Jammu - Department of Computer Science & IT",
            status: "Completed",
            active: false
        },
        {
            type: "Workshop",
            title: "AI Tools Masterclass",
            date: "March 18, 2026",
            location: "Department of CS & IT, Bhaderwah Campus",
            status: "Completed",
            active: false
        }
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section id="events" className="py-16 md:py-24 lg:py-32 border-t relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <GradientMesh variant="subtle" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8"
                >
                    <div className="max-w-xl">
                        <TextReveal className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>Upcoming Events</TextReveal>
                        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            Join us at our upcoming hackathons, workshops, and meetups to connect, learn, and build real-world AI projects.
                        </p>
                    </div>
                    <Link 
                        to="/events" 
                        className="group px-6 py-3 rounded-full bg-transparent border font-medium hover:bg-white/5 transition-all flex items-center gap-2 shrink-0"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                        View All Events
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {events.map((evt, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            key={idx}
                            className="rounded-3xl p-1 border hover:-translate-y-2 transition-all duration-300 group"
                            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', boxShadow: '0 0 30px rgba(0,0,0,0.02)' }}
                        >
                            <div className="rounded-[1.4rem] p-8 h-full flex flex-col justify-between relative overflow-hidden"
                                 style={{ backgroundColor: 'var(--card-bg)' }}>

                                {/* Subtle highlight if active */}
                                {evt.active && (
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none"
                                         style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(109, 40, 217, 0.2)' }}></div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border"
                                              style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
                                            {evt.type}
                                        </span>
                                        <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${evt.active ? (theme === 'light' ? 'border-orange-500/50 text-orange-600 bg-orange-500/10' : 'border-purple-600/50 text-purple-400 bg-purple-600/10') : ''}`}
                                              style={evt.active ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
                                            {evt.status}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-6 transition-all"
                                        style={{ color: 'var(--text-primary)' }}>
                                        {evt.title}
                                    </h3>

                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                 style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                                                <Calendar style={{ color: 'var(--text-primary)' }} />
                                            </div>
                                            <span>{evt.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                 style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                                                <MapPin style={{ color: 'var(--text-primary)' }} />
                                            </div>
                                            <span>{evt.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    to="/events" 
                                    className="relative z-10 w-full py-4 rounded-xl font-bold transition-colors border uppercase tracking-widest text-xs block text-center hover:opacity-80"
                                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                >
                                    View Details
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
