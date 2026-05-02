import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
    const { theme } = useTheme();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                 style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(147, 51, 234, 0.1)' }}></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                 style={{ backgroundColor: theme === 'light' ? 'rgba(251, 146, 60, 0.1)' : 'rgba(99, 102, 241, 0.1)' }}></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(147, 51, 234, 0.1)', borderColor: theme === 'light' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(147, 51, 234, 0.2)', borderWidth: '1px', borderStyle: 'solid' }}>
                        <Shield className="w-8 h-8" style={{ color: theme === 'light' ? '#f97316' : '#a78bfa' }} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Last updated: March 7, 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-12 leading-relaxed" style={{ color: 'var(--text-muted)' }}
                >
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <Lock className="w-6 h-6" style={{ color: theme === 'light' ? '#f97316' : '#a78bfa' }} />
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            At Vidyaraa AI Initiative, we are committed to protecting your privacy. We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <li>Register for our programs or events.</li>
                            <li>Sign up for our newsletter.</li>
                            <li>Participate in our surveys or research initiatives.</li>
                            <li>Contact us through our website or email.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <Eye className="w-6 h-6" style={{ color: theme === 'light' ? '#f97316' : '#a78bfa' }} />
                            2. How We Use Your Information
                        </h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <li>Provide and maintain our educational and research services.</li>
                            <li>Communicate with you about updates, events, and opportunities.</li>
                            <li>Improve our platform and analyze user engagement in the region.</li>
                            <li>Ensure the security and integrity of our systems.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <FileText className="w-6 h-6" style={{ color: theme === 'light' ? '#f97316' : '#a78bfa' }} />
                            3. Data Security and Retention
                        </h2>
                        <p className="mb-4">
                            We implement industry-standard security measures to protect your data. We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
                        </p>
                        <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
                            Vidyaraa AI Initiative does not sell, trade, or rent your personal information to third parties.
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Questions or Concerns?</h2>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                            If you have any questions about this Privacy Policy or our data practices, please reach out to our team.
                        </p>
                        <Link 
                            to="/contact"
                            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all inline-block"
                            style={{ backgroundColor: theme === 'light' ? '#f97316' : '#8b5cf6', color: '#ffffff' }}
                        >
                            Contact Us
                        </Link>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
