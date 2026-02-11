"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Sparkles, ChevronDown, Calendar, Menu, X, Search } from "lucide-react";
import galleries from "@/data/galleries.json";

// ─── Animation Variants ───
const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: "easeOut" as const },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" as const },
    },
};

const slideUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const },
    },
};

// ─── Main Component ───
export default function LandingPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categories = ["ALL", ...Array.from(new Set(galleries.map((g) => g.category)))];

    const filteredGalleries = activeCategory === "ALL"
        ? galleries.slice(0, 8)
        : galleries.filter((g) => g.category === activeCategory);

    // Horizontal Scroll
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    // ─── Horizontal Scroll Config ───
    // 1. Entrance Phase (0% - 12%): Cards rise from below and scale up
    // 2. Scroll Phase (12% - 95%): Cards slide horizontally
    const entranceY = useTransform(scrollYProgress, [0, 0.12], ["20vh", "0vh"]);
    const entranceScale = useTransform(scrollYProgress, [0, 0.12], [0.85, 1]);
    const entranceOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

    const baseTranslateX = useTransform(scrollYProgress, [0.12, 0.95], ["0%", "-78%"]);
    const x = useSpring(baseTranslateX, { stiffness: 300, damping: 60 });
    const y = useSpring(entranceY, { stiffness: 300, damping: 60 });
    const scale = useSpring(entranceScale, { stiffness: 300, damping: 60 });
    const opacity = useSpring(entranceOpacity, { stiffness: 300, damping: 60 });

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 600], [0, 120]);
    const heroImageY = useTransform(scrollY, [0, 600], [0, 60]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div className="bg-background text-foreground selection:bg-brand-gold selection:text-white font-sans foggy-depth noise-overlay">
            <CustomCursor />
            <ScrollProgress />

            {/* ─── Navigation ─── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl glass-card rounded-[2rem] flex items-center justify-between px-10 py-3"
            >
                <div className="flex items-center gap-12">
                    <span className="text-xl font-display font-black tracking-widest uppercase">
                        OYANGE
                    </span>
                    <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/40">
                        <Link href="#featured" className="hover:text-foreground transition-all duration-300">Series</Link>
                        <Link href="#work" className="hover:text-foreground transition-all duration-300">Archive</Link>
                        <Link href="#" className="hover:text-foreground transition-all duration-300">Studios</Link>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full group">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors duration-300" />
                        <input
                            type="text"
                            placeholder="Search images, series, studios..."
                            className="w-full bg-black/[0.03] border border-black/[0.04] rounded-2xl py-2.5 pl-11 pr-4 text-[13px] font-medium outline-none focus:bg-white focus:ring-4 focus:ring-brand-gold/5 focus:border-brand-gold/10 transition-all duration-500 placeholder:text-foreground/20"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-[11px] uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
                        Contact
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-black/5 rounded-full transition-all md:hidden" aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* ─── Hero Section ─── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-background z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-90 scale-110"
                        priority
                    />
                </motion.div>

                <motion.div
                    style={{ y: heroTextY, opacity: heroOpacity }}
                    className="relative z-20 text-center px-6"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: ease }}
                        className="text-[11px] tracking-[0.5em] uppercase text-brand-gold mb-8 font-black"
                    >
                        Nairobi &middot; Global
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1, ease: ease }}
                        className="font-display text-6xl md:text-[10rem] font-black leading-[0.85] mb-10 tracking-tighter uppercase"
                    >
                        THE <br />
                        <span className="gold-shimmer font-serif italic capitalize">Unseen.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3, ease: ease }}
                        className="max-w-xl mx-auto text-foreground/60 text-base md:text-lg font-light leading-relaxed mb-12 text-balance"
                    >
                        We don&apos;t just capture moments; we craft visual legacies. A study in light, shadow, and the raw elegance of the human experience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.6, ease: ease }}
                        className="flex justify-center gap-6"
                    >
                        <Link href="#featured" className="group px-12 py-4 bg-foreground text-background rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center gap-3">
                            Explore Works
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={24} className="text-foreground/20" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── Horizontal Scroll Series ─── */}
            <section ref={horizontalRef} id="featured" className="relative h-[600vh] bg-background">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    <motion.div style={{ x, y, scale, opacity }} className="flex gap-16 px-12 md:px-24 items-center will-change-transform">
                        {/* Intro Lead */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="flex-shrink-0 w-[400px] md:w-[500px]"
                        >
                            <motion.span variants={staggerItem} className="text-brand-gold text-[10px] font-black tracking-[0.4em] uppercase block mb-6">Curated</motion.span>
                            <motion.h2 variants={staggerItem} className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-6 uppercase leading-none text-foreground/90">Master<br />Pieces.</motion.h2>
                            <motion.p variants={staggerItem} className="text-foreground/50 text-lg max-w-sm leading-relaxed font-light text-balance">
                                A selection of our most defining work. Evidence of our obsession with detail.
                            </motion.p>
                        </motion.div>

                        {/* Cards with Parallax */}
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&q=80&auto=format"
                            title="Symmetry"
                            category="Architectural"
                            location="Modernist Study No. 1"
                            idx={0}
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80&auto=format"
                            title="Tidal Wave"
                            category="Wildlife"
                            location="Masai Mara Reserve"
                            idx={1}
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
                            title="Velvet"
                            category="Editorial"
                            location="Nairobi Studio"
                            idx={2}
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=80&auto=format"
                            title="Roots"
                            category="Documentary"
                            location="Cultural Archive"
                            idx={3}
                        />

                        {/* End Point */}
                        <div className="flex-shrink-0 w-[300px] flex flex-col items-center">
                            <Link href="#work" className="group flex flex-col items-center text-center">
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: 90 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="w-24 h-24 rounded-full glass-card gold-glow flex items-center justify-center"
                                >
                                    <ArrowRight size={24} className="text-foreground/40 group-hover:text-brand-gold transition-colors duration-300" />
                                </motion.div>
                                <span className="mt-6 text-[10px] font-black tracking-[0.4em] uppercase text-foreground/20 group-hover:text-brand-gold transition-colors duration-300">View All</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Philosophy Quote ─── */}
            <RevealSection className="py-24 md:py-32 bg-gradient-to-b from-background via-white/40 to-background border-y border-black/[0.02]">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: ease }}
                        className="text-brand-gold text-[10px] font-black tracking-[0.6em] uppercase mb-12 block"
                    >
                        Ethos
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.2, ease: ease, delay: 0.15 }}
                        className="text-3xl md:text-6xl font-serif italic text-foreground/80 leading-[1.3] tracking-tight"
                    >
                        &quot;Art is not what you see, but what you make others feel.&quot;
                    </motion.h2>
                </div>
            </RevealSection>

            {/* ─── Repository Grid ─── */}
            <section id="work" className="py-24 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8"
                    >
                        <motion.div variants={staggerItem}>
                            <span className="text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Archive</span>
                            <h2 className="text-5xl md:text-[5.5rem] font-display font-black tracking-tighter uppercase leading-none">THE <span className="gold-shimmer font-serif italic">VOLUMES</span></h2>
                        </motion.div>

                        <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5">
                            {categories.filter(c => c !== "ALL").map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/work/${cat.toLowerCase()}`}
                                    className="px-7 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-500 bg-black/[0.03] border border-transparent text-foreground/40 hover:bg-black/[0.06] hover:text-foreground/60 hover:scale-105 active:scale-95"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Grid - Showing "Latest" or "Featured" (Slice first 6) */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {galleries.slice(0, 6).map((item, idx) => (
                            <RepositoryCard key={item.id} item={item} idx={idx} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Services ─── */}
            <RevealSection className="py-24 bg-gradient-to-b from-background via-white/20 to-background">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    <TiltCard title="Weddings" desc="Unscripted. Timeless. Yours. Capturing the raw emotion of union." icon={<Camera size={20} />} idx={0} />
                    <TiltCard title="Branding" desc="Identity in high definition. Visual authority for the modern era." icon={<Globe size={20} />} idx={1} />
                    <TiltCard title="Editorial" desc="Avant-garde storytelling. Where fashion meets fine art." icon={<ShoppingBag size={20} />} idx={2} />
                    <TiltCard title="Fine Art" desc="The soul of the landscape. Silence captured in frame." icon={<Sparkles size={20} />} idx={3} />
                </motion.div>
            </RevealSection>

            {/* ─── Footer ─── */}
            <motion.footer
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="py-24 border-t border-black/[0.02] text-center px-8 bg-background"
            >
                <motion.div variants={staggerItem} className="flex justify-center gap-16 mb-12 text-foreground/30 text-[10px] font-black tracking-[0.5em] uppercase">
                    <Link href="#" className="hover:text-brand-gold transition-colors duration-300">Instagram</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors duration-300">Behance</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors duration-300">WhatsApp</Link>
                </motion.div>
                <motion.p variants={staggerItem} className="text-foreground/10 text-[9px] font-black tracking-[0.4em] uppercase">
                    © 2026 OYANGE STUDIO. CRAFTED FOR THE DISCERNING.
                </motion.p>
            </motion.footer>

            {/* ─── Floating CTA ─── */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-10 right-10 z-[110]"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cta-breathe px-10 py-5 bg-foreground text-background rounded-full font-black text-[12px] uppercase tracking-[0.2em] flex items-center gap-4 transition-colors duration-300"
                    aria-label="Book a Session"
                >
                    <Calendar size={18} /> Book Session
                </motion.button>
            </motion.div>
        </div>
    );
}

// ─── Horizontal Card with Parallax Inner Image ───
function HorizontalCard({ src, title, category, location, idx }: { src: string, title: string, category: string, location: string, idx: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-[65vw] md:w-[45vw] max-w-[850px]"
        >
            <Link href={`/work/${category.toLowerCase()}`} className="block">
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group relative aspect-[14/9] overflow-hidden rounded-[3rem] gold-glow shadow-[0_30px_80px_rgba(0,0,0,0.06)] transition-all duration-700"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-12 flex flex-col justify-end">
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-brand-gold-light text-[10px] tracking-[0.4em] uppercase font-black mb-4 inline-block"
                        >
                            {category}
                        </motion.span>
                        <h3 className="text-4xl md:text-5xl font-bold mb-3 text-white tracking-tight">{title}</h3>
                        <p className="text-white/50 text-sm md:text-base font-medium tracking-wide">{location}</p>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ─── Repository Card with Animated Hover Overlay ───
function RepositoryCard({ item, idx }: { item: typeof galleries[0], idx: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-black/[0.02] gold-glow cursor-pointer"
            >
                <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />

                {/* Always visible bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <span className="text-brand-gold-light text-[9px] font-black tracking-widest uppercase block mb-2">{item.category}</span>
                    <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                </div>

                {/* Hover overlay — slides up */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] p-10 flex flex-col justify-end">
                    <motion.span className="text-brand-gold-light text-[9px] font-black tracking-widest uppercase mb-3">{item.category}</motion.span>
                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-white/50 text-[11px] uppercase font-bold tracking-widest mb-4">{item.subtitle}</p>
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-wider uppercase">
                        <span>View Project</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── 3D Tilt Service Card ───
function TiltCard({ title, desc, icon, idx }: { title: string, desc: string, icon: ReactNode, idx: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

    function handleMouse(e: React.MouseEvent) {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            variants={staggerItem}
            ref={cardRef}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="group p-10 bg-white/40 border border-black/[0.03] rounded-[3rem] hover:bg-white/70 transition-all duration-500 gold-glow cursor-pointer"
        >
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center mb-10 group-hover:bg-brand-gold/10 transition-colors duration-500"
            >
                <div className="text-brand-gold">{icon}</div>
            </motion.div>
            <h3 className="text-2xl font-display font-black tracking-tight mb-4 uppercase group-hover:text-brand-gold transition-colors duration-500">{title}</h3>
            <p className="text-foreground/40 text-sm leading-relaxed font-light">{desc}</p>
        </motion.div>
    );
}

// ─── Section Reveal Wrapper ───
function RevealSection({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionReveal}
            className={className}
        >
            {children}
        </motion.section>
    );
}

// ─── Scroll Progress Bar ───
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #b58d10, #d4af37, #b58d10)",
            }}
        />
    );
}

// ─── Custom Cursor ───
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
