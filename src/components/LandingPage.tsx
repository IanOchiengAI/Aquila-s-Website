"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, ChevronDown, Calendar, Menu, X } from "lucide-react";
import galleries from "@/data/galleries.json";

// Animation Variants - Refined for "Mac" feel
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
    const categories = ["ALL", ...Array.from(new Set(galleries.map((g) => g.category)))];

    const filteredGalleries = activeCategory === "ALL"
        ? galleries.slice(0, 8)
        : galleries.filter((g) => g.category === activeCategory);

    // Horizontal Scroll Reference
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    // Calculate X transform - Adjusted for better stability
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
    const heroImageY = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <div className="bg-background text-foreground selection:bg-brand-gold selection:text-black font-sans overflow-x-hidden">
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation - Glassmorphism */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl glass-card rounded-2xl flex items-center justify-between px-8 py-4 px-12"
            >
                <div className="flex items-center gap-2">
                    <span className="text-xl font-display font-black tracking-widest uppercase">
                        OYANGE
                    </span>
                </div>
                <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-foreground/50">
                    <Link href="#featured" className="hover:text-foreground transition-colors duration-300">Series</Link>
                    <Link href="#work" className="hover:text-foreground transition-colors duration-300">Portfolio</Link>
                    <Link href="#" className="hover:text-foreground transition-colors duration-300">Contact</Link>
                </div>
                <button className="md:hidden text-foreground/50"><Menu size={18} /></button>
            </motion.nav>

            {/* Hero Section - Mac Style Softness */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-90 scale-105"
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
                        className="text-[10px] tracking-[0.6em] uppercase text-brand-gold mb-6 font-bold"
                    >
                        Nairobi &middot; Craftsmanship
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="font-serif text-6xl md:text-9xl font-bold leading-none mb-10 tracking-tight"
                    >
                        The Art of <br />
                        <span className="italic">Observation</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-xl mx-auto text-foreground/70 text-base md:text-lg font-light leading-relaxed mb-10 text-balance"
                    >
                        Premium photography defined by precision and emotion. We capture the moments that define your legacy.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex justify-center gap-6">
                        <Link href="#featured" className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm hover:scale-105 transition-transform">Explore Series</Link>
                        <Link href="#" className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">Contact</Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Horizontal Scroll Series - Adjusted Card Location & Visibility */}
            <section ref={horizontalRef} id="featured" className="relative h-[400vh] bg-background">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-16 px-24 items-center">
                        {/* Intro Lead */}
                        <div className="flex-shrink-0 w-[450px]">
                            <span className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">Focus Series</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase">Selected <br /> Works.</h2>
                            <p className="text-foreground/40 text-lg max-w-xs leading-relaxed font-light text-balance">
                                Carefully curated collections where vision meets technical mastery.
                            </p>
                        </div>

                        {/* Mac-Inspired Series Cards - Reduced size for visibility */}
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&q=80&auto=format"
                            title="Symmetry"
                            category="Architectural"
                            location="Modernist Study No. 1"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80&auto=format"
                            title="Tidal Wave"
                            category="Fine Art"
                            location="Coastal Reflections"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
                            title="Velvet"
                            category="Identity"
                            location="Editorial 2026"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1400&q=80&auto=format"
                            title="Roots"
                            category="Documentary"
                            location="Kibera, Nairobi"
                        />

                        {/* End Point */}
                        <div className="flex-shrink-0 w-[300px] flex flex-col items-center">
                            <Link href="#work" className="group flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-all duration-500 group-hover:scale-110">
                                    <ArrowRight size={24} className="text-foreground" />
                                </div>
                                <span className="mt-6 text-[10px] font-bold tracking-[0.3em] uppercase text-foreground/30">Archive</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-60 bg-background border-y border-white/5">
                <div className="max-w-5xl mx-auto px-8 text-center">
                    <span className="text-brand-gold text-[11px] font-bold tracking-[0.8em] uppercase mb-16 block">The Vision</span>
                    <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 leading-tight">
                        &quot;Photography is not just capturing what you see, but revealing what everyone else misses.&quot;
                    </h2>
                </div>
            </section>

            {/* Selected Works Grid - Clean Mac Look */}
            <section id="work" className="py-32 px-6 md:px-12 bg-background border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase">The Repository</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                            ? "bg-foreground text-background shadow-lg"
                                            : "bg-white/5 text-foreground/40 hover:bg-white/10"
                                        }`}
                                    aria-label={`Filter by ${cat}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredGalleries.map((item, idx) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-white/5 shadow-2xl"
                                >
                                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-brand-gold text-[8px] font-bold tracking-widest uppercase mb-2">{item.category}</span>
                                        <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-white/50 text-[10px] uppercase font-light tracking-widest">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Footer - Minimal */}
            <footer className="py-20 border-t border-white/5 text-center px-8 bg-background">
                <div className="flex justify-center gap-12 mb-10 text-foreground/40 text-[9px] font-bold tracking-[0.4em] uppercase">
                    <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">LinkedIn</Link>
                </div>
                <p className="text-foreground/10 text-[8px] font-bold tracking-widest uppercase">
                    &copy; 2026 OYANGE Photography. Built for the high-end.
                </p>
            </footer>

            {/* Mac-Style Floating CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-8 right-8 z-[110]"
            >
                <button
                    className="glass-card text-foreground px-8 py-4 rounded-full font-bold text-[11px] shadow-2xl flex items-center gap-3 hover:scale-105 hover:bg-white/10 transition-all"
                    aria-label="Book a Session"
                >
                    <Calendar size={16} /> Book Session
                </button>
            </motion.div>
        </div>
    );
}

function HorizontalCard({ src, title, category, location }: { src: string, title: string, category: string, location: string }) {
    return (
        <div className="flex-shrink-0 w-[60vw] md:w-[45vw] max-w-[800px]">
            <div className="group relative aspect-[14/9] overflow-hidden rounded-[2.5rem] glass-card shadow-3xl">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-10 flex flex-col justify-end">
                    <span className="text-brand-gold text-[9px] tracking-widest uppercase font-bold mb-3">{category}</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{title}</h3>
                    <p className="text-white/60 text-xs md:text-sm font-light tracking-wide">{location}</p>
                </div>
            </div>
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
