import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Events = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleNavigateToEvents = () => {
        // Scroll to top before navigation
        window.scrollTo(0, 0);
        navigate('/events');
    };

    const events = [
        {
            type: "Partnership",
            title: "Something BIG",
            date: "May 2026",
            location: "Jammu",
            status: "Coming Soon",
            active: true,
            image: "/events/partnership/question-mark.jpg",
            description: "An exciting partnership announcement that will revolutionize AI in India.",
            highlights: [
                "Strategic collaboration",
                "Industry-leading partnership",
                "Game-changing impact",
                "First-of-its-kind for India"
            ],
            registrationLink: null,
            capacity: 0,
            registered: 0
        },
        {
            type: "Workshop",
            title: "Build with AI: Workshop on Google AI Tools",
            date: "April 11, 2026",
            location: "University of Jammu - Department of Computer Science & IT",
            status: "Completed",
            active: false,
            image: "/events/workshops/google-ai-tools-1.jpg",
            description: "Hands-on workshop exploring Google's latest AI tools and their practical applications.",
            highlights: [
                "Google AI tools overview",
                "Practical demonstrations",
                "Certificate provided",
                "Networking opportunities"
            ],
            registrationLink: null,
            capacity: 120,
            registered: 120
        },
        {
            type: "Workshop",
            title: "AI Tools Masterclass",
            date: "March 18, 2026",
            location: "Department of CS & IT, Bhaderwah Campus",
            status: "Completed",
            active: false,
            image: "/events/workshops/ai-tools-1.jpg",
            description: "Comprehensive masterclass covering essential AI tools and technologies.",
            highlights: [
                "Advanced AI concepts",
                "Career guidance in AI and interactive Q&A session",
                "Collaboration with HackwithIndia and Devnovate for resources"
            ],
            registrationLink: null,
            capacity: 35,
            registered: 35
        }
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section id="events" className="py-16 md:py-24 lg:py-32 border-t relative overflow-hidden" 
                 style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
                     style={{ background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" 
                        style={{ color: 'var(--text-primary)' }}>
                        Upcoming Events
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed" 
                       style={{ color: 'var(--text-muted)' }}>
                        Join us at our upcoming hackathons, workshops, and meetups to connect, learn, and build real-world AI projects.
                    </p>
                </motion.div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {events.map((evt, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300"
                            style={{ 
                                backgroundColor: 'var(--card-bg)', 
                                borderColor: evt.active 
                                    ? (theme === 'light' ? '#f97316' : '#8b5cf6') 
                                    : 'var(--border-color)' 
                            }}
                        >
                            {/* Event Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={evt.image} 
                                    alt={evt.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback */}
                                <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                                    <CalendarDays className="w-12 h-12" style={{ color: 'var(--text-muted)' }} />
                                </div>
                                
                                {/* Status and Type Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <div className="px-2 py-1 rounded-full text-xs font-bold"
                                         style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}>
                                        {evt.type}
                                    </div>
                                    <div className="px-2 py-1 rounded-full text-xs font-bold"
                                         style={{ 
                                             backgroundColor: evt.status === 'Completed' 
                                                 ? (theme === 'light' ? '#16a34a' : '#4ade80')
                                                 : evt.status === 'Upcoming'
                                                 ? (theme === 'light' ? '#ea580c' : '#fb923c')
                                                 : (theme === 'light' ? '#7c3aed' : '#8b5cf6'),
                                             color: '#ffffff' 
                                         }}>
                                        {evt.status}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                    {evt.title}
                                </h3>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        <CalendarDays className="w-4 h-4" />
                                        <span>{evt.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        <MapPin className="w-4 h-4" />
                                        <span>{evt.location}</span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <button
                                    onClick={handleNavigateToEvents}
                                    className="w-full py-3 rounded-xl font-bold transition-colors border uppercase tracking-widest text-xs hover:opacity-80"
                                    style={{ 
                                        backgroundColor: 'var(--bg-tertiary)', 
                                        color: 'var(--text-primary)', 
                                        borderColor: 'var(--border-color)' 
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Events Button */}
                <div className="text-center">
                    <button
                        onClick={handleNavigateToEvents}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105"
                        style={{ 
                            backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6',
                            color: '#ffffff'
                        }}
                    >
                        View All Events
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Events;
