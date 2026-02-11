"use client";

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { useState, useRef } from "react";

// ─── Animation Variants ───
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function GalleryView({ items, category }: { items: any[], category: string }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans foggy-depth noise-overlay selection:bg-brand-gold selection:text-white pb-32">

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-brand-gold z-[1000] origin-left"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-6 left-0 right-0 z-[100] px-6 md:px-12 flex justify-between items-center pointer-events-none">
                <Link href="/" className="pointer-events-auto w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 group shadow-lg">
                    <ArrowLeft size={20} className="text-foreground/60 group-hover:text-foreground transition-colors" />
                </Link>
                <div className="pointer-events-auto hidden md:flex items-center gap-6 px-8 py-3 glass-card rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/40 shadow-lg">
                    <span className="text-brand-gold">{category}</span>
                    <span>Collection</span>
                    <span>{items.length} Works</span>
                </div>
            </nav>

            {/* Hero Header */}
            <header className="pt-48 pb-24 px-6 md:px-12 text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-brand-gold text-[10px] font-black tracking-[0.6em] uppercase block mb-8">Selected Works</span>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-none mb-6 text-foreground">
                        {category}
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold/20 mx-auto rounded-full mt-8" />
                </motion.div>
            </header>

            {/* Creative Grid */}
            <section className="px-4 md:px-12 max-w-[1600px] mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]"
                >
                    {items.map((item: any, idx: number) => (
                        <motion.div
                            key={item.id}
                            variants={itemAnim}
                            className={`group relative rounded-[2rem] overflow-hidden bg-black/[0.02] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ${item.wide ? "md:col-span-2 lg:col-span-2" : "md:col-span-1"}`}
                        >
                            <Image
                                src={item.cover}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-brand-gold-light text-[9px] font-black tracking-widest uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.category}</span>
                                <h3 className="text-2xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{item.title}</h3>
                                <p className="text-white/60 text-[11px] uppercase font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{item.subtitle}</p>
                            </div>

                            {/* Corner Icon */}
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                <ArrowUpRight size={16} className="text-white" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Footer Hook */}
            <div className="mt-32 text-center">
                <Link href="/" className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-foreground/40 hover:text-brand-gold transition-colors duration-300">
                    <ArrowLeft size={14} /> Back to Archives
                </Link>
            </div>
        </div>
    );
}
