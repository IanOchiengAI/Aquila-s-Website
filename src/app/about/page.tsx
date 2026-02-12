"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-brand-off-white selection:bg-brand-gold selection:text-brand-green noise-overlay glass-surface pb-32">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="pointer-events-auto w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                        <ArrowLeft size={20} className="text-brand-off-white/60 group-hover:text-brand-gold transition-colors duration-300" />
                    </Link>

                    <div className="pointer-events-auto glass-pill px-6 py-3 flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-[11px] font-semibold tracking-[0.4em] text-brand-gold uppercase leading-none">The Ethos</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <h1 className="text-6xl md:text-[clamp(4rem,10vw,10rem)] font-display font-black tracking-tighter uppercase leading-[0.85] mb-12 text-brand-off-white">
                        Modern <br /> <span className="text-brand-gold/90">Stewardship.</span>
                    </h1>
                    <p className="text-brand-off-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto font-serif italic">
                        "We believe that every image is a piece of history waiting to be preserved. Our role is not just to capture, but to curate the visual legacy of our time."
                    </p>
                </motion.div>
            </header>

            {/* Content Blocks */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&q=80&auto=format"
                        alt="Studio Philosophy"
                        width={800}
                        height={1000}
                        className="rounded-3xl object-cover shadow-[0_32px_100px_rgba(0,0,0,0.35)] border border-white/5"
                    />
                </motion.div>

                <div className="space-y-12">
                    <div className="glass-card p-10 rounded-3xl">
                        <h3 className="text-3xl font-display font-black text-brand-off-white mb-6 uppercase">The Process</h3>
                        <p className="text-brand-off-white/60 leading-relaxed font-light">
                            Our approach is rooted in the principles of African Modernism—structure, warmth, and geometry. We strip away the unnecessary to reveal the essential truth of the subject.
                        </p>
                    </div>

                    <div className="glass-card p-10 rounded-3xl">
                        <h3 className="text-3xl font-display font-black text-brand-off-white mb-6 uppercase">The Promise</h3>
                        <p className="text-brand-off-white/60 leading-relaxed font-light">
                            To deliver not just photographs, but artifacts. Physical and digital tokens of memory that will outlast the moment they were captured.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <div className="mt-32 text-center">
                <Link href="/inquire" className="inline-flex items-center gap-4 px-10 py-5 bg-brand-gold/90 text-brand-green font-bold text-[12px] uppercase tracking-[0.3em] rounded-full hover:bg-brand-gold transition-all duration-300 shadow-[0_16px_60px_rgba(212,175,55,0.3)]">
                    Start Your Project <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
