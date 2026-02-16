"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface PremiumCardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export default function PremiumCard({ title, children, className = "" }: PremiumCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Spring-smoothed 3D tilt
    const rawRotateY = useTransform(mouseX, [0, 1], [-5, 5]);
    const rawRotateX = useTransform(mouseY, [0, 1], [5, -5]);
    const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

    // Mouse-tracking glow position
    const glowX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const glowY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
            }}
            className={`group relative p-10 rounded-3xl transition-colors duration-700 overflow-hidden cursor-default will-change-transform ${className}`}
        >
            {/* Base background */}
            <div
                className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(145deg, hsl(164 100% 11%) 0%, hsl(164 80% 6%) 100%)" }}
            />

            {/* Mouse-tracking radial glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${useTransform(glowX, v => `${v * 100}%`)} ${useTransform(glowY, v => `${v * 100}%`)}, rgba(197, 157, 77, 0.12), transparent 60%)`,
                }}
            />

            {/* Frosted glass border */}
            <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700"
                style={{
                    border: "1px solid rgba(197, 157, 77, 0.12)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.25)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            />

            {/* Hover glow border */}
            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-brand-gold/25 transition-colors duration-700 pointer-events-none" />

            {/* Decorative corner flourish */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 transition-opacity duration-700">
                <div className="absolute top-6 right-6 w-16 h-[1px] bg-brand-gold" />
                <div className="absolute top-6 right-6 w-[1px] h-16 bg-brand-gold" />
            </div>

            {/* Bottom-left corner flourish (mirror) */}
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-15 transition-opacity duration-700">
                <div className="absolute bottom-6 left-6 w-12 h-[1px] bg-brand-gold" />
                <div className="absolute bottom-6 left-6 w-[1px] h-12 bg-brand-gold" />
            </div>

            {/* Content */}
            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-3xl font-display font-black text-brand-off-white mb-6 uppercase tracking-tight">{title}</h3>
                <div className="text-brand-off-white/70 leading-relaxed font-light">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
