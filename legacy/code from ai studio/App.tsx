import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ShopSection from './components/ShopSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden selection:bg-gold selection:text-white">
      <Navigation />
      
      <main className="flex-grow">
        <div id="home">
          <HeroSection />
        </div>
        
        <div id="work">
          <GallerySection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        <div id="shop">
          <ShopSection />
        </div>
        
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;