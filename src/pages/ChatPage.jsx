import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Send, Bot, User, ArrowLeft, Loader2, Sparkles, Mic, Square, Trash2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ChatPage() {
    const location = useLocation();
    const welcomeMessage = {
        role: 'model',
        content: '👋 નમસ્તે! હું ગુજગોવ મિત્ર છું. સરકારી યોજનાઓ, ડોક્યુમેન્ટ્સ અને અન્ય સેવાઓ વિશે કોઈ પણ પ્રશ્ન પૂછો.\n(Hello! I am GujGov Mitra. Ask me any question regarding government schemes, documents, and services.)'
    };

    const [messages, setMessages] = useState(() => {
        const localHistory = localStorage.getItem('gujgov_chat_history');
        if (localHistory) {
            try {
                return JSON.parse(localHistory);
            } catch (e) {
                console.error('Failed to parse local history', e);
            }
        }
        return [welcomeMessage];
    });

    useEffect(() => {
        localStorage.setItem('gujgov_chat_history', JSON.stringify(messages));
    }, [messages]);

    const clearChat = () => {
        if (window.confirm("Are you sure you want to clear this conversation history?")) {
            setMessages([welcomeMessage]);
        }
    };
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const hasSentInitialRef = useRef(false);
    const textareaRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendQuery = async (queryText) => {
        if (!queryText.trim() || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', content: queryText }]);
        setIsLoading(true);

        try {
            // Filter out leading 'model' messages — Gemini requires history to start with 'user'
            let history = messages.slice(-4);
            const firstUserIdx = history.findIndex(m => m.role === 'user');
            history = firstUserIdx !== -1 ? history.slice(firstUserIdx) : [];

            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: queryText,
                history: history
            });

            setMessages(prev => [...prev, { role: 'model', content: response.data.response }]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMsg = error.response?.data?.error || "Sorry, I couldn't process your request right now. Please try again.";
            setMessages(prev => [...prev, { role: 'model', content: `⚠️ **Error:** ${errorMsg}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (location.state?.initialQuery && !hasSentInitialRef.current) {
            hasSentInitialRef.current = true;
            sendQuery(location.state.initialQuery);
        } else if (location.state?.startVoice && !hasSentInitialRef.current) {
            hasSentInitialRef.current = true;
            startRecording();
        }
    }, [location.state]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            let options = { mimeType: 'audio/webm' };
            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                options = { mimeType: 'audio/mp4' }; // fallback for Safari
            }
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const mimeType = mediaRecorder.mimeType || 'audio/webm';
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                await handleAudioUpload(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please ensure permissions are granted.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleAudioUpload = async (audioBlob) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/transcribe`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data && response.data.text) {
                const transcribedText = response.data.text.trim();
                setInput(transcribedText);
                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    // We trigger a slight delay to let DOM paint the new string before adjusting height
                    setTimeout(() => {
                        if (textareaRef.current) {
                            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
                        }
                    }, 50);
                }
            }
        } catch (error) {
            console.error('Transcription error:', error);
            alert('Failed to transcribe audio. Ensure the backend is active and microphone access is allowed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const userMessage = input.trim();
        setInput('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height on submit
        }
        await sendQuery(userMessage);
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isLoading) {
                handleSubmit(e);
            }
        }
    };

    const suggestions = [
        "મારે નવું આધાર કાર્ડ કઢાવવું છે",
        "How to link PAN with Aadhaar?",
        "જન્મનો દાખલો કેવી રીતે કઢાવવો?",
        "PM Kisan Yojana status"
    ];

    return (
        <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white shadow-md">
                            <Bot size={22} />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-800 leading-tight">GujGov Mitra</h1>
                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                AI Assistant
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                        Powered by Secure AI
                        <Sparkles size={14} className="ml-1.5 text-brand-500" />
                    </div>
                    {messages.length > 1 && (
                        <button
                            onClick={clearChat}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center shrink-0"
                            title="Clear Chat History"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth bg-slate-50">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
                ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-brand-500 text-white'}`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm
                ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-tr-sm'
                                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm prose prose-sm max-w-none'}`}>
                                {msg.role === 'user' ? (
                                    <div className="text-sm sm:text-base leading-relaxed">{msg.content}</div>
                                ) : (
                                    <div
                                        className="markdown-body"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.content || ' ', { async: false })) }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-4 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2 text-slate-500">
                                <Loader2 size={18} className="animate-spin text-brand-500" />
                                <span className="text-sm font-medium">Mitra is typing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4 shrink-0">
                <div className="max-w-3xl mx-auto space-y-3">

                    {/* Quick Suggestions */}
                    {messages.length === 1 && (
                        <div className="flex flex-wrap gap-2 animate-slide-up">
                            {suggestions.map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(suggestion)}
                                    className="text-xs sm:text-sm bg-brand-50 text-brand-700 border border-brand-100 hover:bg-brand-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex gap-2 relative items-end">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything in English, Gujarati, or Hindi..."
                            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl px-5 py-3 sm:px-6 sm:py-4 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 resize-none overflow-y-auto"
                            disabled={isLoading}
                            rows={1}
                            style={{ minHeight: '52px', maxHeight: '150px' }}
                        />
                        <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl sm:rounded-full flex items-center justify-center transition-all shadow-md ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                            title={isRecording ? "Stop Recording" : "Start Voice Typing"}
                        >
                            {isRecording ? <Square size={18} fill="currentColor" /> : <Mic size={18} />}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white rounded-2xl sm:rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            <Send size={18} className={input.trim() ? 'translate-x-0.5' : ''} />
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-medium">GujGov Mitra can make mistakes. Please verify important information on official portals.</p>
                    </div>
                </div>
            </div>

            <style>{`
        /* Minimal markdown styling */
        .markdown-body {
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .markdown-body p { margin-bottom: 0.75rem; }
        .markdown-body p:last-child { margin-bottom: 0; }
        .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-body ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-body li { margin-bottom: 0.25rem; }
        .markdown-body strong { font-weight: 600; color: #1e293b; }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 { font-weight: 700; color: #0f172a; margin-top: 1.5rem; margin-bottom: 0.75rem; }
      `}</style>
        </div>
    );
}
