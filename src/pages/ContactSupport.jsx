import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Landmark, Send, CheckCircle2, MessageSquare, Mail, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactSupport() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('inquiry');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('https://formspree.io/f/xlgkzwww', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    category: category,
                    message: message
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("Failed to submit support ticket. Please try again.");
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("An error occurred. Please check your network and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white shadow-md">
                            <Landmark size={22} />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 leading-tight">GujGov Mitra</h1>
                            <p className="text-xs text-brand-600 font-medium">Contact Support</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full grid md:grid-cols-5 gap-8 items-start">
                {/* Contact Info Sidebar */}
                <div className="md:col-span-2 space-y-6 text-slate-600">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
                        <p className="text-sm">Have feedback or encountered issues using the chatbot? Let us know!</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl mt-0.5">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                                <a href="mailto:support@gujgovmitra.in" className="text-slate-800 font-semibold text-sm hover:underline">
                                    support@gujgovmitra.in
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl mt-0.5">
                                <MessageSquare size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Operations</p>
                                <p className="text-slate-800 text-sm font-semibold">Available 24/7 online</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl mt-0.5">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                                <p className="text-slate-800 text-sm font-semibold">Gandhinagar, Gujarat, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="md:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form 
                                key="contact-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit} 
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Query Category</label>
                                    <select
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all"
                                    >
                                        <option value="inquiry">General Inquiry</option>
                                        <option value="scheme">Report Missing Government Scheme</option>
                                        <option value="bug">Report System Bug or Error</option>
                                        <option value="feedback">Provide General Feedback</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Message Description</label>
                                    <textarea
                                        required
                                        rows={5}
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all resize-none"
                                        placeholder="Provide detailed description of your query/feedback..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white py-3 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <Send size={16} />
                                    {isSubmitting ? 'Sending Request...' : 'Submit Support Ticket'}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="success-state"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-8 flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-inner">
                                    <CheckCircle2 size={36} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Support Ticket Created</h3>
                                <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
                                    Thank you, <strong>{name}</strong>! We have received your query. Our operations support team will review it and follow up at <strong>{email}</strong> shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setName('');
                                        setEmail('');
                                        setMessage('');
                                    }}
                                    className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
                                >
                                    Submit another request
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-6 border-t border-slate-800 text-center text-slate-500 text-xs sm:text-sm shrink-0 space-y-2">
                <p>© {new Date().getFullYear()} GujGov Mitra. All rights reserved.</p>
                <p className="text-slate-500 text-[11px] sm:text-xs flex items-center justify-center gap-1">
                    Designed & Developed by{' '}
                    <a
                        href="https://yash635644.github.io/yash-portfolio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-brand-400 transition-colors inline-flex items-center gap-0.5"
                    >
                        Yash Trivedi <ExternalLink size={12} />
                    </a>
                </p>
            </footer>
        </div>
    );
}
