import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, FileText, Landmark, ShieldCheck, Search, ChevronDown, CheckCircle, HelpCircle, Globe, Award, Zap, Mic, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: delay }}
        className="glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
    >
        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4 text-brand-600 shadow-inner">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
);

export default function LandingPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/chat', { state: { initialQuery: searchQuery } });
        }
    };

    const handleTrendingClick = (query) => {
        navigate('/chat', { state: { initialQuery: query } });
    };

    const faqs = [
        {
            question: "Is GujGov Mitra free to use?",
            answer: "Yes, GujGov Mitra is completely free for all citizens. It is designed to make accessing government information easy and accessible for everyone."
        },
        {
            question: "Which languages are supported?",
            answer: "Currently, we support English, Gujarati, and Hindi. You can type your queries in your preferred language, and the AI will understand and respond accordingly."
        },
        {
            question: "Is it an official Government App?",
            answer: "No. This is an independent, AI-powered platform created to assist citizens. While we source data from official portals, you should always verify critical information."
        },
        {
            question: "Can it help me apply for documents directly?",
            answer: "While the bot cannot submit forms on your behalf, it provides the exact step-by-step processes, lists of required documents, and direct links to the official Govt portals where you can apply."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden relative font-sans flex flex-col">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-400/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-indigo-400/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20 w-full">
                {/* Navigation */}
                <nav className="flex justify-between items-center mb-12 sm:mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Landmark size={22} />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500 tracking-tight">
                            GujGov Mitra
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link to="/" className="text-slate-600 hover:text-brand-600 transition-colors">Home</Link>
                        <Link to="/chat" className="text-slate-600 hover:text-brand-600 transition-colors">Chat Assistant</Link>
                        <Link to="/about" className="text-slate-600 hover:text-brand-600 transition-colors">About Us</Link>
                        <Link to="/support" className="text-slate-600 hover:text-brand-600 transition-colors">Contact Support</Link>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <Link to="/chat" className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm">
                            Try Demo
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            AI Assistant for Citizens
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-6 sm:mb-8">
                            Your Friendly Guide to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Gujarat Gov</span> Services
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-xl">
                            Get instant answers, step-by-step processes, and direct links for Aadhaar, PAN, Land Records, and Government Schemes.
                        </p>

                        {/* Search Input Box */}
                        <form onSubmit={handleSearch} className="relative max-w-xl flex items-center mb-6 w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="E.g., How to apply for a new PAN card?"
                                className="w-full pl-5 pr-[110px] sm:pl-6 sm:pr-32 py-3.5 sm:py-4 rounded-full border-2 border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 text-base sm:text-lg shadow-sm transition-all outline-none text-slate-700 bg-white"
                            />
                            {/* Voice Search Button */}
                            <button
                                type="button"
                                onClick={() => navigate('/chat', { state: { startVoice: true } })}
                                className="absolute right-[90px] text-slate-400 hover:text-brand-500 transition-colors p-2 hidden sm:block"
                                title="Voice Search"
                            >
                                <Mic size={20} />
                            </button>

                            <button
                                type="submit"
                                className="absolute right-1.5 px-4 sm:px-6 rounded-full bottom-1.5 top-1.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-medium hover:from-brand-700 hover:to-brand-600 shadow-md transition-all whitespace-nowrap text-sm sm:text-base"
                            >
                                <span className="hidden sm:inline-block mr-2"><Search size={18} /></span>
                                Search
                            </button>
                        </form>

                        {/* Trending Chips */}
                        <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm font-medium text-slate-500">
                            <span>Trending:</span>
                            {['Aadhaar', 'PM Kisan', 'Income'].map((query) => (
                                <button
                                    key={query}
                                    onClick={() => handleTrendingClick(query)}
                                    className="bg-white border border-slate-200 px-3 py-1 rounded-full hover:border-brand-300 hover:text-brand-600 transition-colors shadow-sm"
                                >
                                    {query}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Image/Illustration */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative mt-8 lg:mt-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent rounded-3xl transform rotate-3 scale-105 blur-lg pointer-events-none"></div>
                        <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/60 shadow-2xl bg-white/80 backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200/50">
                                <div className="w-12 h-12 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-full flex items-center justify-center text-white shadow-md shrink-0">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">GujGov Mitra</h4>
                                    <p className="text-xs sm:text-sm text-green-600 flex items-center gap-1 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 font-sans">
                                <div className="flex gap-4 items-end">
                                    <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm text-slate-800 text-sm max-w-[85%] shadow-sm">
                                        મારે નવું આધાર કાર્ડ કઢાવવું છે, તો શું કરવું? <br />
                                        <span className="text-slate-500 text-[11px] mt-1 block">(How to get a new Aadhaar card?)</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-end flex-row-reverse">
                                    <div className="bg-brand-50 text-brand-900 border border-brand-100 px-4 py-3 rounded-2xl rounded-br-sm text-sm max-w-[90%] shadow-sm leading-relaxed">
                                        👋 નમસ્તે! નવા આધાર કાર્ડ માટેની પ્રક્રિયા ખૂબ જ સરળ છે.
                                        <br /><br />
                                        ✅ તમારે નજીકના <strong>આધાર કેન્દ્ર</strong> પર જવું પડશે.
                                        <br />
                                        📋 <strong>જરૂરી દસ્તાવેજો:</strong>
                                        <br />- ઓળખાણનો પુરાવો (મતદાન કાર્ડ, પાન કાર્ડ વગેરે)
                                        <br />- સરનામાનો પુરાવો (લાઇટ બિલ, બેંક પાસબુક)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <div className="absolute -right-2 sm:-right-6 top-6 sm:top-10 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2 sm:gap-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <ShieldCheck size={16} />
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-slate-700">100% Verified Info</div>
                        </div>
                    </motion.div>
                </main>

                {/* Features Section */}
                <motion.section
                    viewport={{ once: true }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 sm:mt-32 pt-10 border-t border-slate-200/50"
                >
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Everything You Need to Know</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg px-4">Get accurate guidance on government processes without the confusion or technical jargon.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <FeatureCard delay={0.1} icon={FileText} title="Documents & Certificates" description="Learn exactly which documents you need for Domicile, Income, Caste certificates and where to apply." />
                        <FeatureCard delay={0.2} icon={Landmark} title="Schemes & Benefits" description="Discover if you are eligible for schemes like PM Kisan, Ayushman Bharat, or Namo Saraswati Yojana." />
                        <FeatureCard delay={0.3} icon={Globe} title="Multilingual AI" description="Ask in Gujarati, English, or Hindi. The AI understands you and replies in the language you prefer." />
                    </div>
                </motion.section>

                {/* How It Works Section */}
                <section className="mt-24 sm:mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-200"
                    >
                        <div className="text-center mb-12 flex flex-col items-center">
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-xs sm:text-sm font-semibold mb-3">Workflow</span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                            <p className="text-slate-600 max-w-lg text-sm sm:text-base">3 simple steps to get accurate government information to your fingertips using our platform.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative mt-12 sm:mt-16">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-[2.25rem] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 z-0"></div>

                            {[
                                { step: 1, icon: HelpCircle, title: "Ask Your Question", desc: "Type or speak your query about any Gujarat Govt service." },
                                { step: 2, icon: Zap, title: "AI Analyzes Info", desc: "Our AI processes official guidelines and translates them into simple terms." },
                                { step: 3, icon: CheckCircle, title: "Get Clear Solutions", desc: "Receive step-by-step instructions and direct links to official portals." }
                            ].map((item, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-4 border-brand-50 rounded-full flex items-center justify-center shadow-lg mb-4 sm:mb-6 text-brand-500 relative transition-transform hover:scale-110 duration-300">
                                        <item.icon size={28} className="sm:w-8 sm:h-8" />
                                        <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs border-2 border-white">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[250px]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* FAQ Section */}
                <section className="mt-24 sm:mt-32 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm font-semibold mb-3">Support</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600 text-sm sm:text-base">Everything you need to know about how GujGov Mitra works.</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-brand-300 shadow-md' : 'border-slate-200 hover:border-brand-200'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                                >
                                    <span className="font-semibold text-slate-800 text-sm sm:text-base md:text-lg pr-4">{faq.question}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-brand-500' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 pb-5 sm:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base">{faq.answer}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-slate-800 z-10 w-full mt-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">
                        <div className="sm:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white shadow-lg">
                                    <Landmark size={20} />
                                </div>
                                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    GujGov Mitra
                                </span>
                            </div>
                            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed text-sm sm:text-base">
                                Empowering citizens of Gujarat with instant, accurate, and understandable information about government services.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Available 24/7
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <Award size={14} /> Official Sources
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Quick Links</h4>
                            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-400">
                                <li><Link to="/" className="hover:text-brand-400 transition-colors inline-block">Home</Link></li>
                                <li><Link to="/chat" className="hover:text-brand-400 transition-colors inline-block">Chat Assistant</Link></li>
                                <li><Link to="/about" className="hover:text-brand-400 transition-colors inline-block">About Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Legal & Connect</h4>
                            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-400">
                                <li><Link to="/privacy" className="hover:text-brand-400 transition-colors inline-block">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-brand-400 transition-colors inline-block">Terms of Service</Link></li>
                                <li><Link to="/support" className="hover:text-brand-400 transition-colors inline-block">Contact Support</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800/60 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div className="space-y-1">
                            <p className="text-slate-500 text-xs sm:text-sm">
                                © {new Date().getFullYear()} GujGov Mitra. All rights reserved.
                            </p>
                            <p className="text-slate-500 text-[11px] sm:text-xs flex items-center justify-center md:justify-start gap-1">
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
                        </div>
                        <p className="text-slate-500 text-[10px] sm:text-xs max-w-md">
                            Disclaimer: This is an independent platform assisting citizens. Not directly affiliated with or endorsed by the Government of Gujarat.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
