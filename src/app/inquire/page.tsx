"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

export default function InquirePage() {
    return (
        <div className="min-h-screen bg-background text-brand-off-white selection:bg-brand-gold selection:text-brand-green noise-overlay glass-surface pb-32">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="pointer-events-auto w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-105 transition-all duration-300 group">
                        <ArrowLeft size={20} className="text-brand-green group-hover:text-brand-gold transition-colors duration-300" />
                    </Link>

                    <div className="pointer-events-auto glass-pill px-6 py-3 flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                        <span className="text-[11px] font-semibold tracking-[0.4em] text-brand-gold uppercase leading-none">Booking</span>
                    </div>
                </div>
            </nav>

            <div className="pt-32 md:pt-48 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] mb-12 text-brand-green">
                        Secure <br /> <span className="text-brand-gold">Your Date.</span>
                    </h1>
                    <p className="text-brand-green/80 text-xl font-medium leading-relaxed mb-16 max-w-md">
                        We take on a limited number of commissions per year to ensure the highest level of stewardship for each client.
                    </p>

                    <div className="space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <Mail size={20} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold mb-1">Email</span>
                                <a href="mailto:hello@oyange.studio" className="text-xl font-display font-bold text-brand-green hover:text-brand-gold transition-colors">hello@oyange.studio</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <Phone size={20} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold mb-1">Phone</span>
                                <a href="tel:+254717393576" className="text-xl font-display font-bold text-brand-green hover:text-brand-gold transition-colors">+254 717 393 576</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-gold mb-1">Studio</span>
                                <span className="text-xl font-display font-bold text-brand-green">Westlands, Nairobi</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Calendar Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="glass-card p-2 md:p-4 rounded-3xl overflow-hidden min-h-[450px] shadow-[0_32px_100px_rgba(0,0,0,0.08)] bg-white/50"
                >
                    {calLink ? (
                        <iframe
                            src={`https://cal.com/${calLink}?theme=light`}
                            className="w-full h-full min-h-[430px] border-0 rounded-2xl"
                            title="Book a Session"
                        />
                    ) : (
                        <div className="w-full h-full min-h-[430px] bg-brand-green/5 flex flex-col items-center justify-center text-center p-8 border border-black/5 rounded-2xl">
                            <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                                <Phone size={32} />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-foreground mb-2">Book Your Session</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mb-8">
                                Reach out via WhatsApp or email to secure your date. We respond within 24 hours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/254717393576?text=Hi%20Oyange%2C%20I%27d%20like%20to%20book%20a%20session!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-brand-green text-brand-off-white font-bold text-[12px] uppercase tracking-[0.3em] rounded-full hover:bg-brand-gold hover:text-brand-green transition-all shadow-lg"
                                >
                                    WhatsApp Us
                                </a>
                                <a
                                    href="mailto:hello@oyange.studio"
                                    className="px-8 py-4 bg-brand-gold text-brand-green font-bold text-[12px] uppercase tracking-[0.3em] rounded-full hover:bg-brand-green hover:text-brand-gold transition-all shadow-lg"
                                >
                                    Email Us
                                </a>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
