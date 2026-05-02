import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, Users, Clock, ArrowRight, ExternalLink, Filter, X, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const EventsPage = () => {
    const { theme } = useTheme();
    const [selectedFilter, setSelectedFilter] = React.useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxEventId, setLightboxEventId] = useState(null);
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
    const [expandedEvents, setExpandedEvents] = useState({});

    const events = [
        {
            id: 1,
            type: "Partnership",
            title: "Something BIG",
            date: "May 2026",
            location: "Jammu",
            status: "Coming Soon",
            active: true,
            image: "/events/partnership/question-mark.jpg",
            description: "A major partnership announcement that will reshape AI education in Jammu & Kashmir. The future is coming.",
            highlights: [
                "Revolutionary collaboration",
                "Game-changing impact",
                "First-of-its-kind for J&K"
            ],
            registrationLink: null,
            capacity: 0,
            registered: 0
        },
        {
            id: 2,
            type: "Workshop",
            title: "Build with AI: Workshop on Google AI Tools",
            date: "April 11, 2026",
            location: "University of Jammu - Department of Computer Science & IT",
            status: "Completed",
            active: false,
            image: "/events/workshops/google-ai-tools-1.jpg",
            description: "Vidyaraa, in collaboration with University of Jammu Department of Computer Science & IT and Google Developer Group Jammu, successfully organized this dynamic one-day learning experience focused on the future of AI innovation. The workshop featured engaging hands-on sessions, live demonstrations, practical AI use cases, and interactive discussions led by talented speakers and community experts.",
            highlights: [
                "Inaugurated by Prof. Vibhakar Mansotra, Head Department of Computer Science & IT",
                "Expert sessions by Abhinandan Trilokia & Atul S. from GDG Jammu",
                "Hands-on AI tool demonstrations and practical implementations",
                "Interactive discussions on AI innovation and industry applications",
                "Enthusiastic participation from MCA, M Tech students, and research scholars",
                "Collaboration between academia and industry to bridge the technology gap"
            ],
            registrationLink: null,
            capacity: 120,
            registered: 120
        },
        {
            id: 3,
            type: "Workshop",
            title: "AI Tools Masterclass",
            date: "March 18, 2026",
            location: "Department of CS & IT, Bhaderwah Campus, University of Jammu",
            status: "Completed",
            active: false,
            image: "/events/workshops/ai-tools-1.jpg",
            description: "Vidyaraa successfully organized an AI Tools Masterclass at the Department of CS & IT, Bhaderwah Campus, University of Jammu. The workshop brought together students eager to explore Artificial Intelligence, Machine Learning, and modern development tools shaping the future of technology. This hands-on learning experience featured expert sessions on AI automation, prompt engineering, and career guidance in the AI field.",
            highlights: [
                "Expert sessions by Rajan Jha and Karan Dalal on industry knowledge",
                "Introduction to AI & real-world applications",
                "Hands-on learning with AI tools and practical implementations",
                "GitHub workflow session for version control and collaboration",
                "Vercel deployment session for modern web applications",
                "AI automation & prompt engineering techniques",
                "Career guidance in AI and interactive Q&A session",
                "Collaboration with HackwithIndia and Devnovate for resources"
            ],
            registrationLink: null,
            capacity: 35,
            registered: 35
        }
    ];

    const filteredEvents = selectedFilter === 'all' 
        ? events 
        : events.filter(event => event.type.toLowerCase() === selectedFilter.toLowerCase());

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return theme === 'light' ? '#16a34a' : '#4ade80';
            case 'Upcoming':
                return theme === 'light' ? '#ea580c' : '#fb923c';
            case 'Planning':
                return theme === 'light' ? '#2563eb' : '#3b82f6';
            case 'Coming Soon':
                return theme === 'light' ? '#7c3aed' : '#8b5cf6';
            default:
                return theme === 'light' ? '#6b7280' : '#9ca3af';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Workshop':
                return theme === 'light' ? '#dc2626' : '#ef4444';
            case 'Conference':
                return theme === 'light' ? '#7c3aed' : '#8b5cf6';
            case 'Hackathon':
                return theme === 'light' ? '#059669' : '#10b981';
            case 'Partnership':
                return theme === 'light' ? '#ea580c' : '#fb923c';
            default:
                return theme === 'light' ? '#6b7280' : '#9ca3af';
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Lightbox functions
    const openLightbox = (eventId, imageIndex) => {
        const event = events.find(e => e.id === eventId);
        if (event) {
            const imageUrl = imageIndex === 0 
                ? event.image 
                : event.image.replace('-1.jpg', `-${imageIndex}.jpg`);
            setLightboxImage(imageUrl);
            setLightboxEventId(eventId);
            setLightboxImageIndex(imageIndex);
        }
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxEventId(null);
        setLightboxImageIndex(0);
    };

    const navigateImage = (direction) => {
        if (direction === 'next') {
            if (lightboxImageIndex < 5) {
                openLightbox(lightboxEventId, lightboxImageIndex + 1);
            }
        } else {
            if (lightboxImageIndex > 0) {
                openLightbox(lightboxEventId, lightboxImageIndex - 1);
            }
        }
    };

    // Toggle event expansion
    const toggleEventExpansion = (eventId) => {
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    // Handle keyboard navigation and prevent body scroll
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (lightboxImage) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') navigateImage('next');
                if (e.key === 'ArrowLeft') navigateImage('prev');
            }
        };

        // Prevent body scroll when lightbox is open
        if (lightboxImage) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            // Cleanup body styles on unmount
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [lightboxImage, lightboxImageIndex, lightboxEventId]);

    return (
        <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Background Glows - Subtle */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
                     style={{ background: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(139, 92, 246, 0.2)' }}></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
                     style={{ background: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(139, 92, 246, 0.2)' }}></div>
            </div>

            <div className="relative z-10">
                {/* Header - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center px-4 py-12 md:py-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <img 
                            src={theme === 'light' ? '/VidyaraaLogo-light.PNG' : '/VidyaraaLogo-dark.PNG'}
                            alt="Vidyaraa Logo"
                            className="h-12 md:h-16 w-auto"
                        />
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
                            style={{ color: 'var(--text-primary)' }}>
                            All Events
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}>
                        Explore our complete lineup of AI events, workshops, and partnerships.
                    </p>
                </motion.div>

                {/* Filter Tabs - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-8 px-4"
                >
                    {['all', 'workshop', 'conference', 'hackathon', 'partnership'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                                selectedFilter === filter 
                                    ? 'scale-105' 
                                    : 'hover:scale-105'
                            }`}
                            style={{
                                backgroundColor: selectedFilter === filter 
                                    ? (theme === 'light' ? '#f97316' : '#8b5cf6')
                                    : 'var(--bg-secondary)',
                                color: selectedFilter === filter 
                                    ? '#ffffff' 
                                    : 'var(--text-primary)',
                                border: selectedFilter === filter 
                                    ? 'none'
                                    : `1px solid var(--border-color)`
                            }}
                        >
                            {filter === 'all' ? 'All Events' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Events Grid - Compact Cards */}
                <div className="max-w-6xl mx-auto px-4 pb-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300"
                                style={{ 
                                    backgroundColor: 'var(--card-bg)', 
                                    borderColor: event.active 
                                        ? (theme === 'light' ? '#f97316' : '#8b5cf6') 
                                        : 'var(--border-color)' 
                                }}
                                                            >
                                {/* Image Section - Compact */}
                                <div className="relative h-48">
                                    <img 
                                        src={event.image} 
                                        alt={event.title}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                        onClick={() => openLightbox(event.id, 0)}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback for missing images */}
                                    <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                                        <div className="text-center">
                                            <CalendarDays className="w-12 h-12 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                                            <p style={{ color: 'var(--text-muted)' }} className="text-sm">Event Image</p>
                                        </div>
                                    </div>
                                    
                                    {/* Status and Type Badges - Compact */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <div className="px-2 py-1 rounded-full text-xs font-bold"
                                             style={{ backgroundColor: getStatusColor(event.status), color: '#ffffff' }}>
                                            {event.status}
                                        </div>
                                        <div className="px-2 py-1 rounded-full text-xs font-bold"
                                             style={{ backgroundColor: getTypeColor(event.type), color: '#ffffff' }}>
                                            {event.type}
                                        </div>
                                    </div>
                                    
                                    {/* Zoom Indicator */}
                                    <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                                        <ZoomIn className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Content Section - Compact */}
                                <div className="p-5">
                                    <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight"
                                        style={{ color: 'var(--text-primary)' }}>
                                        {event.title}
                                    </h3>
                                    
                                    <div className="mb-4">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={expandedEvents[event.id] ? 'expanded' : 'collapsed'}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-sm leading-relaxed overflow-hidden"
                                                style={{ 
                                                    color: 'var(--text-muted)',
                                                    display: expandedEvents[event.id] ? 'block' : '-webkit-box',
                                                    WebkitLineClamp: expandedEvents[event.id] ? 'unset' : 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: expandedEvents[event.id] ? 'visible' : 'hidden'
                                                }}
                                            >
                                                {event.description}
                                            </motion.p>
                                        </AnimatePresence>
                                        
                                        {event.description.length > 150 && (
                                            <button
                                                onClick={() => toggleEventExpansion(event.id)}
                                                className="flex items-center gap-1 text-xs mt-2 transition-colors hover:opacity-80"
                                                style={{ color: theme === 'light' ? '#f97316' : '#8b5cf6' }}
                                            >
                                                {expandedEvents[event.id] ? (
                                                    <>
                                                        <ChevronUp className="w-3 h-3" />
                                                        Show less
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-3 h-3" />
                                                        Read more
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Event Details - Compact */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                            <CalendarDays className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                            <MapPin className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                            <Users className="w-3 h-3" style={{ color: 'var(--text-primary)' }} />
                                            <span>{event.registered}/{event.capacity} registered</span>
                                        </div>
                                    </div>

                                    {/* Event Highlights - Compact */}
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>
                                            Highlights
                                        </h4>
                                        <AnimatePresence mode="wait">
                                            <motion.ul
                                                key={expandedEvents[event.id] ? 'highlights-expanded' : 'highlights-collapsed'}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-1 overflow-hidden"
                                            >
                                                {(expandedEvents[event.id] ? event.highlights : event.highlights.slice(0, 2)).map((highlight, idx) => (
                                                    <li key={idx} className="flex items-start gap-1" style={{ color: 'var(--text-muted)' }}>
                                                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" 
                                                              style={{ backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6' }}></span>
                                                        <span className="text-xs">{highlight}</span>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        </AnimatePresence>
                                        
                                        {event.highlights.length > 2 && (
                                            <button
                                                onClick={() => toggleEventExpansion(event.id)}
                                                className="flex items-center gap-1 text-xs mt-2 transition-colors hover:opacity-80"
                                                style={{ color: theme === 'light' ? '#f97316' : '#8b5cf6' }}
                                            >
                                                {expandedEvents[event.id] ? (
                                                    <>
                                                        <ChevronUp className="w-3 h-3" />
                                                        Show less
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-3 h-3" />
                                                        View all {event.highlights.length} highlights
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Compact Gallery - Only for workshops, not partnership announcements */}
                                    {event.type !== 'Partnership' && (
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>
                                                Gallery
                                            </h4>
                                            <div className="grid grid-cols-4 gap-1">
                                            {[1, 2, 3, 4].map((imgNum) => (
                                                <div key={imgNum} className="relative aspect-square rounded overflow-hidden group cursor-pointer">
                                                    <img 
                                                        src={event.image.replace('-1.jpg', `-${imgNum}.jpg`)}
                                                        alt={`${event.title} - Image ${imgNum}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        onClick={() => openLightbox(event.id, imgNum)}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    {/* Fallback */}
                                                    <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                                                        <CalendarDays className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                    )}

                                    {/* Footer - Compact */}
                                    <div className="flex items-center justify-between pt-3 border-t"
                                         style={{ borderColor: 'var(--border-color)' }}>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {event.status === 'Completed' ? 'Ended' : 
                                                 event.status === 'Planning' ? 'Planning' :
                                                 event.status === 'Upcoming' ? 'Open' : 'Soon'}
                                            </span>
                                        </div>
                                        {event.registrationLink ? (
                                            <motion.a
                                                href={event.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                                style={{
                                                    backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6',
                                                    color: '#ffffff'
                                                }}
                                            >
                                                Register
                                            </motion.a>
                                        ) : (
                                            <div className="text-xs px-3 py-1.5 rounded-lg font-bold"
                                                 style={{
                                                     backgroundColor: 'var(--bg-secondary)',
                                                     color: 'var(--text-muted)',
                                                     border: `1px solid ${theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(139, 92, 246, 0.2)'}`
                                                 }}>
                                                {event.status === 'Completed' ? 'Completed' : 'Closed'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </motion.div>
                        ))}
                    </div>

                    {/* Coming Soon Section - Compact */}
                    {filteredEvents.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 rounded-2xl border-2 border-dashed"
                             style={{ 
                                 backgroundColor: 'var(--card-bg)', 
                                 borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(139, 92, 246, 0.3)' 
                             }}>
                            <CalendarDays className="w-12 h-12 mx-auto mb-4" style={{ color: theme === 'light' ? '#f97316' : '#8b5cf6' }} />
                            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                No {selectedFilter === 'all' ? '' : selectedFilter} Events Yet
                            </h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                More exciting events are being planned. Stay tuned!
                            </p>
                        </motion.div>
                    )}

                    {/* Back to Home - Compact */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <Link 
                            to="/#events"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            Back to Events
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                        style={{ 
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100vw',
                            height: '100vh',
                            overflow: 'hidden'
                        }}
                        onClick={closeLightbox}
                    >
                        {/* Previous Button */}
                        {lightboxImageIndex > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('prev');
                                }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                                style={{ color: '#ffffff' }}
                            >
                                <ArrowRight className="w-6 h-6 rotate-180" />
                            </button>
                        )}

                        {/* Next Button */}
                        {lightboxImageIndex < 5 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage('next');
                                }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                                style={{ color: '#ffffff' }}
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        )}

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={lightboxImage} 
                                alt={`Event image ${lightboxImageIndex + 1}`}
                                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                                style={{ 
                                    maxHeight: '85vh',
                                    maxWidth: '90vw'
                                }}
                            />
                            
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all hover:scale-110 z-10"
                                style={{ color: '#ffffff' }}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm z-10"
                                 style={{ color: '#ffffff' }}>
                                <span className="text-sm font-medium">
                                    {lightboxImageIndex + 1} / 6
                                </span>
                            </div>
                        </motion.div>

                        {/* Navigation Hints */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 text-white/70 text-sm z-10">
                            <span>← Arrow keys to navigate</span>
                            <span>ESC to close</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsPage;
