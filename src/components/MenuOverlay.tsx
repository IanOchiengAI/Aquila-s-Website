"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

const menuLinks = [
    { href: "/", label: "Home", sub: "Start Here" },
    { href: "/work", label: "Portfolio", sub: "Selected Works" },
    { href: "/work/portraits", label: "Portraits", sub: "People & Faces" },
    { href: "/work/couples", label: "Couples", sub: "Love Stories" },
    { href: "/work/adventure", label: "Adventure", sub: "Wild & Free" },
    { href: "/inquire", label: "Contact", sub: "Let's Talk" },
];

const socialLinks = [
    { href: "https://instagram.com/oyange_", icon: Instagram, label: "lnstagram" },
    {
        href: "https://www.tiktok.com/@0yange_",
        icon: (props: any) => (
            <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
        ),
        label: "TikTok"
    },
    { href: "https://www.linkedin.com/in/oyange-aquila/", icon: Linkedin, label: "LinkedIn" },
];

// Animation Variants
const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
};

const slideVariants: Variants = {
    hidden: { x: "-100%" },
    visible: {
        x: "0%",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        x: "-100%",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: 20 },
};

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                variants={slideVariants}
                className="absolute top-0 left-0 md:left-auto md:right-0 w-full md:w-[600px] h-full bg-[#0a0a0a] text-white p-8 md:p-16 flex flex-col justify-between overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent clicking background default close
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-green/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Empty header spacer for close button alignment */}
                <div className="h-16" />

                {/* Links Container */}
                <motion.div variants={containerVariants} className="flex flex-col gap-6 md:gap-8">
                    <motion.span variants={itemVariants} className="text-brand-gold text-[10px] font-semibold tracking-[0.5em] uppercase mb-4 block">
                        Navigation
                    </motion.span>

                    {menuLinks.map((link) => (
                        <motion.div key={link.href} variants={itemVariants}>
                            <Link
                                href={link.href}
                                onClick={onClose}
                                className="group flex items-center justify-between py-2 border-b border-white/10 hover:border-brand-gold/50 transition-colors duration-500"
                            >
                                <div className="flex flex-col">
                                    <span className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500 text-white group-hover:text-brand-gold">
                                        {link.label}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-500 ml-1">
                                        {link.sub}
                                    </span>
                                </div>
                                <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brand-gold" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer / Socials */}
                <motion.div variants={containerVariants} className="mt-12">
                    <motion.div variants={itemVariants} className="flex gap-6 mb-8">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                            >
                                <social.icon size={16} />
                            </Link>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-between items-end border-t border-white/10 pt-8">
                        <div className="flex flex-col">
                            <div className="relative w-12 h-12 grayscale brightness-200 contrast-200">
                                <Image
                                    src="/assets/logo.jpg"
                                    alt="Oyange Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/20">© {new Date().getFullYear()}</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
