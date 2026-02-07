import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 w-full bg-cream flex justify-center">
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display font-bold text-5xl md:text-7xl text-primary leading-tight">
            LET'S CREATE <br /> TOGETHER
          </h2>
          <p className="text-primary/70 font-light text-lg md:text-xl max-w-md mx-auto">
            Available for editorial, commercial, and portrait commissions worldwide.
          </p>
        </div>

        <form className="w-full flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="block text-xs font-bold tracking-[0.2em] text-gold mb-2 uppercase" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Your Name"
              className="w-full bg-transparent border-0 border-b border-primary py-3 px-0 text-primary placeholder:text-primary/30 focus:ring-0 focus:border-gold transition-colors text-xl font-light"
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold tracking-[0.2em] text-gold mb-2 uppercase" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="yourname@example.com"
              className="w-full bg-transparent border-0 border-b border-primary py-3 px-0 text-primary placeholder:text-primary/30 focus:ring-0 focus:border-gold transition-colors text-xl font-light"
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold tracking-[0.2em] text-gold mb-2 uppercase" htmlFor="service">Service Type</label>
            <select 
              id="service" 
              className="w-full bg-transparent border-0 border-b border-primary py-3 px-0 text-primary focus:ring-0 focus:border-gold transition-colors text-xl font-light cursor-pointer"
            >
              <option value="" disabled selected>Select a service</option>
              <option value="editorial">Editorial Photography</option>
              <option value="commercial">Commercial Campaign</option>
              <option value="portrait">Portrait Session</option>
            </select>
          </div>

          <div className="group">
            <label className="block text-xs font-bold tracking-[0.2em] text-gold mb-2 uppercase" htmlFor="message">Tell Me More</label>
            <textarea 
              id="message" 
              rows={2}
              placeholder="Details about your project..."
              className="w-full bg-transparent border-0 border-b border-primary py-3 px-0 text-primary placeholder:text-primary/30 focus:ring-0 focus:border-gold transition-colors text-xl font-light resize-none"
            ></textarea>
          </div>

          <div className="pt-8 flex justify-center">
            <button className="bg-gold hover:bg-primary text-primary hover:text-white font-bold text-sm tracking-[0.2em] py-5 px-16 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-gold/20 uppercase w-full sm:w-auto">
              Send Message
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default ContactSection;