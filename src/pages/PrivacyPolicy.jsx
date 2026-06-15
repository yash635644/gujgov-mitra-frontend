import { Link } from 'react-router-dom';
import { ArrowLeft, Landmark, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
                            <p className="text-xs text-brand-600 font-medium">Privacy Policy</p>
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
                            <ShieldCheck size={28} className="text-brand-500" />
                            Privacy Policy
                        </h2>
                        <p className="text-xs text-slate-400 mt-2">Last Updated: June 15, 2026</p>
                    </div>

                    <p>
                        Welcome to **GujGov Mitra**. We are committed to protecting your privacy. This Privacy Policy details how we handle user data when you visit and interact with our citizen guidance chatbot application.
                    </p>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">1. Information We Collect</h3>
                        <p>
                            We prioritize data minimization. We do not require account registration, names, phone numbers, or residential addresses to use the chat assistant. The only data processed includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5">
                            <li><strong>Chat Conversation Logs:</strong> We store user query texts and AI responses in our database to analyze search queries and optimize our RAG index (e.g., matching missing scheme descriptions).</li>
                            <li><strong>Audio Recording Data:</strong> When using voice transcription, speech files are captured by your browser and processed temporarily in memory by our secure voice transcription service. We do **not** store speech recordings on our servers.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">2. How We Use Information</h3>
                        <p>
                            Collected chat logs are processed exclusively to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5">
                            <li>Provide conversational support answers regarding government services.</li>
                            <li>Detect and prevent search rate limit abuses (DDOS prevention).</li>
                            <li>Create analytics reports for admin dashboard indexing (e.g., calculating query volume and AI failure rates).</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">3. Third-Party Data Processing</h3>
                        <p>
                            To generate answers, chat context is passed securely to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5">
                            <li><strong>Advanced Language Model API:</strong> For natural language answer generation.</li>
                            <li><strong>Voice Processing API:</strong> For fast speech-to-text conversion.</li>
                        </ul>
                        <p>
                            These third-party platforms handle queries in accordance with their respective developer privacy policies. We do not sell or lease logs to external marketing agencies.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">4. Data Retention</h3>
                        <p>
                            In order to keep the RAG system clean, chat logs are temporarily retained. Our database runs an automated daily cleanup process which automatically deletes all records older than **23 days**.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h3 className="font-bold text-slate-800 text-lg">5. Security</h3>
                        <p>
                            We employ SSL encryption (HTTPS) across all network traffic between our frontends and backend servers to protect data transit. Please do not type sensitive personal documents (like full Aadhaar numbers, card passwords, or financial links) into the open AI chatbot.
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
