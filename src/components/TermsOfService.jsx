import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#020202] min-h-screen pt-12 pb-24 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <ShieldCheck className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-slate-400 text-lg">Last updated: March 7, 2026</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <Scale className="w-6 h-6 text-indigo-400" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="mb-4">
                            By accessing or using the Vidyaraa AI Initiative website and its services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                            2. User Conduct
                        </h2>
                        <p className="mb-4">
                            Vidyaraa is a platform for collaboration and learning. Users are expected to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400 text-sm">
                            <li>Provide accurate information during registration.</li>
                            <li>Respect intellectual property rights of others.</li>
                            <li>Engage in professional and respectful communication.</li>
                            <li>Not use the platform for any unlawful activities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-indigo-400" />
                            3. Limitation of Liability
                        </h2>
                        <p className="mb-4">
                            Vidyaraa AI Initiative provides information and educational content "as is." While we strive for excellence, we are not liable for any direct or indirect damages arising from the use of our website or participation in our programs.
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                        <h2 className="text-xl font-semibold text-white mb-4">Governing Law</h2>
                        <p className="text-slate-400 text-sm">
                            These terms are governed by and construed in accordance with the laws applicable in Jammu & Kashmir, India.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
