import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, ShieldCheck, Heart, Cpu, Landmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutUs() {
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
                            <p className="text-xs text-brand-600 font-medium">About Our Platform</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full space-y-12">
                {/* Intro Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Empowering Citizens Through Information
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        GujGov Mitra is an independent, AI-powered conversational assistant designed to bridge the gap between citizens and Gujarat government schemes, processes, and services.
                    </p>
                </motion.div>

                {/* Core Mission Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4"
                    >
                        <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                            <Heart size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Citizen Focused</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Simplifying complex guidelines and legal terms into clear, actionable, and friendly steps in English, Gujarati, and Hindi.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4"
                    >
                        <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                            <Cpu size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Powered by AI</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Leveraging advanced LLMs combined with a retrieval database (RAG) and Live Search to answer questions quickly and accurately.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4"
                    >
                        <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Trust & Clarity</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Validating instructions against official sources and helping you find the direct links to apply without middleman risks.
                        </p>
                    </motion.div>
                </div>

                {/* Tech & Data Flow */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Bot size={22} className="text-brand-500" />
                        How GujGov Mitra Works
                    </h3>
                    <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                        <p>
                            Our platform utilizes a cutting-edge hybrid search architecture called **RAG (Retrieval-Augmented Generation)**:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Knowledge Database:</strong> We continuously scrape official portals for scheme rules, document lists, and steps, converting them into mathematical vectors stored in our secure, encrypted vector database.
                            </li>
                            <li>
                                <strong>Contextual Matching:</strong> When you type a query, the system identifies the most relevant guidelines from the database using mathematical similarity search.
                            </li>
                            <li>
                                <strong>AI Formulation:</strong> Our backend passes the matching context to our advanced language model, which compiles a clear response in your query's language.
                            </li>
                            <li>
                                <strong>Live Search Fallback:</strong> For breaking news or CM announcements, the AI invokes Google Search to fetch up-to-the-minute web information.
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Disclaimer Alert */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-slate-600 text-xs sm:text-sm leading-relaxed"
                >
                    <p className="font-bold text-slate-800 mb-1">⚠️ Disclaimer Statement</p>
                    GujGov Mitra is an independent public-assistance project. We are not directly affiliated with, authorized, or endorsed by the Government of Gujarat or the Government of India. The platform is designed solely to guide and inform citizens. While we do our best to keep information accurate, guidelines change frequently. Always verify important rules, fees, and requirements on official portals before submitting any official applications or sharing sensitive personal records.
                </motion.div>
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
