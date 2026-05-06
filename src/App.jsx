import React, { useState, useEffect } from 'react';

/**
 * PROJECT CONFIGURATION
 */
const CONFIG = {
  bookingUrl: "https://phorest.com/book/salons/salonpaloma",
  yelpUrl: "https://www.yelp.com/biz/salon-paloma-san-carlos",
  instagramUrl: "https://www.instagram.com/thesalonpaloma/",
  phoneNumber: "6502327108",
  displayPhone: "650.232.7108",
  address: "538 El Camino Real, Suite A, San Carlos, CA 94070"
};

const ASSETS = {
  logoWhite: "Paloma_Logo_white.webp",
  heroLady: "SalonPaloma_hero_bg_04.webp",
  interiorReception: "IMG_5785.webp",
  marbleTexture: "rawpixel-557126-unsplash.webp",
  team: [
    { id: 1, name: "Paloma", role: "Founder & Lead Stylist" },
    { id: 2, name: "[Name]", role: "Senior Stylist" },
    { id: 3, name: "[Name]", role: "Color Artist" },
    { id: 4, name: "[Name]", role: "Stylist" },
  ],
  serviceMenu: [
    { category: "Hair", items: ["Haircuts", "Blow-drys", "Updo’s", "Weddings"] },
    { category: "Color", items: ["Base color", "Highlights", "Gloss", "Correction"] },
    { category: "Treatments", items: ["Conditioning", "Keratin"] },
    { category: "Extensions", items: ["Individual", "Tape In", "Hand-tied"] }
  ],
  testimonials: [
    { name: "Jeeyna W.", text: "I love my new hair! Paloma is incredible—She listens exactly to what you want." },
    { name: "Kimberly L.", text: "Paloma was great! She worked some cutting magic and blow dried my hair fast." },
    { name: "Alexandra G.", text: "A first time mom in need of self care. The vibe of the salon is amazing." }
  ]
};

const Icons = {
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"></path></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>,
  Yelp: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.7 13c0 .8-.5 1.5-1.2 1.8-.8.3-1.8.2-2.5-.2-.5-.3-.9-.7-1.1-1.2-.2-.5-.3-1-.2-1.5.1-.8.7-1.5 1.5-1.7.8-.2 1.7 0 2.3.6.4.4.7.9.7 1.4z" /></svg>
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'The Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF9F6] font-sans antialiased overflow-x-hidden">
      
      {/* NAVIGATION - SLIMMER HEIGHT TO PREVENT CLIPPING */}
      <nav className={`fixed w-full z-[999] transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-md py-2 shadow-2xl' : 'bg-black/80 lg:bg-transparent py-4'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-20 md:w-32">
            <img src={ASSETS.logoWhite} alt="Salon Paloma" className="w-full h-auto object-contain" />
          </button>
          
          <div className="hidden lg:flex space-x-12 text-[9px] tracking-[0.6em] uppercase font-bold text-white/40">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-all">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={CONFIG.bookingUrl} target="_blank" className="bg-white text-black px-7 py-3.5 md:px-8 md:py-2.5 text-[10px] md:text-[9px] tracking-[0.3em] uppercase font-black hover:bg-stone-300 transition-all active:scale-95">
              Book
            </a>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}><Icons.Menu /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-10">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><Icons.X /></button>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-3xl font-serif italic text-white" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
          ))}
        </div>
      )}

      {/* HERO SECTION - SPLIT FOR PORTRAIT / OVERLAY FOR LANDSCAPE */}
      <header className="relative w-full flex flex-col lg:block lg:h-[100svh] min-h-[500px] bg-black overflow-hidden pt-[72px] lg:pt-0">
        
        {/* IMAGE CONTAINER: Focal point nudged up slightly (35%) to protect the head */}
        <div className="w-full h-[60vh] sm:h-[70vh] lg:absolute lg:inset-0 z-0">
          <img 
            src={ASSETS.heroLady} 
            className="w-full h-full object-cover object-[center_35%]"
            alt="Salon Paloma Hair Artistry"
          />
          {/* Desktop Overlay Protection */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>

        {/* CONTENT CONTAINER: Stacks BELOW the image on portrait phones */}
        <div className="relative lg:absolute lg:inset-0 z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 flex items-center h-auto lg:h-full py-12 lg:py-0 bg-[#0A0A0A] lg:bg-transparent">
          <div className="max-w-xl border-l border-stone-800 lg:border-white/10 pl-6 md:pl-12">
            <h1 className="text-4xl sm:text-6xl lg:text-[90px] leading-[0.9] font-serif italic mb-6 text-white">
              Elevated <br /> 
              <span className="text-stone-500">Artistry.</span>
            </h1>
            <p className="max-w-sm text-stone-400 text-sm md:text-base font-light leading-relaxed mb-10">
              Manhattan precision meets San Carlos intimacy. A sanctuary for those who view hair as a living canvas.
            </p>
            <a href={CONFIG.bookingUrl} target="_blank" className="group inline-flex items-center gap-6 text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-black text-white hover:text-stone-400 transition-all border-b border-white/10 pb-2 hover:border-white">
              Reserve Experience 
              <Icons.ArrowRight />
            </a>
          </div>
        </div>
      </header>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-24 md:py-48 bg-[#0A0A0A] px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="shadow-2xl"><img src={ASSETS.interiorReception} alt="Interior" className="w-full aspect-[4/5] object-cover" /></div>
          <div className="space-y-10">
            <h3 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">The Unified Collective.</h3>
            <p className="text-stone-400 font-light text-lg border-l border-stone-800 pl-8 italic">Consistency is the mark of luxury.</p>
            <p className="text-stone-500 font-light leading-relaxed">At Salon Paloma, we cultivate a signature standard of excellence. Every stylist is meticulously trained in the Paloma Standard, ensuring your experience is intentional from chair to reveal.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-48 bg-[#0F0F0F] px-6 relative border-y border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"><img src={ASSETS.marbleTexture} className="w-full h-full object-cover" alt="" /></div>
        <div className="max-w-[1800px] mx-auto relative z-10">
          <h3 className="text-7xl md:text-[10rem] font-serif italic text-white mb-20 text-center lg:text-left">Curated.</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {ASSETS.serviceMenu.map((cat, i) => (
              <div key={i} className="p-12 bg-[#0F0F0F] flex flex-col items-center text-center group hover:bg-white/[0.02] transition-all">
                <h4 className="text-xl font-serif italic mb-8 text-white uppercase tracking-widest">{cat.category}</h4>
                <ul className="space-y-4 mb-10 text-stone-500 font-light">{cat.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a href={CONFIG.bookingUrl} target="_blank" className="mt-auto flex items-center text-[8px] tracking-widest uppercase font-bold text-stone-600 group-hover:text-white transition-all">Consultation <Icons.ChevronRight /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-black pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="space-y-8">
            <div className="text-white text-2xl font-serif italic">Salon Paloma</div>
            <p className="text-stone-400 text-sm leading-relaxed">{CONFIG.address}</p>
            <p className="text-white font-bold">{CONFIG.displayPhone}</p>
            <div className="flex gap-6 text-stone-600">
              <a href={CONFIG.instagramUrl} target="_blank" className="hover:text-white"><Icons.Instagram /></a>
              <a href={CONFIG.yelpUrl} target="_blank" className="hover:text-white"><Icons.Yelp /></a>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/40">Studio Hours</h4>
            <div className="text-stone-500 text-sm space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2"><span>Tuesday — Friday</span><span>10:00 — 5:00</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span><span>9:00 — 5:00</span></div>
              <div className="flex justify-between opacity-30"><span>Sun — Mon</span><span>Closed</span></div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
};

export default App;