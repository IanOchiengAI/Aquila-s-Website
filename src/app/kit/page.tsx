"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Camera, Aperture, Monitor, HardDrive } from "lucide-react";

const gear = [
    { title: "Sony A7R V", category: "Camera Body", desc: "61MP Full-Frame sensor for unmatched detail.", icon: <Camera size={24} /> },
    { title: "Sony A7S III", category: "Camera Body", desc: "Low-light mastery and 4K 120p cinema.", icon: <Camera size={24} /> },
    { title: "GM 50mm f/1.2", category: "Lens", desc: "The ultimate portrait lens with creamy bokeh.", icon: <Aperture size={24} /> },
    { title: "GM 24-70mm f/2.8", category: "Lens", desc: "Versatile zoom for run-and-gun documentary.", icon: <Aperture size={24} /> },
    { title: "Profoto B10X", category: "Lighting", desc: "Studio quality light in a portable package.", icon: <Monitor size={24} /> },
    { title: "MacBook Pro M3", category: "Editing", desc: "The powerhouse for on-set tethering.", icon: <HardDrive size={24} /> },
];

export default function KitPage() {
    return (
        <div className="min-h-screen bg-background text-brand-off-white selection:bg-brand-gold selection:text-brand-green noise-overlay glass-surface pb-32">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="pointer-events-auto w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                        <ArrowLeft size={20} className="text-brand-off-white/60 group-hover:text-brand-gold transition-colors duration-300" />
                    </Link>

                    <div className="pointer-events-auto glass-pill px-6 py-3 flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-[11px] font-semibold tracking-[0.4em] text-brand-gold uppercase leading-none">The Kit</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="pt-40 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <h1 className="text-6xl md:text-[clamp(4rem,10vw,10rem)] font-display font-black tracking-tighter uppercase leading-[0.85] mb-12 text-brand-off-white">
                        Standard <br /> <span className="text-brand-gold/90">Issue.</span>
                    </h1>
                </motion.div>
            </header>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gear.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="glass-card p-10 rounded-3xl"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-8 border border-brand-gold/5">
                            {item.icon}
                        </div>
                        <span className="text-[10px] font-semibold tracking-[0.4em] text-brand-off-white/30 uppercase mb-3 block">{item.category}</span>
                        <h3 className="text-2xl font-display font-black text-brand-off-white mb-4 uppercase">{item.title}</h3>
                        <p className="text-brand-off-white/50 text-sm leading-relaxed font-light">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
