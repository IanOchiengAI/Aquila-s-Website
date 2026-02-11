"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, ChevronDown, Calendar, Menu, X } from "lucide-react";
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

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    // Hero Parallax
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <div className="bg-[#050505] text-white selection:bg-brand-gold selection:text-black font-sans overflow-x-hidden underline-offset-8">
            <CustomCursor />
            <ScrollProgress />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-8 transition-all duration-500 hover:bg-black/40 backdrop-blur-md border-b border-white/5"
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-display font-black tracking-[0.2em] uppercase">
                        OYANGE
                    </span>
                </div>
                <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
                    <Link href="#work" className="hover:text-brand-gold transition-colors duration-300">Portfolio</Link>
                    <Link href="#featured" className="hover:text-brand-gold transition-colors duration-300">Series</Link>
                    <Link href="#archive" className="hover:text-brand-gold transition-colors duration-300">Archive</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors duration-300">Contact</Link>
                </div>
                <button className="md:hidden text-white/50"><Menu size={20} /></button>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80&auto=format"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-70 grayscale-[0.2]"
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
                        className="text-[10px] tracking-[0.8em] uppercase text-brand-gold mb-8 font-black"
                    >
                        NAIROBI, KENYA
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="font-serif text-5xl md:text-8xl lg:text-[7.5rem] font-bold leading-[1.1] mb-12 tracking-tight"
                    >
                        Capturing <br />
                        <span className="text-brand-gold italic">Pure Essence</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-2xl mx-auto text-white/60 text-sm md:text-lg font-light leading-relaxed mb-12"
                    >
                        Artisan photography that defines excellence. Elevating your vision <br className="hidden md:block" /> through an uncompromising lens.
                    </motion.p>

                    <motion.div variants={fadeInUp}>
                        <div className="flex flex-col items-center gap-6">
                            <span className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-bold">Scroll to Journey</span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Horizontal Scroll Series */}
            <section ref={horizontalRef} id="featured" className="relative h-[300vh] bg-[#050505]">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-20 px-24 items-center">
                        {/* Intro Lead */}
                        <div className="flex-shrink-0 w-[500px]">
                            <span className="text-brand-gold text-[11px] font-bold tracking-[0.4em] uppercase block mb-6">Selected Series</span>
                            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-none">MASTER <br /> PIECES.</h2>
                            <p className="text-white/40 text-lg max-w-sm leading-relaxed font-light">
                                Flagship projects where light, shadow, and emotion converge to tell a singular story.
                            </p>
                        </div>

                        {/* High Quality Unsplash Series */}
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80&auto=format"
                            title="Sunset Vows"
                            category="Wedding"
                            location="Lake Naivasha, Kenya"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80&auto=format"
                            title="Golden Horizons"
                            category="Landscape"
                            location="Masai Mara Reserve"
                        />
                        <HorizontalCard
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80&auto=format"
                            title="Ethereal Grace"
                            category="Fashion"
                            location="Studio Collection 2026"
                        />

                        {/* End Point */}
                        <div className="flex-shrink-0 w-[400px] flex flex-col items-center justify-center text-center">
                            <Link href="#work" className="group flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold transition-all duration-500 group-hover:scale-110">
                                    <ArrowRight size={32} className="text-white group-hover:text-brand-gold transition-colors" />
                                </div>
                                <span className="mt-8 text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 group-hover:text-white">Full Portfolio</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Selected Works Grid */}
            <section id="work" className="py-40 px-6 md:px-12 bg-black">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <span className="text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block">Archive</span>
                            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter">SELECTED <span className="text-brand-gold italic font-serif">WORKS</span></h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 border ${activeCategory === cat
                                            ? "bg-brand-gold border-brand-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                                            : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
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
                                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                                    className={`${item.wide ? 'lg:col-span-2' : ''} group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/5 cursor-pointer`}
                                >
                                    <Image src={item.cover} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        <span className="text-brand-gold text-[9px] font-bold tracking-[0.3em] uppercase mb-3">{item.category}</span>
                                        <h4 className="text-2xl font-serif font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-white/40 text-[10px] font-light tracking-widest uppercase">{item.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-40 bg-[#050505] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <ServiceBlock title="Weddings" desc="Documenting love stories with cinematic precision." icon={<Camera size={24} />} />
                    <ServiceBlock title="Portraits" desc="Personal sessions that capture unique identity." icon={<Globe size={24} />} />
                    <ServiceBlock title="Editorial" desc="High-end fashion and brand imagery." icon={<ShoppingBag size={24} />} />
                    <ServiceBlock title="Landscape" desc="The raw beauty of the African horizon." icon={<Instagram size={24} />} />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 border-t border-white/5 text-center px-8 bg-black">
                <div className="flex justify-center gap-16 mb-16 text-white/30 text-[10px] font-bold tracking-[0.6em] uppercase">
                    <Link href="#" className="hover:text-brand-gold transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">Behance</Link>
                    <Link href="#" className="hover:text-brand-gold transition-colors">WhatsApp</Link>
                </div>
                <p className="text-white/10 text-[9px] font-bold tracking-[0.5em] uppercase">
                    © 2026 OYANGE PHOTOGRAPHY. HANDCRAFTED IN NAIROBI.
                </p>
            </footer>

            {/* Floating CTA */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-10 right-10 z-[110]"
            >
                <button className="bg-brand-gold text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl flex items-center gap-4 hover:scale-105 transition-all">
                    <Calendar size={18} /> Book Session
                </button>
            </motion.div>
        </div>
    );
}

function HorizontalCard({ src, title, category, location }: { src: string, title: string, category: string, location: string }) {
    return (
        <div className="flex-shrink-0 w-[75vw] md:w-[60vw] max-w-[1100px]">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-[3rem] bg-white/5 cursor-pointer shadow-3xl">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-12 flex flex-col justify-end">
                    <span className="text-brand-gold text-[10px] tracking-[0.4em] uppercase font-black mb-4">{category}</span>
                    <h3 className="font-serif text-4xl md:text-6xl font-bold mb-3">{title}</h3>
                    <p className="text-white/50 text-sm md:text-lg font-light tracking-wide">{location}</p>
                </div>
            </div>
        </div>
    );
}

function ServiceBlock({ title, desc, icon }: { title: string, desc: string, icon: any }) {
    return (
        <div className="group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-gold/10 transition-colors duration-500">
                <div className="text-brand-gold">{icon}</div>
            </div>
            <h3 className="text-2xl font-display font-black tracking-tight mb-4">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed font-light">{desc}</p>
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
