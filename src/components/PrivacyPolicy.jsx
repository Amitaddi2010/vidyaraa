import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#020202] min-h-screen pt-12 pb-24 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-6">
                        <Shield className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
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
                            <Lock className="w-6 h-6 text-purple-400" />
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            At Vidyaraa AI Initiative, we are committed to protecting your privacy. We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400 text-sm">
                            <li>Register for our programs or events.</li>
                            <li>Sign up for our newsletter.</li>
                            <li>Participate in our surveys or research initiatives.</li>
                            <li>Contact us through our website or email.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-purple-400" />
                            2. How We Use Your Information
                        </h2>
                        <p className="mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400 text-sm">
                            <li>Provide and maintain our educational and research services.</li>
                            <li>Communicate with you about updates, events, and opportunities.</li>
                            <li>Improve our platform and analyze user engagement in the region.</li>
                            <li>Ensure the security and integrity of our systems.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-purple-400" />
                            3. Data Security and Retention
                        </h2>
                        <p className="mb-4">
                            We implement industry-standard security measures to protect your data. We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
                        </p>
                        <p className="text-slate-400 text-sm italic">
                            Vidyaraa AI Initiative does not sell, trade, or rent your personal information to third parties.
                        </p>
                    </section>

                    <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                        <h2 className="text-xl font-semibold text-white mb-4">Questions or Concerns?</h2>
                        <p className="text-slate-400 text-sm mb-6">
                            If you have any questions about this Privacy Policy or our data practices, please reach out to our team.
                        </p>
                        <button className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all">
                            Contact Us
                        </button>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
