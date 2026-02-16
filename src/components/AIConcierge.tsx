"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    text: string;
}

const QUICK_QUESTIONS = [
    "What are your rates?",
    "Do you shoot weddings?",
    "How do I book?",
];

export default function AIConcierge() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;

        const userMsg: Message = { role: "user", text: text.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text.trim(),
                    history: messages,
                }),
            });

            const data = await res.json();
            const assistantMsg: Message = {
                role: "assistant",
                text: data.reply || "Sorry, I couldn't process that. Please try again.",
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Connection issue — please try again or visit our Inquire page." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Bubble */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 2, type: "spring", stiffness: 200 }}
                        onClick={() => setOpen(true)}
                        className="fixed bottom-8 left-8 z-[200] w-14 h-14 rounded-full bg-brand-green text-brand-gold flex items-center justify-center shadow-[0_8px_32px_hsla(164,100%,11%,0.5)] hover:scale-110 transition-transform duration-300 border border-brand-gold/20"
                        aria-label="Open AI Concierge"
                    >
                        <MessageCircle size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-8 left-8 z-[200] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] rounded-3xl overflow-hidden flex flex-col shadow-[0_32px_100px_rgba(0,0,0,0.6)] border border-brand-gold/10"
                        style={{
                            background: "linear-gradient(165deg, rgba(8, 48, 43, 0.95) 0%, rgba(5, 30, 28, 0.98) 100%)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-brand-gold/10 bg-brand-green/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                                    <Sparkles size={18} className="text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-brand-off-white tracking-tight">OYANGE Concierge</h3>
                                    <span className="text-[10px] text-brand-gold/60 tracking-widest uppercase">Powered by AI</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors group"
                                aria-label="Close chat"
                            >
                                <X size={16} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                            {/* Welcome Message */}
                            {messages.length === 0 && (
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                                        <p className="text-sm text-brand-off-white/90 leading-relaxed font-light">
                                            Hi there! <span className="text-xl">👋</span> <br /> I&apos;m the OYANGE concierge. Ask me about our <span className="text-brand-gold">photography packages</span>, <span className="text-brand-gold">pricing</span>, or how to <span className="text-brand-gold">book a session</span>.
                                        </p>
                                    </div>

                                    {/* Quick Questions */}
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-off-white/40">Quick questions</span>
                                        {QUICK_QUESTIONS.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => sendMessage(q)}
                                                className="block w-full text-left text-sm px-4 py-3 rounded-xl border border-brand-gold/10 bg-brand-gold/5 hover:bg-brand-gold/10 hover:border-brand-gold/20 transition-all duration-300 text-brand-off-white/80 hover:text-brand-gold"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Chat Messages */}
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                            ? "bg-brand-gold text-brand-green font-medium rounded-br-sm shadow-[0_4px_12px_rgba(197,157,77,0.2)]"
                                            : "bg-white/10 text-brand-off-white/90 rounded-bl-sm border border-white/5"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 border border-white/5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-brand-gold/10 bg-black/20">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage(input);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about our services..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-off-white placeholder:text-brand-off-white/30 outline-none focus:ring-1 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all font-light"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="w-10 h-10 rounded-xl bg-brand-gold text-brand-green flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-brand-green transition-all duration-300 shadow-[0_0_15px_rgba(197,157,77,0.3)]"
                                    aria-label="Send message"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
