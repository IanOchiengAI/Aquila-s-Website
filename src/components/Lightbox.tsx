"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface LightboxContextType {
    openLightbox: (src: string, title?: string, category?: string) => void;
    closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error("useLightbox must be used within a LightboxProvider");
    }
    return context;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const openLightbox = (src: string, t?: string, c?: string) => {
        setImageSrc(src);
        setTitle(t || null);
        setCategory(c || null);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
        // Delay clearing source to allow exit animation
        setTimeout(() => {
            setImageSrc(null);
            setTitle(null);
            setCategory(null);
        }, 500);
    };

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
            {children}
            <AnimatePresence>
                {isOpen && imageSrc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-8 right-8 text-white/50 hover:text-brand-gold transition-colors duration-300 z-50 p-2"
                        >
                            <X size={32} />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={imageSrc}
                                alt={title || "Fullscreen Image"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />

                            {/* Caption info */}
                            {(title || category) && (
                                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                    {category && (
                                        <span className="text-brand-gold text-[10px] font-semibold tracking-[0.4em] uppercase block mb-2 shadow-black drop-shadow-md">
                                            {category}
                                        </span>
                                    )}
                                    {title && (
                                        <h3 className="text-white text-2xl font-display font-light tracking-wide shadow-black drop-shadow-md">
                                            {title}
                                        </h3>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </LightboxContext.Provider>
    );
}

// Helper button component to trigger lightbox
export function LightboxTrigger({ src, title, category, className }: { src: string, title?: string, category?: string, className?: string }) {
    const { openLightbox } = useLightbox();
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(src, title, category);
            }}
            className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all duration-300 shadow-lg ${className}`}
            aria-label="View Fullscreen"
        >
            <ZoomIn size={18} />
        </button>
    );
}
