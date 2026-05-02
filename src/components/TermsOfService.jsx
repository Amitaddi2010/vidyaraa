import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TermsOfService = () => {
    const { theme } = useTheme();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-12 pb-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                 style={{ backgroundColor: theme === 'light' ? 'rgba(251, 146, 60, 0.1)' : 'rgba(99, 102, 241, 0.1)' }}></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                 style={{ backgroundColor: theme === 'light' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(147, 51, 234, 0.1)' }}></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.1, borderColor: 'var(--accent-primary)', borderWidth: '1px', borderStyle: 'solid' }}>
                        <ShieldCheck className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
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
                            <Scale className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                            1. Acceptance of Terms
                        </h2>
                        <p className="mb-4">
                            By accessing or using the Vidyaraa AI Initiative website and its services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                            2. User Conduct
                        </h2>
                        <p className="mb-4">
                            Vidyaraa is a platform for collaboration and learning. Users are expected to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                            <li>Provide accurate information during registration.</li>
                            <li>Respect intellectual property rights of others.</li>
                            <li>Engage in professional and respectful communication.</li>
                            <li>Not use the platform for any unlawful activities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                            <AlertCircle className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                            3. Limitation of Liability
                        </h2>
                        <p className="mb-4">
                            Vidyaraa AI Initiative provides information and educational content "as is." While we strive for excellence, we are not liable for any direct or indirect damages arising from the use of our website or participation in our programs.
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderWidth: '1px', borderStyle: 'solid' }}>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Governing Law</h2>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            These terms are governed by and construed in accordance with the laws applicable in Jammu & Kashmir, India.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
