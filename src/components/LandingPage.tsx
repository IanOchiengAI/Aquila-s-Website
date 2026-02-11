"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, ChevronDown, Calendar } from "lucide-react";
import galleries from "@/data/galleries.json";

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
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

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <div className="bg-[#0a0a0a] text-white selection:bg-brand-gold selection:text-black font-sans scroll-smooth">
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 transition-all duration-500 hover:bg-black/40 backdrop-blur-md border-b border-white/5"
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-display font-black tracking-[0.2em] uppercase">
                        AQUILA
                    </span>
                </div>
                <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
                    <Link href="#work" className="hover:text-brand-gold transition-colors duration-301">Work</Link>
                    <Link href="#featured" className="hover:text-brand-gold transition-colors duration-301">Series</Link>
                    <Link href="#ecosystem" className="hover:text-brand-gold transition-colors duration-301">Ecosystem</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors duration-301">Contact</Link>
                </div>
                <button className="md:hidden text-white/50">Menu</button>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* Hero Image / Video Placeholder */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60 mix-blend-luminosity"
                        priority
                    />
                </div>

                <motion.div
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="relative z-10 text-center px-6"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-[10px] tracking-[0.8em] uppercase text-brand-gold mb-8 font-bold"
                    >
                        NAIROBI, KENYA
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="font-serif text-5xl md:text-8xl lg:text-[7rem] font-bold leading-[1.1] mb-12 tracking-tight"
                    >
                        Capturing <br />
                        <span className="text-brand-gold italic">Pure Essence</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto text-white/60 text-sm md:text-lg font-light leading-relaxed mb-12"
                    >
                        Timeless photography that defines excellence. Elevating your vision <br className="hidden md:block" /> through an artistic lens.
                    </motion.p>

                    <motion.div variants={fadeInUp}>
                        <div className="flex flex-col items-center gap-6">
                            <span className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-bold">Scroll to Explore</span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Horizontal Scroll Section */}
            <section ref={horizontalRef} id="featured" className="relative h-[300vh] bg-black">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-20 px-24 items-center">
                        {/* Lead Card */}
                        <div className="flex-shrink-0 w-[500px]">
                            <span className="text-brand-gold text-[11px] font-bold tracking-[0.4em] uppercase block mb-6 px-1">Selected Series</span>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">Master <br /> Pieces.</h2>
                            <p className="text-white/40 text-lg max-w-sm leading-relaxed font-light">
                                Flagship projects where light, shadow, and emotion converge to tell a singular story.
                            </p>
                        </div>

                        {/* Horizontal Cards */}
                        {galleries.filter(g => g.wide).map((item, idx) => (
                            <div key={item.id} className="flex-shrink-0 w-[70vw] md:w-[60vw] max-w-[1000px]">
                                <div className="group relative aspect-[16/10] overflow-hidden rounded-[40px] bg-white/5 cursor-pointer shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                                    <Image
                                        src={item.cover}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
                                        <span className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-bold mb-4">{item.category}</span>
                                        <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-white/50 text-sm md:text-base font-light tracking-wide">{item.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* End Card */}
                        <div className="flex-shrink-0 w-[400px] flex flex-col items-center justify-center text-center">
                            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:border-brand-gold transition-all duration-500">
                                <ArrowRight size={32} className="text-white group-hover:text-brand-gold transition-colors" />
                            </div>
                            <span className="mt-8 text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">View All Work</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Selected Works Grid */}
            <section id="work" className="py-40 px-6 md:px-12 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <span className="text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
                            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter">Selected <span className="text-brand-gold italic font-serif italic">Works</span></h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 border ${activeCategory === cat
                                        ? "bg-brand-gold border-brand-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                        : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredGalleries.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-white/5"
                                >
                                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end backdrop-blur-[2px]">
                                        <h4 className="text-2xl font-serif font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-white/60 text-xs font-light tracking-wide">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section id="ecosystem" className="py-40 bg-black">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
                    <EcosystemCard title="Pulse Studio" subtitle="High-End Photography & Film" icon={<Camera size={40} />} />
                    <EcosystemCard title="Pulse Creative" subtitle="Brand Identity & Digital" icon={<Globe size={40} />} />
                    <EcosystemCard title="Pulse Merch" subtitle="Limited Edition Goods" icon={<ShoppingBag size={40} />} />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center px-6">
                <div className="flex justify-center gap-12 mb-10 text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
                    <Link href="#" className="hover:text-brand-gold cursor-hover">Instagram</Link>
                    <Link href="#" className="hover:text-brand-gold cursor-hover">Behance</Link>
                    <Link href="#" className="hover:text-brand-gold cursor-hover">WhatsApp</Link>
                </div>
                <p className="text-white/10 text-[9px] font-bold tracking-[0.5em] uppercase">
                    © 2026 AQUILA OYANGE. HANDCRAFTED IN NAIROBI.
                </p>
            </footer>

            {/* Floating CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-10 right-10 z-[100]"
            >
                <button className="bg-brand-gold text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">
                    <Calendar size={18} /> Book Session
                </button>
            </motion.div>
        </div>
    );
}

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-brand-gold z-[1000] origin-left"
            style={{ scaleX }}
        />
    );
}

function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const springX = useSpring(mouseX, { damping: 20, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 20, stiffness: 150 });

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
            <div className="w-full h-full rounded-full border border-white" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}

function EcosystemCard({ title, subtitle, icon }: { title: string, subtitle: string, icon: any }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group p-12 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem] cursor-pointer"
        >
            <div className="mb-8 text-white/30 group-hover:text-brand-gold transition-colors duration-500">
                {icon}
            </div>
            <h3 className="text-3xl font-display font-bold mb-4 tracking-tighter">{title}</h3>
            <p className="text-white/40 text-sm font-light leading-relaxed tracking-wide mb-8">{subtitle}</p>
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 group-hover:text-white transition-colors">
                Enter <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
        </motion.div>
    );
}
