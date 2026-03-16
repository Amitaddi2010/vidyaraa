import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, Phone } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus('');
        
        try {
            // Replace with your EmailJS service details
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'vidyaraaai@gmail.com'
            };
            
            // Replace with your EmailJS service ID, template ID, and public key
            await emailjs.send(
                'service_3zuq49r',
                'template_3ikl01d',
                templateParams,
                '_C4M4xSjytymHQtHC'
            );
            
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
            
        } catch (error) {
            console.error('Failed to send email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#020202] min-h-screen py-32 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-tight"
                        >
                            Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI Future</span> Together
                        </motion.h1>
                        <p className="text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
                            Have questions about our initiatives, research collaborations, or want to join the Vidyaraa ecosystem? Reach out to our team.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                                    <Mail className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                                    <p className="text-slate-400">vidyaraaai@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Regional Focus</h4>
                                    <p className="text-slate-400">Jammu & Kashmir, India</p>
                                    <p className="text-slate-500 text-sm">Empowering the next generation of AI innovators.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                                    <Linkedin className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Community</h4>
                                    <p className="text-slate-400">Join our LinkedIn for real-time updates.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-[80px] -z-10"></div>
                        <div className="p-8 md:p-10 rounded-[32px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 ml-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={`w-full bg-white/[0.03] border rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                                                errors.name 
                                                    ? 'border-red-500/50 focus:border-red-500/50' 
                                                    : 'border-white/10 focus:border-purple-500/50'
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className={`w-full bg-white/[0.03] border rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                                                errors.email 
                                                    ? 'border-red-500/50 focus:border-red-500/50' 
                                                    : 'border-white/10 focus:border-purple-500/50'
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="How can we help you?"
                                        className={`w-full bg-white/[0.03] border rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                                            errors.message 
                                                ? 'border-red-500/50 focus:border-red-500/50' 
                                                : 'border-white/10 focus:border-purple-500/50'
                                        }`}
                                    ></textarea>
                                    {errors.message && (
                                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                                        <p className="text-green-400 text-center">Message sent successfully! We'll get back to you soon.</p>
                                    </div>
                                )}
                                
                                {submitStatus === 'error' && (
                                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full group relative px-8 py-5 rounded-2xl bg-white text-black font-bold text-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </button>
                                <p className="text-center text-slate-500 text-sm">
                                    Our team typically responds within 24-48 hours.
                                </p>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
