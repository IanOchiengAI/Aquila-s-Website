import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* Scattered Photos Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Top Left - Landscape */}
        <div className="absolute top-[15%] left-[5%] w-48 md:w-64 -rotate-12 shadow-2xl bg-white p-2 md:p-3 animate-float-slow hover:z-20 transition-all duration-500 hover:scale-105">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB-QrgNT3CKLOCbdAdzCaPhi4-46DOuOJg0o9JuveaWSTAYpC5zIw-76gi2il64KWUyRPPsucwatnxqrjKJPCx2L3gY_ELSzyCrM79R9jAel60_2BavHQtzUUMmeRibgdV66nbdjftXOG1EpVGBovtU0NRMnO46Q4DvdyNHCWFCAHdqtjRngo0zvhnoYFpuxdvslqtkuaHSY97ODaBA_x9u6LR9amRB0w1-mnsURwBEhdgcYj9W2urKve_Q2o9DM7VmZdcr_n5xj1B" 
            alt="Savanna Landscape" 
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>

        {/* Top Right - Portrait */}
        <div className="absolute top-[12%] right-[8%] w-40 md:w-56 rotate-[15deg] shadow-2xl bg-white p-2 md:p-3 animate-float-medium hover:z-20 transition-all duration-500 hover:scale-105 delay-700">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL6lG3_EwfQHV9zH2fcjoZgjM44CwYwv8l2yHqIPCJCBK5wA3dxDD5M51W2LAoHj0j36yD0YbOePtP5mo5YI7VDNplqFCxmtmYH5uqs89Wrv9QQ8K-iWFfIWoGQ8262Y-xRlO6cpnJA7txwW2X5Dx-kqMuWG5BrHd0i7l3e0qyzujj5ESaC9zikoT-kNpbi_41wuXnFQHC1lbuSEY05QVJNZhhynRzBP4LKbaFdrYWBR4VXoKfQTxfuiwNN3oTR3MNuLn1ZWT6aZeQ" 
            alt="African Portrait" 
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>

        {/* Middle Left - Elephant */}
        <div className="hidden sm:block absolute top-[50%] left-[8%] w-52 md:w-72 rotate-[8deg] shadow-2xl bg-white p-2 md:p-3 animate-float-fast hover:z-20 transition-all duration-500 hover:scale-105 delay-300">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpM3exqIU_9koTbCYuHYHzhRD4RATxYLC07Fbl-9wCHO1vAbN5eaj6_efpxb3SnrCgNUlWmDS-YV9_P0QwY6X_js40IOHzkKMPthxlWo6bQwJT4m54XjmcOLSWWPRS8xaLhYVlZJCG6Nj_2v0VcR9hXXwZeL8P1IxD7SVLIo4srUYYBTELYOl8Z_SelqY5NVBxQ4xKBWLojIei45u8JKQgXZRieaUsO0BYu8Ax_AGrSiHHCauaQg5ity2MLlLCTmr_offB2sWkvCA4" 
            alt="Elephant" 
            className="w-full h-full object-cover aspect-[4/5]"
          />
        </div>

        {/* Bottom Right - Mountain */}
        <div className="hidden sm:block absolute bottom-[15%] right-[12%] w-48 md:w-64 rotate-[-8deg] shadow-2xl bg-white p-2 md:p-3 animate-float-slow hover:z-20 transition-all duration-500 hover:scale-105 delay-500">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFv4h0f9lO_nD_zx32wyegHi0ftPwajmzqZXQwWcHbhNC_WCgjyp8s5JNNSogfG32VLfMp70fnSeREftwmSSEiCCqYAzydfBTRptk900wZTvbpeHY4GM1WJJdhPQ5-gv7QIjt98n82-VdyrKL5VxPlts60c4GDArG8zZ9ovEUyl1nxl8CtFdUy73PnHKQEqrmJWuN0vb9loOjeS_tv9JPDx7UsMvyVrWKazxh5WXvTrWZIzUr4fxNyCZ7dAhKF8uAC6wFlm8aT-3gw" 
            alt="Mount Kenya" 
            className="w-full h-full object-cover aspect-[4/5]"
          />
        </div>
        
        {/* Bottom Left - Lion */}
        <div className="absolute bottom-[5%] left-[20%] w-44 md:w-56 -rotate-6 shadow-2xl bg-white p-2 md:p-3 animate-float-medium hover:z-20 transition-all duration-500 hover:scale-105 delay-1000">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlZOnXJBJVL6uQYH0L8yN-j9MbIsLOBc_GThXLvtLTpjcLecebdiv_6imjaRe-MT-2BJJ5004-tKnX69bANiyBHNpsGR9TyDi3A589HHeisSuGIZaT_cx-XcvFqm7s3eVWPVSaG-yhWtbNW8AZxXWYEwtlnjmM746bjXutW_Vu-paZuqEFDIhwpWL2JF3bw97Def57EdDHItN6C8053HWMpBF3ci4UR6tshqQjKShSCsAOGtlML_nZwHH907nTg_uMcWiTe-qefv_v" 
              alt="Lion" 
              className="w-full h-full object-cover aspect-square"
            />
        </div>

      </div>

      {/* Central Text */}
      <div className="relative z-10 text-center mix-blend-multiply px-4 pointer-events-none">
        <h1 className="font-display font-black text-[18vw] md:text-[14vw] leading-[0.8] tracking-tight text-primary select-none opacity-90">
          OYANGE
        </h1>
        
        <div className="mt-6 md:mt-10 flex items-center justify-center gap-4 animate-fade-in-up">
          <div className="h-[1px] w-8 md:w-16 bg-gold"></div>
          <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] text-gold font-bold uppercase">
            Beyond the Mosaic
          </h2>
          <div className="h-[1px] w-8 md:w-16 bg-gold"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-20 animate-bounce">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase opacity-60">Explore</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent"></div>
      </div>

    </section>
  );
};

export default HeroSection;