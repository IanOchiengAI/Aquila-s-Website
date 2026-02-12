import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AIConcierge from "@/components/AIConcierge";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OYANGE | Travel & Portrait Photographer — Nairobi, Kenya",
  description: "Cinematic travel and portrait photography by Aquila Oyange. Based in Nairobi, Kenya. Specializing in safaris, outdoor portraits, events, and couples.",
  keywords: ["photography", "Nairobi", "Kenya", "portrait", "travel", "wedding", "safari", "outdoor", "photographer"],
  openGraph: {
    title: "OYANGE | Travel & Portrait Photographer",
    description: "Cinematic photography by Aquila Oyange — Nairobi, Kenya",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OYANGE | Travel & Portrait Photographer",
    description: "Cinematic photography by Aquila Oyange — Nairobi, Kenya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased overflow-x-hidden selection:bg-brand-gold selection:text-brand-green`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <AIConcierge />
      </body>
    </html>
  );
}
