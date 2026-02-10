"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Camera, ShoppingBag, Instagram, Mail, ChevronDown } from "lucide-react";
import galleries from "@/data/galleries.json";

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
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

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-gold selection:text-black font-sans scroll-smooth">
            <CustomCursor />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 bg-black/20 backdrop-blur-xl border-b border-white/5"
            >
                <div className="text-2xl font-display font-black tracking-tighter uppercase">
                    AQUILA <span className="text-brand-gold font-serif">.</span>
                </div>
                <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
                    <Link href="#work" className="hover:text-brand-gold transition-all duration-300">Portfolios</Link>
                    <Link href="#ecosystem" className="hover:text-brand-gold transition-all duration-300">Ecosystem</Link>
                    <Link href="#" className="hover:text-brand-gold transition-all duration-300">About</Link>
                    <Link href="#" className="hover:text-brand-gold transition-all duration-300">Contact</Link>
                </div>
                <button className="md:hidden text-white/50 hover:text-white transition-colors">
                    Menu
                </button>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
                {/* Cinematic Backdrop */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[200px] pointer-events-none opacity-30" />

                <motion.div
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="z-10 text-center"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-brand-gold font-serif italic text-lg md:text-2xl mb-6 tracking-wide"
                    >
                        Digital Artisan & Visual Architect
                    </motion.p>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-7xl md:text-[13rem] font-display font-black tracking-tighter text-white mb-8 leading-[0.8] mix-blend-difference"
                    >
                        AQUILA <br /> OYANGE
                    </motion.h1>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12"
                    >
                        <Link href="#work" className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-brand-gold transition-all duration-500">
                            View Portfolio <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-12 hidden md:flex items-center gap-6"
                >
                    <Instagram size={18} className="text-white/20 hover:text-brand-gold cursor-pointer transition-colors" />
                    <div className="w-12 h-px bg-white/10" />
                    <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase underline underline-offset-8">Scroll Experience</span>
                </motion.div>
            </section>

            {/* Featured Work / Gallery */}
            <section id="work" className="py-40 bg-[#080808]">
                <div className="px-6 md:px-12 mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-display font-bold mb-12"
                    >
                        Selected <span className="text-brand-gold">Craft</span>
                    </motion.h2>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-20">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 border ${activeCategory === cat
                                        ? "bg-brand-gold border-brand-gold text-black"
                                        : "bg-transparent border-white/10 text-white/40 hover:border-white/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredGalleries.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className={`${item.wide ? 'lg:col-span-2' : ''} group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5`}
                                >
                                    <Image
                                        src={item.cover}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end backdrop-blur-[2px]">
                                        <span className="text-brand-gold text-[9px] font-bold tracking-[0.3em] uppercase mb-2">{item.category}</span>
                                        <h4 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-white/50 text-xs font-light tracking-wide">{item.subtitle}</p>
                                        <ArrowRight className="absolute bottom-8 right-8 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section id="ecosystem" className="py-40 bg-black relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
                <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter">The <span className="text-brand-gold">Ecosystem</span></h2>
                        <p className="max-w-xl mx-auto text-white/40 text-sm font-light leading-relaxed tracking-wide">
                            A collective of creative services unified by a single vision: uncompromising quality and cinematic storytelling.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <EcosystemCard
                            title="Pulse Creative"
                            subtitle="Brand Identity & Digital Strategy"
                            icon={<Globe size={40} />}
                            accent="blue"
                        />
                        <EcosystemCard
                            title="Pulse Studio"
                            subtitle="High-End Photography & Film"
                            icon={<Camera size={40} />}
                            accent="gold"
                        />
                        <EcosystemCard
                            title="Pulse Merch"
                            subtitle="Limited Edition Apparel & Goods"
                            icon={<ShoppingBag size={40} />}
                            accent="green"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Banner */}
            <section className="py-40 px-6 border-t border-white/5 bg-[#050505]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-8xl font-display font-bold mb-12 tracking-tight">Let&apos;s build <br /> <span className="text-brand-gold italic font-serif">something</span> real.</h2>
                    <Link href="mailto:hello@aquila.com" className="inline-flex items-center gap-4 text-sm md:text-xl font-bold tracking-[0.5em] uppercase hover:text-brand-gold transition-colors duration-500 group">
                        hello@oyange.com <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-white/20 text-[10px] items-center uppercase font-bold tracking-[0.4em] text-center">
                <div className="flex justify-center gap-12 mb-8 text-white/40">
                    <span className="hover:text-white cursor-pointer transition-colors">Behance</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                    <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                </div>
                <p>© {new Date().getFullYear()} AQUILA OYANGE. HANDCRAFTED IN NAIROBI.</p>
            </footer>
        </div>
    );
}

function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
            style={{
                translateX: cursorX,
                translateY: cursorY,
                x: -16,
                y: -16,
            }}
        >
            <div className="w-full h-full rounded-full border border-brand-gold/50 bg-brand-gold/5 backdrop-blur-sm" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}

function EcosystemCard({ title, subtitle, icon, accent }: { title: string, subtitle: string, icon: any, accent: "blue" | "gold" | "green" }) {
    const accentColors = {
        blue: "group-hover:text-blue-400 group-hover:border-blue-500/30 shadow-blue-500/0 hover:shadow-blue-500/10",
        gold: "group-hover:text-brand-gold group-hover:border-brand-gold/30 shadow-brand-gold/0 hover:shadow-brand-gold/10",
        green: "group-hover:text-emerald-400 group-hover:border-emerald-500/30 shadow-emerald-500/0 hover:shadow-emerald-500/10",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`group relative p-12 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm rounded-[2rem] cursor-pointer transition-all duration-700 ${accentColors[accent]} hover:shadow-2xl`}
        >
            <div className="mb-10 text-white/30 transition-transform duration-700 group-hover:scale-110 group-hover:text-current">
                {icon}
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-4 tracking-tighter">{title}</h3>
            <p className="text-white/40 text-sm font-light leading-relaxed tracking-wide min-h-[3rem]">{subtitle}</p>

            <div className="mt-12 flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 group-hover:text-white transition-colors">
                Enter Experience <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
        </motion.div>
    );
}
