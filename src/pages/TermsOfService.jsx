import { Link } from 'react-router-dom';
import { ArrowLeft, Landmark, Scale, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
                            <p className="text-xs text-brand-600 font-medium">Terms of Service</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-3xl mx-auto px-6 py-12 w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed"
                >
                    <div className="border-b border-slate-100 pb-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <Scale size={28} className="text-brand-500" />
                            Terms of Service
                        </h2>
                        <p className="text-xs text-slate-400 mt-2">Last Updated: June 15, 2026</p>
                    </div>

                    <p>
                        By accessing or using the **GujGov Mitra** chatbot assistant (the "Service"), you agree to comply with and be bound by the following terms. Please read these terms carefully.
                    </p>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">1. Description of Service</h3>
                        <p>
                            GujGov Mitra is a civic technology demonstration platform that provides AI-assisted responses regarding public services and schemes of the Government of Gujarat and Central India. The Service leverages RAG database indexing and third-party APIs to deliver conversational explanations.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">2. No Official Status & Disclaimers</h3>
                        <ul className="list-disc pl-6 space-y-1.5">
                            <li><strong>Non-Governmental:</strong> GujGov Mitra is an independent public utility app. It is **not** an official government service, nor is it associated with or endorsed by any department of the Government of Gujarat or India.</li>
                            <li><strong>Accuracy of AI:</strong> Responses are generated using deep learning models. Artificial intelligence can make mistakes, overlook updates, or hallucinate details. You must check and verify official guidelines, fee configurations, and dates on official domains (such as Digital Gujarat or UIDAI portals) before submitting applications.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">3. Acceptable Use</h3>
                        <p>
                            When using the Service, you agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5">
                            <li>Attempt to crash, DDOS, or flood the API endpoints (abuses are blocked by rate limiters).</li>
                            <li>Input malicious code, execute scripts, or use automated scrapers to query the chatbot.</li>
                            <li>Inject highly sensitive personal document details, banking credentials, or offensive phrases into the chat dialogue.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">4. Limitation of Liability</h3>
                        <p>
                            Under no circumstances shall the creators, developers, or hosting providers of GujGov Mitra be held liable for any loss, damage, penalty, or inconvenience resulting from your reliance on chatbot responses or the temporary unavailability of the web platform.
                        </p>
                    </section>
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
