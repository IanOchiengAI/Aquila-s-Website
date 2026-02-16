"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[120] pointer-events-none px-6 md:px-12 py-8 mix-blend-difference text-white">
                <div className="max-w-7xl mx-auto flex flex-row-reverse md:flex-row justify-between items-center pointer-events-auto">
                    {/* Brand Logo */}
                    <Link href="/" className="group z-[130]">
                        <div className="relative w-12 h-12 grayscale brightness-200 contrast-200">
                            <Image
                                src="/assets/logo.jpg"
                                alt="Oyange Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Hamburger Trigger — appears left on mobile, right on desktop */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group flex flex-col justify-center gap-[6px] w-12 h-12 rounded-full cursor-pointer z-[130]"
                        aria-label="Toggle Menu"
                    >
                        <motion.span
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                            className="w-8 h-[2px] bg-current block origin-center transition-all duration-300"
                        />
                        <motion.span
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            className="w-8 h-[2px] bg-current block transition-all duration-300 group-hover:w-5 self-end"
                        />
                        <motion.span
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                            className="w-8 h-[2px] bg-current block origin-center transition-all duration-300"
                        />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
