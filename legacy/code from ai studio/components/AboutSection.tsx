import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full min-h-[90vh] bg-white">
      {/* Left Image - B&W Portrait */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-auto min-h-[500px] lg:min-h-full bg-gray-100">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUhXBBEBGsZ3lWc2C792ZTlPDFR960eleZCtDDunrGr7HNZePv8Zv0DoHY6Ho8Sr2vQBSPtoVapBixB13vbKA_mGaes6NdNw61PvSN4tHCOu0gBWAb22PKwP3_xjPtKxqPDF1qMn6JI2dUiUN7aagCIC274dhxHUoayy4Hxo0cm2M4j_PQEheGsEgE3rjS_LbIwK_DSr4JQH4CEfeaeyIDk3-NTc47-OhGloxqzddAuf3LN2iKoMitKnfBfdmz167M64KoHDmX_bGj" 
          alt="Photographer Portrait" 
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 brightness-90"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 py-20 md:px-20 lg:px-32 bg-cream">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-gold"></span>
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">The Photographer</span>
          </div>

          <h2 className="font-display font-bold text-5xl md:text-6xl text-primary leading-[1.1] mb-8">
            Capturing authentic moments, one frame at a time.
          </h2>

          <p className="text-lg font-light text-primary/80 leading-relaxed mb-10">
            I am a visual storyteller dedicated to preserving the raw beauty of life through a cinematic lens. My work bridges the gap between editorial precision and genuine emotion, creating timeless heirlooms for those who value the art of observation. Based in Nairobi, capturing stories worldwide.
          </p>

          <hr className="border-t border-gold/30 w-32 mb-10" />

          <div className="mb-10">
            <h3 className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-3">The Mentor</h3>
            <p className="text-base font-light text-primary/70 leading-relaxed">
              Sharing knowledge through curated workshops and one-on-one coaching for aspiring artists looking to refine their craft and master the business of light.
            </p>
          </div>

          <button className="bg-gold text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-md font-bold text-sm tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold/20 inline-flex items-center gap-2 group">
            Book a Session
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;