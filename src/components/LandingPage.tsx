"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import galleries from "@/data/galleries.json";

const heroImages = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80&auto=format",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80&auto=format"
];

// ─── Animation Curves & Variants ───
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

// ─── Main Component ───
export default function LandingPage() {
    const [heroIdx, setHeroIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIdx((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Horizontal Scroll
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    // Slide distance adjusted for a more cinematic exit
    const baseTranslateX = useTransform(scrollYProgress, [0.18, 0.9], ["0%", "-115%"]);

    const x = useSpring(baseTranslateX, { stiffness: 100, damping: 30 });

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 600], [0, 100]);
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    const categories = ["ALL", "PORTRAITS", "COUPLES", "ADVENTURE", "EVENTS", "GRADUATION", "PRODUCT"];
    const featuredSeries = galleries.slice(0, 5); // Using individual photos again

    return (
        <div className="bg-background text-foreground selection:bg-brand-gold selection:text-brand-green font-sans glass-surface noise-overlay">
            <CustomCursor />
            <ScrollProgress />

            {/* ─── Navigation ─── */}
            <nav className="fixed top-0 left-0 right-0 z-[120] pointer-events-none px-6 md:px-12 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
                    {/* Brand Logo */}
                    <Link href="/" className="group flex flex-col">
                        <span className="font-display text-3xl font-black tracking-tighter text-foreground leading-none group-hover:text-brand-gold transition-colors duration-500">OYANGE</span>
                        <span className="text-[9px] font-semibold tracking-[0.5em] uppercase text-muted-foreground/60">Visual Alchemy</span>
                    </Link>

                    {/* Desktop Menu — Frosted Liquid Glass Pill */}
                    <div className="hidden lg:flex items-center gap-8 glass-pill px-10 py-4 backdrop-blur-3xl bg-white/40">
                        <Link href="/work/portraits" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Portraits</Link>
                        <Link href="/work/couples" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Couples</Link>
                        <Link href="/work/adventure" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Adventure</Link>
                        <Link href="/work/events" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Events</Link>
                        <Link href="/work/graduation" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Graduation</Link>
                        <Link href="/work/product" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300">Product</Link>
                    </div>

                    {/* Contact Button — Deep Forest & Gold */}
                    <Link href="/inquire" className="px-8 py-3.5 bg-brand-green text-brand-gold font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-brand-green-bright transition-all duration-300 shadow-[0_8px_32px_hsla(164,100%,11%,0.4)] border border-brand-gold/20">
                        Inquire
                    </Link>
                </div>
            </nav>

            {/* ─── Hero Section ─── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={heroIdx}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={heroImages[heroIdx]}
                                alt="Cinematic Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                    {/* Teal/Green Gradient Overlay as requested */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/70 via-brand-green/20 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
                </div>

                <motion.div
                    style={{ y: heroTextY, opacity: heroOpacity }}
                    className="relative z-20 text-center px-6 max-w-6xl mx-auto"
                >

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: ease }}
                        className="font-display text-4xl md:text-7xl font-black leading-tight mb-8 tracking-tighter uppercase text-white text-balance"
                    >
                        Travel, Portrait Photographer. <br />
                        <span className="font-serif italic capitalize tracking-normal text-brand-gold">Nairobi, Kenya.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2, ease: ease }}
                        className="flex justify-center"
                    >
                        <Link href="#portfolio-active" className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-black/90 text-white font-bold text-[12px] uppercase tracking-[0.3em] backdrop-blur-md hover:bg-brand-gold hover:text-black transition-all duration-500 shadow-[0_16px_60px_rgba(0,0,0,0.3)]">
                            View Portfolio
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
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
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] font-semibold tracking-[0.5em] text-brand-off-white/25 uppercase">Scroll</span>
                        <div className="w-px h-16 bg-gradient-to-b from-brand-gold/40 to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── Horizontal Scroll Series (Vertical Stack on Mobile, Horizontal on Desktop) ─── */}
            <section ref={horizontalRef} id="featured" className="relative md:h-[600vh] bg-[hsl(var(--brand-green-light))] py-20 md:py-0">
                {/* Precision Anchor for cinematic landing */}
                <div id="portfolio-active" className="absolute top-0 md:top-[120vh]" />

                <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden">
                    {/* Mobile: Vertical Stack / Desktop: Horizontal Scroll */}
                    <motion.div
                        style={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? x : 0 }}
                        className="flex flex-col md:flex-row gap-16 md:gap-24 px-6 md:px-24 items-center will-change-transform"
                    >
                        {/* Intro Lead */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="flex-shrink-0 w-full md:w-[600px] text-center md:text-left"
                        >
                            <motion.span variants={staggerItem} className="inline-flex items-center gap-3 text-brand-gold text-[11px] font-semibold tracking-[0.6em] uppercase mb-10 glass-pill px-5 py-2">
                                <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                Selected Series
                            </motion.span>
                            <motion.h2 variants={staggerItem} className="text-5xl md:text-9xl font-display font-black tracking-tighter mb-10 uppercase leading-[0.85] text-foreground">
                                Visual <br /> Mastery.
                            </motion.h2>
                            <motion.div variants={staggerItem} className="flex items-center gap-8 justify-center md:justify-start">
                                <div className="h-px w-20 md:flex-1 bg-gradient-to-r from-brand-gold/40 to-transparent" />
                                <p className="text-muted-foreground text-xl font-light italic font-serif">
                                    Documenting growth.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Individual Gallery Cards */}
                        {featuredSeries.map((item, i) => (
                            <div key={item.id} className="contents">
                                <div className="hidden md:block">
                                    <HorizontalCard {...item} idx={i} src={item.cover} scrollYProgress={scrollYProgress} />
                                </div>
                                <div className="block md:hidden w-full">
                                    <MobileParallaxCard {...item} idx={i} src={item.cover} />
                                </div>
                            </div>
                        ))}

                        {/* End Point */}
                        <div className="flex-shrink-0 w-full md:w-[400px] flex flex-col items-center py-20 md:py-0">
                            <Link href="/work" className="group flex flex-col items-center text-center">
                                <motion.div
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center shadow-[0_16px_60px_rgba(0,0,0,0.1)] transition-all duration-500"
                                >
                                    <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </motion.div>
                                <span className="mt-8 text-[11px] font-semibold tracking-[0.5em] uppercase text-muted-foreground group-hover:text-brand-gold transition-all duration-300">View Archive</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Philosophy & About (The Story) ─── */}
            <RevealSection className="py-48 md:py-64 relative bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 md:gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: ease }}
                        className="relative"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80&auto=format"
                            alt="Aquila Oyange Portrait"
                            width={600}
                            height={900}
                            className="rounded-3xl object-cover aspect-[3/4] shadow-[0_32px_100px_rgba(0,0,0,0.1)] border border-black/5"
                        />
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-brand-gold text-xl font-serif italic mb-4">This is my Story</h2>
                            <h3 className="text-5xl md:text-7xl font-display font-black text-foreground leading-tight mb-8 tracking-tighter">
                                Let me share <br /> your story.
                            </h3>
                            <div className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed space-y-6 max-w-xl">
                                <p>
                                    My name is <span className="font-semibold text-foreground">Aquila Oyange</span>. I am a Creative Visionary with a passion for driving tangible impact.
                                </p>
                                <p>
                                    Currently, I am pursuing photography (portrait, event, travel). I am driven by Impact Storytelling, viewing every development process as a chance to document and share a narrative of measurable growth.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </RevealSection>

            {/* ─── Repository Grid ─── */}
            <section id="work" className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[200px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-48 -left-48 w-[800px] h-[800px] bg-brand-green/10 blur-[250px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10"
                    >
                        <motion.div variants={staggerItem}>
                            <span className="inline-flex items-center gap-3 text-brand-gold/70 text-[11px] font-semibold tracking-[0.6em] uppercase mb-8 glass-pill px-5 py-2">
                                <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                Full Archive
                            </span>
                            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] text-foreground">
                                The <span className="gold-shimmer font-serif italic tracking-tight">Volumes</span>
                            </h2>
                        </motion.div>

                        <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                            {categories.filter(c => c !== "ALL").map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/work/${cat.toLowerCase()}`}
                                    className="glass-pill px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-brand-gold hover:border-brand-gold/20 transition-all duration-400"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.slice(0, 6).map((item, idx) => (
                            <RepositoryCard key={item.id} item={item} idx={idx} />
                        ))}
                    </motion.div>

                    {/* View All */}
                    <div className="mt-20 text-center">
                        <Link href="/work" className="inline-flex items-center gap-4 text-[12px] font-semibold tracking-[0.4em] uppercase text-muted-foreground hover:text-brand-gold transition-all duration-300 group">
                            Explore Full Archive <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Investment / Pricing ─── */}
            <RevealSection className="py-32 md:py-48 relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,hsla(var(--brand-green),0.08),transparent)] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-20 text-center">
                        <span className="inline-flex items-center gap-3 text-brand-gold text-[11px] font-semibold tracking-[0.6em] uppercase mb-8 glass-pill px-6 py-2 mx-auto bg-white border-black/5">
                            Investment
                        </span>
                        <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-foreground leading-none">Packages</h2>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <InvestmentCard
                            title="Hikes and Safaris"
                            price="KSHS. 12,000"
                            features={["Unlimited pictures", "Nicely edited", "Reel included", "Online Gallery", "~Single day"]}
                            idx={0}
                        />
                        <InvestmentCard
                            title="Outdoors"
                            price="KSHS. 5,000"
                            features={["2 hour session", "20 pictures", "Online gallery", "Professional editing"]}
                            idx={1}
                        />
                        <InvestmentCard
                            title="Events"
                            price="KSHS. 6,000"
                            features={["Coverage per hour", "Unlimited pictures", "Basic editing", "Online gallery"]}
                            idx={2}
                        />
                    </motion.div>
                </div>
            </RevealSection>

            {/* ─── Footer ─── */}
            <motion.footer
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="py-32 md:py-48 border-t border-black/5 bg-white"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-32 items-start mb-24">
                    <div className="space-y-12">
                        <p className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed max-w-lg">
                            &quot;Beauty is not just skin deep; it&apos;s soul deep. It&apos;s the light in your eyes, the warmth of your smile/frown, the kindness in your heart.&quot;
                        </p>
                        <span className="block text-brand-gold font-semibold uppercase tracking-[0.3em] text-[12px]">- Unknown</span>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div className="flex flex-col gap-6">
                            <span className="text-[11px] font-semibold tracking-[0.4em] text-black uppercase">Navigation</span>
                            <div className="flex flex-col gap-3">
                                <Link href="/" className="text-sm text-muted-foreground hover:text-black transition-colors">Home</Link>
                                <Link href="/about" className="text-sm text-muted-foreground hover:text-black transition-colors">About</Link>
                                <Link href="/work" className="text-sm text-muted-foreground hover:text-black transition-colors">Portfolio</Link>
                                <Link href="/investment" className="text-sm text-muted-foreground hover:text-black transition-colors">Investment</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <span className="text-[11px] font-semibold tracking-[0.4em] text-black uppercase">Social</span>
                            <div className="flex flex-col gap-3">
                                <Link href="https://instagram.com/oyange_" target="_blank" className="text-sm text-muted-foreground hover:text-black transition-colors">Instagram</Link>
                                <Link href="https://tiktok.com/@oyange_" target="_blank" className="text-sm text-muted-foreground hover:text-black transition-colors">TikTok</Link>
                                <Link href="https://linkedin.com/in/oyange-aquila" target="_blank" className="text-sm text-muted-foreground hover:text-black transition-colors">LinkedIn</Link>
                                <Link href="https://wa.me/254700000000" target="_blank" className="text-sm text-muted-foreground hover:text-black transition-colors">WhatsApp</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-black/5 pt-12">
                    <Link href="/" className="font-display text-4xl font-black tracking-tighter text-foreground">OYG</Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">© 2026 Oyange Nairobi, Kenya</span>
                </div>
            </motion.footer>

            <BackToTop />

            {/* ─── Floating CTA ─── */}
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3, duration: 1, ease: ease }}
                className="fixed bottom-8 right-8 z-[110]"
            >
                <Link
                    href="/inquire"
                    className="px-8 py-4 bg-white/20 backdrop-blur-3xl text-brand-green font-bold text-[12px] uppercase tracking-[0.3em] rounded-full border border-white/30 flex items-center gap-3 shadow-[0_12px_40px_rgba(26,140,123,0.15)] hover:shadow-[0_20px_80px_rgba(26,140,123,0.3)] hover:bg-white/40 transition-all duration-500"
                    aria-label="Book a Session"
                >
                    <Calendar size={18} /> Inquire
                </Link>
            </motion.div>

            <BackToTop />
        </div>
    );
}

// ─── Glass Horizontal Card ───
function HorizontalCard({ src, title, category, location, idx, scrollYProgress }: { src: string, title: string, category: string, location: string, idx: number, scrollYProgress: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: idx * 0.12, ease: ease }}
            className="flex-shrink-0 w-full md:w-[800px] aspect-[4/5] md:aspect-[16/10] relative group overflow-hidden rounded-3xl shadow-[0_32px_100px_rgba(0,0,0,0.35)] border border-white/5"
        >
            <Link href={`/work/${category.toLowerCase()}`} className="block h-full">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-[2.5s] group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-14 flex flex-col justify-end">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 0.5]) }}
                        className="absolute inset-0 bg-brand-green/30 blur-[160px] pointer-events-none group-hover:bg-brand-green/50 transition-colors duration-1000"
                    />
                    <div className="relative z-10">
                        <span className="text-brand-gold text-[10px] font-semibold tracking-[0.5em] uppercase mb-3 block">{category}</span>
                        <h3 className="text-4xl md:text-7xl font-display font-black text-marble-white group-hover:text-brand-green-bright transition-colors duration-700 mb-4 tracking-tighter leading-none">{title}</h3>
                        <div className="flex items-center gap-4 text-white/50">
                            <MapPin size={14} className="text-brand-gold" />
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-marble-white">{location}</span>
                            <div className="h-px w-8 bg-brand-gold/30" />
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold/40">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-2xl bg-white/20 transition-all duration-500 translate-y-3 group-hover:translate-y-0 shadow-lg">
                    <ArrowRight size={20} className="text-brand-off-white" />
                </div>
            </Link>
        </motion.div>
    );
}

// ─── Glass Repository Card ───
function RepositoryCard({ item, idx }: { item: any, idx: number }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: idx * 0.08, ease: ease }}
        >
            <Link href={`/work/${item.category?.toLowerCase()}`}>
                <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 shadow-[0_16px_60px_rgba(0,0,0,0.25)] hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)] transition-all duration-700 cursor-pointer"
                >
                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-all duration-[2s] opacity-85 group-hover:opacity-100 group-hover:scale-105" />

                    {/* Default bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                        <span className="text-brand-gold/70 text-[10px] font-semibold tracking-[0.5em] uppercase block mb-2">{item.category}</span>
                        <h4 className="text-3xl font-display font-black text-brand-off-white tracking-tighter leading-none">{item.title}</h4>
                    </div>

                    {/* Hover overlay — frosted glass reveal */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] p-8 md:p-10 flex flex-col justify-end rounded-2xl">
                        <span className="text-brand-gold text-[11px] font-semibold tracking-[0.5em] uppercase mb-4">{item.category}</span>
                        <h4 className="text-4xl font-display font-black text-brand-off-white mb-3 tracking-tighter leading-none">{item.title}</h4>
                        <p className="text-brand-off-white/40 text-[12px] font-medium tracking-[0.2em] uppercase mb-6">{item.subtitle}</p>
                        <div className="flex items-center gap-3 text-brand-gold text-[11px] font-semibold tracking-[0.3em] uppercase group/btn">
                            <span>View Volume</span>
                            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}


// ─── Section Reveal Wrapper ───
function RevealSection({ children, className = "" }: { children: ReactNode, className?: string }) {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionReveal}
            className={className}
        >
            {children}
        </motion.section>
    );
}

// ─── Investment Card ───
function InvestmentCard({ title, price, features, idx }: { title: string, price: string, features: string[], idx: number }) {
    return (
        <motion.div
            variants={staggerItem}
            className="group p-10 bg-white border border-black/5 rounded-3xl hover:border-brand-green-bright/30 transition-all duration-700 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_80px_rgba(26,140,123,0.15)]"
        >
            <h3 className="text-2xl font-serif italic mb-2 text-brand-gold">{title}</h3>
            <span className="text-4xl font-black tracking-tighter text-foreground mb-8 block uppercase">{price}</span>
            <ul className="space-y-4">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-medium uppercase tracking-widest leading-none">
                        <span className="w-1 h-1 rounded-full bg-brand-gold/50" />
                        {f}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// ─── Back to Top ───
function BackToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const toggleVisible = () => setVisible(window.scrollY > 1000);
        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    return (
        <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
            className="fixed bottom-10 right-32 z-[150] w-14 h-14 bg-white/30 backdrop-blur-3xl text-brand-green rounded-full flex items-center justify-center border border-white/40 shadow-xl hover:bg-white/50 transition-all duration-300"
        >
            <ArrowRight size={24} className="-rotate-90" />
        </motion.button>
    );
}

// ─── Scroll Progress Bar ───
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[2000] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, hsl(var(--brand-gold)), #ffe59e)",
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
            className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        >
            <div className="w-full h-full rounded-full border border-white/50 shrink-0" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}

// ─── Mobile Parallax Card (Scroll-Driven 3D Tilt) ───
function MobileParallaxCard({ src, title, category, location, idx }: { src: string, title: string, category: string, location: string, idx: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // 3D Tilt Effect based on scroll position
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Glare/Shine Effect moving across the card
    const shineX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const shineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0]);

    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX,
                scale,
                opacity,
                transformPerspective: 800
            }}
            className="w-full aspect-[4/5] relative group overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/5 mb-16 last:mb-0"
        >
            <Link href={`/work/${category.toLowerCase()}`} className="block h-full">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ scale: 1.2 }}
                >
                    <Image
                        src={src}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Living Shine Effect */}
                <motion.div
                    style={{
                        background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 45%, transparent 60%)`,
                        left: shineX,
                        opacity: shineOpacity
                    }}
                    className="absolute inset-0 z-10 w-[200%] -translate-x-1/2 pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end z-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.03 } }
                        }}
                    >
                        <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-brand-gold text-[10px] font-semibold tracking-[0.5em] uppercase mb-3 block">{category}</motion.span>
                        <h3 className="text-5xl font-display font-black text-marble-white mb-4 tracking-tighter leading-none flex flex-wrap gap-x-3">
                            {title.split(" ").map((word, i) => (
                                <motion.span key={i} className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                                    {word}
                                </motion.span>
                            ))}
                        </h3>
                        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex items-center gap-4 text-white/50">
                            <MapPin size={14} className="text-brand-gold" />
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-marble-white">{location || "Kenya"}</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Tactile Tap Indicator */}
                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full glass-card flex items-center justify-center z-30">
                    <ArrowRight size={20} className="text-brand-off-white" />
                </div>
            </Link>
        </motion.div>
    );
}
