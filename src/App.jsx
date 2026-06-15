import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactSupport = lazy(() => import('./pages/ContactSupport'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
            <div className="flex flex-col items-center gap-3">
                <Loader2 size={36} className="animate-spin text-brand-600" />
                <p className="text-sm font-semibold text-slate-500 tracking-wide">Loading Mitra...</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/support" element={<ContactSupport />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
