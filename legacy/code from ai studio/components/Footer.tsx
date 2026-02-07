import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-2 sm:px-4 pb-4 bg-cream">
      <div className="relative w-full overflow-hidden bg-primary rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-8 pt-16 pb-8 md:px-16 md:pt-24 md:pb-12 text-white">
        
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }}></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          <div className="flex flex-col gap-4">
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">Inquiries</span>
            <a href="mailto:hello@oyange.com" className="font-display font-bold text-3xl sm:text-4xl md:text-6xl break-all hover:text-gold transition-colors duration-300">
              hello@oyange.com
            </a>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase md:hidden">Social</span>
            <nav className="flex flex-col gap-3 md:text-right">
              <a href="#" className="group flex items-center gap-2 md:justify-end hover:text-gold transition-colors">
                <span className="font-light tracking-widest">INSTAGRAM</span>
                <span className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">north_east</span>
              </a>
              <a href="#" className="group flex items-center gap-2 md:justify-end hover:text-gold transition-colors">
                <span className="font-light tracking-widest">LINKEDIN</span>
                <span className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">north_east</span>
              </a>
              <a href="#" className="group flex items-center gap-2 md:justify-end hover:text-gold transition-colors">
                <span className="font-light tracking-widest">TWITTER</span>
                <span className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">north_east</span>
              </a>
            </nav>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8 relative z-10"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <p className="text-white/40 text-[10px] sm:text-xs font-normal tracking-wide uppercase">
            © 2024 Oyange Portfolio. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;