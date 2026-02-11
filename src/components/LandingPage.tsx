"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, ChevronDown, Calendar, Menu, X, Search } from "lucide-react";
import galleries from "@/data/galleries.json";

// Animation Variants - Refined for "Mac" feel (soft and snappy)
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function LandingPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categories = ["ALL", ...Array.from(new Set(galleries.map((g) => g.category)))];

    const filteredGalleries = activeCategory === "ALL"
        ? galleries.slice(0, 8)
        : galleries.filter((g) => g.category === activeCategory);

    // Horizontal Scroll Reference - Extended for more "stationary" feel
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    // Calculate X transform - Zero-gap start with a subtle "sticky" hold at the beginning (0 to 0.1)
    const baseTranslateX = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-65%"]);
    const x = useSpring(baseTranslateX, { stiffness: 400, damping: 90 });

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
    const heroImageY = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <div className="bg-background text-foreground selection:bg-brand-gold selection:text-white font-sans overflow-x-hidden foggy-depth">
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation - Foggy White Mac Style */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl glass-card rounded-[2rem] flex items-center justify-between px-10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.02)]"
            >
                <div className="flex items-center gap-12">
                    <span className="text-xl font-display font-black tracking-widest uppercase">
                        OYANGE
                    </span>
                    <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                        <Link href="#featured" className="hover:text-foreground transition-all">Series</Link>
                        <Link href="#work" className="hover:text-foreground transition-all">Archive</Link>
                        <Link href="#" className="hover:text-foreground transition-all">Studios</Link>
                    </div>
                </div>

                {/* Mac-Style Search Bar - Refined contrast */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full group">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" />
                        <input
                            type="text"
                            placeholder="Search images, series, studios..."
                            className="w-full bg-black/[0.04] border border-black/5 rounded-2xl py-2.5 pl-11 pr-4 text-[13px] font-medium outline-none focus:bg-white focus:ring-4 focus:ring-brand-gold/5 focus:border-brand-gold/10 transition-all placeholder:text-foreground/20 shadow-inner"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-[11px] uppercase tracking-wider hover:scale-105 transition-all shadow-md">
                        Contact
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-black/5 rounded-full transition-all md:hidden" aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section - Airy & Light */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-background z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-95 scale-105"
                        priority
                    />
                </motion.div>

                <motion.div
                    style={{ y: heroTextY }}
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="relative z-20 text-center px-6"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-[11px] tracking-[0.5em] uppercase text-brand-gold mb-6 font-black"
                    >
                        Nairobi &middot; Kenya
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="font-serif text-6xl md:text-[9rem] font-bold leading-[0.9] mb-12 tracking-tighter text-foreground"
                    >
                        Defining <br />
                        <span className="italic text-brand-gold font-serif">Simplicity.</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-xl mx-auto text-foreground/50 text-base md:text-xl font-light leading-relaxed mb-12 text-balance"
                    >
                        Artisanal photography that uncovers the raw elegance in every frame. We don&apos;t just take photos; we craft legacies.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex justify-center gap-6">
                        <Link href="#featured" className="px-12 py-5 bg-foreground text-background rounded-full font-bold text-[12px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">
                            The Gallery
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Horizontal Scroll Series - Adjusted transform range to fix "white gap" */}
            <section ref={horizontalRef} id="featured" className="relative h-[450vh] bg-background">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-background via-white/[0.2] to-background">
                    <motion.div style={{ x }} className="flex gap-20 px-24 items-center">
                        {/* Intro Lead */}
                        <div className="flex-shrink-0 w-[500px]">
                            <span className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-6">Discovery</span>
                            <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 uppercase leading-none text-foreground/90">THE <br /> SERIES.</h2>
                            <p className="text-foreground/40 text-xl max-w-sm leading-relaxed font-light text-balance">
                                Our most significant collections, captured with uncompromising vision.
                            </p>
                        </div>

                        {/* Foggy Mac Cards */}
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&q=80&auto=format"
                            title="Symmetry"
                            category="Architectural"
                            location="Modernist Study No. 1"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80&auto=format"
                            title="Tidal Wave"
                            category="Wildlife"
                            location="Masai Mara Reserve"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
                            title="Velvet"
                            category="Editorial"
                            location="Nairobi Studio"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=80&auto=format"
                            title="Roots"
                            category="Documentary"
                            location="Cultural Archive"
                        />

                        {/* End Point */}
                        <div className="flex-shrink-0 w-[400px] flex flex-col items-center">
                            <Link href="#work" className="group flex flex-col items-center text-center">
                                <div className="w-28 h-28 rounded-full glass-card flex items-center justify-center hover:bg-black/5 hover:border-brand-gold/30 transition-all duration-500 group-hover:scale-110">
                                    <ArrowRight size={28} className="text-foreground/40 group-hover:text-brand-gold" />
                                </div>
                                <span className="mt-8 text-[11px] font-black tracking-[0.4em] uppercase text-foreground/20 group-hover:text-foreground/40">Archive</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Narrative Section - Foggy Bridge */}
            <section className="py-72 bg-white/30 border-y border-black/[0.03]">
                <div className="max-w-5xl mx-auto px-8 text-center">
                    <span className="text-brand-gold text-[10px] font-black tracking-[0.6em] uppercase mb-20 block">Philosophy</span>
                    <h2 className="text-4xl md:text-7xl font-serif italic text-foreground/80 leading-[1.2] tracking-tight">
                        &quot;To find the extraordinary within the mundane is the photographer&apos;s greatest achievement.&quot;
                    </h2>
                </div>
            </section>

            {/* Repository Grid - Mac Style */}
            <section id="work" className="py-40 px-6 md:px-12 bg-background border-t border-black/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
                        <div>
                            <span className="text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Archive</span>
                            <h2 className="text-5xl md:text-[5.5rem] font-display font-black tracking-tighter uppercase leading-none">THE <span className="font-serif italic text-brand-gold">REPOS</span></h2>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-7 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 border ${activeCategory === cat
                                        ? "bg-foreground text-background border-foreground shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                                        : "bg-black/[0.03] border-transparent text-foreground/40 hover:bg-black/[0.06]"
                                        }`}
                                    aria-label={`Filter by ${cat}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredGalleries.map((item, idx) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-black/[0.02] shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700"
                                >
                                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <span className="text-brand-gold text-[9px] font-black tracking-widest uppercase mb-3">{item.category}</span>
                                        <h4 className="text-2xl font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-white/60 text-[11px] uppercase font-bold tracking-widest">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Services Breakdown - Elegant Cards */}
            <section className="py-40 bg-white/20">
                <div className="max-w-7xl mx-auto px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <ServiceCard title="Weddings" desc="Documenting love with cinematic nuance and technical grace." icon={<Camera size={20} />} />
                    <ServiceCard title="Branding" desc="Elevating identity through high-precision visual storytelling." icon={<Globe size={20} />} />
                    <ServiceCard title="Editorial" desc="Cutting-edge fashion imagery for the modern artisan." icon={<ShoppingBag size={20} />} />
                    <ServiceCard title="Fine Art" desc="Exploring the soul of the landscape through art." icon={<Instagram size={20} />} />
                </div>
            </section>

            {/* Footer - Minimal & Clean */}
            <footer className="py-24 border-t border-black/[0.02] text-center px-8 bg-background">
                <div className="flex justify-center gap-16 mb-12 text-foreground/30 text-[10px] font-black tracking-[0.5em] uppercase">
                    <Link href="#" className="hover:text-brand-gold transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">Behance</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">WhatsApp</Link>
                </div>
                <p className="text-foreground/10 text-[9px] font-black tracking-[0.4em] uppercase">
                    © 2026 OYANGE STUDIO. CRAFTED FOR THE DISCERNING.
                </p>
            </footer>

            {/* Mac-Style Floating CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-10 right-10 z-[110]"
            >
                <button
                    className="px-10 py-5 bg-foreground text-background rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-[0_25px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
                    aria-label="Book a Session"
                >
                    <Calendar size={18} /> Book Session
                </button>
            </motion.div>
        </div>
    );
}

function HorizontalCard({ src, title, category, location }: { src: string, title: string, category: string, location: string }) {
    return (
        <div className="flex-shrink-0 w-[65vw] md:w-[45vw] max-w-[850px]">
            <div className="group relative aspect-[14/9] overflow-hidden rounded-[3rem] glass-card shadow-[0_30px_80px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-12 flex flex-col justify-end">
                    <span className="text-brand-gold text-[10px] tracking-[0.4em] uppercase font-black mb-4">{category}</span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-3 text-white">{title}</h3>
                    <p className="text-white/60 text-sm md:text-base font-medium tracking-wide">{location}</p>
                </div>
            </div>
        </div>
    );
}

function ServiceCard({ title, desc, icon }: { title: string, desc: string, icon: any }) {
    return (
        <div className="group p-10 bg-white/40 border border-black/[0.03] rounded-[3rem] hover:bg-white/60 transition-all duration-500 hover:shadow-xl">
            <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center mb-10 group-hover:bg-brand-gold/10 transition-colors duration-500">
                <div className="text-brand-gold">{icon}</div>
            </div>
            <h3 className="text-2xl font-display font-black tracking-tight mb-4 uppercase">{title}</h3>
            <p className="text-foreground/40 text-sm leading-relaxed font-light">{desc}</p>
        </div>
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-brand-gold z-[1000] origin-left"
            style={{ scaleX }}
        />
    );
}

function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        >
            <div className="w-full h-full rounded-full border border-white opacity-40 shrink-0" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}
