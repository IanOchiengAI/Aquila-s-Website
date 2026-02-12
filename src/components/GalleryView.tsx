"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// ─── Animation Variants ───
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
};

// ─── Grid Variants ───
type GridVariant = "editorial" | "archival" | "cinema" | "monolithic";

const gridStyles: Record<GridVariant, string> = {
    editorial: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    archival: "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4",
    cinema: "grid-cols-1 md:grid-cols-2 gap-8",
    monolithic: "grid-cols-1 gap-10",
};

const cardStyles: Record<GridVariant, string> = {
    editorial: "aspect-[4/5] rounded-2xl",
    archival: "aspect-square rounded-xl",
    cinema: "aspect-video h-[80vh] rounded-2xl",
    monolithic: "aspect-[21/9] h-[90vh] rounded-3xl",
};

export default function GalleryView({ items, category, variant = "editorial" }: { items: any[], category: string, variant?: GridVariant }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-brand-gold selection:text-brand-green noise-overlay glass-surface pb-32">

            {/* Scroll Progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[2000] origin-left"
                style={{ scaleX, background: "linear-gradient(90deg, hsl(var(--brand-gold)), #ffe59e)" }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="pointer-events-auto w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                        <ArrowLeft size={20} className="text-foreground group-hover:text-brand-gold transition-colors duration-300" />
                    </Link>

                    <div className="pointer-events-auto glass-pill px-6 py-3 flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-semibold tracking-[0.4em] text-brand-gold uppercase leading-none mb-1">{category}</span>
                            <span className="text-[9px] font-medium tracking-[0.2em] text-muted-foreground uppercase">{items.length} Volumes</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Header */}
            <header className="pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-7xl mx-auto text-center"
                >
                    <span className="inline-flex items-center gap-3 text-brand-gold/70 text-[11px] font-semibold tracking-[0.6em] uppercase mb-8 glass-pill px-5 py-2 mx-auto">
                        <span className="w-1 h-1 rounded-full bg-brand-gold" />
                        Archive Volume
                    </span>
                    <h1 className="text-6xl md:text-[clamp(5rem,12vw,14rem)] font-display font-black tracking-tighter uppercase leading-[0.8] mb-8 text-foreground">
                        {category}
                    </h1>
                    <div className="flex justify-center items-center gap-6 text-muted-foreground/30">
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/30" />
                        <span className="text-[10px] font-semibold tracking-[0.4em] uppercase">Visual Stewardship</span>
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/30" />
                    </div>
                </motion.div>
            </header>

            {/* Creative Grid */}
            <section className={`px-4 md:px-8 mx-auto pb-24 ${variant === "monolithic" ? "max-w-6xl" : "max-w-[1900px]"}`}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`grid ${gridStyles[variant]}`}
                >
                    {items.map((item: any, idx: number) => (
                        <motion.div
                            key={item.id}
                            variants={itemAnim}
                            whileHover={{ y: -4, scale: 1.01 }}
                            className={`group relative overflow-hidden cursor-pointer border border-black/5 shadow-[0_16px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.15)] transition-all duration-700 ${cardStyles[variant]} ${variant === "editorial" && item.wide ? "md:col-span-2" :
                                variant === "archival" && (idx % 7 === 0) ? "md:col-span-2 md:row-span-2" :
                                    variant === "cinema" && (idx % 3 === 0) ? "md:col-span-2" :
                                        ""
                                }`}
                        >
                            <Image
                                src={item.cover}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-[2s] opacity-90 group-hover:opacity-100 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Hover Overlay — Frosted Glass */}
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-600 flex flex-col justify-end p-8 rounded-inherit">
                                <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-600">
                                    <span className="text-brand-gold/80 text-[10px] font-semibold tracking-[0.5em] uppercase mb-3 block">{item.category}</span>
                                    <h3 className="text-3xl md:text-4xl font-display font-black text-brand-off-white mb-2 tracking-tighter leading-none">{item.title}</h3>
                                    <p className="text-brand-off-white/35 text-[11px] font-medium tracking-[0.2em] uppercase">{item.subtitle}</p>
                                </div>
                            </div>

                            {/* Interaction Hint */}
                            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <ArrowUpRight size={18} className="text-brand-off-white/80" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Footer */}
            <div className="mt-16 text-center pb-16">
                <Link href="/" className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground hover:text-brand-gold transition-colors duration-300 group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform duration-300" />
                    Back to Archives
                </Link>
            </div>
        </div>
    );
}
