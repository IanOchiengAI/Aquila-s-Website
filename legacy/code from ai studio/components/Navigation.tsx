import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-center px-4 ${scrolled ? 'py-4' : 'py-6 md:py-8'}`}>
        <nav className={`
          flex items-center justify-between w-full max-w-5xl h-16 px-6 rounded-full 
          transition-all duration-300
          ${scrolled 
            ? 'bg-primary/90 text-white shadow-xl backdrop-blur-md border border-white/10' 
            : 'bg-white/70 text-primary shadow-sm backdrop-blur-sm border border-primary/5'}
        `}>
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="material-symbols-outlined text-2xl">photo_camera</span>
            <span className="font-display font-bold text-xl tracking-wide uppercase">Oyange</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'About', 'Shop', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-xs font-bold tracking-[0.2em] uppercase hover:text-gold transition-colors relative group`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-white/10' : 'hover:bg-primary/10'}`}>
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className={`p-2 rounded-full transition-colors relative ${scrolled ? 'hover:bg-white/10' : 'hover:bg-primary/10'}`}>
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full"></span>
            </button>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center">
           <div className="flex flex-col gap-8 text-center">
            {['Work', 'About', 'Shop', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white text-3xl font-display font-bold uppercase hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
           </div>
        </div>
      )}
    </>
  );
};

export default Navigation;