"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, ChevronDown, Calendar, Menu, X } from "lucide-react";
import galleries from "@/data/galleries.json";

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
};

export default function LandingPage() {
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = ["ALL", ...Array.from(new Set(galleries.map((g) => g.category)))];
    const filteredGalleries = activeCategory === "ALL"
        ? galleries.slice(0, 12)
        : galleries.filter((g) => g.category === activeCategory);

    // Horizontal Scroll Reference
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: horizontalScroll } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(horizontalScroll, [0, 1], ["0%", "-75%"]);

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <div className="bg-[#050505] text-white selection:bg-brand-gold selection:text-black font-sans overflow-x-hidden">
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
            >
                <Link href="/" className="group flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-display font-black tracking-[0.25em] uppercase transition-all duration-500 group-hover:tracking-[0.4em]">
                        OYANGE
                    </span>
                </Link>

                <div className="hidden md:flex gap-16 text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">
                    <Link href="#archive" className="hover:text-brand-gold transition-colors">Archive</Link>
                    <Link href="#journey" className="hover:text-brand-gold transition-colors">The Journey</Link>
                    <Link href="#vision" className="hover:text-brand-gold transition-colors">Vision</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">Connect</Link>
                </div>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:text-brand-gold transition-colors">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* Hero Section: The Portal */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
                    <Image
                        src="/images/New Images/website images/Screenshot 2026-02-10 170021.png"
                        alt="Hero Background"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                </motion.div>

                <motion.div
                    style={{ y: heroTextY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 text-center px-6"
                >
                    <p className="text-[10px] md:text-xs tracking-[1em] uppercase text-brand-gold mb-12 font-black leading-none opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                        A Visual Odyssey
                    </p>
                    <h1 className="font-display text-7xl md:text-[14rem] font-black leading-[0.85] tracking-tighter mb-12 outline-text hover:text-white transition-all duration-1000 cursor-default">
                        STORY <br /> <span className="italic font-serif font-light tracking-normal text-white">TELLER</span>
                    </h1>
                    <div className="flex flex-col items-center gap-8 mt-16">
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-24 bg-gradient-to-b from-brand-gold to-transparent opacity-50"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Narrative Quote Section */}
            <section id="vision" className="py-60 px-8 bg-black relative">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-brand-gold text-[11px] font-bold tracking-[0.5em] uppercase mb-16"
                    >
                        The Philosophy
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 leading-tight max-w-5xl">
                        &quot;Photography is not just capturing what you see, <br className="hidden md:block" />
                        but <span className="text-brand-gold">revealing</span> what everyone else misses.&quot;
                    </h2>
                    <div className="mt-20 w-32 h-px bg-white/10" />
                </div>
            </section>

            {/* The Journey: Horizontal Cinematic Flow */}
            <section ref={horizontalRef} id="journey" className="relative h-[400vh] bg-[#050505]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-40 px-[20vw] items-center">

                        {/* Journal Stage 1 */}
                        <div className="flex-shrink-0 w-[600px] flex flex-col gap-10">
                            <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase">Phase 01</span>
                            <h3 className="text-6xl md:text-9xl font-display font-black tracking-tight">THE <br /> SILENCE.</h3>
                            <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
                                In the heart of Nairobi, we find the quiet moments that define the pulse of the city.
                            </p>
                        </div>

                        {/* Cinematic Image 1 */}
                        <JourneyItem
                            src="/images/New Images/website images/Screenshot 2026-02-10 165841.png"
                            title="Celebration of Life"
                            category="Life"
                            size="large"
                        />

                        {/* Journal Stage 2 */}
                        <div className="flex-shrink-0 w-[600px] flex flex-col gap-10">
                            <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase">Phase 02</span>
                            <h3 className="text-6xl md:text-9xl font-display font-black tracking-tight underline decoration-brand-gold underline-offset-[20px]">PURE <br /> VISION.</h3>
                            <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
                                Stripping away the noise to focus on the raw, unfiltered truth of the subject.
                            </p>
                        </div>

                        {/* Cinematic Image 2 */}
                        <JourneyItem
                            src="/images/New Images/website images/Screenshot 2026-02-10 170651.png"
                            title="Primal Earth"
                            category="Nature"
                            size="vertical"
                        />

                        {/* Journal Stage 3 */}
                        <div className="flex-shrink-0 w-[600px] flex flex-col gap-10">
                            <span className="text-brand-gold text-[10px] font-bold tracking-[0.4em] uppercase">Phase 03</span>
                            <h3 className="text-6xl md:text-9xl font-display font-black tracking-tight">THE <br /> LEGACY.</h3>
                            <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm">
                                Every frame is a building block of a story that will outlive us all.
                            </p>
                        </div>

                        {/* Cinematic Image 3 */}
                        <JourneyItem
                            src="/images/New Images/website images/Screenshot 2026-02-10 170546.png"
                            title="Above the Canopy"
                            category="Outdoor"
                            size="large"
                        />

                        {/* Journey End */}
                        <div className="flex-shrink-0 w-[500px] text-center">
                            <Link href="#archive" className="group flex flex-col items-center gap-12">
                                <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-brand-gold group-hover:scale-110">
                                    <ArrowRight size={48} className="text-white transition-transform group-hover:translate-x-4" />
                                </div>
                                <span className="text-[12px] font-bold tracking-[0.6em] uppercase text-white/30 group-hover:text-brand-gold">Enter the Archive</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Archive Grid: The Repository of Moments */}
            <section id="archive" className="py-40 px-6 md:px-12 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 gap-12">
                        <div>
                            <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter mb-6">ARCHIVE</h2>
                            <p className="text-white/30 text-lg md:text-xl font-light tracking-wide max-w-md">
                                A curated repository of clinical precision and artistic chaos.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-700 border ${activeCategory === cat
                                        ? "bg-brand-gold border-brand-gold text-black shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                                        : "bg-transparent border-white/5 text-white/20 hover:border-white/30 hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredGalleries.map((item, idx) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                                    className={`${item.wide ? 'lg:col-span-2' : ''} group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/5`}
                                >
                                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                                        <span className="text-brand-gold text-[9px] font-bold tracking-[0.3em] uppercase mb-4">{item.category}</span>
                                        <h4 className="text-3xl font-serif font-black text-white">{item.title}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Service Mastery Section: The Workings */}
            <section className="py-60 bg-black">
                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-20">
                    <ServiceTile title="Editorial" desc="Storytelling through fashion and identity." icon={<Camera size={32} />} />
                    <ServiceTile title="Documentary" desc="Unfiltered reporting of the human condition." icon={<Globe size={32} />} />
                    <ServiceTile title="Legacy" desc="Preserving moments for the next generation." icon={<ShoppingBag size={32} />} />
                </div>
            </section>

            {/* Connect Banner */}
            <section className="py-60 px-8 bg-[#050505] border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-6xl md:text-[9rem] font-display font-black mb-16 tracking-tighter leading-none">
                        CRAFT <br /> <span className="text-brand-gold italic font-serif font-light">TOGETHER.</span>
                    </h2>
                    <Link href="mailto:hello@oyange.com" className="inline-flex items-center gap-6 text-sm md:text-2xl font-bold tracking-[0.5em] uppercase hover:text-brand-gold transition-all duration-700 group">
                        hello@oyange.com <ArrowRight className="group-hover:translate-x-10 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 border-t border-white/5 text-center px-8 bg-black">
                <div className="flex justify-center gap-16 mb-16 text-white/30 text-[10px] font-bold tracking-[0.5em] uppercase">
                    <Link href="#" className="hover:text-brand-gold transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">Behance</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">LinkedIn</Link>
                </div>
                <p className="text-white/5 text-[10px] font-bold tracking-[0.6em] uppercase">
                    © 2026 OYANGE PHOTOGRAPHY. BORN IN NAIROBI.
                </p>
            </footer>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[200] bg-black p-12 flex flex-col justify-center"
                    >
                        <button onClick={() => setIsMenuOpen(false)} className="absolute top-12 right-12 text-white/50 hover:text-white">
                            <X size={40} />
                        </button>
                        <div className="flex flex-col gap-12 text-5xl font-display font-black tracking-tighter">
                            <Link href="#archive" onClick={() => setIsMenuOpen(false)}>Archive</Link>
                            <Link href="#journey" onClick={() => setIsMenuOpen(false)}>The Journey</Link>
                            <Link href="#vision" onClick={() => setIsMenuOpen(false)}>Vision</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function JourneyItem({ src, title, category, size }: { src: string, title: string, category: string, size: 'large' | 'vertical' }) {
    return (
        <div className={`flex-shrink-0 relative overflow-hidden rounded-[3rem] bg-white/5 ${size === 'large' ? 'w-[70vw] aspect-[16/9]' : 'w-[40vw] aspect-[3/4]'}`}>
            <Image src={src} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-16 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4">{category}</span>
                <h4 className="text-4xl md:text-6xl font-serif font-black">{title}</h4>
            </div>
        </div>
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-brand-gold z-[1000] origin-left shadow-[0_0_20px_rgba(212,175,55,0.5)]"
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
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        >
            <div className="w-full h-full rounded-full border border-white opacity-50" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}

function ServiceTile({ title, desc, icon }: { title: string, desc: string, icon: any }) {
    return (
        <div className="group cursor-default">
            <div className="mb-10 text-white/20 transition-all duration-700 group-hover:text-brand-gold group-hover:scale-110">
                {icon}
            </div>
            <h3 className="text-4xl font-display font-black tracking-tighter mb-4">{title}</h3>
            <p className="text-white/40 text-lg font-light leading-relaxed group-hover:text-white/60 transition-colors">
                {desc}
            </p>
        </div>
    );
}
