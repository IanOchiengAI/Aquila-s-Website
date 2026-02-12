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
                        className="fixed bottom-8 left-8 z-[200] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] rounded-3xl overflow-hidden flex flex-col shadow-[0_32px_100px_rgba(0,0,0,0.3)] border border-white/20"
                        style={{
                            background: "rgba(255, 255, 255, 0.85)",
                            backdropFilter: "blur(40px) saturate(180%)",
                            WebkitBackdropFilter: "blur(40px) saturate(180%)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-black/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                                    <Sparkles size={18} className="text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground tracking-tight">OYANGE Concierge</h3>
                                    <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Powered by AI</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={16} className="text-muted-foreground" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                            {/* Welcome Message */}
                            {messages.length === 0 && (
                                <div className="space-y-4">
                                    <div className="bg-brand-green/5 rounded-2xl rounded-tl-sm p-4">
                                        <p className="text-sm text-foreground leading-relaxed">
                                            Hi there! 👋 I&apos;m the OYANGE concierge. Ask me about our photography packages, pricing, or how to book a session.
                                        </p>
                                    </div>

                                    {/* Quick Questions */}
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Quick questions</span>
                                        {QUICK_QUESTIONS.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => sendMessage(q)}
                                                className="block w-full text-left text-sm px-4 py-3 rounded-xl border border-black/5 hover:border-brand-green/20 hover:bg-brand-green/5 transition-all duration-200 text-foreground"
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
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-brand-green text-white rounded-br-sm"
                                                : "bg-brand-green/5 text-foreground rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-brand-green/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-brand-green/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-brand-green/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-brand-green/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-black/5">
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
                                    className="flex-1 bg-black/[0.03] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-brand-green/20 transition-all"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="w-10 h-10 rounded-xl bg-brand-green text-brand-gold flex items-center justify-center disabled:opacity-30 hover:bg-brand-green-bright transition-colors duration-200"
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
